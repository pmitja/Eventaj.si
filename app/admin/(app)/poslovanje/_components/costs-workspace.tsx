"use client";

import { useState } from "react";
import { Donut, HBars, PALETTE } from "@/app/admin/_components/charts";
import { FormDialog, type FieldSpec } from "@/app/admin/_components/form-dialog";
import { KpiCard } from "@/app/admin/_components/kpi-card";
import { Panel } from "@/app/admin/_components/panel";
import { costRemaining, costSource, formatEur, FUND, payerPair } from "@/lib/ledger/compute";
import type { LedgerLists } from "@/lib/ledger/lists";
import type { CostRow } from "@/lib/ledger/schema";
import { FilterChips, LedgerGrid, type GridColumn, type GridRow } from "./ledger-grid";
import { ChartRow, parseAmount, SheetHint, Strip, useLedgerRows, WorkspaceHeader } from "./workspace";

type Row = CostRow & GridRow;

const isFund = (payer: string | null) => (payer ?? "").toLowerCase() === FUND.toLowerCase();

export function CostsWorkspace({ year, rows: initial, lists }: { year: number; rows: CostRow[]; lists: LedgerLists }) {
  const { rows, setRows, highlight, adding, setAdding, create } = useLedgerRows("costs", year, initial as Row[]);
  const [filter, setFilter] = useState("Vse");

  const total = rows.reduce((s, c) => s + (c.amount ?? 0), 0);
  const fromFund = rows.filter((c) => isFund(c.payer)).reduce((s, c) => s + (c.amount ?? 0), 0);
  const personal = rows.filter((c) => c.payer && !isFund(c.payer)).reduce((s, c) => s + (c.amount ?? 0), 0);

  const byCategory = new Map<string, number>();
  for (const c of rows) {
    if (c.category) byCategory.set(c.category, (byCategory.get(c.category) ?? 0) + (c.amount ?? 0));
  }
  const categories = [...byCategory.entries()].sort((a, b) => b[1] - a[1]);
  const rest = categories.slice(6).reduce((s, [, v]) => s + v, 0);
  const categorySegments = [
    ...categories.slice(0, 6).map(([label, value], i) => ({ label, value, color: PALETTE[i], display: formatEur(value) })),
    ...(rest > 0 ? [{ label: "Ostalo", value: rest, color: PALETTE[6], display: formatEur(rest) }] : []),
  ];

  const payers = lists.payers
    .map((payer, i) => ({ payer, value: rows.filter((c) => (c.payer ?? "").toLowerCase() === payer.toLowerCase()).reduce((s, c) => s + (c.amount ?? 0), 0), color: PALETTE[i % PALETTE.length] }))
    .filter((p) => p.value > 0 || isFund(p.payer));

  const columns: GridColumn<Row>[] = [
    { key: "date", label: "Datum", type: "date", width: 150 },
    { key: "category", label: "Kategorija", type: "select", options: lists.costCategories, width: 220 },
    { key: "description", label: "Opis", type: "text", width: 290 },
    { key: "amount", label: "Znesek €", type: "money", width: 110 },
    { key: "payer", label: "Plačal", type: "select", options: lists.payers, width: 140 },
    { key: "source", label: "Vir sredstev", type: "computed", width: 160, value: costSource, tone: (row) => (isFund(row.payer) ? "n" : "no") },
    { key: "pair", label: "Par", type: "computed", width: 140, value: (row) => payerPair(row.payer) },
    { key: "refunded", label: "Povrnjeno €", type: "money", width: 112 },
    { key: "remaining", label: "Še za povračilo €", type: "computed", numeric: true, strong: true, width: 150, value: costRemaining },
  ];

  const fields: FieldSpec[] = [
    { key: "date", label: "Datum", kind: "date", required: true, initial: new Date().toISOString().slice(0, 10) },
    { key: "amount", label: "Znesek €", kind: "money", required: true, placeholder: "0,00" },
    { key: "category", label: "Kategorija", kind: "select", options: lists.costCategories, required: true, wide: true, placeholder: "Izberi kategorijo" },
    { key: "description", label: "Opis", kind: "text", required: true, wide: true, placeholder: "Npr. Canva, papir, prispevki" },
    { key: "payer", label: "Plačal", kind: "seg", options: lists.payers, wide: true },
  ];

  return (
    <>
      <WorkspaceHeader year={year} title="Stroški" addLabel="Dodaj strošek" onAdd={() => setAdding(true)} />

      <Strip>
        <KpiCard size="md" label="Vsi stroški" value={total} format="eur" />
        <KpiCard size="md" label="Iz skupnega fonda" value={fromFund} format="eur" />
        <KpiCard size="md" label="Osebno plačano" value={personal} format="eur" />
        <KpiCard size="md" label="Vnosi" value={rows.length} format="int" />
      </Strip>

      <ChartRow>
        <Panel title="Kdo je plačal" note="osebna plačila se povrnejo paroma" className="flex-[3_1_520px]">
          <HBars rows={payers.map((p) => ({ label: p.payer, value: p.value, color: p.color, display: formatEur(p.value) }))} />
        </Panel>
        <Panel title="Stroški po kategorijah" className="flex-[2_1_360px]">
          <Donut size={170} segments={categorySegments} center={formatEur(total)} sub="vsi stroški" />
        </Panel>
      </ChartRow>

      <LedgerGrid
        table="costs"
        rows={rows}
        setRows={setRows}
        columns={columns}
        addLabel="Dodaj strošek"
        onAdd={() => setAdding(true)}
        highlight={highlight}
        visible={filter === "Vse" ? undefined : (row) => row.category === filter}
        toolbar={<FilterChips options={["Vse", ...categories.map(([c]) => c)]} value={filter} onChange={setFilter} />}
      />

      <SheetHint title="Logika stroškov">
        <p className="m-0">Par 1: Maja + Jan. Par 2: Julija + Mitja.</p>
        <p className="m-0">Stroški iz skupnega fonda so normalni poslovni stroški, vendar ne ustvarjajo povračila paru.</p>
        <p className="m-0">Če kdo od štirih osebno plača strošek ali študenta, se to pripiše njegovemu paru. Ko se znesek vrne, ga vpiši v Povrnjeno €.</p>
        <p className="m-0">»Še za povračilo« se izračuna samo, če je izpolnjen Opis.</p>
      </SheetHint>

      <FormDialog
        open={adding}
        onOpenChange={setAdding}
        eyebrow="Nov vnos · Stroški"
        title="Dodaj strošek"
        fields={fields}
        summary={(v) => {
          const own = Boolean(v.payer) && !isFund(v.payer);
          return [
            ["Vir sredstev", own ? "Osebna sredstva" : FUND],
            ["Par", payerPair(v.payer) ?? "—"],
            ["Še za povračilo", formatEur(own ? parseAmount(v.amount) : 0)],
          ];
        }}
        onSubmit={(values) => create(values, () => "Strošek je dodan")}
      />
    </>
  );
}
