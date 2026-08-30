import { QrGalleryLandingPage } from "@/components/qr-gallery/qr-gallery-page";
import { qrGalleryOrderUrl } from "@/content/qr-gallery";
import {
  eventajAggregateRating,
  priceValidUntil,
} from "@/content/eventaj/structured-data";
import type { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import type { FAQPage, Product } from "schema-dts";
import { qrGalleryFaqs } from "@/content/qr-gallery";

export const metadata: Metadata = {
  title: {
    absolute: "QR galerija za dogodke | Fotografije gostov na enem mestu",
  },
  description:
    "Gostje skenirajo QR kodo in naložijo fotografije, videe in voščila. Brez aplikacije, brez registracije. 35 € na dogodek.",
  keywords: [
    "qr galerija",
    "galerija za dogodek",
    "zbiranje fotografij gostov",
    "deljenje fotografij dogodek",
  ],
  alternates: { canonical: "/qr-galerija" },
  openGraph: {
    title: "QR galerija za dogodke | Fotografije gostov na enem mestu",
    description:
      "Gostje skenirajo QR kodo in naložijo fotografije, videe in voščila. Brez aplikacije, brez registracije. 35 € na dogodek.",
    url: "https://www.eventaj.si/qr-galerija",
    images: [
      {
        url: "/qr-galerija/screenshots/galerija-desktop.png",
        width: 1920,
        height: 1080,
        alt: "QR galerija Eventaj na telefonu in računalniku",
      },
    ],
    locale: "sl_SI",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function QrGalleryPage() {
  return (
    <>
      <JsonLd<Product>
        item={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Eventaj QR galerija za dogodke",
          description:
            "Zasebna QR galerija za zbiranje fotografij, kratkih videov in voščil gostov brez aplikacije ali registracije.",
          image: [
            "https://www.eventaj.si/qr-galerija/screenshots/galerija-desktop.png",
            "https://www.eventaj.si/qr-galerija/screenshots/galerija-mobile.png",
          ],
          url: "https://www.eventaj.si/qr-galerija",
          sku: "QR-GALERIJA-DOGODEK",
          brand: {
            "@type": "Brand",
            name: "Eventaj.si",
          },
          aggregateRating: eventajAggregateRating,
          offers: {
            "@type": "Offer",
            url: qrGalleryOrderUrl,
            price: "35",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            priceValidUntil,
            seller: {
              "@type": "Organization",
              name: "Eventaj.si",
              url: "https://www.eventaj.si",
            },
          },
        }}
      />
      <JsonLd<FAQPage>
        item={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: qrGalleryFaqs.map(([question, answer]) => ({
            "@type": "Question" as const,
            name: question,
            acceptedAnswer: {
              "@type": "Answer" as const,
              text: answer,
            },
          })),
        }}
      />
      <QrGalleryLandingPage />
    </>
  );
}
