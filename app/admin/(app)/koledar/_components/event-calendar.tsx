"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { MONTHS_FULL } from "@/app/admin/_components/charts";
import { LegendDot, Panel } from "@/app/admin/_components/panel";
import type { CalendarEvent } from "@/lib/db/inquiries";
import type { DoneEvent } from "@/lib/db/ledger";
import { cn } from "@/lib/utils";
import { plannedFacts, toEntries, whoText, type Entry } from "./calendar-entries";
import { MonthList, MonthSummary } from "./month-list";

const WEEKDAYS = ["Po", "To", "Sr", "Če", "Pe", "So", "Ne"];

type Props = { planned: CalendarEvent[]; done: DoneEvent[]; today: string };

const pad = (value: number) => String(value).padStart(2, "0");

function shift(month: string, by: number) {
  const date = new Date(Date.UTC(Number(month.slice(0, 4)), Number(month.slice(5)) - 1 + by, 1));
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}`;
}

function chipTitle(entry: Entry) {
  if (entry.kind === "planned") {
    const { startTime, location, crew } = entry.event;
    return [
      `Potrjeno: ${entry.title}`,
      [startTime, location].filter(Boolean).join(" · "),
      `Kdo gre: ${crew || "ni določeno"}`,
      plannedFacts(entry.event).join(" · "),
    ].filter(Boolean).join("\n");
  }
  return `${entry.title} · ${whoText(entry.event)}`;
}

export function EventCalendar({ planned, done, today }: Props) {
  const entries = useMemo(() => toEntries(planned, done), [planned, done]);
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
          <MonthSummary entries={inMonth} />
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
            className={cn(
              "flex min-h-[58px] min-w-0 flex-col gap-1 border-adm-line p-1 sm:min-h-[96px] sm:p-1.5",
              i % 7 !== 6 && "border-r",
              i < cells.length - 7 && "border-b",
              !date && "bg-adm-hover/60",
            )}
          >
            {date && (
              <span
                className={cn(
                  "grid size-6 place-items-center rounded-full text-xs tabular",
                  date === today && "bg-adm-accent font-semibold text-adm-bg",
                  date !== today && date < today && "text-adm-faint",
                )}
              >
                {Number(date.slice(8))}
              </span>
            )}
            {(date ? byDay.get(date) ?? [] : []).map((entry) => (
              <Link
                key={entry.key}
                href={entry.href}
                title={chipTitle(entry)}
                aria-label={entry.title}
                className={cn(
                  "block rounded-md transition-opacity hover:opacity-75 sm:px-1.5 sm:py-0.5",
                  entry.kind === "done" ? "bg-adm-ink !text-adm-bg" : "bg-adm-ok !text-adm-ok-fg",
                )}
              >
                {/* Phones only get a marker; the list below the grid carries the details. */}
                <span className="block h-1.5 sm:hidden" aria-hidden />
                <span className="hidden truncate text-xs leading-tight sm:block">
                  {entry.kind === "planned" && entry.event.startTime ? `${entry.event.startTime} ` : ""}
                  {entry.title}
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>

      <MonthList entries={inMonth} />
    </Panel>
  );
}
