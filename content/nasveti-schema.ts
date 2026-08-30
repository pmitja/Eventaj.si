import type { Article, BreadcrumbList, WithContext } from "schema-dts";
import { guideBaseUrl } from "./nasveti";

const publisher = {
  "@type": "Organization",
  name: "Eventaj.si",
  url: guideBaseUrl,
  logo: {
    "@type": "ImageObject",
    url: `${guideBaseUrl}/application/logo.svg`,
  },
} as const;

export function guideArticleSchema({
  slug,
  headline,
  description,
  image,
  published,
  modified,
  keywords,
}: {
  slug: string;
  headline: string;
  description: string;
  image: string;
  published: string;
  modified: string;
  keywords: readonly string[];
}): WithContext<Article> {
  const url = `${guideBaseUrl}/nasveti/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    inLanguage: "sl-SI",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: [`${guideBaseUrl}${image}`],
    datePublished: published,
    dateModified: modified,
    keywords: [...keywords],
    author: {
      "@type": "Organization",
      name: "Eventaj.si",
      url: guideBaseUrl,
    },
    publisher,
  };
}

export function guideBreadcrumbSchema({
  slug,
  name,
}: {
  slug: string;
  name: string;
}): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Domov", item: guideBaseUrl },
      { "@type": "ListItem", position: 2, name: "Nasveti", item: `${guideBaseUrl}/nasveti` },
      {
        "@type": "ListItem",
        position: 3,
        name,
        item: `${guideBaseUrl}/nasveti/${slug}`,
      },
    ],
  };
}
