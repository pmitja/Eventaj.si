"use client";

import { faqItems } from "@/content/eventaj/data";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";

type FaqItem = { q: string; a: string };

export function RedesignFaq({
  items = faqItems,
  moreLink = { href: "/pogosta-vprasanja", label: "Vsa pogosta vprašanja" },
  formal = false,
}: {
  items?: ReadonlyArray<FaqItem>;
  moreLink?: { href: string; label: string };
  /** Vikanje, za strani, ki nagovarjajo z "vi". */
  formal?: boolean;
}) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="ev-faq-title" className="border-t ev-rule py-24 md:py-36">
      <div className="ev-wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <h2 id="ev-faq-title" className="ev-display ev-h2">
            Vse, kar {formal ? "vas" : "te"} <em>zanima</em>
          </h2>
          <p className="mt-6 max-w-[38ch] text-[16px] leading-relaxed text-[var(--ev-stone)]">
            Vse pomembne informacije na enem mestu. {formal ? "Če imate dodatno vprašanje, nam pišite na" : "Če imaš dodatno vprašanje, nam piši na"}{" "}
            <a href="mailto:info@eventaj.si" className="text-[var(--ev-night)] underline decoration-1 underline-offset-4">
              info@eventaj.si
            </a>
            .
          </p>
          <Link href={moreLink.href} className="ev-btn ev-btn-dark mt-9">
            {moreLink.label}
          </Link>
        </div>

        <ul className="border-t border-[var(--ev-night)] lg:col-span-7 lg:col-start-6">
          {items.map((item, index) => {
            const isOpen = open === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;
            return (
              <li key={item.q} className="border-b ev-rule">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="ev-display text-[19px] leading-[1.25] md:text-[22px]">{item.q}</span>
                    <Plus
                      aria-hidden="true"
                      strokeWidth={1.25}
                      className={cn("h-6 w-6 shrink-0 text-[var(--ev-wine)] transition-transform duration-300", isOpen && "rotate-45")}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="max-w-[64ch] pb-8 pr-12 text-[16px] leading-relaxed text-[var(--ev-stone)]"
                >
                  {item.a}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
