"use client";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type ProductImage = {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
};

export function ProductImageCarousel({
  images,
  productName,
}: {
  images: ReadonlyArray<ProductImage>;
  productName: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const syncCurrent = useCallback((carousel: CarouselApi) => {
    setCurrent(carousel?.selectedScrollSnap() ?? 0);
  }, []);

  useEffect(() => {
    if (!api) return;
    syncCurrent(api);
    api.on("select", syncCurrent);
    api.on("reInit", syncCurrent);
    return () => {
      api.off("select", syncCurrent);
      api.off("reInit", syncCurrent);
    };
  }, [api, syncCurrent]);

  return (
    <div className="w-full max-w-[680px] justify-self-center">
      <Carousel
        setApi={setApi}
        opts={{ loop: images.length > 1 }}
        aria-label={`Fotografije izdelka ${productName}`}
        className="group"
      >
        <CarouselContent className="ml-0">
          {images.map((image, index) => (
            <CarouselItem
              key={`${image.src}-${index}`}
              className="pl-0"
              aria-label={`${index + 1} od ${images.length}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-white">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 62vw, 100vw"
                  className={`${image.fit === "contain" ? "object-contain" : "object-cover"} ${current === index ? "equipment-product-slide-active" : ""}`}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[rgba(20,17,15,0.14)] bg-[rgba(251,248,242,0.92)] text-[var(--eventaj-ink)] shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-[var(--eventaj-paper)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--eventaj-accent)] focus-visible:ring-offset-2 motion-reduce:transition-none md:left-5"
              aria-label="Prejšnja fotografija"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[rgba(20,17,15,0.14)] bg-[rgba(251,248,242,0.92)] text-[var(--eventaj-ink)] shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-[var(--eventaj-paper)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--eventaj-accent)] focus-visible:ring-offset-2 motion-reduce:transition-none md:right-5"
              aria-label="Naslednja fotografija"
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="absolute right-3 top-3 rounded-full bg-[rgba(20,17,15,0.72)] px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm md:right-5 md:top-5" aria-live="polite">
              {current + 1} / {images.length}
            </span>
          </>
        )}
      </Carousel>

      {images.length > 1 && (
        <>
          <div className="mt-4 hidden grid-cols-3 gap-3 sm:grid" aria-label="Izberi fotografijo">
            {images.map((image, index) => (
              <button
                key={`${image.src}-thumbnail-${index}`}
                type="button"
                onClick={() => api?.scrollTo(index)}
                className={`relative aspect-[4/3] cursor-pointer overflow-hidden border-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--eventaj-accent)] focus-visible:ring-offset-2 motion-reduce:transition-none ${
                  current === index
                    ? "border-[var(--eventaj-ink)]"
                    : "border-transparent opacity-65 hover:opacity-100"
                }`}
                aria-label={`Prikaži fotografijo ${index + 1}`}
                aria-current={current === index ? "true" : undefined}
              >
                <Image src={image.src} alt="" fill sizes="(min-width: 1024px) 19vw, 30vw" className="object-cover" />
              </button>
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-2 sm:hidden" aria-label="Izbira fotografije">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => api?.scrollTo(index)}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--eventaj-accent)]"
                aria-label={`Prikaži fotografijo ${index + 1}`}
                aria-current={current === index ? "true" : undefined}
              >
                <span className={`h-2 rounded-full transition-[width,background-color] duration-200 motion-reduce:transition-none ${current === index ? "w-7 bg-[var(--eventaj-ink)]" : "w-2 bg-[rgba(20,17,15,0.28)]"}`} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
