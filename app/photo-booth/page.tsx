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
import { ReferencesSection } from "@/components/sections/references-section";
import WhenToChoose from "@/components/sections/when-to-choose";
import { photoBoothWhenToChoose } from "@/content/when-to-choose";
import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import { Service } from "schema-dts";

export const metadata: Metadata = {
  title: "Photo Booth Najem | Foto Zabava za Poroke in Dogodke | Eventaj.si",
  description:
    "Profesionalna foto stojnica za vaš dogodek! Najemi photo booth s takojšnjim tiskanjem fotografij, rekviziti in digitalnimi kopijami. Idealno za poroke, zabave in dogodke.",
  keywords: [
    "photo booth najem",
    "foto zabava",
    "foto stojnica",
    "photobooth",
    "foto box za poroko",
    "foto stojnica za dogodke",
    "photo booth za zabavo",
    "photo booth za poroko",
    "najem photo booth Ljubljana",
    "photo booth cena",
  ],
  openGraph: {
    title: "Photo Booth Najem | Foto Zabava za Poroke in Dogodke | Eventaj.si",
    description:
      "Profesionalna foto stojnica za vaš dogodek! Najemi photo booth s takojšnjim tiskanjem fotografij, rekviziti in digitalnimi kopijami. Idealno za poroke, zabave in dogodke.",
    url: "https://eventaj.si/photo-booth",
    siteName: "Eventaj.si",
    images: [
      {
        url: "/og/photo-booth.webp",
        width: 1200,
        height: 630,
        alt: "Photo Booth Najem - Eventaj.si",
      },
    ],
    locale: "sl_SI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Booth Najem | Foto Zabava za Poroke in Dogodke | Eventaj.si",
    description:
      "Profesionalna foto stojnica za vaš dogodek! Najemi photo booth s takojšnjim tiskanjem fotografij, rekviziti in digitalnimi kopijami. Idealno za poroke, zabave in dogodke.",
    images: ["/og/photo-booth.webp"],
  },
  alternates: {
    canonical: "/photo-booth",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "https://eventaj.si/application/icon-32x32.png",
    apple: "https://eventaj.si/application/icon-256x256.png",
  },
};

const pricingPlans: PricingPlan[] = [
  {
    name: "Basic",
    price: "249",
    period: "2 uri",
    features: [
      "najem do 2 uri",
      "neomejeno število fotografij",
      "pomoč pri uporabi",
      "rekviziti za fotografiranje",
      "takojšnje tiskanje fotografij",
      "digitalne fotografije",
      "personalizacija fotografij",
      "online galerija",
    ],
    description: "Popoln paket za manjše dogodke in zabave.",
    buttonText: "Rezerviraj termin",
    isPopular: false,
  },
  {
    name: "Standard",
    price: "299",
    period: "3 ure",
    features: [
      "najem do 3 ure",
      "neomejeno število fotografij",
      "pomoč pri uporabi",
      "rekviziti za fotografiranje",
      "takojšnje tiskanje fotografij",
      "digitalne fotografije",
      "personalizacija fotografij",
      "online galerija",
    ],
    description: "Najbolj priljubljen paket za večje dogodke.",
    buttonText: "Rezerviraj termin",
    isPopular: true,
  },
  {
    name: "Premium",
    price: "349",
    period: "4 ure",
    features: [
      "najem do 4 ure",
      "neomejeno število fotografij",
      "pomoč pri uporabi",
      "rekviziti za fotografiranje",
      "takojšnje tiskanje fotografij",
      "digitalne fotografije",
      "personalizacija fotografij",
      "online galerija",
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
            lowPrice: "249",
            highPrice: "349",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            validFrom: "2024-01-01",
            priceValidUntil: "2024-12-31",
          },
          serviceType: "Photo Booth Rental",
          category: ["Photo Booth", "Event Services", "Photography Services"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Photo Booth Packages",
            itemListElement: pricingPlans.map((plan) => ({
              "@type": "Offer",
              name: plan.name,
              price: plan.price,
              priceCurrency: "EUR",
              description: plan.description,
              itemOffered: {
                "@type": "Service",
                name: `${plan.name} Photo Booth Package`,
                description: plan.features.join(", "),
              },
            })),
          },
          termsOfService: "https://eventaj.si/pogoji-poslovanja",
          isRelatedTo: [
            {
              "@type": "Service",
              name: "Wedding Services",
            },
            {
              "@type": "Service",
              name: "Event Planning",
            },
            {
              "@type": "Service",
              name: "Party Services",
            },
          ],
          additionalType: [
            "https://schema.org/PhotographyStore",
            "https://schema.org/EventService",
            "https://schema.org/EntertainmentBusiness",
          ],
        }}
      />

      <main className="pt-[48px]">
        <BasicBoothHero
          title="Photo booth"
          text="Naš photo booth je središče vsake zabave. Gostje se zabavajo, smejijo in ustvarjajo spomine pred kamero. Fotografije lahko natisnejo ali jih pošljejo na svoje telefone ter delijo na družbenih omrežjih."
        />
        <WhenToChoose content={photoBoothWhenToChoose} />
        <PromoImage />
        <Features {...basicBoothFeatures} />
        <HowItWorks type="basic" />
        <PricingPlans plans={pricingPlans} />
        <ReferencesSection
          title="Kaj pravijo naši zadovoljni uporabniki"
          description="Preverite, kaj o nas menijo stranke, ki so že uporabljale naš photo booth"
        />
        <CTAContactSection
          title="Ni ustreznega paketa?"
          description="Kontaktiraj nas in skupaj bomo našli najboljšo rešitev za vaš dogodek."
          action={{
            text: "Pošlji povpraševanje",
            variant: "glow",
          }}
          isGlow={true}
        />
      </main>
    </>
  );
}
