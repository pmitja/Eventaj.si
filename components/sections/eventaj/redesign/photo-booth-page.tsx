import { getAlbumPriceLabel } from "@/content/eventaj/album-pricing";
import { faqItems, photoFeatures, photoPackages, photoSpecs } from "@/content/eventaj/data";
import { photoEventCards } from "@/content/eventaj/event-pages";
import { photoBoothQrGalleryPrice } from "@/content/eventaj/qr-gallery-pricing";
import {
  Crown,
  Glasses,
  Images,
  Infinity as InfinityIcon,
  type LucideIcon,
  MessageSquareQuote,
  Palette,
  PenLine,
  Printer,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import { RedesignFaq } from "./redesign-faq";
import { RedesignClosing } from "./redesign-footer";
import { RedesignReviews } from "./redesign-reviews";
import { PhotoBoothHero, type ServiceHeroCopy } from "./photo-booth-hero";
import { ClientMarquee } from "./client-marquee";
import { PrintWall } from "./print-wall";
import { EventCardGrid, FeatureList, PackageCards, QrGalleryUpsell, SpecList } from "./service-sections";

const BASE_PRICE = photoPackages[0].price;

const featureIcons: ReadonlyArray<LucideIcon> = [InfinityIcon, Printer, Palette, Glasses, UserCheck, Images];

const albums = [
  { size: "small", name: "Mali album", image: "/application/mali-album.webp" },
  { size: "large", name: "Veliki album", image: "/application/veliki-album.webp" },
] as const;

const props = [
  {
    Icon: Glasses,
    title: "Očala",
    text: "Srčkasta, zvezdasta, retro in čisto nora očala za vsak okus.",
    image: { src: "/application/birthday-parties/20260609_172305184.webp", alt: "Par s srčkastimi očali pred rožnato bleščečo steno", position: "50% 40%" },
  },
  {
    Icon: Crown,
    title: "Klobuki",
    text: "Bleščeči klobuki v rdeči, modri, zlati in srebrni barvi.",
    image: { src: "/application/hero-collage/doba-35.webp", alt: "Gostje z rdečim bleščečim klobukom in rekviziti v foto boxu", position: "45% 30%" },
  },
  {
    Icon: MessageSquareQuote,
    title: "Tablice z napisi",
    text: "Lesene tablice s šaljivimi napisi, ki jih gostje dvignejo pred kamero.",
    image: { src: "/application/wedding-photos/20260530_171815397.webp", alt: "Par z lesenima tablicama z napisi v foto boxu na poroki", position: "50% 45%" },
  },
  {
    Icon: PenLine,
    title: "Personalizirane tablice",
    text: "Tablice z vašim besedilom ali logotipom izdelamo po naročilu.",
    price: "10 kosov za 40 €",
    image: { src: "/application/photo-booth-hero/20260627_214353381.webp", alt: "Svatje z lesenimi tablicami in personaliziranim poročnim tiskom", position: "50% 40%" },
  },
] as const;

function Props() {
  return (
    <section aria-labelledby="pb-props-title" className="ev-dark ev-wine-bg py-24 md:py-32">
      <div className="ev-wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="pb-props-title" className="ev-display ev-h2 lg:col-span-7">
            Rekviziti, ki dopolnijo <em>sliko</em>
          </h2>
          <p className="ev-lede text-[var(--ev-mist)] lg:col-span-4 lg:col-start-9">
            Gostje izberejo očala, klobuk ali tablico in vsaka fotografija dobi svoj značaj.
          </p>
        </div>

        <ul className="mt-14 grid gap-3 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {props.map(({ Icon, title, text, image, ...rest }) => (
            <li key={title} className="flex flex-col overflow-hidden rounded-[20px] bg-[var(--ev-night)]">
              <div className="ev-photo relative aspect-[4/3]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 330px"
                  className="object-cover"
                  style={{ objectPosition: image.position }}
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="ev-display flex items-center gap-3 text-[24px]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--ev-champagne)] text-[var(--ev-night)]">
                    <Icon aria-hidden="true" strokeWidth={1.75} className="h-5 w-5" />
                  </span>
                  {title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--ev-mist)]">{text}</p>
                {"price" in rest && (
                  <p className="mt-auto pt-5">
                    <span className="ev-tag text-[17px]">{rest.price}</span>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Packages() {
  return (
    <section id="cenik" aria-labelledby="pb-packages-title" className="ev-blush-bg py-24 md:py-36">
      <div className="ev-wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="pb-packages-title" className="ev-display ev-h2 lg:col-span-7">
            Paketi za vsak tip <em>dogodka</em>
          </h2>
          <p className="ev-lede text-[var(--ev-stone)] lg:col-span-4 lg:col-start-9">
            Transparentne cene brez nepričakovanih doplačil.
          </p>
        </div>

        <PackageCards packages={photoPackages} type="Photo Booth" qrPrice={photoBoothQrGalleryPrice} />

        <div id="albumi" className="mt-24 grid gap-12 md:mt-32 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h3 className="ev-display text-[clamp(30px,3vw,44px)]">
              Spominski <em>album</em>
            </h3>
            <p className="mt-5 max-w-[42ch] text-[16px] leading-relaxed text-[var(--ev-stone)]">
              Natisnjene fotografije z dogodka zberi v albumu. Izbereš lahko mali ali veliki album,
              oba sta na voljo v črni in beli barvi.
            </p>
            <p className="mt-3 max-w-[42ch] text-[14px] leading-relaxed text-[var(--ev-stone)]">
              Pri paketih s 3 ali 4 urami je mali album že vključen. Velikost in barvo izbereš ob
              povpraševanju.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-2 md:gap-5 lg:col-span-8">
            {albums.map((album) => (
              <article key={album.size}>
                <div className="ev-photo">
                  <Image
                    src={album.image}
                    alt={`${album.name} v črni in beli barvi s spiralno vezavo`}
                    width={1448}
                    height={1086}
                    sizes="(max-width: 767px) 92vw, 440px"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-3">
                  <h4 className="ev-display text-[25px]">{album.name}</h4>
                  <span className="text-[14px] text-[var(--ev-stone)]">Črn ali bel</span>
                </div>
                <dl className="ev-tabular mt-4 border-t ev-rule text-[15px]">
                  <div className="flex justify-between gap-4 border-b ev-rule py-3">
                    <dt className="text-[var(--ev-stone)]">Photo Booth · 2 uri</dt>
                    <dd className="ev-price font-medium">{getAlbumPriceLabel(2, album.size)}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b ev-rule py-3">
                    <dt className="text-[var(--ev-stone)]">Photo Booth · 3 ali 4 ure</dt>
                    <dd className="ev-price font-medium">{album.size === "small" ? "Vključen v paket" : getAlbumPriceLabel(3, album.size)}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-14 text-[14px] text-[var(--ev-stone)]">
          Dodatne ure: +60 €/h (Photo Booth), +80 €/h (360° Booth). Prevoz in posebne zahteve
          potrdimo v končni ponudbi.
        </p>
      </div>
    </section>
  );
}

export function PhotoBoothRedesignPage({
  heroCopy,
  featureTitle,
}: {
  heroCopy?: ServiceHeroCopy;
  featureTitle?: React.ReactNode;
}) {
  return (
    <>
        <PhotoBoothHero copy={heroCopy} />
        <ClientMarquee />
        <FeatureList
          id="pb-features-title"
          title={
            featureTitle ?? (
              <>
                Vse vključeno, <em>brez skritih stroškov</em>
              </>
            )
          }
          items={photoFeatures}
          icons={featureIcons}
        />
        <Props />
        <EventCardGrid
          id="pb-events-title"
          title={
            <>
              Photo Booth za <em>vsak tip</em> dogodka
            </>
          }
          lede="Vsak dogodek ima svojo zgodbo. Poglej, kako Photo Booth zaživi na tvojem."
          cards={photoEventCards}
        />
        <SpecList
          id="pb-specs-title"
          title={
            <>
              Vse, kar moraš <em>vedeti</em>
            </>
          }
          items={photoSpecs}
        />
        <PrintWall
          title={
            <>
              Pravi printi z <em>naših dogodkov</em>
            </>
          }
          secondary={{ href: "/360-photo-booth", label: "Spoznaj 360° Booth" }}
        />
        <Packages />
        <QrGalleryUpsell
          id="pb-qr-title"
          type="Photo Booth"
          basePrice={BASE_PRICE}
          qrPrice={photoBoothQrGalleryPrice}
          title={
            <>
              Photo Booth in vsi utrinki <em>gostov</em>
            </>
          }
        />
        <RedesignReviews />
        <RedesignFaq
          items={faqItems}
          moreLink={{ href: "/photo-booth/faq", label: "Vsa vprašanja o photo boothu" }}
        />
        <RedesignClosing />
    </>
  );
}
