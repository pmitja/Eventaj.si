import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { missingCrew, missingTime, type Entry } from "./calendar-entries";

export function CrewMark({ className }: { className?: string }) {
  return (
    <span className={cn("grid size-3.5 shrink-0 place-items-center rounded-full bg-adm-accent text-[10px] font-bold leading-none text-white", className)}>!</span>
  );
}

export function TimeMark({ className }: { className?: string }) {
  return <Clock className={cn("size-3 shrink-0", className)} strokeWidth={2.5} />;
}

// "!" when nobody is set to work the event, a clock when an upcoming event has no start time.
export function EntryFlags({ entry, today, className }: { entry: Entry; today: string; className?: string }) {
  const crew = missingCrew(entry);
  const time = missingTime(entry, today);
  if (!crew && !time) return null;
  return (
    <span className={cn("inline-flex items-center gap-1 align-[-2px]", className)}>
      {crew && (
        <span title="Izvedba ni določena">
          <CrewMark />
        </span>
      )}
      {time && (
        <span title="Začetna ura ni vpisana">
          <TimeMark />
        </span>
      )}
    </span>
  );
}
