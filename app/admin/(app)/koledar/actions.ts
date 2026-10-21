"use server";

import { revalidatePath } from "next/cache";
import { requireAdminAction } from "@/lib/admin-auth";
import { createYear, insertLedgerRow, parseValue } from "@/lib/db/ledger";
import { sql } from "@/lib/db";

export type NewCalendarEvent = {
  date: string;
  service: "Photo Booth" | "360° Booth" | "Mize";
  client: string;
  contact: string;
  location: string;
  startTime: string;
  hours: string;
  studentsNeeded: string;
  tableCount: string;
  execution: string;
  students: string[];
  notes: string;
};

type Result = { ok: true } | { ok: false; error: string };

// A day clicked in Koledar becomes a row in Poslovanje: booths go to Dogodki, tables to Najem miz,
// and each student picked gets a Študenti row linked to it, as if typed in there.
export async function addCalendarEvent(input: NewCalendarEvent): Promise<Result> {
  const user = await requireAdminAction();
  try {
    const date = parseValue("date", input.date);
    if (typeof date !== "string") throw new Error("Manjka datum");
    if (!input.client.trim()) throw new Error("Manjka naročnik");
    if (!["Photo Booth", "360° Booth", "Mize"].includes(input.service)) throw new Error("Neznana storitev");

    const year = Number(date.slice(0, 4));
    const years = (await sql()`SELECT 1 FROM ledger_years WHERE year = ${year}`) as unknown[];
    if (years.length === 0) await createYear(year);

    const tables = input.service === "Mize";
    const row = tables
      ? await insertLedgerRow("tables", year, user.email, {
          date,
          client: input.client,
          location: input.location,
          tableCount: input.tableCount,
          deliveredBy: input.execution,
          notes: input.notes,
        })
      : await insertLedgerRow("events", year, user.email, {
          date,
          client: input.client,
          contact: input.contact,
          hours: input.hours,
          startTime: input.startTime,
          location: input.location,
          service: input.service,
          execution: input.execution,
          studentsNeeded: input.execution === "Študenti" ? input.studentsNeeded : "",
          notes: input.notes,
        });

    for (const student of new Set(input.students.map((s) => s.trim()).filter(Boolean))) {
      await insertLedgerRow("students", year, user.email, { link: `${tables ? "t" : "e"}:${row.id}`, student });
    }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Napaka pri shranjevanju" };
  }
  revalidatePath("/admin", "layout");
  return { ok: true };
}
