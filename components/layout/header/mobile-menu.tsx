"use client";

import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { StandingTableIcon } from "@/components/icons/StandingTableIcon";
import { eventajNav } from "@/content/eventaj/data";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function MobileMenu() {
  const [equipmentOpen, setEquipmentOpen] = useState(false);

  return (
    <div className="border-b border-[rgba(20,17,15,0.08)] bg-[rgba(251,248,242,0.98)] px-5 pb-6 pt-2 shadow-2xl shadow-black/10 backdrop-blur-xl lg:hidden">
      <div className="grid gap-1">
        {eventajNav.map((item) => {
          if ("children" in item) {
            return (
              <div key={item.href} className="border-b border-[rgba(20,17,15,0.08)]">
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    className="min-w-0 flex-1 py-4 font-serif-display text-2xl no-underline"
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setEquipmentOpen((value) => !value)}
                    aria-expanded={equipmentOpen}
                    aria-label="Prikaži izdelke za najem"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(20,17,15,0.12)]"
                  >
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform duration-200",
                        equipmentOpen && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </div>
                {equipmentOpen && (
                  <div className="mb-4 border-l border-[rgba(20,17,15,0.14)] pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center gap-3 py-3 no-underline"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(20,17,15,0.14)]">
                          <StandingTableIcon className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block font-serif-display text-lg leading-tight">
                            {child.label}
                          </span>
                          <span className="mt-1 block text-xs text-[var(--eventaj-muted)]">
                            {child.description}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          if ("external" in item && item.external) {
            return (
              <a
                key={item.href}
                href={item.href}
                className="group flex min-h-16 items-center justify-between gap-4 border-b border-[rgba(20,17,15,0.08)] py-3 no-underline"
              >
                <span>
                  <span className="flex items-center gap-2 font-serif-display text-2xl">
                    {item.label}
                    {"isNew" in item && item.isNew && (
                      <span className="rounded-full bg-[var(--eventaj-accent)] px-2 py-1 font-sans text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--eventaj-paper)]">
                        Novo
                      </span>
                    )}
                  </span>
                  {"description" in item && (
                    <span className="mt-1 block text-xs text-[var(--eventaj-muted)]">
                      {item.description}
                    </span>
                  )}
                </span>
                <span
                  aria-hidden="true"
                  className="text-xl text-[var(--eventaj-accent)] transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </a>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-[rgba(20,17,15,0.08)] py-4 font-serif-display text-2xl"
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <a
          href="tel:+38631285143"
          className="rounded-full border border-[rgba(20,17,15,0.18)] px-5 py-4 text-center font-medium"
        >
          Pokliči 031 285 143
        </a>
        <InquiryTrigger className="rounded-full bg-[var(--eventaj-ink)] px-5 py-4 text-center font-medium text-[var(--eventaj-paper)]">
          Pridobi ponudbo →
        </InquiryTrigger>
      </div>
    </div>
  );
}
