import type { EventDetails } from "@/lib/event-details/schema";
import { toDateKey } from "@/lib/slovenian-date";
import type { StoredFormData } from "./inquiries";
import { sql } from "./index";
import { createYear, insertLedgerRow } from "./ledger";

// Inquiry type → "Storitev" in Dogodki. Equipment rentals are not photo booth events.
const SERVICES: Partial<Record<StoredFormData["type"], string>> = { basic: "Photo Booth", "360": "360° Booth", both: "Bundle" };

// Same names as the album items in Zaloga, so stock usage keeps counting them.
function stockAlbum(size: string | undefined, color: string | undefined) {
  if (size !== "small" && size !== "large") return null;
  const name = size === "large" ? "Veliki album" : "Mali album";
  return `${name} ${color === "white" ? "z belimi platnicami" : "s črnimi platnicami"}`;
}

function album(form: StoredFormData, details: EventDetails | null) {
  if (details) return details.album === "yes" ? stockAlbum(details.albumSize, details.albumColor) : null;
  return stockAlbum(form.albumSize, form.albumColor);
}

type Linked = { id: number; year: number; transfer: number | null; cash: number | null };

// A confirmed booth inquiry keeps one row in Poslovanje → Dogodki, plus a Študenti row per student
// going. Only what the inquiry knows is written (date, client, hours, service, album, execution);
// money, km, cartridge and notes stay manual. Rows nobody has touched are removed again when the
// inquiry stops being confirmed.
export async function syncInquiryToLedger(inquiryId: number) {
  const rows = (await sql()`
    SELECT i.status, i.form_data, i.crew, i.crew_students, e.data AS details
    FROM inquiries i LEFT JOIN event_details e ON e.inquiry_id = i.id
    WHERE i.id = ${inquiryId}
  `) as { status: string; form_data: StoredFormData; crew: string | null; crew_students: string[]; details: EventDetails | null }[];
  const linked = (await sql()`
    SELECT id, year, transfer::float8 AS transfer, cash::float8 AS cash FROM ledger_events WHERE inquiry_id = ${inquiryId}
  `) as Linked[];
  const row = rows[0];
  const service = row ? SERVICES[row.form_data.type] : undefined;
  const date = row ? toDateKey(row.form_data.date) : null;

  if (!row || row.status !== "confirmed" || !service || !date) {
    if (linked[0]) await removeUntouched(linked[0]);
    return;
  }

  const year = Number(date.slice(0, 4));
  const years = (await sql()`SELECT 1 FROM ledger_years WHERE year = ${year}`) as unknown[];
  if (years.length === 0) await createYear(year);

  const by = `Povpraševanje #${inquiryId}`;
  const albumName = album(row.form_data, row.details);
  const hours = Number(row.details?.hours || row.form_data.hours) || null;
  const fields = { date, client: row.form_data.name, hours, service, albumUsed: Boolean(albumName), album: albumName, execution: row.crew };

  let eventId: number;
  if (linked[0]) {
    eventId = linked[0].id;
    await sql()`
      UPDATE ledger_events SET year = ${year}, date = ${date}, client = ${fields.client}, hours = ${hours}, service = ${service},
        album_used = ${fields.albumUsed}, album = ${albumName}, execution = ${row.crew}, updated_by = ${by}, updated_at = now()
      WHERE id = ${eventId}
    `;
  } else {
    const inserted = await insertLedgerRow("events", year, by, fields);
    eventId = Number(inserted.id);
    await sql()`UPDATE ledger_events SET inquiry_id = ${inquiryId} WHERE id = ${eventId}`;
  }

  const students = (await sql()`
    SELECT id, student, amount, paid FROM ledger_students WHERE event_id = ${eventId}
  `) as { id: number; student: string | null; amount: string | null; paid: boolean }[];
  const wanted = new Set(row.crew_students);
  for (const student of wanted) {
    if (!students.some((s) => s.student === student)) {
      await sql()`INSERT INTO ledger_students (year, event_id, student, updated_by) VALUES (${year}, ${eventId}, ${student}, ${by})`;
    }
  }
  for (const s of students) {
    if (s.student && !wanted.has(s.student) && s.amount === null && !s.paid) await sql()`DELETE FROM ledger_students WHERE id = ${s.id}`;
  }
  await sql()`UPDATE ledger_students SET year = ${year} WHERE event_id = ${eventId} AND year <> ${year}`;
}

// Before an inquiry is deleted: its Dogodki row goes too, unless it already holds bookkeeping.
export async function dropInquiryFromLedger(inquiryId: number) {
  const linked = (await sql()`
    SELECT id, year, transfer::float8 AS transfer, cash::float8 AS cash FROM ledger_events WHERE inquiry_id = ${inquiryId}
  `) as Linked[];
  if (linked[0]) await removeUntouched(linked[0]);
}

// Once money is entered (or a student is paid) the row is real bookkeeping and stays.
async function removeUntouched(event: Linked) {
  if (event.transfer !== null || event.cash !== null) return;
  const paid = (await sql()`
    SELECT 1 FROM ledger_students WHERE event_id = ${event.id} AND (amount IS NOT NULL OR paid)
  `) as unknown[];
  if (paid.length) return;
  await sql()`DELETE FROM ledger_students WHERE event_id = ${event.id}`;
  await sql()`DELETE FROM ledger_events WHERE id = ${event.id}`;
}
