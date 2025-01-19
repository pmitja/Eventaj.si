import { cn } from "@/lib/utils";
import Image from "next/image";

interface TestimonialAuthor {
  name: string;
  title: string;
  image?: string;
}

interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string;
}

export function TestimonialCard({ author, text }: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        {author.image && (
          <Image
            className="rounded-full"
            width="32"
            height="32"
            alt=""
            src={author.image}
          />
        )}
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white text-start">
            {author.name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40 text-start">
            {author.title}
          </p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-start">{text}</blockquote>
    </figure>
  );
}

export type { TestimonialAuthor };
