import type { FormField } from "@/components/forms/booking-form";
import { albumColorLabels, albumSizeLabels } from "@/content/eventaj/album-pricing";
import { albumLabel, type EventDetails } from "@/lib/event-details/schema";
import { toEventDetailsRequest, type EventDetailsRequest } from "./event-details";
import { sql } from "./index";
import { toDateKey } from "@/lib/slovenian-date";

export const inquiryStatuses = ["new", "confirmed", "declined"] as const;
export type InquiryStatus = (typeof inquiryStatuses)[number];

export type StoredFormData = Omit<FormField, "date"> & { date: string };

export type Inquiry = {
  id: number;
  createdAt: string;
  formData: StoredFormData;
  totalPrice: number | null;
  status: InquiryStatus;
  // Who works the event: execution as in Dogodki ("Jan", "Študenti" …) plus the students going.
  crew: string | null;
  crewStudents: string[];
};

export type OfferSummary = {
  id: number;
  number: string;
  createdAt: string;
  total: number;
  sentAt: string | null;
};

export type InquiryWithOffers = Inquiry & { offers: OfferSummary[]; eventDetails: EventDetailsRequest | null };

type InquiryRow = {
  id: number;
  created_at: Date;
  form_data: StoredFormData;
  total_price: string | null;
  status: InquiryStatus;
  crew: string | null;
  crew_students: string[] | null;
};

function toInquiry(row: InquiryRow): Inquiry {
  return {
    id: row.id,
    createdAt: new Date(row.created_at).toISOString(),
    formData: row.form_data,
    totalPrice: row.total_price === null ? null : Number(row.total_price),
    status: row.status ?? "new",
    crew: row.crew,
    crewStudents: row.crew_students ?? [],
  };
}

export async function saveInquiry(formData: unknown, totalPrice: unknown) {
  const price = typeof totalPrice === "number" && Number.isFinite(totalPrice) ? totalPrice : null;
  const rows = (await sql()`
    INSERT INTO inquiries (form_data, total_price)
    VALUES (${JSON.stringify(formData)}::jsonb, ${price})
    RETURNING id
  `) as { id: number }[];
  return rows[0].id;
}

export async function getInquiry(id: number) {
  const rows = (await sql()`SELECT * FROM inquiries WHERE id = ${id}`) as InquiryRow[];
  return rows[0] ? toInquiry(rows[0]) : null;
}

export async function listInquiries(): Promise<InquiryWithOffers[]> {
  const rows = (await sql()`
    SELECT i.*, COALESCE(
      json_agg(
        json_build_object('id', o.id, 'number', o.number, 'createdAt', o.created_at, 'total', o.total, 'sentAt', o.sent_at)
        ORDER BY o.created_at DESC
      ) FILTER (WHERE o.id IS NOT NULL),
      '[]'
    ) AS offers,
    CASE WHEN e.token IS NULL THEN NULL ELSE
      json_build_object('token', e.token, 'sent_at', e.sent_at, 'emailed_at', e.emailed_at, 'submitted_at', e.submitted_at, 'data', e.data)
    END AS event_details
    FROM inquiries i
    LEFT JOIN offers o ON o.inquiry_id = i.id
    LEFT JOIN event_details e ON e.inquiry_id = i.id
    GROUP BY i.id, e.inquiry_id
    ORDER BY i.created_at DESC
    LIMIT 300
  `) as (InquiryRow & { offers: OfferSummary[]; event_details: Parameters<typeof toEventDetailsRequest>[0] | null })[];

  return rows.map((row) => ({
    ...toInquiry(row),
    offers: row.offers.map((offer) => ({ ...offer, total: Number(offer.total) })),
    eventDetails: row.event_details ? toEventDetailsRequest(row.event_details) : null,
  }));
}

export async function setInquiryStatus(id: number, status: InquiryStatus) {
  const rows = (await sql()`UPDATE inquiries SET status = ${status} WHERE id = ${id} RETURNING id`) as { id: number }[];
  if (!rows[0]) throw new Error("Povpraševanje ne obstaja");
}

export async function setInquiryCrew(id: number, crew: string | null, students: string[]) {
  const rows = (await sql()`
    UPDATE inquiries SET crew = ${crew}, crew_students = ${JSON.stringify(students)}::jsonb WHERE id = ${id} RETURNING id
  `) as { id: number }[];
  if (!rows[0]) throw new Error("Povpraševanje ne obstaja");
}

export async function deleteInquiry(id: number) {
  await sql()`DELETE FROM inquiries WHERE id = ${id}`;
}

// Only new inquiries still need a reply, so the sidebar badge counts those.
export async function countActiveInquiries() {
  const rows = (await sql()`SELECT count(*)::int AS count FROM inquiries WHERE status = 'new'`) as { count: number }[];
  return rows[0].count;
}

export type CalendarEvent = {
  id: number;
  date: string;
  name: string;
  location: string;
  hours: string;
  type: StoredFormData["type"];
  startTime: string | null;
  crew: string | null;
  crewStudents: string[];
  // "Ne", an album name, or null when nobody has said yet.
  album: string | null;
  detailsSubmitted: boolean;
};

// What the customer said about the album: the event-details form wins over the original inquiry.
function calendarAlbum(form: StoredFormData, details: EventDetails | null) {
  if (details?.album === "no") return "Ne";
  if (details?.album === "yes") return albumLabel(details.albumSize, details.albumColor) || "Da";
  if (!form.albumSize) return null;
  return `${albumSizeLabels[form.albumSize]}${form.albumColor ? `, ${albumColorLabels[form.albumColor]}` : ""}`;
}

export async function listConfirmedEvents(): Promise<CalendarEvent[]> {
  const rows = (await sql()`
    SELECT i.id, i.form_data, i.crew, i.crew_students, e.data AS details
    FROM inquiries i
    LEFT JOIN event_details e ON e.inquiry_id = i.id
    WHERE i.status = 'confirmed'
  `) as { id: number; form_data: StoredFormData; crew: string | null; crew_students: string[]; details: EventDetails | null }[];

  return rows.flatMap((row) => {
    const date = toDateKey(row.form_data.date);
    if (!date) return [];
    const details = row.details;
    return [{
      id: row.id,
      date,
      name: row.form_data.name,
      // The customer's own answers are more precise than what they picked in the inquiry.
      location: details?.location || row.form_data.location || "",
      hours: details?.hours || row.form_data.hours,
      type: row.form_data.type,
      startTime: details?.startTime || null,
      crew: row.crew,
      crewStudents: row.crew_students,
      album: calendarAlbum(row.form_data, details),
      detailsSubmitted: Boolean(details),
    }];
  }).sort((a, b) => a.date.localeCompare(b.date) || (a.startTime ?? "").localeCompare(b.startTime ?? ""));
}
