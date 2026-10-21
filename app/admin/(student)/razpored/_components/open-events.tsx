"use client";

import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Reveal } from "@/app/admin/_components/motion";
import { Eyebrow } from "@/app/admin/_components/panel";
import type { OpenEvent } from "@/lib/db/open-events";
import { claimEvent } from "../actions";
import { dayParts, longDate, timeText, untilText } from "./shift-format";

const freeText = (free: number) => (free === 1 ? "še 1 prosto mesto" : `še ${free} prosti mesti`);

// Events still looking for students. Signing up puts the student on the crew straight away.
export function OpenEvents({ events, today, canClaim }: { events: OpenEvent[]; today: string; canClaim: boolean }) {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);

  const claim = async (event: OpenEvent) => {
    const where = event.location ? `, ${event.location}` : "";
    if (!window.confirm(`Prijavim te na ${longDate(event.date)}${where}? Prijava velja takoj. Če potem ne moreš, javi Mitji ali Janu.`)) return;
    setPending(event.key);
    const error = await claimEvent(event.key);
    setPending(null);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Prijavljen si! Dogodek je zdaj v tvojem razporedu.");
    }
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
                disabled={pending !== null}
                onClick={() => claim(event)}
                whileTap={{ scale: 0.96 }}
                className="flex items-center justify-center gap-2 self-stretch rounded-full bg-adm-ink px-5 py-2.5 text-sm text-adm-bg transition-opacity hover:opacity-85 disabled:opacity-60 sm:self-center"
              >
                {pending === event.key && <LoaderCircle className="size-4 animate-spin" />}
                Prijavim se
              </motion.button>
            )}
          </Reveal>
        );
      })}
    </section>
  );
}
