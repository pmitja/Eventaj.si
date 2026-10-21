import { ArrowLeft, LogOut } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getAdminUser } from "@/lib/admin-auth";
import { logout } from "../actions";
import { PasswordButton } from "./razpored/_components/password-button";

// Students only get their schedule: no sidebar, just who is signed in and a way out.
export default async function StudentLayout({ children }: { children: ReactNode }) {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-adm-line bg-adm-side/90 backdrop-blur">
        <div className="mx-auto flex max-w-[880px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <span className="font-display text-2xl leading-none tracking-[-0.01em]">
            eventaj<span className="text-[#8E8276]">.si</span>
          </span>
          <div className="flex items-center gap-4">
            {user.role === "admin" ? (
              <Link href="/admin/poslovanje/nastavitve" className="flex items-center gap-1.5 text-[13px] text-adm-muted transition-colors hover:!text-adm-ink">
                <ArrowLeft className="size-3.5" /> Nazaj v admin
              </Link>
            ) : (
              <PasswordButton />
            )}
            <form action={logout}>
              <button type="submit" className="flex items-center gap-1.5 text-[13px] text-adm-muted transition-colors hover:text-adm-accent">
                <LogOut className="size-3.5" /> Odjava
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto box-border flex w-full max-w-[880px] flex-col gap-7 px-4 pb-16 pt-6 sm:px-6 sm:pt-9">{children}</main>
    </>
  );
}
