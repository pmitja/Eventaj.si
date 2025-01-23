import { BlogSearch } from "@/components/sections/blog-search";
import { fetchPages } from "@/lib/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Eventaj.si",
  description:
    "Preberite naše najnovejše članke o photo booth-ih, dogodkih in zabavah. Najdite navdih in ideje za vaš naslednji dogodek.",
  keywords:
    "blog, photo booth blog, 360 photo booth blog, photo booth nasveti, organizacija dogodkov",
  openGraph: {
    title: "Blog | Eventaj.si",
    description:
      "Preberite naše najnovejše članke o photo booth-ih, dogodkih in zabavah. Najdite navdih in ideje za vaš naslednji dogodek.",
    images: [
      {
        url: "https://eventaj.si/application/blog-hero.webp",
        width: 1200,
        height: 630,
        alt: "Eventaj.si Blog",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: "https://eventaj.si/blog",
  },
};

export default async function BlogPage() {
  const allPosts = await fetchPages();

  const featuredArticles = allPosts.slice(0, 3).map((post) => {
    const properties = (post as PageObjectResponse).properties;
    const nameProperty = properties.Name as {
      type: "title";
      title: Array<{ plain_text: string }>;
    };
    const slugProperty = properties.Slug as {
      type: "rich_text";
      rich_text: Array<{ plain_text: string }>;
    };

    const title = nameProperty.title[0]?.plain_text || "";
    const slug = slugProperty.rich_text[0]?.plain_text || "";

    return {
      title,
      excerpt: "", // We'll need to add this property to Notion if needed
      image: "/application/photo-booth.webp", // Default image for now
      date: new Date(post.created_time).toLocaleDateString("sl-SI", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      slug,
    };
  });

  const recentArticles = allPosts.slice(3).map((post) => {
    const properties = (post as PageObjectResponse).properties;
    const nameProperty = properties.Name as {
      type: "title";
      title: Array<{ plain_text: string }>;
    };
    const slugProperty = properties.Slug as {
      type: "rich_text";
      rich_text: Array<{ plain_text: string }>;
    };

    const title = nameProperty.title[0]?.plain_text || "";
    const slug = slugProperty.rich_text[0]?.plain_text || "";

    return {
      title,
      excerpt: "", // We'll need to add this property to Notion if needed
      image: "/application/photo-booth.webp", // Default image for now
      date: new Date(post.created_time).toLocaleDateString("sl-SI", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      slug,
    };
  });

  return (
    <main className="pt-[48px]">
      <BlogSearch
        featuredArticles={featuredArticles}
        recentArticles={recentArticles}
      />
    </main>
  );
}
