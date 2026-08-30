import { QrGalleryFeaturesPage } from "@/components/qr-gallery/qr-gallery-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Funkcije QR galerije za dogodke | Eventaj.si",
  description:
    "QR koda, nalaganje brez aplikacije, Live Slideshow, kratki videi, glasovna voščila, nadzor fotografij in ZIP izvoz za 35 €.",
  alternates: { canonical: "/qr-galerija/funkcije" },
  openGraph: {
    title: "Funkcije QR galerije | Eventaj.si",
    description: "Vse, kar potrebujete za zbiranje fotografij gostov na enem mestu.",
    url: "https://www.eventaj.si/qr-galerija/funkcije",
    images: ["/qr-galerija/screenshots/live-slideshow.png"],
    locale: "sl_SI",
    type: "website",
  },
};

export default function QrGalleryFeatures() {
  return <QrGalleryFeaturesPage />;
}
