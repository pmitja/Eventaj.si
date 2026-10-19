import Link from "next/link";
import { plural } from "@/app/admin/_components/charts";
import { formatPlain } from "@/lib/ledger/compute";
import { cn } from "@/lib/utils";
import { bookedFacts, crewText, doneFacts, plannedFacts, whoText, type Entry } from "./calendar-entries";

function dayLabel(date: string) {
  return `${Number(date.slice(8))}. ${Number(date.slice(5, 7))}.`;
}

export function MonthSummary({ entries }: { entries: Entry[] }) {
  const done = entries.flatMap((entry) => (entry.kind === "done" ? [entry.event] : []));
  const planned = entries.length - done.length;
  if (entries.length === 0) return null;

  const facts = [
    done.length ? plural(done.length, "opravljen dogodek", "opravljena dogodka", "opravljeni dogodki", "opravljenih dogodkov") : null,
    planned ? plural(planned, "potrjen dogodek", "potrjena dogodka", "potrjeni dogodki", "potrjenih dogodkov") : null,
    done.length ? `${formatPlain(done.reduce((sum, e) => sum + (e.hours ?? 0), 0))} h` : null,
    done.length ? `${formatPlain(done.reduce((sum, e) => sum + (e.km ?? 0), 0))} km` : null,
    done.length ? plural(done.filter((e) => e.albumUsed).length, "album", "albuma", "albumi", "albumov") : null,
  ].filter(Boolean);

  return <p className="m-0 text-sm text-adm-muted">{facts.join(" · ")}</p>;
}

function ContactLine({ contact }: { contact: string | null }) {
  if (!contact) return null;
  return <span className="break-all text-adm-muted">Kontakt: {contact}</span>;
}

function NoteLine({ note }: { note: string | null }) {
  if (!note) return null;
  return <span className="whitespace-pre-line text-adm-muted [text-wrap:pretty]">Opomba: {note}</span>;
}

export function MonthList({ entries }: { entries: Entry[] }) {
  if (entries.length === 0) return <p className="m-0 text-sm text-adm-muted">Ta mesec ni dogodkov.</p>;

  return (
    <ul className="m-0 flex list-none flex-col divide-y divide-adm-rule p-0 text-sm">
      {entries.map((entry) => (
        <li key={entry.key}>
          <Link href={entry.href} className="grid gap-x-4 gap-y-1 py-3 hover:!text-adm-ink sm:grid-cols-[112px_minmax(0,1fr)_auto]">
            <span className="flex items-center gap-2 tabular font-semibold">
              <span
                className={cn("size-2.5 shrink-0 rounded-full", entry.kind === "done" ? "bg-adm-ink" : "bg-adm-ok-fg")}
                aria-hidden
              />
              {dayLabel(entry.date)}
              {entry.kind === "planned" && entry.event.startTime ? ` · ${entry.event.startTime}` : ""}
            </span>

            {entry.kind !== "planned" ? (
              <>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span>
                    <span className="font-semibold">{entry.title}</span>
                    <span className="text-adm-muted"> · {whoText(entry.event)}</span>
                  </span>
                  <ContactLine contact={entry.event.contact} />
                  <NoteLine note={entry.event.notes} />
                </span>
                <span className="text-adm-muted sm:max-w-[300px] sm:text-right">
                  {entry.kind === "booked" ? ["Potrjeno", ...bookedFacts(entry.event)].join(" · ") : doneFacts(entry.event).join(" · ")}
                </span>
              </>
            ) : (
              <>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span>
                    <span className="font-semibold">{entry.title}</span>
                    <span className="text-adm-muted"> · {entry.event.location || "lokacija ni znana"}</span>
                  </span>
                  <span className={entry.event.crew || entry.event.crewStudents.length ? "text-adm-muted" : "text-adm-faint"}>
                    Kdo gre: {crewText(entry.event.crew, entry.event.crewStudents) ?? "ni določeno"}
                  </span>
                  <ContactLine contact={entry.event.contact} />
                  <NoteLine note={entry.event.note} />
                </span>
                <span className="text-adm-muted sm:max-w-[300px] sm:text-right">Potrjeno · {plannedFacts(entry.event).join(" · ")}</span>
              </>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
