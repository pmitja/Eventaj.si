"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  description: string;
  items: FAQItem[];
}

export function FAQSection({ title, description, items }: FAQSectionProps) {
  return (
    <section className="overflow-hidden bg-gray-50 dark:bg-gray-900/50">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl divide-y divide-gray-900/10 dark:divide-gray-100/10"
        >
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900 dark:text-gray-100 text-center sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400 text-center">
            {description}
          </p>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10 dark:divide-gray-100/10">
            <Accordion type="single" collapsible className="w-full">
              {items.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
