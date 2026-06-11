import { CenikPageContent } from "@/components/sections/eventaj/cenik/cenik-page-content";
import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import type { BreadcrumbList } from "schema-dts";

const pageTitle = "Cenik Photo Booth in 360° Booth najema | Eventaj.si";

export const metadata: Metadata = {
  title: pageTitle,
  description:
    "Pregleden cenik za Photo Booth in 360° Booth najem. Photo Booth od 279 €, 360° Booth od 299 €, dodatki in ponudba po meri.",
  alternates: {
    canonical: "https://www.eventaj.si/cenik",
  },
  openGraph: {
    title: pageTitle,
    description:
      "Pregledni paketi, dodatki in konfigurator ponudbe za Photo Booth in 360° Booth najem.",
    url: "https://www.eventaj.si/cenik",
    siteName: "Eventaj.si",
    images: [
      {
        url: "/og/photo-booth.webp",
        width: 1200,
        height: 630,
        alt: "Cenik Photo Booth in 360° Booth najema - Eventaj.si",
      },
    ],
    locale: "sl_SI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description:
      "Pregledni paketi, dodatki in konfigurator ponudbe za Photo Booth in 360° Booth najem.",
    images: ["/og/photo-booth.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CenikPage() {
  return (
    <>
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
