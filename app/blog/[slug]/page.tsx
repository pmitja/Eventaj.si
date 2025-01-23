import { BlogLayout } from "@/components/blog/blog-layout";
import { NotionContent } from "@/components/blog/notion-content";
import { fetchBySlug, fetchPageContent, fetchPages } from "@/lib/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
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
  const post = await fetchBySlug(params.slug);

  if (!post) {
    return {};
  }

  const properties = post.properties;
  const nameProperty = properties.Name as {
    type: "title";
    title: Array<{ plain_text: string }>;
  };
  const title = nameProperty.title[0]?.plain_text || "";

  return {
    title: `${title} | Eventaj.si Blog`,
    openGraph: {
      title: `${title} | Eventaj.si Blog`,
      type: "article",
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const post = await fetchBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const recordMap = await fetchPageContent(post.id);

  // Extract post properties
  const properties = post.properties;
  const nameProperty = properties.Name as {
    type: "title";
    title: Array<{ plain_text: string }>;
  };
  const title = nameProperty.title[0]?.plain_text || "";
  const tagsProperty = properties.Tags as {
    type: "multi_select";
    multi_select: Array<{ name: string }>;
  };
  const tags = tagsProperty.multi_select?.map((tag) => tag.name) || [];
  const date = new Date(post.created_time).toLocaleDateString("sl-SI", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <BlogLayout
      metadata={{
        title,
        description: "", // We'll need to add this to Notion if needed
        date,
        category: tags[0] || "Splošno", // Using first tag as category
      }}
    >
      <article className="prose prose-slate lg:prose-lg dark:prose-invert mx-auto max-w-4xl px-6 py-10">
        <NotionContent recordMap={recordMap} />
      </article>
    </BlogLayout>
  );
}
