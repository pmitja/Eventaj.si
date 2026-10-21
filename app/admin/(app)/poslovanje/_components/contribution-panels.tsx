"use client";

import { motion } from "framer-motion";
import { HBars, PALETTE } from "@/app/admin/_components/charts";
import { ease, useAppear } from "@/app/admin/_components/motion";
import { LegendDot, Panel } from "@/app/admin/_components/panel";
import { formatEur, formatNumber, formatPlain } from "@/lib/ledger/compute";
import { CATEGORIES, type Contributions, type Person } from "@/lib/ledger/contributions";
import { cn } from "@/lib/utils";
import { updateFuelPrice } from "../actions";
import { YearAmountInput } from "./year-amount-input";

const [C0, C1, C2, C3] = PALETTE;
export const PERSON_COLOR: Record<Person, string> = { Mitja: C1, Julija: C3, Jan: C0, Maja: C2 };
const pct = (share: number) => `${formatNumber(share * 100, 1)} %`;
const signed = (value: number) => `${value >= 0 ? "+" : "−"}${formatEur(Math.abs(value))}`;

export function PairSplit({ c, className }: { c: Contributions; className?: string }) {
  const [ref, inView] = useAppear<HTMLDivElement>();
  const parts = [
    { key: "work", label: "Delo (po točkah)", color: C0 },
    { key: "owner", label: "Lastništvo (50/50)", color: C3 },
    { key: "fuel", label: "Kilometrina", color: C1 },
  ] as const;
  const top = Math.max(...c.pairs.map((p) => p.total), 1);

  return (
    <Panel
      title="Delitev po parih"
      note={
        <span className="flex flex-wrap gap-4">
          {parts.map((part) => (
            <LegendDot key={part.key} color={part.color} label={part.label} />
          ))}
        </span>
      }
      className={cn("gap-0", className)}
    >
      <div ref={ref}>
        {c.pairs.map((p, i) => (
          <div key={p.pair} className={cn("flex flex-col gap-3 border-t border-adm-rule py-5", i === 0 && "mt-[18px]")}>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <span className="flex flex-col gap-0.5">
                <span className="text-base font-semibold">{p.pair}</span>
                <span className="text-[13px] text-adm-muted">
                  {formatPlain(Math.round(p.points * 10) / 10)} točk · {pct(p.share)} dela
                </span>
              </span>
              <span className="flex flex-col items-end gap-0.5">
                <span className="font-display text-[30px] leading-none tabular">{formatEur(p.total)}</span>
                <span className="text-[13px] text-adm-muted">{pct(p.ofProfit)} dobička</span>
              </span>
            </div>
            <div className="flex h-3 overflow-hidden rounded-full bg-adm-track">
              {parts.map((part, j) => (
                <motion.div
                  key={part.key}
                  className="h-full"
                  style={{ background: part.color }}
                  initial={{ width: 0 }}
                  animate={{ width: inView ? `${(Math.max(p[part.key], 0) / top) * 100}%` : 0 }}
                  transition={{ duration: 0.8, ease, delay: i * 0.1 + j * 0.05 }}
                />
              ))}
            </div>
            <div className="flex flex-wrap justify-between gap-x-5 gap-y-1 text-[13px] text-adm-muted tabular">
              <span>
                Delo {formatEur(p.work)} · Lastništvo {formatEur(p.owner)} · Kilometrina {formatEur(p.fuel)}
              </span>
              <span className={p.vsEqual >= 0 ? "text-adm-ok-fg" : "text-adm-accent"}>{signed(p.vsEqual)} glede na 50/50</span>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function FuelPanel({ c, year, fuelPrice, className }: { c: Contributions; year: number; fuelPrice: number; className?: string }) {
  return (
    <Panel title="Kilometrina" note="km / 100 × 7 l × cena litra" className={cn("gap-4", className)}>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span>Cena litra goriva</span>
        <YearAmountInput
          value={fuelPrice}
          onSave={(draft) => updateFuelPrice(year, draft)}
          label="Cena litra goriva"
          saved="Cena goriva je posodobljena"
          suffix="€/l"
          decimals={3}
        />
      </div>
      <div className="flex flex-col text-sm tabular">
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-b border-adm-ink pb-2 text-xs uppercase tracking-[.06em] text-adm-muted">
          <span>Oseba</span>
          <span className="text-right">Km</span>
          <span className="w-24 text-right">Za izplačilo</span>
        </div>
        {c.people
          .filter((p) => p.km > 0)
          .map((p) => (
            <div key={p.person} className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-4 border-b border-adm-rule py-2">
              <span className="flex flex-col">
                <LegendDot color={PERSON_COLOR[p.person]} label={p.person} />
                {p.claimed > 0 && <span className="pl-4 text-xs text-adm-muted">že v Stroških (Prevoz): −{formatEur(p.claimed)}</span>}
              </span>
              <span className="text-right">{formatPlain(Math.round(p.km))}</span>
              <span className="w-24 text-right font-semibold">{formatEur(p.fuel)}</span>
            </div>
          ))}
      </div>
      <p className="m-0 text-xs leading-relaxed text-adm-muted [text-wrap:pretty]">
        Kilometrina se izplača voznikom pred delitvijo. Šteje km iz Dogodkov (izvedba in začetna pomoč) in Najema miz.
      </p>
    </Panel>
  );
}

export function PeoplePoints({ c }: { c: Contributions }) {
  const rows = CATEGORIES.filter((cat) => c.people.some((p) => p.byCategory[cat] > 0));
  const cell = (n: number) => (n ? formatNumber(n, 1) : "—");

  return (
    <div className="flex flex-wrap gap-5">
      <Panel title="Točke po osebah" note={`${formatNumber(c.totalPoints, 1)} točk`} className="flex-[2_1_380px]">
        <HBars
          labelWidth="minmax(70px,110px)"
          valueWidth="minmax(120px,auto)"
          rows={[...c.people]
            .sort((a, b) => b.points - a.points)
            .map((p) => ({ label: p.person, value: p.points, color: PERSON_COLOR[p.person], display: `${formatNumber(p.points, 1)} · ${pct(p.share)}` }))}
        />
        <div className="flex flex-col text-sm tabular">
          {c.people.map((p) => (
            <div key={p.person} className="flex justify-between gap-3 border-t border-adm-rule py-2">
              <span>
                {p.person} <span className="text-adm-muted">· {p.pair}</span>
              </span>
              <span>{formatEur(p.work)}</span>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Od kod so točke" className="flex-[3_1_520px]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-sm tabular">
            <thead>
              <tr className="border-b border-adm-ink text-xs uppercase tracking-[.06em] text-adm-muted">
                <th className="py-2 pr-3 text-left font-normal">Opravilo</th>
                {c.people.map((p) => (
                  <th key={p.person} className="px-2 py-2 text-right font-normal">
                    {p.person}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((cat) => (
                <tr key={cat} className="border-b border-adm-rule">
                  <td className="py-2 pr-3">{cat}</td>
                  {c.people.map((p) => (
                    <td key={p.person} className="px-2 py-2 text-right">
                      {cell(p.byCategory[cat])}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="py-2 pr-3">Skupaj</td>
                {c.people.map((p) => (
                  <td key={p.person} className="px-2 py-2 text-right">
                    {formatNumber(p.points, 1)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
