import HomeHero from "@/components/home-hero";
import { CTASection } from "@/components/sections/cta-section";
import Features from "@/components/sections/features";
import { videoFeatures } from "@/components/sections/features-content";
import { PhotoBoothOptions } from "@/components/sections/photo-booth-options";
import PromoImage from "@/components/sections/promo-image";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import { LocalBusiness, Organization, WebSite } from "schema-dts";

const testimonials = [
  {
    author: {
      name: "Petra Horvat",
      title: "Rojstnodnevna slavljenka",
    },
    text: "Vsi moji prijatelji so se noro zabavali z vašim photo boothom. Nepozabni spomini!",
  },
  {
    author: {
      name: "Matej Zupančič",
      title: "Organizator dogodkov",
    },
    text: "Profesionalen pristop in odlična izvedba! Definitivno vas bomo še kdaj najeli.",
  },
  // Add more testimonials...
];

export const metadata: Metadata = {
  title: "Photo Booth & 360 Photo Booth Najem | Foto Zabava | Eventaj.si",
  description:
    "Najemi photo booth ali 360 photo booth za nepozabno foto zabavo na vašem dogodku! Profesionalna foto stojnica za poroke, zabave in dogodke. Takojšnje tiskanje fotografij in deljenje posnetkov.",
  keywords: [
    "foto zabava",
    "photobooth 360",
    "photobooth",
    "photobooth najem",
    "360 photobooth",
    "foto stojnica",
    "photo booth najem",
    "najem photo booth",
    "360 photo booth najem",
    "foto stojnica za poroko",
    "foto box za poroko",
    "foto booth zabava",
  ],
  openGraph: {
    title: "Photo Booth & 360 Photo Booth Najem | Foto Zabava | Eventaj.si",
    description:
      "Najemi photo booth ali 360 photo booth za nepozabno foto zabavo na vašem dogodku! Profesionalna foto stojnica za poroke, zabave in dogodke. Takojšnje tiskanje fotografij in deljenje posnetkov.",
    images: [
      {
        url: "/og/photo-booth.webp",
        width: 1200,
        height: 630,
        alt: "Photo Booth in 360 Photo Booth Eventaj.si",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Booth & 360 Photo Booth Najem | Foto Zabava | Eventaj.si",
    description:
      "Najemi photo booth ali 360 photo booth za nepozabno foto zabavo na vašem dogodku! Profesionalna foto stojnica za poroke, zabave in dogodke. Takojšnje tiskanje fotografij in deljenje posnetkov.",
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
            "Profesionalni najem photo booth in 360 photo booth naprav za dogodke, poroke in zabave v Sloveniji.",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://eventaj.si/search?q={search_term_string}",
            query: "required name=search_term_string",
          },
        }}
      />

      <JsonLd<Organization>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Eventaj.si",
          url: "https://eventaj.si",
          logo: "https://eventaj.si/logo.png",
          description:
            "Vodilni ponudnik photo booth in 360 photo booth storitev v Sloveniji. Specializirani za poroke, dogodke in zabave.",
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
          image: "https://eventaj.si/logo.png",
          "@id": "https://eventaj.si",
          url: "https://eventaj.si",
          telephone: "+386 31 285 143",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Slomškova ulica 1",
            addressLocality: "Lenart v Slovenskih goricah",
            postalCode: "2230",
            addressCountry: "SI",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 46.576,
            longitude: 15.8308,
          },
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
          priceRange: "€€",
          areaServed: {
            "@type": "GeoCircle",
            geoMidpoint: {
              "@type": "GeoCoordinates",
              latitude: 46.0569,
              longitude: 14.5058,
            },
            geoRadius: "200km",
          },
        }}
      />

      <main>
        {/* Hero Section */}
        <HomeHero
          title="Najemi in ujemi spomine"
          text="Naj vaš dogodek traja večno s fotografijami in videoposnetki. Zajete trenutke objavi ali natisni. Rezerviraj svoj termin še danes."
        />

        {/* Photo Booth Options */}
        <PhotoBoothOptions />

        {/* Features Section */}
        <Features {...videoFeatures} />

        {/* Testimonials */}
        <TestimonialsSection
          title="Kaj pravijo naši zadovoljni uporabniki"
          description="Preverite, kaj o nas menijo stranke, ki so že uporabljale naš 360° photo booth"
          testimonials={testimonials}
        />

        {/* CTA Section */}
        <CTASection
          title="Vas zanima naš photo booth?"
          description="Rezervirajte termin še danes."
          action={{
            text: "Rezervirajte termin",
            variant: "glow",
          }}
          withGlow={true}
        />
        <PromoImage />
      </main>
    </>
  );
}
