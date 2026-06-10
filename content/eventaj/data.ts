export const eventajNav = [
  { label: "Photo Booth", href: "/photo-booth" },
  { label: "360° Booth", href: "/360-photo-booth" },
  { label: "Cenik", href: "/cenik" },
  { label: "Reference", href: "/#reference" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const marqueeItems = [
  "Poroke",
  "Poslovni dogodki",
  "Rojstni dnevi",
  "Maturantski plesi",
  "Zasebne zabave",
  "Praznovanja",
] as const;

export const homeStats = [
  ["50+", "izvedenih dogodkov"],
  ["4.9★", "ocena strank"],
  ["24h", "čas odziva"],
  ["Vsa", "Slovenija"],
] as const;

export const services = [
  {
    id: "photo-booth",
    tag: "Klasika",
    title: "Photo",
    italicWord: "Booth",
    description:
      "Profesionalni Photo Booth z DSLR fotoaparatom in takojšnjim tiskom fotografij. Popolna izbira za poroke, praznovanja in poslovne dogodke.",
    features: [
      "Neomejeno ustvarjenih in natisnjenih spominov",
      "Personalizirana zasnova fotografij po meri dogodka",
      "Skrbno izbrani rekviziti in dodatki",
      "Prisotnost naše ekipe skozi celoten dogodek",
      "Dostop do vseh fotografij po dogodku",
    ],
    price: 279,
    accent: "var(--eventaj-accent)",
    media: [
      {
        type: "image",
        src: "/application/hero-collage/doba-35.webp",
        alt: "Gostje s Photo Booth rekviziti pred bleščečim ozadjem",
      },
      {
        type: "image",
        src: "/application/hero-collage/gold-group.webp",
        alt: "Skupina gostov s Photo Booth rekviziti pred zlatim ozadjem",
      },
    ],
    href: "/photo-booth",
  },
  {
    id: "360-booth",
    tag: "Premium",
    title: "360°",
    italicWord: "Booth",
    description:
      "Dinamični videoposnetki, ki ujamejo vsak detajl. 360° Booth ustvari kratke filme, ki jih gostje takoj delijo na družbenih omrežjih.",
    features: [
      "Dinamični 360° videoposnetki v slow-motion tehniki",
      "Personalizirane animacije in zvočni efekti",
      "Takojšnji dostop in deljenje prek QR kode",
      "Profesionalna osvetlitev",
      "Vključena oprema in podpora naše ekipe",
      "Izvedba po vsej Sloveniji",
    ],
    price: 299,
    accent: "var(--eventaj-accent)",
    media: [
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-1.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-1.webp",
        alt: "360° Booth video z gostjo in rekviziti",
      },
      {
        type: "video",
        src: "/application/360-photo-booth-videos/video-2.mp4",
        poster: "/application/360-photo-booth-videos/posters/video-2.webp",
        alt: "360° Booth video na prazničnem dogodku",
      },
    ],
    href: "/360-photo-booth",
    reverse: true,
  },
] as const;

export const processSteps = [
  {
    n: "01",
    title: "Pošlji povpraševanje",
    desc: "Sporoči nam datum, lokacijo in tip dogodka. Povpraševanje oddaš v manj kot dveh minutah.",
  },
  {
    n: "02",
    title: "Prejmi ponudbo v 24h",
    desc: "Pripravimo ponudbo, prilagojeno tvojemu dogodku, z jasno predstavljenimi možnostmi in brez skritih stroškov.",
  },
  {
    n: "03",
    title: "Mi poskrbimo za vse",
    desc: "Pridemo, postavimo, izvedemo. Ti uživaš dogodek, gostje pa ustvarjajo nepozabne spomine.",
  },
] as const;

export const galleryItems = [
  {
    type: "video",
    src: "/application/360-photo-booth-videos/video-1.mp4",
    poster: "/application/360-photo-booth-videos/posters/video-1.webp",
    label: "360° trenutek",
    category: "Video",
    alt: "Prva sličica 360° Booth videa z gostjo in rekviziti",
  },
  {
    type: "image",
    src: "/application/hero-collage/doba-35.webp",
    label: "Photo Booth",
    category: "Dogodek",
    alt: "Gostje s Photo Booth rekviziti pred bleščečim ozadjem",
  },
  {
    type: "image",
    src: "/application/hero-collage/gold-group.webp",
    label: "Skupinska zabava",
    category: "Zasebna zabava",
    alt: "Skupina gostov s Photo Booth rekviziti pred zlatim ozadjem",
  },
  {
    type: "video",
    src: "/application/360-photo-booth-videos/video-2.mp4",
    poster: "/application/360-photo-booth-videos/posters/video-2.webp",
    label: "Slow-motion",
    category: "Video",
    alt: "Prva sličica 360° Booth videa na prazničnem dogodku",
  },
  {
    type: "image",
    src: "/application/primeri/msi-primer.webp",
    label: "Photo Booth",
    category: "Dogodek",
    alt: "Gostje na dogodku Mlada Slovenija s Photo Booth rekviziti",
  },
  {
    type: "image",
    src: "/application/primeri/forvis-mazars-primer.webp",
    label: "Korporativni utrinek",
    category: "Poslovni dogodek",
    alt: "Photo Booth fotografija s poslovnega dogodka Forvis Mazars",
  },
  {
    type: "video",
    src: "/application/360-photo-booth-videos/video-3.mp4",
    poster: "/application/360-photo-booth-videos/posters/video-3.webp",
    label: "360° zabava",
    category: "Video",
    alt: "Prva sličica 360° Booth videa z gosti na dogodku",
  },
  {
    type: "image",
    src: "/application/primeri/maja-primer.webp",
    label: "Rojstni dan",
    category: "Zasebna zabava",
    alt: "Nasmejani gostje na rojstnodnevni zabavi s Photo Booth rekviziti",
  },
  {
    type: "image",
    src: "/application/primeri/20250802_194512229.webp",
    label: "Poroka",
    category: "Poročni dan",
    alt: "Poročni gostje ustvarjajo spomin v Photo Boothu",
  },
  {
    type: "video",
    src: "/application/360-photo-booth-videos/video-6.mp4",
    poster: "/application/360-photo-booth-videos/posters/video-6.webp",
    label: "Slow-motion",
    category: "Video",
    alt: "Prva sličica dinamičnega 360° Booth videa",
  },
  {
    type: "image",
    src: "/application/primeri/20250906_203416839.webp",
    label: "Večerna zabava",
    category: "Zabava",
    alt: "Večerna Photo Booth fotografija z rekviziti",
  },
  {
    type: "image",
    src: "/application/primeri/20250621_161011627 (4).webp",
    label: "Skupinski spomin",
    category: "Rojstni dan",
    alt: "Skupina gostov med Photo Booth fotografiranjem",
  },
  {
    type: "video",
    src: "/application/360-photo-booth-videos/video-8.mp4",
    poster: "/application/360-photo-booth-videos/posters/video-8.webp",
    label: "360° trenutek",
    category: "Video",
    alt: "Prva sličica kratkega 360° Booth videa",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Najem Photo Bootha in 360° Bootha je bil vrhunec našega zaključka leta. Gostje so se zabavali ob ustvarjanju spominov, ki jih bomo lahko obujali še leta.",
    author: "Mojca Šauperl",
    role: "ŠKSG · Poslovni dogodek",
  },
  {
    quote:
      "360° Booth je dodal posebno čarobnost našemu dogodku, gostje so bili navdušeni. Priporočilo gre z veseljem naprej.",
    author: "Jure Tadina",
    role: "AutoDelta · Poslovni dogodek",
  },
  {
    quote:
      "360° Booth je bil absolutni hit na najinem 30. rojstnem dnevu. Gostje so govorili, da česa tako zabavnega še niso doživeli.",
    author: "Eva in Ana",
    role: "Rojstnodnevna zabava",
  },
  {
    quote:
      "Zelo korektna in profesionalna izkušnja, od začetne komunikacije do izvedbe. Z ekipo Eventaj poteka vse gladko in brez zapletov.",
    author: "Daniel",
    role: "Forvis Mazars · Poslovni dogodek",
  },
  {
    quote:
      "Photo Booth je bil odlična popestritev. Gostje so se res zabavali, slike pa so čudovit spomin za ta dan.",
    author: "Manuela",
    role: "Rojstnodnevna zabava",
  },
] as const;

export const trustedNames = [
  "ŠKSG",
  "AutoDelta",
  "Forvis Mazars",
  "Mlada Slovenija",
  "MIPA Solutions",
] as const;

export const faqItems = [
  {
    q: "Koliko časa pred dogodkom moram rezervirati?",
    a: "Priporočamo rezervacijo čim prej, zlasti za poletne termine, december in vikende. Največ rezervacij prejmemo 2–4 mesece pred dogodkom, vendar je včasih na voljo tudi kakšen prost termin v zadnjem trenutku.",
  },
  {
    q: "Kakšen prostor potrebujete za postavitev?",
    a: "Za postavitev Photo Bootha potrebujemo približno 2,5 × 2 m prostora, za 360° Booth pa približno 3 × 3 m. Potreben je tudi dostop do električne vtičnice v bližini. Vse podrobnosti uskladimo pred dogodkom.",
  },
  {
    q: "Ali je prevoz vključen v ceno?",
    a: "Prevoz uskladimo glede na lokacijo dogodka in ga vključimo v končno ponudbo. Vse stroške poznate vnaprej, brez skritih doplačil.",
  },
  {
    q: "Koliko časa traja postavitev?",
    a: "Za postavitev potrebujemo približno 30–45 minut. Poskrbimo, da je vse pripravljeno ob dogovorjeni uri začetka.",
  },
  {
    q: "Kaj se zgodi s fotografijami po dogodku?",
    a: "Vse fotografije prejmete v zasebni digitalni galeriji najkasneje v 48 urah po dogodku. Natisnjene fotografije so na voljo takoj, digitalne različice pa lahko gostje med dogodkom delijo tudi prek QR kode.",
  },
  {
    q: "Lahko personaliziramo zasnovo fotografij?",
    a: "Seveda. Okvir fotografij prilagodimo vašemu dogodku z imeni, datumom, logotipom ali izbranim motivom. Predlog zasnove pripravimo in uskladimo pred dogodkom.",
  },
] as const;

export const photoFeatures = [
  {
    title: "Neomejeno fotografij",
    desc: "Gostje lahko skozi celoten dogodek ustvarijo in natisnejo neomejeno število fotografij.",
  },
  {
    title: "Fotografije v nekaj sekundah",
    desc: "Vsaka fotografija je natisnjena takoj. Spomin, ki ga gost odnese domov še isti večer.",
  },
  {
    title: "Personaliziran dizajn",
    desc: "Okvir fotografij prilagodimo vašemu dogodku (z imeni, datumom, logotipom ali vizualno podobo).",
  },
  {
    title: "Izbrani rekviziti",
    desc: "Skrbno izbrani rekviziti, ki dopolnijo vzdušje in poskrbijo za sproščene fotografije.",
  },
  {
    title: "Popolna podpora na dogodku",
    desc: "Za postavitev, pomoč gostom in nemoten potek poskrbi član naše ekipe.",
  },
  {
    title: "Spletna galerija",
    desc: "Vse fotografije prejmete v 48 urah v zasebni spletni galeriji za ogled, deljenje in prenos.",
  },
] as const;

export const photoSpecs = [
  { label: "Trajanje", value: "Paketi za 2, 3 ali 4 ure z možnostjo podaljšanja dogodka.", icon: "clock" },
  { label: "Prostor", value: "Za postavitev potrebujemo približno 2,5 × 2 m prostora in dostop do električne vtičnice.", icon: "space" },
  { label: "Postavitev", value: "Photo Booth pripravimo in postavimo 30–45 minut pred začetkom dogodka.", icon: "setup" },
  { label: "Tisk fotografij", value: "Neomejen tisk fotografij v formatu 10 × 15 cm ali foto trakovih 5 × 15 cm.", icon: "print" },
  { label: "Digitalna galerija", value: "Po dogodku prejmete vse fotografije v polni ločljivosti v zasebni galeriji.", icon: "gallery" },
  { label: "Prevoz", value: "Prevoz uskladimo glede na lokacijo dogodka in ga vključimo v končno ponudbo.", icon: "truck" },
  { label: "Personalizacija", value: "Prilagodimo okvir fotografij, začetni zaslon in vizualne elemente dogodka.", icon: "brush" },
  { label: "Cena", value: "Paketi od 279 € dalje. Brez skritih stroškov.", icon: "tag" },
] as const;

export const booth360Features = [
  {
    title: "Slow-motion 360° video",
    desc: "Kamera ujame trenutek iz vseh kotov in ga pretvori v dinamičen slow-motion videoposnetek.",
  },
  {
    title: "Trenutno deljenje",
    desc: "Gostje prejmejo videoposnetek v nekaj sekundah in ga lahko takoj delijo naprej.",
  },
  {
    title: "Personaliziran zvok",
    desc: "Posnetkom dodamo glasbo, zvočne učinke ali prepoznavne elemente vaše blagovne znamke.",
  },
  {
    title: "Profesionalna osvetlitev",
    desc: "LED ring s prilagodljivo barvno temperaturo. Vsak posnetek izgleda kot studijski.",
  },
  {
    title: "Premium platforma",
    desc: "Stabilna platforma omogoča sproščeno izkušnjo za posameznike, pare ali skupine do 4 osebe.",
  },
  {
    title: "Animacije in filtri",
    desc: "Animacije, grafični elementi in vizualni učinki po meri vašega dogodka.",
  },
] as const;

export const booth360Specs = [
  { label: "Trajanje", value: "Paketi za 2, 3 ali 4 ure z možnostjo podaljšanja dogodka.", icon: "clock" },
  { label: "Prostor", value: "Za postavitev potrebujemo približno 3 × 3 m prostora in dostop do električne vtičnice.", icon: "space" },
  { label: "Postavitev", value: "360° Booth pripravimo in postavimo 30–45 minut pred začetkom dogodka.", icon: "setup" },
  { label: "Format videa", value: "Videoposnetki so optimizirani za deljenje na družbenih omrežjih.", icon: "video" },
  { label: "Galerija", value: "Po dogodku prejmete vse videoposnetke v polni ločljivosti v zasebni galeriji.", icon: "share" },
  { label: "Prevoz", value: "Prevoz uskladimo glede na lokacijo dogodka in ga vključimo v končno ponudbo.", icon: "truck" },
  { label: "Personalizacija", value: "Prilagodimo glasbo, animacije, grafične elemente in vizualno podobo posnetkov.", icon: "music" },
  { label: "Cena", value: "Paketi od 299 € dalje. Brez skritih stroškov.", icon: "tag" },
] as const;

export const photoPackages = [
  {
    name: "Basic",
    price: 279,
    hours: 2,
    tagline: "Za manjša praznovanja in krajše dogodke.",
    features: [
      "Neomejeno narejenih in natisnjenih fotografij",
      "Izbrani rekviziti",
      "Personaliziran okvir z logotipom",
      "Prisotnost naše ekipe",
      "Digitalna galerija",
    ],
  },
  {
    name: "Standard",
    price: 329,
    hours: 3,
    tagline: "Najbolj priljubljena izbira za večino dogodkov.",
    featured: true,
    features: [
      "Neomejeno narejenih in natisnjenih fotografij",
      "Izbrani rekviziti",
      "Personaliziran okvir z logotipom",
      "Spominski album",
      "Prisotnost naše ekipe",
      "Digitalna galerija",
    ],
  },
  {
    name: "Premium",
    price: 379,
    hours: 4,
    tagline: "Za večja praznovanja in dogodke, ki trajajo dlje.",
    features: [
      "Neomejeno narejenih in natisnjenih fotografij",
      "Izbrani rekviziti",
      "Personaliziran okvir z logotipom",
      "Spominski album",
      "Prisotnost naše ekipe",
      "Digitalna galerija",
    ],
  },
] as const;

export const booth360Packages = [
  {
    name: "Mini paket",
    price: 299,
    hours: 2,
    tagline: "Za manjša praznovanja in krajše dogodke.",
    features: [
      "2 uri neomejenih posnetkov",
      "Slow-motion video",
      "Vključeni različni rekviziti",
      "Priprava digitalnega okvirja",
      "QR koda in AirDrop deljenje",
      "Pomoč pri uporabi",
    ],
  },
  {
    name: "Osnovni paket",
    price: 349,
    hours: 3,
    tagline: "Najbolj priljubljena izbira za večino dogodkov.",
    featured: true,
    features: [
      "3 ure neomejenih posnetkov",
      "Slow-motion video",
      "Vključeni različni rekviziti",
      "Priprava digitalnega okvirja",
      "QR koda in AirDrop deljenje",
      "Pomoč pri uporabi",
    ],
  },
  {
    name: "Maxi paket",
    price: 399,
    hours: 4,
    tagline: "Za večja praznovanja in dogodke, ki trajajo dlje.",
    features: [
      "4 ure neomejenih posnetkov",
      "Slow-motion video",
      "Vključeni različni rekviziti",
      "Priprava digitalnega okvirja",
      "QR koda in AirDrop deljenje",
      "Pomoč pri uporabi",
    ],
  },
] as const;

export const addons = [
  { item: "Dodatna ura · Photo Booth", price: "+50 €" },
  { item: "Dodatna ura · 360° Booth", price: "+80 €" },
  { item: "Personalizirane animacije za 360° Booth", price: "+59 €" },
  { item: "Album", price: "+20 €" },
  {
    item: "Personalizirane lesene tablice 10 kosov. Ostanejo vam.",
    price: "+40 €",
  },
] as const;
