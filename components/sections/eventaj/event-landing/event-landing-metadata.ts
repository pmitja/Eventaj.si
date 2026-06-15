import { EventLanding } from "@/content/eventaj/event-pages";
import { Metadata } from "next";

export function buildEventLandingMetadata(landing: EventLanding): Metadata {
  const url = `https://www.eventaj.si/${landing.slug}`;
  const ogImage = "/og/photo-booth.webp";
  return {
    title: landing.seoTitle,
    description: landing.metaDescription,
    keywords: landing.keywords,
    openGraph: {
      title: landing.seoTitle,
      description: landing.metaDescription,
      url,
      siteName: "Eventaj.si",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: landing.eyebrow + " - Eventaj.si",
        },
      ],
      locale: "sl_SI",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: landing.seoTitle,
      description: landing.metaDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
