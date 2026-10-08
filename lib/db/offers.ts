import type { OfferContent, OfferOptions } from "@/lib/offers/schema";
import type { OfferItem } from "@/lib/offers/pricing";
import { sql } from "./index";

export type Offer = {
  id: number;
  inquiryId: number;
  number: string;
  createdAt: string;
  options: OfferOptions & { date: string; validUntil: string };
  content: OfferContent;
  items: OfferItem[];
  total: number;
};

type OfferRow = {
  id: number;
  inquiry_id: number;
  number: string;
  created_at: Date;
  options: Offer["options"];
  content: OfferContent;
  items: OfferItem[];
  total: string;
};

export async function nextOfferNumber(year: number) {
  const rows = (await sql()`
    SELECT COUNT(*)::int AS count FROM offers WHERE number LIKE ${`${year}-%`}
  `) as { count: number }[];
  return `${year}-${String(rows[0].count + 1).padStart(3, "0")}`;
}

export async function insertOffer(offer: Omit<Offer, "id" | "createdAt">) {
  const rows = (await sql()`
    INSERT INTO offers (inquiry_id, number, options, content, items, total)
    VALUES (
      ${offer.inquiryId},
      ${offer.number},
      ${JSON.stringify(offer.options)}::jsonb,
      ${JSON.stringify(offer.content)}::jsonb,
      ${JSON.stringify(offer.items)}::jsonb,
      ${offer.total}
    )
    RETURNING id
  `) as { id: number }[];
  return rows[0].id;
}

export async function getOffer(id: number): Promise<Offer | null> {
  const rows = (await sql()`SELECT * FROM offers WHERE id = ${id}`) as OfferRow[];
  const row = rows[0];
  if (!row) return null;
  return {
    id: row.id,
    inquiryId: row.inquiry_id,
    number: row.number,
    createdAt: new Date(row.created_at).toISOString(),
    // Offers created before 360° support have no service.
    options: { ...row.options, service: row.options.service ?? "photo" },
    content: row.content,
    items: row.items,
    total: Number(row.total),
  };
}

export async function setOfferSent(id: number, sent: boolean) {
  const rows = (await sql()`
    UPDATE offers SET sent_at = ${sent ? new Date().toISOString() : null}
    WHERE id = ${id}
    RETURNING sent_at
  `) as { sent_at: Date | null }[];
  if (!rows[0]) throw new Error("Ponudba ne obstaja");
  return rows[0].sent_at ? new Date(rows[0].sent_at).toISOString() : null;
}
