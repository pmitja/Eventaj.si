import { ServicePageContent } from "@/components/sections/eventaj/service/service-page-content";
import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import { BreadcrumbList, Service } from "schema-dts";

const photoBoothPageTitle = "Photo Booth najem po Sloveniji od 279 € | Eventaj.si";

const pricingPlans = [
  { name: "Basic", price: "279", description: "2 uri Photo Booth najema" },
  { name: "Standard", price: "329", description: "3 ure Photo Booth najema" },
  { name: "Premium", price: "379", description: "4 ure Photo Booth najema" },
] as const;

export const metadata: Metadata = {
  title: photoBoothPageTitle,
  description:
    "Photo Booth najem za poroke, zabave in poslovne dogodke po celotni Sloveniji. Od 279 €/2h z neomejenimi fotografijami, rekviziti, takojšnjim tiskom, spletno galerijo in profesionalno izvedbo. Pokličite 031 285 143.",
  keywords: [
    "Photo Booth najem",
    "Photo Booth Slovenija",
    "Photo Booth Ljubljana",
    "Photo Booth Maribor",
    "Photo Booth Celje",
    "najem Photo Booth cena",
    "Photo Booth za poroko",
    "Photo Booth za zabavo",
    "foto stojnica za dogodke",
    "Photo Booth cena",
  ],
  openGraph: {
    title: photoBoothPageTitle,
    description:
      "Najem Photo Booth stojnice z neomejenimi fotografijami in rekviziti po vsej Sloveniji.",
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
      "Najem Photo Booth naprave z asistenco in rekviziti po celotni Sloveniji. Rezerviraj termin že danes.",
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
          url: "https://www.eventaj.si/photo-booth",
          provider: {
            "@type": "LocalBusiness",
            name: "Eventaj.si",
            url: "https://www.eventaj.si",
            image: "https://www.eventaj.si/application/logo.svg",
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
            "Profesionalni najem Photo Booth naprave za poroke, poslovne dogodke, festivale in zabave po vsej Sloveniji. Vključuje operaterja, rekvizite, personalizirane predloge in takojšnje tiskanje fotografij.",
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
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Domov", item: "https://www.eventaj.si" },
            { "@type": "ListItem", position: 2, name: "Photo Booth", item: "https://www.eventaj.si/photo-booth" },
          ],
        }}
      />
      <ServicePageContent type="photo" seoTitle={photoBoothPageTitle} />
    </>
  );
}
export const dynamic = "force-static"
