import { computeOverview } from "@/lib/ledger/compute";
import { defaultLists, LIST_KEYS, type LedgerLists, type ListKey } from "@/lib/ledger/lists";
import { LEDGER_TABLES, type FieldType, type LedgerTableName, type LedgerYear } from "@/lib/ledger/schema";
import { sql } from "./index";

export type LedgerValue = string | number | boolean | null;

// Identifiers below come only from LEDGER_TABLES, never from user input.
function selectList(name: LedgerTableName) {
  const columns = Object.entries(LEDGER_TABLES[name].fields).map(([key, { col, type }]) => {
    if (type === "date") return `to_char(${col}, 'YYYY-MM-DD') AS "${key}"`;
    if (type === "number") return `${col}::float8 AS "${key}"`;
    return `${col} AS "${key}"`;
  });
  return ["id", ...columns].join(", ");
}

async function selectRows<T>(name: LedgerTableName, year: number) {
  const { table, order } = LEDGER_TABLES[name];
  return (await sql().query(`SELECT ${selectList(name)} FROM ${table} WHERE year = $1 ORDER BY ${order}`, [year])) as T[];
}

export async function listYears() {
  const rows = (await sql()`SELECT year FROM ledger_years ORDER BY year`) as { year: number }[];
  return rows.map((row) => row.year);
}

export async function getLedgerYear(year: number): Promise<LedgerYear | null> {
  const years = (await sql()`SELECT fund_opening::float8 AS "fundOpening" FROM ledger_years WHERE year = ${year}`) as {
    fundOpening: number;
  }[];
  if (!years[0]) return null;
  const [events, costs, students, tables, stock] = await Promise.all([
    selectRows<LedgerYear["events"][number]>("events", year),
    selectRows<LedgerYear["costs"][number]>("costs", year),
    selectRows<LedgerYear["students"][number]>("students", year),
    selectRows<LedgerYear["tables"][number]>("tables", year),
    selectRows<LedgerYear["stock"][number]>("stock", year),
  ]);
  return { year, fundOpening: years[0].fundOpening, events, costs, students, tables, stock };
}

export async function getLists(): Promise<LedgerLists> {
  const rows = (await sql()`SELECT key, items FROM ledger_lists`) as { key: string; items: string[] }[];
  const lists = defaultLists();
  for (const row of rows) {
    if ((LIST_KEYS as string[]).includes(row.key)) lists[row.key as ListKey] = row.items;
  }
  return lists;
}

export async function saveList(key: ListKey, items: string[]) {
  await sql()`
    INSERT INTO ledger_lists (key, items) VALUES (${key}, ${JSON.stringify(items)}::jsonb)
    ON CONFLICT (key) DO UPDATE SET items = EXCLUDED.items
  `;
}

export function parseValue(type: FieldType, raw: LedgerValue): LedgerValue {
  if (type === "bool") return raw === true || raw === "true" || raw === "DA";
  if (raw === null || raw === undefined) return null;
  const text = String(raw).trim();
  if (text === "") return null;
  if (type === "number") {
    // Accept Slovenian input: "1.234,50" or "1234,5" or "1234.5".
    const normalized = text.includes(",") ? text.replace(/\./g, "").replace(",", ".") : text;
    const value = Number(normalized.replace(/[€\s]/g, ""));
    if (!Number.isFinite(value)) throw new Error(`Neveljavna številka: ${text}`);
    return value;
  }
  if (type === "date") {
    const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text);
    const local = /^(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})$/.exec(text);
    const parts = iso ? [iso[1], iso[2], iso[3]] : local ? [local[3], local[2], local[1]] : null;
    if (!parts) throw new Error(`Neveljaven datum: ${text}`);
    const [y, m, d] = parts;
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  return text;
}

export async function updateLedgerField(
  name: LedgerTableName,
  id: number,
  field: string,
  raw: LedgerValue,
  userEmail: string,
) {
  const def = LEDGER_TABLES[name].fields[field];
  if (!def) throw new Error(`Neznano polje ${field}`);
  const value = parseValue(def.type, raw);
  await sql().query(
    `UPDATE ${LEDGER_TABLES[name].table} SET ${def.col} = $1, updated_by = $2, updated_at = now() WHERE id = $3`,
    [value, userEmail, id],
  );
  return value;
}

function nextCode(prefix: string, codes: (string | null)[]) {
  const max = codes.reduce((top, code) => {
    const match = code?.match(/(\d+)$/);
    return match ? Math.max(top, Number(match[1])) : top;
  }, 0);
  return `${prefix}-${String(max + 1).padStart(3, "0")}`;
}

export type LedgerCounts = Record<LedgerTableName, number>;

// Row counts per year for the sidebar, in one round trip.
export async function getLedgerCounts(): Promise<Record<number, LedgerCounts>> {
  const rows = (await sql()`
    SELECT y.year,
      (SELECT count(*) FROM ledger_events e WHERE e.year = y.year)::int AS events,
      (SELECT count(*) FROM ledger_costs c WHERE c.year = y.year)::int AS costs,
      (SELECT count(*) FROM ledger_students s WHERE s.year = y.year)::int AS students,
      (SELECT count(*) FROM ledger_table_rentals t WHERE t.year = y.year)::int AS tables,
      (SELECT count(*) FROM ledger_stock k WHERE k.year = y.year)::int AS stock
    FROM ledger_years y
  `) as ({ year: number } & LedgerCounts)[];
  return Object.fromEntries(rows.map(({ year, ...counts }) => [year, counts]));
}

// `fields` are UI keys with raw form input; they are parsed like inline edits. A code given for
// events/tables wins over the generated one.
export async function insertLedgerRow(
  name: LedgerTableName,
  year: number,
  userEmail: string,
  fields: Record<string, LedgerValue> = {},
) {
  const { table } = LEDGER_TABLES[name];
  const values: Record<string, LedgerValue> = { year, updated_by: userEmail };
  for (const [key, raw] of Object.entries(fields)) {
    const def = LEDGER_TABLES[name].fields[key];
    if (!def) throw new Error(`Neznano polje ${key}`);
    const value = parseValue(def.type, raw);
    if (value !== null) values[def.col] = value;
  }
  if (name === "events" || name === "tables") {
    const rows = (await sql().query(`SELECT code FROM ${table} WHERE year = $1`, [year])) as { code: string | null }[];
    values.code ??= nextCode(name === "events" ? "EVT" : "MIZE", rows.map((row) => row.code));
  }
  if (name === "stock") {
    const rows = (await sql()`SELECT COALESCE(MAX(position), 0) + 1 AS next FROM ledger_stock WHERE year = ${year}`) as {
      next: number;
    }[];
    values.position = rows[0].next;
  }
  const columns = Object.keys(values);
  const inserted = (await sql().query(
    `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${columns.map((_, i) => `$${i + 1}`).join(", ")}) RETURNING id`,
    Object.values(values),
  )) as { id: number }[];
  const rows = (await sql().query(`SELECT ${selectList(name)} FROM ${table} WHERE id = $1`, [inserted[0].id])) as Record<
    string,
    LedgerValue
  >[];
  return rows[0];
}

export async function deleteLedgerRow(name: LedgerTableName, id: number) {
  await sql().query(`DELETE FROM ${LEDGER_TABLES[name].table} WHERE id = $1`, [id]);
}

export async function setFundOpening(year: number, amount: number) {
  await sql()`UPDATE ledger_years SET fund_opening = ${amount} WHERE year = ${year}`;
}

// A new year starts from where the previous one ended: same stock items with the current stock as
// opening quantity, and the money currently in the fund (Pregled!E26) as the opening balance.
// Both stay editable.
export async function createYear(year: number) {
  const previous = await getLedgerYear(year - 1);
  const overview = previous ? computeOverview(previous) : null;
  const opening = overview ? Math.round(overview.fundNow * 100) / 100 : 0;
  const created = (await sql()`
    INSERT INTO ledger_years (year, fund_opening) VALUES (${year}, ${opening})
    ON CONFLICT (year) DO NOTHING RETURNING year
  `) as { year: number }[];
  if (!created[0] || !overview) return;
  for (const [index, item] of overview.stock.entries()) {
    await sql()`
      INSERT INTO ledger_stock (year, position, name, type, opening, added, minimum)
      VALUES (${year}, ${index + 1}, ${item.name}, ${item.type}, ${item.current}, 0, ${item.minimum})
    `;
  }
}
