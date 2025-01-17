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
    <div className="w-[320px] shrink-0 rounded-2xl border bg-card p-6 shadow">
      <div className="flex flex-col gap-4 items-center">
        {author.image && (
          <Image
            src={author.image}
            alt={author.name}
            className="max-h-10"
            width={40}
            height={40}
          />
        )}
        <p className="text-sm text-muted-foreground">{text}</p>
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium leading-none">{author.name}</p>
          <p className="text-sm text-muted-foreground">{author.title}</p>
        </div>
      </div>
    </div>
  );
}

export type { TestimonialAuthor };
