import { booth360EventCards } from "@/content/eventaj/event-pages";
import Link from "next/link";
import { MediaPlaceholder } from "../shared/media-placeholder";

export function Booth360EventTypes() {
  return (
    <section className="bg-[var(--eventaj-paper-2)] px-5 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <div>
            <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
              Vsak dogodek, svoj video
            </div>
            <h2 className="max-w-[560px] font-serif-display text-[clamp(36px,4.8vw,64px)] font-[350] leading-none text-balance">
              360° Booth za{" "}
              <em className="font-serif-italic italic text-[var(--eventaj-accent)]">
                nepozabne
              </em>{" "}
              trenutke.
            </h2>
          </div>
          <p className="max-w-[320px] text-[15px] leading-relaxed text-[var(--eventaj-ink-2)]">
            Od prvega plesa do festivalskega odra — poglejte, kje 360° Booth
            naredi največji vtis.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {booth360EventCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative flex aspect-[9/15] flex-col justify-end overflow-hidden rounded-xl bg-[var(--eventaj-ink)] p-5 no-underline transition-transform duration-300 hover:-translate-y-1.5"
            >
              <MediaPlaceholder
                media={card.image}
                sizes="(max-width: 768px) 50vw, 280px"
                dark
                className="absolute inset-0"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[rgba(20,17,15,0.85)] to-transparent" />
              <div className="relative">
                <h3 className="font-serif-display text-2xl font-normal leading-tight text-[var(--eventaj-paper)]">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-snug text-[var(--eventaj-cream)] opacity-75">
                  {card.desc}
                </p>
                <span className="mt-3 inline-block text-[13px] font-semibold text-[#E8B584]">
                  {card.cta} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
