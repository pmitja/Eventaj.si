import type { CalendarEvent } from "@/lib/db/inquiries";
import type { DoneEvent } from "@/lib/db/ledger";
import { formatPlain } from "@/lib/ledger/compute";

// "planned" = a confirmed inquiry still ahead of us, "done" = a row in Poslovanje → Dogodki.
export type Entry =
  | { kind: "planned"; key: string; date: string; title: string; href: string; event: CalendarEvent }
  | { kind: "done"; key: string; date: string; title: string; href: string; event: DoneEvent };

export const typeLabels: Record<string, string> = {
  basic: "Photo Booth",
  "360": "360° Booth",
  both: "Photo Booth + 360°",
  equipment: "Oprema",
};

export function toEntries(planned: CalendarEvent[], done: DoneEvent[]): Entry[] {
  return [
    ...done.map((event): Entry => ({
      kind: "done",
      key: `d${event.id}`,
      date: event.date,
      title: event.client || event.code || "Dogodek",
      href: `/admin/poslovanje/${event.year}/dogodki`,
      event,
    })),
    ...planned.map((event): Entry => ({
      kind: "planned",
      key: `p${event.id}`,
      date: event.date,
      title: event.name,
      href: `/admin?prikaz=potrjena#povprasevanje-${event.id}`,
      event,
    })),
  ].sort((a, b) => a.date.localeCompare(b.date));
}

// Who worked the event: the execution column, the students linked to it and any initial help.
export function whoText(event: DoneEvent) {
  const execution = event.execution || "izvedba ni vpisana";
  const students = event.students.join(", ");
  let text = !students ? execution : execution === "Študenti" ? `Študenti: ${students}` : `${execution}, študenti: ${students}`;
  if (event.initialHelp && event.initialHelp !== "Brez") text += ` · začetna pomoč: ${event.initialHelp}`;
  return text;
}

const hasBooth = (event: CalendarEvent) => event.type === "basic" || event.type === "both";

// Type, hours and album of a confirmed event; the album is only known once the customer said so.
export function plannedFacts(event: CalendarEvent) {
  const booth = hasBooth(event);
  return [
    typeLabels[event.type] ?? event.type,
    event.type !== "equipment" && event.hours ? `${event.hours} h` : null,
    !booth ? null : event.album === "Ne" ? "brez albuma" : event.album ? `album: ${event.album.replace(/ album/i, "").toLowerCase()}` : null,
    booth && !event.detailsSubmitted ? "čaka na obrazec" : null,
  ].filter(Boolean) as string[];
}

export function doneFacts(event: DoneEvent) {
  return [
    event.hours !== null ? `${formatPlain(event.hours)} h` : null,
    event.km !== null ? `${formatPlain(event.km)} km` : null,
    event.albumUsed ? `album: da${event.album ? ` (${event.album})` : ""}` : "album: ne",
  ].filter(Boolean) as string[];
}
