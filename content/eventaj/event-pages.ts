export type EventLandingProduct = "photo" | "360";

export interface EventLandingMedia {
  src: string;
  alt: string;
  poster?: string;
}

export interface EventLanding {
  slug: string;
  product: EventLandingProduct;
  productLabel: string;
  productHref: string;
  breadcrumbLabel: string;
  eyebrow: string;
  title: string;
  italicWord: string;
  titleSuffix?: string;
  description: string;
  price: number;
  proof: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  heroImages: EventLandingMedia[];
  reasonsEyebrow: string;
  reasonsTitle: string;
  reasonsItalic: string;
  reasons: { title: string; desc: string }[];
  idealFor?: { eyebrow: string; title: string; description: string; items: string[] };
  stepsDescription?: string;
  steps?: { title: string; desc: string }[];
  included?: { label: string; desc: string }[];
  galleryEyebrow: string;
  galleryImages: EventLandingMedia[];
  testimonial: { quote: string; author: string; role: string };
  faqEyebrow: string;
  faq: { q: string; a: string }[];
  related: { label: string; href: string }[];
}

export const eventLandingSteps = {
  photo: [
    {
      title: "Povpraševanje in termin",
      desc: "Pošljete datum in lokacijo, v 24 urah potrdimo prost termin in pripravimo ponudbo po meri.",
    },
    {
      title: "Dizajn tiska po vašem dogodku",
      desc: "Pred dogodkom uskladimo predlogo tiska — imena, datum, barve in tipografijo.",
    },
    {
      title: "Na dan dogodka — vse mi",
      desc: "Postavitev, vodenje, rekviziti, tisk in pospravljanje. Digitalna galerija sledi v 48 urah.",
    },
  ],
  "360": [
    {
      title: "Povpraševanje in termin",
      desc: "Pošljete datum in lokacijo, v 24 urah potrdimo prost termin in pripravimo ponudbo po meri.",
    },
    {
      title: "Personalizacija videa",
      desc: "Pred dogodkom uskladimo digitalni okvir, glasbo in animacije — po vaših željah.",
    },
    {
      title: "Na dan dogodka — vse mi",
      desc: "Postavitev, vodenje in pomoč gostom ves dogodek. Vsi posnetki v zasebni galeriji v 48 urah.",
    },
  ],
} as const;

export const eventLandingIncluded = {
  photo: [
    { label: "Neomejeni tiski", desc: "Vsak gost, kolikorkrat želi — fotografije so natisnjene v nekaj sekundah." },
    { label: "Personaliziran dizajn tiska", desc: "Predloga z imeni, datumom ali logotipom, usklajena pred dogodkom." },
    { label: "Izbrani rekviziti", desc: "Skrbno izbrana kolekcija rekvizitov, prilagojena vašemu dogodku." },
    { label: "Ekipa ves dogodek", desc: "Postavitev, vodenje in pospravljanje — gostje niso nikoli sami." },
    { label: "Spletna galerija", desc: "Vse fotografije v zasebni galeriji v 48 urah po dogodku." },
    { label: "Cena", desc: "Paketi od 279 € — končna cena, prevoz uskladimo glede na lokacijo." },
  ],
  "360": [
    { label: "Neomejeni posnetki", desc: "Vsak gost, kolikorkrat želi — slow-motion 360° videoposnetki ves dogodek." },
    { label: "Personaliziran video", desc: "Digitalni okvir, glasba in animacije, usklajeni pred dogodkom." },
    { label: "Takojšnje deljenje", desc: "Gostje prejmejo video prek QR kode ali AirDropa v nekaj sekundah." },
    { label: "Ekipa ves dogodek", desc: "Postavitev, vodenje in pomoč gostom — brez skrbi za vas." },
    { label: "Spletna galerija", desc: "Vsi posnetki v polni ločljivosti v zasebni galeriji v 48 urah." },
    { label: "Cena", desc: "Paketi od 299 € — končna cena, prevoz uskladimo glede na lokacijo." },
  ],
} as const;

const photoBase = {
  product: "photo" as const,
  productLabel: "Photo Booth",
  productHref: "/photo-booth",
  price: 279,
  galleryEyebrow: "Z resničnih dogodkov",
};

const booth360Base = {
  product: "360" as const,
  productLabel: "360° Booth",
  productHref: "/360-photo-booth",
  price: 299,
  galleryEyebrow: "Z resničnih dogodkov",
};

export const eventLandings: Record<string, EventLanding> = {
  "photo-booth-za-poroko": {
    ...photoBase,
    slug: "photo-booth-za-poroko",
    breadcrumbLabel: "Za poroko",
    eyebrow: "Photo Booth za poroko",
    title: "Vajina poroka, ujeta",
    italicWord: "v fotografijah.",
    description:
      "Photo Booth s personaliziranim tiskom, usklajenim z vajinimi imeni, datumom in stilom poroke. Gostje ustvarjajo spomine, spominska knjiga pa se polni sama.",
    proof: "4.9/5 · 50+ porok vsako sezono",
    seoTitle: "Foto box (photo booth) za poroko – 279 € | Eventaj.si",
    metaDescription:
      "Foto box (photo booth) za poroko z neomejenimi tiski, personaliziranim dizajnom z imeni in datumom ter spominsko knjigo. Od 279 €, po vsej Sloveniji. Preverite prost termin.",
    keywords: ["foto box za poroko", "fotobox za poroko", "photo booth za poroko", "foto stojnica za poroko", "spominska knjiga poroka", "foto box najem poroka"],
    heroImages: [
      { src: "/application/wedding-photos/poroka-1.webp", alt: "Gostje z rekviziti na poroki" },
      { src: "/application/wedding-photos/poroka-2.webp", alt: "Mladoporočenca pred Photo Boothom s tiskom v roki" },
      { src: "/application/wedding-photos/poroka-3.webp", alt: "Personaliziran tisk z imeni mladoporočencev" },
    ],
    reasonsEyebrow: "Zakaj na poroko",
    reasonsTitle: "Zabava za goste,",
    reasonsItalic: "spomini za vaju",
    reasons: [
      { title: "Prilagojeno vajini poroki", desc: "Personaliziran tisk z vajinima imenoma, datumom in elementi poročne grafične podobe — usklajen z vabili in dekoracijo." },
      { title: "Spominska knjiga se piše sama", desc: "Vsaka fotografija se natisne v dveh izvodih. En izvod gost odnese domov, drugi ostane v spominski knjigi skupaj s posvetili, ki vama ostanejo za vedno." },
      { title: "Zabava za vse generacije", desc: "Gostje vseh generacij se radi vračajo pred objektiv in ustvarjajo spomine, ki ostanejo tudi po poroki." },
      { title: "Brez omejitve fotografij", desc: "Neomejeno fotografiranje brez doplačil. Gostje ustvarijo toliko fotografij, kot jih želijo." },
      { title: "Eleganten, ne vsiljiv", desc: "Minimalistična postavitev, ki se naravno zlije z ambientom in poročno dekoracijo." },
      { title: "Digitalna galerija po poroki", desc: "Po poroki prejmeta zasebno galerijo z vsemi fotografijami, ki jo lahko delita z družino in gosti." },
    ],
    stepsDescription:
      "Pridemo pred začetkom, poskrbimo za postavitev in spremljamo dogajanje skozi ves večer. Ko se zabava zaključi, vse pospravimo. Vidva se lahko brez skrbi posvetita svojim gostom.",
    steps: [
      {
        title: "Povpraševanje in termin",
        desc: "Pošljeta datum in lokacijo poroke. V 24 urah preverimo razpoložljivost in pripravimo ponudbo.",
      },
      {
        title: "V podobi vajine poroke",
        desc: "Pred poroko uskladimo imena, datum in podobo tiska, da se ujema z vajinimi vabili in dekoracijo.",
      },
      {
        title: "Na dan poroke poskrbimo za vse",
        desc: "Postavitev, rekviziti, tisk fotografij in pomoč gostom. Vidva uživata v večeru, mi pa poskrbimo za Photo Booth.",
      },
    ],
    included: [
      { label: "Neomejeni tiski", desc: "Gostje se lahko fotografirajo kolikokrat želijo. Fotografije prejmejo takoj po fotografiranju." },
      { label: "Personaliziran dizajn tiska", desc: "Tisk prilagodimo vajinima imenoma, datumu in podobi poroke." },
      { label: "Izbrani rekviziti", desc: "Rekvizite izberemo tako, da se ujemajo s stilom poroke in ustvarijo zabavne fotografije." },
      { label: "Ekipa ves dogodek", desc: "Poskrbimo za postavitev, pomoč gostom in pospravljanje po dogodku. Ob Photo Boothu je ves čas prisotna naša ekipa." },
      { label: "Spletna galerija", desc: "Po poroki prejmeta dostop do zasebne digitalne galerije z vsemi fotografijami." },
      { label: "Cena", desc: "Paketi se začnejo pri 279 €. Končno ponudbo pripravimo glede na lokacijo poroke." },
    ],
    galleryImages: [
      { src: "/application/wedding-photos/poroka-5.webp", alt: "Nevestina ekipa z rekviziti pred Photo Boothom" },
      { src: "/application/wedding-photos/poroka-2.webp", alt: "Mladoporočenca z napisom in rekviziti" },
      { src: "/application/wedding-photos/poroka-7.webp", alt: "Skupina svatov s sončnimi očali" },
      { src: "/application/wedding-photos/poroka-4.webp", alt: "Photo Booth na poroki — par s konfeti" },
      { src: "/application/wedding-photos/poroka-8.webp", alt: "Svatje z rekviziti ob bleščečem ozadju" },
      { src: "/application/wedding-photos/poroka-1.webp", alt: "Poročni gostje s personaliziranim tiskom" },
      { src: "/application/wedding-photos/poroka-6.webp", alt: "Par z rekviziti v slogu Gatsby" },
      { src: "/application/wedding-photos/poroka-3.webp", alt: "Nasmejani svatje pred Photo Boothom" },
    ],
    testimonial: {
      quote: "Gostje so stali v vrsti ves večer. Spominska knjiga s posvetili je najlepša stvar, ki nama je ostala od poroke.",
      author: "Anja in Žan",
      role: "Poroka · Grad Otočec",
    },
    faqEyebrow: "Poročna vprašanja",
    faq: [
      { q: "Kdaj naj rezervirava termin za poroko?", a: "Najbolj priljubljeni sobotni termini se pogosto zapolnijo že 6–12 mesecev vnaprej. Ko potrdita lokacijo, nama pošljita datum in ga brezplačno rezerviramo za 7 dni." },
      { q: "Ali se dizajn tiska ujema z najinimi vabili?", a: "Da. Tisk prilagodimo vajinim barvam, tipografiji in motivom, zato se lepo ujema z vabili in celotno podobo poroke." },
      { q: "Koliko prostora potrebuje booth v dvorani?", a: "Približno 2,5 × 2 m in dostop do električne vtičnice. Postavitev uskladimo z lokacijo, da se booth lepo zlije s prostorom." },
      { q: "Kako dolgo je ekipa prisotna na poroki?", a: "Ob Photo Boothu je prisotna naša ekipa skozi celoten dogovorjeni čas najema. Po potrebi lahko termin tudi podaljšamo." },
      { q: "Kaj če se poroka premakne ali odpove?", a: "Termin lahko enkrat brezplačno prestavimo na nov prost datum. O podrobnostih se vedno dogovorimo individualno in brez zapletov." },
    ],
    related: [
      { label: "360° Booth za poroko", href: "/360-booth-za-poroko" },
      { label: "Photo Booth za obletnico", href: "/photo-booth-za-obletnico" },
      { label: "Vse o najemu Photo Bootha", href: "/photo-booth" },
    ],
  },

  "photo-booth-za-rojstni-dan": {
    ...photoBase,
    slug: "photo-booth-za-rojstni-dan",
    breadcrumbLabel: "Za rojstni dan",
    eyebrow: "Photo Booth za rojstni dan",
    title: "Rojstni dan, ki ga gostje",
    italicWord: "odnesejo domov",
    description:
      "Fotografije, smeh in spomini, ki ostanejo še dolgo po praznovanju.",
    proof: "4.9/5 · 50+ dogodkov vsako leto",
    seoTitle: "Foto box (photo booth) za rojstni dan – 279 € | Eventaj.si",
    metaDescription:
      "Foto box (fotobox) za rojstnodnevno zabavo z rekviziti, neomejenim tiskom in personaliziranim dizajnom. Od 279 €, po vsej Sloveniji. Preverite prost termin.",
    keywords: ["foto box za zabavo", "fotobox za zabavo", "foto box za rojstni dan", "photo booth rojstni dan", "foto stojnica rojstni dan", "fotobox 30. rojstni dan"],
    heroImages: [
      { src: "/application/birthday-parties/birthday-9.webp", alt: "Prijatelji z rekviziti na rojstnodnevni zabavi" },
      { src: "/application/birthday-parties/birthday-3.webp", alt: "Slavljenec pred Photo Boothom s konfeti" },
      { src: "/application/birthday-parties/birthday-14.webp", alt: "Personaliziran rojstnodnevni tisk" },
    ],
    reasonsEyebrow: "Zakaj na rojstni dan",
    reasonsTitle: "Zabava, ki se",
    reasonsItalic: "natisne",
    reasons: [
      { title: "Prilagojeno vašemu praznovanju", desc: "Fotografije opremimo z imenom, letnico in dizajnom, prilagojenim vaši zabavi." },
      { title: "Zabavni rekviziti", desc: "Zabavni rekviziti poskrbijo, da se sprostijo tudi najbolj zadržani gostje." },
      { title: "Neomejeno fotografiranje", desc: "Gostje se lahko fotografirajo in tiskajo fotografije kolikokrat želijo." },
      { title: "Spomin, ki ga odnesejo domov", desc: "Vsak gost prejme natisnjeno fotografijo za spomin na zabavo." },
      { title: "Brez skrbi za organizacijo", desc: "Postavimo, vodimo in pospravimo. Vi samo praznujete." },
      { title: "Digitalna galerija po praznovanju", desc: "Po dogodku prejmete dostop do zasebne digitalne galerije z vsemi fotografijami." },
    ],
    stepsDescription:
      "Pridemo pred začetkom, postavimo Photo Booth in skrbimo za nemoten potek skozi ves dogodek. Po zabavi vse pospravimo. Vi se lahko brez skrbi posvetite svojim gostom.",
    steps: [
      {
        title: "Povpraševanje in termin",
        desc: "Pošljete datum in lokacijo, v 24 urah potrdimo prost termin in pripravimo ponudbo po meri.",
      },
      {
        title: "Dizajn tiska po vašem dogodku",
        desc: "Pred dogodkom uskladimo predlogo tiska z imenom, datumom in izbranim dizajnom.",
      },
      {
        title: "Na dan dogodka — vse mi",
        desc: "Poskrbimo za postavitev, rekvizite, tiskanje fotografij in pospravljanje. Fotografije prejmete tudi v zasebni spletni galeriji.",
      },
    ],
    included: [
      { label: "Neomejeni tiski", desc: "Vsak gost lahko fotografije natisne kolikokrat želi. Tiski so pripravljeni v nekaj sekundah." },
      { label: "Personaliziran dizajn tiska", desc: "Predloga z imeni, datumom ali logotipom, usklajena pred dogodkom." },
      { label: "Izbrani rekviziti", desc: "Skrbno izbrana kolekcija rekvizitov, prilagojena vašemu dogodku." },
      { label: "Spremljanje skozi ves dogodek", desc: "Naša ekipa je prisotna skozi celoten dogodek in poskrbi za brezhibno izkušnjo gostov." },
      { label: "Spletna galerija", desc: "Vse fotografije v zasebni galeriji v 48 urah po dogodku." },
      { label: "Cena", desc: "Paketi od 279 €. Končna cena je odvisna od lokacije dogodka." },
    ],
    galleryImages: [
      { src: "/application/birthday-parties/birthday-11.webp", alt: "Photo Booth na rojstnodnevni zabavi" },
      { src: "/application/birthday-parties/birthday-5.webp", alt: "Slavljenec z rekviziti pred bleščečim ozadjem" },
      { src: "/application/birthday-parties/birthday-16.webp", alt: "Skupina prijateljev z rekviziti" },
      { src: "/application/birthday-parties/birthday-2.webp", alt: "Slavljenka z balonom in tiskom" },
      { src: "/application/birthday-parties/birthday-8.webp", alt: "Gostje med fotografiranjem na zabavi" },
      { src: "/application/birthday-parties/birthday-13.webp", alt: "Rojstnodnevni rekviziti in nasmejani gostje" },
      { src: "/application/birthday-parties/birthday-1.webp", alt: "Prijatelji s konfeti na rojstnem dnevu" },
      { src: "/application/birthday-parties/birthday-10.webp", alt: "Nasmejana družba pred Photo Boothom" },
      { src: "/application/birthday-parties/birthday-6.webp", alt: "Par z rekviziti na rojstnodnevni zabavi" },
      { src: "/application/birthday-parties/birthday-15.webp", alt: "Skupinska fotografija s personaliziranim tiskom" },
      { src: "/application/birthday-parties/birthday-12.webp", alt: "Gostje z napisi in rekviziti" },
      { src: "/application/birthday-parties/birthday-4.webp", alt: "Veselje pred Photo Boothom z rekviziti" },
    ],
    testimonial: {
      quote: "Photo Booth je bil odlična popestritev. Gostje so se res zabavali, slike pa so čudovit spomin za ta dan.",
      author: "Manuela",
      role: "Rojstnodnevna zabava",
    },
    faqEyebrow: "Rojstnodnevna vprašanja",
    faq: [
      { q: "Koliko časa pred zabavo naj rezerviram?", a: "Priporočamo rezervacijo čim prej, zlasti za vikende in december. Največ rezervacij prejmemo 2–4 mesece pred dogodkom." },
      { q: "Ali deluje tudi v domačem prostoru ali šotoru?", a: "Da. Potrebujemo približno 2,5 × 2 m prostora in električno vtičnico. Photo Booth lahko postavimo v dvorani, gostilni, doma ali pod šotorom." },
      { q: "Lahko tisk prilagodimo slavljencu?", a: "Seveda. Predlogo oblikujemo z imenom, letnico in motivom zabave ter jo uskladimo z vami pred dogodkom." },
      { q: "Koliko gostov lahko uporablja booth?", a: "Ni omejitve. Fotografiranje in tiskanje sta vključena za vse goste skozi celoten najem." },
      { q: "Kaj se zgodi s fotografijami po zabavi?", a: "Vse fotografije prejmete v zasebni spletni galeriji v 48 urah. Natisnjene fotografije pa gostje odnesejo domov že med zabavo." },
    ],
    related: [
      { label: "360° Booth za rojstni dan", href: "/360-booth-za-rojstni-dan" },
      { label: "Photo Booth za obletnico", href: "/photo-booth-za-obletnico" },
      { label: "Vse o najemu Photo Bootha", href: "/photo-booth" },
    ],
  },

  "photo-booth-za-poslovni-dogodek": {
    ...photoBase,
    slug: "photo-booth-za-poslovni-dogodek",
    breadcrumbLabel: "Za poslovni dogodek",
    eyebrow: "Photo Booth za poslovni dogodek",
    title: "Vaš logotip na",
    italicWord: "vsaki fotografiji",
    description:
      "Photo Booth z brandiranim tiskom za novoletne zabave, team buildinge in konference. Vaša znamka na fotografijah, ki jih gostje odnesejo domov.",
    proof: "4.9/5 · zaupajo nam ŠKSG, AutoDelta, Forvis Mazars",
    seoTitle: "Foto box za poslovni dogodek – 279 € | Eventaj.si",
    metaDescription:
      "Foto box (photo booth) za poslovne dogodke z logotipom podjetja na vsakem tisku. Novoletne zabave, team buildingi in konference po vsej Sloveniji. Od 279 €.",
    keywords: ["foto box za poslovni dogodek", "fotobox podjetje", "photo booth za poslovni dogodek", "foto box novoletna zabava", "brandiran foto box", "photo booth team building"],
    heroImages: [
      { src: "/application/busniess-booths/poslovna-7.webp", alt: "Ekipa na novoletni zabavi pred Photo Boothom" },
      { src: "/application/busniess-booths/poslovna-2.webp", alt: "Brandiran tisk z logotipom podjetja" },
      { src: "/application/busniess-booths/poslovna-9.webp", alt: "Sodelavci z rekviziti na poslovnem dogodku" },
    ],
    reasonsEyebrow: "Zakaj na poslovni dogodek",
    reasonsTitle: "Branding, ki gre",
    reasonsItalic: "z gosti domov",
    reasons: [
      { title: "Vaša znamka na vsaki fotografiji", desc: "Fotografije oblikujemo po podobi vašega podjetja in jim dodamo logotip, barve ter druge elemente vaše blagovne znamke." },
      { title: "Povezuje sodelavce in goste", desc: "Photo Booth ustvari sproščeno vzdušje in spodbuja druženje med sodelavci." },
      { title: "Ekipa, ki poskrbi za vse", desc: "Poskrbimo za postavitev, pomoč gostom in nemoten potek skozi celoten dogodek." },
      { title: "Fotografiranje brez omejitev", desc: "Gostje se lahko fotografirajo neomejeno, brez doplačil in brez skrbi glede števila fotografij." },
      { title: "Brez organizacijskih skrbi", desc: "Po potrditvi termina poskrbimo za organizacijo, postavitev in izvedbo." },
      { title: "Vse fotografije na enem mestu", desc: "Po dogodku prejmete dostop do zasebne galerije z vsemi fotografijami." },
    ],
    idealFor: {
      eyebrow: "Primerno za",
      title: "Dogodke, ki povezujejo ljudi in znamke.",
      description: "Photo Booth prilagodimo tonu in cilju vašega dogodka — od sproščenega druženja do prepoznavne aktivacije znamke.",
      items: [
        "Novoletne zabave",
        "Team buildinge",
        "Konference",
        "Otvoritve poslovalnic",
        "Sejme",
        "Dneve odprtih vrat",
        "Promocijske dogodke",
      ],
    },
    stepsDescription:
      "Pridemo pred začetkom dogodka, poskrbimo za postavitev in spremljamo dogajanje skozi ves čas dogodka. Ko se zaključi, vse pospravimo. Vi se lahko brez skrbi posvetite svojim gostom.",
    steps: [
      {
        title: "Povpraševanje in rezervacija termina",
        desc: "Pošljete datum in lokacijo, v 24 urah potrdimo prost termin in pripravimo ponudbo po meri.",
      },
      {
        title: "Oblikovanje fotografij po meri",
        desc: "Pred dogodkom uskladimo predlogo tiska — imena, datum, barve in tipografijo.",
      },
      {
        title: "Na dan dogodka poskrbimo za vse",
        desc: "Postavitev, vodenje, rekviziti, tisk in pospravljanje. Digitalna galerija sledi v 48 urah.",
      },
    ],
    included: [
      { label: "Neomejeni tiski", desc: "Gostje lahko fotografije tiskajo neomejeno, brez doplačil." },
      { label: "Personaliziran dizajn tiska", desc: "Predlogo fotografij prilagodimo z logotipom, barvami, datumom ali drugimi elementi vaše blagovne znamke." },
      { label: "Izbrani rekviziti", desc: "Rekvizite izberemo glede na tip dogodka in profil udeležencev." },
      { label: "Spremljanje skozi ves dogodek", desc: "Naša ekipa je prisotna skozi celoten dogodek in poskrbi za brezhibno izkušnjo gostov." },
      { label: "Spletna galerija", desc: "Po dogodku prejmete dostop do zasebne spletne galerije z vsemi fotografijami." },
      { label: "Cena", desc: "Paketi od 279 €. Prevoz uskladimo glede na lokacijo dogodka in ga vključimo v ponudbo." },
    ],
    galleryImages: [
      { src: "/application/busniess-booths/poslovna-4.webp", alt: "Photo Booth na poslovnem dogodku" },
      { src: "/application/busniess-booths/poslovna-1.webp", alt: "Brandiran tisk od blizu" },
      { src: "/application/busniess-booths/poslovna-10.webp", alt: "Ekipa na novoletni zabavi" },
      { src: "/application/busniess-booths/poslovna-6.webp", alt: "Photo Booth na konferenci" },
      { src: "/application/busniess-booths/poslovna-3.webp", alt: "Sodelavci z rekviziti" },
      { src: "/application/busniess-booths/poslovna-8.webp", alt: "Postavitev bootha v dvorani" },
    ],
    testimonial: {
      quote: "Zelo korektna in profesionalna izkušnja, od začetne komunikacije do izvedbe. Z ekipo Eventaj poteka vse gladko in brez zapletov.",
      author: "Daniel",
      role: "Forvis Mazars · Poslovni dogodek",
    },
    faqEyebrow: "Vprašanja podjetij",
    faq: [
      { q: "Ali lahko fotografije prilagodite naši blagovni znamki?", a: "Da. Fotografije oblikujemo po podobi vašega podjetja ter dodamo logotip, barve in druge elemente blagovne znamke." },
      { q: "Ali lahko račun izstavite podjetju?", a: "Seveda. Ponudbo in račun izstavimo na podjetje, plačilo je možno po dogodku na podlagi računa." },
      { q: "Koliko prostora potrebujete na lokaciji?", a: "Za postavitev Photo Bootha potrebujemo približno 2,5 × 2 m prostora. Potreben je tudi dostop do električne vtičnice v bližini. Vse podrobnosti uskladimo pred dogodkom." },
      { q: "Ali pokrivate dogodke po vsej Sloveniji?", a: "Da, izvajamo dogodke po celotni Sloveniji. Prevoz uskladimo glede na lokacijo in ga vključimo v ponudbo." },
      { q: "Kako gostje prejmejo fotografije?", a: "Fotografije natisnemo takoj na dogodku. Digitalne fotografije pa prejmete v zasebni spletni galeriji najpozneje v 48 urah po dogodku." },
    ],
    related: [
      { label: "360° Booth za poslovni dogodek", href: "/360-booth-za-poslovni-dogodek" },
      { label: "360° Booth za promocijo znamke", href: "/360-booth-za-promocijo" },
      { label: "Vse o najemu Photo Bootha", href: "/photo-booth" },
    ],
  },

  "photo-booth-za-obletnico": {
    ...photoBase,
    slug: "photo-booth-za-obletnico",
    breadcrumbLabel: "Za obletnico",
    eyebrow: "Photo Booth za obletnico",
    title: "Trenutki, ki jih je vredno",
    italicWord: "ohraniti.",
    description:
      "Abraham, zlata poroka ali jubilej podjetja. Photo Booth poveže vse generacije in vsakemu gostu podari fotografijo za spomin.",
    proof: "4.9/5 · 50+ dogodkov vsako leto",
    seoTitle: "Foto box (photo booth) za obletnico – 279 € | Eventaj.si",
    metaDescription:
      "Foto box (photo booth) za obletnice, Abrahama in zlate poroke. Neomejen tisk, personaliziran dizajn in spominska knjiga. Od 279 €, po vsej Sloveniji.",
    keywords: ["foto box za obletnico", "fotobox abraham", "photo booth za obletnico", "foto box zlata poroka", "foto box 50 let"],
    heroImages: [
      { src: "/application/birthday-parties/birthday-10.webp", alt: "Jubilant z družino pred Photo Boothom" },
      { src: "/application/busniess-booths/poslovna-9.webp", alt: "Tisk z napisom 50 let" },
      { src: "/application/wedding-photos/poroka-1.webp", alt: "Tri generacije na eni fotografiji" },
    ],
    reasonsEyebrow: "Zakaj na obletnico",
    reasonsTitle: "Vse generacije,",
    reasonsItalic: "en spomin",
    reasons: [
      { title: "Prilagojen dizajn fotografije", desc: "Personaliziran dizajn fotografije z imenom, letnico ali motivom praznovanja." },
      { title: "Povezuje generacije", desc: "Od najmlajših do najstarejših gostov. Photo Booth združi vse generacije na isti fotografiji." },
      { title: "Spominska knjiga", desc: "Vsaka fotografija se natisne v dveh izvodih. En izvod obdržijo gostje, drugega dodamo v spominsko knjigo s posvetili." },
      { title: "Neomejeno fotografij", desc: "Gostje se lahko fotografirajo neomejeno in brez dodatnih stroškov." },
      { title: "Preprosto za vse goste", desc: "Gostje se lahko fotografirajo neomejeno in brez dodatnih stroškov." },
      { title: "Digitalna galerija po praznovanju", desc: "Po dogodku prejmete povezavo do zasebne digitalne galerije z vsemi fotografijami." },
    ],
    stepsDescription:
      "Pridemo pred začetkom, postavimo Photo Booth in skrbimo za nemoten potek skozi ves dogodek. Po zabavi vse pospravimo. Vi se lahko brez skrbi posvetite svojim gostom.",
    steps: [
      {
        title: "Povpraševanje in rezervacija termina",
        desc: "Pošljete datum in lokacijo, v 24 urah potrdimo prost termin in pripravimo ponudbo po meri.",
      },
      {
        title: "Dizajn fotografije po meri",
        desc: "Pred dogodkom pripravimo dizajn fotografije in ga uskladimo z vašim praznovanjem.",
      },
      {
        title: "Na dan dogodka poskrbimo za vse",
        desc: "Poskrbimo za postavitev, rekvizite, tiskanje fotografij in pospravljanje. Fotografije prejmete tudi v zasebni spletni galeriji.",
      },
    ],
    included: [
      { label: "Neomejeni tiski", desc: "Vsak gost lahko fotografije natisne kolikokrat želi. Tiski so pripravljeni v nekaj sekundah." },
      { label: "Personaliziran dizajn tiska", desc: "Predloga z imeni, datumom ali logotipom, usklajena pred dogodkom." },
      { label: "Izbrani rekviziti", desc: "Rekvizite izberemo glede na tip praznovanja in starost gostov." },
      { label: "Spremljanje skozi ves dogodek", desc: "Naša ekipa je prisotna skozi celoten dogodek in poskrbi za brezhibno izkušnjo gostov." },
      { label: "Spletna galerija", desc: "Vse fotografije v zasebni galeriji v 48 urah po dogodku." },
      { label: "Cena", desc: "Paketi od 279 €. Končna cena je odvisna od lokacije dogodka." },
    ],
    galleryImages: [
      { src: "/application/birthday-parties/birthday-13.webp", alt: "Photo Booth na obletnici" },
      { src: "/application/wedding-photos/poroka-4.webp", alt: "Jubilejni tisk od blizu" },
      { src: "/application/birthday-parties/birthday-6.webp", alt: "Družina med fotografiranjem" },
      { src: "/application/busniess-booths/poslovna-5.webp", alt: "Spominska knjiga s posvetili" },
      { src: "/application/birthday-parties/birthday-15.webp", alt: "Gostje z rekviziti" },
      { src: "/application/birthday-parties/birthday-3.webp", alt: "Slavljenca s tiskom v roki" },
    ],
    testimonial: {
      quote: "Photo Booth je bil odlična popestritev. Gostje so se res zabavali, slike pa so čudovit spomin za ta dan.",
      author: "Manuela",
      role: "Praznovanje",
    },
    faqEyebrow: "Vprašanja o praznovanjih",
    faq: [
      { q: "Ali je booth primeren tudi za starejše goste?", a: "Da. Uporaba je zelo preprosta. Naša ekipa je ves čas prisotna in pomaga gostom vseh generacij." },
      { q: "Lahko pripravite spominsko knjigo?", a: "Da. Vsaka fotografija nastane v dveh izvodih. En izvod obdržijo gostje, drugega dodamo v spominsko knjigo, kamor lahko napišejo tudi posvetilo." },
      { q: "Deluje booth tudi v gostilni ali doma?", a: "Da. Za postavitev potrebujemo približno 2,5 × 2 m prostora in električni priključek. Photo Booth lahko postavimo v gostilni, dvorani ali na domačem praznovanju." },
      { q: "Kako prilagodite dizajn tiska?", a: "Dizajn fotografije prilagodimo imenu slavljenke ali slavljenca, letnici in temi praznovanja." },
      { q: "Koliko časa pred praznovanjem naj rezerviramo?", a: "Priporočamo rezervacijo vsaj 2 do 4 mesece vnaprej. Za termine ob koncih tedna in v decembru še prej." },
    ],
    related: [
      { label: "Photo Booth za poroko", href: "/photo-booth-za-poroko" },
      { label: "Photo Booth za rojstni dan", href: "/photo-booth-za-rojstni-dan" },
      { label: "Vse o najemu Photo Bootha", href: "/photo-booth" },
    ],
  },

  "360-booth-za-poroko": {
    ...booth360Base,
    slug: "360-booth-za-poroko",
    breadcrumbLabel: "Za poroko",
    eyebrow: "360° Booth za poroko",
    title: "Prvi ples,",
    italicWord: "v gibanju",
    description:
      "Slow-motion 360° posnetki z vajine poroke — od prvega plesa do zabave do jutra. Video, ki ga delita še leta.",
    proof: "4.9/5 · 50+ porok vsako sezono",
    seoTitle: "360° Booth za poroko — najem od 299 € | Eventaj.si",
    metaDescription:
      "360° Booth za poroko s slow-motion videoposnetki, personalizirano glasbo in takojšnjim deljenjem. Od 299 €, po vsej Sloveniji. Preverite prost termin.",
    keywords: ["360 Booth za poroko", "360 photo booth poroka", "360 video poroka", "360 booth najem poroka", "slow motion video poroka"],
    heroImages: [
      { src: "/application/360-photo-booth-videos/poroka-1_compressed.mp4", alt: "Mladoporočenca na 360° Booth platformi" },
      { src: "/application/360-photo-booth-videos/video-3.mp4", poster: "/application/360-photo-booth-videos/posters/video-3.webp", alt: "Slow-motion trenutek z iskricami" },
      { src: "/application/360-photo-booth-videos/poroka-2_compressed.mp4", alt: "Gostje med snemanjem 360° videa" },
    ],
    reasonsEyebrow: "Zakaj na poroko",
    reasonsTitle: "Video, ki ga delita",
    reasonsItalic: "še leta",
    reasons: [
      { title: "Slow-motion magija", desc: "Kamera ujame vajin trenutek iz vseh kotov in ga pretvori v filmski posnetek." },
      { title: "Personaliziran okvir in glasba", desc: "Video z vajinima imenoma, datumom in pesmijo, ki nekaj pomeni." },
      { title: "Gostje delijo takoj", desc: "Vsak prejme svoj video prek QR kode v nekaj sekundah — še med zabavo." },
      { title: "Neomejeno posnetkov", desc: "Brez štetja in doplačil — vsi gostje, kolikorkrat želijo, ves večer." },
      { title: "Atrakcija, ki ne potrebuje povabila", desc: "Platforma sama privablja goste — vrsta pred boothom je del zabave." },
      { title: "Galerija po poroki", desc: "Vsi posnetki v polni ločljivosti v zasebni galeriji v 48 urah." },
    ],
    galleryImages: [
      { src: "/application/360-photo-booth-videos/video-1.mp4", poster: "/application/360-photo-booth-videos/posters/video-1.webp", alt: "360° Booth na poroki" },
      { src: "/application/360-photo-booth-videos/video-5.mp4", poster: "/application/360-photo-booth-videos/posters/video-5.webp", alt: "Mladoporočenca v slow-motion posnetku" },
      { src: "/application/360-photo-booth-videos/video-2.mp4", poster: "/application/360-photo-booth-videos/posters/video-2.webp", alt: "Gostje na platformi" },
      { src: "/application/360-photo-booth-videos/video-7.mp4", poster: "/application/360-photo-booth-videos/posters/video-7.webp", alt: "Poročna dvorana s 360° Boothom" },
      { src: "/application/360-photo-booth-videos/video-4.mp4", poster: "/application/360-photo-booth-videos/posters/video-4.webp", alt: "Deljenje videa prek QR kode" },
      { src: "/application/360-photo-booth-videos/video-6.mp4", poster: "/application/360-photo-booth-videos/posters/video-6.webp", alt: "Zabava do jutra" },
    ],
    testimonial: {
      quote: "360° Booth je dodal posebno čarobnost našemu dogodku, gostje so bili navdušeni. Priporočilo gre z veseljem naprej.",
      author: "Jure Tadina",
      role: "AutoDelta · Dogodek",
    },
    faqEyebrow: "Poročna vprašanja",
    faq: [
      { q: "Kdaj naj rezervirava termin za poroko?", a: "Poročni termini (maj–september) se zapolnijo 6–12 mesecev vnaprej. Priporočamo rezervacijo takoj po potrditvi lokacije." },
      { q: "Koliko prostora potrebuje 360° Booth?", a: "Približno 3 × 3 m in dostop do električne vtičnice. Z lokacijo se uskladimo vnaprej, postavitev traja 30–45 minut." },
      { q: "Lahko izbereva glasbo za posnetke?", a: "Da. Pred poroko uskladimo glasbo, digitalni okvir in animacije — video je popolnoma po vajinem okusu." },
      { q: "Kako gostje prejmejo svoje videe?", a: "Takoj po snemanju prek QR kode ali AirDropa, po poroki pa so vsi posnetki na voljo še v zasebni galeriji." },
      { q: "Koliko oseb gre lahko na platformo?", a: "Stabilna platforma sprejme posameznike, pare ali skupine do 4 osebe hkrati." },
    ],
    related: [
      { label: "Photo Booth za poroko", href: "/photo-booth-za-poroko" },
      { label: "360° Booth za rojstni dan", href: "/360-booth-za-rojstni-dan" },
      { label: "Vse o najemu 360° Bootha", href: "/360-photo-booth" },
    ],
  },

  "360-booth-za-rojstni-dan": {
    ...booth360Base,
    slug: "360-booth-za-rojstni-dan",
    breadcrumbLabel: "Za rojstni dan",
    eyebrow: "360° Booth za rojstni dan",
    title: "Vsak gost",
    italicWord: "svoj video",
    description:
      "360° Booth za rojstne dneve, ki jih gostje takoj delijo na Instagramu. Slow-motion, konfeti in zabava, ki se snema sama.",
    proof: "4.9/5 · 50+ dogodkov vsako leto",
    seoTitle: "360° Booth za rojstni dan — najem od 299 € | Eventaj.si",
    metaDescription:
      "360° Booth za rojstnodnevno zabavo s slow-motion videi, rekviziti in takojšnjim deljenjem prek QR kode. Od 299 €, po vsej Sloveniji.",
    keywords: ["360 Booth za rojstni dan", "360 photo booth rojstni dan", "360 video zabava", "360 booth najem", "360 booth 30. rojstni dan"],
    heroImages: [
      { src: "/application/360-photo-booth-videos/birthday-1.mp4", alt: "Slavljenec na 360° platformi s konfeti" },
      { src: "/application/360-photo-booth-videos/video-8.mp4", poster: "/application/360-photo-booth-videos/posters/video-8.webp", alt: "Prijatelji med snemanjem videa" },
      { src: "/application/360-photo-booth-videos/birthday-3.mp4", alt: "Baloni in rekviziti ob boothu" },
    ],
    reasonsEyebrow: "Zakaj na rojstni dan",
    reasonsTitle: "Zabava, pripravljena",
    reasonsItalic: "za Instagram",
    reasons: [
      { title: "Video, ki ga vsi delijo", desc: "Vsak gost prejme svoj slow-motion posnetek, pripravljen za objavo." },
      { title: "Personaliziran okvir", desc: "Ime slavljenca, letnica in barve zabave v vsakem videu." },
      { title: "Atrakcija večera", desc: "Platforma privablja goste vso noč — zabava se snema sama." },
      { title: "Neomejeno posnetkov", desc: "Brez štetja in doplačil — vsi gostje, kolikorkrat želijo." },
      { title: "Rekviziti vključeni", desc: "Očala, konfeti in dodatki, ki naredijo posnetke še bolj zabavne." },
      { title: "Galerija po zabavi", desc: "Vsi posnetki v polni ločljivosti v zasebni galeriji v 48 urah." },
    ],
    galleryImages: [
      { src: "/application/360-photo-booth-videos/birthday-2.mp4", alt: "360° Booth na rojstnodnevni zabavi" },
      { src: "/application/360-photo-booth-videos/video-2.mp4", poster: "/application/360-photo-booth-videos/posters/video-2.webp", alt: "Slavljenka v slow-motion posnetku" },
      { src: "/application/360-photo-booth-videos/birthday-4.mp4", alt: "Prijatelji na platformi" },
      { src: "/application/360-photo-booth-videos/video-9.mp4", poster: "/application/360-photo-booth-videos/posters/video-9.webp", alt: "Konfeti v zraku" },
      { src: "/application/360-photo-booth-videos/video-1.mp4", poster: "/application/360-photo-booth-videos/posters/video-1.webp", alt: "Deljenje videa prek telefona" },
      { src: "/application/360-photo-booth-videos/video-5.mp4", poster: "/application/360-photo-booth-videos/posters/video-5.webp", alt: "Zabava z rekviziti" },
    ],
    testimonial: {
      quote: "360° Booth je bil absolutni hit na najinem 30. rojstnem dnevu. Gostje so govorili, da česa tako zabavnega še niso doživeli.",
      author: "Eva in Ana",
      role: "Rojstnodnevna zabava",
    },
    faqEyebrow: "Rojstnodnevna vprašanja",
    faq: [
      { q: "Koliko prostora potrebuje 360° Booth?", a: "Približno 3 × 3 m in dostop do električne vtičnice — deluje v dvorani, gostilni ali pod šotorom." },
      { q: "Kako gostje prejmejo svoje videe?", a: "Takoj po snemanju prek QR kode ali AirDropa — video je na telefonu v nekaj sekundah." },
      { q: "Lahko video prilagodimo slavljencu?", a: "Da. Digitalni okvir, glasbo in animacije uskladimo z vami pred zabavo." },
      { q: "Koliko oseb gre lahko na platformo?", a: "Posamezniki, pari ali skupine do 4 osebe hkrati — platforma je stabilna in varna." },
      { q: "Koliko časa pred zabavo naj rezerviram?", a: "Priporočamo 2–4 mesece vnaprej, za vikende in december pa še prej." },
    ],
    related: [
      { label: "Photo Booth za rojstni dan", href: "/photo-booth-za-rojstni-dan" },
      { label: "360° Booth za poroko", href: "/360-booth-za-poroko" },
      { label: "Vse o najemu 360° Bootha", href: "/360-photo-booth" },
    ],
  },

  "360-booth-za-poslovni-dogodek": {
    ...booth360Base,
    slug: "360-booth-za-poslovni-dogodek",
    breadcrumbLabel: "Za poslovni dogodek",
    eyebrow: "360° Booth za poslovni dogodek",
    title: "Vaša znamka v",
    italicWord: "vsakem videu",
    description:
      "Premium 360° izkušnja z logotipom in barvami podjetja v vsakem posnetku. Za novoletne zabave, konference in team buildinge.",
    proof: "4.9/5 · zaupajo nam ŠKSG, AutoDelta, Forvis Mazars",
    seoTitle: "360° Booth za poslovni dogodek — najem od 299 € | Eventaj.si",
    metaDescription:
      "360° Booth za poslovne dogodke z logotipom v vsakem videu. Novoletne zabave, konference in team buildingi po vsej Sloveniji. Od 299 €.",
    keywords: ["360 Booth za poslovni dogodek", "360 photo booth podjetje", "360 booth novoletna zabava", "360 booth konferenca", "brandiran 360 booth"],
    heroImages: [
      { src: "/application/360-photo-booth-videos/poslovna-1_compressed.mp4", alt: "Ekipa na 360° platformi na poslovnem dogodku" },
      { src: "/application/360-photo-booth-videos/poslovna-9.mp4", alt: "Video z logotipom podjetja" },
      { src: "/application/360-photo-booth-videos/poslovna-4_compressed.mp4", alt: "Sodelavci med snemanjem" },
    ],
    reasonsEyebrow: "Zakaj na poslovni dogodek",
    reasonsTitle: "Premium izkušnja z",
    reasonsItalic: "vašim podpisom",
    reasons: [
      { title: "Logotip v vsakem videu", desc: "Digitalni okvir v barvah vaše znamke — vsak deljen posnetek je oglas." },
      { title: "Vsebina za družbena omrežja", desc: "Posnetki z dogodka, pripravljeni za LinkedIn, Instagram in interno komunikacijo." },
      { title: "Atrakcija, ki povezuje", desc: "Booth zbere sodelavce z vseh oddelkov — naravni ledolomilec večera." },
      { title: "Profesionalna izvedba", desc: "Točni, urejeni in diskretni — reference s poslovnih dogodkov po vsej Sloveniji." },
      { title: "Neomejeno posnetkov", desc: "Brez štetja in doplačil — vsi gostje, kolikorkrat želijo, ves večer." },
      { title: "Galerija za podjetje", desc: "Vsi posnetki v zasebni galeriji v 48 urah — za intranet ali newsletter." },
    ],
    galleryImages: [
      { src: "/application/360-photo-booth-videos/poslovna-2_compressed.mp4", alt: "360° Booth na poslovnem dogodku" },
      { src: "/application/360-photo-booth-videos/poslovna-10.mp4", alt: "Video z logotipom od blizu" },
      { src: "/application/360-photo-booth-videos/poslovna-3_compressed.mp4", alt: "Ekipa na novoletni zabavi" },
      { src: "/application/360-photo-booth-videos/poslovna-11.mp4", alt: "360° Booth na konferenci" },
      { src: "/application/360-photo-booth-videos/poslovna-5_compressed.mp4", alt: "Sodelavci med snemanjem" },
      { src: "/application/360-photo-booth-videos/poslovna-8.mp4", alt: "Postavitev bootha v dvorani" },
    ],
    testimonial: {
      quote: "360° Booth je dodal posebno čarobnost našemu dogodku, gostje so bili navdušeni. Priporočilo gre z veseljem naprej.",
      author: "Jure Tadina",
      role: "AutoDelta · Poslovni dogodek",
    },
    faqEyebrow: "Vprašanja podjetij",
    faq: [
      { q: "Ali lahko video popolnoma prilagodite naši znamki?", a: "Da. Digitalni okvir, animacije in glasbo oblikujemo po vašem CGP in pošljemo v potrditev pred dogodkom." },
      { q: "Izstavite račun podjetju?", a: "Seveda. Ponudbo in račun izstavimo na podjetje, plačilo je možno po dogodku na podlagi računa." },
      { q: "Koliko prostora potrebujete na lokaciji?", a: "Približno 3 × 3 m in električno vtičnico. Z lokacijo se uskladimo vnaprej, postavitev traja 30–45 minut." },
      { q: "Ali pokrivate dogodke po vsej Sloveniji?", a: "Da, izvajamo dogodke po celotni Sloveniji. Prevoz uskladimo glede na lokacijo in ga vključimo v ponudbo." },
      { q: "Kako dostopamo do posnetkov po dogodku?", a: "Gostje videe prejmejo takoj prek QR kode, podjetje pa vse posnetke v zasebni galeriji v 48 urah." },
    ],
    related: [
      { label: "Photo Booth za poslovni dogodek", href: "/photo-booth-za-poslovni-dogodek" },
      { label: "360° Booth za promocijo znamke", href: "/360-booth-za-promocijo" },
      { label: "Vse o najemu 360° Bootha", href: "/360-photo-booth" },
    ],
  },

  "360-booth-za-promocijo": {
    ...booth360Base,
    slug: "360-booth-za-promocijo",
    breadcrumbLabel: "Za promocijo znamke",
    eyebrow: "360° Booth za promocijo znamke",
    title: "Gostje delijo vaš brand",
    italicWord: "sami",
    description:
      "360° Booth kot magnet aktivacije — obiskovalci ustvarjajo in delijo brandirane videe, vi dobite pristno UGC vsebino z ogromnim dosegom.",
    proof: "4.9/5 · zaupajo nam ŠKSG, AutoDelta, Forvis Mazars",
    seoTitle: "360° Booth za promocijo znamke — najem od 299 € | Eventaj.si",
    metaDescription:
      "360° Booth za promocijske dogodke in aktivacije blagovnih znamk. Brandirani videi, UGC vsebina in velik družabni doseg. Od 299 €, po vsej Sloveniji.",
    keywords: ["360 Booth za promocijo", "360 booth aktivacija znamke", "360 photo booth promocija", "UGC vsebina dogodek", "brand aktivacija 360 booth"],
    heroImages: [
      { src: "/application/360-photo-booth-videos/poslovna-6.mp4", alt: "Brandiran 360° Booth na aktivaciji" },
      { src: "/application/360-photo-booth-videos/video-4.mp4", poster: "/application/360-photo-booth-videos/posters/video-4.webp", alt: "Obiskovalci med snemanjem brandiranega videa" },
      { src: "/application/360-photo-booth-videos/poslovna-12.mp4", alt: "Deljenje videa na družbenih omrežjih" },
    ],
    reasonsEyebrow: "Zakaj na promocijo",
    reasonsTitle: "UGC vsebina, ki se",
    reasonsItalic: "deli sama",
    reasons: [
      { title: "Vsak video nosi vašo znamko", desc: "Logotip, barve in animacije v vsakem posnetku, ki zapusti dogodek." },
      { title: "Pristen doseg", desc: "Obiskovalci delijo vsebino na svojih profilih — doseg, ki ga oglas ne kupi." },
      { title: "Magnet za obiskovalce", desc: "Platforma ustavi mimoidoče in podaljša čas zadrževanja ob vaši stojnici." },
      { title: "Merljiv učinek", desc: "Število posnetkov in deljenj pokaže, koliko ljudi je aktivacija zares dosegla." },
      { title: "Izvedba na ključ", desc: "Postavitev, vodenje in animiranje obiskovalcev — vaša ekipa se posveti strankam." },
      { title: "Vsa vsebina za vašo ekipo", desc: "Vsi posnetki v zasebni galeriji v 48 urah — za nadaljnjo uporabo v kampanjah." },
    ],
    galleryImages: [
      { src: "/application/360-photo-booth-videos/video-2.mp4", poster: "/application/360-photo-booth-videos/posters/video-2.webp", alt: "Brandiran 360° Booth na promocijskem dogodku" },
      { src: "/application/360-photo-booth-videos/poslovna-8.mp4", alt: "Obiskovalci na platformi" },
      { src: "/application/360-photo-booth-videos/video-6.mp4", poster: "/application/360-photo-booth-videos/posters/video-6.webp", alt: "Video z logotipom znamke" },
      { src: "/application/360-photo-booth-videos/poslovna-2_compressed.mp4", alt: "Vrsta pred boothom na aktivaciji" },
      { src: "/application/360-photo-booth-videos/video-9.mp4", poster: "/application/360-photo-booth-videos/posters/video-9.webp", alt: "Deljenje videa prek QR kode" },
      { src: "/application/360-photo-booth-videos/poslovna-3_compressed.mp4", alt: "Brandirana postavitev stojnice" },
    ],
    testimonial: {
      quote: "Najem Photo Bootha in 360° Bootha je bil vrhunec našega zaključka leta. Gostje so se zabavali ob ustvarjanju spominov, ki jih bomo lahko obujali še leta.",
      author: "Mojca Šauperl",
      role: "ŠKSG · Dogodek",
    },
    faqEyebrow: "Vprašanja o aktivacijah",
    faq: [
      { q: "Kako brandiramo izkušnjo?", a: "Digitalni okvir, animacije in glasba so v celoti po vašem CGP, booth in okolico pa lahko dodatno brandirate s svojimi materiali." },
      { q: "Ali deluje tudi na sejmih in zunanjih lokacijah?", a: "Da. Potrebujemo približno 3 × 3 m prostora in električno vtičnico — pri zunanjih lokacijah uskladimo zaščito pred vremenom." },
      { q: "Koliko obiskovalcev lahko sprejme booth?", a: "Booth ima visoko prepustnost — posnetek nastane v približno minuti, naša ekipa pa skrbi za tekočo vrsto." },
      { q: "Ali dobimo posnetke za nadaljnjo uporabo?", a: "Da, vsi posnetki so v 48 urah na voljo v zasebni galeriji in jih lahko uporabite v svojih kampanjah." },
      { q: "Izstavite račun podjetju?", a: "Seveda. Ponudbo in račun izstavimo na podjetje, plačilo je možno po dogodku na podlagi računa." },
    ],
    related: [
      { label: "360° Booth za poslovni dogodek", href: "/360-booth-za-poslovni-dogodek" },
      { label: "360° Booth za festival", href: "/360-booth-za-festival" },
      { label: "Vse o najemu 360° Bootha", href: "/360-photo-booth" },
    ],
  },

  "360-booth-za-festival": {
    ...booth360Base,
    slug: "360-booth-za-festival",
    breadcrumbLabel: "Za festival",
    eyebrow: "360° Booth za festivale in koncerte",
    title: "Magnet za",
    italicWord: "množice",
    description:
      "360° Booth za festivale in koncerte — visoka prepustnost, brandirani videi in družabni doseg, ki traja še dolgo po zadnjem nastopu.",
    proof: "4.9/5 · 50+ dogodkov vsako leto",
    seoTitle: "360° Booth za festival — najem od 299 € | Eventaj.si",
    metaDescription:
      "360° Booth za festivale in koncerte z visoko prepustnostjo in ogromnim družabnim dosegom. Brandirani slow-motion videi. Od 299 €, po vsej Sloveniji.",
    keywords: ["360 Booth za festival", "360 photo booth koncert", "360 booth festival najem", "festival aktivacija", "360 video koncert"],
    heroImages: [
      { src: "/application/360-photo-booth-videos/video-7.mp4", poster: "/application/360-photo-booth-videos/posters/video-7.webp", alt: "Množica pred 360° Boothom na festivalu" },
      { src: "/application/360-photo-booth-videos/poslovna-11.mp4", alt: "Obiskovalci pod odrskimi lučmi" },
      { src: "/application/360-photo-booth-videos/video-9.mp4", poster: "/application/360-photo-booth-videos/posters/video-9.webp", alt: "Snemanje 360° videa v mraku" },
    ],
    reasonsEyebrow: "Zakaj na festival",
    reasonsTitle: "Doseg, ki preživi",
    reasonsItalic: "zadnji nastop",
    reasons: [
      { title: "Visoka prepustnost", desc: "Posnetek nastane v minuti — booth sprejme stotine obiskovalcev na večer." },
      { title: "Ogromen družabni doseg", desc: "Vsak deljen video nosi ime festivala — obiskovalci so vaš medij." },
      { title: "Atrakcija med nastopi", desc: "Booth zapolni premore in obiskovalce zadrži na prizorišču." },
      { title: "Brandirani posnetki", desc: "Logotip festivala ali sponzorja v vsakem videu — prostor za partnerje." },
      { title: "Robustna izvedba", desc: "Profesionalna oprema in ekipa, vajena večjih prireditev in zunanjih postavitev." },
      { title: "Vsa vsebina po dogodku", desc: "Vsi posnetki v zasebni galeriji v 48 urah — za promocijo naslednje izvedbe." },
    ],
    galleryImages: [
      { src: "/application/360-photo-booth-videos/video-3.mp4", poster: "/application/360-photo-booth-videos/posters/video-3.webp", alt: "360° Booth na festivalu" },
      { src: "/application/360-photo-booth-videos/birthday-4.mp4", alt: "Množica pod odrskimi lučmi" },
      { src: "/application/360-photo-booth-videos/video-8.mp4", poster: "/application/360-photo-booth-videos/posters/video-8.webp", alt: "Obiskovalci na platformi" },
      { src: "/application/360-photo-booth-videos/poslovna-10.mp4", alt: "Vrsta pred boothom" },
      { src: "/application/360-photo-booth-videos/video-1.mp4", poster: "/application/360-photo-booth-videos/posters/video-1.webp", alt: "Snemanje v večernem vzdušju" },
      { src: "/application/360-photo-booth-videos/video-5.mp4", poster: "/application/360-photo-booth-videos/posters/video-5.webp", alt: "Brandiran video festivala" },
    ],
    testimonial: {
      quote: "360° Booth je dodal posebno čarobnost našemu dogodku, gostje so bili navdušeni. Priporočilo gre z veseljem naprej.",
      author: "Jure Tadina",
      role: "AutoDelta · Dogodek",
    },
    faqEyebrow: "Vprašanja organizatorjev",
    faq: [
      { q: "Koliko obiskovalcev lahko sprejme booth?", a: "Posnetek nastane v približno minuti, zato booth na večer sprejme več sto obiskovalcev. Naša ekipa skrbi za tekočo vrsto." },
      { q: "Ali deluje na prostem?", a: "Da. Potrebujemo ravno podlago, približno 3 × 3 m prostora, elektriko in zaščito pred dežjem — podrobnosti uskladimo z organizatorjem." },
      { q: "Lahko v video vključimo sponzorje?", a: "Seveda. Digitalni okvir lahko nosi logotip festivala, sponzorja ali oboje — odlična aktivacijska površina za partnerje." },
      { q: "Kako obiskovalci prejmejo videe?", a: "Takoj prek QR kode ali AirDropa — video je na telefonu v nekaj sekundah, pripravljen za objavo." },
      { q: "Ali ponujate najem za več dni?", a: "Da, za festivale pripravimo ponudbo po meri glede na trajanje in program prireditve." },
    ],
    related: [
      { label: "360° Booth za promocijo znamke", href: "/360-booth-za-promocijo" },
      { label: "360° Booth za poslovni dogodek", href: "/360-booth-za-poslovni-dogodek" },
      { label: "Vse o najemu 360° Bootha", href: "/360-photo-booth" },
    ],
  },
};

export const photoEventCards = [
  {
    size: "large" as const,
    title: "Poroke",
    desc: "Personalizirani tiski, spominska knjiga s posvetili in fotografije, ki ostanejo še dolgo po poroki.",
    cta: "Photo booth za poroko",
    href: "/photo-booth-za-poroko",
    image: { src: "/application/wedding-photos/poroka-3.webp", alt: "Mladoporočenca s tiskano fotografijo pred boothom" },
  },
  {
    size: "large" as const,
    title: "Poslovni dogodki",
    desc: "Vaš logotip na vsaki fotografiji. Za novoletne zabave, team buildinge in konference.",
    cta: "Photo Booth za poslovne dogodke",
    href: "/photo-booth-za-poslovni-dogodek",
    image: { src: "/application/primeri/forvis-mazars-primer.webp", alt: "Ekipa na novoletni zabavi z logotipom podjetja na tisku" },
  },
  {
    size: "small" as const,
    title: "Rojstni dnevi",
    desc: "Fotografije, smeh in spomini, ki ostanejo še dolgo po praznovanju.",
    cta: "Za rojstni dan",
    href: "/photo-booth-za-rojstni-dan",
    image: { src: "/application/birthday-parties/birthday-4.webp", alt: "Prijatelji z rekviziti in konfeti" },
  },
  {
    size: "small" as const,
    title: "Obletnice",
    desc: "Abraham, zlata poroka, 50 let — trenutki, ki si zaslužijo papir.",
    cta: "Za obletnico",
    href: "/photo-booth-za-obletnico",
    image: { src: "/application/hero-collage/sanja-50.webp", alt: "Jubilant z družino" },
  },
] as const;

export const booth360EventCards = [
  {
    title: "Poroke",
    desc: "Slow-motion posnetek, ki ga delita še leta.",
    cta: "360 booth za poroko",
    href: "/360-booth-za-poroko",
    image: { src: "/application/360-photo-booth-videos/poroka-2_compressed.mp4", alt: "Prvi ples v slow-motion posnetku" },
  },
  {
    title: "Rojstni dnevi",
    desc: "Vsak gost svoj video, pripravljen za Instagram.",
    cta: "Za rojstni dan",
    href: "/360-booth-za-rojstni-dan",
    image: { src: "/application/360-photo-booth-videos/birthday-2.mp4", alt: "Konfeti in baloni na rojstnodnevni zabavi" },
  },
  {
    title: "Poslovni dogodki",
    desc: "Premium izkušnja z logotipom v vsakem videu.",
    cta: "Za poslovni dogodek",
    href: "/360-booth-za-poslovni-dogodek",
    image: { src: "/application/360-photo-booth-videos/poslovna-5_compressed.mp4", alt: "Ekipa z logotipom v videu" },
  },
  {
    title: "Promocije znamk",
    desc: "Gostje delijo vaš brand sami — pristna UGC vsebina.",
    cta: "Za promocijo",
    href: "/360-booth-za-promocijo",
    image: { src: "/application/360-photo-booth-videos/poslovna-12.mp4", alt: "Brandiran booth na aktivaciji" },
  },
  {
    title: "Festivali in koncerti",
    desc: "Magnet za množice z ogromnim dosegom.",
    cta: "Za festival",
    href: "/360-booth-za-festival",
    image: { src: "/application/360-photo-booth-videos/video-8.mp4", poster: "/application/360-photo-booth-videos/posters/video-8.webp", alt: "Množica pod odrskimi lučmi" },
  },
] as const;

export const homeEventTeasers = [
  { label: "Poroka", href: "/photo-booth-za-poroko", image: { src: "/application/wedding-photos/poroka-2.webp", alt: "Photo Booth na poroki" } },
  { label: "Rojstni dan", href: "/photo-booth-za-rojstni-dan", image: { src: "/application/birthday-parties/birthday-6.webp", alt: "Rojstnodnevna zabava" } },
  { label: "Poslovni dogodek", href: "/photo-booth-za-poslovni-dogodek", image: { src: "/application/busniess-booths/poslovna-1.webp", alt: "Poslovni dogodek" } },
  { label: "Promocija znamke", href: "/360-booth-za-promocijo", image: { src: "/application/photo-booth-hero/kelag-2026.webp", alt: "Promocija blagovne znamke" } },
  { label: "Festival", href: "/360-booth-za-festival", image: { src: "/application/photo-booth-hero/robis-tomorrowland.webp", alt: "Festival" } },
] as const;
