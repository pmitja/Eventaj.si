export const guideBaseUrl = "https://www.eventaj.si";

export type GuideSummary = {
  slug: string;
  eyebrow: string;
  label: string;
  teaser: string;
  readMinutes: number;
  updated: string;
  /** Slugs linked from this guide's "Preberite še" block, in order. */
  related: readonly string[];
};

/** Index of every /nasveti page. Drives the hub, related links and the sitemap. */
export const guides = [
  {
    slug: "koliko-stane-najem-photo-bootha",
    eyebrow: "Cene",
    label: "Koliko stane najem photo bootha",
    teaser:
      "Od 250 do 500 € za večer. Kaj vpliva na ceno, kaj je običajno vključeno in kje se pojavijo doplačila.",
    readMinutes: 7,
    updated: "2026-08-30",
    related: ["foto-box-photo-booth-foto-stojnica", "photo-booth-ali-qr-galerija"],
  },
  {
    slug: "foto-box-photo-booth-foto-stojnica",
    eyebrow: "Razlaga",
    label: "Foto box, photo booth ali foto stojnica",
    teaser:
      "V Sloveniji se za isto stvar uporablja pet imen. Kaj katero pomeni in kje se izvedbe res razlikujejo.",
    readMinutes: 5,
    updated: "2026-08-30",
    related: ["koliko-stane-najem-photo-bootha", "360-booth-ali-photo-booth"],
  },
  {
    slug: "360-booth-ali-photo-booth",
    eyebrow: "Primerjava",
    label: "360 booth ali klasični photo booth",
    teaser:
      "360 booth naredi kratek video, klasični photo booth tiskano fotografijo. Razlike, cene in koliko prostora potrebujeta.",
    readMinutes: 5,
    updated: "2026-08-30",
    related: ["koliko-stane-najem-photo-bootha", "foto-box-photo-booth-foto-stojnica"],
  },
  {
    slug: "kako-zbrati-fotografije-gostov-na-poroki",
    eyebrow: "Vodnik",
    label: "Kako zbrati fotografije gostov na poroki",
    teaser:
      "Hashtag, skupni Google album, WhatsApp, USB ali QR galerija. Kaj v praksi deluje in kje vsak način razpade.",
    readMinutes: 6,
    updated: "2026-08-30",
    related: ["qr-koda-za-fotografije", "photo-booth-ali-qr-galerija"],
  },
  {
    slug: "qr-koda-za-fotografije",
    eyebrow: "Razlaga",
    label: "QR koda za fotografije z dogodka",
    teaser:
      "Kaj QR koda sploh zna, zakaj brezplačen generator ni dovolj, v kakšni velikosti tiskati in katere napake se ponavljajo.",
    readMinutes: 5,
    updated: "2026-08-30",
    related: ["kako-zbrati-fotografije-gostov-na-poroki", "photo-booth-ali-qr-galerija"],
  },
  {
    slug: "photo-booth-ali-qr-galerija",
    eyebrow: "Primerjava",
    label: "Photo booth ali QR galerija",
    teaser:
      "Photo booth od 279 €, QR galerija 35 €. Kaj dela vsaka storitev, kdaj zadošča ena sama in zakaj ju pogosto vzamejo skupaj.",
    readMinutes: 5,
    updated: "2026-08-30",
    related: ["koliko-stane-najem-photo-bootha", "360-booth-ali-photo-booth"],
  },
] as const satisfies readonly GuideSummary[];

/** Widened view of `guides`, so lookups return GuideSummary and not a literal. */
const guideList: readonly GuideSummary[] = guides;

export function getGuide(slug: string): GuideSummary {
  const guide = guideList.find((item) => item.slug === slug);
  if (!guide) throw new Error(`Unknown guide slug: ${slug}`);
  return guide;
}

/**
 * The two guides linked at the foot of a page. Explicit per guide so the
 * internal linking stays deliberate instead of growing with every new page.
 */
export function relatedGuides(currentSlug: string): readonly GuideSummary[] {
  const current = guideList.find((guide) => guide.slug === currentSlug);
  const picked = (current?.related ?? []).flatMap((slug) => {
    const match = guideList.find((guide) => guide.slug === slug);
    return match ? [match] : [];
  });
  if (picked.length > 0) return picked;
  return guideList.filter((guide) => guide.slug !== currentSlug).slice(0, 2);
}

/* ---------------------------------------------------------------------------
 * Stran 4 — Kako zbrati fotografije gostov na poroki
 * ------------------------------------------------------------------------ */

export const weddingPhotoMethods = [
  {
    number: "01",
    title: "Hashtag na Instagramu",
    body: "Deluje samo za goste, ki objavljajo, in samo dokler je njihov profil javen. Dobite obdelane in obrezane kadre, originalov nikoli. Brezplačno, a od stotih gostov jih objavi peščica.",
  },
  {
    number: "02",
    title: "Skupni album v Google Fotografijah",
    body: "Brezplačno in ljudem znano. Zatakne se pri vstopu: gost mora imeti Google račun in sprejeti povabilo. Del gostov obtiči na prijavi in odneha, starejši gostje skoraj vsi. Če se za to odločite, pošljite povabilo teden dni prej, ne na dan poroke.",
  },
  {
    number: "03",
    title: "Skupina na WhatsAppu",
    body: "Najhitrejše za postavitev in najslabše za kakovost. WhatsApp fotografije stisne, videe še bolj. Za gledanje na telefonu je v redu, za tiskanje ne. Skupina se tudi hitro spremeni v klepet in fotografije se izgubijo med sporočili.",
  },
  {
    number: "04",
    title: "USB ključek ali škatla ob izhodu",
    body: "Lepo zamišljeno, v praksi prazno. Do konca večera nihče ne preklaplja datotek s telefona na ključek.",
  },
] as const;

export const weddingPhotoComparison = {
  head: ["Način", "Cena", "Kaj dobite", "Kje razpade"],
  rows: [
    {
      method: "Hashtag",
      price: "0 €",
      gain: "Obdelane objave",
      breaks: "Le nekaj gostov objavi",
      highlight: false,
    },
    {
      method: "Google album",
      price: "0 €",
      gain: "Originali",
      breaks: "Potreben račun in povabilo",
      highlight: false,
    },
    {
      method: "WhatsApp",
      price: "0 €",
      gain: "Stisnjene datoteke",
      breaks: "Neuporabno za tisk",
      highlight: false,
    },
    {
      method: "USB ključek",
      price: "~10 €",
      gain: "Skoraj nič",
      breaks: "Nihče ga ne uporabi",
      highlight: false,
    },
    {
      method: "QR galerija",
      price: "35 €",
      gain: "Originali, videi, voščila",
      breaks: "Ni brezplačno",
      highlight: true,
    },
  ],
} as const;

export const weddingPhotoTips = [
  {
    title: "Navodilo na vsako mizo",
    body: "Ena tabla ob vratih je do večerje pozabljena. Postavite navodilo na vsako mizo, ne samo na vhod.",
  },
  {
    title: "Naj voditelj to omeni",
    body: "Deset sekund v govoru voditelja ali priče poveča odziv bolj kot katerakoli tabla.",
  },
  {
    title: "Napišite, kaj naj naložijo",
    body: "»Naloži svoje fotografije z najine poroke« deluje bolje kot »skeniraj kodo«.",
  },
  {
    title: "Preverite na dveh telefonih",
    body: "Na iPhonu in na Androidu, preden natisnete štirideset stojal.",
  },
  {
    title: "Ne računajte na signal",
    body: "V dvorani ga pogosto ni. Vprašajte za wi-fi in geslo napišite poleg kode.",
  },
] as const;

/* ---------------------------------------------------------------------------
 * Stran 5 — QR koda za fotografije z dogodka
 * ------------------------------------------------------------------------ */

export const qrCodeRequirements = [
  "Stran, ki se odpre brez računa in brez namestitve",
  "Dovolj prostora, tudi za videe, ki so precej večji od fotografij",
  "Prenos originalov, ne stisnjenih različic",
  "Administracijo, kjer vsebine vidite, prenesete in urejate",
] as const;

export const qrCodeSteps = [
  {
    number: "01",
    title: "Ustvarite galerijo dogodka",
    body: "Vpišete ime in datum dogodka. Galerija je s tem pripravljena na prve fotografije.",
  },
  {
    number: "02",
    title: "Prenesete kodo",
    body: "SVG za tisk in PNG za zaslone. Isto kodo uporabite povsod.",
  },
  {
    number: "03",
    title: "Kodo postavite na dogodek",
    body: "V mizno stojalo, na welcome tablo ali na vabilo.",
  },
  {
    number: "04",
    title: "Preizkusite jo",
    body: "Na dveh telefonih, preden gre v tisk.",
  },
] as const;

export const qrCodePrintRules = [
  {
    title: "Mizno stojalo",
    body: "4 do 5 cm je dovolj, ker gost skenira z razdalje pol metra.",
  },
  {
    title: "Welcome tabla ali roll-up",
    body: "Vsaj 10 cm, sicer je z dveh metrov ne ujame.",
  },
  {
    title: "Vedno iz SVG",
    body: "PNG se pri povečavi razpade in koda postane neberljiva.",
  },
  {
    title: "Temna koda na svetli podlagi",
    body: "Obratno pogosto ne deluje, tudi če je videti bolje.",
  },
] as const;

export const qrCodeMistakes = [
  {
    title: "Koda samo ob vhodu",
    body: "Do večerje jo vsi pozabijo.",
  },
  {
    title: "Koda brez navodila",
    body: "»Skeniraj« ni razlog, »naloži svoje fotografije« je.",
  },
  {
    title: "Koda na fotografiji ali vzorcu",
    body: "Kontrast pade in kamera odneha.",
  },
  {
    title: "Koda, preizkušena samo na enem telefonu",
    body: "Preverite na iPhonu in Androidu.",
  },
] as const;

/* ---------------------------------------------------------------------------
 * Stran 6 — Photo booth ali QR galerija
 * ------------------------------------------------------------------------ */

export const serviceComparison = {
  head: ["", "Photo booth", "QR galerija"],
  rows: [
    { label: "Cena", booth: "od 279 €", gallery: "35 €" },
    { label: "Kaj gost odnese", booth: "Tiskano fotografijo", gallery: "Povezavo do galerije" },
    { label: "Kje nastajajo posnetki", booth: "V kotičku", gallery: "Povsod v prostoru" },
    { label: "Oprema in osebje", booth: "Da, pripeljemo mi", gallery: "Ne, samo natisnjena koda" },
    { label: "Videi in glasovna voščila", booth: "360° Booth za videe", gallery: "Vključeno" },
    { label: "Kaj ostane po dogodku", booth: "Datoteke iz bootha", gallery: "Galerija in ZIP z originali" },
  ],
} as const;

export const serviceVerdicts = [
  {
    title: "Kdaj zadošča samo QR galerija",
    body: "Manjši dogodek do kakih šestdeset gostov, omejen proračun, ali prostor, kjer preprosto ni kam postaviti kotička. Tudi kadar vas zanimajo predvsem fotografije, ne pa program.",
  },
  {
    title: "Kdaj se splača photo booth",
    body: "Več kot šestdeset gostov, dolg večer in želja po točki, ob kateri se ljudje ustavijo. Tiskana fotografija, ki jo gost odnese domov, je še vedno nekaj, česar noben telefon ne nadomesti.",
  },
  {
    title: "Zakaj ju pari največkrat vzamejo skupaj",
    body: "Ker pokrivata dva različna dela večera. Booth naredi urejene fotografije z rekviziti, galerija pa vse, kar se zgodi pri mizah, na plesišču in ob dveh zjutraj. Skupaj stane 35 € več kot sam booth.",
  },
] as const;

/* ---------------------------------------------------------------------------
 * Stran 7 — Koliko stane najem photo bootha
 * ------------------------------------------------------------------------ */

/** Mirrors the packages in content/eventaj/data.ts. Keep the two in step. */
export const guidePricing = {
  head: ["Paket", "Trajanje", "Cena"],
  rows: [
    { name: "Basic", duration: "2 uri", price: "279 €", muted: false },
    { name: "Standard", duration: "3 ure", price: "329 €", muted: false },
    { name: "Premium", duration: "4 ure", price: "379 €", muted: false },
    { name: "Dodatna ura", duration: "na uro", price: "+50 €", muted: false },
    { name: "360° Booth", duration: "od 2 uri", price: "od 299 €", muted: true },
    { name: "QR galerija", duration: "cel dogodek", price: "35 €", muted: true },
  ],
} as const;

/* ---------------------------------------------------------------------------
 * Stran 9 — 360 booth ali klasični photo booth
 * ------------------------------------------------------------------------ */

export const boothComparison = {
  head: ["", "Photo booth", "360° Booth"],
  rows: [
    { label: "Rezultat", booth: "Tiskana fotografija", booth360: "Kratek video v počasnem posnetku" },
    { label: "Cena od", booth: "279 € za 2 uri", booth360: "299 € za 2 uri" },
    { label: "Dodatna ura", booth: "+50 €", booth360: "+80 €" },
    { label: "Potreben prostor", booth: "2,5 × 2 m", booth360: "3 × 3 m" },
    { label: "Koliko ljudi hkrati", booth: "Skupina", booth360: "Do 4 na ploščadi" },
    { label: "Kje konča", booth: "V roki in v galeriji", booth360: "Na telefonu in omrežjih" },
  ],
} as const;

export const priceFactors = [
  {
    number: "01",
    title: "Število ur",
    body: "Dve uri sta kratek termin. Pokrijeta čas med večerjo in začetkom plesa, ko gostje še sedijo za mizami in imajo voljo do fotografiranja. Štiri ure pokrijejo večer do pozne noči, ko nastanejo najbolj sproščene fotografije. Nizka cena v oglasu skoraj vedno govori o najkrajšem terminu. Preverite, koliko ur je v njej, preden jo primerjate z našo.",
  },
  {
    number: "02",
    title: "Tisk",
    body: "Tu se skriva največ denarja. Neomejeno tiskanje pomeni, da vsak gost odnese svojo fotografijo, kolikorkrat gre v booth. Omejeno tiskanje pomeni številko izpisov, po kateri se doplačuje na kos. Ta številka se na dogodku s sto gosti porabi hitreje, kot pričakujete, ker isti ljudje pridejo večkrat in ker si vsaka skupina želi svoj izvod. Če v ponudbi piše samo \"tiskanje vključeno\", zahtevajte številko. Pri nas je tiskanje neomejeno.",
  },
  {
    number: "03",
    title: "Prisotnost ekipe",
    body: "Samopostrežni booth je cenejši, ker ga ponudnik pripelje, postavi in odide. To deluje, dokler se ne zatakne papir, dokler se otroci ne igrajo z rekviziti in dokler nekdo ne prekine kabla. Nekdo mora ves večer skrbeti za napravo, in če to niste vi, mora biti ponudnik. Če v ponudbi ne piše izrecno, da je ekipa prisotna ves čas najema, običajno ni.",
  },
  {
    number: "04",
    title: "Prevoz",
    body: "Pogosto ni vštet v ceno, čeprav na prvi strani ponudbe to ni napisano. Izven Ljubljane in Maribora se razdalja hitro pozna. Vprašajte dvoje. Do katere razdalje je prevoz vključen in koliko stane vsak kilometer čez to mejo. Odgovor na ti dve vprašanji je pogosto razlika med najcenejšo in najdražjo ponudbo na vaši mizi.",
  },
  {
    number: "05",
    title: "Personalizacija okvirja",
    body: "Okvir z imeni, datumom ali logotipom je pri nekaterih ponudnikih vključen, pri drugih je doplačilo. Gre za eno grafično pripravo pred dogodkom, ki se opravi enkrat. Vprašajte, ali je v ceni in ali dobite predlog v potrditev pred dogodkom, ali pa rezultat prvič vidite na natisnjeni fotografiji.",
  },
  {
    number: "06",
    title: "Digitalna galerija",
    body: "Vprašanje ni samo, ali fotografije dobite, ampak kdaj in v kakšni obliki. Nekateri ponudniki jih pošljejo v nekaj dneh, drugi šele čez več tednov, tretji jih zaračunajo posebej. Tiskana fotografija ostane na hladilniku. Digitalna gre v objave in med goste, dokler se dogodka še spominjajo. Pri nas prejmete galerijo najkasneje v 48 urah.",
  },
] as const;

export const priceQuestions = [
  "Je tiskanje neomejeno ali omejeno na določeno število izpisov?",
  "Je prevoz vštet v ceno in do katere razdalje?",
  "Je ekipa prisotna ves čas najema ali je booth samopostrežen?",
  "Koliko traja postavitev in ali se šteje v čas najema?",
  "Kdaj prejmem fotografije in v kakšni obliki?",
  "Kaj se zgodi ob odpovedi ali prestavitvi termina?",
] as const;

/* ---------------------------------------------------------------------------
 * Stran 8 — Foto box, photo booth ali foto stojnica
 * ------------------------------------------------------------------------ */

export const boothNames = [
  {
    number: "01",
    title: "Photo booth",
    body: "Izvirni angleški izraz in ime, ki ga uporablja največ ponudnikov pri nas. V slovenščini se ne sklanja lepo, zato ga ljudje v govoru pogosto skrajšajo ali zamenjajo z domačo različico.",
  },
  {
    number: "02",
    title: "Foto box in fotobox",
    body: "Prišla sta iz nemškega govornega prostora, kjer je Fotobox uveljavljena beseda. Ljudje ju pogosto vpišejo v iskalnik, ker sta krajša in ju je lažje izgovoriti. Zapisujeta se skupaj in narazen, oboje je v rabi in oboje pomeni isto.",
  },
  {
    number: "03",
    title: "Foto stojnica",
    body: "Poudarja postavitev. Naprava stoji sama zase v prostoru, ima svoje mesto in mizo z rekviziti. Ime pove več o postavitvi kot o tehniki v njej.",
  },
  {
    number: "04",
    title: "Foto kotiček",
    body: "Namiguje na prostor z ozadjem in rekviziti, ne nujno na napravo. Nekateri s tem izrazom mislijo samo kos stene z dekoracijo, brez fotoaparata in brez tiskalnika. Če vidite to ime, preverite, ali je oprema sploh vključena v ceno.",
  },
  {
    number: "05",
    title: "Foto kabina",
    body: "Najbližja starim zaprtim kabinam z zaveso, kakršne so stale na železniških postajah. Danes tako pri nas dela malo ponudnikov. Izraz je ostal, oprema za njim pa se je spremenila.",
  },
] as const;

export const boothDifferences = [
  {
    title: "Fotoaparat",
    body: "DSLR ali tablica. Razlika je vidna takoj, sploh v zatemnjeni dvorani pozno zvečer. Tablica da uporabno fotografijo pri dobri svetlobi in šumno fotografijo pri slabi. Če ponudba ne pove, kaj je v ohišju, vprašajte.",
  },
  {
    title: "Tiskalnik",
    body: "Ali gost odnese fotografijo domov ali dobi samo povezavo. To najbolj določa, kaj od večera ostane. Natisnjena fotografija konča na hladilniku, povezava konča med neodprtimi obvestili.",
  },
  {
    title: "Odprta ali zaprta postavitev",
    body: "Odprta sprejme osem ljudi naenkrat, tudi če kdo privleče stol. Zaprta sprejme dva do tri. Za poroko in poslovni dogodek je odprta skoraj vedno boljša izbira, zaprta pa ima svoj čar na manjših zabavah.",
  },
  {
    title: "Prisotnost ekipe",
    body: "Nekdo, ki vabi ljudi, ureja rekvizite in menja papir, naredi večjo razliko kot znamka naprave. Tu se skriva razlog, zakaj so nekatere ponudbe izrazito cenejše. Opremo pripeljejo, postavijo in odidejo. Ko se papir zatakne, ni nikogar, ki bi to rešil, in gostje se naprave nehajo dotikati.",
  },
] as const;

export const boothSpaceRules = [
  {
    title: "Tla",
    body: "360 booth stoji na ploščadi, na katero gostje stopijo. Tla morajo biti ravna in trda. Trava, pesek in nagnjen pod v šotoru odpadejo.",
  },
  {
    title: "Vtičnica",
    body: "Prostih 3 × 3 m nam ne koristi, če je najbližji priključek čez plesišče. Kabla ne smemo vleči čez pot gostov.",
  },
  {
    title: "Kaj visi nad prostorom",
    body: "Roka se vrti nad glavami gostov. Nizki lestenci, obešene dekoracije in tramovi tam ne smejo biti. Če niste prepričani, nam pošljite fotografijo prostora.",
  },
  {
    title: "Prostor za vrsto",
    body: "Navedena kvadratura velja za napravo. Ob njej potrebujete še nekaj metrov, sicer vrsta stoji na plesišču.",
  },
] as const;

export const boothVerdicts = [
  {
    title: "Kdaj se splača 360 booth",
    body: "Vzemite ga, kadar je družba mlajša in kadar imate odprt prostor. Na poroki dela najbolje pozno zvečer, ko se ples začne. Postavite ga blizu plesišča, a ne na pot do šanka. Kjer 3 × 3 m proste površine ni, 360 booth odsvetujemo. Ne gre za dober ali slab dogodek, gre za prostor.",
  },
  {
    title: "Kdaj se splača klasični photo booth",
    body: "Vzemite ga, kadar bo družba mešana. Babice, otroci, sodelavci in prijatelji. Vsi vedo, kaj naj naredijo pred fotoaparatom, nikomur ni treba stopiti na ploščad pred očmi cele dvorane. Za rekvizite prime vsakdo, ne glede na leta. Naprava potrebuje tudi manj prostora, 2,5 × 2 m zadošča, zato gre v skoraj vsako dvorano.",
  },
  {
    title: "Kdaj se splača oboje",
    body: "Pri več kot sto gostih in večeru, daljšem od štirih ur, se en booth zamaši. Vrsta zraste, ljudje odnehajo in se vrnejo na plesišče. Dva bootha to razbremenita in pokrijeta dve različni želji. Postavite ju na različna konca prostora, sicer tekmujeta za iste goste. Po naši izkušnji pri manj kot osemdesetih gostih dveh ne potrebujete. Izberite enega in raje dodajte uro.",
  },
] as const;
