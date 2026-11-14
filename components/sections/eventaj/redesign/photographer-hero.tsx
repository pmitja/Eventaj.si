"use client";

import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { photographerBasePrice, photographerInquiryType, photographerMeta } from "@/content/eventaj/photographer";
import { serviceHeroProof } from "@/content/eventaj/service-visuals";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { HeroSlide, HeroSlideControls, HeroSlideImages, useHeroSlides } from "./hero-slides";

const dir = "/application/fotograf";

const slides: ReadonlyArray<HeroSlide> = [
  { src: `${dir}/poroka/filip-marija-01.webp`, label: "Poroka", position: "60% 40%" },
  { src: `${dir}/klajmber/klajmber-01.webp`, label: "Obletnica", position: "50% 50%" },
  { src: `${dir}/sport/vinotek-01.webp`, label: "Tek", position: "50% 45%" },
  { src: `${dir}/poroka/filip-marija-05.webp`, label: "Obred", position: "50% 35%" },
  { src: `${dir}/sport/vinotek-05.webp`, label: "Šport", position: "60% 40%" },
];

export function PhotographerHero() {
  const show = useHeroSlides(slides.length);

  return (
    <section className="ev-dark relative isolate flex min-h-[min(100svh,1040px)] flex-col overflow-hidden">
      <div className="absolute inset-y-0 right-0 -z-10 w-full overflow-hidden lg:w-[64%]" aria-hidden="true">
        <HeroSlideImages slides={slides} index={show.index} sizes="(max-width: 1023px) 160vh, 100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,13,23,0.4)_0%,rgba(28,13,23,0.8)_32%,rgba(28,13,23,0.96)_62%)] lg:bg-[linear-gradient(90deg,rgba(28,13,23,1)_0%,rgba(28,13,23,0.6)_22%,rgba(28,13,23,0.1)_52%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--ev-night)] to-transparent" />
      </div>

      <div className="ev-wrap flex flex-1 flex-col justify-end pb-12 pt-32 md:pb-16 lg:justify-center lg:pb-20">
        <div className="ev-rise max-w-[720px]">
          <h1 className="sr-only">{photographerMeta.h1}</h1>
          <p className="mb-7 text-[19px] sm:text-[23px]">
            <a href="#cenik" className="ev-tag transition-transform hover:-translate-y-0.5">
              <small>Fotografiranje od</small> {photographerBasePrice} €
            </a>
          </p>
          <p aria-hidden="true" className="ev-display text-[clamp(42px,6vw,88px)] leading-[1.02]">
            Fotografiranje dogodkov s <em>fiksno ceno</em>
          </p>
          <p className="ev-lede mt-7 text-[var(--ev-porcelain)]/90">
            Fotografiramo poroke, rojstne dneve, poslovne in športne dogodke. Urejanje je vključeno v
            ceno, fotografije z rojstnih dni, poslovnih in športnih dogodkov pa prejmete še isti dan.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-5">
            <InquiryTrigger defaults={{ type: photographerInquiryType }} className="ev-btn ev-btn-primary">
              Preverite prost termin
              <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
            </InquiryTrigger>
            <HeroSlideControls slides={slides} {...show} />
          </div>

          <ul className="mt-9 grid grid-cols-2 gap-x-5 gap-y-2 text-[14px] text-[var(--ev-mist)] sm:flex sm:flex-wrap sm:items-center sm:gap-x-0">
            {serviceHeroProof.stats.map((item, index) => (
              <li
                key={item.label}
                className={cn("ev-tabular sm:pr-5", index > 0 && "sm:border-l sm:border-[var(--ev-rule-dark)] sm:pl-5")}
              >
                <span className="text-[var(--ev-porcelain)]">{item.value}</span> {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
