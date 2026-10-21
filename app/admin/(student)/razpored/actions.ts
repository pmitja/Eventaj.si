"use server";

import { revalidatePath } from "next/cache";
import { requireUserAction, setPassword } from "@/lib/admin-auth";
import { claimOpenEvent } from "@/lib/db/open-events";
import { getSlovenianDateString } from "@/lib/slovenian-date";

export async function changePassword(values: { password?: string; password2?: string }) {
  const user = await requireUserAction();
  const password = values.password ?? "";
  if (password.length < 8) return "Geslo mora imeti vsaj 8 znakov";
  if (password !== (values.password2 ?? "")) return "Gesli se ne ujemata";
  await setPassword(user.id, password);
  return null;
}

// A student signs up for an open event and is on the crew right away.
export async function claimEvent(key: string): Promise<string | null> {
  const user = await requireUserAction();
  if (user.role !== "student" || !user.student) return "Na dogodek se lahko prijavi samo študent";
  try {
    await claimOpenEvent(key, user.student, getSlovenianDateString());
  } catch (error) {
    return error instanceof Error ? error.message : "Prijava ni uspela";
  }
  revalidatePath("/admin", "layout");
  return null;
}
