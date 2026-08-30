import { QrGalleryBusinessPage } from "@/components/qr-gallery/qr-gallery-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Foto galerija za poslovni dogodek | QR koda za goste" },
  description:
    "Udeleženci skenirajo QR kodo in naložijo fotografije z vašega dogodka. Živa projekcija v dvorani, ZIP z originali za marketing. Od 35 €.",
  keywords: [
    "foto galerija za poslovni dogodek",
    "qr koda za dogodek podjetja",
    "deljenje fotografij konferenca",
    "fotografije s team buildinga",
  ],
  alternates: { canonical: "/qr-galerija/poslovni-dogodek" },
  openGraph: {
    title: "Foto galerija za poslovni dogodek | QR koda za goste",
    description:
      "Udeleženci naložijo fotografije brez aplikacije. Živa projekcija v dvorani in ZIP z originali po dogodku.",
    url: "https://www.eventaj.si/qr-galerija/poslovni-dogodek",
    images: ["/qr-galerija/screenshots/live-slideshow.png"],
    locale: "sl_SI",
    type: "website",
  },
};

export default function BusinessQrGalleryPage() {
  return <QrGalleryBusinessPage />;
}
