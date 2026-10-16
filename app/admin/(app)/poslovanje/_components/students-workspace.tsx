"use client";

import { Donut, HBars, PALETTE } from "@/app/admin/_components/charts";
import { FormDialog, type FieldSpec } from "@/app/admin/_components/form-dialog";
import { KpiCard } from "@/app/admin/_components/kpi-card";
import { Panel } from "@/app/admin/_components/panel";
import { formatEur, formatPlain, payerPair, studentPairRefund } from "@/lib/ledger/compute";
import type { LedgerLists } from "@/lib/ledger/lists";
import type { EventRow, StudentRow, TableRentalRow } from "@/lib/ledger/schema";
import { formatDate } from "./format";
import { LedgerGrid, type GridColumn, type GridRow } from "./ledger-grid";
import { ChartRow, parseAmount, Strip, useLedgerRows, WorkspaceHeader } from "./workspace";

type Row = StudentRow & GridRow;

type Target = { link: string; code: string; date: string | null; client: string | null; hours: number | null };

export function StudentsWorkspace({
  year,
  rows: initial,
  events,
  rentals,
  lists,
}: {
  year: number;
  rows: StudentRow[];
  events: EventRow[];
  rentals: TableRentalRow[];
  lists: LedgerLists;
}) {
  const { rows, setRows, highlight, adding, setAdding, create } = useLedgerRows("students", year, initial as Row[]);
  // A student works either a photo booth event or a table rental (rentals have no hours).
  const targets: Target[] = [
    ...events.map((e) => ({ link: `e:${e.id}`, code: e.code ?? `#${e.id}`, date: e.date, client: e.client, hours: e.hours })),
    ...rentals.map((t) => ({ link: `t:${t.id}`, code: t.code ?? `#${t.id}`, date: t.date, client: t.client, hours: null })),
  ].sort((a, b) => (a.date ?? "9999").localeCompare(b.date ?? "9999") || a.code.localeCompare(b.code));
  const byLink = new Map(targets.map((target) => [target.link, target]));
  // ='Študenti'!B/C/E  =IFERROR(VLOOKUP(A,Dogodki!$A$2:$L$100,n,FALSE),"")
  const event = (row: Pick<StudentRow, "link">) => (row.link === null ? undefined : byLink.get(row.link));
  const hours = (row: Row) => event(row)?.hours ?? 0;
  const eventOptions = targets.map((t) => ({ value: t.link, label: t.code }));

  const paidCount = rows.filter((r) => r.paid).length;
  const hoursBy = new Map<string, number>();
  for (const r of rows) hoursBy.set(r.student || "Ni vpisan", (hoursBy.get(r.student || "Ni vpisan") ?? 0) + hours(r));
  const students = [...hoursBy.entries()].sort((a, b) => b[1] - a[1]);

  const columns: GridColumn<Row>[] = [
    { key: "link", label: "ID", type: "select", options: eventOptions, width: 116 },
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
    { key: "paid", label: "Plačano?", type: "bool", width: 96, hint: "DA z zneskom samodejno zapiše plačilo v Stroške" },
    { key: "refund", label: "Povračilo paru €", type: "computed", numeric: true, strong: true, width: 140, value: studentPairRefund },
    { key: "note", label: "Opomba", type: "text", width: 260 },
  ];

  const fields: FieldSpec[] = [
    {
      key: "link",
      label: "Dogodek ali najem miz",
      kind: "select",
      required: true,
      wide: true,
      placeholder: "Izberi dogodek ali najem miz",
      options: [...targets].reverse().map((t) => ({ value: t.link, label: `${t.code} · ${t.client ?? "brez naročnika"}` })),
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
