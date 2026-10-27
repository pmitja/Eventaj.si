import { CenikPageContent } from "@/components/sections/eventaj/cenik/cenik-page-content";
import { booth360Packages, photoPackages } from "@/content/eventaj/data";
import { photoBoothQrGalleryPrice, qrGalleryPrice } from "@/content/eventaj/qr-gallery-pricing";
import { priceValidUntil } from "@/content/eventaj/structured-data";
import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import type { BreadcrumbList, Offer, OfferCatalog } from "schema-dts";

const pageTitle = "Cenik Photo Bootha, 360° Bootha in QR galerije | Eventaj.si";

export const metadata: Metadata = {
  title: pageTitle,
  description:
    "Pregleden cenik za Photo Booth, 360° Booth in QR galerijo. Photo Booth od 279 €, 360° Booth od 299 €, QR galerija 35 € na dogodek.",
  alternates: {
    canonical: "https://www.eventaj.si/cenik",
  },
  openGraph: {
    title: pageTitle,
    description:
      "Paketi za Photo Booth in 360° Booth ter QR galerija za 35 € na dogodek.",
    url: "https://www.eventaj.si/cenik",
    siteName: "Eventaj.si",
    images: [
      {
        url: "/og/photo-booth.webp",
        width: 1200,
        height: 630,
        alt: "Cenik Photo Bootha, 360° Bootha in QR galerije - Eventaj.si",
      },
    ],
    locale: "sl_SI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description:
      "Paketi za Photo Booth in 360° Booth ter QR galerija za 35 € na dogodek.",
    images: ["/og/photo-booth.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const offer = (name: string, price: number, description: string, url: string): Offer => ({
  "@type": "Offer",
  name,
  price: String(price),
  priceCurrency: "EUR",
  description,
  url,
  availability: "https://schema.org/InStock",
  priceValidUntil,
});

export default function CenikPage() {
  return (
    <>
      <JsonLd<OfferCatalog>
        item={{
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          name: "Cenik Eventaj.si",
          url: "https://www.eventaj.si/cenik",
          itemListElement: [
            {
              "@type": "OfferCatalog",
              name: "Photo booth najem",
              itemListElement: [
                ...photoPackages.map((p) =>
                  offer(`Photo booth ${p.name}`, p.price, `${p.hours} ${p.hours === 2 ? "uri" : "ure"} najema photo bootha`, "https://www.eventaj.si/photo-booth"),
                ),
                offer("QR galerija ob najemu photo bootha", photoBoothQrGalleryPrice, "Doplačilo na dogodek", "https://www.eventaj.si/qr-galerija"),
              ],
            },
            {
              "@type": "OfferCatalog",
              name: "360 photo booth najem",
              itemListElement: booth360Packages.map((p) =>
                offer(`360 photo booth ${p.name}`, p.price, `${p.hours} ${p.hours === 2 ? "uri" : "ure"} najema 360 photo bootha`, "https://www.eventaj.si/360-photo-booth"),
              ),
            },
            {
              "@type": "OfferCatalog",
              name: "QR galerija",
              itemListElement: [
                offer(
                  "QR galerija dogodka",
                  qrGalleryPrice,
                  "Galerija za fotografije, videe in glasovna voščila gostov, na voljo 180 dni po dogodku",
                  "https://www.eventaj.si/qr-galerija",
                ),
              ],
            },
          ],
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Domov", item: "https://www.eventaj.si" },
            { "@type": "ListItem", position: 2, name: "Cenik", item: "https://www.eventaj.si/cenik" },
          ],
        }}
      />
      <CenikPageContent seoTitle={pageTitle} />
    </>
  );
}
export const dynamic = "force-static"
