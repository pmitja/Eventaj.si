"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";

// Dynamic imports for optional components
const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code)
);
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
);
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
);
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
);
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
);

export interface NotionContentProps {
  recordMap: ExtendedRecordMap;
}

export function NotionContent({ recordMap }: NotionContentProps) {
  if (!recordMap) {
    return null;
  }

  return (
    <NotionRenderer
      recordMap={recordMap}
      components={{
        nextImage: Image,
        nextLink: Link,
        Code,
        Collection,
        Equation,
        Pdf,
        Modal,
      }}
      mapPageUrl={(pageId) => `/blog/${pageId}`}
      className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-gray-600 dark:prose-p:text-white prose-li:text-gray-600 dark:prose-li:text-white prose-img:rounded-xl prose-img:shadow-lg max-w-4xl mx-auto font-baloo"
    />
  );
}
