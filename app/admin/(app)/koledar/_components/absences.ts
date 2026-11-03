import type { Absence } from "@/lib/db/absences";

export const absencesOn = (absences: Absence[], date: string) => absences.filter((a) => a.from <= date && date <= a.to);

// Which of these names have an absence on that day.
export function absentAmong(absences: Absence[], date: string, names: string[]) {
  const away = new Set(absencesOn(absences, date).flatMap((a) => a.people));
  return [...new Set(names)].filter((name) => away.has(name));
}

// "Jan ima ta dan vpisano odsotnost." / "Jan in Mitja imata …"; null when nobody is away.
export function absenceWarning(names: string[]) {
  if (names.length === 0) return null;
  const list = names.length === 1 ? names[0] : `${names.slice(0, -1).join(", ")} in ${names[names.length - 1]}`;
  const verb = names.length === 1 ? "ima" : names.length === 2 ? "imata" : "imajo";
  return `${list} ${verb} ta dan vpisano odsotnost.`;
}

const day = (date: string) => `${Number(date.slice(8))}. ${Number(date.slice(5, 7))}.`;

// "5. 11. 2026", "5. 11. – 9. 11. 2026" or "28. 12. 2026 – 3. 1. 2027".
export function rangeLabel({ from, to }: Pick<Absence, "from" | "to">) {
  if (from === to) return `${day(from)} ${from.slice(0, 4)}`;
  if (from.slice(0, 4) === to.slice(0, 4)) return `${day(from)} – ${day(to)} ${to.slice(0, 4)}`;
  return `${day(from)} ${from.slice(0, 4)} – ${day(to)} ${to.slice(0, 4)}`;
}

export function absenceTitle(absence: Absence) {
  return [`Odsotnost: ${absence.people.join(", ")}`, rangeLabel(absence), absence.note ? `Opomba: ${absence.note}` : null].filter(Boolean).join("\n");
}
