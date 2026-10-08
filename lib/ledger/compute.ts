// Every derived value from the spreadsheet, one function per formula. The Excel formula is quoted
// above each so changes can be checked against the original. Text criteria in COUNTIF/SUMIF are
// case-insensitive in Excel, hence `same()`. Blank cells ("") are null here.
import type { CostRow, EventRow, LedgerYear, StockRow, StudentRow, TableRentalRow } from "./schema";

export const FUND = "Skupni fond";
export const PAIRS = ["Maja + Jan", "Julija + Mitja"] as const;
export const DUO = "Jan + Mitja";

const num = (value: number | null | undefined) => value ?? 0;
const sum = <T>(rows: T[], pick: (row: T) => number | null | undefined) => rows.reduce((total, row) => total + num(pick(row)), 0);
const same = (a: string | null | undefined, b: string) => (a ?? "").toLowerCase() === b.toLowerCase();
const blank = (value: string | null | undefined) => value === null || value === undefined || value === "";

// Dogodki!H / 'Najem miz'!H  =IF(B="","",SUM(F:G))
export function rowTotal(row: { date: string | null; transfer: number | null; cash: number | null }) {
  return blank(row.date) ? null : num(row.transfer) + num(row.cash);
}

// Dogodki!I / 'Najem miz'!I
// =IF(B="","",IF(AND(F>0,G>0),"Nakazilo + gotovina",IF(F>0,"Nakazilo",IF(G>0,"Gotovina",""))))
export function paymentMethod(row: { date: string | null; transfer: number | null; cash: number | null }) {
  if (blank(row.date)) return null;
  const transfer = num(row.transfer);
  const cash = num(row.cash);
  if (transfer > 0 && cash > 0) return "Nakazilo + gotovina";
  if (transfer > 0) return "Nakazilo";
  if (cash > 0) return "Gotovina";
  return null;
}

// 'Stroški'!F  =IF(E="","",IF(E="Skupni fond","Skupni fond","Osebna sredstva"))
export function costSource(cost: Pick<CostRow, "payer">) {
  if (blank(cost.payer)) return null;
  return same(cost.payer, FUND) ? FUND : "Osebna sredstva";
}

// 'Stroški'!G / 'Študenti'!H
// =IF(E="","",IF(OR(E="Jan",E="Maja"),"Maja + Jan",IF(OR(E="Mitja",E="Julija"),"Julija + Mitja","Skupni fond")))
export function payerPair(payer: string | null) {
  if (blank(payer)) return null;
  if (same(payer, "Jan") || same(payer, "Maja")) return PAIRS[0];
  if (same(payer, "Mitja") || same(payer, "Julija")) return PAIRS[1];
  return FUND;
}

// 'Stroški'!I  =IF(C="","",IF(E="Skupni fond",0,MAX(D-H,0)))
export function costRemaining(cost: Pick<CostRow, "description" | "payer" | "amount" | "refunded">) {
  if (blank(cost.description)) return null;
  if (same(cost.payer, FUND)) return 0;
  return Math.max(num(cost.amount) - num(cost.refunded), 0);
}

// 'Študenti'!J  =IF(F="","",IF(AND(I="DA",G<>"Skupni fond"),F,0))
export function studentPairRefund(row: Pick<StudentRow, "amount" | "paid" | "payer">) {
  if (row.amount === null) return null;
  return row.paid && !same(row.payer, FUND) ? row.amount : 0;
}

// 'Najem miz'!N  =IF(B="","",SUM(K,M))
export function rentalKm(row: Pick<TableRentalRow, "date" | "kmDelivery" | "kmPickup">) {
  return blank(row.date) ? null : num(row.kmDelivery) + num(row.kmPickup);
}

// 'Najem miz'!R:U for one person
export function transportSummary(rentals: TableRentalRow[], person: string) {
  // R  =COUNTIF($J$5:$J$300,Q)
  const deliveries = rentals.filter((r) => same(r.deliveredBy, person)).length;
  // S  =COUNTIF($L$5:$L$300,Q)
  const pickups = rentals.filter((r) => same(r.pickedBy, person)).length;
  // U  =SUMIF($J$5:$J$300,Q,$K$5:$K$300)+SUMIF($L$5:$L$300,Q,$M$5:$M$300)
  const km =
    sum(rentals.filter((r) => same(r.deliveredBy, person)), (r) => r.kmDelivery) +
    sum(rentals.filter((r) => same(r.pickedBy, person)), (r) => r.kmPickup);
  // T  =R+S
  return { person, deliveries, pickups, trips: deliveries + pickups, km };
}

// Zaloga!D
//   albums:    =COUNTIFS(Dogodki!$K$2:$K$300,"DA",Dogodki!$L$2:$L$300,A)
//   cartridge: =COUNTIF(Dogodki!$M$2:$M$300,"DA")
export function stockUsed(item: StockRow, events: EventRow[]) {
  if (same(item.type, "Kartuša")) return events.filter((e) => e.cartridgeChanged).length;
  if (same(item.type, "Album")) return events.filter((e) => e.albumUsed && same(e.album, item.name ?? "")).length;
  return 0;
}

export function stockLine(item: StockRow, events: EventRow[]) {
  const used = stockUsed(item, events);
  // F  =IF(C="","",C+E-D)
  const current = item.opening === null ? null : item.opening + num(item.added) - used;
  // H  =IF(F="","VNESI ZAČETNO ZALOGO",IF(F<=G,"NAROČI","OK"))
  const status = current === null ? "VNESI ZAČETNO ZALOGO" : current <= num(item.minimum) ? "NAROČI" : "OK";
  return { ...item, used, current, status };
}

// Pregled!A16:F17 for "Jan" or "Mitja". P = execution (full), Q = initial help.
export function attendance(events: EventRow[], person: string) {
  const full = (e: EventRow) => same(e.execution, person) || same(e.execution, DUO);
  const helped = (e: EventRow) => same(e.initialHelp, person) || same(e.initialHelp, DUO);
  const fullEvents = events.filter(full);
  // COUNTIFS(P,"<>X",P,"<>Jan + Mitja",Q,"X") + COUNTIFS(...,Q,"Jan + Mitja")
  const helpOnly = events.filter((e) => !full(e) && helped(e));
  return {
    person,
    // B  =COUNTIF(P,"X")+COUNTIF(P,"Jan + Mitja")
    fullRuns: fullEvents.length,
    // C  =COUNTIF(Q,"X")+COUNTIF(Q,"Jan + Mitja")
    initialHelps: events.filter(helped).length,
    // D  = B + help-only arrivals
    arrivals: fullEvents.length + helpOnly.length,
    // E  =SUMIF(P,"X",E)+SUMIF(P,"Jan + Mitja",E)
    hours: sum(fullEvents, (e) => e.hours),
    // F  = km of full runs + km of help-only arrivals
    km: sum(fullEvents, (e) => e.km) + sum(helpOnly, (e) => e.km),
  };
}

export function computeOverview(data: LedgerYear) {
  const { events, tables, costs, stock, fundOpening } = data;

  // A4  =COUNT(Dogodki!B2:B100)
  const eventCount = events.filter((e) => !blank(e.date)).length;
  // C4 / B22  =SUM(Dogodki!H)+SUM('Najem miz'!H)
  const revenue = sum(events, rowTotal) + sum(tables, rowTotal);
  // E4 / C7 / B23 / E23  =SUM(Dogodki!F)+SUM('Najem miz'!F)
  const transfers = sum(events, (e) => e.transfer) + sum(tables, (t) => t.transfer);
  // G4 / B24  =SUM(Dogodki!G)+SUM('Najem miz'!G)
  const cash = sum(events, (e) => e.cash) + sum(tables, (t) => t.cash);
  // A7 / B25  =SUM('Stroški'!D)
  const allCosts = sum(costs, (c) => c.amount);
  // E24  =SUMIF('Stroški'!E,"Skupni fond",'Stroški'!D)
  const fundCosts = sum(costs.filter((c) => same(c.payer, FUND)), (c) => c.amount);
  // E25  =SUM('Stroški'!H)
  const refunded = sum(costs, (c) => c.refunded);
  // E7 / E26  =E22+E23-E24-E25
  const fundNow = fundOpening + transfers - fundCosts - refunded;
  // G7  =E7-SUM('Stroški'!I)
  const fundAfterRefundsTop = fundNow - sum(costs, costRemaining);

  const pairs = PAIRS.map((pair) => {
    const ofPair = costs.filter((c) => payerPair(c.payer) === pair);
    // B10  =SUMIF('Stroški'!G,A10,'Stroški'!D)
    const paidPersonally = sum(ofPair, (c) => c.amount);
    // C10  =SUMIF('Stroški'!G,A10,'Stroški'!H)
    const refundedToPair = sum(ofPair, (c) => c.refunded);
    // D10  =MAX(B10-C10,0)
    const due = Math.max(paidPersonally - refundedToPair, 0);
    // E27/E28  =SUMIFS('Stroški'!I,'Stroški'!G,"Maja + Jan")
    const openRefunds = sum(ofPair, costRemaining);
    // E10  =IF(D10=0,"Poravnano","Vzemi iz skupnega fonda "&ROUND(D10,2)&" €")
    const instruction = due === 0 ? "Poravnano" : `Vzemi iz skupnega fonda ${formatEur(roundTo(due, 2))}`;
    return { pair, paidPersonally, refunded: refundedToPair, due, openRefunds, instruction };
  });

  // E30  =E27+E28
  const openRefundsTotal = pairs.reduce((total, p) => total + p.openRefunds, 0);
  // E29  =E26-E27-E28
  const fundAfterRefunds = fundNow - openRefundsTotal;

  return {
    eventCount,
    revenue,
    transfers,
    cash,
    allCosts,
    // B26  =B22-B25
    profit: revenue - allCosts,
    fundOpening,
    fundCosts,
    refunded,
    fundNow,
    fundAfterRefundsTop,
    fundAfterRefunds,
    openRefundsTotal,
    pairs,
    attendance: [attendance(events, "Jan"), attendance(events, "Mitja")],
    stock: stock.map((item) => stockLine(item, events)),
  };
}

export type Overview = ReturnType<typeof computeOverview>;

// Excel ROUND: half away from zero.
export function roundTo(value: number, digits: number) {
  const factor = 10 ** digits;
  return (Math.sign(value) * Math.round(Math.abs(value) * factor + Number.EPSILON)) / factor;
}

// Deterministic (no Intl) so server and browser render identical text.
export function formatNumber(value: number, decimals = 2) {
  const [whole, fraction] = roundTo(Math.abs(value), decimals).toFixed(decimals).split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${value < 0 && Number(whole + (fraction ?? "")) !== 0 ? "−" : ""}${grouped}${fraction ? `,${fraction}` : ""}`;
}

// Counts, hours and km: no trailing decimals for whole numbers.
export function formatPlain(value: number) {
  return formatNumber(value, Number.isInteger(value) ? 0 : 1);
}

export function formatEur(value: number) {
  return `${formatNumber(value)} €`;
}
