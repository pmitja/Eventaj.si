import { EquipmentCategoryPage } from "@/components/sections/eventaj/equipment/equipment-category-page";
import { equipmentProducts } from "@/content/eventaj/equipment";
import type { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import type { BreadcrumbList, CollectionPage, ItemList } from "schema-dts";

const pageTitle = "Najem opreme za dogodke | Eventaj.si";
const pageDescription =
  "Najem opreme za poroke, poslovne dogodke in praznovanja. Oglejte si razpoložljive izdelke, jasne cene in preverite prost termin.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "https://www.eventaj.si/oprema-za-dogodke" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "https://www.eventaj.si/oprema-za-dogodke",
    siteName: "Eventaj.si",
    locale: "sl_SI",
    type: "website",
    images: [
      {
        url: "/application/oprema/stojeca-miza/dogodek.webp",
        width: 1376,
        height: 768,
        alt: "Najem opreme za dogodke Eventaj.si",
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

export default function EquipmentPage() {
  return (
    <>
      <JsonLd<CollectionPage>
        item={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Najem opreme za dogodke",
          url: "https://www.eventaj.si/oprema-za-dogodke",
          description: pageDescription,
          inLanguage: "sl-SI",
        }}
      />
      <JsonLd<ItemList>
        item={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Oprema za dogodke",
          numberOfItems: equipmentProducts.length,
          itemListElement: equipmentProducts.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: product.name,
            url: `https://www.eventaj.si/oprema-za-dogodke/${product.slug}`,
          })),
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Domov", item: "https://www.eventaj.si" },
            { "@type": "ListItem", position: 2, name: "Oprema za dogodke", item: "https://www.eventaj.si/oprema-za-dogodke" },
          ],
        }}
      />
      <EquipmentCategoryPage />
    </>
  );
}

export const dynamic = "force-static";
