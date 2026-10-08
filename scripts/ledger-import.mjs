// One-off import of a year exported from the old "Eventaj pregled" spreadsheet.
// Usage: node --env-file=.env scripts/ledger-import.mjs <leto.json> [--replace]
// JSON: { year, fundOpening, lists?, events[], costs[], students[] (eventCode), tables[], stock[] }
// with the field names from lib/ledger/schema.ts.
import { readFileSync } from "fs";
import { neon } from "@neondatabase/serverless";

const [file, flag] = process.argv.slice(2);
const data = JSON.parse(readFileSync(file, "utf8"));
const sql = neon(process.env.NEON_DB_URL);

const existing = await sql`SELECT year FROM ledger_years WHERE year = ${data.year}`;
if (existing.length > 0) {
  if (flag !== "--replace") {
    console.error(`Leto ${data.year} že obstaja. Za prepis dodaj --replace.`);
    process.exit(1);
  }
  await sql`DELETE FROM ledger_years WHERE year = ${data.year}`;
}

const by = "uvoz iz Excela";
await sql`INSERT INTO ledger_years (year, fund_opening) VALUES (${data.year}, ${data.fundOpening ?? 0})`;

for (const [key, items] of Object.entries(data.lists ?? {})) {
  await sql`
    INSERT INTO ledger_lists (key, items) VALUES (${key}, ${JSON.stringify(items)}::jsonb)
    ON CONFLICT (key) DO NOTHING
  `;
}

const eventIds = new Map();
for (const e of data.events) {
  const [row] = await sql`
    INSERT INTO ledger_events (year, code, date, client, km, hours, transfer, cash, service, album_used, album,
      cartridge_changed, cartridge_note, notes, execution, initial_help, execution_notes, updated_by)
    VALUES (${data.year}, ${e.code}, ${e.date}, ${e.client}, ${e.km}, ${e.hours}, ${e.transfer}, ${e.cash}, ${e.service},
      ${e.albumUsed}, ${e.album}, ${e.cartridgeChanged}, ${e.cartridgeNote}, ${e.notes}, ${e.execution}, ${e.initialHelp},
      ${e.executionNotes}, ${by})
    RETURNING id
  `;
  eventIds.set(e.code, row.id);
}

for (const c of data.costs) {
  await sql`
    INSERT INTO ledger_costs (year, date, category, description, amount, payer, refunded, updated_by)
    VALUES (${data.year}, ${c.date}, ${c.category}, ${c.description}, ${c.amount}, ${c.payer}, ${c.refunded}, ${by})
  `;
}

for (const s of data.students) {
  const eventId = eventIds.get(s.eventCode) ?? null;
  if (s.eventCode && eventId === null) console.warn(`Dogodek ${s.eventCode} ne obstaja (študent ${s.student})`);
  await sql`
    INSERT INTO ledger_students (year, event_id, student, amount, payer, paid, note, updated_by)
    VALUES (${data.year}, ${eventId}, ${s.student}, ${s.amount}, ${s.payer}, ${s.paid}, ${s.note}, ${by})
  `;
}

for (const t of data.tables) {
  await sql`
    INSERT INTO ledger_table_rentals (year, code, date, client, location, table_count, transfer, cash, delivered_by,
      km_delivery, picked_by, km_pickup, notes, updated_by)
    VALUES (${data.year}, ${t.code}, ${t.date}, ${t.client}, ${t.location}, ${t.tableCount}, ${t.transfer}, ${t.cash},
      ${t.deliveredBy}, ${t.kmDelivery}, ${t.pickedBy}, ${t.kmPickup}, ${t.notes}, ${by})
  `;
}

for (const [index, s] of data.stock.entries()) {
  await sql`
    INSERT INTO ledger_stock (year, position, name, type, opening, added, minimum, updated_by)
    VALUES (${data.year}, ${index + 1}, ${s.name}, ${s.type}, ${s.opening}, ${s.added}, ${s.minimum}, ${by})
  `;
}

console.log(
  `Uvoženo leto ${data.year}: ${data.events.length} dogodkov, ${data.costs.length} stroškov, ` +
    `${data.students.length} študentov, ${data.tables.length} najemov miz, ${data.stock.length} artiklov.`,
);
