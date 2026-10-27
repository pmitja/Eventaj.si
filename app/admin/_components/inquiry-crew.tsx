"use client";

import { Check } from "lucide-react";
import { useOptimistic, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { changeInquiryCrew, changeInquiryStudentsNeeded } from "../(app)/actions";
import { NO_DELIVERY, STUDENTS_NEEDED } from "@/lib/ledger/lists";
import { cn } from "@/lib/utils";

export type CrewLists = { executions: string[]; students: string[]; tableDrivers: string[] };

type Crew = { execution: string | null; students: string[] };

const chip = "rounded-full border px-3 py-1 transition-colors";
const idle = "border-dashed border-adm-soft text-adm-muted hover:border-adm-ink hover:text-adm-ink";
const active = "border-adm-ink bg-adm-ink text-adm-bg";

type ControlProps = { id: number; crew: string | null; students: string[]; needed: number | null; lists: CrewLists; tables?: boolean };

// Who works a confirmed event, picked from the same lists as Izvedba dogodka and Študenti in
// Poslovanje. Every click saves and updates the event's row in Dogodki. For a table rental it is
// who drives the tables, as in Dostavil / peljal on Najem miz.
export function InquiryCrewControl({ id, crew, students, needed, lists, tables }: ControlProps) {
  const [, startTransition] = useTransition();
  const [current, setCurrent] = useOptimistic<Crew>({ execution: crew, students });
  // Quick clicks each send the whole crew; running them in order keeps the last one in place.
  const queue = useRef<Promise<unknown>>(Promise.resolve());

  function save(next: Crew) {
    startTransition(async () => {
      setCurrent(next);
      const run = queue.current.then(() => changeInquiryCrew(id, next.execution, next.students));
      queue.current = run.catch(() => undefined);
      const result = await run;
      if (!result.ok) toast.error(result.error);
    });
  }

  const toggleStudent = (student: string) =>
    save({
      ...current,
      students: current.students.includes(student) ? current.students.filter((s) => s !== student) : [...current.students, student],
    });

  // Keep names that were removed from the list since, so they can still be unticked.
  const studentOptions = [...lists.students, ...current.students.filter((s) => !lists.students.includes(s))];

  const crewOptions = tables ? [...lists.tableDrivers, NO_DELIVERY] : lists.executions;

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="text-adm-muted">{tables ? "Kdo pelje:" : "Kdo gre:"}</span>
        <div role="radiogroup" aria-label={tables ? "Dostavil / peljal" : "Izvedba dogodka"} className="flex flex-wrap gap-1.5">
          {crewOptions.map((option) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={current.execution === option}
              onClick={() => save({ ...current, execution: current.execution === option ? null : option })}
              className={cn(chip, current.execution === option ? active : idle)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {!tables && (
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-adm-muted">Študenti:</span>
          <div role="group" aria-label="Študenti" className="flex flex-wrap gap-1.5">
            {studentOptions.map((student) => {
              const on = current.students.includes(student);
              return (
                <button
                  key={student}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleStudent(student)}
                  className={cn(chip, "flex items-center gap-1", on ? active : idle)}
                >
                  {on && <Check className="size-3.5" />}
                  {student}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {!tables && (current.execution === "Študenti" || (!current.execution && current.students.length > 0)) && <NeededControl id={id} needed={needed} going={current.students.length} />}
    </div>
  );
}

const NEEDED_OPTIONS = [1, 2, 3, 4];

// How many students the event needs. While fewer are on it, it shows up on the students' page to sign up.
function NeededControl({ id, needed, going }: { id: number; needed: number | null; going: number }) {
  const [value, setValue] = useState(needed ?? STUDENTS_NEEDED);
  const [, startTransition] = useTransition();
  const free = value - going;

  const pick = (next: number) => {
    const previous = value;
    setValue(next);
    startTransition(async () => {
      const result = await changeInquiryStudentsNeeded(id, next);
      if (!result.ok) {
        setValue(previous);
        toast.error(result.error);
      }
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="text-adm-muted">Potrebujemo:</span>
      <div role="radiogroup" aria-label="Število potrebnih študentov" className="flex flex-wrap gap-1.5">
        {NEEDED_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={value === option}
            onClick={() => pick(option)}
            className={cn(chip, "min-w-9", value === option ? active : idle)}
          >
            {option}
          </button>
        ))}
      </div>
      <span className="text-xs text-adm-muted">
        {free > 0 ? `odprto za prijave študentov · še ${free} ${free === 1 ? "mesto" : free === 2 ? "mesti" : free < 5 ? "mesta" : "mest"}` : "vsa mesta so zasedena"}
      </span>
    </div>
  );
}
