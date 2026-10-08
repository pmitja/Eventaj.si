"use client";

import { useState } from "react";
import { ColumnBars, Donut, monthOf, MONTHS, PALETTE } from "@/app/admin/_components/charts";
import { FormDialog, type FieldSpec } from "@/app/admin/_components/form-dialog";
import { KpiCard } from "@/app/admin/_components/kpi-card";
import { Panel } from "@/app/admin/_components/panel";
import { formatEur, paymentMethod, rowTotal } from "@/lib/ledger/compute";
import type { LedgerLists } from "@/lib/ledger/lists";
import type { EventRow } from "@/lib/ledger/schema";
import { FilterChips, LedgerGrid, type GridColumn, type GridRow } from "./ledger-grid";
import { ChartRow, nextCode, parseAmount, SheetHint, Strip, useLedgerRows, WorkspaceHeader } from "./workspace";

type Row = EventRow & GridRow;

const NO_ALBUM = "Brez albuma";
const FILTERS = ["Vsi", "Nakazilo", "Gotovina", "Nakazilo + gotovina"] as const;

export function EventsWorkspace({ year, rows: initial, lists, albums }: { year: number; rows: EventRow[]; lists: LedgerLists; albums: string[] }) {
  const { rows, setRows, highlight, adding, setAdding, create } = useLedgerRows("events", year, initial as Row[]);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Vsi");

  const dated = rows.filter((e) => e.date);
  const revenue = dated.reduce((s, e) => s + (rowTotal(e) ?? 0), 0);
  const perMonth = MONTHS.map((label, i) => ({ label, value: dated.filter((e) => monthOf(e.date) === i).length }));
  const albumCounts = new Map<string, number>();
  for (const e of dated) {
    const key = e.albumUsed && e.album ? e.album : NO_ALBUM;
    albumCounts.set(key, (albumCounts.get(key) ?? 0) + 1);
  }
  let colorIndex = 0;
  const albumSegments = [...albumCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([label, value]) => ({ label, value, display: String(value), color: label === NO_ALBUM ? PALETTE[5] : PALETTE[colorIndex++ % 5] }));

  const columns: GridColumn<Row>[] = [
    { key: "code", label: "ID", type: "text", width: 100 },
    { key: "date", label: "Datum", type: "date", width: 150 },
    { key: "client", label: "Naročnik", type: "text", width: 230 },
    { key: "km", label: "Km", type: "number", width: 72 },
    { key: "hours", label: "Ure", type: "number", width: 64 },
    { key: "transfer", label: "Nakazilo €", type: "money", width: 110 },
    { key: "cash", label: "Gotovina €", type: "money", width: 110 },
    { key: "total", label: "Skupaj €", type: "computed", numeric: true, strong: true, width: 104, value: rowTotal },
    { key: "method", label: "Način plačila", type: "computed", width: 180, value: paymentMethod, tone: () => "n" },
    { key: "service", label: "Storitev", type: "select", options: lists.services, width: 140 },
    { key: "albumUsed", label: "Album?", type: "bool", width: 84 },
    { key: "album", label: "Kateri album?", type: "select", options: albums, width: 250 },
    { key: "cartridgeChanged", label: "Kartuša?", type: "bool", width: 92 },
    { key: "cartridgeNote", label: "Opomba kartuša/papir", type: "text", width: 190 },
    { key: "notes", label: "Opombe", type: "text", width: 210 },
    { key: "execution", label: "Izvedba dogodka", type: "select", options: lists.executions, width: 150, hint: "Kdo je izvedel celoten dogodek" },
    { key: "initialHelp", label: "Začetna pomoč", type: "select", options: lists.initialHelp, width: 140, hint: "Kdo je prišel samo na začetno pomoč/postavitev" },
    { key: "executionNotes", label: "Opombe izvedbe", type: "text", width: 260 },
  ];

  const code = nextCode("EVT", rows.map((r) => r.code));
  const fields: FieldSpec[] = [
    { key: "date", label: "Datum", kind: "date", required: true },
    { key: "client", label: "Naročnik", kind: "text", required: true, placeholder: "Ime ali podjetje" },
    { key: "km", label: "Km", kind: "number", placeholder: "0" },
    { key: "hours", label: "Ure", kind: "number", required: true, placeholder: "0" },
    { key: "service", label: "Storitev", kind: "select", options: lists.services, wide: true, initial: lists.services[0] ?? "" },
    { key: "transfer", label: "Nakazilo €", kind: "money", placeholder: "0,00" },
    { key: "cash", label: "Gotovina €", kind: "money", placeholder: "0,00" },
    { key: "album", label: "Album", kind: "select", options: [NO_ALBUM, ...albums], initial: NO_ALBUM },
    { key: "cartridgeChanged", label: "Kartuša", kind: "seg", options: ["NE", "DA"] },
    { key: "execution", label: "Izvedba dogodka", kind: "select", options: lists.executions, required: true },
    { key: "initialHelp", label: "Začetna pomoč", kind: "seg", options: lists.initialHelp },
    { key: "executionNotes", label: "Opombe izvedbe", kind: "area", wide: true, placeholder: "Kdo je bil prisoten, posebnosti …" },
  ];

  return (
    <>
      <WorkspaceHeader year={year} title="Dogodki" addLabel="Dodaj dogodek" onAdd={() => setAdding(true)} />

      <Strip>
        <KpiCard size="md" label="Dogodki" value={dated.length} format="int" />
        <KpiCard size="md" label="Povprečno na dogodek" value={dated.length ? revenue / dated.length : 0} format="eur" />
        <KpiCard size="md" label="Ure skupaj" value={dated.reduce((s, e) => s + (e.hours ?? 0), 0)} />
        <KpiCard size="md" label="Km skupaj" value={dated.reduce((s, e) => s + (e.km ?? 0), 0)} format="km" />
      </Strip>

      <ChartRow>
        <Panel title="Dogodki po mesecih" note="število dogodkov" className="flex-[3_1_520px]">
          <ColumnBars columns={perMonth} />
        </Panel>
        <Panel title="Albumi na dogodkih" className="flex-[2_1_360px]">
          <Donut size={170} segments={albumSegments} center={String(dated.length - (albumCounts.get(NO_ALBUM) ?? 0))} sub="z albumom" />
        </Panel>
      </ChartRow>

      <LedgerGrid
        table="events"
        rows={rows}
        setRows={setRows}
        columns={columns}
        addLabel="Dodaj dogodek"
        onAdd={() => setAdding(true)}
        highlight={highlight}
        visible={filter === "Vsi" ? undefined : (row) => paymentMethod(row) === filter}
        toolbar={<FilterChips options={[...FILTERS]} value={filter} onChange={setFilter} />}
      />

      <SheetHint title="Kako beležiti izvedbo">
        <p className="m-0">Izvedba dogodka = kdo je izvedel celoten dogodek.</p>
        <p className="m-0">Začetna pomoč = kdo je prišel samo na začetno pomoč/postavitev.</p>
        <p className="m-0">Če študenti vse izvedejo sami: Izvedba = Študenti, Začetna pomoč = Brez.</p>
        <p className="m-0">Skupaj in način plačila se izračunata samo, ko je vnesen datum. Albumi za izbiro so artikli tipa Album na listu Zaloga.</p>
      </SheetHint>

      <FormDialog
        open={adding}
        onOpenChange={setAdding}
        eyebrow={`Nov vnos · ${code}`}
        title="Dodaj dogodek"
        fields={fields}
        summary={(v) => {
          const transfer = parseAmount(v.transfer);
          const cash = parseAmount(v.cash);
          const stock = [v.album && v.album !== NO_ALBUM ? `1 × ${v.album.toLowerCase()}` : null, v.cartridgeChanged === "DA" ? "1 × kartuša" : null].filter(Boolean);
          return [
            ["Skupaj", formatEur(transfer + cash)],
            ["Način plačila", paymentMethod({ date: "x", transfer, cash }) ?? "—"],
            ["Iz zaloge", stock.join(", ") || "—"],
          ];
        }}
        onSubmit={({ album, ...values }) =>
          create(
            { ...values, code, album: album && album !== NO_ALBUM ? album : null, albumUsed: album && album !== NO_ALBUM ? "DA" : "NE" },
            (row) => `Dogodek ${row.code} je dodan`,
          )
        }
      />
    </>
  );
}
