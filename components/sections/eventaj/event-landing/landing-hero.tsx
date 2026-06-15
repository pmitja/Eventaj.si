import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { EventLanding } from "@/content/eventaj/event-pages";
import Link from "next/link";
import { MediaPlaceholder } from "../shared/media-placeholder";

export function LandingHero({ landing }: { landing: EventLanding }) {
  return (
    <section className="bg-[var(--eventaj-paper)] px-5 pb-16 pt-28 text-center md:px-10 md:pb-20 md:pt-36">
      <div className="mx-auto max-w-7xl">
        <nav
          aria-label="Drobtinice"
          className="mb-7 flex justify-center gap-2 text-xs text-[var(--eventaj-muted)]"
        >
          <Link href="/" className="no-underline hover:text-[var(--eventaj-ink)]">
            Domov
          </Link>
          <span>/</span>
          <Link
            href={landing.productHref}
            className="no-underline hover:text-[var(--eventaj-ink)]"
          >
            {landing.productLabel}
          </Link>
          <span>/</span>
          <span className="text-[var(--eventaj-accent)]">
            {landing.breadcrumbLabel}
          </span>
        </nav>

        <div className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[var(--eventaj-accent)]">
          · {landing.eyebrow} ·
        </div>
        <h1 className="mx-auto max-w-[900px] font-serif-display text-[clamp(44px,7vw,92px)] font-[350] leading-[0.95] text-balance">
          {landing.title}{" "}
          <em className="font-serif-italic italic text-[var(--eventaj-accent)]">
            {landing.italicWord}
          </em>
          {landing.titleSuffix ? ` ${landing.titleSuffix}` : ""}.
        </h1>
        <p className="mx-auto mt-6 max-w-[560px] text-[16px] leading-relaxed text-[var(--eventaj-ink-2)] md:text-[17px]">
          {landing.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
          <InquiryTrigger className="rounded-full bg-[var(--eventaj-ink)] px-8 py-5 text-[15px] font-medium text-[var(--eventaj-paper)] transition-colors duration-200 hover:bg-[var(--eventaj-accent)]">
            Preveri prost termin →
          </InquiryTrigger>
          <div className="min-w-[86px] text-left">
            <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--eventaj-muted)]">
              od
            </div>
            <div className="mt-1 font-serif-display text-[34px] leading-none">
              {landing.price} €
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[13px] text-[var(--eventaj-muted)]">
          <span className="text-[var(--eventaj-accent)]">★★★★★</span>
          <span>{landing.proof}</span>
          <span>·</span>
          <span>Odgovorimo v 24 urah</span>
        </div>

        <div className="mx-auto mt-12 grid max-w-[1080px] gap-4 md:grid-cols-[1fr_1.4fr_1fr]">
          <MediaPlaceholder
            media={landing.heroImages[0]}
            sizes="(max-width: 768px) 100vw, 320px"
            className="hidden aspect-[4/3] rounded-xl bg-[var(--eventaj-paper-2)] md:block"
          />
          <MediaPlaceholder
            media={landing.heroImages[1]}
            sizes="(max-width: 768px) 100vw, 480px"
            className="aspect-[16/10] rounded-xl bg-[var(--eventaj-paper-2)]"
          />
          <MediaPlaceholder
            media={landing.heroImages[2]}
            sizes="(max-width: 768px) 100vw, 320px"
            className="hidden aspect-[4/3] rounded-xl bg-[var(--eventaj-paper-2)] md:block"
          />
        </div>
      </div>
    </section>
  );
}
