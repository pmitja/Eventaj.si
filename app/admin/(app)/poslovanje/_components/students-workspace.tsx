"use client";

import { Donut, HBars, PALETTE } from "@/app/admin/_components/charts";
import { FormDialog, type FieldSpec } from "@/app/admin/_components/form-dialog";
import { KpiCard } from "@/app/admin/_components/kpi-card";
import { Panel } from "@/app/admin/_components/panel";
import { formatEur, formatPlain, payerPair, studentPairRefund } from "@/lib/ledger/compute";
import type { LedgerLists } from "@/lib/ledger/lists";
import type { EventRow, StudentRow } from "@/lib/ledger/schema";
import { formatDate } from "./format";
import { LedgerGrid, type GridColumn, type GridRow } from "./ledger-grid";
import { ChartRow, parseAmount, Strip, useLedgerRows, WorkspaceHeader } from "./workspace";

type Row = StudentRow & GridRow;

export function StudentsWorkspace({ year, rows: initial, events, lists }: { year: number; rows: StudentRow[]; events: EventRow[]; lists: LedgerLists }) {
  const { rows, setRows, highlight, adding, setAdding, create } = useLedgerRows("students", year, initial as Row[]);
  const byId = new Map(events.map((event) => [event.id, event]));
  // ='Študenti'!B/C/E  =IFERROR(VLOOKUP(A,Dogodki!$A$2:$L$100,n,FALSE),"")
  const event = (row: Pick<StudentRow, "eventId">) => (row.eventId === null ? undefined : byId.get(row.eventId));
  const hours = (row: Row) => event(row)?.hours ?? 0;
  const eventOptions = events.map((e) => ({ value: String(e.id), label: e.code ?? `#${e.id}` }));

  const paidCount = rows.filter((r) => r.paid).length;
  const hoursBy = new Map<string, number>();
  for (const r of rows) hoursBy.set(r.student || "Ni vpisan", (hoursBy.get(r.student || "Ni vpisan") ?? 0) + hours(r));
  const students = [...hoursBy.entries()].sort((a, b) => b[1] - a[1]);

  const columns: GridColumn<Row>[] = [
    { key: "eventId", label: "ID", type: "select", options: eventOptions, width: 116 },
    { key: "date", label: "Datum", type: "computed", width: 116, value: (row) => formatDate(event(row)?.date ?? null) },
    { key: "client", label: "Naročnik", type: "computed", width: 230, value: (row) => event(row)?.client ?? "" },
    { key: "student", label: "Študent", type: "select", options: lists.students, width: 140 },
    {
      key: "hours",
      label: "Ure",
      type: "computed",
      numeric: true,
      width: 64,
      value: (row) => {
        const h = event(row)?.hours;
        return h === null || h === undefined ? "" : formatPlain(h);
      },
    },
    { key: "amount", label: "Znesek €", type: "money", width: 110 },
    { key: "payer", label: "Plačal", type: "select", options: lists.payers, width: 140 },
    { key: "pair", label: "Par plačnika", type: "computed", width: 140, value: (row) => payerPair(row.payer) },
    { key: "paid", label: "Plačano?", type: "bool", width: 96 },
    { key: "refund", label: "Povračilo paru €", type: "computed", numeric: true, strong: true, width: 140, value: studentPairRefund },
    { key: "note", label: "Opomba", type: "text", width: 260 },
  ];

  const fields: FieldSpec[] = [
    {
      key: "eventId",
      label: "Dogodek",
      kind: "select",
      required: true,
      wide: true,
      placeholder: "Izberi dogodek",
      options: [...events].reverse().map((e) => ({ value: String(e.id), label: `${e.code ?? `#${e.id}`} · ${e.client ?? "brez naročnika"}` })),
    },
    { key: "student", label: "Študent", kind: "select", options: lists.students, required: true },
    { key: "amount", label: "Znesek €", kind: "money", placeholder: "0,00" },
    { key: "paid", label: "Plačano?", kind: "seg", options: ["NE", "DA"] },
    { key: "payer", label: "Plačal", kind: "seg", options: lists.payers, wide: true },
    { key: "note", label: "Opomba", kind: "area", wide: true },
  ];

  return (
    <>
      <WorkspaceHeader year={year} title="Študenti" addLabel="Dodaj študenta" onAdd={() => setAdding(true)} />

      <Strip>
        <KpiCard size="md" label="Ure študentov" value={rows.reduce((s, r) => s + hours(r), 0)} />
        <KpiCard size="md" label="Izplačano" value={rows.filter((r) => r.paid).reduce((s, r) => s + (r.amount ?? 0), 0)} format="eur" />
        <KpiCard size="md" label="Povračilo paru" value={rows.reduce((s, r) => s + (studentPairRefund(r) ?? 0), 0)} format="eur" />
        <KpiCard size="md" label="Neplačani vnosi" value={rows.length - paidCount} format="int" />
      </Strip>

      <ChartRow>
        <Panel title="Ure po študentih" className="flex-[3_1_520px]">
          <HBars rows={students.map(([label, value]) => ({ label, value, color: PALETTE[2], display: `${formatPlain(value)} h` }))} />
        </Panel>
        <Panel title="Plačano?" className="flex-[2_1_360px]">
          <Donut
            size={170}
            segments={[
              { label: "Plačano", value: paidCount, color: PALETTE[2], display: String(paidCount) },
              { label: "Ni plačano", value: rows.length - paidCount, color: PALETTE[1], display: String(rows.length - paidCount) },
            ]}
            center={String(rows.length)}
            sub="vnosov"
          />
        </Panel>
      </ChartRow>

      <LedgerGrid table="students" rows={rows} setRows={setRows} columns={columns} addLabel="Dodaj študenta" onAdd={() => setAdding(true)} highlight={highlight} />

      <FormDialog
        open={adding}
        onOpenChange={setAdding}
        eyebrow="Nov vnos · Študenti"
        title="Dodaj študenta"
        fields={fields}
        summary={(v) => {
          const refund = studentPairRefund({ amount: v.amount ? parseAmount(v.amount) : null, paid: v.paid === "DA", payer: v.payer || null });
          return [
            ["Par plačnika", payerPair(v.payer) ?? "—"],
            ["Povračilo paru", formatEur(refund ?? 0)],
          ];
        }}
        onSubmit={(values) => create(values, (row) => `${row.student ?? "Študent"} je dodan na dogodek`)}
      />
    </>
  );
}
