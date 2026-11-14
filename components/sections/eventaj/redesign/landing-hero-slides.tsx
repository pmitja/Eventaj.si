"use client";

import type { ReactNode } from "react";
import { HeroSlideControls, HeroSlideImages, useHeroSlides } from "./hero-slides";

type Photo = { src: string; alt: string };

/** Dark hero with rotating real photos on the right and the page copy on the left. */
export function LandingHeroSlides({ photos, children }: { photos: ReadonlyArray<Photo>; children: ReactNode }) {
  const slides = photos.map((photo) => ({ src: photo.src, label: photo.alt, position: "50% 35%" }));
  const show = useHeroSlides(slides.length);

  return (
    <section className="ev-dark relative isolate flex min-h-[min(100svh,1040px)] flex-col overflow-hidden">
      <div className="absolute inset-y-0 right-0 -z-10 w-full overflow-hidden lg:w-[64%]" aria-hidden="true">
        <HeroSlideImages slides={slides} index={show.index} sizes="(max-width: 1023px) 160vh, 100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,13,23,0.4)_0%,rgba(28,13,23,0.8)_32%,rgba(28,13,23,0.96)_62%)] lg:bg-[linear-gradient(90deg,rgba(28,13,23,1)_0%,rgba(28,13,23,0.6)_22%,rgba(28,13,23,0.1)_52%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--ev-night)] to-transparent" />
      </div>
      <div className="ev-wrap flex flex-1 flex-col justify-end pb-12 pt-32 md:pb-16 lg:justify-center lg:pb-20">
        {children}
        {slides.length > 1 && (
          <div className="mt-8">
            <HeroSlideControls slides={slides} {...show} />
          </div>
        )}
      </div>
    </section>
  );
}
