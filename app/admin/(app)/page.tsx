import { requireAdminPage } from "@/lib/admin-auth";
import { inquiryStatuses, listInquiries, type InquiryStatus } from "@/lib/db/inquiries";
import { getLists } from "@/lib/db/ledger";
import { findView } from "../_components/inquiry-groups";
import { InquiryList } from "../_components/inquiry-list";
import { InquiryTabs } from "../_components/inquiry-tabs";
import { ManualInquiryButton } from "../_components/manual-inquiry";
import { PageHeader } from "../_components/page-header";

type Props = { searchParams: Promise<{ prikaz?: string | string[] }> };

export default async function AdminPage({ searchParams }: Props) {
  await requireAdminPage();
  const [inquiries, lists, { prikaz }] = await Promise.all([listInquiries(), getLists(), searchParams]);
  const view = findView(prikaz);
  const counts = Object.fromEntries(
    inquiryStatuses.map((status) => [status, inquiries.filter((inquiry) => inquiry.status === status).length]),
  ) as Record<InquiryStatus, number>;
  const shown = inquiries.filter((inquiry) => inquiry.status === view.status);
  const withoutOffer = shown.filter((inquiry) => inquiry.offers.length === 0).length;

  return (
    <div className="mx-auto flex w-full max-w-[1040px] flex-col gap-5">
      <PageHeader
        title="Povpraševanja"
        subtitle={`${inquiries.length} prejetih${view.status === "new" && withoutOffer ? ` · ${withoutOffer} aktivnih brez ponudbe` : ""}`}
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
        crewLists={{ executions: lists.executions, students: lists.students, tableDrivers: lists.tableDrivers }}
      />
    </div>
  );
}
