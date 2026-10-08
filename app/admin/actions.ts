"use server";

import { redirect } from "next/navigation";
import { authenticate, createSession, destroySession } from "@/lib/admin-auth";

export async function login(_: string | null, formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const user = await authenticate(email, password);
  if (!user) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return "Napačen e-naslov ali geslo";
  }
  await createSession(user.id);
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}
