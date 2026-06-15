import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { serviceHeroVisuals, ServiceType } from "@/content/eventaj/service-visuals";
import { HeroProof } from "./hero-proof";
import { ServiceHeroRail } from "./service-hero-rail";

export function SubpageHero({
  tag,
  title,
  seoTitle,
  h1,
  italicWord,
  description,
  price,
  accent,
  visuals,
}: {
  tag: string;
  title: string;
  seoTitle: string;
  h1?: string;
  italicWord: string;
  description: string;
  price: number;
  accent: string;
  visuals: (typeof serviceHeroVisuals)[ServiceType];
}) {
  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[var(--eventaj-paper)] pb-8 pt-24 md:pb-10 md:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(251,248,242,0.95), rgba(244,239,230,0.78) 58%, rgba(251,248,242,0.98))",
        }}
      />

      <div className="relative z-[2] mx-auto flex w-full max-w-[980px] flex-1 flex-col items-center justify-center px-5 py-7 text-center md:px-10 md:py-12">
        <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-[rgba(20,17,15,0.15)] bg-[rgba(251,248,242,0.68)] px-4 py-2 text-[11px] uppercase tracking-[0.12em] text-[var(--eventaj-muted)] backdrop-blur-md md:text-xs">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: accent }}
          />
          {tag}
        </div>

        <h1 className="sr-only">{h1 ?? seoTitle}</h1>
        <div
          aria-hidden="true"
          className="mt-7 max-w-[900px] pb-2 font-serif-display text-[clamp(48px,9vw,118px)] font-[350] leading-[0.9] text-balance md:mt-9"
        >
          {title}{" "}
          <em className="font-serif-italic italic" style={{ color: accent }}>
            {italicWord}
          </em>
        </div>

        <p className="mt-5 max-w-[640px] text-[16px] leading-relaxed text-[var(--eventaj-ink-2)] md:mt-7 md:text-[19px]">
          {description}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-5 md:mt-10">
          <InquiryTrigger className="rounded-full bg-[var(--eventaj-ink)] px-8 py-5 text-[15px] font-medium text-[var(--eventaj-paper)] transition-colors duration-200 hover:bg-[var(--eventaj-accent)]">
            Pridobi ponudbo →
          </InquiryTrigger>
          <div className="min-w-[86px] text-left">
            <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--eventaj-muted)]">
              od
            </div>
            <div className="mt-1 font-serif-display text-[34px] leading-none">
              {price} €
            </div>
          </div>
        </div>

        <HeroProof accent={accent} />
      </div>

      <ServiceHeroRail visuals={visuals} accent={accent} />
    </section>
  );
}
