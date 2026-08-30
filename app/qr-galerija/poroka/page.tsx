import { QrGalleryWeddingPage } from "@/components/qr-gallery/qr-gallery-page";
import type { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import type { FAQPage } from "schema-dts";

const faqs = [
  [
    "Kdaj naj ustvarim galerijo?",
    "Teden dni pred poroko je dovolj. Postavitev traja tri minute, več časa vzame priprava in tisk stojal.",
  ],
  [
    "Kaj če starejši gostje ne znajo skenirati?",
    "Kamera na telefonu prepozna kodo sama, dodatna aplikacija ni potrebna.",
  ],
  [
    "Kaj se zgodi, če je v dvorani slab signal?",
    "Za nalaganje je potrebna podatkovna povezava. Gost lahko fotografije naloži pozneje, ko ima boljši signal.",
  ],
  [
    "Ali lahko odstranim posamezno fotografijo?",
    "Da. Organizator lahko v administraciji posamezno fotografijo skrije ali odstrani iz galerije.",
  ],
  [
    "Kdo vidi galerijo?",
    "Galerijo odpre le tisti, ki ima povezavo ali QR kodo. Iskalniki je ne indeksirajo.",
  ],
] as const;

export const metadata: Metadata = {
  title: { absolute: "QR galerija za poroko | Zberite fotografije gostov" },
  description:
    "Ena QR koda na poročnih mizah. Gostje naložijo fotografije, videe in voščila brez aplikacije. 35 € na poroko, galerija 180 dni.",
  keywords: [
    "qr koda za poročne fotografije",
    "qr galerija za poroko",
    "fotografije gostov poroka",
    "deljenje fotografij poroka",
  ],
  alternates: { canonical: "/qr-galerija/poroka" },
  openGraph: {
    title: "QR galerija za poroko | Zberite fotografije gostov",
    description:
      "Ena QR koda na poročnih mizah. Gostje naložijo fotografije, videe in voščila brez aplikacije.",
    url: "https://www.eventaj.si/qr-galerija/poroka",
    images: ["/qr-galerija/screenshots/galerija-mobile.png"],
    locale: "sl_SI",
    type: "website",
  },
};

export default function WeddingQrGalleryPage() {
  return (
    <>
      <JsonLd<FAQPage>
        item={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(([question, answer]) => ({
            "@type": "Question" as const,
            name: question,
            acceptedAnswer: { "@type": "Answer" as const, text: answer },
          })),
        }}
      />
      <QrGalleryWeddingPage />
    </>
  );
}
