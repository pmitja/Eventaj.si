import { loadYear } from "../../_components/load";
import { TablesWorkspace } from "../../_components/tables-workspace";

export default async function TableRentalsPage({ params }: { params: Promise<{ year: string }> }) {
  const { ledger, lists } = await loadYear(params);
  return <TablesWorkspace year={ledger.year} rows={ledger.tables} lists={lists} />;
}
