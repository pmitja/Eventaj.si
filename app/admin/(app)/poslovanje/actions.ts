"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createStudentAccount, deleteStudentAccount, requireAdminAction, resetStudentPassword } from "@/lib/admin-auth";
import {
  createYear,
  deleteLedgerRow,
  getLists,
  insertLedgerRow,
  parseValue,
  saveList,
  setFuelPrice,
  setFundOpening,
  updateLedgerField,
  type LedgerValue,
} from "@/lib/db/ledger";
import { setRowStudents } from "@/lib/db/ledger-sync";
import { LIST_KEYS, type ListKey } from "@/lib/ledger/lists";
import { LEDGER_TABLES, type LedgerTableName } from "@/lib/ledger/schema";

type Result<T> = { ok: true; value: T } | { ok: false; error: string };

function assertTable(name: string): asserts name is LedgerTableName {
  if (!(name in LEDGER_TABLES)) throw new Error("Neznana tabela");
}

async function attempt<T>(run: () => Promise<T>): Promise<Result<T>> {
  try {
    return { ok: true, value: await run() };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Napaka pri shranjevanju" };
  }
}

export async function updateField(table: string, id: number, field: string, value: LedgerValue) {
  const user = await requireAdminAction();
  assertTable(table);
  return attempt(() => updateLedgerField(table, id, field, value, user.email));
}

export async function addRow(table: string, year: number, fields: Record<string, LedgerValue> = {}) {
  const user = await requireAdminAction();
  assertTable(table);
  const result = await attempt(() => insertLedgerRow(table, year, user.email, fields));
  // Sidebar counts live in the layout.
  if (result.ok) revalidatePath("/admin", "layout");
  return result;
}

export async function removeRow(table: string, id: number) {
  await requireAdminAction();
  assertTable(table);
  const result = await attempt(() => deleteLedgerRow(table, id));
  if (result.ok) revalidatePath("/admin", "layout");
  return result;
}

// kind: a Dogodki row ("event") or a Najem miz row ("rental").
export async function updateRowStudents(kind: "event" | "rental", id: number, students: string[]) {
  const user = await requireAdminAction();
  const result = await attempt(async () => {
    const { students: known } = await getLists();
    const unknown = students.find((student) => !known.includes(student));
    if (unknown) throw new Error(`Neznan študent: ${unknown}`);
    if (kind !== "event" && kind !== "rental") throw new Error("Neznana vrsta vnosa");
    return setRowStudents(kind, id, students, user.email);
  });
  // Študenti, Koledar, the inquiry card and the students' own schedule all show it.
  if (result.ok) revalidatePath("/admin", "layout");
  return result;
}

export async function updateFundOpening(year: number, value: string) {
  await requireAdminAction();
  return attempt(async () => {
    const amount = parseValue("number", value);
    await setFundOpening(year, typeof amount === "number" ? amount : 0);
    revalidatePath(`/admin/poslovanje/${year}`);
    return amount;
  });
}

export async function updateFuelPrice(year: number, value: string) {
  await requireAdminAction();
  return attempt(async () => {
    const price = parseValue("number", value);
    if (typeof price !== "number" || price <= 0) throw new Error("Vpišite ceno litra, npr. 1,90");
    await setFuelPrice(year, price);
    revalidatePath(`/admin/poslovanje/${year}/prispevki`);
    return price;
  });
}

export async function addYear(formData: FormData) {
  await requireAdminAction();
  const year = Number(formData.get("year"));
  if (!Number.isInteger(year) || year < 2000 || year > 2100) throw new Error("Neveljavno leto");
  await createYear(year);
  redirect(`/admin/poslovanje/${year}`);
}

export async function saveLists(_: string | null, formData: FormData) {
  await requireAdminAction();
  for (const key of LIST_KEYS) {
    const raw = formData.get(key);
    if (typeof raw !== "string") continue;
    const items = [...new Set(raw.split("\n").map((item) => item.trim()).filter(Boolean))];
    await saveList(key as ListKey, items);
  }
  revalidatePath("/admin/poslovanje", "layout");
  return `Shranjeno ${Date.now()}`;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Student logins: they see only their own schedule at /admin/razpored.
export async function addStudentAccount(values: { student?: string; email?: string; password?: string }) {
  await requireAdminAction();
  const student = values.student?.trim() ?? "";
  const email = values.email?.trim() ?? "";
  const password = values.password ?? "";
  if (!student) return "Izberite študenta";
  if (!EMAIL.test(email)) return "Neveljaven e-naslov";
  if (password.length < 8) return "Geslo mora imeti vsaj 8 znakov";
  try {
    await createStudentAccount(student, email, password);
  } catch (error) {
    return error instanceof Error ? error.message : "Shranjevanje ni uspelo";
  }
  revalidatePath("/admin/poslovanje/nastavitve");
  return null;
}

export async function setStudentAccountPassword(id: number, values: { password?: string }) {
  await requireAdminAction();
  const password = values.password ?? "";
  if (password.length < 8) return "Geslo mora imeti vsaj 8 znakov";
  try {
    await resetStudentPassword(id, password);
  } catch (error) {
    return error instanceof Error ? error.message : "Shranjevanje ni uspelo";
  }
  return null;
}

export async function removeStudentAccount(id: number) {
  await requireAdminAction();
  await deleteStudentAccount(id);
  revalidatePath("/admin/poslovanje/nastavitve");
}
