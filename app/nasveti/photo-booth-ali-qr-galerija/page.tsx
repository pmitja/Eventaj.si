import { BoothOrGalleryGuide } from "@/components/nasveti/booth-or-gallery-guide";
import { getGuide } from "@/content/nasveti";
import { guideArticleSchema, guideBreadcrumbSchema } from "@/content/nasveti-schema";
import { priceValidUntil } from "@/content/eventaj/structured-data";
import { qrGalleryOrderUrl } from "@/content/qr-gallery";
import type { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import type { Article, BreadcrumbList, ItemList } from "schema-dts";

const guide = getGuide("photo-booth-ali-qr-galerija");
const url = `https://www.eventaj.si/nasveti/${guide.slug}`;
const title = "Photo booth ali QR galerija? Primerjava in cene";
const description =
  "Photo booth od 279 €, QR galerija 35 €. Kaj dela vsaka storitev, kdaj zadošča ena sama in zakaj ju pogosto vzamejo skupaj.";
const heroImage = "/qr-galerija/utrinki/photo-3.jpg";

export const metadata: Metadata = {
  title: `${title} | Eventaj.si`,
  description,
  keywords: [
    "photo booth ali qr galerija",
    "photo booth cena poroka",
    "alternativa photo boothu",
    "photo booth najem cena",
  ],
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    siteName: "Eventaj.si",
    type: "article",
    locale: "sl_SI",
    images: [
      {
        url: heroImage,
        width: 1024,
        height: 1024,
        alt: "Gostje v photo booth kotičku z rekviziti",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [heroImage],
  },
  robots: { index: true, follow: true },
};

export default function BoothOrGalleryGuidePage() {
  return (
    <>
      <JsonLd<Article>
        item={guideArticleSchema({
          slug: guide.slug,
          headline: title,
          description,
          image: heroImage,
          published: "2026-08-30",
          modified: guide.updated,
          keywords: [
            "photo booth ali qr galerija",
            "photo booth cena poroka",
            "alternativa photo boothu",
          ],
        })}
      />
      <JsonLd<BreadcrumbList>
        item={guideBreadcrumbSchema({ slug: guide.slug, name: "Photo booth ali QR galerija" })}
      />
      <JsonLd<ItemList>
        item={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Photo booth in QR galerija Eventaj",
          numberOfItems: 2,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@type": "Service",
                name: "Photo Booth najem",
                description:
                  "Fizični foto kotiček z DSLR fotoaparatom, osvetlitvijo, rekviziti, asistenco in takojšnjim tiskom fotografij.",
                url: "https://www.eventaj.si/photo-booth",
                provider: { "@type": "Organization", name: "Eventaj.si", url: "https://www.eventaj.si" },
                offers: {
                  "@type": "Offer",
                  url: "https://www.eventaj.si/photo-booth",
                  price: "279",
                  priceCurrency: "EUR",
                  availability: "https://schema.org/InStock",
                  priceValidUntil,
                },
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@type": "Service",
                name: "QR galerija za dogodke",
                description:
                  "Zasebna QR galerija za zbiranje fotografij, kratkih videov in voščil gostov brez aplikacije ali registracije.",
                url: "https://www.eventaj.si/qr-galerija",
                provider: { "@type": "Organization", name: "Eventaj.si", url: "https://www.eventaj.si" },
                offers: {
                  "@type": "Offer",
                  url: qrGalleryOrderUrl,
                  price: "35",
                  priceCurrency: "EUR",
                  availability: "https://schema.org/InStock",
                  priceValidUntil,
                },
              },
            },
          ],
        }}
      />
      <BoothOrGalleryGuide />
    </>
  );
}

export const dynamic = "force-static";
