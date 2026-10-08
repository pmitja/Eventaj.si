import { loadYear } from "../../_components/load";
import { StockWorkspace } from "../../_components/stock-workspace";

export default async function StockPage({ params }: { params: Promise<{ year: string }> }) {
  const { ledger, lists } = await loadYear(params);
  return <StockWorkspace year={ledger.year} rows={ledger.stock} events={ledger.events} lists={lists} />;
}
