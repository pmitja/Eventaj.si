import { equipmentItems } from "@/lib/ledger/equipment-items";
import { loadYear } from "../../_components/load";
import { TablesWorkspace } from "../../_components/tables-workspace";

// Oprema (formerly Najem miz): standing tables and every other item from /oprema-za-dogodke.
export default async function TableRentalsPage({ params }: { params: Promise<{ year: string }> }) {
  const { ledger, lists } = await loadYear(params);
  return <TablesWorkspace year={ledger.year} rows={ledger.tables} lists={lists} equipment={equipmentItems()} />;
}
