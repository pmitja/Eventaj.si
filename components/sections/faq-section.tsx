import { FAQSectionClient } from "./faq-section-client";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  seoTitle?: string;
  description: string;
  items: FAQItem[];
}

export function FAQSection({
  title,
  seoTitle,
  description,
  items,
}: FAQSectionProps) {
  return (
    <FAQSectionClient
      title={title}
      seoTitle={seoTitle}
      description={description}
      items={items}
    />
  );
}
