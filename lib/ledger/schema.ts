// Shape of the business ledger that replaced the "Eventaj pregled" spreadsheet.
// Each table maps to one sheet; field keys are what the admin UI edits, `col` is the DB column.

export type FieldType = "text" | "number" | "date" | "bool";

type FieldDef = { col: string; type: FieldType };

export type EventRow = {
  id: number;
  code: string | null; // A  ID
  date: string | null; // B  Datum (YYYY-MM-DD)
  client: string | null; // C  Naročnik
  km: number | null; // D  Km
  hours: number | null; // E  Ure
  transfer: number | null; // F  Nakazilo €
  cash: number | null; // G  Gotovina €
  service: string | null; // J  Storitev
  albumUsed: boolean; // K  Album uporabljen?
  album: string | null; // L  Kateri album?
  cartridgeChanged: boolean; // M  Menjana kartuša?
  cartridgeNote: string | null; // N  Opomba kartuša/papir
  notes: string | null; // O  Opombe
  execution: string | null; // P  Izvedba dogodka
  initialHelp: string | null; // Q  Začetna pomoč
  executionNotes: string | null; // R  Opombe izvedbe
};

export type CostRow = {
  id: number;
  date: string | null; // A  Datum
  category: string | null; // B  Kategorija
  description: string | null; // C  Opis
  amount: number | null; // D  Znesek €
  payer: string | null; // E  Plačal
  refunded: number | null; // H  Povrnjeno €
};

export type StudentRow = {
  id: number;
  eventId: number | null; // A  ID (link to Dogodki)
  student: string | null; // D  Študent
  amount: number | null; // F  Znesek €
  payer: string | null; // G  Plačal
  paid: boolean; // I  Plačano?
  note: string | null; // L  Opomba
};

export type TableRentalRow = {
  id: number;
  code: string | null; // A  ID
  date: string | null; // B  Datum
  client: string | null; // C  Naročnik
  location: string | null; // D  Lokacija
  tableCount: number | null; // E  Št. miz
  transfer: number | null; // F  Nakazilo €
  cash: number | null; // G  Gotovina €
  deliveredBy: string | null; // J  Dostavil / peljal
  kmDelivery: number | null; // K  Km dostava
  pickedBy: string | null; // L  Prevzel / šel po
  kmPickup: number | null; // M  Km prevzem
  notes: string | null; // O  Opombe
};

export type StockRow = {
  id: number;
  name: string | null; // A  Artikel
  type: string | null; // B  Tip
  opening: number | null; // C  Začetna zaloga
  added: number | null; // E  Dodano / nabavljeno
  minimum: number | null; // G  Minimalna zaloga
};

export type LedgerTableName = "events" | "costs" | "students" | "tables" | "stock";

export const LEDGER_TABLES: Record<LedgerTableName, { table: string; order: string; fields: Record<string, FieldDef> }> = {
  events: {
    table: "ledger_events",
    order: "date NULLS LAST, code, id",
    fields: {
      code: { col: "code", type: "text" },
      date: { col: "date", type: "date" },
      client: { col: "client", type: "text" },
      km: { col: "km", type: "number" },
      hours: { col: "hours", type: "number" },
      transfer: { col: "transfer", type: "number" },
      cash: { col: "cash", type: "number" },
      service: { col: "service", type: "text" },
      albumUsed: { col: "album_used", type: "bool" },
      album: { col: "album", type: "text" },
      cartridgeChanged: { col: "cartridge_changed", type: "bool" },
      cartridgeNote: { col: "cartridge_note", type: "text" },
      notes: { col: "notes", type: "text" },
      execution: { col: "execution", type: "text" },
      initialHelp: { col: "initial_help", type: "text" },
      executionNotes: { col: "execution_notes", type: "text" },
    },
  },
  costs: {
    table: "ledger_costs",
    order: "id",
    fields: {
      date: { col: "date", type: "date" },
      category: { col: "category", type: "text" },
      description: { col: "description", type: "text" },
      amount: { col: "amount", type: "number" },
      payer: { col: "payer", type: "text" },
      refunded: { col: "refunded", type: "number" },
    },
  },
  students: {
    table: "ledger_students",
    order: "id",
    fields: {
      eventId: { col: "event_id", type: "number" },
      student: { col: "student", type: "text" },
      amount: { col: "amount", type: "number" },
      payer: { col: "payer", type: "text" },
      paid: { col: "paid", type: "bool" },
      note: { col: "note", type: "text" },
    },
  },
  tables: {
    table: "ledger_table_rentals",
    order: "date NULLS LAST, code, id",
    fields: {
      code: { col: "code", type: "text" },
      date: { col: "date", type: "date" },
      client: { col: "client", type: "text" },
      location: { col: "location", type: "text" },
      tableCount: { col: "table_count", type: "number" },
      transfer: { col: "transfer", type: "number" },
      cash: { col: "cash", type: "number" },
      deliveredBy: { col: "delivered_by", type: "text" },
      kmDelivery: { col: "km_delivery", type: "number" },
      pickedBy: { col: "picked_by", type: "text" },
      kmPickup: { col: "km_pickup", type: "number" },
      notes: { col: "notes", type: "text" },
    },
  },
  stock: {
    table: "ledger_stock",
    order: "position, id",
    fields: {
      name: { col: "name", type: "text" },
      type: { col: "type", type: "text" },
      opening: { col: "opening", type: "number" },
      added: { col: "added", type: "number" },
      minimum: { col: "minimum", type: "number" },
    },
  },
};

export type LedgerYear = {
  year: number;
  fundOpening: number; // Pregled!E22  Začetno stanje fonda
  events: EventRow[];
  costs: CostRow[];
  students: StudentRow[];
  tables: TableRentalRow[];
  stock: StockRow[];
};
