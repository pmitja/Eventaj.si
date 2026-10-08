import type { FormField } from "@/components/forms/booking-form";
import { sql } from "./index";

export type StoredFormData = Omit<FormField, "date"> & { date: string };

export type Inquiry = {
  id: number;
  createdAt: string;
  formData: StoredFormData;
  totalPrice: number | null;
};

export type OfferSummary = {
  id: number;
  number: string;
  createdAt: string;
  total: number;
  sentAt: string | null;
};

export type InquiryWithOffers = Inquiry & { offers: OfferSummary[] };

type InquiryRow = {
  id: number;
  created_at: Date;
  form_data: StoredFormData;
  total_price: string | null;
};

function toInquiry(row: InquiryRow): Inquiry {
  return {
    id: row.id,
    createdAt: new Date(row.created_at).toISOString(),
    formData: row.form_data,
    totalPrice: row.total_price === null ? null : Number(row.total_price),
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
    ) AS offers
    FROM inquiries i
    LEFT JOIN offers o ON o.inquiry_id = i.id
    GROUP BY i.id
    ORDER BY i.created_at DESC
    LIMIT 300
  `) as (InquiryRow & { offers: OfferSummary[] })[];

  return rows.map((row) => ({
    ...toInquiry(row),
    offers: row.offers.map((offer) => ({ ...offer, total: Number(offer.total) })),
  }));
}

export async function deleteInquiry(id: number) {
  await sql()`DELETE FROM inquiries WHERE id = ${id}`;
}

export async function countInquiries() {
  const rows = (await sql()`SELECT count(*)::int AS count FROM inquiries`) as { count: number }[];
  return rows[0].count;
}
