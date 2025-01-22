import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";

interface BlogPostParams {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostParams) {
  const post = await getBlogPost(params.slug);

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

export default async function BlogPost({ params }: BlogPostParams) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const { Content } = post;

  return <Content />;
}
