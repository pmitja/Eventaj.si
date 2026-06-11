"use client";

import { serviceHeroVisuals, ServiceType } from "@/content/eventaj/service-visuals";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function HeroReferenceCard({
  image,
  aspectClass,
  sizes,
  accent,
  priority = false,
  playVideo = false,
  className,
}: {
  image: (typeof serviceHeroVisuals)[ServiceType]["images"][number];
  aspectClass: string;
  sizes: string;
  accent: string;
  priority?: boolean;
  playVideo?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "group relative min-w-0 overflow-hidden rounded-[4px] border border-[rgba(20,17,15,0.1)] bg-[var(--eventaj-ink)] shadow-[0_34px_80px_-42px_rgba(20,17,15,0.78)]",
        aspectClass,
        className,
      )}
    >
      {"type" in image && image.type === "video" ? (
        <video
          aria-label={image.alt}
          autoPlay={playVideo}
          loop
          muted
          playsInline
          poster={image.poster}
          preload={playVideo || priority ? "auto" : "metadata"}
          onLoadedMetadata={(event) => {
            event.currentTarget.currentTime = 2.5;
          }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.025]"
        >
          <source src={image.src} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          unoptimized
          sizes={sizes}
          className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.025]"
        />
      )}
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(20,17,15,0.78)] via-[rgba(20,17,15,0.24)] to-transparent px-4 pb-4 pt-14 text-[var(--eventaj-paper)] md:px-5 md:pb-5">
        <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] drop-shadow-sm">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: accent }}
          />
          {image.label}
        </span>
      </figcaption>
    </figure>
  );
}
