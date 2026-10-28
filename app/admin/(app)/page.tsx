import { requireAdminPage } from "@/lib/admin-auth";
import { listInquiries } from "@/lib/db/inquiries";
import { getLists } from "@/lib/db/ledger";
import { backgroundStage, countInView, findView, inView, INQUIRY_VIEWS, type InquiryView } from "../_components/inquiry-groups";
import { InquiryList } from "../_components/inquiry-list";
import { InquiryTabs } from "../_components/inquiry-tabs";
import { ManualInquiryButton } from "../_components/manual-inquiry";
import { PageHeader } from "../_components/page-header";

type Props = { searchParams: Promise<{ prikaz?: string | string[] }> };

export default async function AdminPage({ searchParams }: Props) {
  await requireAdminPage();
  const [inquiries, lists, { prikaz }] = await Promise.all([listInquiries(), getLists(), searchParams]);
  const view = findView(prikaz);
  const counts = Object.fromEntries(INQUIRY_VIEWS.map((item) => [item.slug, countInView(item, inquiries)])) as Record<
    InquiryView["slug"],
    number
  >;
  const shown = inquiries.filter((inquiry) => inView(view, inquiry));
  const withoutOffer = shown.filter((inquiry) => inquiry.offers.length === 0).length;
  const stages = shown.map(backgroundStage);
  const stageCount = (stage: ReturnType<typeof backgroundStage>) => stages.filter((item) => item === stage).length;
  const subtitle =
    view.slug === "ozadja"
      ? `${stageCount("no-link")} brez poslane povezave · ${stageCount("waiting")} čaka na želje stranke · ${stageCount("to-make")} za izdelavo · ${stageCount("ready")} pripravljenih`
      : `${inquiries.length} prejetih${view.status === "new" && withoutOffer ? ` · ${withoutOffer} aktivnih brez ponudbe` : ""}`;

  return (
    <div className="mx-auto flex w-full max-w-[1040px] flex-col gap-5">
      <PageHeader
        title="Povpraševanja"
        subtitle={subtitle}
        action={
          <div className="flex flex-wrap items-center gap-3">
            <InquiryTabs active={view} counts={counts} />
            <ManualInquiryButton onActiveView={view.status === "new"} />
          </div>
        }
      />
      <InquiryList
        key={view.slug}
        inquiries={shown}
        empty={view.empty}
        viewLabel={view.label}
        byBackground={view.slug === "ozadja"}
        crewLists={{ executions: lists.executions, students: lists.students, tableDrivers: lists.tableDrivers }}
      />
    </div>
  );
}
