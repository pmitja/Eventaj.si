"use client";

import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { formatPlain } from "@/lib/ledger/compute";
import { crewText, isDone, rentalWho, typeLabels, whoText, type Entry } from "./calendar-entries";
import { StudentsPicker } from "./students-picker";

function dateLabel(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("sl-SI", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

// students: the current pick, which may be newer than the entry the calendar handed in.
function rows(entry: Entry, students: string[]): [string, ReactNode][] {
  if (entry.kind === "rental") {
    const event = entry.event;
    return [
      ["Šifra", event.code],
      ["Storitev", "Najem miz"],
      ["Št. miz", event.tableCount !== null ? formatPlain(event.tableCount) : null],
      ["Lokacija", event.location],
      ["Kdo gre", rentalWho({ ...event, students }) ?? "ni določeno"],
      ["Kontakt", event.contact],
      ["Opomba", event.notes],
    ];
  }
  if (entry.kind === "planned") {
    const event = entry.event;
    const booth = event.type === "basic" || event.type === "both";
    return [
      ["Začetek", event.startTime],
      ["Lokacija", event.location || "ni znana"],
      ["Storitev", typeLabels[event.type] ?? event.type],
      ["Trajanje", event.type !== "equipment" && event.hours ? `${event.hours} h` : null],
      ["Album", !booth ? null : event.album === "Ne" ? "brez albuma" : event.album ?? "še ni znano"],
      ["Obrazec", booth ? (event.detailsSubmitted ? "oddan" : "čaka na obrazec") : null],
      ["Kdo gre", crewText(event.crew, students) ?? "ni določeno"],
      ["Kontakt", event.contact],
      ["Opomba", event.note],
    ];
  }
  const event = entry.event;
  return [
    ["Šifra", event.code],
    ["Storitev", event.service],
    ["Trajanje", event.hours !== null ? `${formatPlain(event.hours)} h` : null],
    ["Kilometri", entry.kind === "done" && event.km !== null ? `${formatPlain(event.km)} km` : null],
    ["Album", entry.kind === "done" ? (event.albumUsed ? `da${event.album ? ` (${event.album})` : ""}` : "ne") : event.album],
    ["Izvedba", whoText({ ...event, students })],
    ["Kontakt", event.contact],
    ["Opomba", event.notes],
  ];
}

type Props = { entry: Entry; today: string; students: string[]; onClose: () => void };

export function EventDialog({ entry, today, students: studentOptions, onClose }: Props) {
  const [students, setStudents] = useState(entry.kind === "planned" ? entry.event.crewStudents : entry.event.students);
  const linkLabel = entry.kind === "planned" ? "Odpri povpraševanje" : entry.kind === "rental" ? "Odpri v Najemu miz" : "Odpri v Dogodkih";
  const done = isDone(entry, today);

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="admin-root block max-h-[92dvh] w-[calc(100vw-24px)] max-w-lg overflow-y-auto overscroll-contain rounded-[20px] border border-adm-ink bg-adm-bg p-5 shadow-[0_24px_60px_rgba(28,24,20,.25)] sm:rounded-[20px] sm:p-7 [&>button:last-child]:hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <DialogDescription className="flex items-center gap-2 text-xs uppercase tracking-[.08em] text-adm-muted">
              <span className={done ? "size-2 rounded-full bg-adm-ink" : "size-2 rounded-full bg-adm-ok-fg"} aria-hidden />
              {done ? "Opravljeno" : "Potrjeno"} · {dateLabel(entry.date)}
            </DialogDescription>
            <DialogTitle className="mt-1.5 break-words font-display text-[30px] font-normal leading-[1.05] tracking-normal">
              {entry.title}
            </DialogTitle>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-adm-soft transition-[border-color,transform] hover:rotate-90 hover:border-adm-ink"
            aria-label="Zapri"
          >
            <X className="size-4" />
          </button>
        </div>

        <dl className="m-0 mt-5 grid grid-cols-[96px_minmax(0,1fr)] gap-x-4 gap-y-2.5 text-sm">
          {rows(entry, students)
            .filter(([, value]) => value)
            .map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="text-adm-muted">{label}</dt>
                <dd className="m-0 whitespace-pre-line break-words [text-wrap:pretty]">{value}</dd>
              </div>
            ))}
        </dl>

        <div className="mt-5 flex flex-col gap-2 border-t border-adm-line pt-4 text-sm">
          <span className="text-[11px] font-semibold uppercase tracking-[.06em] text-adm-sub">Študenti</span>
          <StudentsPicker entry={entry} value={students} options={studentOptions} onChange={setStudents} />
        </div>

        <Link
          href={entry.href}
          className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-adm-soft px-4 py-2 text-sm transition-colors hover:border-adm-ink"
        >
          {linkLabel}
          <ArrowUpRight className="size-4" />
        </Link>
      </DialogContent>
    </Dialog>
  );
}
