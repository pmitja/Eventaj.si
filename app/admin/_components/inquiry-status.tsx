"use client";

import { useOptimistic, useState, useTransition } from "react";
import { toast } from "sonner";
import { changeInquiryStatus } from "../(app)/actions";
import type { InquiryStatus } from "@/lib/db/inquiries";
import { cn } from "@/lib/utils";
import { InquiryNoteDialog } from "./inquiry-note";

const options: { value: InquiryStatus; label: string; active: string }[] = [
  { value: "new", label: "Novo", active: "border-adm-ink bg-adm-ink text-adm-bg" },
  { value: "confirmed", label: "Potrjeno", active: "border-adm-ok-fg bg-adm-ok text-adm-ok-fg" },
  { value: "declined", label: "Zavrnjeno", active: "border-adm-no-fg bg-adm-no text-adm-no-fg" },
];

const moved: Record<InquiryStatus, string> = { new: "Aktivna", confirmed: "Potrjena", declined: "Zavrnjena" };

export function InquiryStatusControl({ id, status, note }: { id: number; status: InquiryStatus; note: string | null }) {
  const [pending, startTransition] = useTransition();
  const [current, setCurrent] = useOptimistic(status);
  const [askNote, setAskNote] = useState(false);

  function select(value: InquiryStatus) {
    if (value === current) return;
    startTransition(async () => {
      setCurrent(value);
      const result = await changeInquiryStatus(id, value);
      if (!result.ok) toast.error(result.error);
      else {
        toast.success(`Povpraševanje #${id} je zdaj med »${moved[value]}«`);
        if (value === "confirmed") setAskNote(true);
      }
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="text-adm-muted">Status:</span>
      <div role="radiogroup" aria-label="Status povpraševanja" className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={current === option.value}
            onClick={() => select(option.value)}
            disabled={pending}
            className={cn(
              "rounded-full border px-3 py-1 transition-colors disabled:cursor-wait",
              current === option.value
                ? option.active
                : "border-dashed border-adm-soft text-adm-muted hover:border-adm-ink hover:text-adm-ink",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
      <InquiryNoteDialog id={id} note={note} open={askNote} onOpenChange={setAskNote} afterConfirm />
    </div>
  );
}
