import { guides } from "@/content/nasveti";
import type { Metadata } from "next";
import { GuideCards } from "@/components/nasveti/guide-cards";
import { JsonLd } from "react-schemaorg";
import type { BreadcrumbList, CollectionPage } from "schema-dts";

const url = "https://www.eventaj.si/nasveti";
const title = "Nasveti za poroke in dogodke";
const description =
  "Vodniki za poroke in dogodke: knjige gostov, igre, table dobrodošlice, fotografije in izbira photo bootha.";

const shell = "mx-auto w-full max-w-7xl px-5 md:px-10";

export const metadata: Metadata = {
  title: `${title} | Eventaj.si`,
  description,
  keywords: [
    "nasveti za poroko",
    "knjiga gostov",
    "igre na poroki",
    "fotografije z dogodkov",
  ],
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    siteName: "Eventaj.si",
    locale: "sl_SI",
    type: "website",
    images: [
      {
        url: "/og/photo-booth.webp",
        width: 1731,
        height: 909,
        alt: "Nasveti za poroke in dogodke",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og/photo-booth.webp"],
  },
  robots: { index: true, follow: true },
};

export default function NasvetiPage() {
  return (
    <>
      <JsonLd<CollectionPage>
        item={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: title,
          description,
          url,
          inLanguage: "sl-SI",
          hasPart: guides.map((guide) => ({
            "@type": "Article",
            headline: guide.label,
            description: guide.teaser,
            url: `https://www.eventaj.si/nasveti/${guide.slug}`,
          })),
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Domov",
              item: "https://www.eventaj.si",
            },
            { "@type": "ListItem", position: 2, name: "Nasveti", item: url },
          ],
        }}
      />
      <main>
        <section className="pb-14 pt-32 md:pb-20 md:pt-44">
          <div className={`${shell} max-w-4xl`}>
            <div className="mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-accent)]">
              Nasveti
            </div>
            <h1 className="font-serif-display text-[clamp(44px,6.5vw,84px)] font-[350] leading-[0.96] tracking-[-0.04em] text-balance">
              Nasveti za vaš naslednji dogodek
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[var(--eventaj-muted)] md:text-xl">
              Primerjave opreme, ideje za poroko in nasveti za fotografije. Kaj
              deluje, koliko stane in kje se zatakne.
            </p>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className={shell}>
            <GuideCards />
          </div>
        </section>
      </main>
    </>
  );
}

export const dynamic = "force-static";
