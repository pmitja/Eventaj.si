import { HomePageContent } from "@/components/sections/eventaj-pages";
import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import { LocalBusiness, Organization, WebSite } from "schema-dts";

export const metadata: Metadata = {
  title: "Photo Booth Najem po Sloveniji - že od 279€ | Eventaj.si",
  description:
    "Photo Booth & 360° najem po Sloveniji. Že od 279€ za 2 uri. Takojšnje tiskanje, rekviziti, personalizacija in profesionalna izvedba.",
  keywords: [
    "foto zabava",
    "360° Booth",
    "Photo Booth",
    "Photo Booth najem",
    "360° Booth",
    "foto stojnica",
    "Photo Booth najem",
    "najem Photo Booth",
    "360° Booth najem",
    "foto stojnica za poroko",
    "foto box za poroko",
    "foto booth zabava",
  ],
  openGraph: {
    title: "Photo Booth Najem po Sloveniji - že od 279€ | Eventaj.si",
    description:
      "Photo Booth & 360° najem po Sloveniji. Takojšnje tiskanje, rekviziti, personalizacija in profesionalna izvedba.",
    images: [
      {
        url: "/og/photo-booth.webp",
        width: 1200,
        height: 630,
        alt: "Photo Booth in 360° Booth Eventaj.si",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Booth Najem po Sloveniji - že od 279€ | Eventaj.si",
    description:
      "Photo Booth & 360° najem po Sloveniji. Takojšnje tiskanje, rekviziti, personalizacija in profesionalna izvedba.",
    images: ["/og/photo-booth.webp"],
  },
  alternates: {
    canonical: "https://eventaj.si/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "https://eventaj.si/application/icon-32x32.png",
    apple: "https://eventaj.si/application/icon-256x256.png",
  },
  other: {
    "google-site-verification": "v9KCsI_ie0FgHL5ow8zD3M_gjvPEXc",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd<WebSite>
        item={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Eventaj.si",
          url: "https://eventaj.si",
          description:
            "Profesionalni najem Photo Booth in 360° Booth naprav za dogodke, poroke in zabave v Sloveniji.",
        }}
      />
      <JsonLd<Organization>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Eventaj.si",
          url: "https://eventaj.si",
          logo: "https://eventaj.si/application/logo.svg",
          description:
            "Vodilni ponudnik Photo Booth in 360° Booth storitev v Sloveniji. Specializirani za poroke, dogodke in zabave.",
          sameAs: [
            "https://www.facebook.com/eventaj.si",
            "https://www.instagram.com/eventaj.si/",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+386 31 285 143",
            contactType: "customer service",
            areaServed: "SI",
            availableLanguage: ["Slovenian", "English"],
          },
        }}
      />
      <JsonLd<LocalBusiness>
        item={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Eventaj.si",
          image: "https://eventaj.si/application/logo.svg",
          "@id": "https://eventaj.si",
          url: "https://eventaj.si",
          telephone: "+386 31 285 143",
          email: "info@eventaj.si",
          slogan: "Photo Booth in 360° Booth najem po celi Sloveniji",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Slomškova ulica 1",
            addressLocality: "Lenart v Slovenskih goricah",
            addressRegion: "Štajerska",
            postalCode: "2230",
            addressCountry: "SI",
          },
          priceRange: "€€",
        }}
      />
      <HomePageContent />
    </>
  );
}
