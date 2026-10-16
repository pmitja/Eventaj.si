import type { CalendarEvent } from "@/lib/db/inquiries";
import type { DoneEvent } from "@/lib/db/ledger";
import { formatPlain } from "@/lib/ledger/compute";

// "planned" = a confirmed inquiry still ahead of us, "done" = a row in Poslovanje → Dogodki,
// "booked" = a Dogodki row entered by hand for a day still ahead of us.
export type Entry =
  | { kind: "planned"; key: string; date: string; title: string; href: string; event: CalendarEvent }
  | { kind: "done" | "booked"; key: string; date: string; title: string; href: string; event: DoneEvent };

export const typeLabels: Record<string, string> = {
  basic: "Photo Booth",
  "360": "360° Booth",
  both: "Photo Booth + 360°",
  equipment: "Oprema",
};

// A confirmed inquiry also has its row in Dogodki: until the day it shows as planned (start time,
// location), afterwards as done (the ledger row then carries the real hours and money).
export function toEntries(planned: CalendarEvent[], done: DoneEvent[], today: string): Entry[] {
  const plannedIds = new Set(planned.map((event) => event.id));
  const doneInquiries = new Set(done.flatMap((event) => (event.inquiryId === null ? [] : [event.inquiryId])));
  return [
    ...done.filter((event) => !(event.inquiryId !== null && plannedIds.has(event.inquiryId) && event.date >= today)).map((event): Entry => ({
      kind: event.date >= today ? "booked" : "done",
      key: `d${event.id}`,
      date: event.date,
      title: event.client || event.code || "Dogodek",
      href: `/admin/poslovanje/${event.year}/dogodki`,
      event,
    })),
    ...planned.filter((event) => !(doneInquiries.has(event.id) && event.date < today)).map((event): Entry => ({
      kind: "planned",
      key: `p${event.id}`,
      date: event.date,
      title: event.name,
      href: `/admin?prikaz=potrjena#povprasevanje-${event.id}`,
      event,
    })),
  ].sort((a, b) => a.date.localeCompare(b.date));
}

// "Jan", "Študenti: Klara, Luka" or "Jan, študenti: Klara"; null when nobody is set.
export function crewText(execution: string | null, students: string[]) {
  if (!execution && students.length === 0) return null;
  const names = students.join(", ");
  if (!names) return execution;
  if (!execution || execution === "Študenti") return `Študenti: ${names}`;
  return `${execution}, študenti: ${names}`;
}

// Who worked the event: the execution column, the students linked to it and any initial help.
export function whoText(event: DoneEvent) {
  let text = crewText(event.execution, event.students) ?? "izvedba ni vpisana";
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

export function bookedFacts(event: DoneEvent) {
  return [event.service, event.hours !== null ? `${formatPlain(event.hours)} h` : null].filter(Boolean) as string[];
}

export function doneFacts(event: DoneEvent) {
  return [
    event.hours !== null ? `${formatPlain(event.hours)} h` : null,
    event.km !== null ? `${formatPlain(event.km)} km` : null,
    event.albumUsed ? `album: da${event.album ? ` (${event.album})` : ""}` : "album: ne",
  ].filter(Boolean) as string[];
}
