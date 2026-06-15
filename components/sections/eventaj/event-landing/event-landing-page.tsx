import { EventLanding } from "@/content/eventaj/event-pages";
import { eventajAggregateRating } from "@/content/eventaj/structured-data";
import { JsonLd } from "react-schemaorg";
import { BreadcrumbList, FAQPage, Service } from "schema-dts";
import { EventLandingContent } from "./event-landing-content";

export function EventLandingPage({ landing }: { landing: EventLanding }) {
  const url = `https://www.eventaj.si/${landing.slug}`;
  return (
    <>
      <JsonLd<Service>
        item={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: landing.eyebrow,
          url,
          provider: {
            "@type": "LocalBusiness",
            name: "Eventaj.si",
            url: "https://www.eventaj.si",
            image: "https://www.eventaj.si/application/logo.svg",
            email: "info@eventaj.si",
            telephone: "+386 31 285 143",
            address: {
              "@type": "PostalAddress",
              addressCountry: "Slovenija",
              addressLocality: "Lenart v Slovenskih goricah",
              addressRegion: "Štajerska",
              postalCode: "2230",
              streetAddress: "Slomškova ulica 1",
            },
          },
          areaServed: "Slovenija",
          aggregateRating: eventajAggregateRating,
          description: landing.metaDescription,
          offers: {
            "@type": "Offer",
            price: String(landing.price),
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
          },
          serviceType:
            landing.product === "photo"
              ? "Photo Booth Rental"
              : "360 Photo Booth Rental",
          category: ["Photo Booth", "Event Services", "Photography Services"],
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Domov",
              item: "https://www.eventaj.si",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: landing.productLabel,
              item: `https://www.eventaj.si${landing.productHref}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: landing.breadcrumbLabel,
              item: url,
            },
          ],
        }}
      />
      <JsonLd<FAQPage>
        item={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: landing.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <EventLandingContent landing={landing} />
    </>
  );
}
