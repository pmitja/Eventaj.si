// Usage: node --env-file=.env scripts/db-migrate.mjs
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.NEON_DB_URL);

await sql`
  CREATE TABLE IF NOT EXISTS inquiries (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    form_data JSONB NOT NULL,
    total_price NUMERIC(10, 2)
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS offers (
    id SERIAL PRIMARY KEY,
    inquiry_id INTEGER NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
    number TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    options JSONB NOT NULL,
    content JSONB NOT NULL,
    items JSONB NOT NULL,
    total NUMERIC(10, 2) NOT NULL
  )
`;

await sql`CREATE INDEX IF NOT EXISTS offers_inquiry_id_idx ON offers (inquiry_id)`;
await sql`ALTER TABLE offers ADD COLUMN IF NOT EXISTS sent_at TIMESTAMPTZ`;

await sql`
  CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

// Poslovanje (nekdanja Excel razpredelnica), ločeno po letih.
await sql`
  CREATE TABLE IF NOT EXISTS ledger_years (
    year INTEGER PRIMARY KEY,
    fund_opening NUMERIC(10, 2) NOT NULL DEFAULT 0
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS ledger_lists (
    key TEXT PRIMARY KEY,
    items JSONB NOT NULL
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS ledger_events (
    id SERIAL PRIMARY KEY,
    year INTEGER NOT NULL REFERENCES ledger_years(year) ON DELETE CASCADE,
    code TEXT,
    date DATE,
    client TEXT,
    km NUMERIC(10, 2),
    hours NUMERIC(6, 2),
    transfer NUMERIC(10, 2),
    cash NUMERIC(10, 2),
    service TEXT,
    album_used BOOLEAN NOT NULL DEFAULT false,
    album TEXT,
    cartridge_changed BOOLEAN NOT NULL DEFAULT false,
    cartridge_note TEXT,
    notes TEXT,
    execution TEXT,
    initial_help TEXT,
    execution_notes TEXT,
    updated_by TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS ledger_costs (
    id SERIAL PRIMARY KEY,
    year INTEGER NOT NULL REFERENCES ledger_years(year) ON DELETE CASCADE,
    date DATE,
    category TEXT,
    description TEXT,
    amount NUMERIC(10, 2),
    payer TEXT,
    refunded NUMERIC(10, 2),
    updated_by TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS ledger_students (
    id SERIAL PRIMARY KEY,
    year INTEGER NOT NULL REFERENCES ledger_years(year) ON DELETE CASCADE,
    event_id INTEGER REFERENCES ledger_events(id) ON DELETE SET NULL,
    student TEXT,
    amount NUMERIC(10, 2),
    payer TEXT,
    paid BOOLEAN NOT NULL DEFAULT false,
    note TEXT,
    updated_by TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS ledger_table_rentals (
    id SERIAL PRIMARY KEY,
    year INTEGER NOT NULL REFERENCES ledger_years(year) ON DELETE CASCADE,
    code TEXT,
    date DATE,
    client TEXT,
    location TEXT,
    table_count NUMERIC(6, 2),
    transfer NUMERIC(10, 2),
    cash NUMERIC(10, 2),
    delivered_by TEXT,
    km_delivery NUMERIC(10, 2),
    picked_by TEXT,
    km_pickup NUMERIC(10, 2),
    notes TEXT,
    updated_by TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS ledger_stock (
    id SERIAL PRIMARY KEY,
    year INTEGER NOT NULL REFERENCES ledger_years(year) ON DELETE CASCADE,
    position INTEGER NOT NULL DEFAULT 0,
    name TEXT,
    type TEXT,
    opening NUMERIC(10, 2),
    added NUMERIC(10, 2),
    minimum NUMERIC(10, 2),
    updated_by TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

for (const table of ["ledger_events", "ledger_costs", "ledger_students", "ledger_table_rentals", "ledger_stock"]) {
  await sql.query(`CREATE INDEX IF NOT EXISTS ${table}_year_idx ON ${table} (year)`);
}

console.log("Migracija končana.");
