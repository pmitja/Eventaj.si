import type { AggregateRating, FAQPage, WithContext } from "schema-dts";
import { faqItems } from "./data";

/**
 * Real public review numbers — keep these honest. Schema that claims more
 * reviews (or a higher rating) than Google can verify risks a manual action.
 *
 * Currently 1 genuine review. Update BOTH values as reviews come in:
 *   - REVIEW_COUNT → your actual number of public reviews
 *   - REVIEW_RATING → your true average (with 1 review this must equal that
 *     review's own star value, not the aspirational 4.9 shown in the UI copy)
 */
export const REVIEW_COUNT = 1;
export const REVIEW_RATING = "5";

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
