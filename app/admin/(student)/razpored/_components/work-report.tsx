"use client";

import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { FormDialog } from "@/app/admin/_components/form-dialog";
import type { StudentShift } from "@/lib/db/student-schedule";
import { formatHours, formatPlain } from "@/lib/ledger/compute";
import { cn } from "@/lib/utils";
import { reportWork } from "../actions";
import { shortDate } from "./shift-format";

type Shift = Pick<StudentShift, "key" | "date" | "title" | "workedHours" | "km">;

const input = (value: number | null) => (value === null ? "" : String(value).replace(".", ","));

export function reportText(shift: Pick<StudentShift, "workedHours" | "km">) {
  const parts = [shift.workedHours !== null && `${formatHours(shift.workedHours)} h`, shift.km !== null && `${formatPlain(shift.km)} km`];
  return parts.filter(Boolean).join(" · ") || null;
}

// After the event the student logs hours worked and km driven; Mitja and Jan see it in Poslovanje → Študenti.
// An admin previewing a student's page sees the same buttons and logs on that student's behalf.
export function WorkReport({ shift, student, dark }: { shift: Shift; student: string; dark?: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const logged = reportText(shift);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] transition-[opacity,border-color] hover:opacity-85",
          logged
            ? dark
              ? "border border-adm-soft text-adm-bg hover:border-adm-bg"
              : "border border-adm-line text-adm-ink hover:border-adm-ink"
            : dark
              ? "bg-adm-bg text-adm-ink"
              : "bg-adm-ink text-adm-bg",
        )}
      >
        <Clock className="size-3.5 shrink-0" />
        {logged ?? "Vpiši ure in km"}
      </button>
      <FormDialog
        open={open}
        onOpenChange={setOpen}
        eyebrow={`${shortDate(shift.date)} · ${shift.title}`}
        title="Ure in kilometri"
        fields={[
          { key: "hours", label: "Ure dela", kind: "text", placeholder: "npr. 6:40 ali 6,5", initial: input(shift.workedHours) },
          { key: "km", label: "Prevoženi km", kind: "number", placeholder: "npr. 42", initial: input(shift.km) },
        ]}
        validate={(values) => (logged || values.hours?.trim() || values.km?.trim() ? null : "Vpiši ure ali km")}
        onSubmit={async (values) => {
          const error = await reportWork(shift.key, values, student);
          if (!error) {
            setOpen(false);
            toast.success("Shranjeno");
            router.refresh();
          }
          return error;
        }}
      />
    </>
  );
}
