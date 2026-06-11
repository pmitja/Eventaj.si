"use client";

import { serviceVisualStories, ServiceType } from "@/content/eventaj/service-visuals";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function ServiceVisualStory({
  type,
  accent,
}: {
  type: ServiceType;
  accent: string;
}) {
  const story = serviceVisualStories[type];

  return (
    <section className="overflow-hidden bg-[var(--eventaj-ink)] px-5 py-24 text-[var(--eventaj-paper)] md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-20">
        <div>
          <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-cream)] opacity-60">
            {story.eyebrow}
          </div>
          <h2 className="font-serif-display text-[clamp(36px,4.8vw,68px)] font-[350] leading-none text-balance">
            {story.title}
          </h2>
          <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-[var(--eventaj-cream)] opacity-75">
            {story.description}
          </p>
          <div className="mt-10 grid max-w-[520px] grid-cols-3 border-y border-[rgba(244,239,230,0.16)] py-6">
            {story.images.map((image, index) => (
              <div
                key={image.label}
                className={cn(
                  "px-3",
                  index > 0 && "border-l border-[rgba(244,239,230,0.14)]",
                )}
              >
                <div
                  className="font-serif-display text-3xl leading-none"
                  style={{ color: accent }}
                >
                  0{index + 1}
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.12em] text-[var(--eventaj-cream)] opacity-60">
                  {image.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.25fr_0.75fr] md:gap-5">
          <figure className="relative min-h-[420px] overflow-hidden rounded-[4px] bg-[rgba(244,239,230,0.08)] shadow-[0_44px_90px_-42px_rgba(0,0,0,0.9)] md:min-h-[620px]">
            <StoryReferenceMedia
              media={story.images[0]}
              sizes="(max-width: 768px) 100vw, 760px"
              autoPlay
            />
            <figcaption className="absolute inset-x-5 bottom-5 text-[11px] uppercase tracking-[0.18em] text-[var(--eventaj-paper)] drop-shadow">
              {story.images[0].label}
            </figcaption>
          </figure>

          <div className="grid gap-4 md:gap-5">
            {story.images.slice(1).map((image) => (
              <figure
                key={image.src}
                className="relative min-h-[240px] overflow-hidden rounded-[4px] bg-[rgba(244,239,230,0.08)] md:min-h-0"
              >
                <StoryReferenceMedia
                  media={image}
                  sizes="(max-width: 768px) 100vw, 420px"
                  autoPlay
                />
                <figcaption className="absolute inset-x-4 bottom-4 text-[10px] uppercase tracking-[0.16em] text-[var(--eventaj-paper)] drop-shadow">
                  {image.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryReferenceMedia({
  media,
  sizes,
  autoPlay = false,
}: {
  media: (typeof serviceVisualStories)[ServiceType]["images"][number];
  sizes: string;
  autoPlay?: boolean;
}) {
  if ("type" in media && media.type === "video") {
    return (
      <video
        aria-label={media.alt}
        autoPlay={autoPlay}
        loop
        muted
        playsInline
        poster={media.poster}
        preload={autoPlay ? "auto" : "metadata"}
        onLoadedMetadata={(event) => {
          event.currentTarget.currentTime = 2.5;
        }}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={media.src} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      sizes={sizes}
      className="object-cover"
    />
  );
}
