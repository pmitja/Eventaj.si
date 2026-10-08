"use client";

import { Donut, HBars, PALETTE, plural } from "@/app/admin/_components/charts";
import { FormDialog, type FieldSpec } from "@/app/admin/_components/form-dialog";
import { KpiCard } from "@/app/admin/_components/kpi-card";
import { Panel } from "@/app/admin/_components/panel";
import { formatEur, formatNumber, paymentMethod, rentalKm, rowTotal, transportSummary } from "@/lib/ledger/compute";
import { NO_DELIVERY, type LedgerLists } from "@/lib/ledger/lists";
import type { TableRentalRow } from "@/lib/ledger/schema";
import { LedgerGrid, type GridColumn, type GridRow } from "./ledger-grid";
import { ChartRow, nextCode, parseAmount, SheetHint, Strip, useLedgerRows, WorkspaceHeader } from "./workspace";

type Row = TableRentalRow & GridRow;

export function TablesWorkspace({ year, rows: initial, lists }: { year: number; rows: TableRentalRow[]; lists: LedgerLists }) {
  const { rows, setRows, highlight, adding, setAdding, create } = useLedgerRows("tables", year, initial as Row[]);
  const drivers = [...lists.tableDrivers, NO_DELIVERY];
  const transfers = rows.reduce((s, r) => s + (r.transfer ?? 0), 0);
  const cash = rows.reduce((s, r) => s + (r.cash ?? 0), 0);
  const transport = lists.tableDrivers.map((person) => transportSummary(rows, person)).filter((t) => t.trips > 0);

  const columns: GridColumn<Row>[] = [
    { key: "code", label: "ID", type: "text", width: 110 },
    { key: "date", label: "Datum", type: "date", width: 150 },
    { key: "client", label: "Naročnik", type: "text", width: 180 },
    { key: "location", label: "Lokacija", type: "text", width: 230 },
    { key: "tableCount", label: "Št. miz", type: "number", width: 80 },
    { key: "transfer", label: "Nakazilo €", type: "money", width: 110 },
    { key: "cash", label: "Gotovina €", type: "money", width: 110 },
    { key: "total", label: "Skupaj €", type: "computed", numeric: true, strong: true, width: 104, value: rowTotal },
    { key: "method", label: "Način plačila", type: "computed", width: 170, value: paymentMethod, tone: () => "n" },
    { key: "deliveredBy", label: "Dostavil / peljal", type: "select", options: drivers, width: 160 },
    { key: "kmDelivery", label: "Km dostava", type: "number", width: 104 },
    { key: "pickedBy", label: "Prevzel / šel po", type: "select", options: drivers, width: 160 },
    { key: "kmPickup", label: "Km prevzem", type: "number", width: 104 },
    {
      key: "km",
      label: "Skupni km",
      type: "computed",
      numeric: true,
      width: 100,
      value: (row) => {
        const km = rentalKm(row);
        return km === null ? "" : formatNumber(km, 1);
      },
    },
    { key: "notes", label: "Opombe", type: "text", width: 230 },
  ];

  const code = nextCode("MIZE", rows.map((r) => r.code));
  const fields: FieldSpec[] = [
    { key: "date", label: "Datum", kind: "date", required: true },
    { key: "tableCount", label: "Št. miz", kind: "number", required: true, placeholder: "0" },
    { key: "client", label: "Naročnik", kind: "text", wide: true, placeholder: "Ime ali podjetje" },
    { key: "location", label: "Lokacija", kind: "text", required: true, wide: true, placeholder: "Naslov" },
    { key: "transfer", label: "Nakazilo €", kind: "money", placeholder: "0,00" },
    { key: "cash", label: "Gotovina €", kind: "money", placeholder: "0,00" },
    { key: "deliveredBy", label: "Dostavil / peljal", kind: "select", options: drivers },
    { key: "kmDelivery", label: "Km dostava", kind: "number", placeholder: "0" },
    { key: "pickedBy", label: "Prevzel / šel po", kind: "select", options: drivers },
    { key: "kmPickup", label: "Km prevzem", kind: "number", placeholder: "0" },
    { key: "notes", label: "Opombe", kind: "area", wide: true },
  ];

  return (
    <>
      <WorkspaceHeader year={year} title="Najem miz" addLabel="Dodaj najem" onAdd={() => setAdding(true)} />

      <Strip>
        <KpiCard size="md" label="Najemi" value={rows.length} format="int" />
        <KpiCard size="md" label="Mize skupaj" value={rows.reduce((s, r) => s + (r.tableCount ?? 0), 0)} />
        <KpiCard size="md" label="Prihodki" value={transfers + cash} format="eur" />
        <KpiCard size="md" label="Km prevozov" value={rows.reduce((s, r) => s + (rentalKm(r) ?? 0), 0)} format="km" />
      </Strip>

      <ChartRow>
        <Panel title="Prevozi miz" note="km skupaj · prevozi se ne vštevajo v pregled izvedb" className="flex-[3_1_520px]">
          <HBars
            rows={transport.map((t, i) => ({
              label: `${t.person} · ${plural(t.trips, "vožnja", "vožnji", "vožnje", "voženj")}`,
              value: t.km,
              color: PALETTE[i % PALETTE.length],
              display: `${formatNumber(t.km, 1)} km`,
            }))}
          />
        </Panel>
        <Panel title="Način plačila" className="flex-[2_1_360px]">
          <Donut
            size={170}
            segments={[
              { label: "Nakazilo", value: transfers, color: PALETTE[0], display: formatEur(transfers) },
              { label: "Gotovina", value: cash, color: PALETTE[1], display: formatEur(cash) },
            ]}
            center={formatEur(transfers + cash)}
            sub="skupaj"
          />
        </Panel>
      </ChartRow>

      <LedgerGrid table="tables" rows={rows} setRows={setRows} columns={columns} addLabel="Dodaj najem" onAdd={() => setAdding(true)} highlight={highlight} />

      <SheetHint title="Najem stoječih barskih miz">
        <p className="m-0">Vsak najem vnesite v eno vrstico. Nakazila se avtomatsko prištejejo skupnemu fondu na Pregledu; gotovina se, tako kot pri drugih storitvah, ne všteva v fond.</p>
        <p className="m-0">Prevozi miz se ne vštevajo v glavni Jan/Mitja pregled izvedb; njihov ločen pregled je zgoraj.</p>
      </SheetHint>

      <FormDialog
        open={adding}
        onOpenChange={setAdding}
        eyebrow={`Nov vnos · ${code}`}
        title="Dodaj najem"
        fields={fields}
        summary={(v) => [
          ["Skupaj", formatEur(parseAmount(v.transfer) + parseAmount(v.cash))],
          ["Skupni km", formatNumber(parseAmount(v.kmDelivery) + parseAmount(v.kmPickup), 1)],
        ]}
        onSubmit={(values) => create({ ...values, code }, (row) => `Najem ${row.code} je dodan`)}
      />
    </>
  );
}
