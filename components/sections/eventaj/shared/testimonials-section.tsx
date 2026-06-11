"use client";

import { testimonials } from "@/content/eventaj/data";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { TrustLogosText } from "./trust-logos";

export function TestimonialsSection() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setIdx((value) => (value + 1) % testimonials.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, []);

  const review = testimonials[idx];

  return (
    <section className="overflow-hidden bg-[var(--eventaj-paper)] px-5 py-24 text-center md:px-10 md:py-32">
      <div className="mx-auto max-w-[980px]">
        <div className="mb-8 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
          Mnenja strank
        </div>
        <div className="mb-9 flex items-center justify-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index} className="text-lg text-[var(--eventaj-accent)]">
              ★
            </span>
          ))}
          <span className="ml-3 text-sm text-[var(--eventaj-muted)]">
            4.9 / 5 · 30+ ocen
          </span>
        </div>
        <blockquote
          key={idx}
          className="font-serif-display text-[clamp(28px,3.6vw,46px)] font-[350] leading-tight text-balance motion-safe:animate-[eventaj-fade-in_0.6s_ease-out]"
        >
          <span className="font-serif-italic text-[1.4em] italic leading-none text-[var(--eventaj-accent)]">
            “
          </span>
          {review.quote}
          <span className="font-serif-italic text-[1.4em] italic leading-none text-[var(--eventaj-accent)]">
            ”
          </span>
        </blockquote>
        <div className="mt-10 font-medium">{review.author}</div>
        <div className="mt-1 font-serif-italic text-[13px] italic text-[var(--eventaj-muted)]">
          {review.role}
        </div>
        <div className="mt-12 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setIdx(index)}
              className={cn(
                "h-1 rounded-full p-0 transition-all",
                index === idx
                  ? "w-7 bg-[var(--eventaj-ink)]"
                  : "w-2 bg-[rgba(20,17,15,0.2)]",
              )}
              aria-label={`Mnenje ${index + 1}`}
            />
          ))}
        </div>
        <TrustLogosText />
      </div>
    </section>
  );
}
