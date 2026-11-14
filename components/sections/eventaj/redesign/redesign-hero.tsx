"use client";

import { openInquiryDialog } from "@/components/inquiry/inquiry-trigger";
import { EVENTS_DONE, REVIEW_COUNT, REVIEW_RATING_LABEL } from "@/content/eventaj/proof";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";
import { HeroDatePicker, HeroOccasionSelect } from "./hero-booking-fields";
import { HeroSlide, HeroSlideControls, HeroSlideImages, useHeroSlides } from "./hero-slides";

const slides: ReadonlyArray<HeroSlide> = [
  { src: "/application/hero-collage/gatsby-party.webp", label: "Zabava v slogu Gatsby", position: "50% 30%" },
  { src: "/application/hero-collage/gold-group.webp", label: "Skupinska fotografija na zlatem ozadju", position: "55% 35%" },
  { src: "/application/hero-collage/green-boom.webp", label: "Rojstnodnevna zabava z baloni", position: "15% 30%" },
  { src: "/application/photo-booth-hero/druzba-z-napisi.webp", label: "Družba z lesenimi napisi", position: "50% 35%" },
  { src: "/application/wedding-photos/alja-in-rene.webp", label: "Alja in Rene", position: "50% 30%" },
  { src: "/application/birthday-parties/mitja-50.webp", label: "Mitja 50", position: "50% 30%" },
  { src: "/application/hero-collage/sanja-50.webp", label: "Sanja 50", position: "50% 30%" },
  { src: "/application/hero-collage/doba-35.webp", label: "Poslovni dogodek DOBA 35", position: "45% 30%" },
];

const occasions = [
  "Rojstni dan",
  "Poroka",
  "Poslovni dogodek",
  "Zasebna zabava",
  "Maturantski ples",
  "Drugi dogodek",
] as const;

export function RedesignHero() {
  const [date, setDate] = useState("");
  const [eventType, setEventType] = useState<string>("");
  const show = useHeroSlides(slides.length);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    openInquiryDialog({
      ...(date ? { date } : {}),
      ...(eventType ? { eventType } : {}),
    });
  };

  const proof = [
    `${REVIEW_RATING_LABEL} ★ na Googlu (${REVIEW_COUNT} ocen)`,
    `${EVENTS_DONE} izvedenih dogodkov`,
    "Ponudba v 24 urah",
  ];

  return (
    <section id="top" className="ev-dark relative isolate flex flex-col overflow-hidden sm:min-h-[min(100svh,1040px)]">
      {/* Desktop: the photograph holds the right two thirds and fades into the night on the left. */}
      <div className="absolute inset-y-0 right-0 -z-10 w-full overflow-hidden lg:w-[68%]" aria-hidden="true">
        <HeroSlideImages slides={slides} index={show.index} sizes="(max-width: 1023px) 160vh, 100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,13,23,0.3)_0%,rgba(28,13,23,0.5)_38%,rgba(28,13,23,0.94)_74%)] lg:bg-[linear-gradient(90deg,rgba(28,13,23,1)_0%,rgba(28,13,23,0.55)_22%,rgba(28,13,23,0)_48%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--ev-night)] to-transparent" />
      </div>

      <div className="ev-wrap flex flex-1 flex-col justify-end pb-12 pt-36 sm:pt-32 md:pb-16 lg:justify-center lg:pb-20">
        <div className="ev-rise max-w-[720px]">
          <p className="mb-7 flex flex-wrap items-center gap-2.5 text-[19px] sm:text-[23px]">
            <a href="#cenik" className="ev-tag transition-transform hover:-translate-y-0.5">
              <small>Photo Booth od</small> 299 €
            </a>
            <a href="#cenik" className="ev-tag ev-tag-berry transition-transform hover:-translate-y-0.5">
              <small>360° Booth od</small> 319 €
            </a>
          </p>
          <h1 className="ev-display text-[clamp(40px,5.8vw,84px)] leading-[1.02]">
            Spomini, ki trajajo <em>dlje kot zabava</em>
          </h1>
          <p className="ev-lede mt-7 text-[var(--ev-porcelain)]/90">
            Photo Booth s takojšnjim tiskom in 360° Booth za rojstne dneve, poroke in
            poslovne zabave. Pridemo, postavimo in ostanemo z vami ves večer, kjerkoli v Sloveniji.
          </p>

          <form
            onSubmit={submit}
            aria-label="Preveri prost termin"
            className="mt-10 grid border border-[var(--ev-rule-dark)] bg-[rgba(28,13,23,0.55)] backdrop-blur-md sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_auto]"
          >
            <div className="border-b border-[var(--ev-rule-dark)] sm:border-b-0 sm:border-r">
              <HeroDatePicker value={date} onChange={setDate} />
            </div>
            <div className="border-b border-[var(--ev-rule-dark)] sm:border-b-0">
              <HeroOccasionSelect value={eventType} onChange={setEventType} options={occasions} />
            </div>
            <button type="submit" className="ev-btn ev-btn-primary min-h-[56px] !rounded-none">
              Preveri termin
              <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-8">
            <HeroSlideControls slides={slides} {...show} />
          </div>

          <ul className="mt-6 flex flex-col gap-2 text-[14px] text-[var(--ev-mist)] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-0">
            {proof.map((item, index) => (
              <li
                key={item}
                className={cn("ev-tabular sm:pr-5", index > 0 && "sm:border-l sm:border-[var(--ev-rule-dark)] sm:pl-5")}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
