import { BoothNamesGuide } from "@/components/nasveti/booth-names-guide";
import { boothNames, getGuide } from "@/content/nasveti";
import { guideArticleSchema, guideBreadcrumbSchema } from "@/content/nasveti-schema";
import type { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import type { Article, BreadcrumbList, DefinedTermSet, FAQPage } from "schema-dts";

const guide = getGuide("foto-box-photo-booth-foto-stojnica");
const url = `https://www.eventaj.si/nasveti/${guide.slug}`;
const title = "Foto box, photo booth ali foto stojnica: je to isto?";
const description =
  "V Sloveniji se za isto stvar uporablja pet imen. Kaj katero pomeni, kje se res razlikujejo in kaj naj iščete, ko rezervirate.";
const heroImage = "/og/photo-booth.webp";

export const metadata: Metadata = {
  title: `${title} | Eventaj.si`,
  description,
  keywords: [
    "foto box",
    "fotobox",
    "foto stojnica",
    "foto kotiček",
    "foto kabina",
    "razlika foto box photo booth",
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
        alt: "Foto box oziroma photo booth na dogodku",
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

export default function BoothNamesGuidePage() {
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
          keywords: ["foto box", "fotobox", "foto stojnica", "foto kotiček", "foto kabina"],
        })}
      />
      <JsonLd<BreadcrumbList>
        item={guideBreadcrumbSchema({ slug: guide.slug, name: "Foto box ali photo booth" })}
      />
      {/* The page's job is defining synonyms, so the terms are marked up as such. */}
      <JsonLd<DefinedTermSet>
        item={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: "Slovenska poimenovanja za photo booth",
          description:
            "Foto box, fotobox, photo booth, foto stojnica, foto kotiček in foto kabina v slovenskih ponudbah pomenijo isto storitev.",
          url,
          inLanguage: "sl-SI",
          hasDefinedTerm: boothNames.map((name) => ({
            "@type": "DefinedTerm",
            name: name.title,
            description: name.body,
            inDefinedTermSet: url,
          })),
        }}
      />
      <JsonLd<FAQPage>
        item={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Je foto box isto kot photo booth?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Da. Foto box, fotobox, photo booth, foto stojnica, foto kotiček in foto kabina pri slovenskih ponudnikih pomenijo isto storitev. Razlike so v izvedbi, ne v imenu.",
              },
            },
            {
              "@type": "Question",
              name: "Kaj je razlika med foto stojnico in foto kabino?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Foto stojnica poudarja samostojno postavitev v prostoru. Foto kabina je najbližja starim zaprtim kabinam z zaveso. Odprta postavitev sprejme osem ljudi naenkrat, zaprta dva do tri.",
              },
            },
            {
              "@type": "Question",
              name: "Je 360 booth isto kot photo booth?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Ne. To je edina različica, ki res ni isto. Namesto fotografije nastane kratek video, posnet z vrtečo se kamero okoli stoječega gosta.",
              },
            },
          ],
        }}
      />
      <BoothNamesGuide />
    </>
  );
}

export const dynamic = "force-static";
