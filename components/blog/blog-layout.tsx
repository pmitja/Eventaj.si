import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export interface BlogLayoutProps {
  children: React.ReactNode;
  metadata: {
    title: string;
    description: string;
    date: string;
    category: string;
  };
}

export function BlogLayout({ children, metadata }: BlogLayoutProps) {
  return (
    <main className="pt-[48px]">
      {/* Hero Section */}
      <section className="relative">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Metadata */}
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <span>{metadata.date}</span>
              <span>•</span>
              <Link
                href={`/blog?category=${metadata.category.toLowerCase()}`}
                className="text-brand hover:text-brand/80"
              >
                {metadata.category}
              </Link>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {metadata.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {metadata.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <article className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-img:rounded-xl prose-img:shadow-lg max-w-4xl mx-auto">
            {children}
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/application/blog-hero.webp"
            alt="Newsletter Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Želite izvedeti več?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Kontaktirajte nas za več informacij o naših photo booth storitvah.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="glow" asChild>
              <Link href="/kontakt">Kontaktirajte nas</Link>
            </Button>
            <Button
              variant="outline"
              className="text-white border-white"
              asChild
            >
              <Link href="/cenik">Oglejte si cenik</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
