import { QrCodeGuide } from "@/components/nasveti/qr-code-guide";
import { getGuide, qrCodeSteps } from "@/content/nasveti";
import { guideArticleSchema, guideBreadcrumbSchema } from "@/content/nasveti-schema";
import type { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import type { Article, BreadcrumbList, HowTo } from "schema-dts";

const guide = getGuide("qr-koda-za-fotografije");
const url = `https://www.eventaj.si/nasveti/${guide.slug}`;
const title = "QR koda za fotografije z dogodka: kako deluje";
const description =
  "Kako pripraviti QR kodo, da gostje nalagajo fotografije. Zakaj brezplačen generator ni dovolj, v kakšni velikosti tiskati in katere napake se najpogosteje ponovijo.";
const heroImage = "/qr-galerija/postavitve/table.jpg";

export const metadata: Metadata = {
  title: `${title} | Eventaj.si`,
  description,
  keywords: [
    "qr koda za fotografije",
    "kako narediti qr kodo za fotografije",
    "qr koda za dogodek",
    "qr koda za nalaganje fotografij",
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
        height: 768,
        alt: "QR koda v stojalu na mizi med dogodkom",
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

export default function QrCodeGuidePage() {
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
            "qr koda za fotografije",
            "kako narediti qr kodo za fotografije",
            "qr koda za dogodek",
          ],
        })}
      />
      <JsonLd<BreadcrumbList>
        item={guideBreadcrumbSchema({ slug: guide.slug, name: "QR koda za fotografije" })}
      />
      <JsonLd<HowTo>
        item={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Kako pripraviti QR kodo za fotografije z dogodka",
          description:
            "Štirje koraki od ustvarjene galerije do preizkušene QR kode, pripravljene za tisk.",
          inLanguage: "sl-SI",
          totalTime: "PT15M",
          estimatedCost: {
            "@type": "MonetaryAmount",
            currency: "EUR",
            value: "35",
          },
          step: qrCodeSteps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.title,
            text: step.body,
            url: `${url}#postopek`,
          })),
        }}
      />
      <QrCodeGuide />
    </>
  );
}

export const dynamic = "force-static";
