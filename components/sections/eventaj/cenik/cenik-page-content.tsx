"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { PackageTiers } from "../service/package-tiers";
import { FAQSection } from "../shared/faq-section";
import { TestimonialsSection } from "../shared/testimonials-section";
import { AddonsSection } from "./addons-section";
import { PricingConfigurator } from "./pricing-configurator";

export function CenikPageContent({ seoTitle }: { seoTitle: string }) {
  const [tab, setTab] = useState<"photo" | "360" | "custom">("photo");
  return (
    <main>
      <section className="bg-[var(--eventaj-paper)] px-5 pb-16 pt-40 text-center md:px-10">
        <div className="mx-auto max-w-[880px]">
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[rgba(20,17,15,0.15)] px-4 py-2 text-xs uppercase tracking-[0.12em] text-[var(--eventaj-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--eventaj-accent)]" />
            Cenik · 2026
          </div>
          <h1 className="sr-only">{seoTitle}</h1>
          <div
            aria-hidden="true"
            className="font-serif-display text-[clamp(48px,7vw,96px)] font-[350] leading-[0.95] text-balance"
          >
            Za dogodke, ki ostanejo v spominu.
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--eventaj-ink-2)] md:text-[19px]">
            Izberi med pripravljenimi paketi ali pa skupaj ustvarimo ponudbo po
            meri.
          </p>
          <div className="mt-12 inline-flex flex-wrap justify-center gap-1 rounded-full bg-[var(--eventaj-paper-2)] p-1">
            {[
              ["photo", "Photo Booth"],
              ["360", "360° Booth"],
              ["custom", "Individualno"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setTab(value as "photo" | "360" | "custom")}
                className={cn(
                  "rounded-full px-6 py-3 text-sm font-medium transition-colors",
                  tab === value
                    ? "bg-[var(--eventaj-ink)] text-[var(--eventaj-paper)]"
                    : "text-[var(--eventaj-ink)]",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>
      {tab !== "custom" ? (
        <PackageTiers service={tab} />
      ) : (
        <PricingConfigurator />
      )}
      <AddonsSection />
      <TestimonialsSection />
      <FAQSection />
    </main>
  );
}
