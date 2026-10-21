import { ArrowUpRight, Phone } from "lucide-react";
import type { ReactNode } from "react";
import type { StudentShift } from "@/lib/db/student-schedule";
import { formatEur, formatPlain } from "@/lib/ledger/compute";
import { cn } from "@/lib/utils";
import { mapsUrl, telUrl, timeText } from "./shift-format";

export function payText(shift: StudentShift) {
  if (shift.amount === null) return null;
  return `${formatEur(shift.amount)} · ${shift.paid ? "izplačano" : "čaka na izplačilo"}`;
}

// Everything a student needs on the day, in the order they need it.
export function ShiftFacts({ shift, dark }: { shift: StudentShift; dark?: boolean }) {
  const linkClass = cn(
    "inline-flex items-center gap-1 underline decoration-1 underline-offset-[3px] transition-opacity hover:opacity-70",
    dark ? "!text-adm-bg decoration-adm-soft" : "!text-adm-ink decoration-adm-soft",
  );
  const rows: [string, ReactNode][] = [
    ["Ura", timeText(shift)],
    [
      "Lokacija",
      shift.location && (
        <a href={mapsUrl(shift.location)} target="_blank" rel="noreferrer" className={linkClass}>
          {shift.location}
          <ArrowUpRight className="size-3.5 shrink-0" />
        </a>
      ),
    ],
    [
      "Kontakt",
      (shift.contactName || shift.contactPhone) && (
        <span className="flex flex-wrap items-center gap-x-2">
          {shift.contactName}
          {shift.contactPhone && (
            <a href={telUrl(shift.contactPhone)} className={linkClass}>
              <Phone className="size-3.5 shrink-0" />
              {shift.contactPhone}
            </a>
          )}
        </span>
      ),
    ],
    ["Storitev", [shift.service, shift.eventType].filter(Boolean).join(" · ")],
    ["Naloga", shift.task],
    ["Št. miz", shift.tables !== null ? formatPlain(shift.tables) : null],
    ["Album", shift.album],
    ["Ozadje", shift.background],
    ["Greš z", shift.crew.join(", ")],
    ["Zaslužek", payText(shift)],
  ];

  return (
    <div className="flex flex-col gap-4">
      <dl className="m-0 grid grid-cols-[84px_minmax(0,1fr)] gap-x-4 gap-y-2.5 text-sm">
        {rows
          .filter(([, value]) => value)
          .map(([label, value]) => (
            <div key={label} className="contents">
              <dt className={dark ? "text-adm-soft" : "text-adm-muted"}>{label}</dt>
              <dd className="m-0 break-words [text-wrap:pretty]">{value}</dd>
            </div>
          ))}
      </dl>
      {shift.notes && (
        <div className={cn("flex flex-col gap-1 rounded-xl px-4 py-3 text-sm", dark ? "bg-adm-bg/10" : "bg-adm-warn text-adm-warn-fg")}>
          <span className={cn("text-[11px] font-semibold uppercase tracking-[.06em]", dark ? "text-adm-soft" : "")}>Posebnosti</span>
          <p className="m-0 whitespace-pre-line break-words [text-wrap:pretty]">{shift.notes}</p>
        </div>
      )}
    </div>
  );
}
