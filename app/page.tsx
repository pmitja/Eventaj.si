import HomeHero from "@/components/home-hero";
import { CTASection } from "@/components/sections/cta-section";
import Features from "@/components/sections/features";
import { videoFeatures } from "@/components/sections/features-content";
import { PhotoBoothOptions } from "@/components/sections/PhotoBoothOptions";
import PromoImage from "@/components/sections/promo-image";
import { TestimonialsSection } from "@/components/sections/testimonials";

const testimonials = [
  {
    author: {
      name: "Petra Horvat",
      title: "Rojstnodnevna slavljenka",
    },
    text: "Vsi moji prijatelji so se noro zabavali z vašim photo boothom. Nepozabni spomini!",
  },
  {
    author: {
      name: "Matej Zupančič",
      title: "Organizator dogodkov",
    },
    text: "Profesionalen pristop in odlična izvedba! Definitivno vas bomo še kdaj najeli.",
  },
  // Add more testimonials...
];

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <HomeHero
        title="Najemi in ujemi spomine"
        text="Naj vaš dogodek traja večno s fotografijami in videoposnetki. Zajete trenutke objavi ali natisni. Rezerviraj svoj termin še danes."
      />

      {/* Photo Booth Options */}
      <PhotoBoothOptions />

      {/* Features Section */}
      <Features {...videoFeatures} />

      {/* Testimonials */}
      <TestimonialsSection
        title="Kaj pravijo naši zadovoljni uporabniki"
        description="Preverite, kaj o nas menijo stranke, ki so že uporabljale naš 360° photo booth"
        testimonials={testimonials}
      />

      {/* CTA Section */}
      <CTASection
        title="Vas zanima naš photo booth?"
        description="Kontaktirajte nas in skupaj bomo našli najboljšo rešitev za vaš dogodek."
        action={{
          text: "Kontaktirajte nas",
          href: "/kontakt",
          variant: "glow",
        }}
        withGlow={true}
      />
      <PromoImage />
    </main>
  );
}
