import { redirect } from "next/navigation";
import { PageHeader } from "@/app/admin/_components/page-header";
import { requireAdminPage } from "@/lib/admin-auth";
import { listYears } from "@/lib/db/ledger";
import { AddYearForm } from "./_components/add-year-form";

export default async function LedgerIndexPage() {
  await requireAdminPage();
  const years = await listYears();
  const current = new Date().getFullYear();
  if (years.length > 0) redirect(`/admin/poslovanje/${years.includes(current) ? current : years[years.length - 1]}`);

  return (
    <>
      <PageHeader eyebrow="Poslovanje" title="Prvo leto" subtitle="Ni še nobenega leta. Dodajte ga, da začnete voditi evidenco." />
      <AddYearForm suggested={current} />
    </>
  );
}
