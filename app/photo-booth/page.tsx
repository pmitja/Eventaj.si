import { ServicePageContent } from "@/components/sections/eventaj/service/service-page-content";
import {
  buildFaqPageSchema,
  eventajAggregateRating,
  priceValidUntil,
} from "@/content/eventaj/structured-data";
import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import { BreadcrumbList, FAQPage, Service } from "schema-dts";

const photoBoothPageTitle = "Foto box (photo booth) najem od 279 € | Eventaj.si";

const pricingPlans = [
  { name: "Basic", price: "279", description: "2 uri foto box / photo booth najema" },
  { name: "Standard", price: "329", description: "3 ure foto box / photo booth najema" },
  { name: "Premium", price: "379", description: "4 ure foto box / photo booth najema" },
] as const;

export const metadata: Metadata = {
  title: photoBoothPageTitle,
  description:
    "Najem foto boxa oziroma photo bootha (foto stojnice ali foto kotička) za dogodke po Sloveniji. Od 279 €/2h: neomejene fotografije, takojšen tisk, rekviziti in spletna galerija.",
  keywords: [
    "foto box",
    "fotobox",
    "foto box najem",
    "fotobox najem",
    "foto box za poroko",
    "fotobox za zabavo",
    "photo booth najem",
    "photo booth cena",
    "foto box cena",
    "foto stojnica najem",
    "foto kotiček najem",
    "selfie box",
    "najem foto box Slovenija",
  ],
  openGraph: {
    title: photoBoothPageTitle,
    description:
      "Najem foto boxa (photo booth) z neomejenimi fotografijami in rekviziti po vsej Sloveniji.",
    url: "https://www.eventaj.si/photo-booth",
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
    title: photoBoothPageTitle,
    description:
      "Najem foto boxa (photo booth) z asistenco in rekviziti po celotni Sloveniji. Rezerviraj termin že danes.",
    images: ["/og/photo-booth.webp"],
  },
  alternates: {
    canonical: "https://www.eventaj.si/photo-booth",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PhotoBooth() {
  return (
    <>
      <JsonLd<Service>
        item={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Foto box (Photo Booth) najem",
          url: "https://www.eventaj.si/photo-booth",
          provider: {
            "@type": "LocalBusiness",
            name: "Eventaj.si",
            url: "https://www.eventaj.si",
            image: "https://www.eventaj.si/application/logo.svg",
            email: "info@eventaj.si",
            telephone: "+386 31 285 143",
            address: {
              "@type": "PostalAddress",
              addressCountry: "SI",
              addressLocality: "Lenart v Slovenskih goricah",
              addressRegion: "Štajerska",
              postalCode: "2230",
              streetAddress: "Slomškova ulica 1",
            },
          },
          areaServed: "Slovenija",
          aggregateRating: eventajAggregateRating,
          description:
            "Profesionalni najem foto boxa (photo booth) za poroke, poslovne dogodke, festivale in zabave po vsej Sloveniji. Vključuje operaterja, rekvizite, personalizirane predloge in takojšnje tiskanje fotografij.",
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "279",
            highPrice: "379",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            priceValidUntil,
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
            })),
          },
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Domov", item: "https://www.eventaj.si" },
            { "@type": "ListItem", position: 2, name: "Foto box", item: "https://www.eventaj.si/photo-booth" },
          ],
        }}
      />
      <JsonLd<FAQPage> item={buildFaqPageSchema()} />
      <ServicePageContent
        type="photo"
        seoTitle={photoBoothPageTitle}
        h1="Najem foto boxa oziroma photo bootha po Sloveniji"
        heroTag="Foto box · Photo Booth"
        heroDescription="Foto box oziroma photo booth, znan tudi kot foto stojnica ali foto kotiček, s takojšnjim tiskom fotografij. Neomejene fotografije, rekviziti in spletna galerija — za poroke, poslovne dogodke in zasebna praznovanja po vsej Sloveniji."
      />
    </>
  );
}
export const dynamic = "force-static"
