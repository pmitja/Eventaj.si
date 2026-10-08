import { EventsWorkspace } from "../../_components/events-workspace";
import { loadYear } from "../../_components/load";

export default async function EventsPage({ params }: { params: Promise<{ year: string }> }) {
  const { ledger, lists } = await loadYear(params);
  const albums = ledger.stock.filter((item) => item.type === "Album" && item.name).map((item) => item.name as string);
  return <EventsWorkspace year={ledger.year} rows={ledger.events} lists={lists} albums={albums} />;
}
