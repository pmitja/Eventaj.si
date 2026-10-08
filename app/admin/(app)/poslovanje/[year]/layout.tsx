import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { listYears } from "@/lib/db/ledger";
import { AddYearForm } from "../_components/add-year-form";

export default async function LedgerYearLayout({ children, params }: { children: ReactNode; params: Promise<{ year: string }> }) {
  const year = Number((await params).year);
  const years = await listYears();
  if (!years.includes(year)) notFound();

  return (
    <>
      {children}
      <footer className="flex flex-col gap-2.5 border-t border-adm-ink pt-[18px]">
        <AddYearForm suggested={years[years.length - 1] + 1} />
        <span className="text-xs text-adm-muted">
          Novo leto prevzame artikle z zalogo (trenutna zaloga postane začetna) in denar v fondu kot začetno stanje.
        </span>
      </footer>
    </>
  );
}
