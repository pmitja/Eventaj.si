import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { addons, booth360FaqItems, booth360Features, booth360Packages, booth360Specs } from "@/content/eventaj/data";
import { booth360EventCards } from "@/content/eventaj/event-pages";
import { qrGalleryPrice } from "@/content/eventaj/qr-gallery-pricing";
import { serviceHeroProof, serviceHeroVisuals } from "@/content/eventaj/service-visuals";
import { cn } from "@/lib/utils";
import { ArrowRight, Lightbulb, Music, Share2, Sparkles, Users, Video } from "lucide-react";
import { ClientMarquee } from "./client-marquee";
import { HeldFrameClips } from "./held-frame-clips";
import { RedesignFaq } from "./redesign-faq";
import { RedesignClosing } from "./redesign-footer";
import { RedesignReviews } from "./redesign-reviews";
import { EventCardGrid, FeatureList, PackageCards, QrGalleryUpsell, SectionHead, SpecList } from "./service-sections";

const BASE_PRICE = booth360Packages[0].price;
const featureIcons = [Video, Share2, Music, Lightbulb, Users, Sparkles];

const clips = serviceHeroVisuals["360"].images.flatMap((item) =>
  "poster" in item ? [{ src: item.src, poster: item.poster, alt: item.alt }] : [],
);

const animationAddon = addons.find((addon) => addon.item.startsWith("Personalizirane animacije"));
const extraHour = addons.find((addon) => addon.item === "Dodatna ura najema 360° Booth");

function Hero({ h1 }: { h1: string }) {
  return (
    <section className="ev-dark relative isolate overflow-hidden">
      <div className="ev-wrap grid items-center gap-12 pb-16 pt-32 md:pb-24 lg:min-h-[min(100svh,1040px)] lg:grid-cols-12 lg:gap-10 lg:pb-20">
        <div className="ev-rise lg:col-span-7">
          <h1 className="sr-only">{h1}</h1>
          <p className="mb-7 text-[19px] sm:text-[23px]">
            <a href="#cenik" className="ev-tag transition-transform hover:-translate-y-0.5">
              <small>Paketi od</small> {BASE_PRICE} €
            </a>
          </p>
          <p aria-hidden="true" className="ev-display text-[clamp(42px,6vw,88px)] leading-[1.02]">
            Trenutek <em>v gibanju</em>
          </p>
          <p className="ev-lede mt-7 text-[var(--ev-porcelain)]/90">
            Gost stopi na platformo, kamera zaokroži okoli njega in v nekaj sekundah dobi
            slow-motion video, pripravljen za deljenje. Za poroke, rojstne dneve, poslovne dogodke
            in promocije po vsej Sloveniji.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-5">
            <InquiryTrigger defaults={{ type: "360° Booth" }} className="ev-btn ev-btn-primary">
              Pridobi ponudbo
              <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
            </InquiryTrigger>
            <a href="#posnetki" className="ev-link">
              Poglej posnetke
            </a>
          </div>
          <ul className="mt-9 grid grid-cols-2 gap-x-5 gap-y-2 text-[14px] text-[var(--ev-mist)] sm:flex sm:flex-wrap sm:items-center sm:gap-x-0">
            {serviceHeroProof.stats.map((item, index) => (
              <li
                key={item.label}
                className={cn("ev-tabular sm:pr-5", index > 0 && "sm:border-l sm:border-[var(--ev-rule-dark)] sm:pl-5")}
              >
                <span className="text-[var(--ev-porcelain)]">{item.value}</span> {item.label}
              </li>
            ))}
          </ul>
        </div>
        <HeldFrameClips
          clips={clips.slice(0, 5)}
          className="mx-auto aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-[20px] lg:col-span-4 lg:col-start-9 lg:max-w-none"
        />
      </div>
    </section>
  );
}

function ClipWall() {
  const wall = clips.slice(5, 9);
  return (
    <section id="posnetki" aria-labelledby="b360-clips-title" className="ev-dark ev-wine-bg py-24 md:py-32">
      <div className="ev-wrap">
        <SectionHead
          id="b360-clips-title"
          dark
          title={
            <>
              Pravi posnetki z <em>naših dogodkov</em>
            </>
          }
          lede="Vsak video dobi digitalni okvir z imeni, datumom ali logotipom in glasbo, ki jo uskladimo pred dogodkom."
        />
        <div className="mt-12 grid grid-cols-2 gap-2.5 md:gap-3 lg:grid-cols-4">
          {wall.map((clip, index) => (
            <HeldFrameClips
              key={clip.src}
              clips={[clip, ...wall.filter((_, other) => other !== index)]}
              holdMs={9000 + index * 1300}
              className={cn("aspect-[9/16] overflow-hidden rounded-[14px]", index > 1 && "hidden lg:block")}
            />
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <InquiryTrigger defaults={{ type: "360° Booth" }} className="ev-btn ev-btn-primary">
            Rezerviraj 360° Booth
            <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
          </InquiryTrigger>
          <a href="/photo-booth" className="ev-link">
            Spoznaj Photo Booth s tiskom
          </a>
        </div>
      </div>
    </section>
  );
}

function Packages() {
  return (
    <section id="cenik" aria-labelledby="b360-packages-title" className="ev-blush-bg py-24 md:py-36">
      <div className="ev-wrap">
        <SectionHead
          id="b360-packages-title"
          title={
            <>
              Paketi za vsak tip <em>dogodka</em>
            </>
          }
          lede="Transparentne cene brez nepričakovanih doplačil."
        />
        <PackageCards packages={booth360Packages} type="360° Booth" qrPrice={qrGalleryPrice} />
        <ul className="mt-14 grid gap-x-8 border-t ev-rule text-[15px] md:grid-cols-2">
          {[extraHour, animationAddon].flatMap((addon) =>
            addon ? (
              <li key={addon.item} className="flex items-baseline justify-between gap-4 border-b ev-rule py-4">
                <span>{addon.item}</span>
                <span className="ev-display ev-price ev-tabular text-[20px]">{addon.price}</span>
              </li>
            ) : (
              []
            ),
          )}
        </ul>
        <p className="mt-8 text-[14px] text-[var(--ev-stone)]">
          Prevoz in posebne zahteve potrdimo v končni ponudbi.
        </p>
      </div>
    </section>
  );
}

export function Booth360RedesignPage({ h1 }: { h1: string }) {
  return (
    <>
      <Hero h1={h1} />
      <ClientMarquee />
      <FeatureList
        id="b360-features-title"
        title={
          <>
            Premium izkušnja, <em>brez kompromisov</em>
          </>
        }
        items={booth360Features}
        icons={featureIcons}
      />
      <ClipWall />
      <EventCardGrid
        id="b360-events-title"
        title={
          <>
            360° Booth za <em>vsak tip</em> dogodka
          </>
        }
        lede="Vsak dogodek ima svojo zgodbo. Poglej, kako 360° Booth zaživi na tvojem."
        cards={booth360EventCards}
      />
      <SpecList
        id="b360-specs-title"
        title={
          <>
            Vse, kar moraš <em>vedeti</em>
          </>
        }
        items={booth360Specs}
      />
      <Packages />
      <QrGalleryUpsell
        id="b360-qr-title"
        type="360° Booth"
        basePrice={BASE_PRICE}
        qrPrice={qrGalleryPrice}
        title={
          <>
            360° videi in vsi utrinki <em>gostov</em>
          </>
        }
      />
      <RedesignReviews />
      <RedesignFaq
        items={booth360FaqItems}
        moreLink={{ href: "/360-photo-booth/faq", label: "Vsa vprašanja o 360° Boothu" }}
      />
      <RedesignClosing />
    </>
  );
}
