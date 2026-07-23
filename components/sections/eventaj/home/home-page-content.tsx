import { PricingConfigurator } from "../cenik/pricing-configurator";
import { FAQSection } from "../shared/faq-section";
import { TestimonialsSection } from "../shared/testimonials-section";
import { GallerySection } from "./gallery-section";
import { GalleryToolTeaser } from "./gallery-tool-teaser";
import { HomeEventTeaser } from "./home-event-teaser";
import { HomeHero } from "./home-hero";
import { Marquee } from "./marquee";
import { ProcessSection } from "./process-section";
import { ServicesSection } from "./services-section";
import { EquipmentTeaser } from "./equipment-teaser";

export function HomePageContent() {
  return (
    <main>
      <HomeHero />
      <Marquee />
      <ServicesSection />
      <GalleryToolTeaser />
      <EquipmentTeaser />
      <HomeEventTeaser />
      <ProcessSection />
      <GallerySection />
      <TestimonialsSection />
      <PricingConfigurator compact />
      <FAQSection />
    </main>
  );
}
