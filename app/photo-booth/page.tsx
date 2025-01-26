import BasicBoothHero from "@/components/basic-booth-hero";
import { CTAContactSection } from "@/components/sections/cta-contact-section";
import Features from "@/components/sections/features";
import { basicBoothFeatures } from "@/components/sections/features-content";
import HowItWorks from "@/components/sections/how-it-works";
import {
  PricingPlans,
  type PricingPlan,
} from "@/components/sections/pricing-plans";
import PromoImage from "@/components/sections/promo-image";
import { TestimonialsSection } from "@/components/sections/testimonials";
import WhenToChoose from "@/components/sections/when-to-choose";
import { photoBoothWhenToChoose } from "@/content/when-to-choose";
import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import { Service } from "schema-dts";

export const metadata: Metadata = {
  title: "Photo Booth Najem | Zabava za Vsak Dogodek | Eventaj.si",
  description:
    "Najemi photo booth za nepozabno doživetje na vaši poroki, zabavi ali dogodku. Profesionalna oprema, takojšnje tiskanje fotografij in digitalne kopije. Rezervirajte zdaj!",
  keywords: [
    "photo booth najem",
    "photo booth za poroko",
    "foto kabina najem",
    "najem photo booth Ljubljana",
    "foto stojnica za dogodke",
    "photo booth za zabavo",
    "photo booth za rojstni dan",
    "photo booth tiskanje",
    "photo booth cena",
  ],
  openGraph: {
    title: "Photo Booth Najem | Zabava za Vsak Dogodek | Eventaj.si",
    description:
      "Najemi photo booth za nepozabno doživetje na vaši poroki, zabavi ali dogodku. Profesionalna oprema, takojšnje tiskanje fotografij in digitalne kopije.",
    url: "https://eventaj.si/photo-booth",
    siteName: "Eventaj.si",
    images: [
      {
        url: "/og/photo-booth.jpg",
        width: 1200,
        height: 630,
        alt: "Photo Booth Najem - Eventaj.si",
      },
    ],
    locale: "sl_SI",
    type: "website",
  },
};

const testimonials = [
  {
    author: {
      name: "Maja Novak",
      title: "Poročna fotografinja",
      image: "/application/sksg.webp",
    },
    text: "Photo booth je bil odlična izbira za našo poroko. Gostje so bili navdušeni!",
  },
  {
    author: {
      name: "Tomaž Kranjc",
      title: "Dogodek podjetja",
      image: "/application/autodelta.webp",
    },
    text: "Izjemna storitev in kakovostne fotografije! Odlično ste popestrili naš korporativni dogodek.",
  },
  {
    author: {
      name: "Petra Horvat",
      title: "Rojstnodnevna slavljenka",
    },
    text: "Vsi moji prijatelji so se noro zabavali z vašim photo boothom. Nepozabni spomini!",
  },
  {
    author: {
      name: "Matej Zupančič",
      title: "Organizator dogodkov",
    },
    text: "Profesionalen pristop in odlična izvedba! Definitivno vas bomo še kdaj najeli.",
  },
  {
    author: {
      name: "Ana Kovač",
      title: "Nevesta",
    },
    text: "Hvala, ker ste poskrbeli za tako posebno izkušnjo. Vse je bilo brezhibno!",
  },
];

const pricingPlans: PricingPlan[] = [
  {
    name: "Basic",
    price: "249",
    period: "dogodek",
    features: [
      "2 uri najema",
      "Neomejeno število fotografij",
      "Dostava in postavitev",
      "Operater za celoten čas najema",
      "Rekviziti za fotografiranje",
      "Takojšnje tiskanje fotografij",
      "Digitalne fotografije",
    ],
    description: "Popoln paket za manjše dogodke in zabave.",
    buttonText: "Rezerviraj termin",
    isPopular: false,
  },
  {
    name: "Standard",
    price: "299",
    period: "dogodek",
    features: [
      "3 ure najema",
      "Neomejeno število fotografij",
      "Dostava in postavitev",
      "Operater za celoten čas najema",
      "Rekviziti za fotografiranje",
      "Takojšnje tiskanje fotografij",
      "Digitalne fotografije",
      "Personalizacija fotografij",
    ],
    description: "Najbolj priljubljen paket za večje dogodke.",
    buttonText: "Rezerviraj termin",
    isPopular: true,
  },
  {
    name: "Premium",
    price: "349",
    period: "dogodek",
    features: [
      "4 ure najema",
      "Neomejeno število fotografij",
      "Dostava in postavitev",
      "Operater za celoten čas najema",
      "Premium rekviziti",
      "Takojšnje tiskanje fotografij",
      "Digitalne fotografije",
      "Personalizacija fotografij",
      "Online galerija",
    ],
    description: "Premium paket za posebne priložnosti.",
    buttonText: "Rezerviraj termin",
    isPopular: false,
  },
];

export default function PhotoBooth() {
  return (
    <>
      <JsonLd<Service>
        item={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Photo Booth Najem",
          provider: {
            "@type": "LocalBusiness",
            name: "Eventaj.si",
            image: "https://eventaj.si/logo.png",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Lenart v Slovenskih goricah",
              addressRegion: "Slovenija",
              postalCode: "2230",
              streetAddress: "Slomškova ulica 1",
            },
            telephone: "+386 31 285 143",
          },
          areaServed: "Slovenija",
          description:
            "Profesionalni najem photo booth naprave za dogodke, poroke in zabave. Vključuje operaterja, rekvizite in takojšnje tiskanje fotografij.",
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "299",
            highPrice: "499",
            priceCurrency: "EUR",
          },
        }}
      />

      <main className="pt-[48px]">
        <BasicBoothHero
          title="Photo booth"
          text="Naš Photo Booth je magnet za ljudi. Gostje se smejijo in zabavajo pred kamero. Je središčna točka zabave, ki omogoča gostom, da takoj natisnejo fotografije ali jih pošljejo na svoje mobilne naprave in delijo na družbenih omrežjih."
        />
        <WhenToChoose content={photoBoothWhenToChoose} />
        <PromoImage />
        <Features {...basicBoothFeatures} />
        <HowItWorks type="basic" />
        <PricingPlans plans={pricingPlans} />
        <CTAContactSection
          title="Ne najdete ustreznega paketa?"
          description="Kontaktirajte nas in skupaj bomo našli najboljšo rešitev za vaš dogodek."
          action={{
            text: "Pošlji povpraševanje",
            variant: "glow",
          }}
          isGlow={true}
        />
        <TestimonialsSection
          title="Kaj pravijo naši zadovoljni uporabniki"
          description="Preverite, kaj o nas menijo stranke, ki so že uporabljale naš photo booth"
          testimonials={testimonials}
        />
      </main>
    </>
  );
}
