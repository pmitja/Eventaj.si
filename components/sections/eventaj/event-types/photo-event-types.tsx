import { photoEventCards } from "@/content/eventaj/event-pages";
import Link from "next/link";
import { MediaPlaceholder } from "../shared/media-placeholder";

function EventCard({
  card,
}: {
  card: (typeof photoEventCards)[number];
}) {
  const large = card.size === "large";
  return (
    <Link
      href={card.href}
      className="group flex flex-col overflow-hidden rounded-xl border border-[rgba(20,17,15,0.1)] bg-[var(--eventaj-paper)] no-underline transition-transform duration-300 hover:-translate-y-1"
    >
      <MediaPlaceholder
        media={card.image}
        sizes={large ? "(max-width: 768px) 100vw, 640px" : "(max-width: 768px) 100vw, 420px"}
        className={large ? "aspect-[16/9] bg-[var(--eventaj-paper-2)]" : "aspect-[3/2] bg-[var(--eventaj-paper-2)]"}
      />
      <div className={large ? "p-7" : "p-6"}>
        <h3
          className={
            large
              ? "font-serif-display text-[27px] font-normal leading-tight"
              : "font-serif-display text-[22px] font-normal leading-tight"
          }
        >
          {card.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--eventaj-ink-2)]">
          {card.desc}
        </p>
        <span className="mt-4 inline-block text-sm font-semibold text-[var(--eventaj-accent)]">
          {card.cta} →
        </span>
      </div>
    </Link>
  );
}

export function PhotoEventTypes() {
  const large = photoEventCards.filter((card) => card.size === "large");
  const small = photoEventCards.filter((card) => card.size === "small");
  return (
    <section className="bg-[var(--eventaj-paper-2)] px-5 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
            Za vsak dogodek
          </div>
          <h2 className="font-serif-display text-[clamp(36px,4.8vw,64px)] font-[350] leading-none text-balance">
            Photo Booth za{" "}
            <em className="font-serif-italic italic text-[var(--eventaj-accent)]">
              vsak tip
            </em>{" "}
            dogodka.
          </h2>
          <p className="mx-auto mt-5 max-w-[520px] text-[16px] leading-relaxed text-[var(--eventaj-ink-2)]">
            Vsak dogodek ima svojo zgodbo. Poglejte, kako Photo Booth zaživi na
            vašem.
          </p>
        </div>
        <div className="mb-5 grid gap-5 md:grid-cols-2">
          {large.map((card) => (
            <EventCard key={card.href} card={card} />
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {small.map((card) => (
            <EventCard key={card.href} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
