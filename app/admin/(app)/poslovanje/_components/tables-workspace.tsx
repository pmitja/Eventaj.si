"use client";

import { useState } from "react";
import { Donut, HBars, PALETTE, plural } from "@/app/admin/_components/charts";
import { FormDialog, type FieldSpec } from "@/app/admin/_components/form-dialog";
import { KpiCard } from "@/app/admin/_components/kpi-card";
import { Panel } from "@/app/admin/_components/panel";
import { formatEur, formatNumber, isPaid, paidCash, paidTransfer, paymentMethod, rentalKm, rowTotal, transportSummary, unpaidAmount } from "@/lib/ledger/compute";
import { NO_DELIVERY, type LedgerLists } from "@/lib/ledger/lists";
import type { TableRentalRow } from "@/lib/ledger/schema";
import { LedgerGrid, type GridColumn, type GridRow } from "./ledger-grid";
import { ChartRow, nextCode, parseAmount, SheetHint, Strip, UnpaidAlert, useLedgerRows, WorkspaceHeader } from "./workspace";

type Row = TableRentalRow & GridRow;

// Oprema (the sheet was "Najem miz"): one row per rental or sale of an item from /oprema-za-dogodke.
// Rows without an Artikel are standing tables, as before the column existed.
export function TablesWorkspace({ year, rows: initial, lists, equipment }: { year: number; rows: TableRentalRow[]; lists: LedgerLists; equipment: string[] }) {
  const { rows, setRows, highlight, adding, setAdding, create } = useLedgerRows("tables", year, initial as Row[]);
  const tablesItem = equipment.find((name) => /stoječ/i.test(name)) ?? "Stoječa barska miza";
  const isTables = (row: Pick<TableRentalRow, "item">) => !row.item || row.item.toLowerCase() === tablesItem.toLowerCase();
  const byItem = new Map<string, { revenue: number; count: number }>();
  for (const row of rows) {
    const name = row.item || tablesItem;
    const entry = byItem.get(name) ?? { revenue: 0, count: 0 };
    entry.revenue += rowTotal(row) ?? 0;
    entry.count += 1;
    byItem.set(name, entry);
  }
  const drivers = [...lists.tableDrivers, NO_DELIVERY];
  const transfers = rows.reduce((s, r) => s + paidTransfer(r), 0);
  const cash = rows.reduce((s, r) => s + paidCash(r), 0);
  const unpaidRows = rows.filter((r) => unpaidAmount(r) !== null);
  const unpaid = unpaidRows.reduce((s, r) => s + (unpaidAmount(r) ?? 0), 0);
  const [onlyUnpaid, setOnlyUnpaid] = useState(false);
  const transport = lists.tableDrivers.map((person) => transportSummary(rows, person)).filter((t) => t.trips > 0);

  const columns: GridColumn<Row>[] = [
    { key: "code", label: "ID", type: "text", width: 110, sort: true },
    { key: "date", label: "Datum", type: "date", width: 150 },
    { key: "client", label: "Naročnik", type: "text", width: 180 },
    { key: "location", label: "Lokacija", type: "text", width: 230 },
    { key: "item", label: "Artikel", type: "select", options: equipment, width: 200 },
    { key: "tableCount", label: "Količina", type: "number", width: 92 },
    { key: "transfer", label: "Nakazilo €", type: "money", width: 110 },
    { key: "cash", label: "Gotovina €", type: "money", width: 110 },
    { key: "paid", label: "Plačano?", type: "bool", alertOff: true, width: 92, hint: "NE = naročnik še ni plačal; znesek se ne šteje v prihodke in fond, dokler ne preklopite na DA" },
    { key: "total", label: "Skupaj €", type: "computed", numeric: true, strong: true, width: 104, value: rowTotal },
    { key: "unpaid", label: "Neplačano €", type: "computed", numeric: true, width: 116, value: unpaidAmount, tone: (row) => (unpaidAmount(row) !== null ? "alert" : null) },
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

  const code = nextCode("OPR", rows.map((r) => r.code));
  const fields: FieldSpec[] = [
    {
      key: "item",
      label: "Artikel",
      kind: "combo",
      free: true,
      required: true,
      options: equipment,
      wide: true,
      initial: tablesItem,
      placeholder: "Vpiši ali izberi artikel",
    },
    { key: "date", label: "Datum", kind: "date", required: true },
    { key: "tableCount", label: "Količina", kind: "number", required: true, placeholder: "0" },
    { key: "client", label: "Naročnik", kind: "text", wide: true, placeholder: "Ime ali podjetje" },
    { key: "location", label: "Lokacija", kind: "text", required: true, wide: true, placeholder: "Naslov" },
    { key: "transfer", label: "Nakazilo €", kind: "money", placeholder: "0,00" },
    { key: "cash", label: "Gotovina €", kind: "money", placeholder: "0,00" },
    { key: "paid", label: "Plačano", kind: "seg", options: ["DA", "NE"], wide: true },
    { key: "deliveredBy", label: "Dostavil / peljal", kind: "select", options: drivers },
    { key: "kmDelivery", label: "Km dostava", kind: "number", placeholder: "0" },
    { key: "pickedBy", label: "Prevzel / šel po", kind: "select", options: drivers },
    { key: "kmPickup", label: "Km prevzem", kind: "number", placeholder: "0" },
    { key: "notes", label: "Opombe", kind: "area", wide: true },
  ];

  return (
    <>
      <WorkspaceHeader year={year} title="Oprema" addLabel="Dodaj najem" onAdd={() => setAdding(true)} />

      <Strip>
        <KpiCard size="md" label="Najemi" value={rows.length} format="int" />
        <KpiCard size="md" label="Mize skupaj" value={rows.filter(isTables).reduce((s, r) => s + (r.tableCount ?? 0), 0)} />
        <KpiCard size="md" label="Prihodki" value={transfers + cash} format="eur" />
        <KpiCard size="md" label="Km prevozov" value={rows.reduce((s, r) => s + (rentalKm(r) ?? 0), 0)} format="km" />
      </Strip>

      <UnpaidAlert
        amount={unpaid}
        what={unpaidRows.length ? plural(unpaidRows.length, "najem", "najema", "najemi", "najemov") : null}
        active={onlyUnpaid}
        onShow={() => setOnlyUnpaid(!onlyUnpaid)}
      />

      <Panel title="Prihodki po artiklih" note={plural(rows.length, "najem", "najema", "najemi", "najemov")}>
        <HBars
          labelWidth="minmax(120px,220px)"
          valueWidth="minmax(84px,auto)"
          rows={[...byItem.entries()]
            .sort((a, b) => b[1].revenue - a[1].revenue || b[1].count - a[1].count)
            .map(([name, t], i) => ({
              label: name,
              value: t.revenue,
              color: PALETTE[i % PALETTE.length],
              display: formatEur(t.revenue),
              extra: <span className="w-10 text-right text-[13px] text-adm-muted tabular">{t.count}×</span>,
            }))}
        />
      </Panel>

      <ChartRow>
        <Panel title="Prevozi opreme" note="km skupaj · prevozi se ne vštevajo v pregled izvedb" className="flex-[3_1_520px]">
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

      <LedgerGrid
        table="tables"
        rows={rows}
        setRows={setRows}
        columns={columns}
        addLabel="Dodaj najem"
        onAdd={() => setAdding(true)}
        highlight={highlight}
        visible={onlyUnpaid ? (row) => !isPaid(row) : undefined}
      />

      <SheetHint title="Oprema">
        <p className="m-0">Stoječe mize in vsa ostala oprema s strani Oprema za dogodke (tabla dobrodošlice, igre, kozarci …). Za vsak artikel posebej vnesite svojo vrstico; Količina je število miz oziroma kosov.</p>
        <p className="m-0">Vsak najem vnesite v eno vrstico. Nakazila se avtomatsko prištejejo skupnemu fondu na Pregledu; gotovina se, tako kot pri drugih storitvah, ne všteva v fond.</p>
        <p className="m-0">Plačano? = NE: znesek se ne šteje v prihodke in fond, dokler ne preklopite na DA – do takrat je v stolpcu Neplačano €.</p>
        <p className="m-0">Prevozi miz se ne vštevajo v glavni Jan/Mitja pregled izvedb; njihov ločen pregled je zgoraj.</p>
      </SheetHint>

      <FormDialog
        open={adding}
        onOpenChange={setAdding}
        eyebrow={`Nov vnos · ${code}`}
        title="Dodaj najem"
        fields={fields}
        summary={(v) => [
          [v.paid === "NE" ? "Neplačano" : "Skupaj", formatEur(parseAmount(v.transfer) + parseAmount(v.cash))],
          ["Skupni km", formatNumber(parseAmount(v.kmDelivery) + parseAmount(v.kmPickup), 1)],
        ]}
        onSubmit={(values) => create({ ...values, code }, (row) => `Najem ${row.code} je dodan`)}
      />
    </>
  );
}
