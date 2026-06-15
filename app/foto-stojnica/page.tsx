import { ServicePageContent } from "@/components/sections/eventaj/service/service-page-content";
import {
  buildFaqPageSchema,
  eventajAggregateRating,
  priceValidUntil,
} from "@/content/eventaj/structured-data";
import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import { BreadcrumbList, FAQPage, Service } from "schema-dts";

const pageTitle = "Foto stojnica najem po Sloveniji od 279 € | Eventaj.si";

const pricingPlans = [
  { name: "Basic", price: "279", description: "2 uri foto stojnice" },
  { name: "Standard", price: "329", description: "3 ure foto stojnice" },
  { name: "Premium", price: "379", description: "4 ure foto stojnice" },
] as const;

export const metadata: Metadata = {
  title: pageTitle,
  description:
    "Foto stojnica najem za poroke, zabave in poslovne dogodke po celotni Sloveniji. Od 279 €/2h z neomejenimi fotografijami, rekviziti, takojšnjim tiskom, spletno galerijo in brezplačnim prevozom do 20 km. Pokličite 031 285 143.",
  keywords: [
    "foto stojnica najem",
    "foto stojnica Slovenija",
    "foto stojnica Ljubljana",
    "foto stojnica Maribor",
    "foto stojnica Celje",
    "foto stojnica cena",
    "foto stojnica za poroke",
    "foto stojnica za zabave",
    "fotobox najem",
  ],
  openGraph: {
    title: pageTitle,
    description:
      "Najem foto stojnice z neomejenimi fotografijami in rekviziti po vsej Sloveniji. Pokrivamo Ljubljano, Maribor, Celje, Primorsko in ostale regije.",
    url: "https://www.eventaj.si/foto-stojnica",
    siteName: "Eventaj.si",
    images: [
      {
        url: "/og/photo-booth.webp",
        width: 1200,
        height: 630,
        alt: "Foto Stojnica Najem - Eventaj.si",
      },
    ],
    locale: "sl_SI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description:
      "Najem foto stojnice z asistenco in rekviziti po celotni Sloveniji. Rezerviraj termin že danes.",
    images: ["/og/photo-booth.webp"],
  },
  alternates: {
    canonical: "https://www.eventaj.si/foto-stojnica",
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

export default function FotoStojnica() {
  return (
    <>
      <JsonLd<Service>
        item={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Foto Stojnica Najem",
          url: "https://www.eventaj.si/foto-stojnica",
          provider: {
            "@type": "LocalBusiness",
            name: "Eventaj.si",
            url: "https://www.eventaj.si",
            image: "https://www.eventaj.si/application/logo.svg",
            email: "info@eventaj.si",
            address: {
              "@type": "PostalAddress",
              addressCountry: "SI",
              addressLocality: "Lenart v Slovenskih goricah",
              addressRegion: "Štajerska",
              postalCode: "2230",
              streetAddress: "Slomškova ulica 1",
            },
            telephone: "+386 31 285 143",
            sameAs: [
              "https://www.facebook.com/profile.php?id=61567672817538",
              "https://www.instagram.com/eventaj.si/profilecard/?igsh=MWZtMWx4N2dsNDc0dA==",
              "https://www.tiktok.com/@eventaj.si?_t=ZN-8tKYVf1BUcI&_r=1",
            ],
          },
          areaServed: [
            { "@type": "Country", name: "Slovenija" },
            { "@type": "City", name: "Ljubljana" },
            { "@type": "City", name: "Maribor" },
            { "@type": "City", name: "Celje" },
            { "@type": "AdministrativeArea", name: "Primorska" },
            { "@type": "AdministrativeArea", name: "Gorenjska" },
          ],
          aggregateRating: eventajAggregateRating,
          description:
            "Profesionalni najem foto stojnice za dogodke, poroke, rojstne dneve in zabave po celotni Sloveniji. Vključuje operaterja, rekvizite, personalizirane predloge ter takojšnje tiskanje fotografij.",
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "279",
            highPrice: "379",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            validFrom: "2024-01-01",
            priceValidUntil,
          },
          serviceType: "Foto Stojnica Rental",
          category: ["Foto Stojnica", "Event Services", "Photography Services"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Foto Stojnica Packages",
            itemListElement: pricingPlans.map((plan) => ({
              "@type": "Offer",
              name: plan.name,
              price: plan.price,
              priceCurrency: "EUR",
              description: plan.description,
            })),
          },
          termsOfService: "https://www.eventaj.si/pogoji-uporabe",
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Domov", item: "https://www.eventaj.si" },
            { "@type": "ListItem", position: 2, name: "Foto stojnica", item: "https://www.eventaj.si/foto-stojnica" },
          ],
        }}
      />
      <JsonLd<FAQPage> item={buildFaqPageSchema()} />
      <ServicePageContent
        type="photo"
        seoTitle={pageTitle}
        h1="Najem foto stojnice po Sloveniji"
        heroTag="Foto stojnica"
        heroTitle="Foto stojnica,"
        heroItalicWord="ki poveže goste"
        heroDescription="Foto stojnica s takojšnjim tiskom in neomejenimi fotografijami. Rekviziti, personaliziran dizajn in spletna galerija — popestritev porok, rojstnih dni in poslovnih dogodkov po vsej Sloveniji."
        featureTitle="Vse vključeno,"
        featureItalicWord="brez skritih stroškov"
      />
    </>
  );
}

export const dynamic = "force-static";
