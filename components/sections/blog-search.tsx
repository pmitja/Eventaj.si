"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Article {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  slug: string;
}

interface BlogSearchProps {
  featuredArticles: Article[];
  recentArticles: Article[];
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const articleAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  hover: { y: -4, transition: { duration: 0.2 } },
};

function BlogCard({
  article,
  isFeatured = false,
}: {
  article: Article;
  isFeatured?: boolean;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(`/blog/${article.slug}`);
  };

  return (
    <Link
      href={`/blog/${article.slug}`}
      onClick={handleClick}
      className={cn("group h-full block", isLoading && "pointer-events-none")}
    >
      <motion.article
        whileHover="hover"
        variants={articleAnimation}
        className={cn(
          "flex flex-col h-full rounded-lg overflow-hidden shadow transition-all duration-300",
          "bg-white dark:bg-gray-800",
          isLoading && "opacity-60"
        )}
      >
        <div
          className={cn(
            "relative flex-shrink-0",
            isFeatured ? "h-48 md:h-64" : "h-48"
          )}
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
          {isLoading && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
        <div className="flex flex-col flex-grow p-6">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {article.date}
          </span>
          <h3
            className={cn(
              "font-semibold mt-2 mb-3 group-hover:text-brand",
              isFeatured ? "text-xl" : "text-lg"
            )}
          >
            {article.title}
          </h3>
          <p
            className={cn(
              "text-gray-600 dark:text-gray-300 flex-grow",
              !isFeatured && "text-sm"
            )}
          >
            {article.excerpt}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}

export function BlogSearch({
  featuredArticles,
  recentArticles,
}: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const allArticles = [...featuredArticles, ...recentArticles];

  const filteredArticles = allArticles.filter((article) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(searchLower) ||
      article.excerpt.toLowerCase().includes(searchLower)
    );
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(!!searchQuery);
  };

  return (
    <>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative min-h-[60vh] flex items-center justify-center text-white"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/application/blog-hero.webp"
            alt="Blog Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative z-10 container mx-auto px-4 py-20 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Eventaj Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          >
            Odkrijte najnovejše trende, nasvete in inspiracijo za vaše dogodke
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="search"
                placeholder="Išči članke..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="glow">
                Išči
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </motion.section>

      <AnimatePresence mode="wait">
        {isSearching ? (
          <motion.section
            key="search-results"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
            className="py-16 md:py-24"
          >
            <div className="container mx-auto px-4">
              <motion.h2
                variants={fadeIn}
                className="text-3xl md:text-4xl font-bold mb-4 text-center"
              >
                Rezultati iskanja
              </motion.h2>
              <motion.p
                variants={fadeIn}
                className="text-center text-gray-600 dark:text-gray-300 mb-12"
              >
                {filteredArticles.length === 0
                  ? "Ni najdenih člankov"
                  : `Najdenih ${filteredArticles.length} člankov`}
              </motion.p>
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredArticles.map((article) => (
                  <motion.div key={article.slug} variants={articleAnimation}>
                    <BlogCard article={article} />
                  </motion.div>
                ))}
              </motion.div>
              {filteredArticles.length > 0 && (
                <motion.div variants={fadeIn} className="mt-8 text-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearching(false);
                    }}
                  >
                    Prikaži vse članke
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.section>
        ) : (
          <motion.div
            key="main-content"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
          >
            {/* Featured Articles */}
            <motion.section
              variants={fadeIn}
              className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900"
            >
              <div className="container mx-auto px-4">
                <motion.h2
                  variants={fadeIn}
                  className="text-3xl md:text-4xl font-bold mb-12 text-center"
                >
                  Izpostavljeni članki
                </motion.h2>
                <motion.div
                  variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                  {featuredArticles.map((article) => (
                    <motion.div key={article.slug} variants={articleAnimation}>
                      <BlogCard article={article} isFeatured />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.section>

            {/* Recent Articles */}
            <motion.section variants={fadeIn} className="py-16 md:py-24">
              <div className="container mx-auto px-4">
                <motion.h2
                  variants={fadeIn}
                  className="text-3xl md:text-4xl font-bold mb-12 text-center"
                >
                  Najnovejši članki
                </motion.h2>
                <motion.div
                  variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {recentArticles.map((article) => (
                    <motion.div key={article.slug} variants={articleAnimation}>
                      <BlogCard article={article} />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Pagination */}
                <motion.div
                  variants={fadeIn}
                  className="mt-12 flex justify-center gap-2"
                >
                  <Button variant="outline" disabled>
                    Prejšnja
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-brand hover:bg-brand hover:text-gray-300 text-gray-900 dark:text-white"
                  >
                    1
                  </Button>
                  <Button
                    variant="outline"
                    className="hover:bg-brand hover:text-gray-300 text-gray-900 dark:text-white"
                  >
                    2
                  </Button>
                  <Button
                    variant="outline"
                    className="hover:bg-brand hover:text-gray-300 text-gray-900 dark:text-white"
                  >
                    3
                  </Button>
                  <Button
                    variant="outline"
                    className="hover:bg-brand hover:text-gray-300 text-gray-900 dark:text-white"
                  >
                    Naslednja
                  </Button>
                </motion.div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
