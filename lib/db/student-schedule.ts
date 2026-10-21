import type { EventDetails } from "@/lib/event-details/schema";
import { eventTypeText } from "@/lib/event-details/schema";
import { cleanTime, toDateKey } from "@/lib/slovenian-date";
import type { StoredFormData } from "./inquiries";
import { sql } from "./index";

// One event or table rental a student works, with everything they need on the day and what they earn.
export type StudentShift = {
  key: string;
  date: string;
  title: string;
  service: string | null;
  eventType: string | null;
  startTime: string | null;
  hours: number | null;
  location: string | null;
  contactName: string | null;
  contactPhone: string | null;
  album: string | null;
  background: string | null;
  tables: number | null;
  // For table rentals: whether this student delivers, picks up or both.
  task: string | null;
  notes: string | null;
  // Who else goes: the execution (Jan, Mitja …) and the other students.
  crew: string[];
  // Null until the amount is entered in Poslovanje → Študenti.
  amount: number | null;
  paid: boolean;
};

type EventRow = {
  id: number;
  date: string;
  client: string | null;
  service: string | null;
  hours: number | null;
  startTime: string | null;
  location: string | null;
  albumUsed: boolean;
  album: string | null;
  notes: string | null;
  execution: string | null;
  inquiryId: number | null;
  form: StoredFormData | null;
  details: EventDetails | null;
  amount: number | null;
  paid: boolean;
  others: string[];
};

type RentalRow = {
  id: number;
  date: string;
  client: string | null;
  location: string | null;
  tableCount: number | null;
  deliveredBy: string | null;
  pickedBy: string | null;
  notes: string | null;
  inquiryId: number | null;
  form: StoredFormData | null;
  amount: number | null;
  paid: boolean | null;
  others: string[];
};

type InquiryRow = {
  id: number;
  form: StoredFormData;
  crew: string | null;
  crewStudents: string[];
  note: string | null;
  details: EventDetails | null;
};

const INQUIRY_SERVICES: Record<StoredFormData["type"], string> = {
  basic: "Photo Booth",
  "360": "360° Booth",
  both: "Photo Booth + 360°",
  equipment: "Najem opreme",
};

const same = (a: string | null | undefined, b: string) => (a ?? "").trim().toLowerCase() === b;

// "Študenti" only says students go, the names are already in the list.
function crewOf(execution: string | null, students: string[], name: string) {
  const people = [execution && execution !== "Študenti" ? execution : null, ...students.filter((s) => !same(s, name))];
  return [...new Set(people.filter((p): p is string => Boolean(p)))];
}

// A student can have more than one Študenti row for the same event (e.g. a bonus): add them up.
function addPay(shift: StudentShift, amount: number | null, paid: boolean) {
  if (amount !== null) shift.amount = (shift.amount ?? 0) + amount;
  shift.paid = shift.paid && paid;
}

function fromEvent(row: EventRow, name: string): StudentShift {
  const details = row.details;
  return {
    key: `e${row.id}`,
    date: row.date,
    title: row.client || row.form?.name || "Dogodek",
    service: row.service,
    eventType: details ? eventTypeText(details) : row.form?.eventType || null,
    startTime: cleanTime(row.startTime || details?.startTime),
    hours: row.hours ?? (Number(details?.hours || row.form?.hours) || null),
    location: row.location || details?.location || row.form?.location || null,
    contactName: details?.contactName || row.form?.name || null,
    contactPhone: details?.contactPhone || row.form?.phone || null,
    album: row.albumUsed ? row.album || "Da" : null,
    background: details?.background || null,
    tables: null,
    task: null,
    notes: row.notes,
    crew: crewOf(row.execution, row.others, name),
    amount: row.amount,
    paid: row.paid,
  };
}

function rentalTask(row: RentalRow, name: string) {
  const delivers = same(row.deliveredBy, name);
  const picks = same(row.pickedBy, name);
  if (delivers && picks) return "Dostava in prevzem miz";
  if (delivers) return "Dostava miz";
  if (picks) return "Prevzem miz";
  return null;
}

function fromRental(row: RentalRow, name: string): StudentShift {
  const drivers = [row.deliveredBy, row.pickedBy].filter((p) => p && !same(p, name) && p !== "BREZ DOSTAVE") as string[];
  return {
    key: `t${row.id}`,
    date: row.date,
    title: row.client || row.form?.name || "Najem miz",
    service: "Najem miz",
    eventType: null,
    startTime: null,
    hours: null,
    location: row.location || row.form?.location || null,
    contactName: row.form?.name || null,
    contactPhone: row.form?.phone || null,
    album: null,
    background: null,
    tables: row.tableCount,
    task: rentalTask(row, name),
    notes: row.notes,
    crew: [...new Set([...drivers, ...row.others])],
    amount: row.amount,
    paid: row.paid ?? true,
  };
}

// A confirmed inquiry the student is crewed on that has no Dogodki / Najem miz row of its own yet.
function fromInquiry(row: InquiryRow, date: string, name: string): StudentShift {
  const { form, details } = row;
  return {
    key: `i${row.id}`,
    date,
    title: form.name || "Dogodek",
    service: form.type === "equipment" ? form.equipmentSummary || INQUIRY_SERVICES.equipment : INQUIRY_SERVICES[form.type],
    eventType: details ? eventTypeText(details) : form.eventType || null,
    startTime: details?.startTime || null,
    hours: Number(details?.hours || form.hours) || null,
    location: details?.location || form.location || null,
    contactName: details?.contactName || form.name || null,
    contactPhone: details?.contactPhone || form.phone || null,
    album: null,
    background: details?.background || null,
    tables: null,
    task: null,
    notes: row.note,
    crew: crewOf(row.crew, row.crewStudents, name),
    amount: null,
    paid: false,
  };
}

export async function getStudentSchedule(student: string): Promise<StudentShift[]> {
  const name = student.trim().toLowerCase();
  const [events, rentals, inquiries] = (await Promise.all([
    sql()`
      SELECT e.id, to_char(e.date, 'YYYY-MM-DD') AS date, e.client, e.service, e.hours::float8 AS hours,
        e.start_time AS "startTime", e.location,
        e.album_used AS "albumUsed", e.album, e.notes, e.execution, e.inquiry_id AS "inquiryId",
        i.form_data AS form, d.data AS details, s.amount::float8 AS amount, s.paid,
        ARRAY(SELECT o.student FROM ledger_students o WHERE o.event_id = e.id AND o.student IS NOT NULL ORDER BY o.id) AS others
      FROM ledger_students s
      JOIN ledger_events e ON e.id = s.event_id
      LEFT JOIN inquiries i ON i.id = e.inquiry_id
      LEFT JOIN event_details d ON d.inquiry_id = e.inquiry_id
      WHERE lower(trim(s.student)) = ${name} AND e.date IS NOT NULL
    `,
    sql()`
      SELECT t.id, to_char(t.date, 'YYYY-MM-DD') AS date, t.client, t.location, t.table_count::float8 AS "tableCount",
        t.delivered_by AS "deliveredBy", t.picked_by AS "pickedBy", t.notes, t.inquiry_id AS "inquiryId",
        i.form_data AS form, s.amount::float8 AS amount, s.paid,
        ARRAY(SELECT o.student FROM ledger_students o
          WHERE o.rental_id = t.id AND o.student IS NOT NULL AND lower(trim(o.student)) <> ${name} ORDER BY o.id) AS others
      FROM ledger_table_rentals t
      LEFT JOIN ledger_students s ON s.rental_id = t.id AND lower(trim(s.student)) = ${name}
      LEFT JOIN inquiries i ON i.id = t.inquiry_id
      WHERE t.date IS NOT NULL
        AND (s.id IS NOT NULL OR lower(trim(t.delivered_by)) = ${name} OR lower(trim(t.picked_by)) = ${name})
    `,
    sql()`
      SELECT i.id, i.form_data AS form, i.crew, i.crew_students AS "crewStudents", i.note, d.data AS details
      FROM inquiries i
      LEFT JOIN event_details d ON d.inquiry_id = i.id
      WHERE i.status = 'confirmed'
        AND EXISTS (SELECT 1 FROM jsonb_array_elements_text(i.crew_students) x WHERE lower(trim(x)) = ${name})
    `,
  ])) as [EventRow[], RentalRow[], InquiryRow[]];

  const shifts = new Map<string, StudentShift>();
  const covered = new Set<number>();
  for (const row of events) {
    const existing = shifts.get(`e${row.id}`);
    if (existing) addPay(existing, row.amount, row.paid);
    else shifts.set(`e${row.id}`, fromEvent(row, name));
    if (row.inquiryId !== null) covered.add(row.inquiryId);
  }
  for (const row of rentals) {
    const existing = shifts.get(`t${row.id}`);
    if (existing) addPay(existing, row.amount, row.paid ?? true);
    else shifts.set(`t${row.id}`, fromRental(row, name));
    if (row.inquiryId !== null) covered.add(row.inquiryId);
  }
  for (const row of inquiries) {
    const date = toDateKey(row.form.date);
    if (date && !covered.has(row.id)) shifts.set(`i${row.id}`, fromInquiry(row, date, name));
  }

  return [...shifts.values()].sort((a, b) => a.date.localeCompare(b.date) || (a.startTime ?? "").localeCompare(b.startTime ?? ""));
}
