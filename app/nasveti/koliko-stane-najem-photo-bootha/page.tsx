import { BoothPriceGuide } from "@/components/nasveti/booth-price-guide";
import { getGuide, priceQuestions } from "@/content/nasveti";
import { guideArticleSchema, guideBreadcrumbSchema } from "@/content/nasveti-schema";
import { priceValidUntil } from "@/content/eventaj/structured-data";
import type { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import type { Article, BreadcrumbList, FAQPage, Product } from "schema-dts";

const guide = getGuide("koliko-stane-najem-photo-bootha");
const url = `https://www.eventaj.si/nasveti/${guide.slug}`;
const title = "Koliko stane najem photo bootha v Sloveniji (2026)";
const description =
  "Cene najema foto boxa se gibljejo od 250 do 500 € za večer. Kaj vpliva na ceno, kaj je običajno vključeno in kje se pojavijo doplačila.";
const heroImage = "/og/photo-booth.webp";

/** Short answers to the six questions, so the FAQ block is ours and verifiable. */
const faqAnswers = [
  "Pri nas je tiskanje neomejeno. Vsak gost odnese svojo fotografijo, kolikorkrat gre v booth.",
  "Prevoz uskladimo glede na lokacijo dogodka in ga vključimo v končno ponudbo. Vse stroške poznate vnaprej, brez skritih doplačil.",
  "Naša ekipa je prisotna ves čas najema. Booth ni samopostrežen.",
  "Postavitev traja od 30 do 45 minut in se ne šteje v čas najema.",
  "Fotografije prejmete v zasebni spletni galeriji najkasneje v 48 urah po dogodku.",
  "Pišite nam čim prej. Nov termin uskladimo glede na razpoložljivost, pogoji pa so zapisani v ponudbi, ki jo prejmete pred rezervacijo.",
] as const;

export const metadata: Metadata = {
  // No "| Eventaj.si" suffix: with it these titles run past 60 characters
  // and Google truncates them mid-phrase.
  title,
  description,
  keywords: [
    "cena najema photo bootha",
    "koliko stane foto box",
    "fotobox cena",
    "najem foto stojnice cena",
    "photo booth cena",
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
        alt: "Photo booth Eventaj na dogodku",
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

export default function BoothPriceGuidePage() {
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
            "cena najema photo bootha",
            "koliko stane foto box",
            "fotobox cena",
            "najem foto stojnice cena",
          ],
        })}
      />
      <JsonLd<BreadcrumbList>
        item={guideBreadcrumbSchema({ slug: guide.slug, name: "Cena najema photo bootha" })}
      />
      <JsonLd<Product>
        item={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Najem photo bootha",
          description:
            "Photo booth z DSLR fotoaparatom, osvetlitvijo, rekviziti, prisotno ekipo in neomejenim tiskom fotografij.",
          url: "https://www.eventaj.si/photo-booth",
          brand: { "@type": "Brand", name: "Eventaj.si" },
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "EUR",
            lowPrice: "279",
            highPrice: "379",
            offerCount: 3,
            availability: "https://schema.org/InStock",
            priceValidUntil,
            url: "https://www.eventaj.si/cenik",
            seller: { "@type": "Organization", name: "Eventaj.si", url: "https://www.eventaj.si" },
          },
        }}
      />
      <JsonLd<FAQPage>
        item={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: priceQuestions.map((question, index) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: faqAnswers[index] },
          })),
        }}
      />
      <BoothPriceGuide />
    </>
  );
}

export const dynamic = "force-static";
