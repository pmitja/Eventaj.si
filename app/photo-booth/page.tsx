import { ServicePageContent } from "@/components/claude/sections";
import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import { Service } from "schema-dts";

const photoBoothPageTitle = "Photo booth najem po Sloveniji od 279 € | Eventaj.si";

const pricingPlans = [
  { name: "Basic", price: "279", description: "2 uri photo booth najema" },
  { name: "Standard", price: "329", description: "3 ure photo booth najema" },
  { name: "Premium", price: "379", description: "4 ure photo booth najema" },
] as const;

export const metadata: Metadata = {
  title: photoBoothPageTitle,
  description:
    "Photo booth najem za poroke, zabave in poslovne dogodke po celotni Sloveniji. Od 279 €/2h z neomejenimi fotografijami, rekviziti, takojšnjim tiskom, spletno galerijo in profesionalno izvedbo. Pokličite 031 285 143.",
  keywords: [
    "photo booth najem",
    "photo booth Slovenija",
    "photo booth Ljubljana",
    "photo booth Maribor",
    "photo booth Celje",
    "najem photo booth cena",
    "photo booth za poroko",
    "photo booth za zabavo",
    "foto stojnica za dogodke",
    "photo booth cena",
  ],
  openGraph: {
    title: photoBoothPageTitle,
    description:
      "Najem photo booth stojnice z neomejenimi fotografijami in rekviziti po vsej Sloveniji.",
    url: "https://www.eventaj.si/photo-booth",
    siteName: "Eventaj.si",
    images: [
      {
        url: "/og/photo-booth.webp",
        width: 1200,
        height: 630,
        alt: "Photo Booth Najem - Eventaj.si",
      },
    ],
    locale: "sl_SI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: photoBoothPageTitle,
    description:
      "Najem photo booth naprave z asistenco in rekviziti po celotni Sloveniji. Rezerviraj termin že danes.",
    images: ["/og/photo-booth.webp"],
  },
  alternates: {
    canonical: "https://www.eventaj.si/photo-booth",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PhotoBooth() {
  return (
    <>
      <JsonLd<Service>
        item={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Photo Booth Najem",
          url: "https://eventaj.si/photo-booth",
          provider: {
            "@type": "LocalBusiness",
            name: "Eventaj.si",
            url: "https://eventaj.si",
            image: "https://eventaj.si/application/logo.svg",
            email: "info@eventaj.si",
            telephone: "+386 31 285 143",
            address: {
              "@type": "PostalAddress",
              addressCountry: "Slovenija",
              addressLocality: "Lenart v Slovenskih goricah",
              addressRegion: "Štajerska",
              postalCode: "2230",
              streetAddress: "Slomškova ulica 1",
            },
          },
          areaServed: "Slovenija",
          description:
            "Profesionalni najem photo booth naprave za poroke, poslovne dogodke, festivale in zabave po vsej Sloveniji. Vključuje operaterja, rekvizite, personalizirane predloge in takojšnje tiskanje fotografij.",
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "279",
            highPrice: "379",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            priceValidUntil: "2026-12-31",
          },
          serviceType: "Photo Booth Rental",
          category: ["Photo Booth", "Event Services", "Photography Services"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Photo Booth Packages",
            itemListElement: pricingPlans.map((plan) => ({
              "@type": "Offer",
              name: plan.name,
              price: plan.price,
              priceCurrency: "EUR",
              description: plan.description,
            })),
          },
        }}
      />
      <ServicePageContent type="photo" seoTitle={photoBoothPageTitle} />
    </>
  );
}
