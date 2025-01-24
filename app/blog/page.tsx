import { BlogSearch } from "@/components/sections/blog-search";
import { fetchPages } from "@/lib/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import { Blog, WebSite } from "schema-dts";

export const metadata: Metadata = {
  title: "Blog | Nasveti za Dogodke in Zabave | Eventaj.si",
  description:
    "Odkrijte nasvete za organizacijo dogodkov, ideje za poroke in zabave, ter trende v svetu photo booth fotografiranja. Strokovni nasveti in praktične rešitve.",
  keywords: [
    "blog o dogodkih",
    "nasveti za poroko",
    "organizacija zabave",
    "photo booth ideje",
    "trendi v fotografiji",
    "nasveti za dogodke",
    "ideje za zabavo",
    "photo booth nasveti",
    "organizacija dogodkov",
  ],
  openGraph: {
    title: "Blog | Nasveti za Dogodke in Zabave | Eventaj.si",
    description:
      "Odkrijte nasvete za organizacijo dogodkov, ideje za poroke in zabave, ter trende v svetu photo booth fotografiranja. Strokovni nasveti in praktične rešitve.",
    url: "https://eventaj.si/blog",
    siteName: "Eventaj.si",
    images: [
      {
        url: "/og/blog.jpg",
        width: 1200,
        height: 630,
        alt: "Eventaj.si Blog - Nasveti za Dogodke",
      },
    ],
    locale: "sl_SI",
    type: "website",
  },
};

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

type Props = {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const allPosts = await fetchPages();
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const postsPerPage = 6;
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

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
    <>
      <JsonLd<Blog>
        item={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Eventaj.si Blog",
          description:
            "Blog o organizaciji dogodkov, photo booth fotografiranju in zabavah",
          publisher: {
            "@type": "Organization",
            name: "Eventaj.si",
            logo: {
              "@type": "ImageObject",
              url: "https://eventaj.si/logo.png",
            },
          },
          url: "https://eventaj.si/blog",
        }}
      />
      <JsonLd<WebSite>
        item={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Eventaj.si Blog",
          url: "https://eventaj.si/blog",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://eventaj.si/blog?search={search_term_string}",
          },
        }}
      />

      <main className="pt-[48px]">
        <BlogSearch
          featuredArticles={featuredArticles}
          recentArticles={recentArticles}
          pagination={{
            currentPage,
            totalPages,
            postsPerPage,
            totalPosts,
          }}
        />
      </main>
    </>
  );
}
