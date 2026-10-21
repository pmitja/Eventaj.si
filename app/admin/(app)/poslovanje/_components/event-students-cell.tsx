"use client";

import { ChevronDown } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { updateRowStudents } from "../actions";

type Props = {
  eventId: number;
  value: string[];
  options: string[];
  onChange: (students: string[]) => void;
};

// Which students work this event. Each tick saves at once and adds or removes their Študenti row.
export function EventStudentsCell({ eventId, value, options, onChange }: Props) {
  const [pending, startTransition] = useTransition();
  const listed = [...options, ...value.filter((student) => !options.includes(student))];

  function toggle(student: string, on: boolean) {
    const previous = value;
    const next = on ? [...value, student] : value.filter((s) => s !== student);
    onChange(next);
    startTransition(async () => {
      const result = await updateRowStudents("event", eventId, next);
      if (result.ok) onChange(result.value);
      else {
        onChange(previous);
        toast.error(result.error);
      }
    });
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className={cn(
          "flex h-[44px] w-full items-center justify-between gap-1.5 px-2.5 text-left outline-none transition-colors hover:bg-adm-card/70 focus-visible:bg-adm-card data-[state=open]:bg-adm-card sm:px-3.5",
          pending && "opacity-60",
        )}
      >
        <span className="min-w-0 truncate">{value.length ? value.join(", ") : <span className="text-[#A89D90]">—</span>}</span>
        <ChevronDown className="size-3.5 shrink-0 text-adm-muted opacity-0 transition-opacity group-hover:opacity-70 max-md:opacity-50 [[data-state=open]_&]:opacity-70" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="admin-root max-h-72 min-w-[var(--radix-dropdown-menu-trigger-width)] overflow-y-auto rounded-xl border-adm-ink bg-adm-card p-1 shadow-[0_12px_30px_rgba(28,24,20,.18)]"
      >
        {listed.length === 0 && <p className="m-0 px-2 py-1.5 text-sm text-adm-muted">Seznam študentov je prazen (Nastavitve)</p>}
        {listed.map((student) => (
          <DropdownMenuCheckboxItem
            key={student}
            checked={value.includes(student)}
            // Stay open so several students can be ticked in one go.
            onSelect={(event) => event.preventDefault()}
            onCheckedChange={(on) => toggle(student, on)}
            className="rounded-lg focus:bg-adm-sand"
          >
            {student}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
