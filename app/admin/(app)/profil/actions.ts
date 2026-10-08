"use server";

import { revalidatePath } from "next/cache";
import { requireAdminAction, updateAdminUser } from "@/lib/admin-auth";

export async function updateProfile(values: { name?: string; email?: string; password?: string; password2?: string }) {
  const user = await requireAdminAction();
  const name = values.name?.trim() ?? "";
  const email = values.email?.trim() ?? "";
  const password = values.password ?? "";
  if (!name) return "Vpišite ime";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Neveljaven e-naslov";
  if (password && password.length < 8) return "Geslo mora imeti vsaj 8 znakov";
  if (password !== (values.password2 ?? "")) return "Gesli se ne ujemata";
  try {
    await updateAdminUser(user.id, { name, email, password: password || undefined });
  } catch (error) {
    return error instanceof Error ? error.message : "Shranjevanje ni uspelo";
  }
  revalidatePath("/admin", "layout");
  return null;
}
