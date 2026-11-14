import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { photoPackages } from "@/content/eventaj/data";
import {
  formatEuro,
  photographerBasePrice,
  photographerExtraHourPrice,
  photographerFaq,
  photographerFeatures,
  photographerGallery,
  photographerIncluded,
  photographerInquiryType,
  photographerOccasions,
  photographerPackages,
  photographerQrLivePrice,
  photographerSteps,
} from "@/content/eventaj/photographer";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CalendarClock,
  Camera,
  Check,
  Clock,
  FileCheck2,
  Images,
  type LucideIcon,
  QrCode,
  Send,
  Tag,
  Wand2,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { ClientMarquee } from "./client-marquee";
import { PhotoLightboxGrid } from "./photo-lightbox-grid";
import { PhotographerHero } from "./photographer-hero";
import { RedesignFaq } from "./redesign-faq";
import { RedesignClosing } from "./redesign-footer";
import { RedesignReviews } from "./redesign-reviews";
import { FeatureList, SectionHead } from "./service-sections";

const TYPE = photographerInquiryType;
const BOOTH_PRICE = photoPackages[0].price;
const QR_NOTE = `Želim tudi fotografije takoj prek QR kode (+${photographerQrLivePrice} €).`;

const featureIcons: ReadonlyArray<LucideIcon> = [Wand2, Zap, CalendarClock, QrCode, Tag, Camera];
const stepIcons: ReadonlyArray<LucideIcon> = [Send, FileCheck2, Images];


function Occasions() {
  return (
    <section aria-labelledby="ph-occasions-title" className="py-24 md:py-36">
      <div className="ev-wrap">
        <SectionHead
          id="ph-occasions-title"
          title={
            <>
              Fotografiranje za <em>vsako priložnost</em>
            </>
          }
          lede="Izberite svoj dogodek in v dveh minutah oddajte povpraševanje za prost termin."
        />
        <ul className="mt-14 grid gap-x-5 gap-y-12 sm:grid-cols-2 md:mt-20">
          {photographerOccasions.map((card) => (
            <li key={card.title}>
              <InquiryTrigger
                defaults={{ type: TYPE, eventType: card.eventType }}
                className="group block w-full text-left"
              >
                <span className="ev-photo relative block aspect-[3/2]">
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    sizes="(max-width: 639px) 92vw, 46vw"
                    className="object-cover"
                  />
                </span>
                <span className="ev-display mt-5 block text-[25px] md:text-[28px]">{card.title}</span>
                <span className="mt-2 block max-w-[46ch] text-[15px] leading-relaxed text-[var(--ev-stone)]">
                  {card.desc}
                </span>
                <span className="ev-link mt-4">
                  Preverite prost termin
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </InquiryTrigger>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="fotografije" aria-labelledby="ph-gallery-title" className="ev-dark ev-wine-bg py-24 md:py-36">
      <div className="ev-wrap">
        <SectionHead
          id="ph-gallery-title"
          dark
          title={
            <>
              Fotografije z <em>resničnih dogodkov</em>
            </>
          }
          lede="Izbor z dogodkov, ki jih je fotografiral naš fotograf. Kliknite fotografijo za povečavo."
        />

        {photographerGallery.map((group) => (
          <div key={group.id} id={`fotografije-${group.id}`} className="mt-16 border-t ev-rule pt-8 md:mt-24">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="ev-display text-[clamp(28px,3vw,40px)]">{group.title}</h3>
              <p className="text-[15px] text-[var(--ev-mist)]">{group.note}</p>
            </div>
            <PhotoLightboxGrid
              photos={group.photos.map(({ src, alt }) => ({ src, alt }))}
              itemClassNames={group.photos.map((photo) => (photo.portrait ? "aspect-[3/4]" : "aspect-[3/2]"))}
              sizes="(max-width: 1023px) 46vw, 30vw"
              className="mt-8 columns-2 gap-3 lg:columns-3 [&>li]:mb-3 [&>li]:break-inside-avoid [&>li]:rounded-[14px]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section aria-labelledby="ph-process-title" className="border-t ev-rule py-24 md:py-36">
      <div className="ev-wrap">
        <h2 id="ph-process-title" className="ev-display ev-h2 max-w-[18ch]">
          Od povpraševanja do <em>fotografij</em>
        </h2>
        <ol className="mt-16 grid border-t border-[var(--ev-night)] md:mt-20 md:grid-cols-3">
          {photographerSteps.map((step, index) => {
            const Icon = stepIcons[index] ?? Send;
            return (
              <li
                key={step.title}
                className="border-b ev-rule py-10 md:border-b-0 md:py-12 md:pr-10 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-10"
              >
                <span className="ev-icon" aria-hidden="true">
                  <Icon strokeWidth={1.5} className="h-5 w-5" />
                </span>
                <h3 className="ev-display mt-10 text-[27px] leading-tight">{step.title}</h3>
                <p className="mt-4 max-w-[38ch] text-[16px] leading-relaxed text-[var(--ev-stone)]">{step.desc}</p>
                {index === 0 && (
                  <InquiryTrigger defaults={{ type: TYPE }} className="ev-btn ev-btn-dark mt-8">
                    Pošljite povpraševanje
                    <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
                  </InquiryTrigger>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Packages() {
  return (
    <section id="cenik" aria-labelledby="ph-packages-title" className="ev-blush-bg py-24 md:py-36">
      <div className="ev-wrap">
        <SectionHead
          id="ph-packages-title"
          title={
            <>
              Cenik fotografiranja <em>dogodkov</em>
            </>
          }
          lede="Tri fiksne cene. Urejanje fotografij je vključeno v vsak paket."
        />

        <div className="mt-14 grid gap-5 md:mt-20 lg:grid-cols-3">
          {photographerPackages.map((item) => {
            const featured = "featured" in item && item.featured;
            return (
              <article
                key={item.name}
                className={cn(
                  "flex flex-col rounded-[20px] p-7 transition-transform duration-300 hover:-translate-y-0.5 md:p-9",
                  featured ? "ev-dark ev-berry-bg" : "bg-[var(--ev-white)]",
                )}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="ev-display text-[28px]">{item.name}</h3>
                  {featured && <span className="ev-badge mr-0">Najpogostejša izbira</span>}
                </div>
                <p className="ev-display ev-price ev-tabular mt-6 text-[clamp(56px,5.4vw,80px)] font-bold leading-none">
                  {formatEuro(item.price)} €
                </p>
                <p className={cn("mt-3 flex items-center gap-1.5 text-[15px]", featured ? "text-white/80" : "text-[var(--ev-stone)]")}>
                  <Clock aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
                  {item.duration}
                </p>
                <p className="mt-6 max-w-[34ch] text-[16px] leading-relaxed">{item.tagline}</p>
                <ul className="mb-10 mt-8 grid border-t ev-rule">
                  {photographerIncluded.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 border-b ev-rule py-3 text-[15px]">
                      <Check aria-hidden="true" strokeWidth={1.75} className="ev-accent h-4 w-4 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <InquiryTrigger
                  defaults={{ type: TYPE, hours: item.hours }}
                  className={cn("ev-btn mt-auto w-full", featured ? "ev-btn-primary" : "ev-btn-dark")}
                >
                  Izberite paket
                  <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
                </InquiryTrigger>
                <InquiryTrigger
                  defaults={{ type: TYPE, hours: item.hours, notes: QR_NOTE }}
                  className="mt-4 text-center text-[14px] underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
                >
                  Dodajte fotografije takoj prek QR · +{photographerQrLivePrice} €
                </InquiryTrigger>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-[15px] text-[var(--ev-stone)]">
          Dodatna ura fotografiranja: <span className="ev-price ev-tabular font-medium text-[var(--ev-night)]">+{photographerExtraHourPrice} €</span>.
          {" "}Fotografije takoj prek QR kode: <span className="ev-price ev-tabular font-medium text-[var(--ev-night)]">+{photographerQrLivePrice} €</span>.
        </p>
      </div>
    </section>
  );
}

function BoothCombo() {
  return (
    <section aria-labelledby="ph-combo-title" className="ev-dark py-24 md:py-36">
      <div className="ev-wrap grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="ph-combo-title" className="ev-display ev-h2">
            Fotografiranje in Photo Booth na <em>istem dogodku</em>
          </h2>
          <p className="ev-lede mt-7 text-[var(--ev-mist)]">
            Fotograf ujame dogajanje, v Photo Boothu pa gostje sami ustvarijo in natisnejo svoje
            fotografije. Oboje dobite v eni ponudbi, pri isti ekipi.
          </p>
          <dl className="ev-tabular mt-10 border-t ev-rule text-[16px]">
            <div className="flex items-baseline justify-between gap-4 border-b ev-rule py-4">
              <dt className="text-[var(--ev-mist)]">Fotografiranje</dt>
              <dd className="ev-display ev-price text-[24px]">od {photographerBasePrice} €</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b ev-rule py-4">
              <dt className="text-[var(--ev-mist)]">Photo Booth</dt>
              <dd className="ev-display ev-price text-[24px]">od {BOOTH_PRICE} €</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <InquiryTrigger
              defaults={{ type: TYPE, notes: "Zanima me tudi Photo Booth." }}
              className="ev-btn ev-btn-primary"
            >
              Povprašajte za oboje
              <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
            </InquiryTrigger>
            <a href="/photo-booth" className="ev-link">
              Več o Photo Boothu
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="ev-photo relative aspect-[4/3] rounded-[20px]">
            <Image
              src="/application/hero-collage/gold-group.webp"
              alt="Gostje z rekviziti pozirajo v Photo Boothu"
              fill
              sizes="(max-width: 1023px) 92vw, 680px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function PhotographerRedesignPage() {
  return (
    <>
      <PhotographerHero />
      <ClientMarquee />
      <Occasions />
      <Gallery />
      <FeatureList
        id="ph-features-title"
        title={
          <>
            Kaj dobite <em>v vsakem paketu</em>
          </>
        }
        items={photographerFeatures}
        icons={featureIcons}
      />
      <Process />
      <Packages />
      <BoothCombo />
      <RedesignReviews />
      <RedesignFaq items={photographerFaq} formal />
      <RedesignClosing formal type={TYPE} />
    </>
  );
}
