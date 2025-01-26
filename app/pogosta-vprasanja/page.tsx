import { CTAContactSection } from "@/components/sections/cta-contact-section";
import { FAQSection } from "@/components/sections/faq-section";
import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import type { FAQPage } from "schema-dts";

export const metadata: Metadata = {
  title: "Pogosta vprašanja | Photo Booth & 360° Photo Booth | Eventaj.si",
  description:
    "Odgovori na pogosta vprašanja o najemu photo bootha in 360° photo bootha. Vse informacije o cenah, postavitvi, delovanju in rezervaciji.",
  keywords: [
    "photo booth vprašanja",
    "360 photo booth informacije",
    "najem photo booth cena",
    "photo booth za poroko",
    "360 photo booth delovanje",
    "photo booth rezervacija",
    "photo booth najem Slovenija",
    "360 photo booth navodila",
    "photo booth za dogodke",
    "360 video booth",
    "najem foto stojnice",
  ],
  openGraph: {
    title: "Pogosta vprašanja | Photo Booth & 360° Photo Booth | Eventaj.si",
    description:
      "Odgovori na pogosta vprašanja o najemu photo bootha in 360° photo bootha. Vse informacije o cenah, postavitvi, delovanju in rezervaciji.",
    url: "https://eventaj.si/pogosta-vprasanja",
    siteName: "Eventaj.si",
    locale: "sl_SI",
    type: "website",
  },
  alternates: {
    canonical: "/pogosta-vprasanja",
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
    question: "Ali lahko prilagodimo izgled fotografij?",
    answer:
      "Da, omogočamo prilagoditev fotografskih predlog, vključno z logotipom, barvami, imeni, datumi ali tematskimi grafikami.",
  },
  {
    question: "Koliko prostora potrebujemo za Photo Booth?",
    answer:
      "Photo Booth potrebuje približno 2x2 metra prostora in dostop do električne vtičnice.",
  },
  {
    question: "Kako dolgo traja postavitev Photo Booth-a?",
    answer: "Postavitev in priprava običajno trajata med 30 in 60 minut.",
  },
  {
    question: "Ali lahko fotografije tiskate takoj?",
    answer:
      "Da, vse fotografije se natisnejo takoj po zajemu, običajno v manj kot 10 sekundah.",
  },
  {
    question: "Ali je prisoten asistent med dogodkom?",
    answer:
      "Da, asistent je ves čas dogodka prisoten, da zagotovi nemoteno delovanje in pomaga gostom.",
  },
  {
    question: "Kakšne rekvizite priskrbite?",
    answer:
      "Priskrbimo različne zabavne rekvizite, kot so klobuki, očala, maske in napisi, ki ustrezajo tematiki dogodka.",
  },
  {
    question: "Ali dobimo tudi digitalne kopije fotografij?",
    answer:
      "Da, po dogodku prejmete vse digitalne fotografije v visoki ločljivosti preko povezave.",
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
  {
    question: "Kako se rezerviram?",
    answer:
      "Rezervacija se izvede preko telefona na +386 31 285 143 / +386 41 688 143. V kolikor želite rezervirati photo booth, vas prosimo kontaktirajte.",
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
    question: "Kako deluje 360 Photo Booth?",
    answer:
      "360 Photo Booth deluje tako, da gosta postavimo na platformo, kamera pa kroži okoli in posname 360-stopinjski video. Videoposnetki so nato na voljo za takojšnje deljenje ali prilagoditev.",
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
    question: "Kako se dostopajo gostje do svojih videoposnetkov?",
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

export default function FAQPage() {
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
          title="Pogosta vprašanja"
          description="Odgovori na najpogostejša vprašanja o najemu photo bootha in 360° photo bootha. Če ne najdete odgovora na vaše vprašanje, nas kontaktirajte."
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
