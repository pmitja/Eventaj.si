import {
  booth360Features,
  booth360Specs,
  photoFeatures,
  photoSpecs,
} from "@/content/eventaj/data";
import { serviceHeroVisuals, ServiceType } from "@/content/eventaj/service-visuals";
import { FAQSection } from "../shared/faq-section";
import { TestimonialsSection } from "../shared/testimonials-section";
import { FeatureGrid } from "./feature-grid";
import { PackageTiers } from "./package-tiers";
import { ServiceVisualStory } from "./service-visual-story";
import { SpecsSection } from "./specs-section";
import { SubpageHero } from "./subpage-hero";

export function ServicePageContent({
  type,
  seoTitle,
}: {
  type: ServiceType;
  seoTitle: string;
}) {
  const is360 = type === "360";
  const accent = "var(--eventaj-accent)";
  return (
    <main>
      <SubpageHero
        tag={is360 ? "Premium · 360° Booth" : "Klasika · Photo Booth"}
        title={is360 ? "Trenutek" : "Trenutek, ujet"}
        seoTitle={seoTitle}
        italicWord={is360 ? "v gibanju" : "v papir"}
        description={
          is360
            ? "Dinamični 360° videoposnetki, ki ujamejo energijo dogodka iz vseh kotov. Za poroke, poslovne dogodke in praznovanja, kjer trenutki postanejo del zgodbe."
            : "Profesionalni Photo Booth s takojšnjim tiskom fotografij. Elegantna popestritev porok, poslovnih dogodkov in zasebnih praznovanj."
        }
        price={is360 ? 299 : 279}
        accent={accent}
        visuals={serviceHeroVisuals[type]}
      />
      <FeatureGrid
        title={is360 ? "Premium izkušnja," : "Vse vključeno,"}
        italicWord={is360 ? "brez kompromisov" : "brez skritih stroškov"}
        features={is360 ? booth360Features : photoFeatures}
        accent={accent}
      />
      <ServiceVisualStory type={type} accent={accent} />
      <SpecsSection specs={is360 ? booth360Specs : photoSpecs} accent={accent} />
      <PackageTiers service={type} />
      <TestimonialsSection />
      <FAQSection />
    </main>
  );
}
