import { BlogImage } from "@/components/blog/blog-image";
import type { BlogLayoutProps } from "@/components/blog/blog-layout";
import { BlogLayout } from "@/components/blog/blog-layout";
import fs from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import React from "react";

const components = {
  BlogImage,
};

interface BlogPostMetadata {
  title: string;
  description: string;
  date: string;
  category: string;
}

interface BlogPost {
  metadata: BlogPostMetadata;
  slug: string;
  Content: React.ComponentType;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const contentDir = path.join(process.cwd(), "content/blog-posts");
  const files = await fs.readdir(contentDir);
  const posts = await Promise.all(
    files
      .filter((file) => path.extname(file) === ".mdx")
      .map(async (file) => {
        const slug = path.basename(file, ".mdx");
        const post = await getBlogPost(slug);
        return post;
      })
  );

  // Sort posts by date (newest first)
  return posts
    .sort((a, b) => {
      if (!a || !b) return 0;
      return (
        new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
      );
    })
    .filter((post): post is BlogPost => post !== null);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const contentDir = path.join(process.cwd(), "content/blog-posts");
  const filePath = path.join(contentDir, `${slug}.mdx`);

  try {
    const source = await fs.readFile(filePath, "utf-8");

    const { content, frontmatter } = await compileMDX<BlogPostMetadata>({
      source,
      components,
      options: {
        parseFrontmatter: true,
      },
    });

    const BlogPostContent: React.FC = () => {
      const props: BlogLayoutProps = {
        metadata: frontmatter,
        children: content,
      };
      return React.createElement(BlogLayout, props);
    };

    return {
      metadata: frontmatter,
      slug,
      Content: BlogPostContent,
    };
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
} 