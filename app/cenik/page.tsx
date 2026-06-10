import { CenikPageContent } from "@/components/sections/eventaj-pages";
import { Metadata } from "next";

const pageTitle = "Cenik Photo Booth in 360° Booth najema | Eventaj.si";

export const metadata: Metadata = {
  title: pageTitle,
  description:
    "Pregleden cenik za Photo Booth in 360° Booth najem. Photo Booth od 279 €, 360° Booth od 299 €, dodatki in ponudba po meri.",
  alternates: {
    canonical: "https://eventaj.si/cenik",
  },
  openGraph: {
    title: pageTitle,
    description:
      "Pregledni paketi, dodatki in konfigurator ponudbe za Photo Booth in 360° Booth najem.",
    url: "https://eventaj.si/cenik",
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
  return <CenikPageContent seoTitle={pageTitle} />;
}
export const dynamic = "force-static"
