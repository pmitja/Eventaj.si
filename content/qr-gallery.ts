export const qrGalleryOrderUrl = "https://galerija.eventaj.si/naroci";
export const qrGalleryDemoUrl = "https://galerija.eventaj.si/e/ana-in-marko";

export const qrGalleryGoogleRating = {
  rating: "4,9",
  reviewCount: 30,
} as const;

export const qrGalleryGoogleReviews = [
  {
    author: "Anja Bračič",
    initial: "A",
    date: "pred enim mesecem",
    quote:
      "Super storitev, prijazen in profesionalen odnos, prilagoditev in upoštevanje želja. Priporočam!",
    avatarClass: "bg-[#70ad3f]",
  },
  {
    author: "Polonca Ploč",
    initial: "P",
    date: "pred 3 tedni",
    quote:
      "Bilo je enkratno! Mitja je super dečko. Vse sva se lepo dogovorila in vse želje so bile upoštevane. Še enkrat hvala. Z veseljem priporočam!",
    avatarClass: "bg-[#397d72]",
  },
  {
    author: "Tjaša Jakob",
    initial: "T",
    date: "pred 2 mesecema",
    quote: null,
    avatarClass: "bg-[#1199d5]",
  },
] as const;

export const qrGallerySteps = [
  {
    number: "01",
    title: "Ustvarite dogodek",
    description:
      "Vpišete ime in datum. Dostop do administracije dobite takoj po plačilu.",
    image: "/qr-galerija/screenshots/galerija-desktop.png",
    imageAlt: "Galerija dogodka Ana in Marko na računalniku",
  },
  {
    number: "02",
    title: "Natisnete QR kodo",
    description:
      "Prenesete jo v SVG in PNG. Na željo pripravimo predlogo za tisk.",
    image: "/qr-galerija/screenshots/email-qr.png",
    imageAlt: "E-pošta s povezavo za nastavitev dogodka in QR kodo",
  },
  {
    number: "03",
    title: "Gostje skenirajo",
    description:
      "Fotografije, videi in glasovna voščila gredo iz brskalnika naravnost v galerijo.",
    image: "/qr-galerija/screenshots/galerija-mobile.png",
    imageAlt: "Nalaganje fotografij v galerijo dogodka na telefonu",
  },
] as const;

export const qrGalleryPlacements = [
  {
    title: "Na mizo",
    description:
      "Majhna kartica pri vsakem omizju opomni goste ravno takrat, ko že imajo telefon v roki.",
    image: "/qr-galerija/postavitve/table.jpg",
    alt: "Kartica s QR kodo na poročni mizi",
  },
  {
    title: "Na pozdravno tablo",
    description:
      "Kodo gostje opazijo ob prihodu, poleg pozdrava in sedežnega reda.",
    image: "/qr-galerija/postavitve/welcome-sign.jpg",
    alt: "Pozdravna tabla s QR kodo ob vhodu na poroko",
  },
  {
    title: "Na meni ali kartico",
    description:
      "Dodajte jo na meni, imensko kartico ali kratka navodila pri vsakem sedežu.",
    image: "/qr-galerija/postavitve/menu-card.jpg",
    alt: "Poročni meni s QR kodo ob pogrinjku",
  },
  {
    title: "Na projekcijo",
    description:
      "Med zabavo jo pokažite na platnu skupaj s fotografijami, ki jih gostje pravkar dodajajo.",
    image: "/qr-galerija/postavitve/projection.jpg",
    alt: "Projekcija galerije s QR kodo na dogodku",
  },
] as const;

export const qrGalleryFeatures = [
  [
    "Brez aplikacije",
    "Galerija se odpre v brskalniku. Gost ne ustvarja računa in ne vpisuje gesla.",
  ],
  ["Neomejeno gostov", "Cena je enaka pri tridesetih in pri tristo gostih."],
  [
    "Glasovna knjiga",
    "Gost posname voščilo do dveh minut. Ostane poleg fotografij.",
  ],
  [
    "Živa projekcija",
    "Fotografije se sproti pojavljajo na televizorju ali projektorju v dvorani.",
  ],
  [
    "Originali, ne stisnjene datoteke",
    "Po dogodku dobite ZIP z vsemi datotekami na e-pošto.",
  ],
  [
    "Zasebna galerija",
    "Iskalniki je ne indeksirajo. Povezavo dobijo samo vaši gostje.",
  ],
] as const;

export const qrGalleryFaqs = [
  [
    "Ali morajo gostje namestiti aplikacijo?",
    "Ne. QR koda odpre galerijo neposredno v mobilnem brskalniku. Gost ne potrebuje aplikacije, računa ali gesla.",
  ],
  [
    "Kako dobim QR kodo?",
    "Po nastavitvi dogodka jo v administraciji prenesete kot PNG ali SVG. Tako jo lahko uporabite na tiskovinah in zaslonih.",
  ],
  [
    "Ali lahko prenesem fotografije gostov?",
    "Da. Posamezne fotografije lahko prenesete sproti, po dogodku pa pripravite ZIP z vsemi izvirniki.",
  ],
  [
    "Kako deluje glasovna knjiga?",
    "Gost v brskalniku posname do dve minuti dolgo voščilo. Posnetek ostane v isti galeriji kot fotografije in videi.",
  ],
  [
    "Kako dolgo je galerija na voljo?",
    "Galerija je na voljo 180 dni po dogodku. Pred iztekom prenesite vse, kar želite obdržati.",
  ],
  [
    "So fotografije zasebne?",
    "Galerije iskalniki ne indeksirajo. Odpre jo lahko vsak, ki ima povezavo ali QR kodo, zato jo delite le s povabljenimi.",
  ],
  [
    "Ali lahko gostje dodajo videe?",
    "Da. Osnovni paket vključuje do 20 videov, dolgih največ 60 sekund. Za 15 € lahko omejitev števila videov odstranite.",
  ],
  [
    "Ali fotografije uporabljate za marketing?",
    "Ne brez vašega dovoljenja. Fotografije ostanejo del vašega dogodka in jih za objave ne uporabimo brez izrecnega soglasja.",
  ],
  [
    "Kaj se zgodi, če je na dogodku slab signal?",
    "Za nalaganje je potrebna podatkovna povezava. Gost lahko fotografije naloži pozneje, ko ima boljši signal. Galerija ostane odprta 180 dni.",
  ],
] as const;

export type QrGalleryUseCase = {
  slug: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  benefits: readonly string[];
  occasions: readonly string[];
  faq: readonly (readonly [string, string])[];
};

export const qrGalleryUseCases = [
  {
    slug: "poroke",
    label: "Poroke",
    eyebrow: "QR galerija za poroke",
    title: "Poročne fotografije vseh gostov v eni galeriji.",
    description:
      "Profesionalni fotograf ujame ključne trenutke. Gostje pa vidijo vse vmes. Z eno QR kodo zbereta njihove fotografije, kratke videe in voščila.",
    benefits: [
      "QR koda za vabila, mize, meni in pozdravno tablo",
      "Nalaganje brez aplikacije ali registracije",
      "Live Slideshow za prikaz fotografij med zabavo",
      "ZIP vseh fotografij po poroki",
    ],
    occasions: [
      "civilni obred",
      "poročno slavje",
      "dekliščina ali fantovščina",
      "obletnica poroke",
    ],
    faq: [
      [
        "Ali galerija nadomesti poročnega fotografa?",
        "Ne. Fotograf poskrbi za ključne fotografije, QR galerija pa zbere spontane utrinke gostov.",
      ],
      [
        "Kam naj postaviva QR kodo?",
        "Uporabita jo na več mestih. Dobro delujejo pozdravna tabla, mize, meni, bar in zaslon ob plesišču.",
      ],
    ],
  },
  {
    slug: "rojstni-dnevi",
    label: "Rojstni dnevi",
    eyebrow: "QR galerija za rojstne dneve",
    title: "Vsi utrinki praznovanja brez iskanja po skupinskih klepetih.",
    description:
      "Gostje dodajo fotografije, videe in voščila v isto galerijo. Deluje za prvi rojstni dan, osemnajstico in okrogle jubileje.",
    benefits: [
      "Ena povezava za vse generacije gostov",
      "Brez aplikacije, gesel in uporabniških računov",
      "Komentarji ter glasovna voščila ob fotografijah",
      "Galerija za ogled med praznovanjem in po njem",
    ],
    occasions: [
      "otroški rojstni dan",
      "18. rojstni dan",
      "okrogli jubilej",
      "zabava presenečenja",
    ],
    faq: [
      [
        "Je uporaba dovolj preprosta tudi za starejše goste?",
        "Da. Gost odpre kamero, skenira kodo in fotografije izbere neposredno v brskalniku.",
      ],
      [
        "Lahko fotografije dodajo tudi naslednji dan?",
        "Da. Nalaganje je mogoče do konca obdobja, ki ga določite pri nastavitvi dogodka.",
      ],
    ],
  },
  {
    slug: "praznovanja",
    label: "Praznovanja",
    eyebrow: "QR galerija za praznovanja",
    title: "Skupni album za trenutke, ki jih posnamejo vaši gostje.",
    description:
      "Obletnice, družinska srečanja, baby showerji in zaključki šolanja. Vsi gostje prispevajo v isto zasebno galerijo.",
    benefits: [
      "Primerna za majhna druženja in velika slavja",
      "Dostop prek povezave ali QR kode",
      "Nadzor nad vidnostjo posameznih fotografij",
      "Vsi spomini pripravljeni za enoten prenos",
    ],
    occasions: [
      "baby shower",
      "obletnica",
      "družinsko srečanje",
      "matura ali zaključek šolanja",
    ],
    faq: [
      [
        "Za katere dogodke je galerija primerna?",
        "Za vsak dogodek, kjer fotografira več ljudi in želite njihove posnetke zbrati na enem mestu.",
      ],
      [
        "Ali je galerija javna?",
        "Ne. Iskalniki je ne indeksirajo, dostop pa imajo ljudje s povezavo ali QR kodo.",
      ],
    ],
  },
  {
    slug: "team-building",
    label: "Team buildingi",
    eyebrow: "QR galerija za team buildinge",
    title: "Naj ekipa sama ujame najboljše trenutke dneva.",
    description:
      "Udeleženci sproti polnijo skupno galerijo. Po dogodku imate fotografije aktivnosti, ekipnih trenutkov in zakulisja že zbrane.",
    benefits: [
      "Hiter dostop prek ene QR kode",
      "Live Slideshow za zaključek ali večerno druženje",
      "Nadzor nad tem, kaj je objavljeno",
      "ZIP izvoz za interno komunikacijo in arhiv",
    ],
    occasions: [
      "športne aktivnosti",
      "delavnice",
      "izleti ekipe",
      "novoletne zabave",
    ],
    faq: [
      [
        "Lahko galerijo med dogodkom pokažemo na zaslonu?",
        "Da. Live Slideshow odprete na računalniku, povezanem s televizorjem ali projektorjem.",
      ],
      [
        "Kdo nadzira vidnost fotografij?",
        "Organizator v administraciji skrije ali pokaže posamezne fotografije in celotno galerijo.",
      ],
    ],
  },
  {
    slug: "poslovni-dogodki",
    label: "Poslovni dogodki",
    eyebrow: "QR galerija za poslovne dogodke",
    title: "Vsi pogledi na dogodek. Pripravljeni za naslednji povzetek.",
    description:
      "Udeleženci prispevajo fotografije, kratke videe in odzive. Organizator dobi urejeno zbirko za interno komunikacijo ali objavo po dogodku.",
    benefits: [
      "Dostop brez aplikacije za vse udeležence",
      "QR koda na akreditacijah, mizah in zaslonih",
      "Nadzor nad vidnostjo posameznih fotografij",
      "Enoten izvoz vsebin po dogodku",
    ],
    occasions: [
      "predstavitev izdelka",
      "otvoritev",
      "pop-up dogodek",
      "poslovno srečanje",
    ],
    faq: [
      [
        "Lahko kodo dodamo na obstoječe materiale?",
        "Da. Prenesete jo kot SVG ali PNG in dodate na akreditacije, plakate, tiskovine ali zaslone.",
      ],
      [
        "Lahko fotografije pred prikazom pregledamo?",
        "Da. Organizator upravlja vidnost posameznih fotografij v administraciji.",
      ],
    ],
  },
  {
    slug: "konference-in-sejmi",
    label: "Konference in sejmi",
    eyebrow: "QR galerija za konference in sejme",
    title: "Utrip dogodka skozi oči udeležencev.",
    description:
      "QR koda na akreditaciji, stojnici ali zaslonu zbere fotografije predavanj, mreženja in dogajanja v eno galerijo.",
    benefits: [
      "Ena vstopna točka za vse dele dogodka",
      "Live Slideshow za oder, avlo ali stojnico",
      "Administracija za pregled fotografij",
      "Urejen arhiv za povzetek dogodka",
    ],
    occasions: ["konferenca", "sejem", "kongres", "mreženjski dogodek"],
    faq: [
      [
        "Kje koda najbolje deluje?",
        "Na akreditacijah, programu, uvodnem in zaključnem slajdu, ob vhodu ter na mestih za mreženje.",
      ],
      [
        "Je galerija primerna za večdnevni dogodek?",
        "Da. Ob naročilu nastavite začetek in konec nalaganja za ves čas dogodka.",
      ],
    ],
  },
] as const satisfies readonly QrGalleryUseCase[];

export function getQrGalleryUseCase(slug: string) {
  return qrGalleryUseCases.find((item) => item.slug === slug);
}
