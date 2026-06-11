import { HeroDoodle } from "@/components/icons/HeroDoodle";
import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { homeStats } from "@/content/eventaj/data";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  HeroMobilePhoto,
  HeroPhotoItem,
  HeroPhotoStack,
} from "./hero-photo-stack";

const leftHeroPhotos: HeroPhotoItem[] = [
  {
    variant: 0,
    label: "Rojstnodnevna zabava s Photo Booth rekviziti",
    className: "w-full max-w-[380px] -rotate-[5deg]",
  },
  {
    variant: 6,
    label: "Skupinski Photo Booth posnetek pred zlatim ozadjem",
    className: "w-[86%] max-w-[330px] justify-self-end rotate-[4deg]",
  },
];

const rightHeroPhotos: HeroPhotoItem[] = [
  {
    variant: 1,
    label: "Elegantna zabava z Gatsby rekviziti",
    className: "w-full max-w-[380px] rotate-[5deg]",
  },
  {
    variant: 2,
    label: "Smešni Photo Booth rekviziti na podjetnem dogodku",
    className: "w-[86%] max-w-[330px] justify-self-start -rotate-[4deg]",
  },
];

export function HomeHero() {
  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-[var(--eventaj-paper)] pt-24"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 24%, rgba(184,85,58,0.06), transparent 34%), radial-gradient(circle at 80% 66%, rgba(166,134,74,0.08), transparent 34%), linear-gradient(90deg, rgba(244,239,230,0.82), rgba(251,248,242,0.4) 45%, rgba(244,239,230,0.82))",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3] mx-auto hidden w-full max-w-[1440px] min-[1440px]:block"
      >
        <HeroDoodle
          type="star"
          className="left-[24%] top-[15%] h-12 w-12 rotate-[-14deg] text-[var(--eventaj-ink)]"
        />
        <HeroDoodle
          type="spark"
          className="right-[24%] top-[11%] h-14 w-14 text-[var(--eventaj-gold)]"
        />
      </div>

      <div className="relative z-[5] mx-auto grid min-h-[calc(100vh-6rem)] w-full max-w-[1440px] items-center gap-10 px-5 pb-18 pt-10 md:px-10 md:pb-32 md:pt-14 min-[1440px]:grid-cols-[minmax(360px,1fr)_minmax(0,600px)_minmax(360px,1fr)] min-[1440px]:gap-6 min-[1440px]:px-0">
        <HeroPhotoStack photos={leftHeroPhotos} />

        <div className="mx-auto w-full max-w-[600px] text-center">
          <div className="mx-auto mb-8 grid max-w-[340px] grid-cols-2 gap-3 md:max-w-[420px] min-[1440px]:hidden">
            <HeroMobilePhoto
              variant={0}
              label="Druzinski Photo Booth spomin"
              rotate="-rotate-[4deg]"
            />
            <HeroMobilePhoto
              variant={2}
              label="Vesela zabava z rekviziti"
              rotate="rotate-[5deg]"
            />
          </div>

          <div className="mb-8 inline-flex max-w-full items-center gap-2.5 rounded-full border border-[rgba(20,17,15,0.15)] bg-[rgba(251,248,242,0.6)] px-3 py-2 text-[10px] uppercase tracking-[0.08em] text-[var(--eventaj-muted)] backdrop-blur-md sm:px-4 sm:text-xs sm:tracking-[0.12em]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--eventaj-accent)]" />
            Photo Booth najem · Slovenija
          </div>

          <h1 className="sr-only">
            Photo Booth Najem po Sloveniji - že od 279€ | Eventaj.si
          </h1>
          <div
            aria-hidden="true"
            className="font-serif-display text-[clamp(40px,7vw,96px)] font-[350] leading-[0.95] text-balance"
          >
            Spomini, ki <br className="md:hidden" />
            <em className="font-serif-italic italic text-[var(--eventaj-accent)]">
              trajajo
            </em>
            <br />
            dlje kot zabava
          </div>
          <p className="mx-auto mt-7 max-w-[300px] text-base leading-relaxed text-[var(--eventaj-ink-2)] md:max-w-[520px] md:text-[19px]">
            Photo Booth in 360° Booth za poroke, poslovne dogodke in zasebna
            praznovanja. Profesionalna izvedba, takojšen tisk in spomini, ki
            ostanejo še dolgo po dogodku.
          </p>

          <div className="mt-11 flex flex-wrap justify-center gap-3.5">
            <InquiryTrigger className="inline-flex items-center gap-3 rounded-full bg-[var(--eventaj-ink)] px-6 py-5 text-[15px] font-medium tracking-[0.02em] text-[var(--eventaj-paper)] transition-all hover:-translate-y-0.5 hover:bg-[var(--eventaj-accent)] sm:px-8">
              Pošlji povpraševanje
              <ArrowRight aria-hidden className="h-4 w-4" />
            </InquiryTrigger>
            <Link
              href="/cenik"
              className="inline-flex items-center gap-3 rounded-full border border-[rgba(20,17,15,0.2)] px-6 py-5 text-[15px] font-medium tracking-[0.02em] text-[var(--eventaj-ink)] no-underline transition-colors hover:border-[var(--eventaj-ink)] hover:bg-[var(--eventaj-ink)] hover:text-[var(--eventaj-paper)] sm:px-8"
            >
              Oglej si pakete
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>

          <div className="mx-auto mt-20 grid max-w-[600px] gap-5 md:gap-0 grid-cols-2 border-y border-[rgba(20,17,15,0.12)] py-7 md:grid-cols-4">
            {homeStats.map(([num, label], index) => (
              <div
                key={label}
                className={cn(
                  "px-3 text-center",
                  index > 0 && "md:border-l md:border-[rgba(20,17,15,0.1)]",
                  index % 2 === 1 &&
                    "border-l border-[rgba(20,17,15,0.1)] md:border-l",
                )}
              >
                <div className="font-serif-display text-[32px] leading-none">
                  {num}
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.08em] text-[var(--eventaj-muted)] sm:text-[11px] sm:tracking-[0.1em]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <HeroPhotoStack photos={rightHeroPhotos} align="end" />
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)] opacity-70 md:flex">
        <span>Scroll</span>
        <span className="h-8 w-px bg-[var(--eventaj-ink)] opacity-30" />
      </div>
    </section>
  );
}
