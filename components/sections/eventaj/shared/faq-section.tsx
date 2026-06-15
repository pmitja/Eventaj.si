"use client";

import { faqItems } from "@/content/eventaj/data";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function FAQSection({
  items = faqItems,
  eyebrow = "Pogosta vprašanja",
}: {
  items?: ReadonlyArray<{ q: string; a: string }>;
  eyebrow?: string;
} = {}) {
  const [open, setOpen] = useState(0);
  return (
    <section
      id="faq"
      className="bg-[var(--eventaj-paper)] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
            {eyebrow}
          </div>
          <h2 className="font-serif-display text-[clamp(36px,4.5vw,60px)] font-[350] leading-none text-balance">
            Vse, kar te{" "}
            <em className="font-serif-italic italic text-[var(--eventaj-accent)]">
              zanima
            </em>
            .
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--eventaj-ink-2)]">
            Vse pomembne informacije na enem mestu. Če imaš dodatno vprašanje,
            nam piši.
          </p>
          <a
            href="mailto:info@eventaj.si"
            className="mt-6 inline-block border-b border-[var(--eventaj-accent)] pb-0.5 text-sm text-[var(--eventaj-accent)] no-underline"
          >
            info@eventaj.si
          </a>
        </div>
        <div>
          {items.map((item, index) => (
            <div
              key={item.q}
              className={cn(
                "border-t border-[rgba(20,17,15,0.12)]",
                index === items.length - 1 && "border-b",
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(open === index ? -1 : index)}
                className="flex w-full items-center justify-between bg-transparent py-7 text-left text-[var(--eventaj-ink)]"
              >
                <span className="pr-6 font-serif-display text-[22px] font-normal">
                  {item.q}
                </span>
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(20,17,15,0.2)] text-lg font-light transition-transform",
                    open === index && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-[max-height] duration-300",
                  open === index ? "max-h-56" : "max-h-0",
                )}
              >
                <p className="mb-7 pr-14 text-[15px] leading-relaxed text-[var(--eventaj-ink-2)]">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
