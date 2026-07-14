export const standingTable = {
  id: "standing-table",
  slug: "najem-stojecih-miz",
  name: "Stoječa barska miza",
  eyebrow: "Oprema za dogodke · Mize",
  shortDescription:
    "Elegantna in praktična rešitev za sprejeme, pogostitve, poroke in poslovne dogodke.",
  description:
    "Ustvari prijeten prostor za druženje, pijačo in pogovor. Vsaki mizi lahko dodaš bel ali črn prt, ki je že vključen v ceno najema.",
  price: 10,
  priceLabel: "10 € / mizo / dan",
  available: 15,
  duration: "1 dan",
  delivery: {
    maxDistanceKm: 75,
    pricePerKm: 0.4,
    priceLabel: "0,40 €/km",
  },
  clothColors: ["Bel prt", "Črn prt"] as const,
  images: [
    {
      src: "/application/oprema/stojeca-miza/beli-prt.webp",
      alt: "Stoječa barska miza za najem z belim prtom",
    },
    {
      src: "/application/oprema/stojeca-miza/crni-prt.webp",
      alt: "Stoječa barska miza za najem s črnim prtom",
    },
    {
      src: "/application/oprema/stojeca-miza/dogodek.webp",
      alt: "Bele in črne stoječe barske mize na elegantnem dogodku",
    },
  ],
} as const;

export const equipmentProducts = [standingTable] as const;

export const equipmentFaq = [
  {
    q: "Kako poteka najem opreme?",
    a: "Izberi izdelek, vnesi želeno količino, datum in lokacijo dogodka. Preverimo razpoložljivost ter ti pošljemo ponudbo z vsemi podrobnostmi.",
  },
  {
    q: "Kako preverim, ali je oprema na voljo?",
    a: "Razpoložljivost je vezana na datum in želeno količino. Pošlji kratko povpraševanje, mi pa preverimo zalogo in se ti oglasimo v najkrajšem času.",
  },
  {
    q: "Ali sta možna osebni prevzem in dostava?",
    a: "Da. Izbereš lahko osebni prevzem ali dostavo do največ 75 km. Dostava se obračuna po ceni 0,40 €/km, končno razdaljo in strošek pa potrdimo v ponudbi.",
  },
  {
    q: "Lahko opremo kombiniram z drugimi storitvami Eventaj?",
    a: "Seveda. Če želiš opremo združiti s Photo Boothom ali 360° Boothom, to zapiši v opombe povpraševanja in pripravili bomo skupno ponudbo.",
  },
] as const;

export const standingTableFaq = [
  {
    q: "Koliko miz je na voljo?",
    a: "Na voljo je do 15 stoječih miz. Razpoložljivost za izbrani datum preverimo po prejemu povpraševanja.",
  },
  {
    q: "Ali je prt vključen v ceno?",
    a: "Da. Pri vsaki mizi lahko izbereš bel ali črn prt, ki je vključen v ceno enodnevnega najema.",
  },
  {
    q: "Ali lahko kombiniram bele in črne prte?",
    a: "Seveda. V opombe povpraševanja zapiši želeno razmerje, na primer šest belih in štiri črne prte.",
  },
  {
    q: "Kako potekata prevzem in dostava?",
    a: "V povpraševanju izberi osebni prevzem ali dostavo. Dostava je možna do največ 75 km in se obračuna po ceni 0,40 €/km. Končno razdaljo, strošek in termin dostave potrdimo v ponudbi.",
  },
  {
    q: "Za kakšne dogodke so mize primerne?",
    a: "Najpogosteje se uporabljajo na porokah, poslovnih dogodkih, sprejemih, praznovanjih in pogostitvah, kjer gostom ponudijo prijetno točko za druženje.",
  },
  {
    q: "Kdaj je rezervacija potrjena?",
    a: "Po oddanem povpraševanju preverimo število prostih miz za tvoj datum. Rezervacija je potrjena, ko prejmeš našo potrditev.",
  },
] as const;
