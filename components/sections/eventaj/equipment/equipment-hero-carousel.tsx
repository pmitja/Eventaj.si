"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type HeroProduct = {
  name: string;
  href: string;
  image: { src: string; alt: string };
};

const ROTATION_INTERVAL = 5000;

export function EquipmentHeroCarousel({ products }: { products: ReadonlyArray<HeroProduct> }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const showPrevious = useCallback(() => {
    setCurrent((index) => (index - 1 + products.length) % products.length);
  }, [products.length]);

  const showNext = useCallback(() => {
    setCurrent((index) => (index + 1) % products.length);
  }, [products.length]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || products.length < 2) return;

    const interval = window.setInterval(showNext, ROTATION_INTERVAL);
    return () => window.clearInterval(interval);
  }, [paused, products.length, reducedMotion, showNext]);

  if (products.length === 0) return null;

  const product = products[current];
  const nextProduct = products[(current + 1) % products.length];

  return (
    <div
      className="equipment-category-hero-media group relative overflow-hidden rounded-[4px] bg-[var(--eventaj-paper-2)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Izpostavljeni izdelki"
    >
      <Link href={product.href} className="absolute inset-0 block no-underline">
        <Image
          key={product.image.src}
          src={product.image.src}
          alt={product.image.alt}
          fill
          priority={current === 0}
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="equipment-hero-slide object-cover"
        />
      </Link>

      {products.length > 1 && nextProduct.image.src !== product.image.src && (
        <Image
          src={nextProduct.image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="invisible object-cover"
          aria-hidden="true"
        />
      )}

      <Link
        href={product.href}
        className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-[rgba(251,248,242,0.94)] px-4 py-2 text-xs font-medium !text-[var(--eventaj-ink)] no-underline backdrop-blur-md transition-colors hover:bg-[var(--eventaj-paper)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--eventaj-accent)] focus-visible:ring-offset-2 md:bottom-6 md:left-6"
        aria-live="polite"
      >
        {product.name} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>

      {products.length > 1 && (
        <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-[rgba(20,17,15,0.74)] p-1 text-white backdrop-blur-md md:bottom-6 md:right-6">
          <button
            type="button"
            onClick={showPrevious}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none"
            aria-label="Prejšnji izdelek"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="min-w-12 text-center text-[11px] tabular-nums" aria-live="polite">
            {current + 1} / {products.length}
          </span>
          <button
            type="button"
            onClick={showNext}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none"
            aria-label="Naslednji izdelek"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
