"use client";

import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ScheduleTab = "moji" | "odprti";

type Props = { initial: ScheduleTab; openCount: number; mine: ReactNode; open: ReactNode };

// Moji dogodki and Odprti dogodki as two tabs, so the page is not one long scroll. The tab is kept
// in ?prikaz= so a refresh (e.g. after signing up) stays on it.
export function ScheduleTabs({ initial, openCount, mine, open }: Props) {
  const [tab, setTab] = useState<ScheduleTab>(initial);

  const select = (next: ScheduleTab) => {
    setTab(next);
    const url = new URL(window.location.href);
    if (next === "moji") url.searchParams.delete("prikaz");
    else url.searchParams.set("prikaz", next);
    window.history.replaceState(null, "", url);
  };

  const tabs: { id: ScheduleTab; label: string; count?: number }[] = [
    { id: "moji", label: "Moji dogodki" },
    { id: "odprti", label: "Odprti dogodki", count: openCount },
  ];

  return (
    <>
      <div role="tablist" aria-label="Razpored" className="grid grid-cols-2 gap-1 rounded-full border border-adm-line bg-adm-card p-1 text-sm sm:inline-grid sm:self-start">
        {tabs.map((item) => {
          const current = item.id === tab;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={current}
              onClick={() => select(item.id)}
              className={cn(
                "relative flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-3 py-2.5 transition-colors sm:px-5",
                current ? "text-adm-bg" : "text-adm-muted hover:text-adm-ink",
              )}
            >
              {current && (
                <motion.span
                  layoutId="schedule-tab"
                  className="absolute inset-0 rounded-full bg-adm-ink"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{item.label}</span>
              {item.count !== undefined && item.count > 0 && (
                <span
                  className={cn(
                    "relative min-w-5 rounded-full px-1.5 text-center text-xs font-semibold tabular",
                    current ? "bg-adm-bg text-adm-ink" : "bg-adm-accent text-adm-bg",
                  )}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="flex flex-col gap-7">
        {tab === "moji" ? mine : open}
      </div>
    </>
  );
}
