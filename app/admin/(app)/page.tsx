import { requireAdminPage } from "@/lib/admin-auth";
import { listInquiries } from "@/lib/db/inquiries";
import { InquiryList } from "../_components/inquiry-list";
import { PageHeader } from "../_components/page-header";

export default async function AdminPage() {
  await requireAdminPage();
  const inquiries = await listInquiries();
  const withoutOffer = inquiries.filter((inquiry) => inquiry.offers.length === 0).length;

  return (
    <div className="mx-auto flex w-full max-w-[1040px] flex-col gap-5">
      <PageHeader title="Povpraševanja" subtitle={`${inquiries.length} prejetih${withoutOffer ? ` · ${withoutOffer} brez ponudbe` : ""}`} />
      <InquiryList inquiries={inquiries} />
    </div>
  );
}
