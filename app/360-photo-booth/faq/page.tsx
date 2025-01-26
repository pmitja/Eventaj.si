import { CTAContactSection } from "@/components/sections/cta-contact-section";
import { FAQSection } from "@/components/sections/faq-section";
import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import type { FAQPage } from "schema-dts";

export const metadata: Metadata = {
  title: "360 Photo Booth FAQ - Pogosta vprašanja | Eventaj.si",
  description:
    "Odgovori na pogosta vprašanja o najemu 360 photo bootha. Vse informacije o cenah, postavitvi, delovanju in rezervaciji 360 photo booth stojnice za vaš dogodek.",
  keywords: [
    "360 photo booth vprašanja",
    "360 photo booth informacije",
    "najem 360 photo booth cena",
    "360 photo booth za poroko",
    "360 photo booth delovanje",
    "360 photo booth rezervacija",
    "360 photo booth najem Slovenija",
    "360 photo booth navodila",
    "360 photo booth za dogodke",
    "360 foto stojnica",
  ],
  openGraph: {
    title: "360 Photo Booth FAQ - Pogosta vprašanja | Eventaj.si",
    description:
      "Odgovori na pogosta vprašanja o najemu 360 photo bootha. Vse informacije o cenah, postavitvi, delovanju in rezervaciji 360 photo booth stojnice za vaš dogodek.",
    url: "https://eventaj.si/360-photo-booth/faq",
    siteName: "Eventaj.si",
    locale: "sl_SI",
    type: "website",
    images: [
      {
        url: "https://eventaj.si/application/hero-image-2.webp",
        width: 1200,
        height: 630,
        alt: "360 Photo Booth FAQ Eventaj.si",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "360 Photo Booth FAQ - Pogosta vprašanja | Eventaj.si",
    description:
      "Odgovori na pogosta vprašanja o najemu 360 photo bootha. Vse informacije o cenah, postavitvi, delovanju in rezervaciji 360 photo booth stojnice za vaš dogodek.",
    images: ["https://eventaj.si/application/hero-image-2.webp"],
  },
  alternates: {
    canonical: "https://eventaj.si/360-photo-booth/faq",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "https://eventaj.si/application/icon-32x32.png",
    apple: "https://eventaj.si/application/icon-256x256.png",
  },
};

const faqItems = [
  {
    question: "Kako deluje 360 Photo Booth?",
    answer:
      "360 Photo Booth deluje tako, da gosta postavimo na platformo, kamera pa kroži okoli in posname 360-stopinjski video. Videoposnetki so nato na voljo za takojšnje deljenje ali prilagoditev.",
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
  {
    question: "Kako se rezerviram?",
    answer:
      "Rezervacija se izvede preko telefona na +386 31 285 143 / +386 41 688 143. V kolikor želite rezervirati 360 photo booth, vas prosimo kontaktirajte.",
  },
  {
    question: "Ali potrebujem posebno mesto za 360 Photo Booth?",
    answer:
      "Da, priporočamo odprt prostor vsaj 3x3 metre, da zagotovimo varno uporabo in dovolj prostora za goste.",
  },
  {
    question: "Koliko časa potrebujete za postavitev?",
    answer:
      "Za postavitev 360 Photo Booth potrebujemo približno 60 minut, odvisno od lokacije in zahtev.",
  },
  {
    question: "Ali lahko prilagodim videoposnetke z logotipom ali grafiko?",
    answer:
      "Seveda! Nudimo popolno prilagoditev videoposnetkov, vključno z logotipi, grafikami in celo glasbeno podlago.",
  },
  {
    question: "Kako dostopajo gostje do svojih videoposnetkov?",
    answer:
      "Videoposnetki so na voljo takoj prek QR kode, e-pošte ali deljenja na družabnih omrežjih.",
  },
  {
    question: "Ali je potrebna električna energija?",
    answer:
      "Da, za delovanje 360 Photo Booth potrebujemo električni priključek (220V) v bližini postavitve.",
  },
  {
    question: "Ali lahko 360 Photo Booth uporabljamo na prostem?",
    answer:
      "Da, vendar je potrebna zaščita pred vremenskimi vplivi (npr. streha ali šotor), da zagotovimo varno in nemoteno delovanje.",
  },
  {
    question: "Ali lahko vključite dodatke, kot so rekviziti?",
    answer:
      "Seveda! Nudimo različne rekvizite, ki popestrijo izkušnjo in dodajo zabavo videoposnetkom.",
  },
  {
    question: "Kakšna je največja teža, ki jo platforma podpira?",
    answer:
      "Naša 360 Photo Booth platforma podpira do 200 kg, kar omogoča uporabo za več gostov hkrati.",
  },
  {
    question: "Kako dolgo traja snemanje in obdelava videoposnetkov?",
    answer:
      "Snemanje posameznega videoposnetka traja približno 15-30 sekund, obdelava in dostava pa sta samodejni in hitri.",
  },
];

export default function ThreeSixtyBoothFAQPage() {
  return (
    <>
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

      <main>
        <FAQSection
          title="360 Photo Booth - Pogosta vprašanja"
          description="Odgovori na najpogostejša vprašanja o najemu 360 photo bootha. Če ne najdete odgovora na vaše vprašanje, nas kontaktirajte."
          items={faqItems}
        />

        <CTAContactSection
          title="Imate dodatna vprašanja?"
          description="Kontaktirajte nas in z veseljem vam bomo pomagali pri organizaciji vašega dogodka."
          action={{
            text: "Kontaktirajte nas",
            variant: "glow",
          }}
        />
      </main>
    </>
  );
}
