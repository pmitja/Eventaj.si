"use client";

import { LoaderCircle, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Absence } from "@/lib/db/absences";
import { removeAbsence } from "../actions";
import { rangeLabel } from "./absences";

// Shows one absence; it can only be deleted (add a new one to change the days).
export function AbsenceDialog({ absence, onClose }: { absence: Absence; onClose: () => void }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();
  const days = Math.round((Date.parse(absence.to) - Date.parse(absence.from)) / 86_400_000) + 1;

  function remove() {
    if (!confirming) return setConfirming(true);
    startTransition(async () => {
      const result = await removeAbsence(absence.id);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Odsotnost izbrisana");
      onClose();
      router.refresh();
    });
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="admin-root block max-h-[92dvh] w-[calc(100vw-24px)] max-w-md overflow-y-auto overscroll-contain rounded-[20px] border border-adm-ink bg-adm-bg p-5 shadow-[0_24px_60px_rgba(28,24,20,.25)] sm:rounded-[20px] sm:p-7 [&>button:last-child]:hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <DialogDescription className="flex items-center gap-2 text-xs uppercase tracking-[.08em] text-adm-muted">
              <span className="size-2 rounded-full border border-dashed border-adm-sub bg-adm-sand" aria-hidden />
              Odsotnost · {days === 1 ? "1 dan" : days === 2 ? "2 dneva" : days < 5 ? `${days} dnevi` : `${days} dni`}
            </DialogDescription>
            <DialogTitle className="mt-1.5 break-words font-display text-[30px] font-normal leading-[1.05] tracking-normal">
              {absence.people.join(", ")}
            </DialogTitle>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-adm-soft transition-[border-color,transform] hover:rotate-90 hover:border-adm-ink"
            aria-label="Zapri"
          >
            <X className="size-4" />
          </button>
        </div>

        <dl className="m-0 mt-5 grid grid-cols-[96px_minmax(0,1fr)] gap-x-4 gap-y-2.5 text-sm">
          <dt className="text-adm-muted">Kdaj</dt>
          <dd className="m-0 tabular">{rangeLabel(absence)}</dd>
          {absence.note && (
            <>
              <dt className="text-adm-muted">Opomba</dt>
              <dd className="m-0 whitespace-pre-line break-words [text-wrap:pretty]">{absence.note}</dd>
            </>
          )}
        </dl>

        <button
          type="button"
          onClick={remove}
          disabled={pending}
          className={
            confirming
              ? "mt-6 inline-flex items-center gap-1.5 rounded-full border border-adm-accent bg-adm-accent px-4 py-2 text-sm text-adm-bg transition-opacity disabled:opacity-70"
              : "mt-6 inline-flex items-center gap-1.5 rounded-full border border-adm-soft px-4 py-2 text-sm transition-colors hover:border-adm-ink"
          }
        >
          {pending ? <LoaderCircle className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
          {confirming ? "Res izbriši" : "Izbriši odsotnost"}
        </button>
      </DialogContent>
    </Dialog>
  );
}
