import { PageHeader } from "@/app/admin/_components/page-header";
import { loadYear } from "../_components/load";
import { OverviewDashboard } from "../_components/overview-dashboard";

export default async function OverviewPage({ params }: { params: Promise<{ year: string }> }) {
  const { ledger } = await loadYear(params);

  return (
    <>
      <PageHeader eyebrow={`Poslovanje ${ledger.year}`} title="Pregled" />
      <OverviewDashboard ledger={ledger} />
    </>
  );
}
