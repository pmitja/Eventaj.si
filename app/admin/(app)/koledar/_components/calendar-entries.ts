import type { CalendarEvent } from "@/lib/db/inquiries";
import type { DoneEvent, TableRentalEvent } from "@/lib/db/ledger";
import { plural } from "@/app/admin/_components/charts";
import { formatPlain } from "@/lib/ledger/compute";
import { NO_DELIVERY } from "@/lib/ledger/lists";

// "planned" = a confirmed inquiry still ahead of us, "done" = a row in Poslovanje → Dogodki,
// "booked" = a Dogodki row entered by hand for a day still ahead of us, "rental" = a row in Najem miz.
export type Entry =
  | { kind: "planned"; key: string; date: string; title: string; href: string; event: CalendarEvent }
  | { kind: "done" | "booked"; key: string; date: string; title: string; href: string; event: DoneEvent }
  | { kind: "rental"; key: string; date: string; title: string; href: string; event: TableRentalEvent };

// Done = shown dark. A table rental counts as done once its day has passed.
export const isDone = (entry: Entry, today: string) => entry.kind === "done" || (entry.kind === "rental" && entry.date < today);

export const typeLabels: Record<string, string> = {
  basic: "Photo Booth",
  "360": "360° Booth",
  both: "Photo Booth + 360°",
  equipment: "Oprema",
};

// A confirmed inquiry also has its row in Dogodki: until the day it shows as planned (start time,
// location), afterwards as done (the ledger row then carries the real hours and money).
// A confirmed table inquiry shows as its Najem miz row, which knows the tables and who drives them.
export function toEntries(planned: CalendarEvent[], done: DoneEvent[], rentals: TableRentalEvent[], today: string): Entry[] {
  const plannedIds = new Set(planned.map((event) => event.id));
  const doneInquiries = new Set(done.flatMap((event) => (event.inquiryId === null ? [] : [event.inquiryId])));
  const rentalInquiries = new Set(rentals.flatMap((event) => (event.inquiryId === null ? [] : [event.inquiryId])));
  return [
    ...rentals.map((event): Entry => ({
      kind: "rental",
      key: `t${event.id}`,
      date: event.date,
      title: event.client || event.code || "Najem miz",
      href: `/admin/poslovanje/${event.year}/najem-miz`,
      event,
    })),
    ...done.filter((event) => !(event.inquiryId !== null && plannedIds.has(event.inquiryId) && event.date >= today)).map((event): Entry => ({
      kind: event.date >= today ? "booked" : "done",
      key: `d${event.id}`,
      date: event.date,
      title: event.client || event.code || "Dogodek",
      href: `/admin/poslovanje/${event.year}/dogodki`,
      event,
    })),
    ...planned.filter((event) => !rentalInquiries.has(event.id) && !(doneInquiries.has(event.id) && event.date < today)).map((event): Entry => ({
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
  if (!names) return execution === "Študenti" ? "Študenti (še ni določeno, kateri)" : execution;
  if (!execution || execution === "Študenti") return `Študenti: ${names}`;
  return `${execution}, študenti: ${names}`;
}

// Short "who goes" for a calendar chip: the student names when students go, else the execution.
// "Študenti" with nobody picked yet is flagged so it gets filled in.
export function whoShort(entry: Entry) {
  if (entry.kind === "rental") {
    const { deliveredBy, pickedBy, students } = entry.event;
    const names = [...new Set([deliveredBy, pickedBy, ...students].filter((name): name is string => Boolean(name) && name !== NO_DELIVERY))];
    return names.length ? names.join(", ") : deliveredBy === NO_DELIVERY ? "brez dostave" : null;
  }
  const [execution, students] = entry.kind === "planned" ? [entry.event.crew, entry.event.crewStudents] : [entry.event.execution, entry.event.students];
  if (students.length) return [execution && execution !== "Študenti" ? execution : null, ...students].filter(Boolean).join(", ");
  return execution === "Študenti" ? "Študenti: kdo?" : execution;
}

// Who drives a table rental there and back, plus any students linked to it in Študenti.
export function rentalWho(event: TableRentalEvent) {
  const parts = [
    event.deliveredBy === NO_DELIVERY ? "brez dostave" : event.deliveredBy ? `dostava: ${event.deliveredBy}` : null,
    event.pickedBy && event.pickedBy !== NO_DELIVERY ? `prevzem: ${event.pickedBy}` : null,
    event.students.length ? `študenti: ${event.students.join(", ")}` : null,
  ].filter(Boolean) as string[];
  if (parts.length === 0) return null;
  const text = parts.join(" · ");
  return text[0].toUpperCase() + text.slice(1);
}

export function rentalFacts(event: TableRentalEvent) {
  return [
    "Mize",
    event.tableCount !== null ? plural(event.tableCount, "miza", "mizi", "mize", "miz") : null,
  ].filter(Boolean) as string[];
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
