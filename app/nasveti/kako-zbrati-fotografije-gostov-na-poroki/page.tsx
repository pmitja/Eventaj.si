import { WeddingPhotosGuide } from "@/components/nasveti/wedding-photos-guide";
import { getGuide, weddingPhotoComparison } from "@/content/nasveti";
import { guideArticleSchema, guideBreadcrumbSchema } from "@/content/nasveti-schema";
import type { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import type { Article, BreadcrumbList, ItemList } from "schema-dts";

const guide = getGuide("kako-zbrati-fotografije-gostov-na-poroki");
const url = `https://www.eventaj.si/nasveti/${guide.slug}`;
const title = "Kako zbrati fotografije gostov na poroki: 5 načinov";
const description =
  "Hashtag, skupni Google album, WhatsApp, USB ali QR galerija. Kaj v praksi deluje, kje vsak način razpade in koliko stane.";
const heroImage = "/qr-galerija/utrinki/photo-8.jpg";

export const metadata: Metadata = {
  title: `${title} | Eventaj.si`,
  description,
  keywords: [
    "kako zbrati fotografije gostov na poroki",
    "skupni album poroka",
    "deljenje fotografij svatje",
    "fotografije gostov poroka",
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
        alt: "Poročni gostje fotografirajo s telefoni",
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

export default function WeddingPhotosGuidePage() {
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
            "kako zbrati fotografije gostov na poroki",
            "skupni album poroka",
            "deljenje fotografij svatje",
          ],
        })}
      />
      <JsonLd<BreadcrumbList>
        item={guideBreadcrumbSchema({ slug: guide.slug, name: "Fotografije gostov na poroki" })}
      />
      <JsonLd<ItemList>
        item={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Pet načinov zbiranja fotografij gostov na poroki",
          itemListOrder: "https://schema.org/ItemListOrderAscending",
          numberOfItems: weddingPhotoComparison.rows.length,
          itemListElement: weddingPhotoComparison.rows.map((row, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: row.method,
            description: `Cena: ${row.price}. Kaj dobite: ${row.gain}. Kje razpade: ${row.breaks}.`,
          })),
        }}
      />
      <WeddingPhotosGuide />
    </>
  );
}

export const dynamic = "force-static";
