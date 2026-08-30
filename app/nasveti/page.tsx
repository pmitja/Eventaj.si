import { guides } from "@/content/nasveti";
import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "react-schemaorg";
import type { BreadcrumbList, CollectionPage } from "schema-dts";
import { ChevronRight } from "lucide-react";

const url = "https://www.eventaj.si/nasveti";
const title = "Nasveti za fotografije z dogodkov";
const description =
  "Praktični vodniki o zbiranju fotografij gostov, QR kodah za dogodke in izbiri med photo boothom in QR galerijo.";

const shell = "mx-auto w-full max-w-7xl px-5 md:px-10";
const rule = "border-[rgba(20,17,15,0.12)]";

export const metadata: Metadata = {
  title: `${title} | Eventaj.si`,
  description,
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
        alt: "Nasveti za fotografije z dogodkov",
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
            { "@type": "ListItem", position: 1, name: "Domov", item: "https://www.eventaj.si" },
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
              Kako spraviti fotografije gostov na eno mesto
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[var(--eventaj-muted)] md:text-xl">
              Kratki vodniki brez oglaševanja. Kje vsak način razpade, koliko stane in kdaj je naša
              storitev slabša izbira od brezplačne.
            </p>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className={shell}>
            <div className={`grid border-l border-t ${rule} md:grid-cols-2 lg:grid-cols-3`}>
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/nasveti/${guide.slug}`}
                  className={`group flex min-h-72 flex-col border-b border-r ${rule} p-7 no-underline transition-colors hover:bg-white/60 md:p-9`}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--eventaj-accent)]">
                    {guide.eyebrow}
                  </span>
                  <h2 className="mt-8 font-serif-display text-3xl font-[400] leading-tight">
                    {guide.label}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--eventaj-muted)]">
                    {guide.teaser}
                  </p>
                  <span className="mt-auto flex items-center justify-between gap-2 pt-8 text-sm font-semibold">
                    Preberi
                    <span className="flex items-center gap-3 text-xs font-normal text-[var(--eventaj-muted)]">
                      {guide.readMinutes} min
                      <ChevronRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export const dynamic = "force-static";
