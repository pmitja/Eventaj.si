"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { guides } from "@/content/nasveti";

const rule = "border-[rgba(20,17,15,0.12)]";
const categories = ["Vsi", ...new Set(guides.map((guide) => guide.eyebrow))];

export function GuideCards() {
  const [category, setCategory] = useState("Vsi");
  const visibleGuides = guides.filter(
    (guide) => category === "Vsi" || guide.eyebrow === category,
  );
  return (
    <>
      {guides.length >= 10 && (
        <div
          role="group"
          aria-label="Filtriraj nasvete po kategoriji"
          className="mb-8 flex flex-wrap gap-3"
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              className={`rounded-full border px-5 py-3 text-sm transition-colors ${category === item ? "border-[var(--eventaj-ink)] bg-[var(--eventaj-ink)] text-[var(--eventaj-paper)]" : "border-[rgba(20,17,15,0.2)] hover:bg-white/60"}`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      <p className="sr-only" role="status">
        Prikazanih nasvetov: {visibleGuides.length}
      </p>
      <div
        className={`grid border-l border-t ${rule} md:grid-cols-2 lg:grid-cols-3`}
      >
        {visibleGuides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/nasveti/${guide.slug}`}
            className={`group flex min-h-72 flex-col border-b border-r ${rule} p-7 no-underline transition-colors hover:bg-white/60 md:p-9`}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--eventaj-accent)]">
              {guide.eyebrow}
            </span>
            <h2 className="mt-8 font-serif-display text-3xl font-[400] leading-tight">
              {guide.label}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--eventaj-muted)]">
              {guide.teaser}
            </p>
            <time
              dateTime={guide.updated}
              className="mt-5 text-xs text-[var(--eventaj-muted)]"
            >
              Posodobljeno {new Date(guide.updated).toLocaleDateString("sl-SI")}
            </time>
            <span className="mt-auto flex items-center justify-between gap-2 pt-8 text-sm font-semibold">
              Preberi
              <span className="flex items-center gap-3 text-xs font-normal text-[var(--eventaj-muted)]">
                {guide.readMinutes} min
                <ChevronRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
