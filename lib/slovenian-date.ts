export const SLOVENIA_TIME_ZONE = "Europe/Ljubljana";

const slovenianDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: SLOVENIA_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function getSlovenianDateString(date = new Date()) {
  const parts = slovenianDateFormatter.formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

  return `${values.year}-${values.month}-${values.day}`;
}

export function dateFromDateString(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return undefined;

  return new Date(year, month - 1, day, 12);
}

export function dateToDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatSlovenianDate(date: Date | string | undefined | null) {
  if (!date) return "Ni določen";

  const parsedDate =
    typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)
      ? dateFromDateString(date)
      : new Date(date);

  if (!parsedDate || Number.isNaN(parsedDate.getTime())) return "Ni določen";

  return new Intl.DateTimeFormat("sl-SI", {
    timeZone: SLOVENIA_TIME_ZONE,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}
