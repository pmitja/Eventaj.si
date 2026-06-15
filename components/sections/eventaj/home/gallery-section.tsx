"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { galleryItems } from "@/content/eventaj/data";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { GalleryCardMedia, getGalleryCardClass } from "./gallery-card-media";

export function GallerySection() {
  const [active, setActive] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const lightboxItem =
    lightboxIndex === null ? null : galleryItems[lightboxIndex];

  const renderCard = (
    item: (typeof galleryItems)[number],
    index: number,
    layoutClass: string,
    key: string,
  ) => (
    <button
      key={key}
      type="button"
      onMouseEnter={() => setActive(index)}
      onMouseLeave={() => setActive(null)}
      onFocus={() => setActive(index)}
      onBlur={() => setActive(null)}
      onClick={(event) => {
        if (isMobile) {
          setLightboxIndex(index);
          return;
        }
        event.currentTarget.blur();
        setActive(null);
      }}
      aria-label={`Odpri referenco: ${item.label}`}
      className={cn(
        "group relative cursor-pointer overflow-hidden bg-[var(--eventaj-ink)] text-left shadow-[0_18px_45px_-30px_rgba(20,17,15,0.5)] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--eventaj-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--eventaj-paper-2)] motion-safe:hover:z-10 motion-safe:hover:scale-[1.035] motion-safe:hover:shadow-[0_32px_70px_-34px_rgba(20,17,15,0.65)]",
        layoutClass,
        active === index && "md:z-10 md:scale-[1.015]",
      )}
    >
      <GalleryCardMedia
        item={item}
        priority={index < 4}
        isActive={active === index}
      />
    </button>
  );

  return (
    <section
      id="reference"
      className="bg-[var(--eventaj-paper-2)] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-10">
          <div>
            <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
              Reference
            </div>
            <h2 className="max-w-[720px] font-serif-display text-[clamp(40px,5.5vw,76px)] font-[350] leading-none text-balance">
              Trenutki, ki{" "}
              <em className="font-serif-italic italic text-[var(--eventaj-accent)]">
                govorijo
              </em>{" "}
              sami zase.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[var(--eventaj-muted)]">
            Vsak dogodek je zgodba. Tukaj je nekaj trenutkov, ki smo jih ujeli v
            zadnjih 12 mesecih.
          </p>
        </div>
        {/* Mobile: horizontal swiper to avoid endless vertical scrolling */}
        <Carousel
          opts={{ align: "start", dragFree: true }}
          className="max-[767px]:block min-[768px]:hidden"
        >
          <CarouselContent className="-ml-3">
            {galleryItems.map((item, index) => (
              <CarouselItem
                key={`swipe-${item.label}-${index}`}
                className="basis-[82%] pl-3"
              >
                {renderCard(
                  item,
                  index,
                  "aspect-[4/5] w-full",
                  `swipe-card-${item.label}-${index}`,
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Tablet and desktop: bento grid */}
        <div className="hidden gap-4 overflow-visible min-[768px]:grid min-[768px]:grid-cols-2 lg:grid-flow-dense lg:auto-rows-[292px] lg:grid-cols-4">
          {galleryItems.map((item, index) =>
            renderCard(
              item,
              index,
              cn(
                getGalleryCardClass(item.type),
                "lg:h-full lg:[aspect-ratio:auto]",
              ),
              `grid-card-${item.label}-${index}`,
            ),
          )}
        </div>
      </div>

      <Dialog
        open={lightboxIndex !== null && isMobile}
        onOpenChange={(open) => {
          if (!open) setLightboxIndex(null);
        }}
      >
        <DialogContent className="w-[calc(100vw-24px)] max-w-none border-0 bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">
            {lightboxItem?.label ?? "Referenca"}
          </DialogTitle>
          {lightboxItem && (
            <div className="overflow-hidden rounded-[4px] bg-[var(--eventaj-ink)]">
              <div
                className="relative max-h-[82vh] w-full"
                style={{
                  aspectRatio:
                    lightboxItem.type === "video" ? "9 / 16" : "4 / 3",
                }}
              >
                {lightboxItem.type === "video" ? (
                  <video
                    aria-label={lightboxItem.alt}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={lightboxItem.poster}
                    className="h-full w-full object-contain"
                  >
                    <source src={lightboxItem.src} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={lightboxItem.src}
                    alt={lightboxItem.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                )}
              </div>
              <div className="px-4 py-3 text-[var(--eventaj-paper)]">
                <div className="text-[10px] uppercase tracking-[0.18em] opacity-70">
                  {lightboxItem.category}
                </div>
                <div className="mt-1 font-serif-italic text-xl italic">
                  {lightboxItem.label}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
