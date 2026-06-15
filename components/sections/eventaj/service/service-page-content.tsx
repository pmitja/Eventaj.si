import {
  booth360Features,
  booth360Specs,
  photoFeatures,
  photoSpecs,
} from "@/content/eventaj/data";
import { serviceHeroVisuals, ServiceType } from "@/content/eventaj/service-visuals";
import { Booth360EventTypes } from "../event-types/booth360-event-types";
import { PhotoEventTypes } from "../event-types/photo-event-types";
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
  h1,
  heroTag,
  heroTitle,
  heroItalicWord,
  heroDescription,
  featureTitle,
  featureItalicWord,
}: {
  type: ServiceType;
  seoTitle: string;
  /** Clean, keyword-led H1 for this page (defaults to seoTitle). */
  h1?: string;
  heroTag?: string;
  heroTitle?: string;
  heroItalicWord?: string;
  heroDescription?: string;
  featureTitle?: string;
  featureItalicWord?: string;
}) {
  const is360 = type === "360";
  const accent = "var(--eventaj-accent)";
  return (
    <main>
      <SubpageHero
        tag={heroTag ?? (is360 ? "Premium · 360° Booth" : "Klasika · Photo Booth")}
        title={heroTitle ?? (is360 ? "Trenutek" : "Trenutek, ujet")}
        seoTitle={seoTitle}
        h1={h1}
        italicWord={heroItalicWord ?? (is360 ? "v gibanju" : "v papir")}
        description={
          heroDescription ??
          (is360
            ? "Dinamični 360° videoposnetki, ki ujamejo energijo dogodka iz vseh kotov. Za poroke, poslovne dogodke in praznovanja, kjer trenutki postanejo del zgodbe."
            : "Profesionalni Photo Booth s takojšnjim tiskom fotografij. Elegantna popestritev porok, poslovnih dogodkov in zasebnih praznovanj.")
        }
        price={is360 ? 299 : 279}
        accent={accent}
        visuals={serviceHeroVisuals[type]}
      />
      <FeatureGrid
        title={featureTitle ?? (is360 ? "Premium izkušnja," : "Vse vključeno,")}
        italicWord={featureItalicWord ?? (is360 ? "brez kompromisov" : "brez skritih stroškov")}
        features={is360 ? booth360Features : photoFeatures}
        accent={accent}
      />
      <ServiceVisualStory type={type} accent={accent} />
      {is360 ? <Booth360EventTypes /> : <PhotoEventTypes />}
      <SpecsSection specs={is360 ? booth360Specs : photoSpecs} accent={accent} />
      <PackageTiers service={type} />
      <TestimonialsSection />
      <FAQSection />
    </main>
  );
}
