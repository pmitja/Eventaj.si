import { CTAContactSection } from "@/components/sections/cta-contact-section";
import { FAQSection } from "@/components/sections/faq-section";
import Features from "@/components/sections/features";
import { threeSixtyFeatures } from "@/components/sections/features-content";
import HowItWorks from "@/components/sections/how-it-works";
import { PricingPlans } from "@/components/sections/pricing-plans";
import PromoImage from "@/components/sections/promo-image";
import { TestimonialsSection } from "@/components/sections/testimonials";
import WhenToChoose from "@/components/sections/when-to-choose";
import ThreeSixtyHero from "@/components/three-sixty-hero";
import { threeSixtyWhenToChoose } from "@/content/when-to-choose";
import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import { FAQPage, Service } from "schema-dts";

export const metadata: Metadata = {
  title: "360 Photo Booth Najem | Zabava za Vsak Dogodek | Eventaj.si",
  description:
    "Najemi 360 photo booth za nepozabno doživetje na vaši poroki, zabavi ali dogodku. Profesionalna oprema, izkušena ekipa in takojšnje deljenje posnetkov. Rezervirajte zdaj!",
  keywords: [
    "360 photo booth najem",
    "360 photo booth za poroko",
    "foto stojnica za dogodke",
    "najem 360 photo booth Ljubljana",
    "360 fotografiranje",
    "foto booth zabava",
    "photo booth za dogodke",
    "360 video booth",
    "photo booth najem cena",
  ],
  openGraph: {
    title: "360 Photo Booth Najem | Zabava za Vsak Dogodek | Eventaj.si",
    description:
      "Najemi 360 photo booth za nepozabno doživetje na vaši poroki, zabavi ali dogodku. Profesionalna oprema, izkušena ekipa in takojšnje deljenje posnetkov.",
    url: "https://eventaj.si/360-photo-booth",
    siteName: "Eventaj.si",
    images: [
      {
        url: "/og/360-photo-booth.jpg",
        width: 1200,
        height: 630,
        alt: "360 Photo Booth Najem - Eventaj.si",
      },
    ],
    locale: "sl_SI",
    type: "website",
  },
};

const faqItems = [
  {
    question: "Koliko stane najem 360 photo bootha?",
    answer:
      "Cene najema se začnejo pri 299€ za 2-urni paket. Vključujejo dostavo, postavitev, operaterja in vse potrebne rekvizite. Za natančno ponudbo nas kontaktirajte.",
  },
  {
    question: "Ali je 360 photo booth primeren za poroke?",
    answer:
      "Da, 360 photo booth je odlična izbira za poroke! Ustvarja edinstvene posnetke, ki jih lahko gostje takoj delijo. Poskrbimo za elegantno postavitev, ki se ujema z vašo dekoracijo.",
  },
  {
    question: "Kako velik prostor potrebujemo za 360 photo booth?",
    answer:
      "Priporočamo vsaj 3x3 metre prostora za optimalno izkušnjo. Poskrbimo za varno postavitev in nemoteno gibanje gostov.",
  },
  {
    question: "Ali lahko prilagodite ozadje in efekte?",
    answer:
      "Da, ponujamo popolno prilagoditev! Od izbire ozadja do posebnih efektov in personaliziranih okvirjev - vse prilagodimo vašim željam.",
  },
  {
    question: "Kako hitro dobimo posnetke?",
    answer:
      "Posnetki so na voljo takoj! Gostje jih lahko delijo preko QR kode ali Airdrop-a. Po dogodku prejmete tudi vse posnetke v visoki ločljivosti.",
  },
];

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
    price: "299",
    period: "2 uri",
    features: [
      "najem do 2 uri",
      "vključeni različni rekviziti",
      "priprava digitalnega okvirja (4 predlogi)",
      "delitev videoposnetkov preko QR kode in Airdrop-a",
      "pomoč pri uporabi",
    ],
    description: "Idealno za manjše dogodke in zabave",
    buttonText: "Rezerviraj termin",
    href: "/kontakt",
    isPopular: false,
  },
  {
    name: "Osnovni paket",
    price: "399",
    period: "3 ure",
    features: [
      "najem do 3 ure",
      "vključeni različni rekviziti",
      "priprava digitalnega okvirja (4 predlogi)",
      "delitev videoposnetkov preko QR kode in Airdrop-a",
      "pomoč pri uporabi",
    ],
    description: "Najpogostejša izbira za poroke in večje dogodke",
    buttonText: "Rezerviraj termin",
    href: "/kontakt",
    isPopular: true,
  },
  {
    name: "Maxi paket",
    price: "499",
    period: "4 ure",
    features: [
      "najem do 4 ure",
      "vključeni različni rekviziti",
      "priprava digitalnega okvirja (4 predlogi)",
      "delitev videoposnetkov preko QR kode in Airdrop-a",
      "pomoč pri uporabi",
    ],
    description: "Za tiste, ki želijo popolno izkušnjo",
    buttonText: "Rezerviraj termin",
    href: "/kontakt",
    isPopular: false,
  },
];

export default function ThreeSixtyPhotoBooth() {
  return (
    <>
      <JsonLd<Service>
        item={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "360 Photo Booth Najem",
          provider: {
            "@type": "LocalBusiness",
            name: "Eventaj.si",
            image: "https://eventaj.si/logo.png",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Lenart v Slovenskih goricah",
              addressRegion: "Slovenija",
              postalCode: "2230",
              streetAddress: "Slomškova ulica 1",
            },
            telephone: "+386 31 285 143",
          },
          areaServed: "Slovenija",
          description:
            "Profesionalni najem 360 photo booth naprave za dogodke, poroke in zabave. Vključuje operaterja, rekvizite in takojšnje deljenje posnetkov.",
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "299",
            highPrice: "499",
            priceCurrency: "EUR",
          },
        }}
      />
      <JsonLd<FAQPage>
        item={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }}
      />

      <main className="pt-[48px]">
        <ThreeSixtyHero />
        <WhenToChoose content={threeSixtyWhenToChoose} />
        <PromoImage />
        <Features {...threeSixtyFeatures} />
        <HowItWorks type="360" />
        <PricingPlans plans={pricingPlans} />
        <FAQSection
          title="Pogosta vprašanja"
          description="Odgovori na najpogostejša vprašanja o najemu 360 photo bootha"
          items={faqItems}
        />
        <CTAContactSection
          title="Ne najdete ustreznega paketa?"
          description="Kontaktirajte nas in skupaj bomo našli najboljšo rešitev za vaš dogodek."
          action={{
            text: "Pošlji povpraševanje",
            variant: "glow",
          }}
          isGlow={true}
        />
        <TestimonialsSection
          title="Kaj pravijo naši zadovoljni uporabniki"
          description="Preverite, kaj o nas menijo stranke, ki so že uporabljale naš 360° photo booth"
          testimonials={testimonials}
        />
      </main>
    </>
  );
}
