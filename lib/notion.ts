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

export const fetchBySlug = React.cache(async (slug: string) => {
    const response = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
        filter: {
            property: "Slug",
            rich_text: {
                equals: slug,
            },
        },
    })

    return response.results[0] as PageObjectResponse | undefined
})

export const fetchPageContent = React.cache(async (pageId: string): Promise<ExtendedRecordMap> => {
    return await notionApi.getPage(pageId)
})