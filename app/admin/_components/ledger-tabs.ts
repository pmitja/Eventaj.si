import type { LedgerTableName } from "@/lib/ledger/schema";

export const LEDGER_TABS: { slug: string; label: string; count?: LedgerTableName }[] = [
  { slug: "", label: "Pregled" },
  { slug: "dogodki", label: "Dogodki", count: "events" },
  { slug: "stroski", label: "Stroški", count: "costs" },
  { slug: "studenti", label: "Študenti", count: "students" },
  { slug: "zaloga", label: "Zaloga", count: "stock" },
  { slug: "najem-miz", label: "Najem miz", count: "tables" },
];
