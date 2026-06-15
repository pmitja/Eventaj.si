import { EventLanding } from "@/content/eventaj/event-pages";
import { cn } from "@/lib/utils";
import { MediaPlaceholder } from "../shared/media-placeholder";

export function LandingGallery({ landing }: { landing: EventLanding }) {
  return (
    <section className="bg-[var(--eventaj-paper)] px-5 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
            {landing.galleryEyebrow}
          </div>
          <h2 className="font-serif-display text-[clamp(34px,4.2vw,56px)] font-[350] leading-none text-balance">
            Takole je{" "}
            <em className="font-serif-italic italic text-[var(--eventaj-accent)]">
              izgledalo
            </em>
            .
          </h2>
        </div>
        <div className="grid auto-rows-[150px] grid-cols-2 gap-3.5 md:grid-cols-4">
          {landing.galleryImages.map((image, index) => (
            <MediaPlaceholder
              key={image.alt}
              media={image}
              sizes="(max-width: 768px) 50vw, 320px"
              className={cn(
                "rounded-xl bg-[var(--eventaj-paper-2)]",
                (index % 6 === 0 || index % 6 === 2) && "row-span-2",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
