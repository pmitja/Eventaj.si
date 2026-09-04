import { EquipmentProductPage } from "@/components/sections/eventaj/equipment/equipment-product-page";
import { equipmentProducts, getEquipmentProduct } from "@/content/eventaj/equipment";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "react-schemaorg";
import type { BreadcrumbList, FAQPage, Service } from "schema-dts";

const baseUrl = "https://www.eventaj.si/oprema-za-dogodke";

export function generateStaticParams() {
  return equipmentProducts.filter((product) => product.slug !== "najem-stojecih-miz").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = getEquipmentProduct((await params).slug);
  if (!product) return {};
  const url = `${baseUrl}/${product.slug}`;
  const primaryImage = product.images[0];
  return {
    title: product.seoTitle,
    description: product.seoDescription,
    alternates: { canonical: url },
    openGraph: { title: product.seoTitle, description: product.seoDescription, url, siteName: "Eventaj.si", locale: "sl_SI", type: "website", images: [{ url: primaryImage.src, alt: primaryImage.alt }] },
    twitter: { card: "summary_large_image", title: product.seoTitle, description: product.seoDescription, images: [{ url: primaryImage.src, alt: primaryImage.alt }] },
    robots: { index: true, follow: true },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getEquipmentProduct((await params).slug);
  if (!product || product.slug === "najem-stojecih-miz") notFound();
  const url = `${baseUrl}/${product.slug}`;
  return <>
    <JsonLd<Service> item={{ "@context": "https://schema.org", "@type": "Service", name: product.name, description: product.description, url, image: product.images.map(({ src }) => `https://www.eventaj.si${src}`), category: "Oprema za dogodke", provider: { "@type": "Organization", name: "Eventaj.si", url: "https://www.eventaj.si" }, areaServed: { "@type": "Country", name: "Slovenija" }, offers: { "@type": "Offer", url, price: product.quantityTiers ? Math.min(...product.quantityTiers.map((tier) => tier.unitPrice)) : product.price, priceCurrency: "EUR", availability: `https://schema.org/${product.availability}`, seller: { "@type": "Organization", name: "Eventaj.si" } } }} />
    <JsonLd<BreadcrumbList> item={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Domov", item: "https://www.eventaj.si" }, { "@type": "ListItem", position: 2, name: "Oprema za dogodke", item: baseUrl }, { "@type": "ListItem", position: 3, name: product.name, item: url }] }} />
    <JsonLd<FAQPage> item={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: product.faq.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) }} />
    <EquipmentProductPage product={product} />
  </>;
}

export const dynamic = "force-static";
