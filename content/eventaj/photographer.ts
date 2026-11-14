// Fotografiranje dogodkov: paketi, vsebina in fotografije za /fotografiranje-dogodkov.
// Cene so na enem mestu; stran, obrazec za povpraševanje in e-pošta jih berejo od tukaj.
// Besedila na tej strani vikajo. Title, meta opis in H1 so preverjeni z Jevom
// (scripts/jev-fotografiranje.json).

/** Ime storitve v obrazcu za povpraševanje. */
export const photographerInquiryType = "Fotografiranje";

export const photographerMeta = {
  title: "Fotografiranje dogodkov od 350 € za 2 uri | Eventaj.si",
  description:
    "Fotografiranje dogodkov od 350 €. Urejanje je vključeno, fotografije z rojstnih dni in poslovnih dogodkov prejmete še isti dan, poročne v 5–8 dneh.",
  h1: "Fotografiranje dogodkov z vključenim urejanjem fotografij",
} as const;

export const PHOTOGRAPHER_FULL_DAY = "Cel dan";

export const photographerPackages = [
  {
    name: "2 uri",
    hours: "2",
    duration: "2 uri fotografiranja",
    price: 350,
    tagline: "Za manjše dogodke, obrede in krajša praznovanja.",
  },
  {
    name: "4 ure",
    hours: "4",
    duration: "4 ure fotografiranja",
    price: 600,
    tagline: "Za rojstne dneve, obletnice in poslovne dogodke.",
    featured: true,
  },
  {
    name: PHOTOGRAPHER_FULL_DAY,
    hours: PHOTOGRAPHER_FULL_DAY,
    duration: "Celodnevno fotografiranje",
    price: 1200,
    tagline: "Za poroke, konference, festivale in turnirje.",
  },
] as const;

/** 1200 -> "1.200" (sl-SI ne loči tisočic pri štirimestnih številih). */
export const formatEuro = (value: number) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const photographerExtraHourPrice = 150;

/** Doplačilo: gostje fotografije vidijo takoj prek QR kode. */
export const photographerQrLivePrice = 50;

export const photographerBasePrice = photographerPackages[0].price;

export const photographerHourOptions: string[] = photographerPackages.map((item) => item.hours);

export function getPhotographerPrice(hours: string) {
  return photographerPackages.find((item) => item.hours === hours)?.price ?? 0;
}

/** Vključeno v vsak paket. */
export const photographerIncluded = [
  "Urejanje fotografij",
  "Rojstni dnevi, poslovni in športni dogodki: dostava še isti dan",
  "Poroke: dostava v 5–8 dneh",
] as const;

export const photographerFeatures = [
  {
    title: "Urejene fotografije",
    desc: "Fotografije pred oddajo uredimo. Urejanje je vključeno v ceno vsakega paketa.",
  },
  {
    title: "Dostava še isti dan",
    desc: "Fotografije z rojstnih dni, poslovnih in športnih dogodkov prejmete še isti dan, ko o dogodku še vsi govorijo.",
  },
  {
    title: "Poročne fotografije v 5–8 dneh",
    desc: "Urejene fotografije s poroke prejmete najpozneje v 5–8 dneh.",
  },
  {
    title: "Takoj prek QR kode",
    desc: `Za doplačilo ${photographerQrLivePrice} € gostje skenirajo QR kodo in fotografije vidijo takoj, že med dogodkom.`,
  },
  {
    title: "Fiksna cena paketa",
    desc: "Izberete 2 uri, 4 ure ali cel dan. Ceno poznate, preden pošljete povpraševanje.",
  },
  {
    title: "Skupaj s Photo Boothom",
    desc: "Fotografiranje in Photo Booth ali 360° Booth dobite v eni ponudbi, pri isti ekipi.",
  },
] as const;

export const photographerSteps = [
  {
    title: "Pošljite datum in kraj",
    desc: "Izberite paket ter sporočite datum, kraj in vrsto dogodka. Povpraševanje oddate v manj kot dveh minutah.",
  },
  {
    title: "Ponudbo prejmete v 24 urah",
    desc: "Preverimo termin in vam pošljemo ponudbo s fiksno ceno paketa.",
  },
  {
    title: "Prejmete urejene fotografije",
    desc: "Fotografije z rojstnih dni, poslovnih in športnih dogodkov prejmete še isti dan, poročne v 5–8 dneh.",
  },
] as const;

export const photographerFaq = [
  {
    q: "Koliko stane fotografiranje dogodka?",
    a: `Fotografiranje dogodka stane ${photographerPackages[0].price} € za 2 uri, ${photographerPackages[1].price} € za 4 ure in ${formatEuro(photographerPackages[2].price)} € za cel dan. Vsaka dodatna ura je ${photographerExtraHourPrice} €. Cene paketov so fiksne, urejanje fotografij je vključeno. Fotografije takoj prek QR kode so na voljo za doplačilo ${photographerQrLivePrice} €.`,
  },
  {
    q: "Koliko stane fotografiranje poroke?",
    a: `Za ves poročni dan je na voljo celodnevni paket za ${formatEuro(photographerPackages[2].price)} €. Če želite fotografirati samo obred in skupinske fotografije, izberite paket za 2 uri (${photographerPackages[0].price} €) ali 4 ure (${photographerPackages[1].price} €). Urejene poročne fotografije prejmete v 5–8 dneh.`,
  },
  {
    q: "Kdaj prejmemo fotografije?",
    a: "Fotografije z rojstnih dni, poslovnih in športnih dogodkov prejmete še isti dan. Poročne fotografije prejmete v 5–8 dneh.",
  },
  {
    q: "Ali je urejanje fotografij vključeno v ceno?",
    a: "Da. Urejanje fotografij je vključeno v ceno vsakega paketa.",
  },
  {
    q: "Ali gostje lahko vidijo fotografije že med dogodkom?",
    a: `Da, za doplačilo ${photographerQrLivePrice} €. Gostje skenirajo QR kodo in fotografije so jim na voljo takoj.`,
  },
  {
    q: "Katere dogodke fotografirate?",
    a: "Fotografiramo poroke, rojstne dneve, obletnice, poslovne dogodke, konference, športne in kulturne dogodke ter koncerte.",
  },
  {
    q: "Kaj, če dogodek traja dlje od izbranega paketa?",
    a: `Paket lahko podaljšate. Vsaka dodatna ura fotografiranja stane ${photographerExtraHourPrice} €.`,
  },
  {
    q: "Ali lahko fotografiranje naročimo skupaj s Photo Boothom?",
    a: "Da. V povpraševanju izberite fotografiranje in v opombo zapišite, da želite tudi Photo Booth ali 360° Booth. Oboje dobite v eni ponudbi.",
  },
] as const;

type GalleryPhoto = { src: string; alt: string; portrait?: boolean };

const dir = "/application/fotograf";

export const photographerGallery: ReadonlyArray<{
  id: string;
  title: string;
  note: string;
  photos: ReadonlyArray<GalleryPhoto>;
}> = [
  {
    id: "poroke",
    title: "Poroke",
    note: "Filip in Marija",
    photos: [
      { src: `${dir}/poroka/filip-marija-01.webp`, alt: "Nevesta se smehlja ženinu, v roki drži šopek" },
      { src: `${dir}/poroka/filip-marija-02.webp`, alt: "Par si pred duhovnikom izmenjuje zaobljube v cerkvi" },
      { src: `${dir}/poroka/filip-marija-03.webp`, alt: "Ženin nevesti natika poročni prstan" },
      { src: `${dir}/poroka/filip-marija-04.webp`, alt: "Mladoporočenca se z roko v roki sprehajata po parku", portrait: true },
      { src: `${dir}/poroka/filip-marija-05.webp`, alt: "Svatje objemajo mladoporočenca po obredu" },
      { src: `${dir}/poroka/filip-marija-06.webp`, alt: "Črno-bel portret nasmejanih mladoporočencev s šopkom" },
      { src: `${dir}/poroka/filip-marija-07.webp`, alt: "Čestitke nevesti po civilnem obredu" },
      { src: `${dir}/poroka/filip-marija-08.webp`, alt: "Poročni šopek z rožnatimi cvetovi od blizu" },
    ],
  },
  {
    id: "obletnice",
    title: "Obletnice in poslovni dogodki",
    note: "9. obletnica plezalnega centra Klajmber",
    photos: [
      { src: `${dir}/klajmber/klajmber-01.webp`, alt: "Obiskovalci spremljajo plezalca na balvanski steni" },
      { src: `${dir}/klajmber/klajmber-02.webp`, alt: "Balon v obliki številke 9 ob plezalni steni" },
      { src: `${dir}/klajmber/klajmber-06.webp`, alt: "Plezalec visi na previsni balvanski steni", portrait: true },
      { src: `${dir}/klajmber/klajmber-03.webp`, alt: "Plezalka skoči proti oprimku na tekmovalni smeri" },
      { src: `${dir}/klajmber/klajmber-04.webp`, alt: "Gledalke sedijo pod steno in spremljajo plezanje" },
    ],
  },
  {
    id: "sport",
    title: "Športni in društveni dogodki",
    note: "Vinotek Svečina in Kinološko društvo Zreče",
    photos: [
      { src: `${dir}/sport/vinotek-01.webp`, alt: "Tekači v kostumih buč na vinski poti" },
      { src: `${dir}/sport/vinotek-02.webp`, alt: "Skupina tekačev v kostumu pisane gosenice" },
      { src: `${dir}/sport/vinotek-05.webp`, alt: "Tekača si med tekom po hribu dasta petko" },
      { src: `${dir}/sport/vinotek-03.webp`, alt: "Tekači v pustnih kostumih mahajo fotografu" },
      { src: `${dir}/sport/vinotek-06.webp`, alt: "Črno-bela fotografija tekačev, ki mahajo med tekom skozi vas" },
      { src: `${dir}/sport/kd-zrece-01.webp`, alt: "Vodnica s psom na poligonu kinološkega društva" },
    ],
  },
];

export const photographerOccasions = [
  {
    title: "Fotografiranje porok",
    eventType: "Poroka",
    desc: "Obred, skupinske fotografije, portreti para in zabava. Za ves poročni dan izberite celodnevni paket, urejene fotografije prejmete v 5–8 dneh.",
    image: { src: `${dir}/poroka/filip-marija-06.webp`, alt: "Črno-bel portret nasmejanih mladoporočencev s šopkom" },
  },
  {
    title: "Rojstni dnevi in obletnice",
    eventType: "Rojstni dan",
    desc: "Okrogla obletnica, zabava presenečenja ali praznovanje podjetja. Urejene fotografije prejmete še isti dan.",
    image: { src: `${dir}/klajmber/klajmber-02.webp`, alt: "Balon v obliki številke 9 na praznovanju obletnice" },
  },
  {
    title: "Poslovni dogodki",
    eventType: "Poslovni dogodek",
    desc: "Konference, otvoritve in zaključki leta. Urejene fotografije za objavo imate še isti dan.",
    image: { src: `${dir}/klajmber/klajmber-01.webp`, alt: "Obiskovalci dogodka spremljajo dogajanje v plezalnem centru" },
  },
  {
    title: "Športni in društveni dogodki",
    eventType: "Športni dogodek",
    desc: "Teki, turnirji, tekmovanja in društvena srečanja, ujeti sredi dogajanja. Urejene fotografije prejmete še isti dan.",
    image: { src: `${dir}/sport/vinotek-01.webp`, alt: "Tekači v kostumih buč na vinski poti" },
  },
] as const;
