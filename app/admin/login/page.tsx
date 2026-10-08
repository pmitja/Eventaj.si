import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { LoginForm } from "./login-form";

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main className="mx-auto max-w-sm px-4 pt-24">
      <h1 className="font-display text-[44px] font-normal leading-none tracking-[-0.01em]">
        eventaj<span className="text-[#8E8276]">.si</span>
      </h1>
      <p className="mt-3 text-sm text-adm-muted">Prijava za pregled povpraševanj in poslovanja.</p>
      <LoginForm />
    </main>
  );
}
