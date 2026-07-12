import { EventLanding } from "@/content/eventaj/event-pages";
import { FeatureGrid } from "../service/feature-grid";
import { FAQSection } from "../shared/faq-section";
import { LandingGallery } from "./landing-gallery";
import { LandingHero } from "./landing-hero";
import { LandingIdealFor } from "./landing-ideal-for";
import { LandingIncluded } from "./landing-included";
import { LandingRelated } from "./landing-related";
import { LandingSteps } from "./landing-steps";
import { LandingTestimonial } from "./landing-testimonial";

export function EventLandingContent({ landing }: { landing: EventLanding }) {
  return (
    <main>
      <LandingHero landing={landing} />
      <LandingIdealFor landing={landing} />
      <FeatureGrid
        eyebrow={landing.reasonsEyebrow}
        title={landing.reasonsTitle}
        italicWord={landing.reasonsItalic}
        features={landing.reasons}
        accent="var(--eventaj-accent)"
      />
      <LandingGallery landing={landing} />
      <LandingSteps landing={landing} />
      <LandingIncluded landing={landing} />
      <LandingTestimonial landing={landing} />
      <FAQSection items={landing.faq} eyebrow={landing.faqEyebrow} />
      <LandingRelated landing={landing} />
    </main>
  );
}
