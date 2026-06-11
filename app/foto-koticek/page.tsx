import { ServicePageContent } from "@/components/sections/eventaj/service/service-page-content";
import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import { BreadcrumbList, Service } from "schema-dts";

const pageTitle = "Foto kotiček najem od 279 € | Eventaj.si";

const pricingPlans = [
  { name: "Basic", price: "279", description: "2 uri foto kotička" },
  { name: "Standard", price: "329", description: "3 ure foto kotička" },
  { name: "Premium", price: "379", description: "4 ure foto kotička" },
] as const;

export const metadata: Metadata = {
  title: pageTitle,
  description:
    "Najem foto kotička za poroke, rojstne dneve in dogodke po Sloveniji. Od 279 €/2h. Takojšnji tisk, rekviziti, neomejene fotografije in digitalna galerija.",
  keywords: [
    "Foto kotiček najem",
    "foto zabava",
    "Foto kotiček",
    "Foto kotiček za poroke",
    "Foto kotiček za rojstne dneve",
    "Foto kotiček za zabave",
    "Foto kotiček za dogodke",
  ],
  openGraph: {
    title: pageTitle,
    description:
      "Najem foto kotička za poroke in dogodke. Od 279 €/2h. Takojšnji tisk, rekviziti in digitalna galerija.",
    url: "https://www.eventaj.si/foto-koticek",
    siteName: "Eventaj.si",
    images: [
      {
        url: "/og/photo-booth.webp",
        width: 1200,
        height: 630,
        alt: "Foto kotiček Najem - Eventaj.si",
      },
    ],
    locale: "sl_SI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description:
      "Najem foto kotička za poroke in dogodke. Od 279 €/2h. Takojšnji tisk, rekviziti in digitalna galerija.",
    images: ["/og/photo-booth.webp"],
  },
  alternates: {
    canonical: "https://www.eventaj.si/foto-koticek",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "https://www.eventaj.si/application/icon-32x32.png",
    apple: "https://www.eventaj.si/application/icon-256x256.png",
  },
};

export default function FotoKoticek() {
  return (
    <>
      <JsonLd<Service>
        item={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Foto kotiček Najem",
          provider: {
            "@type": "LocalBusiness",
            name: "Eventaj.si",
            image: "https://www.eventaj.si/application/logo.svg",
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
            "Profesionalni najem foto kotička za dogodke, poroke, rojstne dneve in zabave. Vključuje operaterja, rekvizite in takojšnje tiskanje fotografij.",
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "279",
            highPrice: "379",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            validFrom: "2024-01-01",
            priceValidUntil: "2026-12-31",
          },
          serviceType: "Foto kotiček Rental",
          category: ["Foto kotiček", "Event Services", "Photography Services"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Foto kotiček Packages",
            itemListElement: pricingPlans.map((plan) => ({
              "@type": "Offer",
              name: plan.name,
              price: plan.price,
              priceCurrency: "EUR",
              description: plan.description,
            })),
          },
          termsOfService: "https://www.eventaj.si/pogoji-uporabe",
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Domov", item: "https://www.eventaj.si" },
            { "@type": "ListItem", position: 2, name: "Foto kotiček", item: "https://www.eventaj.si/foto-koticek" },
          ],
        }}
      />
      <ServicePageContent type="photo" seoTitle={pageTitle} />
    </>
  );
}

export const dynamic = "force-static";
