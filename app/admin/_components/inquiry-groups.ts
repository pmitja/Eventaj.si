import type { InquiryStatus, InquiryWithOffers } from "@/lib/db/inquiries";
import { getSlovenianDateString, toDateKey } from "@/lib/slovenian-date";

// Not imported from charts.tsx: that is a client module and this one is also used by the server page.
const MONTH_NAMES = ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"];

export const INQUIRY_VIEWS = [
  { slug: "aktivna", status: "new", label: "Aktivna", empty: "Ni aktivnih povpraševanj." },
  { slug: "potrjena", status: "confirmed", label: "Potrjena", empty: "Ni še potrjenih dogodkov." },
  { slug: "zavrnjena", status: "declined", label: "Zavrnjena", empty: "Ni zavrnjenih povpraševanj." },
  { slug: "ozadja", status: "confirmed", label: "Ozadja", empty: "Ni prihajajočih dogodkov s photo boothom." },
] as const satisfies readonly { slug: string; status: InquiryStatus; label: string; empty: string }[];

export type InquiryView = (typeof INQUIRY_VIEWS)[number];

export function findView(slug: string | string[] | undefined): InquiryView {
  return INQUIRY_VIEWS.find((view) => view.slug === slug) ?? INQUIRY_VIEWS[0];
}

// Only photo booth events print photos in a frame, so only they need a background made.
// Past events are left out: nothing to prepare for them any more.
export function needsBackground(inquiry: InquiryWithOffers, today = getSlovenianDateString()) {
  const date = toDateKey(inquiry.formData.date);
  return (
    inquiry.status === "confirmed" &&
    (inquiry.formData.type === "basic" || inquiry.formData.type === "both") &&
    (!date || date >= today)
  );
}

export function inView(view: InquiryView, inquiry: InquiryWithOffers) {
  return view.slug === "ozadja" ? needsBackground(inquiry) : inquiry.status === view.status;
}

// The tab badge: for Ozadja only the ones still waiting to be made.
export function countInView(view: InquiryView, inquiries: InquiryWithOffers[]) {
  return inquiries.filter((inquiry) => inView(view, inquiry) && (view.slug !== "ozadja" || !inquiry.backgroundReadyAt)).length;
}

export type BackgroundStage = "no-link" | "waiting" | "to-make" | "ready";

export function backgroundStage(inquiry: InquiryWithOffers): BackgroundStage {
  if (inquiry.backgroundReadyAt) return "ready";
  if (inquiry.eventDetails?.submittedAt) return "to-make";
  return inquiry.eventDetails ? "waiting" : "no-link";
}

export type InquiryGroup = { key: string; label: string; muted?: boolean; inquiries: InquiryWithOffers[] };

// Calendar order: upcoming events by month (soonest first), then past events (most recent first), then undated.
export function groupByEventDate(inquiries: InquiryWithOffers[]): InquiryGroup[] {
  const today = getSlovenianDateString();
  const dated = inquiries
    .map((inquiry) => ({ inquiry, date: toDateKey(inquiry.formData.date) }))
    .sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""));

  const groups = new Map<string, InquiryGroup>();
  const past: InquiryWithOffers[] = [];
  const undated: InquiryWithOffers[] = [];

  for (const { inquiry, date } of dated) {
    if (!date) undated.push(inquiry);
    else if (date < today) past.push(inquiry);
    else {
      const key = date.slice(0, 7);
      const label = `${MONTH_NAMES[Number(key.slice(5)) - 1]} ${key.slice(0, 4)}`;
      if (!groups.has(key)) groups.set(key, { key, label, inquiries: [] });
      groups.get(key)!.inquiries.push(inquiry);
    }
  }

  return [
    ...groups.values(),
    ...(past.length ? [{ key: "past", label: "Pretekli datumi", muted: true, inquiries: past.reverse() }] : []),
    ...(undated.length ? [{ key: "undated", label: "Brez datuma", muted: true, inquiries: undated }] : []),
  ];
}

// Ozadja: what is still to be made by event date, the finished ones last and closed.
export function groupByBackground(inquiries: InquiryWithOffers[]): InquiryGroup[] {
  const ready = inquiries
    .filter((inquiry) => inquiry.backgroundReadyAt)
    .sort((a, b) => (toDateKey(a.formData.date) ?? "").localeCompare(toDateKey(b.formData.date) ?? ""));
  return [
    ...groupByEventDate(inquiries.filter((inquiry) => !inquiry.backgroundReadyAt)),
    ...(ready.length ? [{ key: "ready", label: "Pripravljena ozadja", muted: true, inquiries: ready }] : []),
  ];
}

// Lowercase and without diacritics, so "crna" finds "Črna" and "sencur" finds "Šenčur".
export function normalize(text: string) {
  return text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

// Every word of the query has to appear somewhere in the inquiry.
export function matchesQuery(inquiry: InquiryWithOffers, query: string) {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const data = inquiry.formData;
  const date = toDateKey(data.date);
  const haystack = normalize(
    [
      `#${inquiry.id}`,
      data.name,
      data.email,
      data.phone,
      data.location,
      data.eventType,
      data.message,
      data.equipmentSummary,
      inquiry.eventDetails?.data?.location,
      inquiry.eventDetails?.data?.contactName,
      date && `${Number(date.slice(8))}. ${Number(date.slice(5, 7))}. ${date.slice(0, 4)}`,
      date && MONTH_NAMES[Number(date.slice(5, 7)) - 1],
      ...inquiry.offers.map((offer) => offer.number),
    ]
      .filter(Boolean)
      .join(" "),
  );
  return words.every((word) => haystack.includes(word));
}
