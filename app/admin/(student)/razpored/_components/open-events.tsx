"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Reveal } from "@/app/admin/_components/motion";
import { Eyebrow } from "@/app/admin/_components/panel";
import type { OpenEvent } from "@/lib/db/open-events";
import { claimEvent } from "../actions";
import { ClaimDialog } from "./claim-dialog";
import { dayParts, timeText, untilText } from "./shift-format";

function freeText(free: number) {
  if (free === 1) return "še 1 prosto mesto";
  if (free === 2) return "še 2 prosti mesti";
  return free < 5 ? `še ${free} prosta mesta` : `še ${free} prostih mest`;
}

// Events still looking for students. Signing up puts the student on the crew straight away.
export function OpenEvents({ events, today, canClaim }: { events: OpenEvent[]; today: string; canClaim: boolean }) {
  const router = useRouter();
  const [selected, setSelected] = useState<OpenEvent | null>(null);
  const [pending, setPending] = useState(false);

  const claim = async () => {
    if (!selected) return;
    setPending(true);
    const error = await claimEvent(selected.key);
    setPending(false);
    setSelected(null);
    if (error) toast.error(error);
    else toast.success("Prijavljen si! Dogodek je zdaj v tvojem razporedu.");
    router.refresh();
  };

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <Eyebrow>Iščemo študente</Eyebrow>
        <span className="text-[13px] text-adm-muted">Prvi, ki se prijavi, gre.</span>
      </div>
      {events.map((event, index) => {
        const { day, month, weekday } = dayParts(event.date);
        const facts = [timeText(event), event.location].filter(Boolean);
        return (
          <Reveal
            key={event.key}
            delay={Math.min(index, 6) * 0.05}
            className="flex flex-col gap-4 rounded-2xl border border-dashed border-adm-ink bg-adm-card p-4 sm:flex-row sm:items-center sm:p-5"
          >
            <div className="flex min-w-0 flex-1 gap-4">
              <div className="flex w-14 shrink-0 flex-col items-center rounded-xl bg-adm-sand py-2 leading-none">
                <span className="text-[11px] uppercase tracking-[.06em] text-adm-muted">{weekday}</span>
                <span className="mt-1 font-display text-[26px]">{day}</span>
                <span className="mt-0.5 text-[11px] text-adm-muted">{month}</span>
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <span className="font-display text-[20px] leading-tight">{[event.service, event.eventType].filter(Boolean).join(" · ")}</span>
                {facts.map((fact) => (
                  <span key={fact} className="text-sm text-adm-sub">{fact}</span>
                ))}
                <span className="text-[13px] text-adm-muted">
                  {untilText(event.date, today)} · {freeText(event.free)}
                  {event.going.length > 0 && ` · gre že ${event.going.join(", ")}`}
                </span>
              </div>
            </div>
            {canClaim && (
              <motion.button
                type="button"
                onClick={() => setSelected(event)}
                whileTap={{ scale: 0.96 }}
                className="flex items-center justify-center gap-2 self-stretch rounded-full bg-adm-ink px-5 py-2.5 text-sm text-adm-bg transition-opacity hover:opacity-85 disabled:opacity-60 sm:self-center"
              >
                Prijavim se
              </motion.button>
            )}
          </Reveal>
        );
      })}
      <ClaimDialog event={selected} pending={pending} onConfirm={claim} onClose={() => setSelected(null)} />
    </section>
  );
}
