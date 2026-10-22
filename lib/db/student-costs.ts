import { FUND } from "@/lib/ledger/compute";
import { getSlovenianDateString } from "@/lib/slovenian-date";
import { sql } from "./index";

const CATEGORY = "Plačilo študentov";

type Student = {
  id: number;
  year: number;
  student: string | null;
  amount: number | null;
  payer: string | null;
  paid: boolean;
  costId: number | null;
  code: string | null;
  client: string | null;
};

export type StudentPayState = { paid: boolean; amount: number | null; payer: string | null };

// A payment from Skupni fond is not a cost: it never goes to Stroški, so the fund is not lowered.
const payable = (row: StudentPayState) => row.paid && row.amount !== null && (row.payer ?? "").trim().toLowerCase() !== FUND.toLowerCase();

export async function studentPayState(id: number): Promise<StudentPayState | null> {
  const rows = (await sql()`SELECT paid, amount::float8 AS amount, payer FROM ledger_students WHERE id = ${id}`) as StudentPayState[];
  return rows[0] ?? null;
}

// Paying a student (Plačano? = DA with an amount, paid personally) books the payment in Stroški. The linked cost then
// follows the student row: amount, payer and description update, and it goes away when the
// payment is undone. Rows that were already paid before this existed have their costs entered by
// hand, so only a change into "paid" creates one.
export async function syncStudentCost(id: number, before: StudentPayState | null, by: string) {
  const rows = (await sql()`
    SELECT s.id, s.year, s.student, s.amount::float8 AS amount, s.payer, s.paid, s.cost_id AS "costId",
      COALESCE(e.code, t.code) AS code, COALESCE(e.client, t.client) AS client
    FROM ledger_students s
    LEFT JOIN ledger_events e ON e.id = s.event_id
    LEFT JOIN ledger_table_rentals t ON t.id = s.rental_id
    WHERE s.id = ${id}
  `) as Student[];
  const row = rows[0];
  if (!row) return;

  const description = [row.student ?? "Študent", row.code, row.client].filter(Boolean).join(" · ");
  if (row.costId !== null) {
    if (payable(row)) {
      await sql()`
        UPDATE ledger_costs SET year = ${row.year}, description = ${description}, amount = ${row.amount}, payer = ${row.payer},
          updated_by = ${by}, updated_at = now()
        WHERE id = ${row.costId}
      `;
    } else {
      await removeStudentCost(row.id, row.costId);
    }
    return;
  }
  if (!payable(row) || (before !== null && payable(before))) return;

  const inserted = (await sql()`
    INSERT INTO ledger_costs (year, date, category, description, amount, payer, updated_by)
    VALUES (${row.year}, ${getSlovenianDateString()}, ${CATEGORY}, ${description}, ${row.amount}, ${row.payer}, ${by})
    RETURNING id
  `) as { id: number }[];
  await sql()`UPDATE ledger_students SET cost_id = ${inserted[0].id} WHERE id = ${row.id}`;
}

// A cost that was already (partly) refunded to the payer stays in Stroški; only the link goes.
async function removeStudentCost(studentId: number, costId: number) {
  await sql()`UPDATE ledger_students SET cost_id = NULL WHERE id = ${studentId}`;
  await sql()`DELETE FROM ledger_costs WHERE id = ${costId} AND refunded IS NULL`;
}

export async function dropStudentCost(studentId: number) {
  const rows = (await sql()`SELECT cost_id FROM ledger_students WHERE id = ${studentId}`) as { cost_id: number | null }[];
  if (rows[0]?.cost_id) await removeStudentCost(studentId, rows[0].cost_id);
}
