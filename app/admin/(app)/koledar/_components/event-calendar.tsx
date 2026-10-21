"use client";

import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { MONTHS_FULL } from "@/app/admin/_components/charts";
import { LegendDot, Panel } from "@/app/admin/_components/panel";
import type { CalendarEvent } from "@/lib/db/inquiries";
import type { DoneEvent, TableRentalEvent } from "@/lib/db/ledger";
import { cn } from "@/lib/utils";
import { crewText, isDone, plannedFacts, rentalFacts, rentalWho, toEntries, whoShort, whoText, type Entry } from "./calendar-entries";
import { AddEventDialog, type CalendarLists } from "./add-event-dialog";
import { EventDialog } from "./event-dialog";
import { MonthList, MonthSummary } from "./month-list";

const WEEKDAYS = ["Po", "To", "Sr", "Če", "Pe", "So", "Ne"];

type Props = { planned: CalendarEvent[]; done: DoneEvent[]; rentals: TableRentalEvent[]; lists: CalendarLists; today: string };

const pad = (value: number) => String(value).padStart(2, "0");

function shift(month: string, by: number) {
  const date = new Date(Date.UTC(Number(month.slice(0, 4)), Number(month.slice(5)) - 1 + by, 1));
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}`;
}

function chipTitle(entry: Entry) {
  if (entry.kind === "rental") {
    const { location, contact, notes } = entry.event;
    return [
      `Najem miz: ${entry.title}`,
      [rentalFacts(entry.event).join(" · "), location].filter(Boolean).join(" · "),
      `Kdo gre: ${rentalWho(entry.event) ?? "ni določeno"}`,
      contact ? `Kontakt: ${contact}` : null,
      notes ? `Opomba: ${notes}` : null,
    ].filter(Boolean).join("\n");
  }
  if (entry.kind === "planned") {
    const { startTime, location, crew, crewStudents, note, contact } = entry.event;
    return [
      `Potrjeno: ${entry.title}`,
      [startTime, location].filter(Boolean).join(" · "),
      `Kdo gre: ${crewText(crew, crewStudents) ?? "ni določeno"}`,
      plannedFacts(entry.event).join(" · "),
      contact ? `Kontakt: ${contact}` : null,
      note ? `Opomba: ${note}` : null,
    ].filter(Boolean).join("\n");
  }
  const title = `${entry.kind === "booked" ? "Potrjeno: " : ""}${entry.title} · ${whoText(entry.event)}`;
  const { contact, notes } = entry.event;
  return [title, contact ? `Kontakt: ${contact}` : null, notes ? `Opomba: ${notes}` : null].filter(Boolean).join("\n");
}

export function EventCalendar({ planned, done, rentals, lists, today }: Props) {
  const entries = useMemo(() => toEntries(planned, done, rentals, today), [planned, done, rentals, today]);
  const [open, setOpen] = useState<Entry | null>(null);
  // The day clicked to add a new event on.
  const [adding, setAdding] = useState<string | null>(null);
  const pathname = usePathname();
  const param = useSearchParams().get("mesec");

  // The URL is the only source of the month, so a refresh or "back" from an inquiry returns to it.
  // Next.js syncs history.replaceState into useSearchParams without a server round trip.
  const month = param && /^\d{4}-(0[1-9]|1[0-2])$/.test(param) ? param : today.slice(0, 7);
  function setMonth(next: string) {
    window.history.replaceState(null, "", next === today.slice(0, 7) ? pathname : `${pathname}?mesec=${next}`);
  }

  const year = Number(month.slice(0, 4));
  const monthIndex = Number(month.slice(5)) - 1;
  const leading = (new Date(Date.UTC(year, monthIndex, 1)).getUTCDay() + 6) % 7; // Monday first
  const days = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
  const cells: (string | null)[] = [...Array(leading).fill(null), ...Array.from({ length: days }, (_, i) => `${month}-${pad(i + 1)}`)];
  while (cells.length % 7) cells.push(null);

  const inMonth = entries.filter((entry) => entry.date.startsWith(month));
  const byDay = new Map<string, Entry[]>();
  for (const entry of inMonth) byDay.set(entry.date, [...(byDay.get(entry.date) ?? []), entry]);

  return (
    <Panel
      title="Dogodki po mesecih"
      note={
        <span className="flex gap-4">
          <LegendDot color="#3E4A22" label="Potrjeno" />
          <LegendDot color="#1C1814" label="Opravljeno" />
        </span>
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <h2 className="m-0 font-display text-[32px] font-normal leading-none">
            {MONTHS_FULL[monthIndex]} <span className="text-adm-muted">{year}</span>
          </h2>
          <MonthSummary entries={inMonth} today={today} />
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMonth(today.slice(0, 7))}
            className="rounded-full border border-adm-soft px-3 py-1.5 text-sm transition-colors hover:border-adm-ink"
          >
            Danes
          </button>
          {[
            { by: -1, label: "Prejšnji mesec", Icon: ChevronLeft },
            { by: 1, label: "Naslednji mesec", Icon: ChevronRight },
          ].map(({ by, label, Icon }) => (
            <button
              key={by}
              type="button"
              onClick={() => setMonth(shift(month, by))}
              aria-label={label}
              className="grid size-9 place-items-center rounded-full border border-adm-soft transition-colors hover:border-adm-ink"
            >
              <Icon className="size-4" />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-7 overflow-hidden rounded-xl border border-adm-line text-sm">
        {WEEKDAYS.map((day) => (
          <div key={day} className="border-b border-adm-line bg-adm-side px-2 py-1.5 text-xs uppercase tracking-[.06em] text-adm-muted">
            {day}
          </div>
        ))}
        {cells.map((date, i) => (
          <div
            key={date ?? `empty-${i}`}
            onClick={date ? () => setAdding(date) : undefined}
            className={cn(
              "group flex min-h-[58px] min-w-0 flex-col gap-1 border-adm-line p-1 sm:min-h-[96px] sm:p-1.5",
              date && "cursor-pointer transition-colors hover:bg-adm-hover/60",
              i % 7 !== 6 && "border-r",
              i < cells.length - 7 && "border-b",
              !date && "bg-adm-hover/60",
            )}
          >
            {date && (
              <span className="flex items-center justify-between">
                <span
                  className={cn(
                    "grid size-6 place-items-center rounded-full text-xs tabular",
                    date === today && "bg-adm-accent font-semibold text-adm-bg",
                    date !== today && date < today && "text-adm-faint",
                  )}
                >
                  {Number(date.slice(8))}
                </span>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setAdding(date);
                  }}
                  aria-label={`Dodaj dogodek ${Number(date.slice(8))}. ${Number(date.slice(5, 7))}.`}
                  className="hidden size-6 place-items-center rounded-full text-adm-muted opacity-0 transition-opacity hover:bg-adm-ink hover:text-adm-bg focus-visible:opacity-100 group-hover:opacity-100 sm:grid"
                >
                  <Plus className="size-3.5" />
                </button>
              </span>
            )}
            {(date ? byDay.get(date) ?? [] : []).map((entry) => (
              <button
                key={entry.key}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setOpen(entry);
                }}
                title={chipTitle(entry)}
                aria-label={entry.title}
                className={cn(
                  "block w-full rounded-md text-left transition-opacity hover:opacity-75 sm:px-1.5 sm:py-0.5",
                  isDone(entry, today) ? "bg-adm-ink !text-adm-bg" : "bg-adm-ok !text-adm-ok-fg",
                )}
              >
                {/* Phones only get a marker; the list below the grid carries the details. */}
                <span className="block h-1.5 sm:hidden" aria-hidden />
                <span className="hidden truncate text-xs leading-tight sm:block">
                  {entry.kind === "planned" && entry.event.startTime ? `${entry.event.startTime} ` : ""}
                  {entry.kind === "rental" ? "Mize · " : ""}
                  {entry.title}
                </span>
                {whoShort(entry) && <span className="hidden truncate text-[11px] leading-tight opacity-75 sm:block">{whoShort(entry)}</span>}
              </button>
            ))}
          </div>
        ))}
      </div>

      <MonthList entries={inMonth} today={today} onOpen={setOpen} />
      {open && <EventDialog key={open.key} entry={open} today={today} students={lists.students} onClose={() => setOpen(null)} />}
      <AddEventDialog date={adding} lists={lists} onClose={() => setAdding(null)} />
    </Panel>
  );
}
