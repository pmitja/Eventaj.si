import { Reveal } from "@/app/admin/_components/motion";
import { Eyebrow } from "@/app/admin/_components/panel";
import type { StudentShift } from "@/lib/db/student-schedule";
import { formatEur } from "@/lib/ledger/compute";
import { cn } from "@/lib/utils";
import { ShiftFacts } from "./shift-facts";
import { dayParts, longDate, shortDate, untilText } from "./shift-format";

export function NextShift({ shift, today }: { shift: StudentShift; today: string }) {
  return (
    <Reveal className="flex flex-col gap-5 rounded-[20px] bg-adm-ink p-5 text-adm-bg sm:p-7">
      <div className="flex flex-col gap-1.5">
        <span className="flex items-center gap-2 text-xs uppercase tracking-[.08em] text-adm-soft">
          <span className="size-2 rounded-full bg-adm-accent" aria-hidden />
          Naslednjič · {untilText(shift.date, today)}
        </span>
        <h2 className="m-0 font-display text-[34px] font-normal leading-[1.05] first-letter:uppercase sm:text-[44px]">{longDate(shift.date)}</h2>
        <span className="text-[15px] text-adm-soft">{shift.title}</span>
      </div>
      <ShiftFacts shift={shift} dark />
    </Reveal>
  );
}

function DateBlock({ date }: { date: string }) {
  const { day, month, weekday } = dayParts(date);
  return (
    <div className="flex w-14 shrink-0 flex-col items-center rounded-xl border border-adm-line bg-adm-bg py-2 leading-none">
      <span className="text-[11px] uppercase tracking-[.06em] text-adm-muted">{weekday}</span>
      <span className="mt-1 font-display text-[26px]">{day}</span>
      <span className="mt-0.5 text-[11px] text-adm-muted">{month}</span>
    </div>
  );
}

export function UpcomingShifts({ shifts, today }: { shifts: StudentShift[]; today: string }) {
  return (
    <section className="flex flex-col gap-3">
      <Eyebrow>Prihajajoči dogodki</Eyebrow>
      {shifts.map((shift, index) => (
        <Reveal key={shift.key} delay={Math.min(index, 6) * 0.05} className="flex gap-4 rounded-2xl border border-adm-line bg-adm-card p-4 sm:p-5">
          <DateBlock date={shift.date} />
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h3 className="m-0 font-display text-[22px] font-normal leading-tight">{shift.title}</h3>
              <span className="text-[13px] text-adm-muted">{untilText(shift.date, today)}</span>
            </div>
            <ShiftFacts shift={shift} />
          </div>
        </Reveal>
      ))}
    </section>
  );
}

function PayBadge({ shift }: { shift: StudentShift }) {
  if (shift.amount === null) return <span className="text-xs text-adm-faint">znesek še ni vpisan</span>;
  return (
    <span className="flex items-center gap-2">
      <span className="tabular font-semibold">{formatEur(shift.amount)}</span>
      <span
        className={cn(
          "rounded-full px-2 py-0.5 text-[11px] font-semibold",
          shift.paid ? "bg-adm-ok text-adm-ok-fg" : "bg-adm-warn text-adm-warn-fg",
        )}
      >
        {shift.paid ? "izplačano" : "čaka"}
      </span>
    </span>
  );
}

export function PastShifts({ shifts }: { shifts: StudentShift[] }) {
  return (
    <section className="flex flex-col gap-3">
      <Eyebrow>Opravljeni dogodki</Eyebrow>
      <div className="flex flex-col rounded-2xl border border-adm-line bg-adm-card px-4 sm:px-5">
        {shifts.map((shift) => (
          <div key={shift.key} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-adm-rule py-3 last:border-b-0">
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-semibold">{shift.title}</span>
              <span className="text-xs text-adm-muted">
                {[shortDate(shift.date), shift.task ?? shift.service, shift.location].filter(Boolean).join(" · ")}
              </span>
            </div>
            <PayBadge shift={shift} />
          </div>
        ))}
      </div>
    </section>
  );
}
