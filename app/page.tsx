import { HomePageContent } from "@/components/sections/eventaj/home/home-page-content";
import { eventajAggregateRating } from "@/content/eventaj/structured-data";
import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import { LocalBusiness, Organization, WebSite } from "schema-dts";

export const metadata: Metadata = {
  title: "Eventaj.si | Photo Booth in 360° Booth za dogodke",
  description:
    "Eventaj.si ustvarja Photo Booth in 360° Booth doživetja za poroke, poslovne dogodke in praznovanja po Sloveniji. Oglejte si storitve, pakete in proste termine.",
  keywords: [
    "Eventaj.si",
    "Photo Booth dogodki",
    "360° Booth dogodki",
    "QR galerija za dogodke",
  ],
  openGraph: {
    title: "Eventaj.si | Photo Booth in 360° Booth za dogodke",
    description:
      "Photo Booth in 360° Booth doživetja za poroke, poslovne dogodke in praznovanja po Sloveniji.",
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
    title: "Eventaj.si | Photo Booth in 360° Booth za dogodke",
    description:
      "Photo Booth in 360° Booth doživetja za poroke, poslovne dogodke in praznovanja po Sloveniji.",
    images: ["/og/photo-booth.webp"],
  },
  alternates: {
    canonical: "https://www.eventaj.si/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "https://www.eventaj.si/application/icon-32x32.png",
    apple: "https://www.eventaj.si/application/icon-256x256.png",
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
          url: "https://www.eventaj.si",
          description:
            "Profesionalni najem Photo Booth in 360° Booth naprav za dogodke, poroke in zabave v Sloveniji.",
        }}
      />
      <JsonLd<Organization>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://www.eventaj.si/#organization",
          name: "Eventaj.si",
          url: "https://www.eventaj.si",
          logo: "https://www.eventaj.si/application/logo.svg",
          description:
            "Najem photo bootha, 360° bootha in opreme za dogodke ter QR galerija za fotografije gostov. Poroke, poslovni dogodki in praznovanja po vsej Sloveniji, sedež v Lenartu pri Mariboru.",
          sameAs: [
            "https://www.facebook.com/profile.php?id=61567672817538",
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
          image: "https://www.eventaj.si/application/photo-booth.webp",
          "@id": "https://www.eventaj.si/#business",
          parentOrganization: { "@id": "https://www.eventaj.si/#organization" },
          areaServed: { "@type": "Country", name: "Slovenija" },
          url: "https://www.eventaj.si",
          telephone: "+386 31 285 143",
          email: "info@eventaj.si",
          slogan: "Photo Booth in 360° Booth najem po celi Sloveniji",
          aggregateRating: eventajAggregateRating,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Slomškova ulica 1",
            addressLocality: "Lenart v Slovenskih goricah",
            addressRegion: "Štajerska",
            postalCode: "2230",
            addressCountry: "SI",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 46.5784,
            longitude: 15.8322,
          },
          sameAs: [
            "https://www.facebook.com/profile.php?id=61567672817538",
            "https://www.instagram.com/eventaj.si/",
            "https://www.tiktok.com/@eventaj.si",
          ],
          priceRange: "€€",
        }}
      />
      <HomePageContent />
    </>
  );
}
export const dynamic = "force-static"
