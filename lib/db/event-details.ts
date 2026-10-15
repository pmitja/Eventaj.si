import { randomBytes } from "crypto";
import type { EventDetails, EventDetailsDraft } from "@/lib/event-details/schema";
import { eventTypes } from "@/lib/event-details/schema";
import { getInquiry, type Inquiry } from "./inquiries";
import { sql } from "./index";

export type EventDetailsRequest = {
  token: string;
  sentAt: string;
  submittedAt: string | null;
  data: EventDetails | null;
};

type Row = { inquiry_id: number; token: string; sent_at: Date; submitted_at: Date | null; data: EventDetails | null };

export function toEventDetailsRequest(row: Omit<Row, "inquiry_id">): EventDetailsRequest {
  return {
    token: row.token,
    sentAt: new Date(row.sent_at).toISOString(),
    submittedAt: row.submitted_at ? new Date(row.submitted_at).toISOString() : null,
    data: row.data,
  };
}

// Reuses the existing link when the form is sent again, so an older email still works.
export async function createEventDetailsRequest(inquiryId: number) {
  const rows = (await sql()`
    INSERT INTO event_details (inquiry_id, token)
    VALUES (${inquiryId}, ${randomBytes(24).toString("base64url")})
    ON CONFLICT (inquiry_id) DO UPDATE SET sent_at = now()
    RETURNING token
  `) as { token: string }[];
  return rows[0].token;
}

export async function getEventDetailsByToken(token: string): Promise<(EventDetailsRequest & { inquiry: Inquiry }) | null> {
  const rows = (await sql()`SELECT * FROM event_details WHERE token = ${token}`) as Row[];
  if (!rows[0]) return null;
  const inquiry = await getInquiry(rows[0].inquiry_id);
  return inquiry ? { ...toEventDetailsRequest(rows[0]), inquiry } : null;
}

export async function saveEventDetails(token: string, data: EventDetails) {
  const rows = (await sql()`
    UPDATE event_details SET data = ${JSON.stringify(data)}::jsonb, submitted_at = now()
    WHERE token = ${token}
    RETURNING inquiry_id
  `) as { inquiry_id: number }[];
  if (!rows[0]) throw new Error("Povezava ni veljavna");
  return rows[0].inquiry_id;
}

// What we already know from the inquiry, so the customer only checks and fills the gaps.
export function prefillEventDetails(inquiry: Inquiry): EventDetailsDraft {
  const form = inquiry.formData;
  const knownType = eventTypes.find((type) => type === form.eventType);
  const otherType = !knownType && form.eventType && form.eventType !== "Drugi dogodek" ? form.eventType : "";
  const hours = ["2", "3", "4"].includes(String(form.hours)) ? (String(form.hours) as EventDetails["hours"]) : "";
  return {
    location: form.location ?? "",
    eventType: knownType ?? (otherType ? "Drugo" : ""),
    eventTypeOther: otherType,
    startTime: "",
    hours,
    contactName: form.name ?? "",
    contactPhone: form.phone ?? "",
    album: form.albumSize ? "yes" : "",
    albumSize: form.albumSize ?? "",
    albumColor: form.albumColor ?? "",
    frameIdea: "",
    background: "",
  };
}
