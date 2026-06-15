import { homeEventTeasers } from "@/content/eventaj/event-pages";
import Link from "next/link";
import { MediaPlaceholder } from "../shared/media-placeholder";

export function HomeEventTeaser() {
  return (
    <section className="bg-[var(--eventaj-paper-2)] px-5 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
          <h2 className="font-serif-display text-[clamp(32px,4vw,52px)] font-[350] leading-tight text-balance">
            Kateri dogodek{" "}
            <em className="font-serif-italic italic text-[var(--eventaj-accent)]">
              načrtujete
            </em>
            ?
          </h2>
          <p className="text-sm text-[var(--eventaj-muted)] md:mb-2">
            Photo Booth in 360° Booth, prilagojena vašemu dogodku.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {homeEventTeasers.map((teaser) => (
            <Link
              key={teaser.href}
              href={teaser.href}
              className="group no-underline transition-transform duration-300 hover:-translate-y-1"
            >
              <MediaPlaceholder
                media={teaser.image}
                sizes="(max-width: 768px) 50vw, 220px"
                className="mb-3 aspect-[1/1.15] rounded-[10px] bg-[var(--eventaj-paper)]"
              />
              <span className="flex items-center justify-between text-[14.5px] font-semibold text-[var(--eventaj-ink)]">
                {teaser.label}
                <span className="text-[var(--eventaj-accent)]">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
