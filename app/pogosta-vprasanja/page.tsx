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
    question: "Ali prejmemo fotografije tudi v digitalni obliki?",
    answer:
      "Da, vse fotografije si lahko prenesete preko QR kode, ki vam je na voljo skozi celoten dogodek.",
  },
  {
    question: "Kako hitro so fotografije natisnjene?",
    answer:
      "Izberete fotografijo ter število kopij, ki jih želite natisniti in jih prejmete takoj.",
  },
  {
    question: "Kakšen prostor potrebujemo za najem photo booth-a?",
    answer: "Prostor za photo booth naj bo velik vsaj 2x2 m.",
  },
  {
    question: "Kako rezerviram najem photo bootha?",
    answer:
      "Sledite korakom rezervacije na spletni strani ali nam pišete na email eventaj.si@gmail.com ali nas pokličete na tel. št. 031 285 143 ali 031 544 751.",
  },
  {
    question: "Kaj je potrebno za najem photo booth-a?",
    answer:
      "Najprej je potrebna urejena rezervacija termina. Na samem dogodku pa je potrebno zagotoviti ravno površino velikosti 2x2 m ter dostop do električne napeljave.",
  },
  {
    question: "Kaj vključuje najem photo bootha?",
    answer:
      "Uporaba photo booth-a, prisotnost tehnika, uporaba različnih zabavnih rekvizitov, tisk fotografij in delitev fotografij.",
  },
  {
    question: "Ali lahko prilagodim izgled fotografij?",
    answer:
      "Seveda. Ob potrditvi rezervacije termina se lahko dogovorimo za personaliziran digitalni okvir fotografije. V predogled vam pošljemo 4 predloge, vi pa nato izberete vam najljubšega.",
  },
  {
    question:
      "Kako dolgo traja postavitev photo booth-a ali 360° photo booth-a?",
    answer:
      "Sama postavitev photo booth-a traja približno od 30 min do 1 ure, odvisno od same lokacije.",
  },
  {
    question: "Kako je s plačilom?",
    answer:
      "Plačilo je potrebno izvesti 24h pred dogodkom. Plačilo je možno izvesti preko bančnega nakazila.",
  },
  {
    question: "Kako velik prostor potrebujemo za 360° photo booth?",
    answer:
      "Za postavitev 360° photo booth-a je potrebno zagotoviti ravno površino v velikosti 3x3 m.",
  },
  {
    question: "Ali lahko prilagodite ozadje?",
    answer:
      "Ozadja si lahko izberete po želji. Če nam zaupate tematiko vašega dogodka, se bomo potrudili, da ustvarimo ozadje, ki bo najbolj ustrezalo vašim željam.",
  },
  {
    question: "Kako hitro dobimo videoposnetke posnete s 360° photo booth-om?",
    answer:
      "Videoposnetki so na voljo takoj, preko QR kode si jih prenesete na svoj telefon.",
  },
  {
    question: "Kako deluje 360° photo booth?",
    answer:
      "Z izbranimi rekviziti stopite na okroglo platformo, kjer ustvarite posnetek s 360° kamero, ki vas večkrat obkroži. Ko se snemanje zaključi, si lahko posnetek ogledate na dodatnem zaslonu in ga prenesete preko QR kode.",
  },
  {
    question: "Ali prejmemo fotografije tudi v digitalni obliki?",
    answer:
      "Da, vse fotografije si lahko prenesete preko QR kode, ki vam je na voljo skozi celoten dogodek.",
  },
  {
    question: "Kako hitro so fotografije natisnjene?",
    answer:
      "Izberete fotografijo ter število kopij, ki jih želite natisniti in jih prejmete takoj.",
  },
  {
    question: "Ali je med dogodkom ves čas prisoten tehnik?",
    answer:
      "Tako je, tehnik je na voljo celoten čas najema photo booth-a ali 360° photo booth-a.",
  },
  {
    question: "Kakšne rekvizite priskrbite?",
    answer:
      "Tematska očala, tematska pokrivala, tablice z napisi, različne okrasne ustnice, brke, klobuke, simbole, naprave za milne mehurčke ter meglo, napihljiva kitara, mikrofon…",
  },
  {
    question:
      "Ali lahko uporabljamo photo booth ali 360° photo booth na prostem?",
    answer:
      "Da, vendar mora biti zaščitena pred direktnim soncem in padavinami, zagotovljena mora biti ravna površina 2x2 m oz. 3x3 m ter dostop do električne napeljave.",
  },
  {
    question: "Koliko časa lahko najamemo photo booth ali 360° photo booth?",
    answer:
      "Paketi so pripravljeni za 2-urni, 3-urni ali 4-urni najem, vi pa ga lahko po želji podaljšate z doplačilom.",
  },
  {
    question: "Kdaj je potrebno rezervirati photo booth?",
    answer:
      "Za zagotovitev razpoložljivosti priporočamo rezervacijo vsaj 30 dni pred dogodkom, posebej v poletni sezoni, praznični sezoni in ob koncih tedna.",
  },
  {
    question: "Ali lahko prilagodite videoposnetke z logotipom ali grafiko?",
    answer:
      "Seveda. Pošljete nam vaš logotip, mi pa vam ustvarimo 4 predloge personalizirane grafike. Pred dogodkom izberete tisto, ki vam je najbolj všeč.",
  },
  {
    question: "Ali je potrebna električna napeljava?",
    answer:
      "Da. Na vsakem dogodku je potrebno zagotoviti dostop do električne napeljave.",
  },
  {
    question: "Koliko oseb je lahko največ na platformi?",
    answer: "Maksimalno število oseb na platformi je 5.",
  },
  {
    question: "Kako dolgo traja snemanje in obdelava videoposnetkov?",
    answer:
      "Ko se postavite na platformo, snemanje traja približno 30 s. Obdelan videoposnetek je na voljo takoj, ko zaključite snemanje.",
  },
  {
    question:
      "Kam se shranjujejo posnete fotografije iz Photo Booth-a in videoposnetki iz 360° Photo Booth-a?",
    answer:
      "Posnete fotografije in videoposnetki se shranijo v oblak, ki bo na voljo 3 mesece. Po teh 3 mesecih jih več ne bo možno obnoviti.",
  },
  {
    question: "Kaj se zgodi v primeru, da poškodujete izposojeno opremo?",
    answer:
      "Pričakujemo odgovorno obnašanje v okolici izposojene opreme. V primeru, da pride do poškodbe opreme, pa je potrebno poravnati strošek nove opreme.",
  },
  {
    question: "Kakšni so stroški prevoza?",
    answer:
      "Prevoz do 20 kilometrov izven Lenarta je brezplačen. Vsak dodaten kilometer se obračuna 0,40 €/km.",
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

      <main className="pt-[48px]">
        <FAQSection
          title="Pogosta vprašanja"
          description="Odgovori na najpogostejša vprašanja o najemu photo bootha in 360° photo bootha. Če ne najdete odgovora na vaše vprašanje, nas kontaktirajte."
          items={faqItems}
        />

        <CTAContactSection
          title="Imaš dodatna vprašanja?"
          description="Z veseljem pomagamo in svetujemo pri izbiri naših storitev."
          action={{
            text: "Kontaktiraj nas",
            variant: "glow",
          }}
        />
      </main>
    </>
  );
}
