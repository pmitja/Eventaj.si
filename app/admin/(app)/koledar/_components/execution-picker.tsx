"use client";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { joinPeople, NO_DELIVERY, splitPeople } from "@/lib/ledger/lists";
import { cn } from "@/lib/utils";
import { changeInquiryCrew } from "../../actions";
import { updateField } from "../../poslovanje/actions";
import type { Entry } from "./calendar-entries";

const STUDENTS = "Študenti";

type Props = {
  entry: Entry;
  value: string | null;
  students: string[];
  executions: string[];
  tableDrivers: string[];
  onChange: (execution: string | null) => void;
};

// Who runs the event (Izvedba dogodka) or drives a table rental (Dostavil / peljal). More than one
// person can go: Jan and Mitja are saved as "Jan + Mitja", like the list item Prispevki already know.
// "Študenti" and "BREZ DOSTAVE" stand alone. A confirmed inquiry saves on the inquiry (which syncs
// Dogodki); other entries save their row.
export function ExecutionPicker({ entry, value, students, executions, tableDrivers, onChange }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const rental = entry.kind === "rental";
  const solo = rental ? NO_DELIVERY : STUDENTS;
  const picked = splitPeople(value);
  // Single names only: "Jan + Mitja" in the list becomes the chips Jan and Mitja.
  const base = [...new Set((rental ? [...tableDrivers, NO_DELIVERY] : executions).flatMap(splitPeople))];
  const options = [...base, ...picked.filter((name) => !base.includes(name))];

  async function save(next: string | null) {
    if (entry.kind === "planned") return changeInquiryCrew(entry.event.id, next, students);
    if (entry.kind === "rental") return updateField("tables", entry.event.id, "deliveredBy", next ?? "");
    return updateField("events", entry.event.id, "execution", next ?? "");
  }

  function toggle(option: string) {
    const on = picked.includes(option);
    const names = option === solo ? (on ? [] : [option]) : on ? picked.filter((n) => n !== option) : [...picked.filter((n) => n !== solo), option];
    const next = joinPeople(options.filter((name) => names.includes(name)));
    const previous = value;
    onChange(next);
    startTransition(async () => {
      const result = await save(next);
      if (!result.ok) {
        onChange(previous);
        toast.error(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div
      role="group"
      aria-label={rental ? "Dostavil / peljal" : "Izvedba dogodka"}
      className={cn("flex flex-wrap gap-1.5", pending && "opacity-70")}
    >
      {options.map((option) => {
        const on = picked.includes(option);
        return (
          <button
            key={option}
            type="button"
            aria-pressed={on}
            onClick={() => toggle(option)}
            className={cn(
              "flex items-center gap-1 rounded-full border px-3 py-1 text-sm transition-colors",
              on ? "border-adm-ink bg-adm-ink text-adm-bg" : "border-dashed border-adm-soft text-adm-muted hover:border-adm-ink hover:text-adm-ink",
            )}
          >
            {on && <Check className="size-3.5" />}
            {option}
          </button>
        );
      })}
    </div>
  );
}
