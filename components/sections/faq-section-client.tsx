"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionClientProps {
  title: string;
  description: string;
  items: FAQItem[];
}

export function FAQSectionClient({
  title,
  description,
  items,
}: FAQSectionClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Split items into two columns
  const midPoint = Math.ceil(filteredItems.length / 2);
  const leftColumnItems = filteredItems.slice(0, midPoint);
  const rightColumnItems = filteredItems.slice(midPoint);

  return (
    <>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative min-h-[60vh] flex items-center justify-center"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/application/blog-hero.webp"
            alt="FAQ Hero"
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/80"
          >
            {description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative">
              <Input
                type="search"
                placeholder="Išči vprašanja..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-2xl"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* FAQ Content */}
      <section className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-4 sm:py-8 lg:px-8">
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* Left Column */}
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {leftColumnItems.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-gray-200 dark:border-gray-800 rounded-lg px-6 py-0 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-900"
                  >
                    <AccordionTrigger className="text-left py-4 text-gray-900 dark:text-gray-100">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4 pt-0">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            {/* Right Column */}
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {rightColumnItems.map((faq, index) => (
                  <AccordionItem
                    key={index + midPoint}
                    value={`item-${index + midPoint}`}
                    className="border border-gray-200 dark:border-gray-800 rounded-lg px-6 py-0 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-900"
                  >
                    <AccordionTrigger className="text-left py-4 text-gray-900 dark:text-gray-100">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4 pt-0">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          {filteredItems.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
              No questions found matching your search.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
