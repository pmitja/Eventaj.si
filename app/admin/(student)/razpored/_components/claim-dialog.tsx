"use client";

import { motion } from "framer-motion";
import { LoaderCircle, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { OpenEvent } from "@/lib/db/open-events";
import { longDate, timeText } from "./shift-format";

type Props = { event: OpenEvent | null; pending: boolean; onConfirm: () => void; onClose: () => void };

// Confirms a sign-up before it counts: the student is on the crew as soon as they press Prijavi me.
export function ClaimDialog({ event, pending, onConfirm, onClose }: Props) {
  const rows = event
    ? ([
        ["Storitev", [event.service, event.eventType].filter(Boolean).join(" · ")],
        ["Ura", timeText(event) ?? "še ni znana"],
        ["Lokacija", event.location ?? "še ni znana"],
        ["Gre že", event.going.join(", ")],
      ] as const)
    : [];

  return (
    <Dialog open={event !== null} onOpenChange={(open) => !open && !pending && onClose()}>
      <DialogContent className="admin-root block w-[calc(100vw-24px)] max-w-md rounded-[20px] border border-adm-ink bg-adm-bg p-5 shadow-[0_24px_60px_rgba(28,24,20,.25)] sm:rounded-[20px] sm:p-7 [&>button:last-child]:hidden">
        {event && (
          <>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <DialogDescription className="text-xs uppercase tracking-[.08em] text-adm-muted">Prijava na dogodek</DialogDescription>
                <DialogTitle className="mt-1.5 font-display text-[30px] font-normal leading-[1.05] tracking-normal first-letter:uppercase">
                  {longDate(event.date)}
                </DialogTitle>
              </div>
              <button
                type="button"
                onClick={onClose}
                disabled={pending}
                aria-label="Zapri"
                className="grid size-9 shrink-0 place-items-center rounded-full border border-adm-soft transition-[border-color,transform] hover:rotate-90 hover:border-adm-ink disabled:opacity-50"
              >
                <X className="size-4" />
              </button>
            </div>

            <dl className="m-0 mt-5 grid grid-cols-[84px_minmax(0,1fr)] gap-x-4 gap-y-2.5 text-sm">
              {rows
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div key={label} className="contents">
                    <dt className="text-adm-muted">{label}</dt>
                    <dd className="m-0 break-words">{value}</dd>
                  </div>
                ))}
            </dl>

            <p className="m-0 mt-5 rounded-xl bg-adm-warn px-4 py-3 text-sm text-adm-warn-fg">
              Prijava velja takoj in dogodek se doda v tvoj razpored. Če potem ne moreš, javi Mitji ali Janu.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={pending}
                className="rounded-full border border-adm-soft px-5 py-2.5 text-sm transition-colors hover:border-adm-ink disabled:opacity-50"
              >
                Prekliči
              </button>
              <motion.button
                type="button"
                onClick={onConfirm}
                disabled={pending}
                whileTap={{ scale: 0.96 }}
                className="flex items-center justify-center gap-2 rounded-full bg-adm-ink px-5 py-2.5 text-sm text-adm-bg transition-opacity hover:opacity-85 disabled:opacity-70"
              >
                {pending && <LoaderCircle className="size-4 animate-spin" />}
                {pending ? "Prijavljam …" : "Prijavi me"}
              </motion.button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
