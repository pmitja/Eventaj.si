"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { changeInquiryCrew } from "../../actions";
import { updateRowStudents } from "../../poslovanje/actions";
import type { Entry } from "./calendar-entries";

type Props = { entry: Entry; execution: string | null; value: string[]; options: string[]; onChange: (students: string[]) => void };

// Ticks which students go, straight from the calendar. A confirmed inquiry saves on the inquiry
// (which syncs Dogodki); a Dogodki or Najem miz row saves its Študenti rows.
export function StudentsPicker({ entry, execution, value, options, onChange }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const listed = [...options, ...value.filter((student) => !options.includes(student))];

  async function save(next: string[]) {
    if (entry.kind === "planned") {
      const result = await changeInquiryCrew(entry.event.id, execution, next);
      return result.ok ? { ok: true as const, value: next } : result;
    }
    return updateRowStudents(entry.kind === "rental" ? "rental" : "event", entry.event.id, next);
  }

  function toggle(student: string) {
    const previous = value;
    const next = value.includes(student) ? value.filter((s) => s !== student) : [...value, student];
    onChange(next);
    startTransition(async () => {
      const result = await save(next);
      if (!result.ok) {
        onChange(previous);
        toast.error(result.error);
        return;
      }
      onChange(result.value);
      router.refresh();
    });
  }

  if (listed.length === 0) return <span className="text-adm-muted">Seznam študentov je prazen (Nastavitve)</span>;

  return (
    <div role="group" aria-label="Študenti" className={cn("flex flex-wrap gap-1.5", pending && "opacity-70")}>
      {listed.map((student) => {
        const on = value.includes(student);
        return (
          <button
            key={student}
            type="button"
            aria-pressed={on}
            onClick={() => toggle(student)}
            className={cn(
              "rounded-full border px-3 py-1 text-sm transition-colors",
              on ? "border-adm-ink bg-adm-ink text-adm-bg" : "border-dashed border-adm-soft text-adm-muted hover:border-adm-ink hover:text-adm-ink",
            )}
          >
            {student}
          </button>
        );
      })}
    </div>
  );
}
