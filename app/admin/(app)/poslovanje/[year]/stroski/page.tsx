import { CostsWorkspace } from "../../_components/costs-workspace";
import { loadYear } from "../../_components/load";

export default async function CostsPage({ params }: { params: Promise<{ year: string }> }) {
  const { ledger, lists } = await loadYear(params);
  return <CostsWorkspace year={ledger.year} rows={ledger.costs} lists={lists} />;
}
