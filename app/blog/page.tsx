import { BlogSearch } from "@/components/sections/blog-search";
import { fetchPages } from "@/lib/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Metadata } from "next";

type NotionFileObject =
  | {
      file: { url: string; expiry_time: string };
      name: string;
      type?: "file";
    }
  | {
      external: { url: string };
      name: string;
      type?: "external";
    };

interface NotionFileProperty {
  type: "files";
  files: NotionFileObject[];
}

export const metadata: Metadata = {
  title: "Blog | Eventaj.si",
  description:
    "Odkrijte nasvete in trende za organizacijo dogodkov na Eventaj.si blogu.",
  keywords:
    "blog, photo booth blog, 360 photo booth blog, photo booth nasveti, organizacija dogodkov",
  openGraph: {
    title: "Blog | Eventaj.si",
    description:
      "Odkrijte nasvete in trende za organizacijo dogodkov na Eventaj.si blogu.",
    url: "https://eventaj.si/blog",
    siteName: "Eventaj.si Blog",
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

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const allPosts = await fetchPages();
  const currentPage = Number(searchParams.page) || 1;
  const postsPerPage = 6;
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  // Calculate start and end indices for current page
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = allPosts.slice(startIndex, endIndex);

  const featuredArticles = currentPosts.slice(0, 3).map((post) => {
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
    const defaultImage = "/application/photo-booth.webp";

    // Safely handle featured image property
    let image = defaultImage;
    const featuredImage = properties["Featured Image"] as NotionFileProperty;
    if (
      featuredImage &&
      featuredImage.type === "files" &&
      featuredImage.files.length > 0
    ) {
      const file = featuredImage.files[0];
      if ("file" in file) {
        image = file.file.url;
      } else if ("external" in file) {
        image = file.external.url;
      }
    }

    // Get excerpt from description
    const descriptionProperty = properties.Description as {
      type: "rich_text";
      rich_text: Array<{ plain_text: string }>;
    };
    const excerpt = descriptionProperty.rich_text[0]?.plain_text || "";

    // Get date
    const dateProperty = properties["Publishing Date"] as {
      type: "date";
      date: { start: string };
    };
    const date = dateProperty.date?.start || "";

    return {
      title,
      excerpt,
      image,
      date: new Date(date).toLocaleDateString("sl-SI", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      slug,
    };
  });

  const recentArticles = currentPosts.slice(3).map((post) => {
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
    const defaultImage = "/application/photo-booth.webp";

    // Safely handle featured image property
    let image = defaultImage;
    const featuredImage = properties["Featured Image"] as NotionFileProperty;
    if (
      featuredImage &&
      featuredImage.type === "files" &&
      featuredImage.files.length > 0
    ) {
      const file = featuredImage.files[0];
      if ("file" in file) {
        image = file.file.url;
      } else if ("external" in file) {
        image = file.external.url;
      }
    }

    // Get excerpt from description
    const descriptionProperty = properties.Description as {
      type: "rich_text";
      rich_text: Array<{ plain_text: string }>;
    };
    const excerpt = descriptionProperty.rich_text[0]?.plain_text || "";

    // Get date
    const dateProperty = properties["Publishing Date"] as {
      type: "date";
      date: { start: string };
    };
    const date = dateProperty.date?.start || "";

    return {
      title,
      excerpt,
      image,
      date: new Date(date).toLocaleDateString("sl-SI", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      slug,
    };
  });

  return (
    <BlogSearch
      featuredArticles={featuredArticles}
      recentArticles={recentArticles}
      pagination={{
        currentPage,
        totalPages,
        postsPerPage,
        totalPosts: allPosts.length,
      }}
    />
  );
}
