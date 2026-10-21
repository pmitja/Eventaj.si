"use client";

import type { Dispatch, SetStateAction } from "react";
import { FormDialog, type FieldSpec } from "@/app/admin/_components/form-dialog";
import { Eyebrow } from "@/app/admin/_components/panel";
import { formatPlain } from "@/lib/ledger/compute";
import { PEOPLE, RULES } from "@/lib/ledger/contributions";
import type { SocialRow } from "@/lib/ledger/schema";
import { LedgerGrid, type GridColumn, type GridRow } from "./ledger-grid";

export type SocialGridRow = SocialRow & GridRow;

type Props = {
  rows: SocialGridRow[];
  setRows: Dispatch<SetStateAction<SocialGridRow[]>>;
  highlight: number | null;
  adding: boolean;
  setAdding: (open: boolean) => void;
  create: (fields: Record<string, string | null>, message: (row: SocialGridRow) => string) => Promise<string | null>;
  today: string;
};

const people = [...PEOPLE];

// Posts per person and month; the month's social points are split by these counts.
export function SocialPostsLog({ rows, setRows, highlight, adding, setAdding, create, today }: Props) {
  const columns: GridColumn<SocialGridRow>[] = [
    { key: "date", label: "Datum (mesec)", type: "date", width: 150 },
    { key: "person", label: "Oseba", type: "select", options: people, width: 130 },
    { key: "posts", label: "Objave", type: "number", width: 100 },
    { key: "note", label: "Opomba", type: "text", width: 380 },
  ];

  const fields: FieldSpec[] = [
    { key: "date", label: "Datum (šteje mesec)", kind: "date", required: true, initial: today },
    { key: "posts", label: "Število objav", kind: "number", required: true, placeholder: "Npr. 8" },
    { key: "person", label: "Oseba", kind: "seg", options: ["Julija", "Maja", "Mitja", "Jan"], wide: true },
    { key: "note", label: "Opomba", kind: "text", wide: true, placeholder: "Npr. Instagram + Facebook" },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <Eyebrow>Objave na socialnih omrežjih</Eyebrow>
        <span className="text-[13px] text-adm-muted">
          {RULES.socialPerMonth} točk na mesec se razdeli po objavah tistega meseca · mesec brez vnosa: Julija {RULES.socialJulija * 100} %, Maja{" "}
          {100 - RULES.socialJulija * 100} %
        </span>
      </div>
      <LedgerGrid table="social" rows={rows} setRows={setRows} columns={columns} addLabel="Vpiši objave" onAdd={() => setAdding(true)} highlight={highlight} />
      <FormDialog
        open={adding}
        onOpenChange={setAdding}
        eyebrow="Nov vnos · Socialna omrežja"
        title="Vpiši objave"
        fields={fields}
        onSubmit={(values) => create(values, (row) => `Vpisanih ${formatPlain(row.posts ?? 0)} objav za ${row.person ?? "osebo"}`)}
      />
    </div>
  );
}
