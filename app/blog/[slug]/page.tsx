import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await getBlogPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: "article",
      publishedTime: post.metadata.date,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const slug = (await params).slug;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const { Content } = post;

  return <Content />;
}
