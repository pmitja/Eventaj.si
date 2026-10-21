import type { EventDetails } from "@/lib/event-details/schema";
import { eventTypeText } from "@/lib/event-details/schema";
import { STUDENTS_NEEDED } from "@/lib/ledger/lists";
import { cleanTime, toDateKey } from "@/lib/slovenian-date";
import type { StoredFormData } from "./inquiries";
import { sql } from "./index";
import { syncInquiryToLedger } from "./ledger-sync";

// An event goes out to students when its execution is "Študenti" and fewer students are on it than it
// needs. How many it needs is set on its Dogodki row (Št. študentov); empty means STUDENTS_NEEDED.

const STUDENTS = "Študenti";

// An upcoming event students can sign up for. The key says where the crew lives: "i<id>" for a
// confirmed inquiry (crew on the inquiry, synced to Dogodki), "e<id>" for a Dogodki row typed in by hand.
export type OpenEvent = {
  key: string;
  date: string;
  service: string;
  eventType: string | null;
  startTime: string | null;
  hours: number | null;
  location: string | null;
  going: string[];
  free: number;
};

const SERVICES: Partial<Record<StoredFormData["type"], string>> = { basic: "Photo Booth", "360": "360° Booth", both: "Photo Booth + 360°" };

const same = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

type Ledger = { needed: number | null; startTime: string | null; location: string | null };
type InquiryRow = Ledger & { id: number; form: StoredFormData; students: string[]; details: EventDetails | null };
type EventRow = Ledger & { id: number; date: string; service: string | null; hours: number | null; students: string[] };

const neededOf = (row: Ledger) => (row.needed && row.needed > 0 ? row.needed : STUDENTS_NEEDED);

async function openInquiries(today: string) {
  const rows = (await sql()`
    SELECT i.id, i.form_data AS form, i.crew_students AS students, d.data AS details,
      e.students_needed::float8 AS needed, e.start_time AS "startTime", e.location
    FROM inquiries i
    LEFT JOIN event_details d ON d.inquiry_id = i.id
    LEFT JOIN ledger_events e ON e.inquiry_id = i.id
    WHERE i.status = 'confirmed' AND i.crew = ${STUDENTS}
  `) as InquiryRow[];
  return rows.flatMap((row): OpenEvent[] => {
    const date = toDateKey(row.form.date);
    const service = SERVICES[row.form.type];
    const free = neededOf(row) - row.students.length;
    if (!date || date < today || !service || free <= 0) return [];
    const { details, form } = row;
    return [{
      key: `i${row.id}`,
      date,
      service,
      eventType: details ? eventTypeText(details) : form.eventType || null,
      startTime: cleanTime(row.startTime || details?.startTime),
      hours: Number(details?.hours || form.hours) || null,
      location: row.location || details?.location || form.location || null,
      going: row.students,
      free,
    }];
  });
}

async function openLedgerEvents(today: string) {
  const rows = (await sql()`
    SELECT e.id, to_char(e.date, 'YYYY-MM-DD') AS date, e.service, e.hours::float8 AS hours,
      e.students_needed::float8 AS needed, e.start_time AS "startTime", e.location,
      ARRAY(SELECT s.student FROM ledger_students s WHERE s.event_id = e.id AND s.student IS NOT NULL ORDER BY s.id) AS students
    FROM ledger_events e
    WHERE e.inquiry_id IS NULL AND e.execution = ${STUDENTS} AND e.date >= ${today}::date
  `) as EventRow[];
  return rows
    .filter((row) => row.students.length < neededOf(row))
    .map((row): OpenEvent => ({
      key: `e${row.id}`,
      date: row.date,
      service: row.service || "Dogodek",
      eventType: null,
      startTime: cleanTime(row.startTime),
      hours: row.hours,
      location: row.location,
      going: row.students,
      free: neededOf(row) - row.students.length,
    }));
}

// Events still missing students, without the ones this student already works.
export async function listOpenEvents(student: string, today: string) {
  const all = [...(await openInquiries(today)), ...(await openLedgerEvents(today))];
  return all
    .filter((event) => !event.going.some((name) => same(name, student)))
    .sort((a, b) => a.date.localeCompare(b.date) || (a.startTime ?? "").localeCompare(b.startTime ?? ""));
}

// Puts the student on the event straight away, as long as a place is still free. The free-place
// check sits in the same statement as the write, so a place taken a moment ago is not given out again.
export async function claimOpenEvent(key: string, student: string, today: string) {
  const id = Number(key.slice(1));
  if (!Number.isInteger(id)) throw new Error("Neznan dogodek");

  if (key.startsWith("i")) {
    const open = (await openInquiries(today)).some((event) => event.key === key);
    if (!open) throw new Error("Ta dogodek ni več odprt");
    const rows = (await sql()`
      UPDATE inquiries SET crew_students = crew_students || to_jsonb(${student}::text)
      WHERE id = ${id} AND status = 'confirmed' AND crew = ${STUDENTS}
        AND jsonb_array_length(crew_students) < COALESCE(
          (SELECT NULLIF(students_needed, 0) FROM ledger_events WHERE inquiry_id = ${id}), ${STUDENTS_NEEDED})
        AND NOT crew_students ? ${student}
      RETURNING id
    `) as { id: number }[];
    if (!rows[0]) throw new Error("Mesta so že zapolnjena");
    await syncInquiryToLedger(id);
    return;
  }

  if (key.startsWith("e")) {
    const rows = (await sql()`
      WITH event AS (
        SELECT id, year, COALESCE(NULLIF(students_needed, 0), ${STUDENTS_NEEDED}) AS needed FROM ledger_events
        WHERE id = ${id} AND inquiry_id IS NULL AND execution = ${STUDENTS} AND date >= ${today}::date
        FOR UPDATE
      )
      INSERT INTO ledger_students (year, event_id, student, updated_by)
      SELECT event.year, event.id, ${student}, ${`Prijava: ${student}`} FROM event
      WHERE (SELECT count(*) FROM ledger_students s WHERE s.event_id = event.id AND s.student IS NOT NULL) < event.needed
        AND NOT EXISTS (SELECT 1 FROM ledger_students s WHERE s.event_id = event.id AND lower(trim(s.student)) = lower(${student}))
      RETURNING id
    `) as { id: number }[];
    if (!rows[0]) throw new Error("Ta dogodek ni več odprt ali so mesta zapolnjena");
    return;
  }

  throw new Error("Neznan dogodek");
}
