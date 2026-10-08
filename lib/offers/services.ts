import { photoBoothQrGalleryPrice, qrGalleryPrice } from "@/content/eventaj/qr-gallery-pricing";

export type OfferService = "photo" | "360";
export type PackageHours = "2" | "3" | "4";

export type ServicePackage = { name: string; shortName: string; price: number; included: string[] };

export type ServiceConfig = {
  label: string;
  subtitle: string;
  extraHourPrice: number;
  qrGalleryPrice: number;
  hasAlbum: boolean;
  staffItem: string;
  presets: { description: string; amount: number }[];
  packages: Record<PackageHours, ServicePackage>;
};

const hourWords: Record<PackageHours, string> = { "2": "dve uri", "3": "tri ure", "4": "štiri ure" };

const photoShared = [
  "neomejeno število posnetih fotografij in takojšen neomejen tisk fotografij (format 15 × 10 cm)",
  "fotografiranje z DSLR fotoaparatom za kakovostne, ostre in čiste fotografije",
];

const photoTail = [
  "takojšen prenos fotografij na telefon prek AirDropa, QR kode ali e-pošte",
  "spletno galerijo vseh fotografij po končanem dogodku",
  "možnost ustvarjanja GIF posnetkov (več fotografij združenih v posnetek)",
  "zabavne rekvizite za fotografiranje",
  "različne grafične predloge digitalnega okvirja za fotografije (besedilo, logotip, imena, datum dogodka, branding podjetja ipd.), ki se prikažejo na vseh natisnjenih in digitalnih fotografijah; fotografije so lahko tudi brez okvirja",
  "različne filtre znotraj aplikacije",
  "izbiro ozadja (belo, zlato, črno, roza zlato, srebrno, travnato ali digitalno ozadje po meri)",
  "prisotnost člana ekipe Eventaj.si, ki skrbi za pomoč gostom in potek fotografiranja",
];

const album = "spominski album (40 listov) z različnimi nalepkami in pisali";

function photoPackage(hours: PackageHours, shortName: string, price: number): ServicePackage {
  const withAlbum = hours !== "2";
  return {
    name: `Photo Booth ${shortName} paket (${hours} ${hours === "2" ? "uri" : "ure"})`,
    shortName,
    price,
    included: [
      `najem Photo Bootha za ${hourWords[hours]} (možnost podaljšanja za 50 € na dodatno uro)`,
      ...photoShared,
      ...(withAlbum ? [album] : []),
      ...photoTail,
      ...(hours === "4" ? ["postavitev in odstranitev opreme"] : []),
    ],
  };
}

const booth360Included = [
  "neomejeno število ustvarjenih videoposnetkov",
  "snemanje dinamičnih 360° videoposnetkov z možnostjo počasnega posnetka in drugih video učinkov",
  "možnost snemanja posameznikov, parov ali skupin do štirih oseb",
  "zabavne rekvizite za snemanje",
  "personaliziran digitalni okvir z možnostjo vključitve besedila, imen, datuma dogodka, logotipa ali celostne grafične podobe podjetja; videoposnetki so lahko tudi brez okvirja",
  "možnost prilagoditve glasbe, animacij, grafičnih elementov in vizualnih učinkov",
  "profesionalno osvetlitev",
  "takojšen prenos videoposnetkov na telefon prek AirDropa, QR kode ali e-pošte",
  "možnost takojšnjega deljenja videoposnetkov na družbenih omrežjih",
  "zasebno spletno galerijo vseh videoposnetkov po končanem dogodku",
  "prisotnost člana ekipe Eventaj.si, ki pomaga gostom, vodi snemanje in skrbi za nemoten potek uporabe",
];

function booth360Package(hours: PackageHours, shortName: string, price: number): ServicePackage {
  return {
    name: `360° Booth ${shortName} paket (${hours} ${hours === "2" ? "uri" : "ure"})`,
    shortName,
    price,
    included: [`najem 360° Bootha za ${hourWords[hours]} (možnost podaljšanja za 80 € na dodatno uro)`, ...booth360Included],
  };
}

export const services: Record<OfferService, ServiceConfig> = {
  photo: {
    label: "Photo Booth",
    subtitle: "Najem foto stojnice (photobooth)",
    extraHourPrice: 50,
    qrGalleryPrice: photoBoothQrGalleryPrice,
    hasAlbum: true,
    staffItem: "Vodenje fotografiranja in tehnik na mestu",
    presets: [{ description: "Tematski napisi in rekviziti", amount: 20 }],
    packages: {
      "2": photoPackage("2", "Basic", 279),
      "3": photoPackage("3", "Standard", 329),
      "4": photoPackage("4", "Premium", 379),
    },
  },
  "360": {
    label: "360° Booth",
    subtitle: "Najem 360° Bootha (360° video stojnica)",
    extraHourPrice: 80,
    qrGalleryPrice,
    hasAlbum: false,
    staffItem: "Vodenje snemanja in tehnik na mestu",
    presets: [{ description: "Personalizirane animacije za 360° Booth", amount: 59 }],
    packages: {
      "2": booth360Package("2", "Mini", 299),
      "3": booth360Package("3", "Osnovni", 349),
      "4": booth360Package("4", "Maxi", 399),
    },
  },
};

export function serviceForInquiryType(type: string): OfferService | null {
  if (type === "basic") return "photo";
  if (type === "360") return "360";
  return null;
}
