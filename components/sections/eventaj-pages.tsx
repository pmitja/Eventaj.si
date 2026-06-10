"use client";

import {
  addons,
  booth360Features,
  booth360Packages,
  booth360Specs,
  faqItems,
  galleryItems,
  homeStats,
  marqueeItems,
  photoFeatures,
  photoPackages,
  photoSpecs,
  processSteps,
  services,
  testimonials,
} from "@/content/eventaj/data";
import { PhotoScene } from "@/components/media/photo-scene";
import { InquiryTrigger, TrustLogosText } from "@/components/layout/site-shell";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function HomePageContent() {
  return (
    <main>
      <HomeHero />
      <Marquee />
      <ServicesSection />
      <ProcessSection />
      <GallerySection />
      <TestimonialsSection />
      <PricingConfigurator compact />
      <FAQSection />
    </main>
  );
}

function HomeHero() {
  const leftHeroPhotos = [
    {
      variant: 0,
      label: "Rojstnodnevna zabava s Photo Booth rekviziti",
      className: "w-full max-w-[380px] -rotate-[5deg]",
    },
    {
      variant: 6,
      label: "Skupinski Photo Booth posnetek pred zlatim ozadjem",
      className: "w-[86%] max-w-[330px] justify-self-end rotate-[4deg]",
    },
  ];

  const rightHeroPhotos = [
    {
      variant: 1,
      label: "Elegantna zabava z Gatsby rekviziti",
      className: "w-full max-w-[380px] rotate-[5deg]",
    },
    {
      variant: 2,
      label: "Smešni Photo Booth rekviziti na podjetnem dogodku",
      className: "w-[86%] max-w-[330px] justify-self-start -rotate-[4deg]",
    },
  ];

  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-[var(--eventaj-paper)] pt-24"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 24%, rgba(184,85,58,0.06), transparent 34%), radial-gradient(circle at 80% 66%, rgba(166,134,74,0.08), transparent 34%), linear-gradient(90deg, rgba(244,239,230,0.82), rgba(251,248,242,0.4) 45%, rgba(244,239,230,0.82))",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3] mx-auto hidden w-full max-w-[1440px] min-[1440px]:block"
      >
        <HeroDoodle
          type="star"
          className="left-[24%] top-[15%] h-12 w-12 rotate-[-14deg] text-[var(--eventaj-ink)]"
        />
        <HeroDoodle
          type="spark"
          className="right-[24%] top-[11%] h-14 w-14 text-[var(--eventaj-gold)]"
        />
      </div>

      <div className="relative z-[5] mx-auto grid min-h-[calc(100vh-6rem)] w-full max-w-[1440px] items-center gap-10 px-5 pb-18 pt-10 md:px-10 md:pb-32 md:pt-14 min-[1440px]:grid-cols-[minmax(360px,1fr)_minmax(0,600px)_minmax(360px,1fr)] min-[1440px]:gap-6 min-[1440px]:px-0">
        <HeroPhotoStack photos={leftHeroPhotos} />

        <div className="mx-auto w-full max-w-[600px] text-center">
          <div className="mx-auto mb-8 grid max-w-[340px] grid-cols-2 gap-3 md:max-w-[420px] min-[1440px]:hidden">
            <HeroMobilePhoto
              variant={0}
              label="Druzinski Photo Booth spomin"
              rotate="-rotate-[4deg]"
            />
            <HeroMobilePhoto
              variant={2}
              label="Vesela zabava z rekviziti"
              rotate="rotate-[5deg]"
            />
          </div>

          <div className="mb-8 inline-flex max-w-full items-center gap-2.5 rounded-full border border-[rgba(20,17,15,0.15)] bg-[rgba(251,248,242,0.6)] px-3 py-2 text-[10px] uppercase tracking-[0.08em] text-[var(--eventaj-muted)] backdrop-blur-md sm:px-4 sm:text-xs sm:tracking-[0.12em]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--eventaj-accent)]" />
            Photo Booth najem · Slovenija
          </div>

          <h1 className="sr-only">
            Photo Booth Najem po Sloveniji - že od 279€ | Eventaj.si
          </h1>
          <div
            aria-hidden="true"
            className="font-serif-display text-[clamp(40px,7vw,96px)] font-[350] leading-[0.95] text-balance"
          >
            Spomini, ki <br className="md:hidden" />
            <em className="font-serif-italic italic text-[var(--eventaj-accent)]">
              trajajo
            </em>
            <br />
            dlje kot zabava
          </div>
          <p className="mx-auto mt-7 max-w-[300px] text-base leading-relaxed text-[var(--eventaj-ink-2)] md:max-w-[520px] md:text-[19px]">
            Photo Booth in 360° Booth za poroke, poslovne dogodke in zasebna
            praznovanja. Profesionalna izvedba, takojšen tisk in spomini, ki
            ostanejo še dolgo po dogodku.
          </p>

          <div className="mt-11 flex flex-wrap justify-center gap-3.5">
            <InquiryTrigger className="inline-flex items-center gap-3 rounded-full bg-[var(--eventaj-ink)] px-6 py-5 text-[15px] font-medium tracking-[0.02em] text-[var(--eventaj-paper)] transition-all hover:-translate-y-0.5 hover:bg-[var(--eventaj-accent)] sm:px-8">
              Pošlji povpraševanje
              <ArrowRight aria-hidden className="h-4 w-4" />
            </InquiryTrigger>
            <Link
              href="/cenik"
              className="inline-flex items-center gap-3 rounded-full border border-[rgba(20,17,15,0.2)] px-6 py-5 text-[15px] font-medium tracking-[0.02em] text-[var(--eventaj-ink)] no-underline transition-colors hover:border-[var(--eventaj-ink)] hover:bg-[var(--eventaj-ink)] hover:text-[var(--eventaj-paper)] sm:px-8"
            >
              Oglej si pakete
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>

          <div className="mx-auto mt-20 grid max-w-[600px] gap-5 md:gap-0 grid-cols-2 border-y border-[rgba(20,17,15,0.12)] py-7 md:grid-cols-4">
            {homeStats.map(([num, label], index) => (
              <div
                key={label}
                className={cn(
                  "px-3 text-center",
                  index > 0 && "md:border-l md:border-[rgba(20,17,15,0.1)]",
                  index % 2 === 1 &&
                    "border-l border-[rgba(20,17,15,0.1)] md:border-l",
                )}
              >
                <div className="font-serif-display text-[32px] leading-none">
                  {num}
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.08em] text-[var(--eventaj-muted)] sm:text-[11px] sm:tracking-[0.1em]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <HeroPhotoStack photos={rightHeroPhotos} align="end" />
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)] opacity-70 md:flex">
        <span>Scroll</span>
        <span className="h-8 w-px bg-[var(--eventaj-ink)] opacity-30" />
      </div>
    </section>
  );
}

type HeroPhotoItem = {
  variant: number;
  label: string;
  className: string;
};

function HeroPhotoStack({
  photos,
  align = "start",
}: {
  photos: HeroPhotoItem[];
  align?: "start" | "end";
}) {
  return (
    <div
      className={cn(
        "hidden content-center gap-9 min-[1440px]:grid",
        align === "end" ? "justify-items-end pr-6" : "justify-items-start pl-6",
      )}
    >
      {photos.map((photo) => (
        <HeroStackPhoto key={photo.label} {...photo} />
      ))}
    </div>
  );
}

function HeroStackPhoto({ variant, label, className }: HeroPhotoItem) {
  return (
    <div
      className={cn(
        "pointer-events-none relative rounded-[3px] bg-white p-2 pb-8 shadow-[0_28px_70px_-24px_rgba(20,17,15,0.62),0_8px_18px_-10px_rgba(20,17,15,0.45)]",
        className,
      )}
    >
      <div className="aspect-[4/3] overflow-hidden bg-[var(--eventaj-ink)]">
        <PhotoScene variant={variant} label={label} />
      </div>
      <div className="absolute inset-x-0 bottom-2.5 text-center font-serif-italic text-[10px] italic tracking-[0.04em] text-[rgba(20,17,15,0.45)]">
        eventaj.si
      </div>
    </div>
  );
}

function HeroMobilePhoto({
  variant,
  label,
  rotate,
}: {
  variant: number;
  label: string;
  rotate: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[3px] bg-white p-1.5 pb-5 shadow-[0_20px_50px_-24px_rgba(20,17,15,0.58)]",
        rotate,
      )}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <PhotoScene variant={variant} label={label} />
      </div>
    </div>
  );
}

function HeroDoodle({
  type,
  className,
}: {
  type: "star" | "loop" | "spark" | "confetti" | "balloons";
  className: string;
}) {
  const props = {
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: cn(
      "pointer-events-none absolute z-[3] hidden md:block",
      className,
    ),
    "aria-hidden": true,
  };

  if (type === "star") {
    return (
      <svg {...props}>
        <path d="M32 6l6.7 18.2L58 25.2 42.7 37.1 47.7 56 32 45.2 16.3 56l5-18.9L6 25.2l19.3-1L32 6z" />
      </svg>
    );
  }

  if (type === "loop") {
    return (
      <svg {...props}>
        <path d="M17 44c10 8 24 3 23-7-.7-7.4-12.8-7.8-15.8-1.2-4.1 9 10.9 13.6 20.8 2.2 6.2-7.2 2.2-17.4-7.6-18.4" />
        <path d="M36 19c-4.4-.8-7.8.4-10 3.5" />
      </svg>
    );
  }

  if (type === "spark") {
    return (
      <svg {...props}>
        <path d="M32 8v10M32 46v10M8 32h10M46 32h10M15 15l7 7M42 42l7 7M49 15l-7 7M22 42l-7 7" />
        <circle cx="32" cy="32" r="3" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === "balloons") {
    return (
      <svg {...props}>
        <ellipse
          cx="23"
          cy="20"
          rx="11"
          ry="15"
          fill="currentColor"
          opacity="0.2"
        />
        <ellipse
          cx="41"
          cy="17"
          rx="10"
          ry="14"
          fill="currentColor"
          opacity="0.16"
        />
        <path d="M23 35c0 9-10 10-8 19M41 31c0 11 8 12 5 23" />
        <path d="M20 35h6M38 31h6" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M15 36c8-12 2-17-4-11M29 15c5 12 15 11 18 2M33 49c9-5 12 0 15 5" />
      <path d="M16 50l4-3M48 36l5 2M24 24l3-5" />
    </svg>
  );
}

function Marquee() {
  const content = [...marqueeItems, ...marqueeItems, ...marqueeItems];
  return (
    <div className="overflow-hidden border-y border-[rgba(244,239,230,0.1)] bg-[var(--eventaj-ink)] py-5 text-[var(--eventaj-paper)]">
      <div className="flex w-max gap-14 whitespace-nowrap motion-safe:animate-[eventaj-marquee_40s_linear_infinite]">
        {content.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-14"
          >
            <span className="font-serif-italic text-[32px] font-light italic">
              {item}
            </span>
            <span className="text-sm opacity-40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ServicesSection() {
  return (
    <section className="bg-[var(--eventaj-paper)]">
      <div className="px-5 pt-16 lg:pt-28 lg:text-center md:px-10">
        <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
          Naša ponudba
        </div>
        <h2 className="font-serif-display text-[clamp(40px,6vw,80px)] font-[350] leading-none text-balance">
          Dva načina ustvarjanja{" "}
          <em className="font-serif-italic italic">spominov.</em>
        </h2>
      </div>
      {services.map((service) => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </section>
  );
}

function ServiceCard({
  id,
  tag,
  title,
  italicWord,
  description,
  features,
  price,
  accent,
  media,
  href,
  reverse,
}: (typeof services)[number] & { reverse?: boolean }) {
  return (
    <div id={id} className="border-b border-[rgba(20,17,15,0.1)]">
      <div
        className={cn(
          "mx-auto grid max-w-[1560px] gap-12 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-16 xl:gap-20 xl:px-20",
          reverse && "lg:[direction:rtl]",
        )}
      >
        <div className="lg:[direction:ltr]">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-7 bg-[var(--eventaj-ink)]" />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
              {tag}
            </span>
          </div>
          <h2 className="font-serif-display text-[clamp(46px,7vw,68px)] font-[350] leading-none text-balance">
            {title}{" "}
            <em className="font-serif-italic italic" style={{ color: accent }}>
              {italicWord}
            </em>
          </h2>
          <p className="mt-7 max-w-[480px] text-lg leading-relaxed text-[var(--eventaj-ink-2)]">
            {description}
          </p>
          <ul className="mt-9 grid gap-3.5">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-baseline gap-3.5 text-[15px] text-[var(--eventaj-ink-2)]"
              >
                <span
                  className="font-serif-italic text-lg italic"
                  style={{ color: accent }}
                >
                  —
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-11 flex flex-wrap items-center gap-4">
            <InquiryTrigger className="rounded-full bg-[var(--eventaj-ink)] px-7 py-4 text-sm font-medium text-[var(--eventaj-paper)] transition-colors hover:bg-[var(--eventaj-accent)]">
              Pridobi ponudbo →
            </InquiryTrigger>
            <Link
              href={href}
              className="border-b border-[rgba(20,17,15,0.3)] pb-0.5 text-sm no-underline"
            >
              Več podrobnosti →
            </Link>
            <div className="ml-auto">
              <div className="text-[11px] uppercase tracking-[0.12em] text-[var(--eventaj-muted)]">
                od
              </div>
              <div className="mt-1 font-serif-display text-4xl leading-none">
                {price} €
              </div>
            </div>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[560px] xl:max-w-[600px] lg:[direction:ltr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.4)]">
            <ServiceCardMedia media={media[0]} priority />
          </div>
          <div
            className={cn(
              "absolute bottom-[-24px] w-[48%] overflow-hidden rounded-[4px] border-[7px] border-[var(--eventaj-paper)] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)] md:bottom-[-30px] md:border-[8px]",
              reverse
                ? "right-[-12px] md:right-[-28px]"
                : "left-[-12px] md:left-[-28px]",
            )}
          >
            <div className="aspect-[4/5]">
              <ServiceCardMedia media={media[1]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCardMedia({
  media,
  priority = false,
}: {
  media: (typeof services)[number]["media"][number];
  priority?: boolean;
}) {
  if (media.type === "video") {
    return (
      <video
        aria-label={media.alt}
        autoPlay
        loop
        muted
        playsInline
        poster={media.poster}
        preload={priority ? "auto" : "metadata"}
        className="h-full w-full object-cover"
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
      priority={priority}
      fetchPriority={priority ? "high" : undefined}
      sizes="(max-width: 1023px) 90vw, 600px"
      className="object-cover"
    />
  );
}

function ProcessSection() {
  return (
    <section className="bg-[var(--eventaj-ink)] px-5 py-24 text-[var(--eventaj-paper)] md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-10">
          <div>
            <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-cream)] opacity-60">
              Kako poteka
            </div>
            <h2 className="max-w-[800px] font-serif-display text-[clamp(40px,5.5vw,76px)] font-[350] leading-none text-balance">
              Trije{" "}
              <em className="font-serif-italic italic text-[#E8B584]">
                preprosti
              </em>{" "}
              koraki do nepozabnega dogodka.
            </h2>
          </div>
        </div>
        <div className="grid md:grid-cols-3">
          {processSteps.map((step, index) => (
            <div
              key={step.n}
              className={cn(
                "px-0 py-9 md:px-9 md:py-12",
                index > 0 &&
                  "border-t border-[rgba(244,239,230,0.15)] md:border-l md:border-t-0",
              )}
            >
              <div className="mb-7 font-serif-italic text-lg italic text-[#E8B584]">
                {step.n}
              </div>
              <h3 className="font-serif-display text-[28px] font-normal leading-tight">
                {step.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--eventaj-cream)] opacity-75">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const [active, setActive] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const lightboxItem =
    lightboxIndex === null ? null : galleryItems[lightboxIndex];

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
        <div className="grid grid-cols-1 gap-4 overflow-visible sm:grid-cols-2 lg:grid-flow-dense lg:auto-rows-[292px] lg:grid-cols-4">
          {galleryItems.map((item, index) => (
            <button
              key={`${item.label}-${index}`}
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
                "group relative cursor-pointer overflow-hidden bg-[var(--eventaj-ink)] text-left shadow-[0_18px_45px_-30px_rgba(20,17,15,0.5)] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--eventaj-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--eventaj-paper-2)] lg:h-full lg:[aspect-ratio:auto] motion-safe:hover:z-10 motion-safe:hover:scale-[1.035] motion-safe:hover:shadow-[0_32px_70px_-34px_rgba(20,17,15,0.65)]",
                getGalleryCardClass(item.type),
                active === index && "md:z-10 md:scale-[1.015]",
              )}
            >
              <GalleryCardMedia
                item={item}
                priority={index < 4}
                isActive={active === index}
              />
            </button>
          ))}
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

function getGalleryCardClass(type: (typeof galleryItems)[number]["type"]) {
  if (type === "video") {
    return "aspect-[9/16] lg:row-span-2 lg:max-h-[600px] lg:[aspect-ratio:auto]";
  }

  return "aspect-[4/3] lg:row-span-1 lg:[aspect-ratio:auto]";
}

function GalleryCardMedia({
  item,
  priority,
  isActive,
}: {
  item: (typeof galleryItems)[number];
  priority: boolean;
  isActive: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (item.type !== "video") return;
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      void video.play().catch(() => undefined);
      return;
    }
    video.pause();
    video.currentTime = 0;
  }, [isActive, item.type]);

  if (item.type === "video") {
    return (
      <video
        ref={videoRef}
        aria-label={item.alt}
        loop
        muted
        playsInline
        poster={item.poster}
        preload="metadata"
        className="h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.09]"
      >
        <source src={item.src} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      priority={priority}
      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
      className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.09]"
    />
  );
}

function TestimonialsSection() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setIdx((value) => (value + 1) % testimonials.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, []);

  const review = testimonials[idx];

  return (
    <section className="overflow-hidden bg-[var(--eventaj-paper)] px-5 py-24 text-center md:px-10 md:py-32">
      <div className="mx-auto max-w-[980px]">
        <div className="mb-8 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
          Mnenja strank
        </div>
        <div className="mb-9 flex items-center justify-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index} className="text-lg text-[var(--eventaj-accent)]">
              ★
            </span>
          ))}
          <span className="ml-3 text-sm text-[var(--eventaj-muted)]">
            4.9 / 5 · 30+ ocen
          </span>
        </div>
        <blockquote
          key={idx}
          className="font-serif-display text-[clamp(28px,3.6vw,46px)] font-[350] leading-tight text-balance motion-safe:animate-[eventaj-fade-in_0.6s_ease-out]"
        >
          <span className="font-serif-italic text-[1.4em] italic leading-none text-[var(--eventaj-accent)]">
            “
          </span>
          {review.quote}
          <span className="font-serif-italic text-[1.4em] italic leading-none text-[var(--eventaj-accent)]">
            ”
          </span>
        </blockquote>
        <div className="mt-10 font-medium">{review.author}</div>
        <div className="mt-1 font-serif-italic text-[13px] italic text-[var(--eventaj-muted)]">
          {review.role}
        </div>
        <div className="mt-12 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setIdx(index)}
              className={cn(
                "h-1 rounded-full p-0 transition-all",
                index === idx
                  ? "w-7 bg-[var(--eventaj-ink)]"
                  : "w-2 bg-[rgba(20,17,15,0.2)]",
              )}
              aria-label={`Mnenje ${index + 1}`}
            />
          ))}
        </div>
        <TrustLogosText />
      </div>
    </section>
  );
}

export function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <section
      id="faq"
      className="bg-[var(--eventaj-paper)] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
            Pogosta vprašanja
          </div>
          <h2 className="font-serif-display text-[clamp(36px,4.5vw,60px)] font-[350] leading-none text-balance">
            Vse, kar te{" "}
            <em className="font-serif-italic italic text-[var(--eventaj-accent)]">
              zanima
            </em>
            .
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--eventaj-ink-2)]">
            Vse pomembne informacije na enem mestu. Če imaš dodatno vprašanje,
            nam piši.
          </p>
          <a
            href="mailto:info@eventaj.si"
            className="mt-6 inline-block border-b border-[var(--eventaj-accent)] pb-0.5 text-sm text-[var(--eventaj-accent)] no-underline"
          >
            info@eventaj.si
          </a>
        </div>
        <div>
          {faqItems.map((item, index) => (
            <div
              key={item.q}
              className={cn(
                "border-t border-[rgba(20,17,15,0.12)]",
                index === faqItems.length - 1 && "border-b",
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(open === index ? -1 : index)}
                className="flex w-full items-center justify-between bg-transparent py-7 text-left text-[var(--eventaj-ink)]"
              >
                <span className="pr-6 font-serif-display text-[22px] font-normal">
                  {item.q}
                </span>
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(20,17,15,0.2)] text-lg font-light transition-transform",
                    open === index && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-[max-height] duration-300",
                  open === index ? "max-h-56" : "max-h-0",
                )}
              >
                <p className="mb-7 pr-14 text-[15px] leading-relaxed text-[var(--eventaj-ink-2)]">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type ServicePageProps = {
  type: "photo" | "360";
};

const serviceVisualStories = {
  photo: {
    eyebrow: "Izkušnja na dogodku",
    title: "Gostje ne čakajo samo na sliko. Ustvarijo si svoj mali prizor.",
    description:
      "Rekviziti, ozadje, tisk in digitalna galerija delujejo kot ena celovita izkušnja. Gost stopi pred booth, ujame trenutek in ga v nekaj sekundah odnese s seboj.",
    images: [
      {
        src: "/application/photo-booth-device.webp",
        alt: "Photo Booth naprava pripravljena za uporabo na dogodku",
        label: "Profesionalna oprema",
      },
      {
        src: "/application/photo-booth-hero/alja-anze.webp",
        alt: "Poročni gostje s Photo Booth tablicami v personaliziranem okvirju",
        label: "Personaliziran okvir",
      },
      {
        src: "/application/photo-booth-hero/jozek-50.webp",
        alt: "Gostje s Photo Booth rekviziti na rojstnodnevnem praznovanju",
        label: "Gostje v akciji",
      },
    ],
  },
  "360": {
    eyebrow: "360° Booth v akciji",
    title:
      "Namesto statične fotografije nastane kratek video, pripravljen za deljenje.",
    description:
      "Gost stopi na platformo, kamera ujame trenutek iz vseh kotov, rezultat pa je kratek videoposnetek, pripravljen za takojšnje deljenje.",
    images: [
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-3.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-3.webp",
        alt: "360° Booth video z gostmi med snemanjem na dogodku",
        label: "Glavni trenutek",
      },
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-6.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-6.webp",
        alt: "Dinamičen 360° Booth video z efekti in gibanjem",
        label: "Gibanje in efekti",
      },
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-8.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-8.webp",
        alt: "Kratek 360° Booth video posnetek s platforme",
        label: "Platforma",
      },
    ],
  },
} as const;

const serviceHeroProof = {
  stats: [
    { value: "50+", label: "izvedenih dogodkov" },
    { value: "4.9/5", label: "ocena strank" },
  ],
  logos: [
    {
      src: "/application/sksg.webp",
      alt: "ŠKSG",
    },
    {
      src: "/application/autodelta.webp",
      alt: "AutoDelta",
    },
    {
      src: "/application/forvis-marzars.webp",
      alt: "Forvis Mazars",
    },
    {
      src: "/application/LOGO_MSI_POZ.webp",
      alt: "Mlada Slovenija",
    },
  ],
} as const;

const serviceHeroVisuals = {
  photo: {
    aspectClass: "aspect-[3/2]",
    cardClass: "w-[300px] sm:w-[390px] lg:w-[500px]",
    railDuration:
      "motion-safe:animate-[eventaj-service-rail_64s_linear_infinite]",
    images: [
      {
        src: "/application/photo-booth-hero/jozek-50.webp",
        alt: "Gostje s Photo Booth rekviziti na praznovanju Jožek 50",
        label: "Jožek 50",
      },
      {
        src: "/application/photo-booth-hero/alja-anze.webp",
        alt: "Poročni gostje s Photo Booth tablicami na dogodku Alja in Anže",
        label: "Poroka",
      },
      {
        src: "/application/photo-booth-hero/srecko-50.webp",
        alt: "Par z zabavnimi Photo Booth očali na praznovanju Srečko 50 let",
        label: "Srečko 50",
      },
      {
        src: "/application/photo-booth-hero/robis-tomorrowland.webp",
        alt: "Skupina gostov pred bleščečim ozadjem v okvirju Robi's Tomorrowland",
        label: "Tematska zabava",
      },
      {
        src: "/application/photo-booth-hero/lets-party-jasna.webp",
        alt: "Skupina gostov v retro kostumih na Photo Booth fotografiji Let's party z Jasno",
        label: "Let's party",
      },
      {
        src: "/application/photo-booth-hero/doris-40.webp",
        alt: "Velika skupinska Photo Booth fotografija s praznovanja Doris 40 let",
        label: "Doris 40",
      },
      {
        src: "/application/photo-booth-hero/halcom-2025.webp",
        alt: "Novoletna Photo Booth fotografija za Halcom s štirimi gosti",
        label: "Halcom",
      },
      {
        src: "/application/photo-booth-hero/kelag-2026.webp",
        alt: "Skupina gostij z novoletnimi očali na Photo Booth fotografiji Kelag International",
        label: "Kelag",
      },
      {
        src: "/application/photo-booth-hero/disco-night.webp",
        alt: "Gostja pred bleščečim Photo Booth ozadjem v okvirju Disco Night",
        label: "Disco night",
      },
      {
        src: "/application/photo-booth-hero/tamara-40.webp",
        alt: "Trije gostje na Photo Booth fotografiji s praznovanja Tamara 40",
        label: "Tamara 40",
      },
    ],
  },
  "360": {
    aspectClass: "aspect-[9/16]",
    cardClass: "w-[180px] sm:w-[220px] lg:w-[280px]",
    railDuration:
      "motion-safe:animate-[eventaj-service-rail_58s_linear_infinite]",
    images: [
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-1.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-1.webp",
        alt: "360° Booth video z dogodka",
        label: "360° trenutek",
      },
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-2.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-2.webp",
        alt: "Gostje na 360° Booth platformi v gibanju",
        label: "Gibanje",
      },
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-3.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-3.webp",
        alt: "Slow-motion 360° Booth posnetek z dogodka",
        label: "Slow-motion",
      },
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-4.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-4.webp",
        alt: "360° Booth video za deljenje na družbenih omrežjih",
        label: "Za deljenje",
      },
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-5.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-5.webp",
        alt: "Zabaven 360° Booth posnetek gostov",
        label: "Zabava",
      },
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-6.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-6.webp",
        alt: "Dinamičen 360° Booth video z dogodka",
        label: "Efekt",
      },
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-7.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-7.webp",
        alt: "Gostje pozirajo na 360° Booth platformi",
        label: "Poziranje",
      },
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-8.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-8.webp",
        alt: "Kratek 360° Booth video posnetek",
        label: "Video",
      },
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-9.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-9.webp",
        alt: "360° Booth video spomin z dogodka",
        label: "Spomin",
      },
    ],
  },
} as const;

export function ServicePageContent({
  type,
  seoTitle,
}: ServicePageProps & { seoTitle: string }) {
  const is360 = type === "360";
  const accent = "var(--eventaj-accent)";
  return (
    <main>
      <SubpageHero
        tag={is360 ? "Premium · 360° Booth" : "Klasika · Photo Booth"}
        title={is360 ? "Trenutek" : "Trenutek, ujet"}
        seoTitle={seoTitle}
        italicWord={is360 ? "v gibanju" : "v papir"}
        description={
          is360
            ? "Dinamični 360° videoposnetki, ki ujamejo energijo dogodka iz vseh kotov. Za poroke, poslovne dogodke in praznovanja, kjer trenutki postanejo del zgodbe."
            : "Profesionalni Photo Booth s takojšnjim tiskom fotografij. Elegantna popestritev porok, poslovnih dogodkov in zasebnih praznovanj."
        }
        price={is360 ? 299 : 279}
        accent={accent}
        visuals={serviceHeroVisuals[type]}
      />
      <FeatureGrid
        title={is360 ? "Premium izkušnja," : "Vse vključeno,"}
        italicWord={is360 ? "brez kompromisov" : "brez skritih stroškov"}
        features={is360 ? booth360Features : photoFeatures}
        accent={accent}
      />
      <ServiceVisualStory type={type} accent={accent} />
      <SpecsSection
        specs={is360 ? booth360Specs : photoSpecs}
        accent={accent}
      />
      <PackageTiers service={type} />
      <TestimonialsSection />
      <FAQSection />
    </main>
  );
}

function ServiceVisualStory({
  type,
  accent,
}: {
  type: "photo" | "360";
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
  media: (typeof serviceVisualStories)[ServicePageProps["type"]]["images"][number];
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

function SubpageHero({
  tag,
  title,
  seoTitle,
  italicWord,
  description,
  price,
  accent,
  visuals,
}: {
  tag: string;
  title: string;
  seoTitle: string;
  italicWord: string;
  description: string;
  price: number;
  accent: string;
  visuals: (typeof serviceHeroVisuals)[ServicePageProps["type"]];
}) {
  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[var(--eventaj-paper)] pb-8 pt-24 md:pb-10 md:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(251,248,242,0.95), rgba(244,239,230,0.78) 58%, rgba(251,248,242,0.98))",
        }}
      />

      <div className="relative z-[2] mx-auto flex w-full max-w-[980px] flex-1 flex-col items-center justify-center px-5 py-7 text-center md:px-10 md:py-12">
        <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-[rgba(20,17,15,0.15)] bg-[rgba(251,248,242,0.68)] px-4 py-2 text-[11px] uppercase tracking-[0.12em] text-[var(--eventaj-muted)] backdrop-blur-md md:text-xs">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: accent }}
          />
          {tag}
        </div>

        <h1 className="sr-only">{seoTitle}</h1>
        <div
          aria-hidden="true"
          className="mt-7 max-w-[900px] pb-2 font-serif-display text-[clamp(48px,9vw,118px)] font-[350] leading-[0.9] text-balance md:mt-9"
        >
          {title}{" "}
          <em className="font-serif-italic italic" style={{ color: accent }}>
            {italicWord}
          </em>
        </div>

        <p className="mt-5 max-w-[640px] text-[16px] leading-relaxed text-[var(--eventaj-ink-2)] md:mt-7 md:text-[19px]">
          {description}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-5 md:mt-10">
          <InquiryTrigger className="rounded-full bg-[var(--eventaj-ink)] px-8 py-5 text-[15px] font-medium text-[var(--eventaj-paper)] transition-colors duration-200 hover:bg-[var(--eventaj-accent)]">
            Pridobi ponudbo →
          </InquiryTrigger>
          <div className="min-w-[86px] text-left">
            <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--eventaj-muted)]">
              od
            </div>
            <div className="mt-1 font-serif-display text-[34px] leading-none">
              {price} €
            </div>
          </div>
        </div>

        <HeroProof accent={accent} />
      </div>

      <ServiceHeroRail visuals={visuals} accent={accent} />
    </section>
  );
}

function ServiceHeroRail({
  visuals,
  accent,
}: {
  visuals: (typeof serviceHeroVisuals)[ServicePageProps["type"]];
  accent: string;
}) {
  const railImages = [...visuals.images, ...visuals.images];

  return (
    <div className="relative z-[2] w-full overflow-hidden pb-2 pt-1 md:pt-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--eventaj-paper)] to-transparent md:w-36"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--eventaj-paper)] to-transparent md:w-36"
      />
      <div
        className={cn(
          "flex w-max items-center gap-3 px-3 sm:gap-4 sm:px-4 md:gap-5",
          visuals.railDuration,
        )}
      >
        {railImages.map((image, index) => (
          <div key={`${image.src}-${index}`} className="shrink-0">
            <HeroReferenceCard
              image={image}
              aspectClass={visuals.aspectClass}
              sizes="(max-width: 767px) 290px, (max-width: 1023px) 360px, 430px"
              priority={index === 0}
              playVideo={index < Math.min(visuals.images.length, 4)}
              className={visuals.cardClass}
              accent={accent}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroReferenceCard({
  image,
  aspectClass,
  sizes,
  accent,
  priority = false,
  playVideo = false,
  className,
}: {
  image: (typeof serviceHeroVisuals)[ServicePageProps["type"]]["images"][number];
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

function HeroProof({ accent }: { accent: string }) {
  return (
    <div className="mt-5 flex max-w-full flex-col items-center gap-3 md:mt-8 md:gap-4">
      <div className="flex flex-nowrap items-center justify-center gap-2 md:flex-wrap md:gap-3">
        {serviceHeroProof.stats.map((item, index) => (
          <div
            key={item.label}
            className="rounded-full border border-[rgba(20,17,15,0.12)] bg-[rgba(251,248,242,0.62)] px-3 py-1.5 backdrop-blur-md md:px-4 md:py-2"
          >
            <span
              className="font-serif-display text-lg leading-none md:text-xl"
              style={{ color: index === 0 ? accent : "var(--eventaj-ink)" }}
            >
              {item.value}
            </span>
            <span className="ml-1.5 text-[9px] uppercase tracking-[0.08em] text-[var(--eventaj-muted)] md:ml-2 md:text-[10px] md:tracking-[0.12em]">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="hidden flex-wrap items-center justify-center gap-3 sm:flex">
        <div className="flex -space-x-2">
          {serviceHeroProof.logos.map((logo) => (
            <div
              key={logo.alt}
              className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-[var(--eventaj-paper)] bg-white shadow-[0_8px_18px_-12px_rgba(20,17,15,0.5)] md:h-10 md:w-10"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                sizes="40px"
                className="object-contain p-2"
              />
            </div>
          ))}
        </div>
        <span className="max-w-[240px] text-left text-[12px] font-medium leading-snug text-[var(--eventaj-muted)] md:max-w-none md:text-sm">
          Med drugim so nam zaupali ŠKSG, AutoDelta, Forvis Mazars in Mlada Slovenija.
        </span>
      </div>
    </div>
  );
}

function FeatureGrid({
  title,
  italicWord,
  features,
  accent,
}: {
  title: string;
  italicWord: string;
  features: ReadonlyArray<{ title: string; desc: string }>;
  accent: string;
}) {
  return (
    <section className="bg-[var(--eventaj-paper-2)] px-5 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-[720px]">
          <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
            Kaj je vključeno
          </div>
          <h2 className="font-serif-display text-[clamp(36px,4.8vw,64px)] font-[350] leading-none text-balance">
            {title}{" "}
            <em className="font-serif-italic italic" style={{ color: accent }}>
              {italicWord}
            </em>
            .
          </h2>
        </div>
        <div className="grid border border-[rgba(20,17,15,0.1)] bg-[var(--eventaj-paper)] md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                "p-8 md:p-9",
                index % 3 !== 0 && "md:border-l md:border-[rgba(20,17,15,0.1)]",
                index >= 3 && "border-t border-[rgba(20,17,15,0.1)]",
              )}
            >
              <div
                className="mb-5 font-serif-italic italic"
                style={{ color: accent }}
              >
                0{index + 1}
              </div>
              <h3 className="font-serif-display text-2xl font-normal leading-tight">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--eventaj-ink-2)]">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecsSection({
  specs,
  accent,
}: {
  specs: ReadonlyArray<{ label: string; value: string; icon: string }>;
  accent: string;
}) {
  return (
    <section className="bg-[var(--eventaj-paper)] px-5 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-[880px]">
        <div className="mb-16 text-center">
          <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
            POMEMBNE INFORMACIJE
          </div>
          <h2 className="font-serif-display text-[clamp(32px,4.5vw,60px)] font-[350] leading-none text-balance">
            Vse, kar moraš{" "}
            <em className="font-serif-italic italic" style={{ color: accent }}>
              vedeti
            </em>
            .
          </h2>
        </div>
        <div>
          {specs.map((spec, index) => (
            <div
              key={spec.label}
              className={cn(
                "grid gap-4 border-t border-[rgba(20,17,15,0.12)] py-7 md:grid-cols-[auto_1fr_1.4fr] md:gap-7",
                index === specs.length - 1 && "border-b",
              )}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--eventaj-paper-2)]">
                <SpecIcon name={spec.icon} color={accent} />
              </div>
              <div className="pt-1 font-serif-display text-xl font-normal md:pt-2.5">
                {spec.label}
              </div>
              <div className="text-[15px] leading-relaxed text-[var(--eventaj-ink-2)] md:pt-3">
                {spec.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecIcon({ name, color }: { name: string; color: string }) {
  const props = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "clock":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "space":
      return (
        <svg {...props}>
          <path d="M3 3h6M3 3v6M21 3h-6M21 3v6M3 21h6M3 21v-6M21 21h-6M21 21v-6" />
        </svg>
      );
    case "setup":
      return (
        <svg {...props}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case "print":
      return (
        <svg {...props}>
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
      );
    case "video":
      return (
        <svg {...props}>
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" />
        </svg>
      );
    case "gallery":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      );
    case "truck":
      return (
        <svg {...props}>
          <rect x="1" y="6" width="13" height="11" />
          <polygon points="14 9 19 9 22 12 22 17 14 17 14 9" />
          <circle cx="6" cy="19" r="2" />
          <circle cx="18" cy="19" r="2" />
        </svg>
      );
    case "brush":
      return (
        <svg {...props}>
          <path d="M12 22a10 10 0 1 1 10-10c0 4-3 4-3 6s2 2 2 4-3 0-9 0z" />
          <circle cx="8.5" cy="7.5" r="1.5" />
          <circle cx="13.5" cy="6.5" r="1.5" />
          <circle cx="17.5" cy="10.5" r="1.5" />
        </svg>
      );
    case "music":
      return (
        <svg {...props}>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    case "share":
      return (
        <svg {...props}>
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      );
  }
}

function PackageTiers({ service }: { service: "photo" | "360" }) {
  const accent = "var(--eventaj-accent)";
  const packages: readonly (
    | (typeof booth360Packages)[number]
    | (typeof photoPackages)[number]
  )[] = service === "360" ? booth360Packages : photoPackages;
  return (
    <section
      id="cenik"
      className="bg-[var(--eventaj-paper-2)] px-5 py-24 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1300px]">
        <div className="mx-auto mb-16 max-w-[720px] text-center">
          <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
            Cenik · Paketi
          </div>
          <h2 className="font-serif-display text-[clamp(40px,5vw,68px)] font-[350] leading-none text-balance">
            Paketi za vsak tip dogodka
          </h2>
          <p className="mt-4 text-[17px] text-[var(--eventaj-ink-2)]">
            Transparentne cene brez nepričakovanih doplačil.
          </p>
        </div>
        <div
          className={cn(
            "grid items-stretch",
            packages.length === 2
              ? "mx-auto max-w-[920px] lg:grid-cols-2"
              : "lg:grid-cols-3",
          )}
        >
          {packages.map((item, index) => {
            const featured = "featured" in item && item.featured;

            return (
              <article
                key={item.name}
                className={cn(
                  "relative flex flex-col border border-[rgba(20,17,15,0.1)] p-8 md:p-10 lg:p-12",
                  featured
                    ? "z-[2] bg-[var(--eventaj-ink)] text-[var(--eventaj-paper)] shadow-[0_30px_60px_-20px_rgba(20,17,15,0.4)] lg:scale-[1.04]"
                    : "bg-[var(--eventaj-paper)]",
                  index > 0 && !featured && "lg:border-l-0",
                )}
              >
                {featured && (
                  <div
                    className="absolute right-5 top-5 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--eventaj-paper)]"
                    style={{ backgroundColor: accent }}
                  >
                    Najpogostejša izbira
                  </div>
                )}
                <div
                  className="mb-3 font-serif-italic italic"
                  style={{ color: featured ? "#E8B584" : accent }}
                >
                  {item.name}
                </div>
                <div className="font-serif-display text-[64px] font-[350] leading-none">
                  {item.price}
                  <span className="text-2xl opacity-60"> €</span>
                </div>
                <div
                  className={cn(
                    "mt-2 text-[13px] opacity-80",
                    featured
                      ? "text-[var(--eventaj-cream)]"
                      : "text-[var(--eventaj-muted)]",
                  )}
                >
                  {item.hours} {item.hours === 2 ? "uri" : "ure"}
                </div>
                <p
                  className={cn(
                    "my-8 font-serif-italic italic leading-snug",
                    featured
                      ? "text-[var(--eventaj-cream)]"
                      : "text-[var(--eventaj-ink-2)]",
                  )}
                >
                  {item.tagline}
                </p>
                <ul
                  className={cn(
                    "mb-8 grid gap-3 border-t pt-7",
                    featured
                      ? "border-[rgba(244,239,230,0.15)]"
                      : "border-[rgba(20,17,15,0.1)]",
                  )}
                >
                  {item.features.map((feature) => (
                    <li
                      key={feature}
                      className={cn(
                        "flex items-baseline gap-3 text-sm",
                        featured
                          ? "text-[var(--eventaj-cream)]"
                          : "text-[var(--eventaj-ink-2)]",
                      )}
                    >
                      <span
                        className="shrink-0 font-semibold"
                        style={{ color: featured ? "#E8B584" : accent }}
                      >
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <InquiryTrigger
                  className={cn(
                    "mt-auto w-full rounded-full px-6 py-4 text-sm font-medium transition-colors",
                    featured
                      ? "bg-[var(--eventaj-paper)] text-[var(--eventaj-ink)] hover:text-[var(--eventaj-paper)]"
                      : "bg-[var(--eventaj-ink)] text-[var(--eventaj-paper)]",
                  )}
                >
                  Izberi paket →
                </InquiryTrigger>
              </article>
            );
          })}
        </div>
        <div className="mt-12 text-center text-sm text-[var(--eventaj-muted)]">
          Dodatne ure: +50 €/h (Photo Booth), +80 €/h (360° Booth). Prevoz in
          posebne zahteve potrdimo v končni ponudbi.
        </div>
      </div>
    </section>
  );
}

export function CenikPageContent({ seoTitle }: { seoTitle: string }) {
  const [tab, setTab] = useState<"photo" | "360" | "custom">("photo");
  return (
    <main>
      <section className="bg-[var(--eventaj-paper)] px-5 pb-16 pt-40 text-center md:px-10">
        <div className="mx-auto max-w-[880px]">
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[rgba(20,17,15,0.15)] px-4 py-2 text-xs uppercase tracking-[0.12em] text-[var(--eventaj-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--eventaj-accent)]" />
            Cenik · 2026
          </div>
          <h1 className="sr-only">{seoTitle}</h1>
          <div
            aria-hidden="true"
            className="font-serif-display text-[clamp(48px,7vw,96px)] font-[350] leading-[0.95] text-balance"
          >
            Za dogodke, ki ostanejo v spominu.
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--eventaj-ink-2)] md:text-[19px]">
            Izberi med pripravljenimi paketi ali pa skupaj ustvarimo ponudbo po
            meri.
          </p>
          <div className="mt-12 inline-flex flex-wrap justify-center gap-1 rounded-full bg-[var(--eventaj-paper-2)] p-1">
            {[
              ["photo", "Photo Booth"],
              ["360", "360° Booth"],
              ["custom", "Individualno"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setTab(value as "photo" | "360" | "custom")}
                className={cn(
                  "rounded-full px-6 py-3 text-sm font-medium transition-colors",
                  tab === value
                    ? "bg-[var(--eventaj-ink)] text-[var(--eventaj-paper)]"
                    : "text-[var(--eventaj-ink)]",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>
      {tab !== "custom" ? (
        <PackageTiers service={tab} />
      ) : (
        <PricingConfigurator />
      )}
      <AddonsSection />
      <TestimonialsSection />
      <FAQSection />
    </main>
  );
}

function PricingConfigurator({ compact = false }: { compact?: boolean }) {
  const [hours, setHours] = useState(3);
  const [type, setType] = useState<"photo" | "360" | "custom">("photo");
  const [selectedAddons, setSelectedAddons] = useState({
    album: false,
    woodenSigns: false,
    animations360: false,
  });

  const baseHours = type === "360" ? 2 : type === "photo" ? 2 : 0;
  const basePrice = type === "360" ? 299 : type === "photo" ? 279 : 0;
  const hourPrice = type === "360" ? 80 : 50;
  const extraHours = type === "custom" ? 0 : Math.max(0, hours - baseHours);
  const albumAvailable = type === "photo" && hours === 2;
  const animations360Available = type === "360";
  const rangeMin = baseHours || 2;
  const rangeProgress = ((hours - rangeMin) / (8 - rangeMin)) * 100;
  const addonPrices = { album: 20, woodenSigns: 40, animations360: 59 };
  const addonLabels = {
    album: "Album",
    woodenSigns: "Personalizirane lesene tablice",
    animations360: "Personalizirane animacije za 360° Booth",
  };
  const addonsTotal = Object.entries(selectedAddons)
    .filter(
      ([key, value]) =>
        value &&
        (key !== "album" || albumAvailable) &&
        (key !== "animations360" || animations360Available),
    )
    .reduce(
      (sum, [key]) => sum + addonPrices[key as keyof typeof addonPrices],
      0,
    );
  const total =
    type === "custom" ? 0 : basePrice + extraHours * hourPrice + addonsTotal;

  return (
    <section
      id="cenik-po-meri"
      className={cn(
        "bg-[var(--eventaj-paper-2)] px-5 py-24 md:px-10 md:py-32",
        compact && "py-20 md:py-24",
      )}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 text-center">
          <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
            Cenik
          </div>
          <h2 className="font-serif-display text-[clamp(40px,5.5vw,76px)] font-[350] leading-none text-balance">
            Sestavi svojo{" "}
            <em className="font-serif-italic italic text-[var(--eventaj-accent)]">
              ponudbo
            </em>
            .
          </h2>
          <p className="mx-auto mt-5 max-w-[540px] text-[17px] text-[var(--eventaj-ink-2)]">
            Sestavi okvirno ponudbo glede na svoje želje. Končno ponudbo
            pripravimo in potrdimo pred rezervacijo.
          </p>
        </div>
        <div className="grid border border-[rgba(20,17,15,0.1)] bg-[var(--eventaj-paper)] lg:grid-cols-[1.2fr_1fr]">
          <div className="p-6 md:p-12">
            <ConfiguratorBlock label="01 — Izberi storitev">
              <div className="grid gap-2 md:grid-cols-3">
                {[
                  { id: "photo", label: "Photo Booth", price: "od 279 €" },
                  { id: "360", label: "360° Booth", price: "od 299 €" },
                  { id: "custom", label: "Oba", price: "po meri" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      const nextType = item.id as "photo" | "360" | "custom";
                      setType(nextType);
                      if (nextType === "photo") setHours(2);
                      if (nextType === "360") setHours(2);
                      setSelectedAddons((current) => ({
                        ...current,
                        album: nextType === "photo" ? current.album : false,
                        animations360:
                          nextType === "360" ? current.animations360 : false,
                      }));
                    }}
                    className={cn(
                      "border p-4 text-left transition-colors",
                      type === item.id
                        ? "border-[var(--eventaj-ink)] bg-[var(--eventaj-ink)] text-[var(--eventaj-paper)]"
                        : "border-[rgba(20,17,15,0.15)]",
                    )}
                  >
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="mt-1 font-serif-italic text-[11px] italic opacity-70">
                      {item.price}
                    </div>
                  </button>
                ))}
              </div>
            </ConfiguratorBlock>
            <ConfiguratorBlock label="02 — Trajanje">
              <div className="mb-4 flex items-baseline justify-between">
                <div />
                <div className="font-serif-display text-2xl">
                  {hours}{" "}
                  <span className="text-sm text-[var(--eventaj-muted)]">
                    {hours < 5 ? "ure" : "ur"}
                  </span>
                </div>
              </div>
              <input
                type="range"
                min={rangeMin}
                max={8}
                value={hours}
                onChange={(event) => {
                  const nextHours = Number(event.target.value);
                  setHours(nextHours);
                  if (nextHours !== 2) {
                    setSelectedAddons((current) => ({
                      ...current,
                      album: false,
                    }));
                  }
                }}
                className="eventaj-range w-full"
                style={{
                  background: `linear-gradient(to right, var(--eventaj-accent) 0%, var(--eventaj-accent) ${rangeProgress}%, rgba(20,17,15,0.18) ${rangeProgress}%, rgba(20,17,15,0.18) 100%)`,
                }}
                disabled={type === "custom"}
              />
              <div className="mt-1.5 flex justify-between text-[11px] text-[var(--eventaj-muted)]">
                <span>{rangeMin} h</span>
                <span>8 h</span>
              </div>
            </ConfiguratorBlock>
            <ConfiguratorBlock label="03 — Dodatki" last>
              <div className="grid gap-2.5">
                {[
                  {
                    id: "album",
                    label: "Album",
                    price: "+20 €",
                    available: albumAvailable,
                    note: "Na voljo pri 2-urnem paketu Photo Booth",
                  },
                  {
                    id: "woodenSigns",
                    label: "Personalizirane lesene tablice 10 kosov",
                    price: "+40 €",
                    available: true,
                    note: null,
                  },
                  {
                    id: "animations360",
                    label: "Personalizirane animacije za 360° Booth",
                    price: "+59 €",
                    available: animations360Available,
                    note: "Na voljo samo pri paketu 360° Booth",
                  },
                ].map((addon) => (
                  <label
                    key={addon.id}
                    className={cn(
                      "flex items-center justify-between border px-4 py-3.5 transition-colors",
                      addon.available
                        ? "cursor-pointer"
                        : "cursor-not-allowed opacity-45",
                      selectedAddons[addon.id as keyof typeof selectedAddons] &&
                        addon.available
                        ? "border-[var(--eventaj-ink)] bg-[var(--eventaj-paper-2)]"
                        : "border-[rgba(20,17,15,0.12)]",
                    )}
                  >
                    <span className="flex items-center gap-3.5">
                      <input
                        type="checkbox"
                        checked={
                          selectedAddons[
                            addon.id as keyof typeof selectedAddons
                          ] && addon.available
                        }
                        disabled={!addon.available}
                        onChange={(event) =>
                          setSelectedAddons((current) => ({
                            ...current,
                            [addon.id]: event.target.checked,
                          }))
                        }
                        className="h-4 w-4 accent-[var(--eventaj-ink)]"
                      />
                      <span>
                        <span className="block text-sm">{addon.label}</span>
                        {addon.note && (
                          <span className="mt-0.5 block text-[10px] text-[var(--eventaj-muted)]">
                            {addon.note}
                          </span>
                        )}
                      </span>
                    </span>
                    <span className="font-serif-italic text-[13px] italic text-[var(--eventaj-muted)]">
                      {addon.price}
                    </span>
                  </label>
                ))}
              </div>
            </ConfiguratorBlock>
          </div>
          <div className="flex flex-col justify-between bg-[var(--eventaj-ink)] p-6 text-[var(--eventaj-paper)] md:p-12">
            <div>
              <div className="mb-7 text-[11px] uppercase tracking-[0.2em] opacity-60">
                Tvoja ponudba
              </div>
              <div className="grid gap-3.5 text-sm">
                <PriceRow
                  label={
                    type === "photo"
                      ? "Photo Booth"
                      : type === "360"
                        ? "360° Booth"
                        : "Photo + 360° Booth"
                  }
                  value={type === "custom" ? "po meri" : `${basePrice} €`}
                />
                {type !== "custom" && (
                  <PriceRow
                    label={`${baseHours} uri (izhodiščno)`}
                    value="—"
                    muted
                  />
                )}
                {extraHours > 0 && (
                  <PriceRow
                    label={`+${extraHours} ${extraHours === 1 ? "dodatna ura" : "dodatne ure"}`}
                    value={`${extraHours * hourPrice} €`}
                  />
                )}
                {Object.entries(selectedAddons)
                  .filter(
                    ([key, value]) =>
                      value &&
                      (key !== "album" || albumAvailable) &&
                      (key !== "animations360" || animations360Available) &&
                      addonPrices[key as keyof typeof addonPrices] > 0,
                  )
                  .map(([key]) => (
                    <PriceRow
                      key={key}
                      label={addonLabels[key as keyof typeof addonLabels]}
                      value={`+${addonPrices[key as keyof typeof addonPrices]} €`}
                    />
                  ))}
              </div>
              <div className="mt-8 border-t border-[rgba(244,239,230,0.2)] pt-8">
                <div className="mb-2 text-[11px] uppercase tracking-[0.18em] opacity-60">
                  Skupaj okvirno
                </div>
                <div className="font-serif-display text-[clamp(54px,7vw,72px)] leading-none">
                  {type === "custom" ? "Po meri" : `${total} €`}
                </div>
                <div className="mt-2.5 font-serif-italic text-xs italic opacity-60">
                  Končna ponudba vključuje potrjeno lokacijo in posebne zahteve.
                </div>
              </div>
            </div>
            <InquiryTrigger className="mt-8 rounded-full bg-[var(--eventaj-paper)] px-7 py-5 text-[15px] font-medium text-[var(--eventaj-ink)] transition-colors hover:bg-[var(--eventaj-accent)] hover:text-[var(--eventaj-paper)]">
              Pridobi ponudbo →
            </InquiryTrigger>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConfiguratorBlock({
  label,
  children,
  last = false,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={cn(!last && "mb-10")}>
      <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-muted)]">
        {label}
      </div>
      {children}
    </div>
  );
}

function PriceRow({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className={cn("flex justify-between gap-4", muted && "opacity-50")}>
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}

function AddonsSection() {
  return (
    <section className="bg-[var(--eventaj-paper)] px-5 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-16 text-center">
          <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
            Dodatki
          </div>
          <h2 className="font-serif-display text-[clamp(36px,4.8vw,60px)] font-[350] leading-none text-balance">
            Dodatki po meri
          </h2>
        </div>
        <div className="border border-[rgba(20,17,15,0.1)]">
          {addons.map((row, index) => (
            <div
              key={row.item}
              className={cn(
                "flex items-center justify-between gap-6 px-5 py-5 text-[15px] md:px-8",
                index > 0 && "border-t border-[rgba(20,17,15,0.08)]",
              )}
            >
              <span>{row.item}</span>
              <span className="font-serif-display text-lg">{row.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
