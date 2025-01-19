import BasicBoothHero from "@/components/basic-booth-hero";
import { CTASection } from "@/components/sections/cta-section";
import Features from "@/components/sections/features";
import { basicBoothFeatures } from "@/components/sections/features-content";
import HowItWorks from "@/components/sections/how-it-works";
import { PricingPlans } from "@/components/sections/pricing-plans";
import PromoImage from "@/components/sections/promo-image";
import { TestimonialsSection } from "@/components/sections/testimonials";
import WhenToChoose from "@/components/sections/when-to-choose";

const testimonials = [
  {
    author: {
      name: "Maja Novak",
      title: "Poročna fotografinja",
      image: "/application/sksg.webp",
    },
    text: "360° photo booth je bil odlična izbira za našo poroko. Gostje so bili navdušeni!",
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

const pricingPlans = [
  {
    name: "Mini paket",
    price: "249",
    period: "2 uri",
    features: [
      "najem do 2 uri",
      "do 150 natisnjenih fotografij",
      "neomejeno število posnetih fotografij",
      "vključeni različni rekviziti",
      "priprava ozadja (4 predlogi)",
      "priprava digitalnega okvirja (4 predlogi)",
      "delitev fotografij preko QR kode, Airdrop-a, SMS-a, elektronskega naslova",
      "Google drive album z vsemi fotografijami",
      "pomoč pri uporabi",
    ],
    description: "Idealno za manjše dogodke in zabave",
    buttonText: "Rezerviraj termin",
    href: "/kontakt",
    isPopular: false,
  },
  {
    name: "Osnovni paket",
    price: "299",
    period: "3 ure",
    features: [
      "najem do 3 ure",
      "do 250 natisnjenih fotografij",
      "neomejeno število posnetih fotografij",
      "vključeni različni rekviziti",
      "priprava ozadja (4 predlogi)",
      "priprava digitalnega okvirja (4 predlogi)",
      "delitev fotografij preko QR kode, Airdrop-a, SMS-a, elektronskega naslova",
      "Google drive album z vsemi fotografijami",
      "izbira različnih filtrov",
      "možnost posnetka v načinu Boomerang ali GIF",
      "album + pisalo (srebrne ali zlate barve)",
      "pomoč pri uporabi",
    ],
    description: "Najpogostejša izbira za poroke in večje dogodke",
    buttonText: "Rezerviraj termin",
    href: "/kontakt",
    isPopular: true,
  },
  {
    name: "Maxi paket",
    price: "349",
    period: "4 ure",
    features: [
      "najem do 4 ure",
      "neomejeno natisnjenih fotografij",
      "neomejeno število posnetih fotografij",
      "vključeni različni rekviziti",
      "priprava ozadja (4 predlogi)",
      "priprava digitalnega okvirja (4 predlogi)",
      "delitev fotografij preko QR kode, Airdrop-a, SMS-a, elektronskega naslova",
      "Google drive album z vsemi fotografijami",
      "izbira različnih filtrov",
      "možnost posnetka v načinu Boomerang ali GIF",
      "album + pisalo (srebrne ali zlate barve)",
      "možnost uporabe AI orodij znotraj aplikacije",
      "pomoč pri uporabi",
    ],
    description: "Za tiste, ki želijo popolno izkušnjo",
    buttonText: "Rezerviraj termin",
    href: "/kontakt",
    isPopular: false,
  },
];

export default function Home() {
  return (
    <main className="pt-[48px]">
      <BasicBoothHero
        title="Photo booth"
        text="Preizkusite 360° photo booth, ki vas ujame iz povsem drugačne perspektive – prav iz vseh kotov! Naš 360° photo booth je pravi prvak pri ustvarjanju visokokakovostnih 360° videov."
      />
      <WhenToChoose />
      <PromoImage />
      <Features {...basicBoothFeatures} />
      <HowItWorks type="basic" />
      <PricingPlans plans={pricingPlans} />
      <CTASection
        title="Ne najdete ustreznega paketa?"
        description="Kontaktirajte nas in skupaj bomo našli najboljšo rešitev za vaš dogodek."
        action={{
          text: "Kontaktirajte nas",
          href: "/kontakt",
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
