import { Booth360Guide } from "@/components/nasveti/booth-360-guide";
import { getGuide } from "@/content/nasveti";
import { guideArticleSchema, guideBreadcrumbSchema } from "@/content/nasveti-schema";
import { priceValidUntil } from "@/content/eventaj/structured-data";
import type { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import type { Article, BreadcrumbList, FAQPage, ItemList } from "schema-dts";

const guide = getGuide("360-booth-ali-photo-booth");
const url = `https://www.eventaj.si/nasveti/${guide.slug}`;
const title = "360 booth ali photo booth? Razlike, cene, prostor";
const description =
  "360 booth naredi kratek video, klasični photo booth tiskano fotografijo. Kaj potrebuje vsak od njiju in kateri se bolj obnese na poroki.";
const heroImage = "/og/photo-booth.webp";

export const metadata: Metadata = {
  title: `${title} | Eventaj.si`,
  description,
  keywords: [
    "360 photo booth",
    "360 video stojnica",
    "360 kamera za poroko",
    "360 booth cena",
    "razlika 360 booth photo booth",
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
        width: 1731,
        height: 909,
        alt: "360° Booth in photo booth na dogodku",
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

export default function Booth360GuidePage() {
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
            "360 photo booth",
            "360 video stojnica",
            "360 kamera za poroko",
            "360 booth cena",
          ],
        })}
      />
      <JsonLd<BreadcrumbList>
        item={guideBreadcrumbSchema({ slug: guide.slug, name: "360 booth ali photo booth" })}
      />
      <JsonLd<ItemList>
        item={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Photo booth in 360° Booth Eventaj",
          numberOfItems: 2,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@type": "Product",
                name: "Photo Booth najem",
                description:
                  "Photo booth z DSLR fotoaparatom, osvetlitvijo, rekviziti in takojšnjim tiskom fotografij. Potrebuje 2,5 × 2 m prostora.",
                url: "https://www.eventaj.si/photo-booth",
                brand: { "@type": "Brand", name: "Eventaj.si" },
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
                "@type": "Product",
                name: "360° Booth najem",
                description:
                  "360 video stojnica z vrtečo se kamero, ki posname kratek video v počasnem posnetku. Potrebuje 3 × 3 m prostih tal.",
                url: "https://www.eventaj.si/360-photo-booth",
                brand: { "@type": "Brand", name: "Eventaj.si" },
                offers: {
                  "@type": "Offer",
                  url: "https://www.eventaj.si/360-photo-booth",
                  price: "299",
                  priceCurrency: "EUR",
                  availability: "https://schema.org/InStock",
                  priceValidUntil,
                },
              },
            },
          ],
        }}
      />
      <JsonLd<FAQPage>
        item={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Koliko prostora potrebuje 360 booth?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "3 × 3 m prostih tal, ravnih in trdih, ter dostop do vtičnice. Klasični photo booth potrebuje 2,5 × 2 m. Prostor je najpogostejši razlog, da 360 booth odpade.",
              },
            },
            {
              "@type": "Question",
              name: "Koliko stane 360 booth?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "360° Booth stane od 299 € za dve uri, dodatna ura je 80 €. Photo booth stane od 279 € za dve uri, dodatna ura je 50 €.",
              },
            },
            {
              "@type": "Question",
              name: "Kateri je boljši za poroko?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Pri mešani družbi vseh starosti se bolj obnese klasični photo booth, ker gostje odnesejo tiskano fotografijo domov. 360 booth se bolj obnese pri mlajši družbi in kadar vam je pomembno, da se dogodek pojavi na omrežjih.",
              },
            },
          ],
        }}
      />
      <Booth360Guide />
    </>
  );
}

export const dynamic = "force-static";
