"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, LoaderCircle, Plus, Trash2 } from "lucide-react";
import { useState, useTransition, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatNumber } from "@/lib/ledger/compute";
import type { LedgerTableName } from "@/lib/ledger/schema";
import { cn } from "@/lib/utils";
import { removeRow, updateField } from "../actions";
import { formatDate } from "./format";

type Value = string | number | boolean | null;
export type GridRow = { id: number } & Record<string, Value>;

type Option = string | { value: string; label: string };
export type Tone = "ok" | "no" | "n";

export type GridColumn<R extends GridRow> = {
  key: string;
  label: string;
  width?: number;
  hint?: string;
} & (
  | { type: "text" | "number" | "money" | "date" }
  | { type: "select"; options: Option[] }
  | { type: "bool" }
  | { type: "computed"; value: (row: R) => ReactNode; numeric?: boolean; tone?: (row: R) => Tone | null; strong?: boolean }
);

type Props<R extends GridRow> = {
  table: LedgerTableName;
  rows: R[];
  setRows: Dispatch<SetStateAction<R[]>>;
  columns: GridColumn<R>[];
  addLabel: string;
  onAdd: () => void;
  visible?: (row: R) => boolean;
  toolbar?: ReactNode;
  highlight?: number | null;
};

const toneClass: Record<Tone, string> = {
  ok: "bg-adm-ok text-adm-ok-fg",
  no: "bg-adm-no text-adm-no-fg",
  n: "bg-adm-sand text-adm-ink",
};

const cellInput =
  "h-[44px] w-full min-w-0 border border-transparent bg-transparent px-2.5 text-sm outline-none transition-colors hover:border-adm-line focus:rounded-md focus:border-adm-ink focus:bg-adm-card focus:shadow-[0_0_0_3px_#E7DCCB] sm:px-3.5";

function toInput(value: Value, type: string) {
  if (value === null || value === undefined) return "";
  if (type === "money" && typeof value === "number") return value.toFixed(2).replace(".", ",");
  if (type === "number" && typeof value === "number") return String(value).replace(".", ",");
  return String(value);
}

export function rowCountLabel(n: number) {
  const m = n % 100;
  return `${n} ${m === 1 ? "vrstica" : m === 2 ? "vrstici" : m === 3 || m === 4 ? "vrstice" : "vrstic"}`;
}

// Spreadsheet-style table: every cell saves on its own as soon as it changes.
export function LedgerGrid<R extends GridRow>({ table, rows, setRows, columns, addLabel, onAdd, visible, toolbar, highlight }: Props<R>) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [saving, setSaving] = useState(0);
  const shown = visible ? rows.filter(visible) : rows;

  // Numbers and dates are only applied once the server has parsed them, so computed columns
  // never see raw input like "12,5".
  const save = async (row: R, key: string, value: Value, optimistic: boolean) => {
    const previous = row[key];
    if (optimistic) setRows((current) => current.map((r) => (r.id === row.id ? { ...r, [key]: value } : r)));
    setSaving((n) => n + 1);
    const result = await updateField(table, row.id, key, value);
    setSaving((n) => n - 1);
    if (result.ok) {
      setError(null);
      setRows((current) => current.map((r) => (r.id === row.id ? { ...r, [key]: result.value } : r)));
    } else {
      setError(result.error);
      toast.error(result.error);
      setRows((current) => current.map((r) => (r.id === row.id ? { ...r, [key]: previous } : r)));
    }
  };

  const remove = (row: R) => {
    if (!window.confirm("Izbrišem to vrstico?")) return;
    startTransition(async () => {
      const result = await removeRow(table, row.id);
      if (result.ok) {
        setRows((current) => current.filter((r) => r.id !== row.id));
        toast.success("Vrstica je izbrisana");
      } else setError(result.error);
    });
  };

  const busy = saving > 0 || pending;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
        <div className="no-scrollbar -mx-4 flex min-w-0 max-w-[100vw] gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0 [&>button]:shrink-0 [&>button]:whitespace-nowrap">{toolbar}</div>
        <div className="flex items-center gap-4 text-xs text-adm-muted">
          <span className="tabular">{rowCountLabel(shown.length)}</span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={error ? "error" : busy ? "busy" : "saved"}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.15 }}
              className={cn("flex items-center gap-1.5", error && "text-adm-accent")}
            >
              {error ?? (busy ? <><LoaderCircle className="size-3 animate-spin" /> Shranjujem …</> : <><Check className="size-3" /> Vse spremembe so shranjene</>)}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <div className="overflow-hidden rounded-[14px] border border-adm-ink bg-adm-card">
        <Table containerClassName="max-h-[70vh] overscroll-x-contain" className="w-max min-w-full border-collapse tabular">
          <TableHeader className="sticky top-0 z-20 bg-adm-sand [&_tr]:border-b-adm-ink">
            <TableRow className="hover:bg-transparent">
              {columns.map((column, index) => (
                <TableHead
                  key={column.key}
                  title={column.hint ?? column.label}
                  style={{ width: column.width, minWidth: column.width }}
                  className={cn(
                    "h-11 whitespace-nowrap px-2.5 text-[11px] font-semibold uppercase tracking-[.06em] text-adm-sub sm:px-3.5",
                    index === 0 && "z-10 bg-adm-sand md:sticky md:left-0",
                    isNumeric(column) && "text-right",
                  )}
                >
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence initial={false}>
              {shown.map((row) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0, backgroundColor: highlight === row.id ? ["#F3E3C4", "rgba(0,0,0,0)"] : "rgba(0,0,0,0)" }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.3, backgroundColor: { duration: 1.6 } }}
                  className="group border-b border-adm-rule transition-colors hover:!bg-adm-hover"
                >
                  {columns.map((column, index) => (
                    <TableCell
                      key={column.key}
                      style={{ width: column.width, minWidth: column.width, maxWidth: column.width }}
                      className={cn(
                        "p-0",
                        index === 0 && "z-10 bg-adm-card group-hover:bg-adm-hover md:sticky md:left-0 md:shadow-[1px_0_0_#EDE5D8]",
                        column.type === "computed" && column.numeric && "bg-adm-hi/70",
                      )}
                    >
                      <Cell
                        column={column}
                        row={row}
                        onSave={(value) => save(row, column.key, value, column.type === "select" || column.type === "bool" || column.type === "text")}
                      />
                    </TableCell>
                  ))}
                  <TableCell className="p-0 px-1 text-center">
                    <button
                      type="button"
                      onClick={() => remove(row)}
                      aria-label="Izbriši vrstico"
                      className="rounded-full p-1.5 text-adm-muted opacity-0 transition-[opacity,color,background] hover:bg-adm-no hover:text-adm-no-fg focus:opacity-100 group-hover:opacity-100 max-md:opacity-60"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
        {shown.length === 0 && <p className="m-0 px-4 py-10 text-center text-sm text-adm-muted">Ni vrstic za ta pogled.</p>}
      </div>

      <motion.button
        type="button"
        onClick={onAdd}
        whileTap={{ scale: 0.97 }}
        className="flex shrink-0 items-center gap-2 self-start whitespace-nowrap rounded-full border border-adm-ink bg-transparent px-[18px] py-2.5 text-sm transition-colors hover:bg-adm-ink hover:text-adm-bg"
      >
        <Plus className="size-4" /> {addLabel}
      </motion.button>
    </div>
  );
}

const isNumeric = <R extends GridRow>(column: GridColumn<R>) =>
  column.type === "money" || column.type === "number" || (column.type === "computed" && Boolean(column.numeric));

const cellBox = "flex h-[44px] items-center px-2.5 sm:px-3.5";
const empty = <span className="text-[#A89D90]">—</span>;

function Cell<R extends GridRow>({ column, row, onSave }: { column: GridColumn<R>; row: R; onSave: (value: Value) => void }) {
  const value = row[column.key];

  if (column.type === "computed") {
    const content = column.value(row);
    const tone = column.tone?.(row) ?? null;
    const text = typeof content === "number" ? formatNumber(content) : content;
    const blank = content === null || content === undefined || content === "";
    return (
      <div className={cn(cellBox, column.numeric && "justify-end", column.strong && "font-semibold")} title={typeof text === "string" ? text : undefined}>
        {blank ? (
          empty
        ) : tone ? (
          <span className={cn("truncate whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold", toneClass[tone])}>{text}</span>
        ) : (
          <span className="min-w-0 truncate">{text}</span>
        )}
      </div>
    );
  }

  if (column.type === "bool") {
    const on = Boolean(value);
    return (
      <div className={cellBox}>
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => onSave(!on)}
          aria-pressed={on}
          className={cn("min-w-[42px] rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors", on ? toneClass.ok : "bg-transparent text-adm-faint ring-1 ring-inset ring-adm-line hover:ring-adm-soft")}
        >
          {on ? "DA" : "NE"}
        </motion.button>
      </div>
    );
  }

  if (column.type === "select") return <SelectCell options={column.options} value={value} onSave={onSave} />;
  if (column.type === "date") return <DateCell value={value} onSave={onSave} />;
  return <TextCell type={column.type} value={value} onSave={onSave} />;
}

const NONE = "__none";

// Non-modal dropdown: unlike Select it does not lock page scroll, so the sticky sidebar and the
// table stay put while choosing.
function SelectCell({ options, value, onSave }: { options: Option[]; value: Value; onSave: (value: Value) => void }) {
  const current = value === null || value === undefined ? "" : String(value);
  const items = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  if (current && !items.some((o) => o.value === current)) items.unshift({ value: current, label: current });
  const label = items.find((o) => o.value === current)?.label;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className={cn(cellBox, "w-full justify-between gap-1.5 text-left outline-none transition-colors hover:bg-adm-card/70 focus-visible:bg-adm-card data-[state=open]:bg-adm-card")}>
        <span className="min-w-0 truncate">{label ?? empty}</span>
        <ChevronDown className="size-3.5 shrink-0 text-adm-muted opacity-0 transition-opacity group-hover:opacity-70 max-md:opacity-50 [[data-state=open]_&]:opacity-70" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="admin-root max-h-72 min-w-[var(--radix-dropdown-menu-trigger-width)] overflow-y-auto rounded-xl border-adm-ink bg-adm-card p-1 shadow-[0_12px_30px_rgba(28,24,20,.18)]">
        <DropdownMenuRadioGroup value={current || NONE} onValueChange={(v) => v !== (current || NONE) && onSave(v === NONE ? null : v)}>
          <DropdownMenuRadioItem value={NONE} className="rounded-lg text-adm-faint focus:bg-adm-sand">
            —
          </DropdownMenuRadioItem>
          {items.map((o) => (
            <DropdownMenuRadioItem key={o.value} value={o.value} className="rounded-lg focus:bg-adm-sand">
              {o.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Shows a formatted date; the native picker only appears while editing.
function DateCell({ value, onSave }: { value: Value; onSave: (value: Value) => void }) {
  const [editing, setEditing] = useState(false);
  const original = value ? String(value) : "";

  if (!editing) {
    return (
      <button type="button" onClick={() => setEditing(true)} className={cn(cellBox, "w-full text-left transition-colors hover:bg-adm-card/70")}>
        {original ? <span className="whitespace-nowrap">{formatDate(original)}</span> : empty}
      </button>
    );
  }

  return (
    <input
      type="date"
      autoFocus
      defaultValue={original}
      onBlur={(event) => {
        setEditing(false);
        if (event.target.value !== original) onSave(event.target.value || null);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") event.currentTarget.blur();
        if (event.key === "Escape") setEditing(false);
      }}
      className={cellInput}
    />
  );
}

function TextCell({ type, value, onSave }: { type: "text" | "number" | "money"; value: Value; onSave: (value: Value) => void }) {
  const original = toInput(value, type);
  const [draft, setDraft] = useState(original);
  const [synced, setSynced] = useState(original);
  if (synced !== original) {
    // Server normalized the value (e.g. "12.5" → "12,50"); show what was stored.
    setSynced(original);
    setDraft(original);
  }

  const commit = () => {
    if (draft.trim() !== original) onSave(draft.trim() === "" ? null : draft.trim());
  };

  return (
    <input
      type="text"
      inputMode={type === "number" || type === "money" ? "decimal" : undefined}
      value={draft}
      title={draft || undefined}
      placeholder="—"
      onChange={(event) => setDraft(event.target.value)}
      onBlur={commit}
      onKeyDown={(event) => {
        if (event.key === "Enter") event.currentTarget.blur();
        if (event.key === "Escape") {
          setDraft(original);
          requestAnimationFrame(() => (event.target as HTMLInputElement).blur());
        }
      }}
      className={cn(cellInput, "text-ellipsis placeholder:text-[#A89D90]", (type === "number" || type === "money") && "text-right", type === "money" && "font-medium")}
    />
  );
}

export function FilterChips<T extends string>({ options, value, onChange }: { options: T[]; value: T; onChange: (value: T) => void }) {
  return (
    <>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "relative rounded-full border px-3 py-1.5 text-[13px] transition-colors",
            option === value ? "border-adm-ink text-adm-bg" : "border-adm-soft hover:border-adm-ink",
          )}
        >
          {option === value && (
            <motion.span layoutId="filter-chip" className="absolute inset-[-1px] rounded-full bg-adm-ink" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
          )}
          <span className="relative">{option}</span>
        </button>
      ))}
    </>
  );
}
