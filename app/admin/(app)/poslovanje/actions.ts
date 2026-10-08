"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminAction } from "@/lib/admin-auth";
import {
  createYear,
  deleteLedgerRow,
  insertLedgerRow,
  parseValue,
  saveList,
  setFundOpening,
  updateLedgerField,
  type LedgerValue,
} from "@/lib/db/ledger";
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

export async function updateFundOpening(year: number, value: string) {
  await requireAdminAction();
  return attempt(async () => {
    const amount = parseValue("number", value);
    await setFundOpening(year, typeof amount === "number" ? amount : 0);
    revalidatePath(`/admin/poslovanje/${year}`);
    return amount;
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
