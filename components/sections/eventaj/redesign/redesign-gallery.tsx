"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { galleryItems } from "@/content/eventaj/data";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Item = (typeof galleryItems)[number];

// Grid order for three columns: tall videos and photos are interleaved so every row closes without a gap.
const gridOrder = (() => {
  const indexed = galleryItems.map((item, index) => ({ item, index }));
  const videos = indexed.filter((entry) => entry.item.type === "video");
  const photos = indexed.filter((entry) => entry.item.type !== "video");
  const pattern = "VVVPPPVPVP";
  const ordered: typeof indexed = [];
  for (const slot of pattern) {
    const next = slot === "V" ? videos.shift() : photos.shift();
    if (next) ordered.push(next);
  }
  return [...ordered, ...videos, ...photos];
})();

function TileMedia({ item, active }: { item: Item; active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [active]);

  if (item.type === "video") {
    return (
      <>
        <video
          ref={videoRef}
          aria-hidden="true"
          muted
          loop
          playsInline
          poster={item.poster}
          preload="none"
          className="h-full w-full object-cover"
        >
          <source src={item.src} type="video/mp4" />
        </video>
        <span
          aria-hidden="true"
          className={cn(
            "absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 text-white transition-opacity",
            active && "opacity-0",
          )}
        >
          <Play strokeWidth={1.5} className="ml-0.5 h-3.5 w-3.5 fill-current" />
        </span>
      </>
    );
  }

  return (
    <Image
      src={item.src}
      alt=""
      fill
      sizes="(max-width: 767px) 80vw, (max-width: 1023px) 45vw, 25vw"
      className="object-cover"
    />
  );
}

export function RedesignGallery() {
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const openItem = open === null ? null : galleryItems[open];

  const tile = (item: Item, index: number, layout: string) => (
    <button
      type="button"
      key={`${item.src}-${index}`}
      onMouseEnter={() => setActive(index)}
      onMouseLeave={() => setActive(null)}
      onFocus={() => setActive(index)}
      onBlur={() => setActive(null)}
      onClick={() => setOpen(index)}
      aria-label={`Odpri referenco: ${item.label}, ${item.category}`}
      className={cn("ev-photo group relative block w-full cursor-zoom-in text-left", layout)}
    >
      <span className="absolute inset-0">
        <TileMedia item={item} active={active === index} />
      </span>
    </button>
  );

  return (
    <section id="reference" aria-labelledby="ev-gallery-title" className="ev-dark py-24 md:py-36">
      <div className="ev-wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="ev-gallery-title" className="ev-display ev-h2 lg:col-span-7">
            Trenutki, ki <em>govorijo</em> sami zase
          </h2>
          <p className="ev-lede text-[var(--ev-mist)] lg:col-span-4 lg:col-start-9">
            Vsak dogodek je zgodba. Tukaj je nekaj trenutkov, ki smo jih ujeli v zadnjih 12 mesecih.
          </p>
        </div>

        {/* Phones: one row you swipe through. */}
        <div className="-mx-[var(--ev-gutter)] mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--ev-gutter)] pb-4 md:hidden">
          {galleryItems.map((item, index) => (
            <div key={`m-${item.src}-${index}`} className="w-[78%] shrink-0 snap-center">
              {tile(item, index, "aspect-[4/5]")}
            </div>
          ))}
        </div>

        {/* Tablet and up: a strict three-column grid, videos run two rows tall. */}
        <div className="mt-16 hidden gap-3 md:grid md:auto-rows-[200px] md:grid-cols-3 md:[grid-auto-flow:dense] lg:auto-rows-[260px] xl:auto-rows-[300px]">
          {gridOrder.map(({ item, index }) =>
            tile(item, index, item.type === "video" ? "row-span-2 h-full" : "h-full"),
          )}
        </div>
      </div>

      <Dialog open={openItem !== null} onOpenChange={(value) => !value && setOpen(null)}>
        <DialogContent className="ev-tokens w-[calc(100vw-24px)] max-w-[920px] rounded-none border-0 bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{openItem?.label ?? "Referenca"}</DialogTitle>
          {openItem && (
            <figure className="bg-[var(--ev-night)] p-2">
              <div
                className="relative mx-auto max-h-[78vh] w-full bg-black"
                style={{ aspectRatio: openItem.type === "video" ? "9 / 16" : "4 / 3", maxWidth: openItem.type === "video" ? "44vh" : undefined }}
              >
                {openItem.type === "video" ? (
                  <video aria-label={openItem.alt} controls autoPlay loop muted playsInline poster={openItem.poster} className="h-full w-full object-contain">
                    <source src={openItem.src} type="video/mp4" />
                  </video>
                ) : (
                  <Image src={openItem.src} alt={openItem.alt} fill sizes="920px" className="object-contain" />
                )}
              </div>
              <figcaption className="flex items-baseline justify-between gap-4 px-2 pb-1 pt-3 text-[var(--ev-porcelain)]">
                <span className="ev-display text-[24px] leading-none">{openItem.label}</span>
                <span className="text-[12px] uppercase tracking-[0.14em] text-[var(--ev-mist)]">{openItem.category}</span>
              </figcaption>
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
