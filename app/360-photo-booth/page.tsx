import { CTAContactSection } from "@/components/sections/cta-contact-section";
import Features from "@/components/sections/features";
import { threeSixtyFeatures } from "@/components/sections/features-content";
import HowItWorks from "@/components/sections/how-it-works";
import { PricingPlans } from "@/components/sections/pricing-plans";
import PromoImage from "@/components/sections/promo-image";
import { TestimonialsSection } from "@/components/sections/testimonials";
import WhenToChoose from "@/components/sections/when-to-choose";
import ThreeSixtyHero from "@/components/three-sixty-hero";
import { threeSixtyWhenToChoose } from "@/content/when-to-choose";
import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import { Service } from "schema-dts";

export const metadata: Metadata = {
  title: "360 Photo Booth Najem | Zabava za Vsak Dogodek | Eventaj.si",
  description:
    "Najemi 360 photo booth za nepozabno doživetje na vaši poroki, zabavi ali dogodku. Profesionalna oprema, izkušena ekipa in takojšnje deljenje posnetkov. Rezervirajte zdaj!",
  keywords: [
    "360 photo booth najem",
    "360 photo booth za poroko",
    "foto stojnica za dogodke",
    "najem 360 photo booth Ljubljana",
    "360 fotografiranje",
    "foto booth zabava",
    "photo booth za dogodke",
    "360 video booth",
    "photo booth najem cena",
  ],
  openGraph: {
    title: "360 Photo Booth Najem | Zabava za Vsak Dogodek | Eventaj.si",
    description:
      "Najemi 360 photo booth za nepozabno doživetje na vaši poroki, zabavi ali dogodku. Profesionalna oprema, izkušena ekipa in takojšnje deljenje posnetkov.",
    url: "https://eventaj.si/360-photo-booth",
    siteName: "Eventaj.si",
    images: [
      {
        url: "/og/360-photo-booth.jpg",
        width: 1200,
        height: 630,
        alt: "360 Photo Booth Najem - Eventaj.si",
      },
    ],
    locale: "sl_SI",
    type: "website",
  },
};

const pricingPlans = [
  {
    name: "Mini paket",
    price: "299",
    period: "2 uri",
    features: [
      "najem do 2 uri",
      "vključeni različni rekviziti",
      "priprava digitalnega okvirja (4 predlogi)",
      "delitev videoposnetkov preko QR kode in Airdrop-a",
      "pomoč pri uporabi",
    ],
    description: "Idealno za manjše dogodke in zabave",
    buttonText: "Rezerviraj termin",
    href: "/kontakt",
    isPopular: false,
  },
  {
    name: "Osnovni paket",
    price: "399",
    period: "3 ure",
    features: [
      "najem do 3 ure",
      "vključeni različni rekviziti",
      "priprava digitalnega okvirja (4 predlogi)",
      "delitev videoposnetkov preko QR kode in Airdrop-a",
      "pomoč pri uporabi",
    ],
    description: "Najpogostejša izbira za poroke in večje dogodke",
    buttonText: "Rezerviraj termin",
    href: "/kontakt",
    isPopular: true,
  },
  {
    name: "Maxi paket",
    price: "499",
    period: "4 ure",
    features: [
      "najem do 4 ure",
      "vključeni različni rekviziti",
      "priprava digitalnega okvirja (4 predlogi)",
      "delitev videoposnetkov preko QR kode in Airdrop-a",
      "pomoč pri uporabi",
    ],
    description: "Za tiste, ki želijo popolno izkušnjo",
    buttonText: "Rezerviraj termin",
    href: "/kontakt",
    isPopular: false,
  },
];

export default function ThreeSixtyPhotoBooth() {
  return (
    <>
      <JsonLd<Service>
        item={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "360 Photo Booth Najem",
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
            "Profesionalni najem 360 photo booth naprave za dogodke, poroke in zabave. Vključuje operaterja, rekvizite in takojšnje deljenje posnetkov.",
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "299",
            highPrice: "499",
            priceCurrency: "EUR",
          },
        }}
      />

      <main className="pt-[48px]">
        <ThreeSixtyHero />
        <WhenToChoose content={threeSixtyWhenToChoose} />
        <PromoImage />
        <Features {...threeSixtyFeatures} />
        <HowItWorks type="360" />
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
          description="Preverite, kaj o nas menijo stranke, ki so že uporabljale naš 360° photo booth"
        />
      </main>
    </>
  );
}
