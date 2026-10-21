import type { StudentShift } from "@/lib/db/student-schedule";
import { formatPlain } from "@/lib/ledger/compute";

const at = (date: string) => new Date(`${date}T12:00:00Z`);

export function longDate(date: string) {
  return at(date).toLocaleDateString("sl-SI", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
}

export function dayParts(date: string) {
  const d = at(date);
  return {
    day: d.getUTCDate(),
    month: d.toLocaleDateString("sl-SI", { month: "short", timeZone: "UTC" }).replace(".", ""),
    weekday: d.toLocaleDateString("sl-SI", { weekday: "short", timeZone: "UTC" }).replace(".", ""),
  };
}

export function shortDate(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return `${d}. ${m}. ${y}`;
}

export function untilText(date: string, today: string) {
  const days = Math.round((at(date).getTime() - at(today).getTime()) / 86_400_000);
  if (days <= 0) return "danes";
  if (days === 1) return "jutri";
  return days === 2 ? "čez 2 dni" : `čez ${days} dni`;
}

// "18:00–22:00 (4 h)", or just the duration while the start time is not known yet.
export function timeText(shift: Pick<StudentShift, "startTime" | "hours">) {
  const duration = shift.hours ? `${formatPlain(shift.hours)} h` : null;
  if (!shift.startTime) return duration ? `ura pričetka še ni znana · ${duration}` : null;
  if (!/^\d{2}:\d{2}$/.test(shift.startTime)) return [shift.startTime, duration].filter(Boolean).join(" · ");
  if (!shift.hours) return `od ${shift.startTime}`;
  const [h, m] = shift.startTime.split(":").map(Number);
  const end = (h * 60 + m + Math.round(shift.hours * 60)) % (24 * 60);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${shift.startTime}–${pad(Math.floor(end / 60))}:${pad(end % 60)} (${duration})`;
}

export const mapsUrl = (location: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
export const telUrl = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
