import { EventsWorkspace } from "../../_components/events-workspace";
import { loadYear } from "../../_components/load";

export default async function EventsPage({ params }: { params: Promise<{ year: string }> }) {
  const { ledger, lists } = await loadYear(params);
  const albums = ledger.stock.filter((item) => item.type === "Album" && item.name).map((item) => item.name as string);
  const studentsByEvent: Record<number, string[]> = {};
  for (const row of ledger.students) {
    const id = row.link?.startsWith("e:") ? Number(row.link.slice(2)) : null;
    if (id && row.student) (studentsByEvent[id] ??= []).push(row.student);
  }
  return <EventsWorkspace year={ledger.year} rows={ledger.events} lists={lists} albums={albums} studentsByEvent={studentsByEvent} />;
}
