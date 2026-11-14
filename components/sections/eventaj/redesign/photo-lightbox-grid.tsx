"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

export type LightboxPhoto = { src: string; alt: string };

/**
 * A grid of photos that open full size in a lightbox. Each tile is a button; the lightbox
 * steps through every photo in the list (arrow keys or swipe), not only the visible tiles.
 */
export function PhotoLightboxGrid({
  photos,
  className,
  itemClassNames = [],
  sizes,
  framed = false,
}: {
  photos: LightboxPhoto[];
  className?: string;
  /** Extra classes per tile, by index (e.g. hiding tiles on small screens). */
  itemClassNames?: string[];
  sizes: string;
  /** Show each tile as a print: white border and a soft shadow. */
  framed?: boolean;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const [touchX, setTouchX] = useState<number | null>(null);
  const count = photos.length;

  const step = useCallback(
    (delta: number) => setIndex((current) => (current === null ? current : (current + delta + count) % count)),
    [count],
  );

  const current = index === null ? null : photos[index];

  return (
    <>
      <ul className={className}>
        {photos.map((photo, photoIndex) => {
          const image = (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={sizes}
              className="object-cover"
            />
          );
          return (
            <li
              key={photo.src}
              className={cn(
                "ev-photo relative",
                framed && "bg-white p-[3px] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.7)]",
                itemClassNames[photoIndex],
              )}
            >
              <button
                type="button"
                onClick={() => setIndex(photoIndex)}
                aria-label={`Povečaj fotografijo: ${photo.alt}`}
                className="absolute inset-0 block h-full w-full cursor-zoom-in rounded-[inherit] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ev-champagne)]"
              >
                {framed ? <span className="absolute inset-[3px] overflow-hidden rounded-[8px]">{image}</span> : image}
              </button>
            </li>
          );
        })}
      </ul>

      <DialogPrimitive.Root open={index !== null} onOpenChange={(open) => !open && setIndex(null)}>
        <DialogPrimitive.Portal>
          <div className="ev-tokens">
          <DialogPrimitive.Overlay className="fixed inset-0 z-[80] bg-[color-mix(in_srgb,var(--ev-night)_95%,transparent)] data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content
            aria-describedby={undefined}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") step(1);
              if (event.key === "ArrowLeft") step(-1);
            }}
            onTouchStart={(event) => setTouchX(event.touches[0].clientX)}
            onTouchEnd={(event) => {
              if (touchX === null) return;
              const delta = event.changedTouches[0].clientX - touchX;
              if (Math.abs(delta) > 50) step(delta < 0 ? 1 : -1);
              setTouchX(null);
            }}
            className="ev-dialog-tokens fixed inset-0 z-[81] flex items-center justify-center p-4 text-[var(--ev-porcelain)] outline-none sm:p-16 data-[state=open]:animate-in data-[state=open]:fade-in-0"
          >
            <DialogPrimitive.Title className="sr-only">{current?.alt ?? "Fotografija"}</DialogPrimitive.Title>
            {current && (
              <div className="relative h-full max-h-[86vh] w-full max-w-[1400px]">
                <Image
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            )}

            <p className="ev-tabular absolute bottom-5 left-1/2 -translate-x-1/2 text-[14px] text-[var(--ev-mist)]" aria-live="polite">
              {index !== null && `${index + 1} / ${count}`}
            </p>

            <DialogPrimitive.Close
              aria-label="Zapri"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--ev-porcelain)_12%,transparent)] transition-colors hover:bg-[color-mix(in_srgb,var(--ev-porcelain)_22%,transparent)]"
            >
              <X aria-hidden="true" strokeWidth={1.5} className="h-5 w-5" />
            </DialogPrimitive.Close>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Prejšnja fotografija"
                  className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--ev-porcelain)_12%,transparent)] transition-colors hover:bg-[color-mix(in_srgb,var(--ev-porcelain)_22%,transparent)] sm:left-5"
                >
                  <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Naslednja fotografija"
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--ev-porcelain)_12%,transparent)] transition-colors hover:bg-[color-mix(in_srgb,var(--ev-porcelain)_22%,transparent)] sm:right-5"
                >
                  <ChevronRight aria-hidden="true" strokeWidth={1.5} className="h-5 w-5" />
                </button>
              </>
            )}
          </DialogPrimitive.Content>
          </div>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}
