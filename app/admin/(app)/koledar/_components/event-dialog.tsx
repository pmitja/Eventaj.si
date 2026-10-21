"use client";

import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { formatPlain } from "@/lib/ledger/compute";
import { crewText, isDone, rentalWho, typeLabels, whoText, type Entry } from "./calendar-entries";


function dateLabel(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("sl-SI", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function rows(entry: Entry): [string, ReactNode][] {
  if (entry.kind === "rental") {
    const event = entry.event;
    return [
      ["Šifra", event.code],
      ["Storitev", "Najem miz"],
      ["Št. miz", event.tableCount !== null ? formatPlain(event.tableCount) : null],
      ["Lokacija", event.location],
      ["Kdo gre", rentalWho(event) ?? "ni določeno"],
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
      ["Kdo gre", crewText(event.crew, event.crewStudents) ?? "ni določeno"],
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
    ["Izvedba", whoText(event)],
    ["Kontakt", event.contact],
    ["Opomba", event.notes],
  ];
}

export function EventDialog({ entry, today, onClose }: { entry: Entry; today: string; onClose: () => void }) {
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
          {rows(entry)
            .filter(([, value]) => value)
            .map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="text-adm-muted">{label}</dt>
                <dd className="m-0 whitespace-pre-line break-words [text-wrap:pretty]">{value}</dd>
              </div>
            ))}
        </dl>

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
