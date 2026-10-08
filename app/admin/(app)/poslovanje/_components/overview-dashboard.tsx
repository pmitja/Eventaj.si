"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Donut, HBars, monthOf, MONTHS, MONTHS_FULL, PALETTE, plural } from "@/app/admin/_components/charts";
import { KpiCard } from "@/app/admin/_components/kpi-card";
import { ease, Stagger, useAppear } from "@/app/admin/_components/motion";
import { Eyebrow, LegendDot, Panel } from "@/app/admin/_components/panel";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { computeOverview, DUO, formatEur, formatNumber, formatPlain } from "@/lib/ledger/compute";
import type { LedgerYear } from "@/lib/ledger/schema";
import { cn } from "@/lib/utils";
import { FundOpeningInput } from "./fund-opening-input";
import { StockStatus } from "./stock-status";

const [C0, C1, C2, C3, , C5] = PALETTE;

export function OverviewDashboard({ ledger }: { ledger: LedgerYear }) {
  const o = computeOverview(ledger);
  const dated = <T extends { date: string | null }>(rows: T[]) => rows.filter((r) => r.date);
  const events = dated(ledger.events);
  const rentals = dated(ledger.tables);
  const pct = (part: number, whole: number) => (whole ? (part / whole) * 100 : 0);

  const months = MONTHS.map((label, i) => {
    const es = events.filter((e) => monthOf(e.date) === i);
    const ts = rentals.filter((t) => monthOf(t.date) === i);
    const transfer = es.reduce((s, e) => s + (e.transfer ?? 0), 0) + ts.reduce((s, t) => s + (t.transfer ?? 0), 0);
    const cash = es.reduce((s, e) => s + (e.cash ?? 0), 0) + ts.reduce((s, t) => s + (t.cash ?? 0), 0);
    return { label, transfer, cash, count: es.length };
  });

  const byCategory = new Map<string, number>();
  for (const c of ledger.costs) byCategory.set(c.category || "Brez kategorije", (byCategory.get(c.category || "Brez kategorije") ?? 0) + (c.amount ?? 0));
  const categories = [...byCategory.entries()].sort((a, b) => b[1] - a[1]);
  const rest = categories.slice(6).reduce((s, [, v]) => s + v, 0);
  const costSegments = [
    ...categories.slice(0, 6).map(([label, value], i) => ({ label, value, color: PALETTE[i], display: formatEur(value) })),
    ...(rest > 0 ? [{ label: "Ostalo", value: rest, color: PALETTE[6], display: formatEur(rest) }] : []),
  ];

  const executionGroups: [string, string | null, string][] = [
    ["Jan", "Jan", C0],
    ["Mitja", "Mitja", C1],
    ["Jan + Mitja", DUO, C3],
    ["Študenti", "Študenti", C2],
  ];
  const known = new Set(executionGroups.map(([, key]) => key?.toLowerCase()));
  const executionSegments = [
    ...executionGroups.map(([label, key, color]) => {
      const value = events.filter((e) => (e.execution ?? "").toLowerCase() === key?.toLowerCase()).length;
      return { label, value, color, display: String(value) };
    }),
    (() => {
      const value = events.filter((e) => !known.has((e.execution ?? "").toLowerCase())).length;
      return { label: "Ni vpisano / drugo", value, color: C5, display: String(value) };
    })(),
  ];

  return (
    <div className="flex flex-col gap-5">
      <Stagger className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <KpiCard
          label="Prihodki skupaj"
          value={o.revenue}
          format="eur"
          sub={`${plural(o.eventCount, "dogodek", "dogodka", "dogodki", "dogodkov")} + ${plural(rentals.length, "najem", "najema", "najemi", "najemov")} miz`}
        />
        <KpiCard label="Vsi poslovni stroški" value={o.allCosts} format="eur" sub={`${formatNumber(pct(o.allCosts, o.revenue), 1)} % prihodkov`} />
        <KpiCard label="Prihodki minus stroški" value={o.profit} format="eur" sub={`Marža ${formatNumber(pct(o.profit, o.revenue), 1)} %`} dark />
        <KpiCard label="Denar trenutno v fondu" value={o.fundNow} format="eur" sub={`Po vseh povračilih ${formatEur(o.fundAfterRefunds)}`} />
      </Stagger>

      <Row>
        <MonthRevenue months={months} revenue={o.revenue} className="flex-[2_1_560px]" />
        <Panel title="Način plačila" className="flex-[1_1_340px]">
          <Donut
            segments={[
              { label: "Nakazila", value: o.transfers, color: C0, display: formatEur(o.transfers) },
              { label: "Gotovina", value: o.cash, color: C1, display: formatEur(o.cash) },
            ]}
            center={`${formatNumber(pct(o.transfers, o.revenue), 0)} %`}
            sub="nakazila"
          />
        </Panel>
      </Row>

      <Row>
        <Panel title="Stroški po kategorijah" note={`${plural(ledger.costs.length, "vnos", "vnosa", "vnosi", "vnosov")} · ${formatEur(o.allCosts)}`} className="flex-[1_1_480px]">
          <Donut segments={costSegments} center={formatEur(o.allCosts)} sub="vsi stroški" />
        </Panel>
        <FundPanel o={o} year={ledger.year} className="flex-[1_1_480px]" />
      </Row>

      <Row>
        <Panel title="Prisotnost in izvedbe — Jan / Mitja" className="flex-[3_1_560px]" note={<span className="flex gap-4"><LegendDot color={C0} label="Jan" /><LegendDot color={C1} label="Mitja" /></span>}>
          <Attendance o={o} />
          <p className="m-0 text-xs leading-relaxed text-adm-muted [text-wrap:pretty]">
            Polne izvedbe = Jan/Mitja izvedeta celoten dogodek. Začetna pomoč = prideta le na postavitev oziroma začetek. Prihodi na lokacijo in km
            upoštevajo oboje; ure pa samo polne izvedbe.
          </p>
        </Panel>
        <Panel title="Kdo je izvedel dogodek" className="flex-[2_1_360px]">
          <Donut segments={executionSegments} center={String(events.length)} sub="dogodkov" size={170} showPct={false} legendClassName="min-w-[160px]" />
        </Panel>
      </Row>

      <Row>
        <Panel title="Poravnava po parih" className="flex-[1_1_480px] gap-0">
          {o.pairs.map((p, i) => (
            <div key={p.pair} className={cn("flex flex-col gap-2.5 border-t border-adm-rule py-4", i === 0 && "mt-[18px]")}>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <span className="text-base font-semibold">{p.pair}</span>
                <span className="font-display text-[26px] tabular">{formatEur(p.due)}</span>
              </div>
              <Progress value={pct(p.refunded, p.paidPersonally)} color={C2} />
              <div className="flex flex-wrap justify-between gap-3 text-[13px] text-adm-muted">
                <span>
                  Osebno plačano {formatEur(p.paidPersonally)} · Povrnjeno {formatEur(p.refunded)}
                </span>
                <span className={p.due === 0 ? "text-adm-ok-fg" : "text-adm-ink"}>{p.instruction}</span>
              </div>
            </div>
          ))}
        </Panel>
        <Panel title="Hitri pregled zaloge" className="flex-[1_1_480px]" note={<span className="flex items-center gap-1.5"><span className="h-3 w-0.5" style={{ background: C1 }} />minimum</span>}>
          <HBars
            labelWidth="minmax(130px,220px)"
            valueWidth="28px"
            rows={o.stock.map((item) => ({
              label: item.name ?? "—",
              value: Math.max(item.current ?? 0, 0),
              mark: item.minimum ?? undefined,
              color: C0,
              markColor: C1,
              display: item.current === null ? "—" : formatPlain(item.current),
              extra: <StockStatus status={item.status} compact />,
            }))}
          />
        </Panel>
      </Row>

      <HowToRead />
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-5">{children}</div>;
}

function Progress({ value, color }: { value: number; color: string }) {
  const [ref, inView] = useAppear<HTMLDivElement>();
  return (
    <div ref={ref} className="h-2 overflow-hidden rounded-full bg-adm-track">
      <motion.div className="h-full rounded-full" style={{ background: color }} initial={{ width: 0 }} animate={{ width: inView ? `${Math.min(value, 100)}%` : 0 }} transition={{ duration: 0.9, ease }} />
    </div>
  );
}

type Month = { label: string; transfer: number; cash: number; count: number };

function MonthRevenue({ months, revenue, className }: { months: Month[]; revenue: number; className?: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const [ref, inView] = useAppear<HTMLDivElement>();
  const peak = Math.max(...months.map((m) => m.transfer + m.cash), 0);
  const step = peak > 4000 ? 2000 : peak > 2000 ? 1000 : peak > 800 ? 500 : 200;
  const top = Math.max(Math.ceil(peak / step) * step, step);
  const grid = [0, 0.25, 0.5, 0.75, 1].map((k) => ({ bottom: `${k * 100}%`, label: formatNumber(top * k, 0) }));
  const active = hover === null ? null : months[hover];

  return (
    <section onMouseLeave={() => setHover(null)} className={cn("min-w-0 rounded-2xl border border-adm-line bg-adm-card p-5 sm:p-6", className)}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div className="flex min-h-[78px] flex-col gap-1.5">
          <Eyebrow>Prihodki po mesecih</Eyebrow>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={hover ?? "all"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.16 }} className="flex flex-col gap-1.5">
              <span className="font-display text-[30px] leading-[1.1] tabular">{formatEur(active ? active.transfer + active.cash : revenue)}</span>
              <span className="text-[13px] text-adm-muted">
                {active
                  ? `${MONTHS_FULL[hover!]} · ${plural(active.count, "dogodek", "dogodka", "dogodki", "dogodkov")} · nakazila ${formatEur(active.transfer)} · gotovina ${formatEur(active.cash)}`
                  : "Skupaj · premaknite miško čez stolpec"}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex gap-4 text-[13px] text-adm-muted">
          <LegendDot color={C0} label="Nakazila" />
          <LegendDot color={C1} label="Gotovina" />
        </div>
      </div>
      <div ref={ref} className="grid grid-cols-[38px_minmax(0,1fr)] gap-x-2.5 gap-y-2.5 sm:grid-cols-[44px_minmax(0,1fr)]">
        <div className="relative h-[240px]">
          {grid.map((g) => (
            <span key={g.bottom} className="absolute right-0 translate-y-1/2 text-[11px] text-adm-faint tabular" style={{ bottom: g.bottom }}>
              {g.label}
            </span>
          ))}
        </div>
        <div className="relative flex h-[240px] items-end gap-1 sm:gap-2.5">
          {grid.map((g) => (
            <div key={g.bottom} className="absolute inset-x-0 border-t border-dashed border-adm-line" style={{ bottom: g.bottom }} />
          ))}
          {months.map((m, i) => {
            const total = m.transfer + m.cash;
            return (
              <div key={m.label} onMouseEnter={() => setHover(i)} className="relative flex h-full flex-1 items-end justify-center">
                <motion.div
                  className="flex w-full max-w-[46px] flex-col overflow-hidden rounded-t-[7px]"
                  initial={{ height: 0 }}
                  animate={{ height: inView ? `${(total / top) * 100}%` : 0, opacity: hover === null || hover === i ? 1 : 0.3 }}
                  transition={{ height: { duration: 0.8, ease, delay: inView ? i * 0.045 : 0 }, opacity: { duration: 0.15 } }}
                >
                  <div style={{ height: total ? `${(m.cash / total) * 100}%` : 0, background: C1 }} />
                  <div style={{ height: total ? `${(m.transfer / total) * 100}%` : 0, background: C0 }} />
                </motion.div>
              </div>
            );
          })}
        </div>
        <div />
        <div className="flex gap-1 border-t border-adm-ink pt-2 sm:gap-2.5">
          {months.map((m, i) => (
            <span key={m.label} className={cn("flex-1 text-center text-[11px] text-adm-muted transition-[font-weight] sm:text-xs", hover === i && "font-semibold text-adm-ink")}>
              {m.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

type Overview = ReturnType<typeof computeOverview>;

function FundPanel({ o, year, className }: { o: Overview; year: number; className?: string }) {
  const [ref, inView] = useAppear<HTMLDivElement>();
  const [maja, julija] = o.pairs;
  const start = o.fundOpening + o.transfers;
  // Waterfall: each bar spans [from, to]; totals start at zero.
  const steps = [
    ...(o.fundOpening !== 0 ? [{ label: "Začetno stanje", from: 0, to: o.fundOpening, color: C3, display: formatEur(o.fundOpening) }] : []),
    { label: "Nakazila", from: o.fundOpening, to: start, color: C2, display: `+${formatEur(o.transfers)}` },
    { label: "Stroški iz fonda", from: start, to: start - o.fundCosts, color: C1, display: `−${formatEur(o.fundCosts)}` },
    ...(o.refunded !== 0 ? [{ label: "Povrnjeno", from: start - o.fundCosts, to: o.fundNow, color: C1, display: `−${formatEur(o.refunded)}` }] : []),
    { label: "V fondu", from: 0, to: o.fundNow, color: C0, display: formatEur(o.fundNow) },
    { label: maja.pair, from: o.fundNow, to: o.fundNow - maja.openRefunds, color: C3, display: `−${formatEur(maja.openRefunds)}` },
    { label: julija.pair, from: o.fundNow - maja.openRefunds, to: o.fundAfterRefunds, color: C3, display: `−${formatEur(julija.openRefunds)}` },
    { label: "Po povračilih", from: 0, to: o.fundAfterRefunds, color: o.fundAfterRefunds < 0 ? PALETTE[1] : C0, display: formatEur(o.fundAfterRefunds) },
  ];
  const hi = Math.max(...steps.flatMap((s) => [s.from, s.to]), 1);
  const lo = Math.min(...steps.flatMap((s) => [s.from, s.to]), 0);
  const span = hi - lo;
  const y = (v: number) => ((v - lo) / span) * 100;

  const lines: [string, React.ReactNode, boolean?][] = [
    ["Začetno stanje fonda", <FundOpeningInput key="opening" year={year} value={o.fundOpening} />],
    ["+ Nakazila v fond", formatEur(o.transfers)],
    ["− Stroški plačani neposredno iz fonda", formatEur(o.fundCosts)],
    ["− Že izvedena povračila paroma", formatEur(o.refunded)],
    ["Denar trenutno v fondu", formatEur(o.fundNow), true],
    ...o.pairs.map((p): [string, string] => [`− Še za povračilo ${p.pair}`, formatEur(p.openRefunds)]),
    ["Fond po vseh povračilih", formatEur(o.fundAfterRefunds), true],
    ["Kontrola: odprta povračila skupaj", formatEur(o.openRefundsTotal)],
  ];

  return (
    <Panel title="Skupni fond" note="Od nakazil do stanja po povračilih" className={cn("gap-[22px]", className)}>
      <div ref={ref} className="flex flex-col gap-2">
        <div className="relative flex h-[200px] gap-2 border-b border-adm-ink sm:gap-3">
          {lo < 0 && <div className="absolute inset-x-0 border-t border-adm-ink/40" style={{ bottom: `${y(0)}%` }} />}
          {steps.map((s, i) => (
            <div key={s.label} className="relative h-full flex-1">
              <motion.div
                className="absolute inset-x-0 origin-bottom rounded-[5px]"
                style={{ bottom: `${y(Math.min(s.from, s.to))}%`, height: `${Math.max((Math.abs(s.to - s.from) / span) * 100, 0.8)}%`, background: s.color }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={inView ? { scaleY: 1, opacity: 1 } : undefined}
                transition={{ duration: 0.55, ease, delay: i * 0.12 }}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2 sm:gap-3">
          {steps.map((s) => (
            <div key={s.label} className="flex min-w-0 flex-1 flex-col gap-0.5 text-[11px] sm:text-xs">
              <span className="leading-tight text-adm-muted">{s.label}</span>
              <span className="break-words font-semibold tabular">{s.display}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        {lines.map(([label, value, strong]) => (
          <div key={label} className={cn("flex items-center justify-between gap-3 border-t border-adm-rule py-2 text-sm tabular", strong && "font-semibold")}>
            <span>{label}</span>
            <span className="text-right">{value}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Attendance({ o }: { o: Overview }) {
  const [ref, inView] = useAppear<HTMLDivElement>();
  const [jan, mitja] = o.attendance;
  const rows: [string, "fullRuns" | "initialHelps" | "arrivals" | "hours" | "km", boolean][] = [
    ["Polne izvedbe", "fullRuns", false],
    ["Začetne pomoči", "initialHelps", false],
    ["Prihodi na lokacijo", "arrivals", false],
    ["Ure polnih izvedb", "hours", false],
    ["Kilometri", "km", true],
  ];

  return (
    <div ref={ref} className="flex flex-col gap-[18px]">
      {rows.map(([label, key, km], r) => {
        const max = Math.max(jan[key], mitja[key], 1);
        return (
          <div key={key} className="grid grid-cols-[minmax(110px,180px)_minmax(0,1fr)] items-center gap-4">
            <span className="text-sm">{label}</span>
            <div className="flex flex-col gap-1.5">
              {[
                [jan[key], C0],
                [mitja[key], C1],
              ].map(([value, color], i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-adm-track">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: color as string }}
                      initial={{ width: 0 }}
                      animate={{ width: inView ? `${((value as number) / max) * 100}%` : 0 }}
                      transition={{ duration: 0.8, ease, delay: r * 0.07 + i * 0.05 }}
                    />
                  </div>
                  <span className="w-14 text-right text-[13px] tabular">{km ? formatNumber(value as number, 1) : formatPlain(value as number)}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function HowToRead() {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="rounded-[14px] bg-adm-sand px-5 py-4">
      <CollapsibleTrigger className="flex items-center gap-1.5 text-sm font-medium">
        <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight className="size-4" />
        </motion.span>
        Kako brati te številke
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <div className="flex flex-col gap-2.5 pt-3.5 text-sm leading-relaxed">
          <strong>Poslovanje</strong>
          <ul className="m-0 list-disc pl-5">
            <li>Prihodki skupaj vključujejo dogodke in najeme miz.</li>
            <li>Nakazila iz obeh evidenc gredo v skupni fond; gotovina se razdeli takoj.</li>
            <li>Stroški ostajajo vodeni na listu Stroški.</li>
          </ul>
          <strong>Skupni fond</strong>
          <ul className="m-0 list-disc pl-5">
            <li>Denar trenutno v fondu = začetno stanje + vsa nakazila (Dogodki + Najem miz) − stroški iz fonda − že izvedena povračila.</li>
            <li>Začetno stanje fonda lahko popravite neposredno v vrstici »Začetno stanje fonda«.</li>
            <li>Prevozi miz se NE vštevajo v glavni Jan/Mitja pregled izvedb; njihov ločen pregled je na listu Najem miz.</li>
          </ul>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

