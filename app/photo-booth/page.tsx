import { PhotoBoothRedesignPage } from "@/components/sections/eventaj/redesign/photo-booth-page";
import {
  buildFaqPageSchema,
  eventajAggregateRating,
  priceValidUntil,
} from "@/content/eventaj/structured-data";
import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import { BreadcrumbList, FAQPage, Service } from "schema-dts";

const photoBoothPageTitle = "Photo booth najem po vsej Sloveniji od 299 € | Eventaj.si";

const pricingPlans = [
  { name: "Basic", price: "299", description: "2 uri najema photo bootha" },
  { name: "Standard", price: "349", description: "3 ure najema photo bootha" },
  { name: "Premium", price: "399", description: "4 ure najema photo bootha" },
  { name: "Basic + QR galerija", price: "324", description: "2 uri Photo Booth najema in QR galerija dogodka" },
] as const;

export const metadata: Metadata = {
  title: photoBoothPageTitle,
  description:
    "Photo booth najem za poroke, rojstne dneve in poslovne dogodke. Neomejen tisk, rekviziti in operater, od 299 €/2h po vsej Sloveniji.",
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
      "Photo booth najem za poroke, rojstne dneve in poslovne dogodke. Neomejen tisk, rekviziti in operater, od 299 €/2h po vsej Sloveniji.",
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
      "Najem photo bootha z asistenco in rekviziti po celotni Sloveniji. Rezerviraj termin že danes.",
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
          name: "Photo booth najem",
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
            "Profesionalni najem photo bootha za poroke, poslovne dogodke, festivale in zabave po vsej Sloveniji. Vključuje operaterja, rekvizite, personalizirane predloge in takojšnje tiskanje fotografij.",
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "299",
            highPrice: "399",
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
            { "@type": "ListItem", position: 2, name: "Photo booth", item: "https://www.eventaj.si/photo-booth" },
          ],
        }}
      />
      <JsonLd<FAQPage> item={buildFaqPageSchema()} />
      <PhotoBoothRedesignPage />
    </>
  );
}
export const dynamic = "force-static"
