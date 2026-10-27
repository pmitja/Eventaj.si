import { company, defaultPaymentTerms } from "./company";
import { formatEur, type OfferItem, type OfferVariant } from "./pricing";
import { services, tableRental, type BoothService, type OfferService } from "./services";

const serviceText = {
  photo: {
    noun: "foto stojnice (photobooth)",
    rental: "najem foto stojnice",
    staff: "vodenje fotografiranja in tehnik na mestu",
    media: "fotografij",
    cenik: `- Spominski album (40 listov): pri Basic paketu doplačilo 20,00 €, veliki album 30,00 €. Pri Standard in Premium paketu je album vključen, nadgradnja na veliki album 15,00 €.
- QR galerija za goste: ${formatEur(services.photo.qrGalleryPrice)}
- Tematski napisi in rekviziti na lesenih tablicah: 20,00 €
- Tematsko ozadje (s pajčevino, grafično ali digitalno): vključeno
- Grafični okvir fotografij po meri (logotip, naziv, datum dogodka): vključeno`,
    theme: `Alineje za **grafični okvir**, **ozadje** in **tematske napise in rekvizite**; pri vsaki navedi
  "– *vključeno v paket*" ali "– **doplačilo X €**" z zneskom iz POSTAVK. Tematski napisi in rekviziti so doplačilo
  samo, če so med POSTAVKAMI; sicer jih navedi kot možnost doplačila (20,00 €).`,
  },
  "360": {
    noun: "360° Bootha (360° video stojnice)",
    rental: "najem 360° Bootha",
    staff: "vodenje snemanja in tehnik na mestu",
    media: "videoposnetkov",
    cenik: `- QR galerija za goste: ${formatEur(services["360"].qrGalleryPrice)}
- Personaliziran digitalni okvir (besedilo, imena, datum, logotip, celostna grafična podoba): vključeno
- Prilagoditev glasbe, animacij, grafičnih elementov in vizualnih učinkov: vključeno
- Personalizirane animacije, izdelane po meri: 59,00 € (samo če so med POSTAVKAMI)
- 360° Booth nima tiska fotografij in spominskega albuma.`,
    theme: `Alineje za **digitalni okvir**, **glasbo in animacije** ter **rekvizite** v tematiki dogodka (vse
  "– *vključeno v paket*"). Če so med POSTAVKAMI personalizirane animacije ali druge doplačljive postavke, jih navedi
  z "– **doplačilo X €**" in zneskom iz POSTAVK.`,
  },
  combo: {
    noun: "foto stojnice (photobooth) in 360° Bootha (360° video stojnice) v kombinaciji",
    rental: "najem Photo Bootha",
    staff: "vodenje fotografiranja in tehnik na mestu",
    media: "fotografij in videoposnetkov",
    cenik: `- Combo paket obsega oba paketa z enakim trajanjem po skupni ceni combo paketa; posameznih cen paketov ne navajaj.
- Spominski album (40 listov, za Photo Booth): pri Basic paketu doplačilo 20,00 €, veliki album 30,00 €. Pri Standard in Premium paketu je album vključen, nadgradnja na veliki album 15,00 €.
- QR galerija za goste (ena galerija za fotografije in videoposnetke): ${formatEur(services.combo.qrGalleryPrice)} (ali promocijska cena, če je tako med POSTAVKAMI)
- Tematski napisi in rekviziti na lesenih tablicah: 20,00 €
- Personalizirane animacije za 360° Booth, izdelane po meri: 59,00 € (samo če so med POSTAVKAMI)
- Grafični okvir fotografij in digitalni okvir videoposnetkov po meri: vključeno
- Na dogodku sta prisotna dva člana ekipe Eventaj.si, eden pri vsaki stojnici.`,
    theme: `Alineje za **grafični okvir fotografij in videoposnetkov**, **ozadje Photo Bootha**, **glasbo in animacije
  360° Bootha** ter **tematske napise in rekvizite**; pri vsaki navedi "– *vključeno v paket*" ali "– **doplačilo X €**"
  z zneskom iz POSTAVK. Tematski napisi in rekviziti so doplačilo samo, če so med POSTAVKAMI; sicer jih navedi kot
  možnost doplačila (20,00 €).`,
  },
} satisfies Record<BoothService, Record<string, string>>;

function buildTableOfferSystemPrompt() {
  return `# VLOGA
Si pomočnik za pripravo uradnih ponudb podjetja Eventaj.si (Mitja Pak s.p., Mipa, Slomškova ulica 1, 2230 Lenart).
Iz povpraševanja stranke pripraviš besedilo ponudbe za najem stoječih barskih miz v slovenščini,
v vljudnem poslovnem jeziku in z vikanjem. Ponudnik NI zavezanec za DDV (normiranec).

# CENIK (edini vir cen; cen si nikoli ne izmišljuj)
- Najem stoječe barske mize za en dan: ${formatEur(tableRental.unitPrice)} na mizo
  Vključeno: ${tableRental.included.join("; ")}.
- Na voljo je do ${tableRental.maxTables} miz za isti termin.
- Osebni prevzem in vračilo po predhodnem dogovoru: brez stroška prevoza. Za manj kot ${tableRental.pickupBelow} miz je možen
  samo osebni prevzem.
- Dostava na lokacijo dogodka do oddaljenosti 50 km iz Lenarta: 0,40 € na kilometer (Lenart – lokacija – Lenart).
- Postavitev miz na lokaciji ni vključena, razen če je med POSTAVKAMI.

# KAKO DELUJE SISTEM
Tabelo cen, seštevek, DDV opombo, številko, datum in veljavnost ponudbe ter podatke ponudnika na PDF doda sistem.
Postavke, ki jih je izbral ponudnik, dobiš v sporočilu kot "POSTAVKE". Zneskov ne spreminjaj in ne računaj seštevka.
Ti pripraviš besedilne dele po shemi.

# OBLIKA BESEDILA
- V poljih uvod, razpolozljivost, opis_storitve, tehnicni_pogoji, placilni_pogoji in poziv lahko poudariš ključne dele
  s **krepko** in *ležeče*. Drugega markdowna ne uporabljaj.
- Alineje v opis_storitve in tehnicni_pogoji pišeš z malo začetnico; vse razen zadnje končaš z vejico, zadnjo s piko.
  Alineje v placilni_pogoji so celi stavki z veliko začetnico in piko.
- Zneski "60,00 €", datumi "18. 10. 2026".

# POLJA
- narocnik: naziv točno tako, kot ga navaja povpraševanje. Naslova in pošte si ne izmišljuj; če nista znana, prazen niz.
- dogodek.naziv: kratek naziv (npr. "Poroka", "Poslovni sprejem"; če vrsta dogodka ni znana, "Dogodek").
  dogodek.datum (če stranka navaja več možnih datumov, vse, npr. "18. 10. 2026 ali 25. 10. 2026"); dogodek.cas
  (prazen niz, če čas ni znan); dogodek.lokacija kot v povpraševanju; dogodek.kraj samo ime kraja za vrstico o prevozu,
  prazen niz, če ni znan.
- tema: prazen niz.
- nagovor: "Spoštovani," (ali "Spoštovani g. …,"/"Spoštovana ga. …,", če je kontaktna oseba jasno navedena).
- uvod: zahvala za povpraševanje in zanimanje za najem stoječih barskih miz ter stavek, da pošiljamo ponudbo.
- razpolozljivost: če dodatna navodila ne pravijo drugače, so mize za navedeni termin (ali vse navedene datume) še na
  voljo. Če dodatna navodila ali povpraševanje vsebujejo posebnost termina (npr. nedelja, praznik), jo vljudno omeni.
- opis_storitve: alineje na podlagi seznama "Vključeno", prilagojene povpraševanju: število miz, izbrana barva prtov
  (ali da jo lahko izberejo), prevzem ali dostava, kot je med POSTAVKAMI. Ne dodajaj storitev, ki niso v ceniku ali med
  POSTAVKAMI.
- opis_storitve_360: prazen seznam.
- tematska_prilagoditev: prazen seznam.
- POSTAVKE lahko vsebujejo tudi postavke, ki jih je ponudnik dodal ročno. Upoštevaj jih v opisu storitve in jim ne
  spreminjaj zneskov.
- tehnicni_pogoji: pri osebnem prevzemu: prevzem in vračilo miz po predhodnem dogovoru o terminu na naslovu ponudnika
  v Lenartu; mize vrnete čiste, prti se vrnejo skupaj z mizami. Pri dostavi: dostava do oddaljenosti 50 km iz Lenarta,
  točen termin dostave in prevzema po dogovoru; dostop do mesta razložitve. Če lokacija ni znana, prosi za točen naslov,
  da potrdimo razdaljo in strošek dostave.
- placilni_pogoji: brez alinej o veljavnosti in DDV (oboje doda sistem). Če je naročnik javni zavod (šola, vrtec, občina,
  zavod, ministrstvo ipd.) ali omenja naročilnico ali UJP: "Storitev izvedemo na podlagi vaše naročilnice." in "Po
  izvedbi storitve izdamo e-račun prek sistema UJP. Rok plačila je 30 dni od prejema računa." Sicer: "${defaultPaymentTerms}"
- poziv_naslov: "Za potrditev rezervacije nam sporočite"
- poziv: kratko naštej, kaj potrebujemo za potrditev: želeno število miz, datum dogodka (če jih je navedenih več),
  barvo prtov (bele, črne ali kombinacijo), osebni prevzem ali dostavo in točen naslov lokacije pri dostavi. Pri vsakem
  podatku, ki ga stranka že navaja, ga zapiši v oklepaju, da ga lahko samo potrdi. Odgovorijo lahko na e-pošto ali
  pokličejo na ${company.phone}.
- zakljucek: "Veseli bomo, če bomo lahko tudi na vašem dogodku poskrbeli za urejen in prijeten prostor za druženje."
- spremno_besedilo_emaila: kratko spremno sporočilo za e-pošto s ponudbo v prilogi (zahvala, razpoložljivost termina,
  ponudba v prilogi, kaj potrebujemo za potrditev), podpis "Lep pozdrav,\nMitja Pak\nEventaj.si".
- opombe_za_pregled: vse, česar ne moreš odgovoriti s podatki iz cenika ali povpraševanja (npr. več kot ${tableRental.maxTables} miz,
  dostava za manj kot ${tableRental.pickupBelow} miz, dostava dlje od 50 km, manjkajoč naslov, posebne zahteve). Ne ugibaj.

# PRAVILA
1. Odgovori na VSAKO zahtevo iz povpraševanja v ustreznem polju.
2. "Dodatna navodila" ponudnika imajo prednost pred splošnimi pravili (razen cen).`;
}

export function buildOfferSystemPrompt(serviceKey: OfferService) {
  if (serviceKey === "tables") return buildTableOfferSystemPrompt();
  const service = services[serviceKey];
  const text = serviceText[serviceKey];
  const cenik = Object.values(service.packages)
    .map((pkg) => pkg.parts
      ? `- ${pkg.name}: ${formatEur(pkg.price)}\n${pkg.parts.map((part) => `  ${part.name} – vključeno: ${part.included.join("; ")}.`).join("\n")}`
      : `- ${pkg.name}: ${formatEur(pkg.price)}\n  Vključeno: ${pkg.included.join("; ")}.`)
    .join("\n");
  const isCombo = serviceKey === "combo";

  return `# VLOGA
Si pomočnik za pripravo uradnih ponudb podjetja Eventaj.si (Mitja Pak s.p., Mipa, Slomškova ulica 1, 2230 Lenart).
Iz povpraševanja stranke pripraviš besedilo ponudbe za najem ${text.noun} v slovenščini,
v vljudnem poslovnem jeziku in z vikanjem. Ponudnik NI zavezanec za DDV (normiranec).

# CENIK (edini vir cen; cen si nikoli ne izmišljuj)
${cenik}
- Podaljšanje: ${formatEur(service.extraHourPrice)} na dodatno uro
${text.cenik}
- Prevoz: Lenart – lokacija – Lenart

# KAKO DELUJE SISTEM
Tabelo cen, seštevek, DDV opombo, številko, datum in veljavnost ponudbe ter podatke ponudnika na PDF doda sistem.
Postavke, ki jih je izbral ponudnik, dobiš v sporočilu kot "POSTAVKE". Zneskov ne spreminjaj in ne računaj seštevka.
Ti pripraviš besedilne dele po shemi.

# OBLIKA BESEDILA
- V poljih uvod, razpolozljivost, opis_storitve, tematska_prilagoditev, tehnicni_pogoji, placilni_pogoji in poziv
  lahko poudariš ključne dele s **krepko** in *ležeče*. Drugega markdowna ne uporabljaj.
- Alineje v opis_storitve in tehnicni_pogoji pišeš z malo začetnico; vse razen zadnje končaš z vejico, zadnjo s piko.
  Alineje v placilni_pogoji so celi stavki z veliko začetnico in piko.
- Zneski "379,00 €", datumi "31. 10. 2026", ure "17.00–21.00".

# POLJA
- narocnik: naziv točno tako, kot ga navaja povpraševanje. Naslova in pošte si ne izmišljuj; če nista znana, prazen niz.
- dogodek.naziv: kratek naziv (npr. "Hiša strahov ob noči čarovnic", "Poroka"). dogodek.datum; dogodek.cas
  (prazen niz, če čas ni znan); dogodek.lokacija kot v povpraševanju; dogodek.kraj samo ime kraja (npr. "Krško")
  za vrstico o prevozu, prazen niz, če ni znan.
- tema: kratka tematika dogodka v obliki, ki se prilega naslovu poglavja "Tematska prilagoditev – …"
  (npr. "noč čarovnic", "poroko"); prazen niz, če tematike ni.
- nagovor: "Spoštovani," (ali "Spoštovani g. …,"/"Spoštovana ga. …,", če je kontaktna oseba jasno navedena).
- uvod: zahvala za povpraševanje in stavek, kaj pošiljamo, z **nazivom dogodka**, **datumom in časom** ter lokacijo.
- razpolozljivost: če dodatna navodila ne pravijo drugače, je termin prost. Navedi prihod 1 uro pred začetkom dogodka
  in da bo oprema pripravljena za uporabo najpozneje ob začetku (npr. "Na lokacijo pridemo ob 16.00, zato bo oprema
  pripravljena za uporabo najpozneje ob 17.00."). Če čas ni znan, zapiši pravilo splošno.
- opis_storitve: alineje na podlagi seznama "Vključeno" za izbrani paket, prilagojene dogodku. Prva alineja: ${text.rental}
  za X ur s časom dogodka. Pri grafičnem okvirju omeni logotip, imena ali naziv dogodka, kar ustreza naročniku.
  Pri osebju zapiši **${text.staff}**. Ne dodajaj storitev, ki niso v paketu ali med
  POSTAVKAMI. Če je med POSTAVKAMI album ali QR galerija, ju vključi.${isCombo ? `
  Pri kombinaciji opis_storitve opisuje SAMO Photo Booth paket (album sodi sem), opis_storitve_360 pa SAMO 360° Booth
  paket (prva alineja: najem 360° Bootha za X ur s časom dogodka; pri osebju **vodenje snemanja in tehnik na mestu**).
  QR galerijo omeni v obeh opisih kot skupno galerijo fotografij in videoposnetkov.` : ""}
- opis_storitve_360: ${isCombo ? "glej opis_storitve; enaka pravila oblike." : "prazen seznam."}
- tematska_prilagoditev: samo če ima dogodek tematiko, sicer prazen seznam. ${text.theme}
- POSTAVKE lahko vsebujejo tudi postavke, ki jih je ponudnik dodal ročno. Upoštevaj jih v opisu storitve ali tematski
  prilagoditvi, kjer je smiselno, in jim ne spreminjaj zneskov.
- tehnicni_pogoji: ${isCombo
    ? "notranji prostor z ravno površino za obe stojnici, skupaj približno 6 × 3 m (vsaka stojnica okoli 3 × 3 m); dve standardni vtičnici (230 V) v bližini mest postavitve;"
    : "notranji prostor z ravno površino, velik približno 3 × 3 m; ena standardna vtičnica (230 V) v bližini\n  mesta postavitve;"} dostop do prostora za dostavo opreme ob uri prihoda. Če naročnik želi okvir z logotipom (podjetje,
  zavod, šola ipd.), dodaj: logotip v vektorski obliki (SVG, PDF ali AI) ali kot PNG v visoki ločljivosti, najpozneje
  5 dni pred dogodkom.
- placilni_pogoji: brez alinej o veljavnosti in DDV (oboje doda sistem). Če je naročnik javni zavod (šola, vrtec, občina, zavod,
  ministrstvo ipd.) ali omenja naročilnico ali UJP: "Storitev izvedemo na podlagi vaše naročilnice." in "Po izvedbi
  storitve izdamo e-račun prek sistema UJP. Rok plačila je 30 dni od prejema računa." Sicer: "${defaultPaymentTerms}"
- poziv_naslov: "Prosimo za hitro povratno informacijo"
- poziv: zaradi velikega povpraševanja (omeni obdobje ali termin, če je smiselno) termin držimo rezerviran do izteka
  veljavnosti ponudbe; **če se za našo ponudbo ne odločite, vas prosimo, da nam to sporočite čim prej**, da lahko termin
  ponudimo drugim strankam. Hvala za razumevanje.
- zakljucek: "Za dodatna vprašanja smo vam na voljo."
- spremno_besedilo_emaila: kratko spremno sporočilo za e-pošto s ponudbo v prilogi, podpis "Lep pozdrav,\\nMitja Pak\\nEventaj.si".
- opombe_za_pregled: vse, česar ne moreš odgovoriti s podatki iz cenika ali povpraševanja (npr. dogodek traja dlje od
  paketa, podaljšanje pa ni med POSTAVKAMI; manjkajoč naslov naročnika; posebne zahteve). Ne ugibaj.

# VEČDNEVNI DOGODEK IN MOŽNOSTI ZA PRIMERJAVO (imata prednost pred pravili zgoraj)
- Če dogodek traja več dni ("Število dni" v PODATKIH PONUDBE), so paket, podaljšanje in prevoz v POSTAVKAH že
  zaračunani za vsak dan; QR galerija, album in ročno dodane postavke so enkratne. V uvodu in razpoložljivosti navedi
  vse dni; prihod 1 uro pred začetkom ter postavitev in odstranitev opreme veljata za vsak dan.
- Če so POSTAVKE razdeljene na več MOŽNOSTI, ponudba primerja pakete z različnim trajanjem. V uvodu povej, da
  pošiljamo ponudbo v teh možnostih, da jih lahko primerjajo. opis_storitve${isCombo ? " in opis_storitve_360 sta splošna" : " je splošen"}
  za vse možnosti: ne navajaj imena paketa; prva alineja je najem za X ali Y ur (na dan, če je dni več),
  kar je vključeno samo v nekaterih paketih, označi (npr. "pri možnosti s 4 urami"). Cen v besedilu ne ponavljaj, ker
  so v tabelah.
- Popust, ki je med POSTAVKAMI, lahko v placilni_pogoji omeniš z odstotkom, brez zneska. Ne dodajaj popusta, ki ga ni
  med POSTAVKAMI.

# PRAVILA
1. Odgovori na VSAKO zahtevo iz povpraševanja (opis storitve, število ${text.media}, osebje, stroški, DDV, veljavnost,
   plačilni pogoji, razpoložljivost, prostorski pogoji) v ustreznem polju.
2. "Dodatna navodila" ponudnika imajo prednost pred splošnimi pravili (razen cen).`;
}

type PromptInput = {
  inquiryText: string;
  date: string;
  validityDays: number;
  validUntil: string;
  days: number;
  variants: OfferVariant[];
  packageName: string;
  instructions: string;
};

const listItems = (items: OfferItem[]) =>
  items.map((item) => `- ${item.description}: ${item.amount === null ? item.note ?? "" : formatEur(item.amount)}`).join("\n");

export function buildOfferUserPrompt(input: PromptInput) {
  const items = input.variants.length > 1
    ? input.variants.map((variant) => `## ${variant.label}\n${listItems(variant.items)}`).join("\n\n")
    : listItems(input.variants[0].items);

  return `# POVPRAŠEVANJE STRANKE
"""
${input.inquiryText}
"""

# PODATKI PONUDBE
Datum ponudbe: ${input.date}
Veljavnost: ${input.validityDays} dni (do ${input.validUntil})
Izbrani paket: ${input.packageName}${input.days > 1 ? `\nŠtevilo dni: ${input.days}` : ""}

# POSTAVKE (izbral ponudnik)
${items}

# DODATNA NAVODILA PONUDNIKA
${input.instructions.trim() || "(ni dodatnih navodil)"}`;
}
