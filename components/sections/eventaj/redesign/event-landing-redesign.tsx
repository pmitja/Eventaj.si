import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { booth360Packages, photoPackages } from "@/content/eventaj/data";
import { eventLandingIncluded, eventLandingSteps, type EventLanding, type EventLandingMedia } from "@/content/eventaj/event-pages";
import { REVIEW_COUNT, REVIEW_RATING_LABEL } from "@/content/eventaj/proof";
import { photoBoothQrGalleryPrice, qrGalleryPrice } from "@/content/eventaj/qr-gallery-pricing";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Gem, Heart, Images, Sparkles, Star, Users } from "lucide-react";
import Link from "next/link";
import { ClientMarquee } from "./client-marquee";
import { HeldFrameClips } from "./held-frame-clips";
import { LandingHeroSlides } from "./landing-hero-slides";
import { PhotoLightboxGrid } from "./photo-lightbox-grid";
import { RedesignFaq } from "./redesign-faq";
import { RedesignClosing } from "./redesign-footer";
import { FeatureList, PackageCards, SectionHead } from "./service-sections";

const reasonIcons = [Heart, Sparkles, Users, Images, Gem, Star];
const isVideo = (media: EventLandingMedia) => media.src.endsWith(".mp4");

function Hero({ landing }: { landing: EventLanding }) {
  const type = landing.product === "photo" ? "Photo Booth" : "360° Booth";
  const photos = [...landing.heroImages, ...landing.galleryImages].filter((media) => media.src && !isVideo(media));
  const clips = [...landing.heroImages, ...landing.galleryImages].filter(isVideo);
  const useClips = landing.product === "360" && clips.length > 0;

  const copy = (
    <div className="ev-rise max-w-[720px]">
      <nav aria-label="Drobtinice" className="mb-8 flex flex-wrap gap-2 text-[14px] text-[var(--ev-mist)]">
        <Link href="/" className="transition-opacity hover:opacity-70">
          Domov
        </Link>
        <span aria-hidden="true">/</span>
        <Link href={landing.productHref} className="transition-opacity hover:opacity-70">
          {landing.productLabel}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-[var(--ev-porcelain)]">{landing.breadcrumbLabel}</span>
      </nav>
      <p className="mb-7 text-[19px] sm:text-[23px]">
        <a href="#cenik" className="ev-tag transition-transform hover:-translate-y-0.5">
          <small>Paketi od</small> {landing.price} €
        </a>
      </p>
      <h1 className="ev-display text-[clamp(40px,5.6vw,84px)] leading-[1.02]">
        {landing.title} <em>{landing.italicWord}</em>
        {landing.titleSuffix ? ` ${landing.titleSuffix}` : ""}
      </h1>
      <p className="ev-lede mt-7 text-[var(--ev-porcelain)]/90">{landing.description}</p>
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-5">
        <InquiryTrigger defaults={{ type }} className="ev-btn ev-btn-primary">
          Preveri prost termin
          <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
        </InquiryTrigger>
        <span className="text-[14px] text-[var(--ev-mist)]">Odgovorimo v 24 urah</span>
      </div>
      <p className="ev-tabular mt-9 text-[14px] text-[var(--ev-mist)]">{landing.proof}</p>
    </div>
  );

  if (useClips) {
    return (
      <section className="ev-dark relative isolate overflow-hidden">
        <div className="ev-wrap grid items-center gap-12 pb-16 pt-32 md:pb-24 lg:min-h-[min(100svh,1040px)] lg:grid-cols-12 lg:gap-10 lg:pb-20">
          <div className="lg:col-span-7">{copy}</div>
          <HeldFrameClips
            clips={clips.slice(0, 5)}
            className="mx-auto aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-[20px] lg:col-span-4 lg:col-start-9 lg:max-w-none"
          />
        </div>
      </section>
    );
  }

  return <LandingHeroSlides photos={photos.slice(0, 5)}>{copy}</LandingHeroSlides>;
}

function IdealFor({ landing }: { landing: EventLanding }) {
  if (!landing.idealFor) return null;
  const { title, description, items } = landing.idealFor;
  return (
    <section aria-labelledby="lp-ideal-title" className="py-24 md:py-32">
      <div className="ev-wrap">
        <SectionHead id="lp-ideal-title" title={title} lede={description} />
        <ul className="mt-12 flex flex-wrap gap-3">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2.5 rounded-full bg-[var(--ev-white)] px-5 py-3 text-[15px]">
              <Check aria-hidden="true" strokeWidth={1.75} className="ev-accent h-4 w-4" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Gallery({ landing }: { landing: EventLanding }) {
  const media = landing.galleryImages.filter((item) => item.src);
  if (media.length === 0) return null;
  const photos = media.filter((item) => !isVideo(item));
  const clips = media.filter(isVideo);
  return (
    <section aria-labelledby="lp-gallery-title" className="ev-dark ev-wine-bg py-24 md:py-32">
      <div className="ev-wrap">
        <SectionHead
          id="lp-gallery-title"
          dark
          title={
            <>
              {landing.galleryEyebrow.replace(/\s*\S+$/, "")} <em>{landing.galleryEyebrow.split(" ").pop()}</em>
            </>
          }
          lede="Prave fotografije in posnetki z dogodkov, ki smo jih izvedli."
        />
        {clips.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-2.5 md:gap-3 lg:grid-cols-4">
            {clips.slice(0, 4).map((clip, index) => (
              <HeldFrameClips
                key={clip.src}
                clips={[clip, ...clips.filter((_, other) => other !== index)].slice(0, 4)}
                holdMs={9000 + index * 1300}
                className={cn("aspect-[9/16] overflow-hidden rounded-[14px]", index > 1 && "hidden lg:block")}
              />
            ))}
          </div>
        )}
        {photos.length > 0 && (
          <PhotoLightboxGrid
            photos={photos.slice(0, 12)}
            className="mt-12 grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-3 lg:grid-cols-4"
            itemClassNames={photos.slice(0, 12).map((_, index) =>
              cn("aspect-[3/2] rounded-[10px]", index >= 8 && "hidden md:block", index >= 9 && "md:hidden lg:block"),
            )}
            sizes="(max-width: 767px) 46vw, (max-width: 1023px) 31vw, 23vw"
          />
        )}
      </div>
    </section>
  );
}

function Steps({ landing }: { landing: EventLanding }) {
  const steps = landing.steps ?? eventLandingSteps[landing.product];
  const description =
    landing.stepsDescription ??
    "Pridemo pred začetkom, postavimo booth in ga vodimo ves dogodek. Po zabavi vse pospravimo.";
  return (
    <section aria-labelledby="lp-steps-title" className="border-t ev-rule py-24 md:py-36">
      <div className="ev-wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <h2 id="lp-steps-title" className="ev-display ev-h2">
            Ti imaš dogodek. Mi imamo <em>vse ostalo</em>
          </h2>
          <p className="mt-6 max-w-[40ch] text-[16px] leading-relaxed text-[var(--ev-stone)]">{description}</p>
        </div>
        <ol className="border-t border-[var(--ev-night)] lg:col-span-7 lg:col-start-6">
          {steps.map((step, index) => (
            <li key={step.title} className="grid grid-cols-[64px_1fr] gap-4 border-b ev-rule py-8 md:grid-cols-[96px_1fr]">
              <span className="ev-display ev-price ev-tabular text-[clamp(32px,3vw,44px)] leading-none">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="ev-display block text-[22px] md:text-[25px]">{step.title}</span>
                <span className="mt-2 block max-w-[52ch] text-[16px] leading-relaxed text-[var(--ev-stone)]">{step.desc}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Pricing({ landing }: { landing: EventLanding }) {
  const isPhoto = landing.product === "photo";
  const included = (landing.included ?? eventLandingIncluded[landing.product]).filter((item) => item.label !== "Cena");
  return (
    <section id="cenik" aria-labelledby="lp-packages-title" className="ev-blush-bg py-24 md:py-36">
      <div className="ev-wrap">
        <SectionHead
          id="lp-packages-title"
          title={
            <>
              Paketi in <em>cene</em>
            </>
          }
          lede="Transparentne cene brez nepričakovanih doplačil. Prevoz uskladimo glede na lokacijo."
        />
        <PackageCards
          packages={isPhoto ? photoPackages : booth360Packages}
          type={isPhoto ? "Photo Booth" : "360° Booth"}
          qrPrice={isPhoto ? photoBoothQrGalleryPrice : qrGalleryPrice}
        />
        <h3 className="ev-display mt-20 text-[clamp(26px,2.6vw,36px)]">
          V vsakem paketu <em>vključeno</em>
        </h3>
        <ul className="mt-8 grid gap-x-10 border-t ev-rule md:grid-cols-2 lg:grid-cols-3">
          {included.map((item) => (
            <li key={item.label} className="border-b ev-rule py-5">
              <span className="flex items-center gap-3 text-[16px] font-medium">
                <Check aria-hidden="true" strokeWidth={1.75} className="ev-accent h-4 w-4 shrink-0" />
                {item.label}
              </span>
              <span className="mt-1.5 block pl-7 text-[15px] leading-relaxed text-[var(--ev-stone)]">{item.desc}</span>
            </li>
          ))}
        </ul>
        <Link href={landing.productHref} className="ev-link mt-10">
          Vse o storitvi {landing.productLabel}
          <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function Testimonial({ landing }: { landing: EventLanding }) {
  const review = landing.testimonial;
  return (
    <section aria-label="Mnenje stranke" className="ev-dark py-24 md:py-36">
      <figure className="ev-wrap max-w-[1100px] text-center">
        <p className="flex items-center justify-center gap-1 text-[var(--ev-champagne)]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} aria-hidden="true" className="h-4 w-4 fill-current" />
          ))}
          <span className="ev-tabular ml-3 text-[14px] text-[var(--ev-mist)]">
            {REVIEW_RATING_LABEL} / 5 · {REVIEW_COUNT} Google ocen
          </span>
        </p>
        <blockquote className="ev-display mx-auto mt-8 max-w-[28ch] text-[clamp(28px,3.4vw,48px)] leading-[1.15]">
          „{review.quote}“
        </blockquote>
        <figcaption className="mt-8">
          <span className="block font-medium">{review.author}</span>
          <span className="mt-1 block text-[14px] text-[var(--ev-mist)]">{review.role}</span>
        </figcaption>
      </figure>
    </section>
  );
}

function Related({ landing }: { landing: EventLanding }) {
  return (
    <section aria-labelledby="lp-related-title" className="border-t ev-rule py-16 md:py-20">
      <div className="ev-wrap flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <h2 id="lp-related-title" className="ev-display text-[24px]">
          Morda te zanima tudi
        </h2>
        <ul className="flex flex-wrap gap-3">
          {landing.related.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="ev-btn ev-btn-ghost min-h-[44px] px-5">
                {link.label}
                <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function EventLandingRedesign({ landing }: { landing: EventLanding }) {
  const faqLink =
    landing.product === "photo"
      ? { href: "/photo-booth/faq", label: "Vsa vprašanja o photo boothu" }
      : { href: "/360-photo-booth/faq", label: "Vsa vprašanja o 360° Boothu" };
  return (
    <>
      <Hero landing={landing} />
      <ClientMarquee />
      <FeatureList
        id="lp-reasons-title"
        title={
          <>
            {landing.reasonsTitle} <em>{landing.reasonsItalic}</em>
          </>
        }
        items={landing.reasons}
        icons={reasonIcons}
      />
      <Gallery landing={landing} />
      <IdealFor landing={landing} />
      <Steps landing={landing} />
      <Pricing landing={landing} />
      <Testimonial landing={landing} />
      <RedesignFaq items={landing.faq} moreLink={faqLink} />
      <Related landing={landing} />
      <RedesignClosing />
    </>
  );
}
