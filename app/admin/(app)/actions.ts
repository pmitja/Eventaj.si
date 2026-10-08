"use server";

import { revalidatePath } from "next/cache";
import { requireAdminAction } from "@/lib/admin-auth";
import { deleteInquiry } from "@/lib/db/inquiries";
import { setOfferSent } from "@/lib/db/offers";

type Result<T> = { ok: true; value: T } | { ok: false; error: string };

async function attempt<T>(run: () => Promise<T>): Promise<Result<T>> {
  try {
    return { ok: true, value: await run() };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Napaka pri shranjevanju" };
  }
}

export async function removeInquiry(id: number) {
  await requireAdminAction();
  const result = await attempt(() => deleteInquiry(id));
  if (result.ok) revalidatePath("/admin");
  return result;
}

export async function markOfferSent(id: number, sent: boolean) {
  await requireAdminAction();
  const result = await attempt(() => setOfferSent(id, sent));
  if (result.ok) revalidatePath("/admin");
  return result;
}
