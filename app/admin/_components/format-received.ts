const receivedParts = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "Europe/Ljubljana",
});

// Built from numeric parts so server (Node ICU) and browser render identical text.
export function formatReceived(iso: string) {
  const parts = Object.fromEntries(receivedParts.formatToParts(new Date(iso)).map(({ type, value }) => [type, value]));
  return `${parts.day}. ${parts.month}. ${parts.year}, ${parts.hour}.${parts.minute}`;
}
