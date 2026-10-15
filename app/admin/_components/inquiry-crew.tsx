"use client";

import { Check } from "lucide-react";
import { useOptimistic, useRef, useTransition } from "react";
import { toast } from "sonner";
import { changeInquiryCrew } from "../(app)/actions";
import { cn } from "@/lib/utils";

export type CrewLists = { executions: string[]; students: string[] };

type Crew = { execution: string | null; students: string[] };

const chip = "rounded-full border px-3 py-1 transition-colors";
const idle = "border-dashed border-adm-soft text-adm-muted hover:border-adm-ink hover:text-adm-ink";
const active = "border-adm-ink bg-adm-ink text-adm-bg";

// Who works a confirmed event, picked from the same lists as Izvedba dogodka and Študenti in
// Poslovanje. Every click saves and updates the event's row in Dogodki.
export function InquiryCrewControl({ id, crew, students, lists }: { id: number; crew: string | null; students: string[]; lists: CrewLists }) {
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

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="text-adm-muted">Kdo gre:</span>
        <div role="radiogroup" aria-label="Izvedba dogodka" className="flex flex-wrap gap-1.5">
          {lists.executions.map((option) => (
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
    </div>
  );
}
