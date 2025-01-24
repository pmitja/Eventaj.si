import { FAQSectionClient } from "./faq-section-client";

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
    <FAQSectionClient title={title} description={description} items={items} />
  );
}
