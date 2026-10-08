// Dropdown options from the "Pomožni podatki" sheet. Editable in /admin/poslovanje/nastavitve;
// these are the defaults until a list is saved to the database.

export const LIST_DEFS = {
  services: { label: "Storitev", items: ["Photo Booth", "360° Booth", "Bundle", "QR Galerija", "Mize", "Drugo"] },
  executions: { label: "Izvedba dogodka", items: ["Jan", "Mitja", "Jan + Mitja", "Študenti"] },
  initialHelp: { label: "Začetna pomoč", items: ["Brez", "Jan", "Mitja", "Jan + Mitja"] },
  costCategories: {
    label: "Kategorija stroška",
    items: [
      "Oprema",
      "Potrošni material",
      "Programska oprema",
      "Računovodstvo in prispevki",
      "Bančni stroški",
      "Plačilo študentov",
      "Marketing",
      "Domena / e-pošta",
      "Prevoz",
      "Drugo",
    ],
  },
  payers: { label: "Plačnik", items: ["Skupni fond", "Jan", "Maja", "Mitja", "Julija"] },
  students: {
    label: "Študenti",
    items: ["Samuel", "Luka", "Manuela", "Klara", "Klemen", "Damir", "Kaja", "Verena", "Vito"],
  },
  tableDrivers: {
    label: "Osebe za prevoz miz",
    items: ["Jan", "Mitja", "Samuel", "Luka", "Manuela", "Klara", "Klemen", "Damir", "Kaja", "Verena", "Vito"],
  },
  stockTypes: { label: "Tip artikla na zalogi", items: ["Album", "Kartuša"] },
} as const;

export type ListKey = keyof typeof LIST_DEFS;
export type LedgerLists = Record<ListKey, string[]>;

export const LIST_KEYS = Object.keys(LIST_DEFS) as ListKey[];

export function defaultLists(): LedgerLists {
  return Object.fromEntries(LIST_KEYS.map((key) => [key, [...LIST_DEFS[key].items]])) as LedgerLists;
}

// Used on "Najem miz" for rentals the customer collects themselves (not part of the person list).
export const NO_DELIVERY = "BREZ DOSTAVE";
