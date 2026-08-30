import type { AggregateRating, FAQPage, WithContext } from "schema-dts";
import { faqItems } from "./data";

/** Keep these values aligned with the public rating shown on the site. */
export const REVIEW_COUNT = 30;
export const REVIEW_RATING = "4.9";

export const eventajAggregateRating: AggregateRating = {
  "@type": "AggregateRating",
  ratingValue: REVIEW_RATING,
  reviewCount: REVIEW_COUNT,
  bestRating: "5",
  worstRating: "1",
};

/** Rolling offer validity so priceValidUntil never silently expires. */
export const priceValidUntil = `${new Date().getFullYear() + 1}-12-31`;

/** FAQPage schema built from the FAQ items rendered on the page. */
export function buildFaqPageSchema(
  items: ReadonlyArray<{ q: string; a: string }> = faqItems,
): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
