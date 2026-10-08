"use client";

import { Donut, HBars, PALETTE } from "@/app/admin/_components/charts";
import { FormDialog, type FieldSpec } from "@/app/admin/_components/form-dialog";
import { KpiCard } from "@/app/admin/_components/kpi-card";
import { Panel } from "@/app/admin/_components/panel";
import { formatPlain, stockLine } from "@/lib/ledger/compute";
import type { LedgerLists } from "@/lib/ledger/lists";
import type { EventRow, StockRow } from "@/lib/ledger/schema";
import { LedgerGrid, type GridColumn, type GridRow } from "./ledger-grid";
import { StockStatus } from "./stock-status";
import { ChartRow, parseAmount, Strip, useLedgerRows, WorkspaceHeader } from "./workspace";

type Row = StockRow & GridRow;

export function StockWorkspace({ year, rows: initial, events, lists }: { year: number; rows: StockRow[]; events: EventRow[]; lists: LedgerLists }) {
  const { rows, setRows, highlight, adding, setAdding, create } = useLedgerRows("stock", year, initial as Row[]);
  const lines = rows.map((row) => stockLine(row, events));

  const columns: GridColumn<Row>[] = [
    { key: "name", label: "Artikel", type: "text", width: 270 },
    { key: "type", label: "Tip", type: "select", options: lists.stockTypes, width: 120 },
    { key: "opening", label: "Začetna zaloga", type: "number", width: 124 },
    { key: "used", label: "Porabljeno na dogodkih", type: "computed", numeric: true, width: 170, value: (row) => formatPlain(stockLine(row, events).used) },
    { key: "added", label: "Dodano / nabavljeno", type: "number", width: 150 },
    {
      key: "current",
      label: "Trenutna zaloga",
      type: "computed",
      numeric: true,
      strong: true,
      width: 134,
      value: (row) => {
        const { current } = stockLine(row, events);
        return current === null ? "" : formatPlain(current);
      },
    },
    { key: "minimum", label: "Minimalna zaloga", type: "number", width: 134 },
    { key: "status", label: "Status", type: "computed", width: 200, value: (row) => <StockStatus status={stockLine(row, events).status} /> },
  ];

  const fields: FieldSpec[] = [
    { key: "name", label: "Artikel", kind: "text", required: true, wide: true, placeholder: "Npr. Mali album s črnimi platnicami" },
    { key: "type", label: "Tip", kind: "seg", options: lists.stockTypes, wide: true },
    { key: "opening", label: "Začetna zaloga", kind: "number", required: true, placeholder: "0" },
    { key: "minimum", label: "Minimalna zaloga", kind: "number", required: true, placeholder: "0" },
  ];

  return (
    <>
      <WorkspaceHeader year={year} title="Zaloga" addLabel="Dodaj artikel" onAdd={() => setAdding(true)} />

      <Strip>
        <KpiCard size="md" label="Artikli" value={rows.length} format="int" />
        <KpiCard size="md" label="Na zalogi" value={lines.reduce((s, l) => s + (l.current ?? 0), 0)} />
        <KpiCard size="md" label="Porabljeno na dogodkih" value={lines.reduce((s, l) => s + l.used, 0)} />
        <KpiCard size="md" label="Za naročiti" value={lines.filter((l) => l.status === "NAROČI").length} format="int" />
      </Strip>

      <ChartRow>
        <Panel title="Trenutna zaloga" note="črta = minimalna zaloga" className="flex-[3_1_520px]">
          <HBars
            labelWidth="minmax(130px,240px)"
            valueWidth="minmax(90px,auto)"
            rows={lines.map((l) => ({
              label: l.name ?? "—",
              value: Math.max(l.current ?? 0, 0),
              mark: l.minimum ?? undefined,
              color: l.status === "NAROČI" ? PALETTE[1] : PALETTE[0],
              markColor: PALETTE[1],
              display: `${l.current === null ? "—" : formatPlain(l.current)} / min ${formatPlain(l.minimum ?? 0)}`,
            }))}
          />
        </Panel>
        <Panel title="Poraba po artiklih" className="flex-[2_1_360px]">
          <Donut
            size={170}
            segments={lines.map((l, i) => ({ label: l.name ?? "—", value: l.used, color: PALETTE[i % PALETTE.length], display: formatPlain(l.used) }))}
            center={formatPlain(lines.reduce((s, l) => s + l.used, 0))}
            sub="porabljenih"
          />
        </Panel>
      </ChartRow>

      <LedgerGrid table="stock" rows={rows} setRows={setRows} columns={columns} addLabel="Dodaj artikel" onAdd={() => setAdding(true)} highlight={highlight} />

      <FormDialog
        open={adding}
        onOpenChange={setAdding}
        eyebrow="Nov vnos · Zaloga"
        title="Dodaj artikel"
        fields={fields}
        summary={(v) => {
          const opening = parseAmount(v.opening);
          const minimum = parseAmount(v.minimum);
          return [
            ["Trenutna zaloga", formatPlain(opening)],
            ["Status", <StockStatus key="s" status={v.opening ? (opening <= minimum ? "NAROČI" : "OK") : "VNESI ZAČETNO ZALOGO"} />],
          ];
        }}
        onSubmit={(values) => create({ ...values, added: "0" }, (row) => `${row.name ?? "Artikel"} je dodan v zalogo`)}
      />
    </>
  );
}
