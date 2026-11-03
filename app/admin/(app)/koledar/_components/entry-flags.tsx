import { Clock, UserX } from "lucide-react";
import { cn } from "@/lib/utils";
import { missingCrew, missingTime, type Entry } from "./calendar-entries";

const badge = "grid size-4 shrink-0 place-items-center rounded-full text-white shadow-[0_2px_6px_rgba(0,0,0,.25)] ring-2 ring-adm-bg";

export function CrewMark({ className }: { className?: string }) {
  return <span className={cn(badge, "bg-red-500 text-[10px] font-bold leading-none", className)}>!</span>;
}

export function TimeMark({ className }: { className?: string }) {
  return (
    <span className={cn(badge, "bg-amber-500", className)}>
      <Clock className="size-2.5" strokeWidth={3} />
    </span>
  );
}

export function AbsentMark({ className }: { className?: string }) {
  return (
    <span className={cn(badge, "bg-violet-600", className)}>
      <UserX className="size-2.5" strokeWidth={3} />
    </span>
  );
}

// Notification-style badges pinned to the top-left corner of the parent (which must be `relative`):
// red "!" when nobody is set to work the event, amber clock when an upcoming event has no start time,
// violet when someone set to work it has an absence entered that day (absent = their names).
export function EntryFlags({ entry, today, absent = [], className }: { entry: Entry; today: string; absent?: string[]; className?: string }) {
  const crew = missingCrew(entry);
  const time = missingTime(entry, today);
  if (!crew && !time && absent.length === 0) return null;
  return (
    <span className={cn("pointer-events-none absolute -left-1.5 -top-1.5 z-10 flex gap-0.5", className)}>
      {crew && (
        <span title="Izvedba ni določena" className="relative grid">
          <span className="absolute inset-0 animate-ping rounded-full bg-red-500/60 motion-reduce:hidden" aria-hidden />
          <CrewMark className="relative" />
          <span className="sr-only">Izvedba ni določena</span>
        </span>
      )}
      {absent.length > 0 && (
        <span title={`Vpisana odsotnost: ${absent.join(", ")}`}>
          <AbsentMark />
          <span className="sr-only">Vpisana odsotnost: {absent.join(", ")}</span>
        </span>
      )}
      {time && (
        <span title="Začetna ura ni vpisana">
          <TimeMark />
          <span className="sr-only">Začetna ura ni vpisana</span>
        </span>
      )}
    </span>
  );
}
