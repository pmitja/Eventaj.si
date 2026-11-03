import { sql } from "./index";

// Days one or more of us can't work events (holiday, travel …). Both dates are included.
export type Absence = { id: number; from: string; to: string; people: string[]; note: string | null };

export async function listAbsences(): Promise<Absence[]> {
  try {
    const rows = (await sql()`
      SELECT id, to_char(date_from, 'YYYY-MM-DD') AS "from", to_char(date_to, 'YYYY-MM-DD') AS "to", people, note
      FROM absences
      ORDER BY date_from, date_to, id
    `) as Absence[];
    return rows.map((row) => ({ ...row, people: row.people ?? [] }));
  } catch (error) {
    // Table not made yet (scripts/db-migrate.mjs not run): the calendar still works, just without absences.
    if ((error as { code?: string }).code === "42P01") return [];
    throw error;
  }
}

export async function insertAbsence(input: { from: string; to: string; people: string[]; note: string | null }, by: string) {
  await sql()`
    INSERT INTO absences (date_from, date_to, people, note, created_by)
    VALUES (${input.from}, ${input.to}, ${JSON.stringify(input.people)}::jsonb, ${input.note}, ${by})
  `;
}

export async function deleteAbsence(id: number) {
  await sql()`DELETE FROM absences WHERE id = ${id}`;
}
