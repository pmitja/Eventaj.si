import { EquipmentProductPage } from "@/components/sections/eventaj/equipment/equipment-product-page";
import { standingTable, standingTableFaq } from "@/content/eventaj/equipment";
import type { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import type { BreadcrumbList, FAQPage, Product } from "schema-dts";

const pageTitle = "Najem stoječih barskih miz – 10 €/dan | Eventaj.si";
const pageDescription =
  "Najem stoječih barskih miz za dogodke po 10 € na mizo za en dan. Bel ali črn prt je vključen, na voljo je do 15 miz.";
const pageUrl = "https://www.eventaj.si/oprema-za-dogodke/najem-stojecih-miz";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: "Eventaj.si",
    locale: "sl_SI",
    type: "website",
    images: [
      {
        url: "/application/oprema/stojeca-miza/dogodek.webp",
        width: 1376,
        height: 768,
        alt: "Najem stoječih barskih miz z belimi in črnimi prti",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/application/oprema/stojeca-miza/dogodek.webp"],
  },
  robots: { index: true, follow: true },
};

export default function StandingTablePage() {
  return (
    <>
      <JsonLd<Product>
        item={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: standingTable.name,
          description: standingTable.description,
          url: pageUrl,
          image: standingTable.images.map((image) => `https://www.eventaj.si${image.src}`),
          sku: "EVENTAJ-STOJ-MIZA",
          category: "Oprema za dogodke",
          brand: { "@type": "Brand", name: "Eventaj.si" },
          offers: {
            "@type": "Offer",
            url: pageUrl,
            price: standingTable.price,
            priceCurrency: "EUR",
            availability: "https://schema.org/LimitedAvailability",
            seller: { "@type": "Organization", name: "Eventaj.si" },
          },
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Domov", item: "https://www.eventaj.si" },
            { "@type": "ListItem", position: 2, name: "Oprema za dogodke", item: "https://www.eventaj.si/oprema-za-dogodke" },
            { "@type": "ListItem", position: 3, name: standingTable.name, item: pageUrl },
          ],
        }}
      />
      <JsonLd<FAQPage>
        item={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: standingTableFaq.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }}
      />
      <EquipmentProductPage />
    </>
  );
}

export const dynamic = "force-static";
