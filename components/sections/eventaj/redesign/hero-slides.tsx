"use client";

import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export type HeroSlide = { src: string; label: string; position?: string };

const INTERVAL = 5200;

/**
 * Hero photographs that cross-fade on a timer, with thumbnails to pick one and a pause control.
 * Under reduced motion the timer never starts; the first photograph rests.
 */
export function useHeroSlides(count: number) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPaused(true);
      return;
    }
    const timer = window.setTimeout(() => setIndex((value) => (value + 1) % count), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [index, paused, count]);

  return { index, setIndex, paused, setPaused };
}

export function HeroSlideImages({
  slides,
  index,
  sizes,
  className,
}: {
  slides: ReadonlyArray<HeroSlide>;
  index: number;
  sizes: string;
  className?: string;
}) {
  return (
    <>
      {slides.map((slide, slideIndex) => (
        <div
          key={slide.src}
          aria-hidden="true"
          className={cn(
            "absolute inset-0 transition-opacity ease-out [transition-duration:1400ms]",
            slideIndex === index ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={slide.src}
            alt=""
            fill
            priority={slideIndex === 0}
            sizes={sizes}
            className={cn("object-cover", slideIndex === index && "ev-drift", className)}
            style={{ objectPosition: slide.position ?? "50% 30%" }}
          />
        </div>
      ))}
    </>
  );
}

export function HeroSlideControls({
  slides,
  index,
  setIndex,
  paused,
  setPaused,
}: {
  slides: ReadonlyArray<HeroSlide>;
  index: number;
  setIndex: (value: number) => void;
  paused: boolean;
  setPaused: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <ul className="flex items-center gap-2" aria-label="Fotografije z dogodkov">
        {slides.map((slide, slideIndex) => {
          const active = slideIndex === index;
          return (
            <li key={slide.src}>
              <button
                type="button"
                onClick={() => setIndex(slideIndex)}
                aria-label={`Pokaži fotografijo: ${slide.label}`}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "relative block h-11 w-11 overflow-hidden rounded-full border-2 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 sm:h-12 sm:w-12",
                  active ? "border-[var(--ev-champagne)]" : "border-transparent opacity-70 hover:opacity-100",
                )}
              >
                <Image src={slide.src} alt="" fill sizes="48px" className="object-cover" />
              </button>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        onClick={() => setPaused(!paused)}
        aria-label={paused ? "Predvajaj menjavanje fotografij" : "Ustavi menjavanje fotografij"}
        aria-pressed={paused}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--ev-rule-dark)] text-[var(--ev-porcelain)] transition-colors hover:bg-white/10 sm:h-12 sm:w-12"
      >
        {paused ? (
          <Play aria-hidden="true" strokeWidth={1.75} className="ml-0.5 h-4 w-4" />
        ) : (
          <Pause aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
