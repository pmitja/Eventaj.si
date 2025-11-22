import HomeHero from "@/components/home-hero";
import { CTASection } from "@/components/sections/cta-section";
import { PhotoBoothOptions } from "@/components/sections/photo-booth-options";
import PromoImage from "@/components/sections/promo-image";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "react-schemaorg";
import { LocalBusiness, Organization, WebSite } from "schema-dts";

export const metadata: Metadata = {
  title: "Photo Booth Najem po Sloveniji - že od 249€ | Eventaj.si",
  description:
    "🎉 Photo Booth & 360° najem po Sloveniji! Že od 249€ za 2 uri. ✅ Takojšnje tiskanje ✅ Rekviziti vključeni ✅ Brezplačen prevoz. Rezerviraj danes!",
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
    title: "Photo Booth Najem po Sloveniji - že od 249€ | Eventaj.si",
    description:
      "🎉 Photo Booth & 360° najem po Sloveniji! Že od 249€ za 2 uri. ✅ Takojšnje tiskanje ✅ Rekviziti vključeni ✅ Brezplačen prevoz. Rezerviraj danes!",
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
    title: "Photo Booth Najem po Sloveniji - že od 249€ | Eventaj.si",
    description:
      "🎉 Photo Booth & 360° najem po Sloveniji! Že od 249€ za 2 uri. ✅ Takojšnje tiskanje ✅ Rekviziti vključeni ✅ Brezplačen prevoz. Rezerviraj danes!",
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
          image: "https://eventaj.si/application/logo.svg",
          "@id": "https://eventaj.si",
          url: "https://eventaj.si",
          telephone: "+386 31 285 143",
          email: "info@eventaj.si",
          sameAs: [
            "https://www.facebook.com/profile.php?id=61567672817538",
            "https://www.instagram.com/eventaj.si/profilecard/?igsh=MWZtMWx4N2dsNDc0dA==",
            "https://www.tiktok.com/@eventaj.si?_t=ZN-8tKYVf1BUcI&_r=1",
          ],
          slogan: "Photo booth in 360° photo booth najem po celi Sloveniji",
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
            geoRadius: "20km",
          },
        }}
      />

      <main>
        {/* Hero Section */}
        <HomeHero
          title="Photo Booth & 360° Booth Najem"
          text="Najemi in ujemi spomine. Naj vaš dogodek traja večno s fotografijami in videoposnetki. Zajete trenutke objavi ali natisni. Rezerviraj svoj termin še danes."
        />

        {/* Photo Booth Options */}
        <PhotoBoothOptions />

        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="rounded-3xl border border-black/5 bg-white/80 p-8 shadow-xl shadow-black/5 backdrop-blur dark:border-white/10 dark:bg-background/70">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Potrebujete hitro ponudbo?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Preverite{" "}
              <Link
                href="/photo-booth"
                className="text-[#C99566] underline-offset-2 hover:underline"
              >
                najem photo booth po Sloveniji
              </Link>{" "}
              ali{" "}
              <Link
                href="/360-photo-booth"
                className="text-[#C99566] underline-offset-2 hover:underline"
              >
                360 photo booth najem
              </Link>{" "}
              in preberite{" "}
              <Link
                href="/photo-booth/faq"
                className="text-[#C99566] underline-offset-2 hover:underline"
              >
                photo booth najem cena FAQ
              </Link>{" "}
              za logistiko, prevoz in dodatna vprašanja.
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsSection
          title="Kaj pravijo naši zadovoljni uporabniki"
          description="Preverite, kaj o nas menijo stranke, ki so že uporabljale naš 360° photo booth"
        />

        {/* CTA Section */}
        <CTASection
          title="Bi popestril zabavo z našim 360° photo booth-om?"
          description="Rezerviraj termin še danes."
          action={{
            text: "Rezerviraj termin",
            variant: "glow",
          }}
          withGlow={true}
        />
        <PromoImage />
      </main>
    </>
  );
}
