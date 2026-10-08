"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ChevronDown, LogOut, Menu, Settings2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import type { LedgerCounts } from "@/lib/db/ledger";
import { cn } from "@/lib/utils";
import { logout } from "../actions";
import { LEDGER_TABS } from "./ledger-tabs";

type Props = {
  user: { name: string; email: string };
  inquiryCount: number;
  years: number[];
  counts: Record<number, LedgerCounts>;
  children: ReactNode;
};

type Location = { section: "inquiries" | "ledger" | "settings" | "profile"; year: number | null; tab: string };

function locate(pathname: string): Location {
  const parts = pathname.split("/").filter(Boolean); // ["admin", "poslovanje", "2026", "dogodki"]
  if (parts[1] === "profil") return { section: "profile", year: null, tab: "" };
  if (parts[1] === "poslovanje") {
    if (parts[2] === "nastavitve") return { section: "settings", year: null, tab: "" };
    const year = Number(parts[2]);
    return { section: "ledger", year: Number.isInteger(year) ? year : null, tab: parts[3] ?? "" };
  }
  return { section: "inquiries", year: null, tab: "" };
}

export function AdminShell({ user, inquiryCount, years, counts, children }: Props) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  // Separate layout groups so the active pill never flies between the desktop and mobile navs.
  const nav = (id: string) => (
    <LayoutGroup id={id}>
      <SidebarNav user={user} inquiryCount={inquiryCount} years={years} counts={counts} pathname={pathname} />
    </LayoutGroup>
  );

  return (
    <div className="lg:grid lg:min-h-screen lg:grid-cols-[252px_minmax(0,1fr)]">
      <aside className="sticky top-0 hidden h-screen flex-col gap-7 overflow-y-auto border-r border-adm-line bg-adm-side px-3.5 pb-4 pt-7 lg:flex">
        {nav("desktop")}
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-adm-line bg-adm-side/90 px-4 py-3 backdrop-blur lg:hidden">
        <Brand compact />
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Odpri meni"
          className="grid size-10 place-items-center rounded-full border border-adm-soft transition-colors hover:border-adm-ink"
        >
          <Menu className="size-5" />
        </button>
      </header>
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="admin-root flex w-[280px] flex-col gap-7 overflow-y-auto border-adm-line bg-adm-side px-3.5 pb-4 pt-7">
          <SheetTitle className="sr-only">Meni</SheetTitle>
          {nav("mobile")}
        </SheetContent>
      </Sheet>

      <div className="mx-auto box-border flex w-full min-w-0 max-w-[1560px] flex-col gap-7 px-4 pb-16 pt-6 sm:px-6 lg:px-10 lg:pt-9">
        {children}
      </div>
    </div>
  );
}

function Brand({ compact }: { compact?: boolean }) {
  return (
    <Link href="/admin" className="flex flex-col gap-1 px-3 hover:!text-adm-ink">
      <span className={cn("font-display leading-none tracking-[-0.01em]", compact ? "text-2xl" : "text-[28px]")}>
        eventaj<span className="text-[#8E8276]">.si</span>
      </span>
      {!compact && <span className="text-xs text-adm-muted">Interni dashboard</span>}
    </Link>
  );
}

function SidebarNav({ user, inquiryCount, years, counts, pathname }: Omit<Props, "children"> & { pathname: string }) {
  const here = locate(pathname);
  const thisYear = new Date().getFullYear();
  const year = here.year ?? (years.includes(thisYear) ? thisYear : years[years.length - 1] ?? null);
  const yearCounts = year ? counts[year] : undefined;
  const activeKey = here.section === "inquiries" ? "inquiries" : here.section === "ledger" ? `tab:${here.tab}` : null;

  return (
    <>
      <Brand />

      <div className="flex flex-col gap-0.5">
        <NavItem href="/admin" active={activeKey === "inquiries"} label="Povpraševanja">
          {inquiryCount > 0 && (
            <span className="rounded-full bg-adm-accent px-2 py-0.5 text-[11px] font-semibold text-adm-card">{inquiryCount}</span>
          )}
        </NavItem>
      </div>

      <div className="flex flex-col gap-0.5">
        <div className="flex items-center justify-between px-3 pb-2">
          <span className="text-[11px] uppercase tracking-[.08em] text-adm-muted">Poslovanje</span>
          {year && <YearPicker year={year} years={years} tab={here.section === "ledger" ? here.tab : ""} />}
        </div>
        {year ? (
          LEDGER_TABS.map((tab) => (
            <NavItem
              key={tab.slug}
              href={`/admin/poslovanje/${year}${tab.slug ? `/${tab.slug}` : ""}`}
              active={activeKey === `tab:${tab.slug}`}
              label={tab.label}
              small
            >
              {tab.count && yearCounts && <Count active={activeKey === `tab:${tab.slug}`} value={yearCounts[tab.count]} />}
            </NavItem>
          ))
        ) : (
          <NavItem href="/admin/poslovanje" active={here.section === "ledger"} label="Začni prvo leto" small />
        )}
      </div>

      <div className="mt-auto flex flex-col gap-1.5">
        <Link
          href="/admin/poslovanje/nastavitve"
          className={cn(
            "flex items-center gap-2 rounded-[10px] px-3 py-2 text-sm transition-colors hover:bg-adm-card/60",
            here.section === "settings" && "bg-adm-card shadow-[inset_0_0_0_1px_#CFC4B6]",
          )}
        >
          <Settings2 className="size-4 text-adm-muted" /> Nastavitve
        </Link>
        <Link
          href="/admin/profil"
          className={cn(
            "group flex items-center gap-2.5 rounded-[14px] border p-2.5 text-left transition-colors hover:border-adm-ink hover:!text-adm-ink",
            here.section === "profile" ? "border-adm-ink bg-adm-card" : "border-adm-line",
          )}
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-adm-ink font-display text-lg text-adm-bg transition-transform duration-300 group-hover:scale-105">
            {user.name.charAt(0).toUpperCase()}
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-sm font-semibold">{user.name}</span>
            <span className="truncate text-xs text-adm-muted">{user.email}</span>
          </span>
        </Link>
        <form action={logout}>
          <button type="submit" className="flex items-center gap-1.5 px-3 py-1 text-[13px] text-adm-muted transition-colors hover:text-adm-accent">
            <LogOut className="size-3.5" /> Odjava
          </button>
        </form>
      </div>
    </>
  );
}

function NavItem({ href, active, label, small, children }: { href: string; active: boolean; label: string; small?: boolean; children?: ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center justify-between rounded-[10px] px-3 text-sm transition-[color,box-shadow] duration-200",
        small ? "py-[9px]" : "py-2.5",
        active ? "!text-adm-bg" : "hover:shadow-[inset_0_0_0_1px_#CFC4B6]",
      )}
    >
      {active && (
        <motion.span
          layoutId="admin-nav-pill"
          className="absolute inset-0 rounded-[10px] bg-adm-ink"
          transition={{ type: "spring", stiffness: 420, damping: 36 }}
        />
      )}
      <span className="relative">{label}</span>
      <span className="relative">{children}</span>
    </Link>
  );
}

function Count({ value, active }: { value: number; active: boolean }) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.2 }}
        className={cn("inline-block text-xs tabular", active ? "text-adm-soft" : "text-[#8E8276]")}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

function YearPicker({ year, years, tab }: { year: number; years: number[]; tab: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 rounded-full bg-adm-ink py-0.5 pl-2.5 pr-1.5 text-xs text-adm-bg outline-none transition-opacity hover:opacity-85">
        {year}
        <ChevronDown className="size-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="admin-root min-w-[7rem] rounded-xl border-adm-ink bg-adm-card p-1">
        {years.map((y) => (
          <DropdownMenuItem key={y} asChild className={cn("rounded-lg tabular", y === year && "bg-adm-sand")}>
            <Link href={`/admin/poslovanje/${y}${tab ? `/${tab}` : ""}`}>{y}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
