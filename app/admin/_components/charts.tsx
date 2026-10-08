"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { Cell, Pie, PieChart } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { formatNumber } from "@/lib/ledger/compute";
import { cn } from "@/lib/utils";
import { ease, useAppear } from "./motion";

// "Topla" palette from the dashboard design.
export const PALETTE = ["#1C1814", "#B5694A", "#7F8455", "#CDB594", "#8E8276", "#E0D3C0", "#5E6E73"] as const;
export const EMPTY_COLOR = "#E0D3C0";

export type Segment = { label: string; value: number; color: string; display: string };

const emptyConfig: ChartConfig = {};

// Donut built on the shadcn chart container (Recharts). Hovering a slice or its legend row dims
// the others and shows that slice's share in the middle.
export function Donut({
  segments,
  center,
  sub,
  size = 200,
  showPct = true,
  legendClassName,
}: {
  segments: Segment[];
  center: string;
  sub: string;
  size?: number;
  showPct?: boolean;
  legendClassName?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const [ref, inView] = useAppear<HTMLDivElement>();
  const visible = segments.filter((s) => s.value > 0);
  const total = visible.reduce((sum, s) => sum + s.value, 0);
  const pct = (value: number) => `${formatNumber(total ? (value / total) * 100 : 0, 1)} %`;
  const active = hover === null ? null : visible[hover];
  const data = visible.length ? visible : [{ label: "", value: 1, color: EMPTY_COLOR, display: "" }];

  return (
    <div ref={ref} className="flex flex-wrap items-center gap-7 sm:gap-8">
      <div className="relative shrink-0 self-center" style={{ width: size, height: size }}>
        {inView && (
          <ChartContainer config={emptyConfig} className="aspect-square h-full w-full">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                innerRadius="62%"
                outerRadius="92%"
                startAngle={90}
                endAngle={-270}
                paddingAngle={visible.length > 1 ? 1.2 : 0}
                stroke="none"
                animationDuration={900}
                animationEasing="ease-out"
                onMouseEnter={(_, index) => visible.length && setHover(index)}
                onMouseLeave={() => setHover(null)}
              >
                {data.map((s, i) => (
                  <Cell
                    key={s.label || i}
                    fill={s.color}
                    style={{ transition: "opacity .2s", outline: "none", cursor: "default" }}
                    opacity={hover === null || hover === i ? 1 : 0.28}
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-[18%] text-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active ? active.label : "total"}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-center gap-0.5"
            >
              <span className={cn("whitespace-nowrap font-display tabular", centerSize(active ? pct(active.value) : center, size))}>{active ? pct(active.value) : center}</span>
              <span className="text-[11px] leading-tight text-adm-muted">{active ? active.label : sub}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className={cn("flex min-w-[200px] flex-1 flex-col gap-2.5", legendClassName)}>
        {visible.map((s, i) => (
          <motion.div
            key={s.label}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: hover === null || hover === i ? 1 : 0.32, x: 0 } : undefined}
            transition={{ duration: 0.35, ease }}
            className={cn(
              "grid items-center gap-2.5 text-sm",
              showPct ? "grid-cols-[12px_minmax(0,1fr)_auto_54px]" : "grid-cols-[12px_minmax(0,1fr)_auto]",
            )}
          >
            <span className="size-3 rounded-[3px]" style={{ background: s.color }} />
            <span className="truncate">{s.label}</span>
            <span className="tabular">{s.display}</span>
            {showPct && <span className="text-right text-adm-muted tabular">{pct(s.value)}</span>}
          </motion.div>
        ))}
        {visible.length === 0 && <span className="text-sm text-adm-muted">Ni podatkov.</span>}
      </div>
    </div>
  );
}

// Long amounts ("4.636,45 €") must still fit inside the hole.
function centerSize(text: string, size: number) {
  const room = size * 0.56;
  const px = Math.min(size >= 190 ? 26 : 24, Math.floor((room / Math.max(text.length, 1)) * 1.75));
  return px >= 24 ? "text-[24px]" : px >= 21 ? "text-[21px]" : px >= 18 ? "text-[18px]" : "text-[16px]";
}

export type HBar = { label: ReactNode; value: number; display: ReactNode; color: string; mark?: number; markColor?: string; extra?: ReactNode };

// Horizontal bars; `mark` (same unit as value) draws a thin marker, e.g. minimum stock.
export function HBars({ rows, max, labelWidth = "minmax(110px,220px)", valueWidth = "minmax(80px,auto)" }: { rows: HBar[]; max?: number; labelWidth?: string; valueWidth?: string }) {
  const [ref, inView] = useAppear<HTMLDivElement>();
  const top = max ?? Math.max(...rows.map((r) => Math.max(r.value, r.mark ?? 0)), 0);
  const pct = (value: number) => (top > 0 ? Math.max(Math.min((value / top) * 100, 100), 0) : 0);

  return (
    <div ref={ref} className="flex flex-col gap-3.5">
      {rows.map((row, i) => (
        <div key={i} className="grid items-center gap-3.5 text-sm" style={{ gridTemplateColumns: `${labelWidth} minmax(0,1fr) ${valueWidth}${row.extra ? " auto" : ""}` }}>
          <span className="truncate">{row.label}</span>
          <div className="relative h-3 rounded-full bg-adm-track">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ background: row.color }}
              initial={{ width: 0 }}
              animate={{ width: inView ? `${pct(row.value)}%` : 0 }}
              transition={{ duration: 0.8, ease, delay: inView ? 0.08 * i : 0 }}
            />
            {row.mark !== undefined && (
              <motion.div
                className="absolute -bottom-1 -top-1 w-0.5"
                style={{ left: `calc(${pct(row.mark)}% - 1px)`, background: row.markColor ?? PALETTE[1] }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={inView ? { opacity: 1, scaleY: 1 } : undefined}
                transition={{ duration: 0.4, delay: 0.5 + 0.08 * i }}
              />
            )}
          </div>
          <span className="text-right tabular">{row.display}</span>
          {row.extra}
        </div>
      ))}
      {rows.length === 0 && <span className="text-sm text-adm-muted">Ni podatkov.</span>}
    </div>
  );
}

export type Column = { label: string; value: number; display?: string; color?: string };

// Vertical columns with the value printed above each one.
export function ColumnBars({ columns, color = PALETTE[0], height = 200 }: { columns: Column[]; color?: string; height?: number }) {
  const [ref, inView] = useAppear<HTMLDivElement>();
  const max = Math.max(...columns.map((c) => c.value), 0);

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <div className="flex items-end gap-1.5 border-b border-adm-ink sm:gap-2.5" style={{ height }}>
        {columns.map((c, i) => (
          <div key={c.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
            <motion.span
              className="text-xs text-adm-muted tabular"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.4 + i * 0.04 }}
            >
              {c.value ? (c.display ?? c.value) : ""}
            </motion.span>
            <motion.div
              className="w-full max-w-[44px] rounded-t-[7px]"
              style={{ background: c.color ?? color }}
              initial={{ height: 0 }}
              animate={{ height: inView && max ? `${(c.value / max) * 82}%` : 0 }}
              transition={{ duration: 0.7, ease, delay: inView ? i * 0.04 : 0 }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 sm:gap-2.5">
        {columns.map((c) => (
          <span key={c.label} className="flex-1 text-center text-[11px] text-adm-muted sm:text-xs">
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export const MONTHS = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"];
export const MONTHS_FULL = ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"];

export function monthOf(date: string | null) {
  return date ? Number(date.slice(5, 7)) - 1 : -1;
}

// Slovenian plural forms: 1 dogodek, 2 dogodka, 3-4 dogodki, 5+ dogodkov.
export function plural(n: number, one: string, two: string, few: string, many: string) {
  const m = n % 100;
  return `${n} ${m === 1 ? one : m === 2 ? two : m === 3 || m === 4 ? few : many}`;
}
