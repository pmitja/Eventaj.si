import { Client } from "@notionhq/client"
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap } from 'notion-types'
import React from "react"

// Assert environment variables are defined
const NOTION_TOKEN = process.env.NOTION_TOKEN
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID

if (!NOTION_TOKEN) {
  throw new Error("Missing NOTION_TOKEN environment variable")
}

if (!NOTION_DATABASE_ID) {
  throw new Error("Missing NOTION_DATABASE_ID environment variable")
}

// Initialize official Notion client for database operations
export const notion = new Client({
  auth: NOTION_TOKEN,
})

// Initialize unofficial Notion client for rich page content
export const notionApi = new NotionAPI()

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

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  publishedDate: string;
  featuredImage?: string;
  tags: string[];
  seoTitle?: string;
  socialDescription?: string;
  canonicalUrl?: string;
}

export const fetchPages = React.cache(async () => {
  const response = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
    filter: {
      and: [
        {
          property: "Status",
          status: {
            equals: "Published"
          }
        }
      ]
    },
    sorts: [
      {
        property: "Created",
        direction: "descending"
      }
    ]
  })

  return response.results as PageObjectResponse[]
})

export const fetchBySlug = React.cache(async (slug: string): Promise<BlogPost | undefined> => {
  const response = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  })

  const page = response.results[0] as PageObjectResponse | undefined

  if (!page) return undefined

  const properties = page.properties;

  // Extract properties with type checking
  const nameProperty = properties.Name as {
    type: "title";
    title: Array<{ plain_text: string }>;
  };

  const descriptionProperty = properties.Description as {
    type: "rich_text";
    rich_text: Array<{ plain_text: string }>;
  };

  const featuredImageProperty = properties["Featured Image"] as NotionFileProperty | undefined;

  const tagsProperty = properties.Tags as {
    type: "multi_select";
    multi_select: Array<{ name: string }>;
  };

  const seoTitleProperty = properties["SEO Title"] as {
    type: "rich_text";
    rich_text: Array<{ plain_text: string }>;
  };

  const seoDescriptionProperty = properties["SEO Description"] as {
    type: "rich_text";
    rich_text: Array<{ plain_text: string }>;
  };

  const canonicalUrlProperty = properties["Canonical URL"] as {
    type: "url";
    url: string;
  };

  const publishingDateProperty = properties["Publishing Date"] as {
    type: "date";
    date: { start: string; end: null; time_zone: null };
  };

  // Get the featured image URL from either file upload or external URL
  let featuredImage: string | undefined;
  if (featuredImageProperty?.type === "files" && featuredImageProperty.files?.[0]) {
    const file = featuredImageProperty.files[0];
    if ('file' in file) {
      featuredImage = file.file.url;
    } else if ('external' in file) {
      featuredImage = file.external.url;
    }
  }

  return {
    id: page.id,
    title: nameProperty.title[0]?.plain_text || "",
    slug,
    description: descriptionProperty.rich_text[0]?.plain_text || "",
    publishedDate: publishingDateProperty.date.start || page.created_time,
    featuredImage,
    tags: tagsProperty.multi_select?.map((tag) => tag.name) || [],
    seoTitle: seoTitleProperty?.rich_text[0]?.plain_text,
    socialDescription: seoDescriptionProperty?.rich_text[0]?.plain_text,
    canonicalUrl: canonicalUrlProperty?.url,
  }
})

export const fetchPageContent = React.cache(async (pageId: string): Promise<ExtendedRecordMap> => {
  return await notionApi.getPage(pageId)
})