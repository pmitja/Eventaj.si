import { CTAContactSection } from "@/components/sections/cta-contact-section";
import { FAQSection } from "@/components/sections/faq-section";
import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import type { FAQPage } from "schema-dts";

export const metadata: Metadata = {
  title: "Photo Booth FAQ - Pogosta vprašanja | Eventaj.si",
  description:
    "Odgovori na pogosta vprašanja o najemu photo bootha. Vse informacije o cenah, postavitvi, delovanju in rezervaciji photo booth stojnice za vaš dogodek.",
  keywords: [
    "photo booth vprašanja",
    "photo booth informacije",
    "najem photo booth cena",
    "photo booth za poroko",
    "photo booth delovanje",
    "photo booth rezervacija",
    "photo booth najem Slovenija",
    "photo booth navodila",
    "photo booth za dogodke",
    "najem foto stojnice",
  ],
  openGraph: {
    title: "Photo Booth FAQ - Pogosta vprašanja | Eventaj.si",
    description:
      "Odgovori na pogosta vprašanja o najemu photo bootha. Vse informacije o cenah, postavitvi, delovanju in rezervaciji photo booth stojnice za vaš dogodek.",
    url: "https://eventaj.si/photo-booth/faq",
    siteName: "Eventaj.si",
    locale: "sl_SI",
    type: "website",
    images: [
      {
        url: "https://eventaj.si/application/hero-image-2.webp",
        width: 1200,
        height: 630,
        alt: "Photo Booth FAQ Eventaj.si",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Booth FAQ - Pogosta vprašanja | Eventaj.si",
    description:
      "Odgovori na pogosta vprašanja o najemu photo bootha. Vse informacije o cenah, postavitvi, delovanju in rezervaciji photo booth stojnice za vaš dogodek.",
    images: ["https://eventaj.si/application/hero-image-2.webp"],
  },
  alternates: {
    canonical: "https://eventaj.si/photo-booth/faq",
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
    question: "Ali dobimo fotografije v digitalni obliki?",
    answer:
      "Da, poleg tiskanih fotografij prejmete tudi vse fotografije v digitalni obliki v visoki ločljivosti. Fotografije so primerne za tisk in deljenje na družbenih omrežjih.",
  },
  {
    question: "Kako hitro so fotografije natisnjene?",
    answer:
      "Fotografije so natisnjene takoj! V nekaj sekundah po fotografiranju gostje prejmejo visokokakovostne tiskane fotografije, ki jih lahko odnesejo domov kot spomin.",
  },
  {
    question: "Kakšen prostor potrebujemo za photo booth?",
    answer:
      "Photo booth potrebuje približno 2x2 metra prostora. Poskrbimo za profesionalno osvetlitev in ozadje, ki se ujema z vašo dekoracijo.",
  },
  {
    question: "Kako se rezerviram?",
    answer:
      "Rezervacija se izvede preko telefona na +386 31 285 143 / +386 41 688 143. V kolikor želite rezervirati photo booth, vas prosimo kontaktirajte.",
  },
  {
    question: "Kaj je potrebno za najem photo bootha?",
    answer:
      "Potrebno je imeti dostop do elektrike. V kolikor želite rezervirati photo booth, vas prosimo kontaktirajte.",
  },
  {
    question: "Kaj vključuje najem Photo Booth-a?",
    answer:
      "Najem vključuje foto kabino, profesionalno opremo, rekvizite, personalizirane predloge za fotografije, tiskanje na licu mesta in pomoč asistenta.",
  },
  {
    question: "Ali lahko uporabljamo Photo Booth na prostem?",
    answer:
      "Da, če je zagotovljena streha ali pokrit prostor za zaščito pred vremenskimi vplivi ter dostop do elektrike.",
  },
  {
    question: "Koliko časa lahko najamemo Photo Booth?",
    answer:
      "Ponujamo različne pakete najema, od nekaj ur do celodnevnega dogodka, odvisno od vaših potreb.",
  },
  {
    question: "Kakšne vrste dogodkov so primerne za Photo Booth?",
    answer:
      "Photo Booth je idealen za poroke, rojstne dneve, korporativne dogodke, promocije, sejme in zabave.",
  },
  {
    question: "Kdaj je treba rezervirati Photo Booth?",
    answer:
      "Priporočamo, da rezervacijo opravite čim prej, saj so termini pogosto zasedeni, zlasti ob vikendih.",
  },
  {
    question: "Ali je možno prilagoditi ozadje?",
    answer:
      "Da, nudimo različna ozadja ali izdelamo unikatno ozadje, ki ustreza vaši tematiki.",
  },
  {
    question: "Kako je s plačilom?",
    answer:
      "Za rezervacijo je potrebno plačati avans, preostali znesek pa poravnate pred dogodkom.",
  },
  {
    question: "Ali ponujate tematske Photo Booth-e?",
    answer:
      "Da, pripravimo tematski Photo Booth, ki se ujema z vašim dogodkom (npr. retro, glam, boho).",
  },
  {
    question: "Kako hitro po dogodku dobimo digitalne fotografije?",
    answer:
      "Digitalne fotografije so na voljo takoj po dogodku in med dogodkom.",
  },
];

export default function PhotoBoothFAQPage() {
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
          title="Photo Booth - Pogosta vprašanja"
          description="Odgovori na najpogostejša vprašanja o najemu photo bootha. Če ne najdete odgovora na vaše vprašanje, nas kontaktirajte."
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
