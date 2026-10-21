"use server";

import { requireUserAction, setPassword } from "@/lib/admin-auth";

export async function changePassword(values: { password?: string; password2?: string }) {
  const user = await requireUserAction();
  const password = values.password ?? "";
  if (password.length < 8) return "Geslo mora imeti vsaj 8 znakov";
  if (password !== (values.password2 ?? "")) return "Gesli se ne ujemata";
  await setPassword(user.id, password);
  return null;
}
