import BasicBoothHero from "@/components/basic-booth-hero";
import { CTASection } from "@/components/sections/cta-section";
import Features from "@/components/sections/features";
import { basicBoothFeatures } from "@/components/sections/features-content";
import HowItWorks from "@/components/sections/how-it-works";
import {
  PricingPlans,
  type PricingPlan,
} from "@/components/sections/pricing-plans";
import PromoImage from "@/components/sections/promo-image";
import { TestimonialsSection } from "@/components/sections/testimonials";
import WhenToChoose from "@/components/sections/when-to-choose";
import { photoBoothWhenToChoose } from "@/content/when-to-choose";

const testimonials = [
  {
    author: {
      name: "Maja Novak",
      title: "Poročna fotografinja",
      image: "/application/sksg.webp",
    },
    text: "Photo booth je bil odlična izbira za našo poroko. Gostje so bili navdušeni!",
  },
  {
    author: {
      name: "Tomaž Kranjc",
      title: "Dogodek podjetja",
      image: "/application/autodelta.webp",
    },
    text: "Izjemna storitev in kakovostne fotografije! Odlično ste popestrili naš korporativni dogodek.",
  },
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
  {
    author: {
      name: "Ana Kovač",
      title: "Nevesta",
    },
    text: "Hvala, ker ste poskrbeli za tako posebno izkušnjo. Vse je bilo brezhibno!",
  },
];

const pricingPlans: PricingPlan[] = [
  {
    name: "Basic",
    price: "299",
    period: "dogodek",
    features: [
      "2 uri najema",
      "Neomejeno število fotografij",
      "Dostava in postavitev",
      "Operater za celoten čas najema",
      "Rekviziti za fotografiranje",
      "Takojšnje tiskanje fotografij",
      "Digitalne fotografije",
    ],
    description: "Popoln paket za manjše dogodke in zabave.",
    buttonText: "Rezerviraj termin",
    isPopular: false,
  },
  {
    name: "Standard",
    price: "399",
    period: "dogodek",
    features: [
      "3 ure najema",
      "Neomejeno število fotografij",
      "Dostava in postavitev",
      "Operater za celoten čas najema",
      "Rekviziti za fotografiranje",
      "Takojšnje tiskanje fotografij",
      "Digitalne fotografije",
      "Personalizacija fotografij",
    ],
    description: "Najbolj priljubljen paket za večje dogodke.",
    buttonText: "Rezerviraj termin",
    isPopular: true,
  },
  {
    name: "Premium",
    price: "499",
    period: "dogodek",
    features: [
      "4 ure najema",
      "Neomejeno število fotografij",
      "Dostava in postavitev",
      "Operater za celoten čas najema",
      "Premium rekviziti",
      "Takojšnje tiskanje fotografij",
      "Digitalne fotografije",
      "Personalizacija fotografij",
      "Online galerija",
    ],
    description: "Premium paket za posebne priložnosti.",
    buttonText: "Rezerviraj termin",
    isPopular: false,
  },
];

export default function Home() {
  return (
    <main className="pt-[48px]">
      <BasicBoothHero
        title="Photo booth"
        text="Naš Photo Booth je magnet za ljudi. Gostje se smejijo in zabavajo pred kamero. Je središčna točka zabave, ki omogoča gostom, da takoj natisnejo fotografije ali jih pošljejo na svoje mobilne naprave in delijo na družbenih omrežjih."
      />
      <WhenToChoose content={photoBoothWhenToChoose} />
      <PromoImage />
      <Features {...basicBoothFeatures} />
      <HowItWorks type="basic" />
      <PricingPlans plans={pricingPlans} />
      <CTASection
        title="Ne najdete ustreznega paketa?"
        description="Rezervirajte termin še danes."
        action={{
          text: "Rezervirajte termin",
          variant: "glow",
        }}
        withGlow={true}
      />
      <TestimonialsSection
        title="Kaj pravijo naši zadovoljni uporabniki"
        description="Preverite, kaj o nas menijo stranke, ki so že uporabljale naš 360° photo booth"
        testimonials={testimonials}
      />
    </main>
  );
}
