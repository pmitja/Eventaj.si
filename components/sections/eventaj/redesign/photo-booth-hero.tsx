"use client";

import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { photoPackages } from "@/content/eventaj/data";
import { serviceHeroProof } from "@/content/eventaj/service-visuals";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { HeroSlide, HeroSlideControls, HeroSlideImages, useHeroSlides } from "./hero-slides";

const BASE_PRICE = photoPackages[0].price;

const slides: ReadonlyArray<HeroSlide> = [
  { src: "/application/birthday-parties/matej-50.webp", label: "Matej 50", position: "50% 30%" },
  { src: "/application/wedding-photos/karmen-in-marko.webp", label: "Karmen in Marko", position: "55% 35%" },
  { src: "/application/wedding-photos/alja-in-rene.webp", label: "Alja in Rene", position: "50% 30%" },
  { src: "/application/birthday-parties/20260807_230302676.webp", label: "Janez 70", position: "50% 25%" },
  { src: "/application/birthday-parties/tone-50.webp", label: "Tone 50", position: "50% 30%" },
  { src: "/application/wedding-photos/20260620_233009774.webp", label: "Vesna in Antonijo", position: "50% 30%" },
  { src: "/application/photo-booth-hero/doris-40.webp", label: "Doris 40", position: "50% 30%" },
];

export type ServiceHeroCopy = {
  h1: string;
  title: React.ReactNode;
  lede: string;
};

const defaultCopy: ServiceHeroCopy = {
  h1: "Photo booth najem s takojšnjim tiskom",
  title: (
    <>
      Trenutek, ujet <em>v papir</em>
    </>
  ),
  lede: "Photo booth, ki mu rečemo tudi foto stojnica, fotobox ali foto kotiček, s takojšnjim tiskom fotografij. Neomejene fotografije, rekviziti in spletna galerija za poroke, poslovne dogodke in zasebna praznovanja po vsej Sloveniji.",
};

export function PhotoBoothHero({ copy = defaultCopy }: { copy?: ServiceHeroCopy }) {
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
          <h1 className="sr-only">{copy.h1}</h1>
          <p className="mb-7 text-[19px] sm:text-[23px]">
            <a href="#cenik" className="ev-tag transition-transform hover:-translate-y-0.5">
              <small>Paketi od</small> {BASE_PRICE} €
            </a>
          </p>
          <p aria-hidden="true" className="ev-display text-[clamp(42px,6vw,88px)] leading-[1.02]">
            {copy.title}
          </p>
          <p className="ev-lede mt-7 text-[var(--ev-porcelain)]/90">
            {copy.lede}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-5">
            <InquiryTrigger defaults={{ type: "Photo Booth" }} className="ev-btn ev-btn-primary">
              Pridobi ponudbo
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
          <p className="mt-3 max-w-[52ch] text-[14px] text-[var(--ev-mist)]">
            Med drugim so nam zaupali ŠKSG, AutoDelta, Forvis Mazars in Mlada Slovenija.
          </p>
        </div>
      </div>
    </section>
  );
}
