import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Brush,
  Check,
  Clock,
  Images,
  type LucideIcon,
  Music,
  Printer,
  Ruler,
  Share2,
  Tag,
  Truck,
  Video,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { HoverVideo } from "./hover-video";

export type BoothType = "Photo Booth" | "360° Booth";

const specIcons: Record<string, LucideIcon> = {
  clock: Clock,
  space: Ruler,
  setup: Wrench,
  print: Printer,
  gallery: Images,
  truck: Truck,
  brush: Brush,
  tag: Tag,
  video: Video,
  share: Share2,
  music: Music,
};

/** Heading + lede on the 12-col grid, aligned at the bottom. */
export function SectionHead({
  id,
  title,
  lede,
  dark = false,
}: {
  id: string;
  title: ReactNode;
  lede?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <h2 id={id} className="ev-display ev-h2 lg:col-span-7">
        {title}
      </h2>
      {lede && (
        <p className={cn("ev-lede lg:col-span-4 lg:col-start-9", dark ? "text-[var(--ev-mist)]" : "text-[var(--ev-stone)]")}>
          {lede}
        </p>
      )}
    </div>
  );
}

/** What's included: icon list in a 3-col ruled grid on porcelain. */
export function FeatureList({
  id,
  title,
  items,
  icons,
}: {
  id: string;
  title: ReactNode;
  items: ReadonlyArray<{ title: string; desc: string }>;
  icons: ReadonlyArray<LucideIcon>;
}) {
  return (
    <section aria-labelledby={id} className="py-24 md:py-36">
      <div className="ev-wrap">
        <h2 id={id} className="ev-display ev-h2 max-w-[16ch]">
          {title}
        </h2>
        {/* Mobile: a row of swipeable cards (the next one peeks in). From md up: the ruled grid. */}
        <ul className="-mx-[var(--ev-gutter)] mt-12 flex snap-x snap-mandatory scroll-px-[var(--ev-gutter)] gap-3 overflow-x-auto px-[var(--ev-gutter)] pb-2 [scrollbar-width:none] md:mx-0 md:mt-20 md:grid md:snap-none md:grid-cols-2 md:gap-0 md:overflow-visible md:border-t md:border-[var(--ev-night)] md:px-0 md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {items.map((feature, index) => {
            const Icon = icons[index] ?? Check;
            return (
              <li
                key={feature.title}
                className="w-[80%] max-w-[340px] shrink-0 snap-start rounded-[20px] bg-[var(--ev-white)] p-7 ev-rule md:w-auto md:max-w-none md:rounded-none md:border-b md:bg-transparent md:px-0 md:py-8 md:pr-10 lg:py-10"
              >
                <span className="ev-icon mb-6" aria-hidden="true">
                  <Icon strokeWidth={1.5} className="h-5 w-5" />
                </span>
                <h3 className="ev-display text-[24px] md:text-[27px]">{feature.title}</h3>
                <p className="mt-3 max-w-[40ch] text-[16px] leading-relaxed text-[var(--ev-stone)]">{feature.desc}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

type EventCard = {
  title: string;
  desc: string;
  cta: string;
  href: string;
  image: { src: string; alt: string; poster?: string };
};

// Weddings and birthdays lead, then the rest in their given order.
const eventCardOrder = ["Poroke", "Rojstni dnevi"];
function orderCards<T extends { title: string }>(cards: ReadonlyArray<T>) {
  const rank = (title: string) => {
    const index = eventCardOrder.indexOf(title);
    return index === -1 ? eventCardOrder.length : index;
  };
  return [...cards].sort((a, b) => rank(a.title) - rank(b.title));
}

/** Event types: photo (or clip) cards linking to the event landing pages. */
export function EventCardGrid({
  id,
  title,
  lede,
  cards,
  className,
}: {
  id: string;
  title: ReactNode;
  lede?: ReactNode;
  cards: ReadonlyArray<EventCard>;
  className?: string;
}) {
  const ordered = orderCards(cards);
  const isVideo = (src: string) => src.endsWith(".mp4");
  return (
    <section aria-labelledby={id} className={cn("py-24 md:py-36", className)}>
      <div className="ev-wrap">
        <SectionHead id={id} title={title} lede={lede} />
        <ul className={cn("mt-14 grid gap-x-5 gap-y-12 md:mt-20", ordered.length > 4 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2")}>
          {ordered.map((card) => (
            <li key={card.href}>
              <Link href={card.href} className="group block">
                <span className={cn("ev-photo relative block", ordered.length > 4 ? "aspect-[4/5]" : "aspect-[3/2]")}>
                  {isVideo(card.image.src) ? (
                    <HoverVideo src={card.image.src} poster={card.image.poster} label={card.image.alt} />
                  ) : (
                    <Image
                      src={card.image.src}
                      alt={card.image.alt}
                      fill
                      sizes="(max-width: 639px) 92vw, 46vw"
                      className="object-cover"
                    />
                  )}
                </span>
                <span className="ev-display mt-5 block text-[25px] md:text-[28px]">{card.title}</span>
                <span className="mt-2 block max-w-[46ch] text-[15px] leading-relaxed text-[var(--ev-stone)]">{card.desc}</span>
                <span className="ev-link mt-4">
                  {card.cta}
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Specs: sticky heading and an icon definition list. */
export function SpecList({
  id,
  title,
  items,
}: {
  id: string;
  title: ReactNode;
  items: ReadonlyArray<{ label: string; value: string; icon: string }>;
}) {
  return (
    <section aria-labelledby={id} className="border-t ev-rule py-24 md:py-36">
      <div className="ev-wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
        <h2 id={id} className="ev-display ev-h2 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          {title}
        </h2>
        <dl className="border-t border-[var(--ev-night)] lg:col-span-7 lg:col-start-6">
          {items.map((spec) => {
            const Icon = specIcons[spec.icon] ?? Check;
            return (
              <div key={spec.label} className="grid gap-2 border-b ev-rule py-6 md:grid-cols-[250px_1fr] md:gap-8">
                <dt className="ev-display flex items-center gap-4 text-[21px]">
                  <Icon aria-hidden="true" strokeWidth={1.5} className="ev-accent h-5 w-5 shrink-0" />
                  {spec.label}
                </dt>
                <dd className="max-w-[58ch] text-[16px] leading-relaxed text-[var(--ev-stone)] md:pt-1">{spec.value}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

type Package = {
  name: string;
  price: number;
  hours: number;
  tagline: string;
  features: ReadonlyArray<string>;
  featured?: boolean;
};

/** Priced package cards. The featured one sits on berry. */
export function PackageCards({
  packages,
  type,
  qrPrice,
}: {
  packages: ReadonlyArray<Package>;
  type: BoothType;
  qrPrice: number;
}) {
  const withAlbum = (hours: number) => (type === "Photo Booth" && hours >= 3 ? "small" : "");
  return (
    <div className="mt-14 grid gap-5 md:mt-20 lg:grid-cols-3">
      {packages.map((item) => {
        const featured = Boolean(item.featured);
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
            <p className="ev-display ev-price ev-tabular mt-6 text-[clamp(56px,5.4vw,80px)] font-bold leading-none">{item.price} €</p>
            <p className={cn("mt-3 flex items-center gap-1.5 text-[15px]", featured ? "text-white/80" : "text-[var(--ev-stone)]")}>
              <Clock aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
              {item.hours} {item.hours === 2 ? "uri" : "ure"}
            </p>
            <p className="mt-6 max-w-[34ch] text-[16px] leading-relaxed">{item.tagline}</p>
            <ul className="mb-10 mt-8 grid border-t ev-rule">
              {item.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 border-b ev-rule py-3 text-[15px]">
                  <Check aria-hidden="true" strokeWidth={1.75} className="ev-accent h-4 w-4 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <InquiryTrigger
              defaults={{ type, hours: String(item.hours), albumSize: withAlbum(item.hours) }}
              className={cn("ev-btn mt-auto w-full", featured ? "ev-btn-primary" : "ev-btn-dark")}
            >
              Izberi paket
              <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
            </InquiryTrigger>
            <InquiryTrigger
              defaults={{ type, hours: String(item.hours), qrGallery: true, albumSize: withAlbum(item.hours) }}
              className="mt-4 text-center text-[14px] underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
            >
              Dodaj QR galerijo · +{qrPrice} € / dogodek
            </InquiryTrigger>
          </article>
        );
      })}
    </div>
  );
}

export const qrGalleryFeatures = [
  "Dostop prek QR kode, brez aplikacije",
  "Neomejeno število gostov",
  "Fotografije, videi in prenos originalov",
  "Komentarji in glasovna knjiga gostov",
  "Do 20 videov, dolgih največ 60 sekund",
  "Live slideshow med dogodkom",
  "Administracija dogodka in QR koda",
  "ZIP izvoz vseh fotografij",
  "Galerija je na voljo 180 dni",
] as const;

export const qrGalleryAddons = [
  { name: "AI Best Photos", note: "do 3.000 fotografij", price: "+15 €" },
  { name: "Neomejeno videov", note: "brez omejitve števila", price: "+15 €" },
] as const;

/** QR gallery upsell on night: combined price, screenshot, feature list and add-ons. */
export function QrGalleryUpsell({
  id,
  type,
  basePrice,
  qrPrice,
  title,
}: {
  id: string;
  type: BoothType;
  basePrice: number;
  qrPrice: number;
  title: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="ev-dark py-24 md:py-36">
      <div className="ev-wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id={id} className="ev-display ev-h2">
            {title}
          </h2>
          <p className="ev-lede mt-7 text-[var(--ev-mist)]">
            Gostje skenirajo QR kodo ter sproti dodajajo fotografije, videe in komentarje. Vse se
            zbira v zasebni galeriji dogodka.
          </p>
          <div className="mt-10 border-t ev-rule pt-8">
            <p className="text-[14px] text-[var(--ev-mist)]">{type} + QR galerija</p>
            <p className="ev-display ev-price ev-tabular mt-2 text-[clamp(48px,5vw,72px)] leading-none">
              {basePrice + qrPrice} €
            </p>
            <p className="ev-tabular mt-3 text-[14px] text-[var(--ev-mist)]">
              od {basePrice} € + {qrPrice} € za galerijo
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <InquiryTrigger defaults={{ type, hours: "2", qrGallery: true }} className="ev-btn ev-btn-primary">
                Povprašaj za paket
                <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
              </InquiryTrigger>
              <Link href="/qr-galerija" className="ev-link">
                Več o QR galeriji
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="ev-photo relative aspect-[16/10]">
            <Image
              src="/qr-galerija/screenshots/galerija-desktop.png"
              alt="Primer zasebne QR galerije dogodka Ana in Marko"
              fill
              sizes="(max-width: 1023px) 92vw, 680px"
              className="object-cover object-top"
            />
          </div>
          <ul className="mt-8 grid gap-x-8 border-t ev-rule sm:grid-cols-2">
            {qrGalleryFeatures.map((item) => (
              <li key={item} className="flex items-center gap-3 border-b ev-rule py-3.5 text-[15px]">
                <Check aria-hidden="true" strokeWidth={1.75} className="ev-accent h-4 w-4 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {qrGalleryAddons.map((addon) => (
              <li key={addon.name} className="flex items-baseline justify-between gap-4 border ev-rule p-5">
                <span>
                  <span className="block text-[15px]">{addon.name}</span>
                  <span className="mt-1 block text-[13px] text-[var(--ev-mist)]">{addon.note}</span>
                </span>
                <span className="ev-display ev-price ev-tabular text-[22px]">{addon.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Dark title band for pages without a photo hero (articles, legal, FAQ). */
export function PageIntro({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="ev-dark pb-16 pt-36 md:pb-24 md:pt-48">
      <div className="ev-wrap ev-rise">
        {eyebrow && <div className="mb-7 text-[14px] text-[var(--ev-mist)]">{eyebrow}</div>}
        <h1 className="ev-display max-w-[20ch] text-[clamp(40px,5.4vw,80px)] leading-[1.02]">{title}</h1>
        {lede && <p className="ev-lede mt-7 text-[var(--ev-porcelain)]/90">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
