"use client";

import { motion } from "framer-motion";
import { ChevronRight, Plus } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Stagger } from "@/app/admin/_components/motion";
import { PageHeader } from "@/app/admin/_components/page-header";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { formatEur } from "@/lib/ledger/compute";
import type { LedgerTableName } from "@/lib/ledger/schema";
import { addRow } from "../actions";
import type { GridRow } from "./ledger-grid";

// Parses Slovenian number input ("1.234,50", "12,5", "12.5") for live previews.
export function parseAmount(value: string | undefined) {
  const text = (value ?? "").trim();
  if (!text) return 0;
  const normalized = text.includes(",") ? text.replace(/\./g, "").replace(",", ".") : text;
  const n = Number(normalized.replace(/[€\s]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function nextCode(prefix: string, codes: (string | null)[]) {
  const max = codes.reduce((top, code) => {
    const match = code?.match(/(\d+)$/);
    return match ? Math.max(top, Number(match[1])) : top;
  }, 0);
  return `${prefix}-${String(max + 1).padStart(3, "0")}`;
}

export function useLedgerRows<R extends GridRow>(table: LedgerTableName, year: number, initial: R[]) {
  const [rows, setRows] = useState(initial);
  const [highlight, setHighlight] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);

  // onCreated runs once the row exists, for things saved next to it (e.g. the event's students).
  const create = async (fields: Record<string, string | null>, message: (row: R) => string, onCreated?: (row: R) => Promise<void>) => {
    const result = await addRow(table, year, fields);
    if (!result.ok) return result.error;
    const row = result.value as R;
    setRows((current) => [...current, row]);
    setHighlight(row.id);
    setAdding(false);
    toast.success(message(row));
    await onCreated?.(row);
    return null;
  };

  return { rows, setRows, highlight, adding, setAdding, create };
}

export function WorkspaceHeader({ year, title, addLabel, onAdd }: { year: number; title: string; addLabel: string; onAdd: () => void }) {
  return (
    <PageHeader
      eyebrow={`Poslovanje ${year}`}
      title={title}
      action={
        <motion.button
          type="button"
          onClick={onAdd}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-adm-ink px-[18px] py-[11px] text-sm text-adm-bg shadow-[0_6px_16px_rgba(28,24,20,.18)]"
        >
          <Plus className="size-4" /> {addLabel}
        </motion.button>
      }
    />
  );
}

export function Strip({ children }: { children: ReactNode }) {
  return <Stagger className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">{children}</Stagger>;
}

// Red bar for money clients still owe (rows with Plačano? = NE). Renders nothing when all is paid.
// `what` names the rows, already declined: "3 dogodki", "1 dogodek + 2 najema".
export function UnpaidAlert({ amount, what, onShow, active }: { amount: number; what: string | null; onShow?: () => void; active?: boolean }) {
  if (!what) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-red-600 bg-red-50 px-4 py-3.5 text-red-800 sm:px-5">
      <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.08em] sm:text-xs">
        <span className="size-2 rounded-full bg-red-600" aria-hidden />
        Neplačano
      </span>
      <span className="font-display text-[22px] leading-none text-red-700 tabular sm:text-[28px]">{formatEur(amount)}</span>
      <span className="text-[13px]">Čaka na plačilo: {what}. Ne šteje v prihodke in fond.</span>
      {onShow && (
        <button
          type="button"
          onClick={onShow}
          className="ml-auto rounded-full bg-red-600 px-3.5 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-red-700"
        >
          {active ? "Prikaži vse" : "Prikaži neplačane"}
        </button>
      )}
    </div>
  );
}

export function ChartRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-5">{children}</div>;
}

export function SheetHint({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="rounded-[14px] bg-adm-sand px-5 py-4 text-sm">
      <CollapsibleTrigger className="flex items-center gap-1.5 font-medium">
        <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight className="size-4" />
        </motion.span>
        {title}
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <div className="flex flex-col gap-1.5 pt-3 leading-relaxed text-adm-sub">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
