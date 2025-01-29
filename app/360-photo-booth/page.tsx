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
  title: "360 Photo Booth Najem | 360 Foto Zabava | Eventaj.si",
  description:
    "Najnovejši trend v foto zabavi - 360 photo booth! Profesionalna oprema za snemanje atraktivnih 360° videov na vaši poroki ali dogodku. Takojšnje deljenje posnetkov.",
  keywords: [
    "360 photo booth najem",
    "photobooth 360",
    "360 photobooth",
    "360 photo booth",
    "foto booth 360",
    "360 fotografiranje",
    "360 video booth",
    "360 photo booth za poroko",
    "najem 360 photo booth Ljubljana",
    "360 photo booth cena",
  ],
  openGraph: {
    title: "360 Photo Booth Najem | 360 Foto Zabava | Eventaj.si",
    description:
      "Najnovejši trend v foto zabavi - 360 photo booth! Profesionalna oprema za snemanje atraktivnih 360° videov na vaši poroki ali dogodku. Takojšnje deljenje posnetkov.",
    url: "https://eventaj.si/360-photo-booth",
    siteName: "Eventaj.si",
    images: [
      {
        url: "/og/photo-booth.webp",
        width: 1200,
        height: 630,
        alt: "360 Photo Booth Najem - Eventaj.si",
      },
    ],
    locale: "sl_SI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "360 Photo Booth Najem | 360 Foto Zabava | Eventaj.si",
    description:
      "Najnovejši trend v foto zabavi - 360 photo booth! Profesionalna oprema za snemanje atraktivnih 360° videov na vaši poroki ali dogodku. Takojšnje deljenje posnetkov.",
    images: ["/og/photo-booth.webp"],
  },
  alternates: {
    canonical: "https://eventaj.si/360-photo-booth",
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
            "Profesionalni najem 360 photo booth naprave za dogodke, poroke in zabave. Vključuje operaterja, rekvizite in takojšnje deljenje posnetkov. Specifikacije: platforma premera 100cm, 360-stopinjsko snemanje v slow motion, deljenje preko QR kode, Airdrop-a, e-pošte in družbenih omrežij.",
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "299",
            highPrice: "499",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            validFrom: "2024-01-01",
            priceValidUntil: "2024-12-31",
          },
          serviceType: "360 Photo Booth Rental",
          category: ["360 Photo Booth", "Event Services", "Video Services"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "360 Photo Booth Packages",
            itemListElement: pricingPlans.map((plan) => ({
              "@type": "Offer",
              name: plan.name,
              price: plan.price,
              priceCurrency: "EUR",
              description: plan.description,
              itemOffered: {
                "@type": "Service",
                name: `${plan.name} 360 Photo Booth Package`,
                description: plan.features.join(", "),
              },
            })),
          },
          termsOfService: "https://eventaj.si/pogoji-poslovanja",
          serviceOutput: {
            "@type": "Thing",
            name: "360 Photo Booth Experience",
            description:
              "Platform Size: 100cm diameter, Video Type: 360-degree slow motion, Sharing Options: QR code, Airdrop, Email, Social Media",
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
          title="Ni ustreznega paketa?"
          description="Kontaktiraj nas in skupaj bomo našli najboljšo rešitev za vaš dogodek."
          action={{
            text: "Pošlji povpraševanje",
            variant: "glow",
          }}
          isGlow={true}
        />
        <TestimonialsSection
          title="Kaj pravijo naši zadovoljni uporabniki"
          description="Preveri, kaj o nas menijo stranke, ki so že uporabljale naš 360° photo booth"
        />
      </main>
    </>
  );
}
