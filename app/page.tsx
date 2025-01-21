import HomeHero from "@/components/home-hero";
import { CTASection } from "@/components/sections/cta-section";
import Features from "@/components/sections/features";
import { videoFeatures } from "@/components/sections/features-content";
import { PhotoBoothOptions } from "@/components/sections/photo-booth-options";
import PromoImage from "@/components/sections/promo-image";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { Metadata } from "next";

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
  title: "Photo Booth in 360 Photo Booth | Eventaj.si",
  description:
    "Eventaj.si prinaša vrhunsko zabavo na vašo prireditev! Izberite klasičnim photo booth ali 360 photo booth in ujemite nepozabne trenutke.",
  keywords:
    "foto stojnica,photo booth, 360 photo booth najem, photo booth najem, najem photo booth, najem 360 photo booth, zabava, foto booth 360, poroka, foto stojnica za poroko",
  openGraph: {
    title: "Photo Booth in 360 Photo Booth | Eventaj.si",
    description:
      "Eventaj.si prinaša vrhunsko zabavo na vašo prireditev! Izberite klasičnim photo booth ali 360 photo booth in ujemite nepozabne trenutke.",
    images: [
      {
        url: "https://eventaj.si/application/hero-image-2.webp",
        width: 1200,
        height: 630,
        alt: "Photo Booth in 360 Photo Booth Eventaj.si",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Booth in 360 Photo Booth | Eventaj.si",
    description:
      "Eventaj.si prinaša vrhunsko zabavo na vašo prireditev! Izberite klasičnim photo booth ali 360 photo booth in ujemite nepozabne trenutke.",
    images: ["https://eventaj.si/application/hero-image-2.webp"],
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

// JSON-LD structured data
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Eventaj.si",
  alternateName: "Photo Booth in 360 Photo Booth | Eventaj.si",
  description:
    "Eventaj.si prinaša vrhunsko zabavo na vašo prireditev! Izberite klasičnim photo booth ali 360 photo booth in ujemite nepozabne trenutke.",
  url: "https://eventaj.si",
  logo: {
    "@type": "ImageObject",
    url: "https://eventaj.si/application/icon-256x256.png",
  },
  image: ["https://eventaj.si/application/hero-image-2.webp"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Slomškova ulica 1",
    addressLocality: "Lenart",
    postalCode: "2230",
    addressCountry: "SI",
    addressRegion: "Lenart",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "46.576382",
    longitude: "15.831834",
  },
  areaServed: {
    "@type": "Country",
    name: "Slovenija",
  },
  priceRange: "€€",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Photo Booth Storitve",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Photo Booth",
          url: "https://eventaj.si/photo-booth",
          description:
            "Najem photo booth-a z rekviziti in ozadji za nepozabne, kreativne fotografije",
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "299",
            highPrice: "499",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
          },
        },
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "50",
  },
  brand: {
    "@type": "Brand",
    name: "Eventaj.si",
    logo: {
      "@type": "ImageObject",
      url: "https://eventaj.si/application/icon-256x256.png",
    },
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "eventaj.si@gmail.com",
    areaServed: "SI",
    availableLanguage: ["sl"],
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61567672817538",
    "https://www.instagram.com/eventaj.si/profilecard/?igsh=MWZtMWx4N2dsNDc0dA%3D%3D",
  ],
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
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
        description="Kontaktirajte nas in skupaj bomo našli najboljšo rešitev za vaš dogodek."
        action={{
          text: "Kontaktirajte nas",
          href: "/kontakt",
          variant: "glow",
        }}
        withGlow={true}
      />
      <PromoImage />
    </main>
  );
}
