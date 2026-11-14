import { PhotographerRedesignPage } from "@/components/sections/eventaj/redesign/photographer-page";
import {
  photographerExtraHourPrice,
  photographerFaq,
  photographerMeta,
  photographerPackages,
} from "@/content/eventaj/photographer";
import { buildFaqPageSchema, priceValidUntil } from "@/content/eventaj/structured-data";
import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import { BreadcrumbList, FAQPage, Service } from "schema-dts";

const url = "https://www.eventaj.si/fotografiranje-dogodkov";
const prices = photographerPackages.map((item) => item.price);
const lowPrice = Math.min(...prices);
const highPrice = Math.max(...prices);

const { title, description } = photographerMeta;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "fotografiranje dogodkov",
    "fotograf za dogodke",
    "fotografiranje porok",
    "fotograf za poroko",
    "fotograf za rojstni dan",
    "fotograf za poslovni dogodek",
    "fotografiranje dogodkov cena",
    "cenik fotografiranja dogodkov",
  ],
  openGraph: {
    title,
    description,
    url,
    siteName: "Eventaj.si",
    images: [
      {
        url: "/application/fotograf/poroka/filip-marija-01.webp",
        width: 1800,
        height: 1013,
        alt: "Fotografiranje dogodkov - Eventaj.si",
      },
    ],
    locale: "sl_SI",
    type: "website",
  },
  alternates: { canonical: url },
  robots: { index: true, follow: true },
};

export default function PhotographerPage() {
  return (
    <>
      <JsonLd<Service>
        item={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Fotografiranje dogodkov",
          url,
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
          description,
          serviceType: "Event Photography",
          offers: {
            "@type": "AggregateOffer",
            lowPrice: String(lowPrice),
            highPrice: String(highPrice),
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            priceValidUntil,
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Paketi fotografiranja dogodkov",
            itemListElement: [
              ...photographerPackages.map((item) => ({
                "@type": "Offer" as const,
                name: item.name,
                price: String(item.price),
                priceCurrency: "EUR",
                description: item.duration,
              })),
              {
                "@type": "Offer" as const,
                name: "Dodatna ura",
                price: String(photographerExtraHourPrice),
                priceCurrency: "EUR",
                description: "Vsaka dodatna ura fotografiranja",
              },
            ],
          },
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Domov", item: "https://www.eventaj.si" },
            { "@type": "ListItem", position: 2, name: "Fotografiranje dogodkov", item: url },
          ],
        }}
      />
      <JsonLd<FAQPage> item={buildFaqPageSchema(photographerFaq)} />
      <PhotographerRedesignPage />
    </>
  );
}

export const dynamic = "force-static";
