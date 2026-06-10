import { FAQSection } from "@/components/sections/faq-section";
import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import type { BreadcrumbList, FAQPage } from "schema-dts";

const pageTitle = "360° Booth FAQ - Pogosta vprašanja | Eventaj.si";

export const metadata: Metadata = {
  title: pageTitle,
  description:
    "Odgovori na pogosta vprašanja o najemu 360° Bootha. Vse informacije o cenah, postavitvi, delovanju in rezervaciji 360° Booth stojnice za vaš dogodek.",
  keywords: [
    "360° Booth vprašanja",
    "360° Booth informacije",
    "najem 360° Booth cena",
    "360° Booth za poroko",
    "360° Booth delovanje",
    "360° Booth rezervacija",
    "360° Booth najem po Sloveniji",
    "360° Booth navodila",
    "360° Booth za dogodke",
    "360 foto stojnica",
  ],
  openGraph: {
    title: pageTitle,
    description:
      "Odgovori na pogosta vprašanja o najemu 360° Bootha. Vse informacije o cenah, postavitvi, delovanju in rezervaciji 360° Booth stojnice za vaš dogodek.",
    url: "https://www.eventaj.si/360-photo-booth/faq",
    siteName: "Eventaj.si",
    locale: "sl_SI",
    type: "website",
    images: [
      {
        url: "https://www.eventaj.si/application/hero-image-2.webp",
        width: 1200,
        height: 630,
        alt: "360° Booth FAQ Eventaj.si",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description:
      "Odgovori na pogosta vprašanja o najemu 360° Bootha. Vse informacije o cenah, postavitvi, delovanju in rezervaciji 360° Booth stojnice za vaš dogodek.",
    images: ["https://www.eventaj.si/application/hero-image-2.webp"],
  },
  alternates: {
    canonical: "https://www.eventaj.si/360-photo-booth/faq",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "https://www.eventaj.si/application/icon-32x32.png",
    apple: "https://www.eventaj.si/application/icon-256x256.png",
  },
};

const faqItems = [
  {
    question: "Kako deluje 360° Booth?",
    answer:
      "360° Booth deluje tako, da gosta postavimo na platformo, kamera pa kroži okoli in posname 360-stopinjski video. Videoposnetki so nato na voljo za takojšnje deljenje ali prilagoditev.",
  },
  {
    question: "Kako velik prostor potrebujemo za 360° Booth?",
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
      "Rezervacija se izvede preko telefona na +386 31 285 143 / +386 41 688 143. V kolikor želite rezervirati 360° Booth, vas prosimo kontaktirajte.",
  },
  {
    question: "Ali potrebujem posebno mesto za 360° Booth?",
    answer:
      "Da, priporočamo odprt prostor vsaj 3x3 metre, da zagotovimo varno uporabo in dovolj prostora za goste.",
  },
  {
    question: "Koliko časa potrebujete za postavitev?",
    answer:
      "Za postavitev 360° Booth potrebujemo približno 60 minut, odvisno od lokacije in zahtev.",
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
      "Da, za delovanje 360° Booth potrebujemo električni priključek (220V) v bližini postavitve.",
  },
  {
    question: "Ali lahko 360° Booth uporabljamo na prostem?",
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
      "Naša 360° Booth platforma podpira do 200 kg, kar omogoča uporabo za več gostov hkrati.",
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
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Domov", item: "https://www.eventaj.si" },
            { "@type": "ListItem", position: 2, name: "360° Booth", item: "https://www.eventaj.si/360-photo-booth" },
            { "@type": "ListItem", position: 3, name: "Pogosta vprašanja", item: "https://www.eventaj.si/360-photo-booth/faq" },
          ],
        }}
      />

      <main>
        <FAQSection
          title="360° Booth - Pogosta vprašanja"
          seoTitle={pageTitle}
          description="Odgovori na najpogostejša vprašanja o najemu 360° Bootha. Če ne najdete odgovora na vaše vprašanje, nas kontaktirajte."
          items={faqItems}
        />

      </main>
    </>
  );
}
export const dynamic = "force-static"
