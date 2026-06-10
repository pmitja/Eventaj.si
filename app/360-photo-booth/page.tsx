import { ServicePageContent } from "@/components/sections/eventaj-pages";
import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import { Service } from "schema-dts";

const pricingPlans = [
  { name: "Mini paket", price: "299", description: "2 uri 360° Booth najema" },
  { name: "Osnovni paket", price: "349", description: "3 ure 360° Booth najema" },
  { name: "Maxi paket", price: "399", description: "4 ure 360° Booth najema" },
] as const;

const pageTitle = "360° Booth najem po Sloveniji od 299 € | Eventaj.si";

export const metadata: Metadata = {
  title: pageTitle,
  description:
    "360° Booth najem za viralne slow-motion posnetke, QR deljenje, rekvizite in profesionalno izvedbo po Sloveniji. Paketi od 299 €.",
  keywords: [
    "360° Booth najem",
    "360° Booth",
    "360° Booth",
    "360° Booth",
    "foto booth 360",
    "360 fotografiranje",
    "360 video booth",
    "360° Booth za poroko",
    "najem 360° Booth Ljubljana",
    "360° Booth cena",
  ],
  openGraph: {
    title: pageTitle,
    description:
      "360° Booth za slow-motion posnetke, QR deljenje in nepozabno dogajanje na porokah, zabavah in poslovnih dogodkih.",
    url: "https://eventaj.si/360-photo-booth",
    siteName: "Eventaj.si",
    images: [
      {
        url: "/og/photo-booth.webp",
        width: 1200,
        height: 630,
        alt: "360° Booth Najem - Eventaj.si",
      },
    ],
    locale: "sl_SI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description:
      "360° Booth za slow-motion posnetke, QR deljenje in nepozabno dogajanje.",
    images: ["/og/photo-booth.webp"],
  },
  alternates: {
    canonical: "https://eventaj.si/360-photo-booth",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ThreeSixtyPhotoBooth() {
  return (
    <>
      <JsonLd<Service>
        item={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "360° Booth Najem",
          provider: {
            "@type": "LocalBusiness",
            name: "Eventaj.si",
            image: "https://eventaj.si/application/logo.svg",
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
            "Profesionalni najem 360° Booth naprave za dogodke, poroke in zabave. Vključuje operaterja, rekvizite in takojšnje deljenje posnetkov.",
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "299",
            highPrice: "399",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            priceValidUntil: "2026-12-31",
          },
          serviceType: "360° Booth Rental",
          category: ["360° Booth", "Event Services", "Video Services"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "360° Booth Packages",
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
      <ServicePageContent type="360" seoTitle={pageTitle} />
    </>
  );
}
export const dynamic = "force-static"
