import { BlogLayout } from "@/components/blog/blog-layout";
import { NotionContent } from "@/components/blog/notion-content";
import { fetchBySlug, fetchPageContent, fetchPages } from "@/lib/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPosting, WithContext } from "schema-dts";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const posts = await fetchPages();
  return posts.map((post: PageObjectResponse) => {
    const properties = post.properties;
    const slugProperty = properties.Slug as {
      type: "rich_text";
      rich_text: Array<{ plain_text: string }>;
    };
    const slug = slugProperty.rich_text[0]?.plain_text || "";
    return { slug };
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Await the params object to get the slug
  const { slug } = await params;
  const post = await fetchBySlug(slug);

  if (!post) {
    return {};
  }

  const {
    title,
    seoTitle,
    description,
    socialDescription,
    canonicalUrl,
    featuredImage,
    publishedDate,
    tags,
  } = post;

  // Default metadata values
  const defaultDescription =
    "Odkrijte nasvete in trende za organizacijo dogodkov na Eventaj.si blogu.";
  const defaultImage = "/application/blog-hero.webp";

  // Construct the canonical URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://eventaj.si";
  const postUrl = `${baseUrl}/blog/${slug}`;

  return {
    title: seoTitle || title,
    description: socialDescription || description || defaultDescription,
    openGraph: {
      title: seoTitle || title,
      description: socialDescription || description || defaultDescription,
      url: postUrl,
      siteName: "Eventaj.si Blog",
      images: [
        {
          url: featuredImage || defaultImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "sl_SI",
      type: "article",
      publishedTime: publishedDate,
      modifiedTime: publishedDate,
      tags,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle || title,
      description: socialDescription || description || defaultDescription,
      images: [featuredImage || defaultImage],
    },
    alternates: {
      canonical: canonicalUrl || postUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
    },
    other: {
      "og:locale": "sl_SI",
    },
  };
}

export default async function BlogPost({ params }: Props) {
  // Await the params object to get the slug
  const { slug } = await params;
  const post = await fetchBySlug(slug);

  if (!post) {
    notFound();
  }

  const recordMap = await fetchPageContent(post.id);

  // Construct the canonical URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://eventaj.si";
  const postUrl = `${baseUrl}/blog/${slug}`;

  // Create the JSON-LD structured data
  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seoTitle || post.title,
    description: post.socialDescription || post.description,
    image: post.featuredImage || `${baseUrl}/application/blog-hero.webp`,
    datePublished: post.publishedDate,
    dateModified: post.publishedDate,
    author: {
      "@type": "Organization",
      name: "Eventaj.si",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Eventaj.si",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/application/mobile-logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    keywords: post.tags.join(", "),
    inLanguage: "sl-SI",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogLayout
        metadata={{
          title: post.title,
          description: post.description,
          date: new Date(post.publishedDate).toLocaleDateString("sl-SI", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          category: post.tags[0] || "Splošno",
          featuredImage: post.featuredImage,
        }}
      >
        <NotionContent recordMap={recordMap} />
      </BlogLayout>
    </>
  );
}
