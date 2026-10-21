"use client";

import { FormDialog, type FieldSpec } from "@/app/admin/_components/form-dialog";
import { KpiCard } from "@/app/admin/_components/kpi-card";
import { Eyebrow } from "@/app/admin/_components/panel";
import { formatEur, formatNumber, formatPlain } from "@/lib/ledger/compute";
import { computeContributions, PEOPLE, RULES, WORK_KINDS } from "@/lib/ledger/contributions";
import type { LedgerYear, WorkRow } from "@/lib/ledger/schema";
import { ContributionLegend } from "./contribution-legend";
import { FuelPanel, PairSplit, PeoplePoints } from "./contribution-panels";
import { SocialPostsLog, type SocialGridRow } from "./social-posts-log";
import { LedgerGrid, type GridColumn, type GridRow } from "./ledger-grid";
import { ChartRow, Strip, useLedgerRows, WorkspaceHeader } from "./workspace";

type Row = WorkRow & GridRow;

type Props = { ledger: LedgerYear; today: string; unconfirmedOffers: number };

export function ContributionsWorkspace({ ledger, today, unconfirmedOffers }: Props) {
  const { rows, setRows, highlight, adding, setAdding, create } = useLedgerRows("work", ledger.year, ledger.work as Row[]);
  const social = useLedgerRows("social", ledger.year, ledger.social as SocialGridRow[]);
  const c = computeContributions({ ...ledger, work: rows, social: social.rows }, today, unconfirmedOffers);
  const km = c.people.reduce((s, p) => s + p.km, 0);
  const people = [...PEOPLE];

  const columns: GridColumn<Row>[] = [
    { key: "date", label: "Datum", type: "date", width: 150 },
    { key: "person", label: "Oseba", type: "select", options: people, width: 130 },
    { key: "kind", label: "Vrsta dela", type: "select", options: WORK_KINDS, width: 230 },
    { key: "hours", label: "Ure", type: "number", width: 90 },
    { key: "description", label: "Opis", type: "text", width: 380 },
  ];

  const fields: FieldSpec[] = [
    { key: "date", label: "Datum", kind: "date", required: true, initial: today },
    { key: "hours", label: "Ure", kind: "number", required: true, placeholder: "Npr. 3" },
    { key: "person", label: "Oseba", kind: "seg", options: people, wide: true },
    { key: "kind", label: "Vrsta dela", kind: "seg", options: WORK_KINDS, wide: true },
    { key: "description", label: "Opis", kind: "text", required: true, wide: true, placeholder: "Npr. nov obrazec za povpraševanja" },
  ];

  return (
    <>
      <WorkspaceHeader year={ledger.year} title="Prispevki" addLabel="Vpiši ure" onAdd={() => setAdding(true)} />

      <Strip>
        <KpiCard size="md" label="Dobiček" value={c.profit} format="eur" sub={c.claimedTotal ? "Prihodki − stroški brez Prevoza" : "Prihodki − vsi stroški"} />
        <KpiCard size="md" label="Kilometrina" value={c.fuelTotal} format="eur" sub={`${formatPlain(Math.round(km))} km · ${formatEur(c.fuelRate)}/km`} />
        <KpiCard size="md" label="Za delitev" value={c.distributable} format="eur" sub={`${c.workShare * 100} % po točkah · ${100 - c.workShare * 100} % 50/50`} dark />
        <KpiCard size="md" label="Točke skupaj" value={c.totalPoints} sub={`${c.eventsDone} izvedenih dogodkov · ${c.weekendEvents} ob vikendih`} />
      </Strip>

      <ChartRow>
        <PairSplit c={c} className="flex-[3_1_560px]" />
        <FuelPanel c={c} year={ledger.year} fuelPrice={ledger.fuelPrice} className="flex-[2_1_360px]" />
      </ChartRow>

      <PeoplePoints c={c} />

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <Eyebrow>Ročno vpisane ure</Eyebrow>
          <span className="text-[13px] text-adm-muted">
            Spletna stran, nove storitve, izboljšave · 1 ura = 1 točka · največ {RULES.workCapPerMonth} ur na osebo na mesec
            {c.overCap > 0 && ` · ${formatNumber(c.overCap, 1)} ur nad mejo se ne šteje`}
          </span>
        </div>
        <LedgerGrid table="work" rows={rows} setRows={setRows} columns={columns} addLabel="Vpiši ure" onAdd={() => setAdding(true)} highlight={highlight} />
      </div>

      <SocialPostsLog
        rows={social.rows}
        setRows={social.setRows}
        highlight={social.highlight}
        adding={social.adding}
        setAdding={social.setAdding}
        create={social.create}
        today={today}
      />

      <ContributionLegend c={c} />

      <FormDialog
        open={adding}
        onOpenChange={setAdding}
        eyebrow="Nov vnos · Prispevki"
        title="Vpiši ure"
        fields={fields}
        onSubmit={(values) => create(values, (row) => `Vpisanih ${formatPlain(row.hours ?? 0)} ur za ${row.person ?? "osebo"}`)}
      />
    </>
  );
}
