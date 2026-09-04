export type EquipmentOption = { label: string; price?: number; priceDelta?: number };

export type EquipmentProduct = {
  id: string;
  slug: string;
  name: string;
  eyebrow: string;
  heading: [string, string];
  shortDescription: string;
  description: string;
  status: string;
  cardNote: string;
  price: number;
  priceLabel: string;
  priceSubtitle: string;
  pricingMode: "fixed" | "per-unit";
  fulfillmentMode: "post" | "transport";
  quantity?: { label: string; min: number; max?: number; defaultValue: number; unit: string };
  quantityTiers?: ReadonlyArray<{ min: number; unitPrice: number }>;
  selectors?: ReadonlyArray<{ label: string; options: ReadonlyArray<EquipmentOption>; note?: string }>;
  calculationLabel: string;
  deliveryText: string;
  cta: string;
  finePrint: string;
  includedSubtitle: string;
  included: ReadonlyArray<string>;
  useCasesTitle: string;
  useCases: ReadonlyArray<{ title: string; text: string }>;
  helpTitle: string;
  helpText: string;
  faq: ReadonlyArray<{ q: string; a: string }>;
  seoTitle: string;
  seoDescription: string;
  sku: string;
  availability: "LimitedAvailability" | "PreOrder";
  images: ReadonlyArray<{ src: string; alt: string; fit?: "cover" | "contain" }>;
};

export const standingTable: EquipmentProduct = {
  id: "standing-table", slug: "najem-stojecih-miz", name: "Stoječa barska miza", eyebrow: "Oprema za dogodke · Mize", heading: ["Najem stoječih", "barskih miz."],
  shortDescription: "Stoječa miza za sprejem, pogostitev ali zabavo. Bel ali črn prt je vključen.",
  description: "Ustvari prostor za pijačo, prigrizke in pogovor. Vsaki mizi lahko dodaš bel ali črn prt, ki je že vključen v ceno najema.",
  status: "Na voljo 15", cardNote: "Bel ali črn prt vključen", price: 10, priceLabel: "10 €", priceSubtitle: "na mizo za 1 dan", pricingMode: "per-unit", fulfillmentMode: "transport",
  quantity: { label: "Količina", min: 1, max: 15, defaultValue: 1, unit: "miz" },
  selectors: [{ label: "Barva prta", options: [{ label: "Bel prt" }, { label: "Črn prt" }], note: "Želiš kombinacijo? Razmerje barv zapiši v opombe." }],
  calculationLabel: "Informativna cena najema", deliveryText: "Dostava je možna do 75 km in se obračuna 0,40 €/km.", cta: "Preveri razpoložljivost", finePrint: "Brez obveznosti. Termin in logistiko potrdimo v ponudbi.",
  includedSubtitle: "Vse bistveno za urejeno postavitev", included: ["Stoječa barska miza", "Najem za en dan", "Bel ali črn prt po izbiri", "Možnost kombiniranja barv", "Do 15 miz za isti termin"],
  useCasesTitle: "Več prostora za druženje.", useCases: [
    { title: "Sprejemi in pogostitve", text: "Točka za pijačo, prigrizke in sproščen pogovor." },
    { title: "Poroke in praznovanja", text: "Uporabne so pri aperitivu, druženju ali večernem delu dogodka." },
    { title: "Poslovni dogodki", text: "Praktična postavitev za mreženje, predstavitve in interne dogodke." },
  ],
  helpTitle: "Potrebuješ pomoč pri količini?", helpText: "Sporoči število gostov in tip dogodka. Pomagali ti bomo oceniti število miz ter uskladiti dostavo.",
  faq: [
    { q: "Koliko miz je na voljo?", a: "Na voljo je do 15 stoječih miz. Razpoložljivost preverimo po prejemu povpraševanja." },
    { q: "Ali je prt vključen v ceno?", a: "Da. Pri vsaki mizi lahko izbereš bel ali črn prt." },
    { q: "Ali lahko kombiniram bele in črne prte?", a: "Da. Želeno razmerje zapiši v opombe povpraševanja." },
    { q: "Kako se obračuna prevoz?", a: "Prevoz se obračuna posebej po 0,40 €/km do 75 km." },
    { q: "Za kakšne dogodke so mize primerne?", a: "Za poroke, poslovne dogodke, sprejeme, praznovanja in pogostitve." },
    { q: "Kdaj je rezervacija potrjena?", a: "Rezervacija je potrjena ob prejemu predplačila." },
  ],
  seoTitle: "Najem stoječih barskih miz – 10 €/dan | Eventaj.si", seoDescription: "Najem stoječih barskih miz po 10 € na mizo za en dan. Bel ali črn prt je vključen, na voljo je do 15 miz.", sku: "EVENTAJ-STOJ-MIZA", availability: "LimitedAvailability",
  images: [
    { src: "/application/oprema/stojeca-miza/beli-prt.webp", alt: "Stoječa barska miza za najem z belim prtom" },
    { src: "/application/oprema/stojeca-miza/crni-prt.webp", alt: "Stoječa barska miza za najem s črnim prtom" },
    { src: "/application/oprema/stojeca-miza/dogodek.webp", alt: "Bele in črne stoječe barske mize na dogodku" },
  ],
};

const products: EquipmentProduct[] = [];

products.push({
  id: "welcome-sign", slug: "tabla-dobrodoslice", name: "Tabla dobrodošlice", eyebrow: "Oprema za dogodke · Dobrodošlica", heading: ["Najem", "table dobrodošlice."],
  shortDescription: "Prva stvar, ki jo gost vidi na lokaciji. Z imeni, datumom in po želji potekom dneva.",
  description: "Tabla 60 × 90 cm z vajinima imenoma in datumom, na beli ali ogledalni podlagi. Črno kovinsko stojalo je vključeno v ceno.",
  status: "Na voljo 4", cardNote: "Stojalo vključeno", price: 29, priceLabel: "29 €", priceSubtitle: "za dan dogodka, s stojalom", pricingMode: "fixed", fulfillmentMode: "post",
  selectors: [
    { label: "Izvedba", options: [{ label: "Bela podlaga" }, { label: "Ogledalna podlaga" }] },
    { label: "Namen", options: [{ label: "Najem", price: 29 }, { label: "Nakup po meri", price: 59 }, { label: "Nakup dvodelne", price: 79 }], note: "Pri nakupu stojalo posodimo brezplačno. Varščino 30 € vrnemo ob vračilu." },
  ],
  calculationLabel: "Izbrana tabla", deliveryText: "Pošiljanje po pošti je na voljo. Poštnina se obračuna posebej.", cta: "Preveri termin", finePrint: "Osnutek prejmeš v 48 urah. Dva popravka sta brezplačna.",
  includedSubtitle: "Vse za urejen sprejem gostov", included: ["Tabla 60 × 90 cm, dibond ali pleksi", "Črno kovinsko stojalo, višina 150 cm", "Oblikovanje z vajinima imenoma in datumom", "Bela ali ogledalna podlaga", "Zaščitna embalaža za pošiljanje"],
  useCasesTitle: "Da gostje vedo, kje so in kdaj je večerja.", useCases: [
    { title: "Sprejem gostov", text: "Postavljena pri vhodu ali ob aperitivu gostom potrdi, da so na pravem naslovu." },
    { title: "Potek dneva", text: "Dvodelna izvedba ima na desni strani urnik z obredom, aperitivom, večerjo in prvim plesom." },
    { title: "Poslovni dogodki", text: "Za konference in odprtja namesto imen dodamo logotip in program." },
  ],
  helpTitle: "Nisi prepričan, katera izvedba?", helpText: "Če tablo želita obdržati, se nakup splača že pri prvem dogodku. Če je namenjena enemu dnevu, vzemi najem.",
  faq: [
    { q: "Ali je stojalo vključeno v ceno?", a: "Da, pri najemu je v ceni. Pri nakupu ga posodimo proti varščini 30 €, ki jo vrnemo ob vračilu." },
    { q: "Koliko časa prej moram naročiti?", a: "Za najem zadošča 14 dni. Za tablo po meri potrebujemo 30 dni." },
    { q: "Ali lahko uporabim svoje barve in pisavo?", a: "Pri nakupu po meri da. Pri najemu izbiraš med belo in ogledalno podlago." },
    { q: "Kaj če se poroka zamakne in urnik ne drži?", a: "Priporočamo približne ure, saj se urnik dogodka pogosto zamakne." },
    { q: "Ali tabla zdrži zunaj?", a: "Da, dibond in pleksi sta odporna proti dežju. Ob močnejšem vetru stojalo obtežimo." },
    { q: "Kdaj je rezervacija potrjena?", a: "Ko potrdiš osnutek in prejmemo predplačilo." },
  ],
  seoTitle: "Tabla dobrodošlice za poroko – najem ali nakup | Eventaj.si", seoDescription: "Najem ali izdelava table dobrodošlice 60 × 90 cm z imeni in datumom. Bela ali ogledalna izvedba, stojalo vključeno.", sku: "EVENTAJ-TABLA-DOBRODOSLICE", availability: "LimitedAvailability", images: [
    { src: "/application/oprema/tabla-dobrodoslice/tabla-dobrodoslice-crno-bela-program.webp", alt: "Črno-bela dvodelna tabla dobrodošlice z urnikom poročnega dne na kovinskem stojalu", fit: "contain" },
    { src: "/application/oprema/tabla-dobrodoslice/tabla-dobrodoslice-bela-program.webp", alt: "Bela poročna tabla dobrodošlice z imenoma, datumom in programom dneva", fit: "contain" },
    { src: "/application/oprema/tabla-dobrodoslice/tabla-dobrodoslice-prozorna-stojalo.webp", alt: "Prozorna poročna tabla dobrodošlice z belim napisom na črnem kovinskem stojalu", fit: "contain" },
  ],
});

products.push({
  id: "table-numbers", slug: "stevilke-miz", name: "Številke miz", eyebrow: "Oprema za dogodke · Sedežni red", heading: ["Najem", "številk za mize."],
  shortDescription: "Akrilne številke z ogledalnim licem, visoke 20 cm. Berljive so z drugega konca dvorane.",
  description: "Izrezane so iz 5 mm akrila, z ogledalno zlato ali srebrno številko na prozorni podlagi. Vsaka stoji na svojem podstavku.",
  status: "Na voljo 30", cardNote: "Podstavek vključen", price: 1.9, priceLabel: "1,90 €", priceSubtitle: "na mizo za 1 dan", pricingMode: "per-unit", fulfillmentMode: "post",
  quantity: { label: "Število miz", min: 8, max: 30, defaultValue: 12, unit: "miz" },
  selectors: [
    { label: "Barva", options: [{ label: "Zlata" }, { label: "Srebrna" }, { label: "Prozorna" }] },
    { label: "Izvedba", options: [{ label: "Najem", price: 1.9 }, { label: "Personalizirano, v last", price: 6.9 }] },
  ],
  calculationLabel: "Informativni izračun", deliveryText: "Pošiljanje po pošti je na voljo. Poštnina se obračuna posebej.", cta: "Preveri termin", finePrint: "Najmanjše naročilo je 8 miz. Ob najemu Photo Bootha je cena 1 € na mizo.",
  includedSubtitle: "Komplet, ki ga samo postaviš na mizo", included: ["Številke po tvoji izbiri od 1 naprej", "Akrilni podstavek pri vsaki številki", "Zlata, srebrna ali prozorna izvedba", "Višina številke 20 cm", "Pakiranje za pošiljanje"],
  useCasesTitle: "Da gostje najdejo svojo mizo brez spraševanja.", useCases: [
    { title: "Poroke", text: "Gost prebere ime na sedežnem redu, poišče številko in sede brez dodatnega usmerjanja." },
    { title: "Poslovne večerje", text: "Številke pomagajo pri sedežih, razporejenih po ekipah, oddelkih ali podjetjih." },
    { title: "Personalizirana različica", text: "Pod številko dodamo vajini imeni in datum. Komplet po dogodku ostane vama." },
  ],
  helpTitle: "Ne veš, koliko miz boš imel?", helpText: "Povej nam okvirno število gostov in razporeditev, pa ti izračunamo. Število lahko spremeniš do 14 dni pred dogodkom brez doplačila.",
  faq: [
    { q: "Koliko številk imate na voljo?", a: "Do 30 za en termin. Če potrebuješ več, javi vsaj mesec prej." },
    { q: "So podstavki vključeni?", a: "Da, vsaka številka ima svoj podstavek." },
    { q: "Ali lahko dobim številke z imeni?", a: "Da, personalizirana izvedba stane 6,90 € na mizo in po dogodku ostane vama." },
    { q: "Ali so številke dovolj velike?", a: "Številka je visoka 20 cm in berljiva z nasprotnega konca dvorane." },
    { q: "Kaj če se število miz spremeni?", a: "Do 14 dni prej ga lahko spremeniš brez doplačila. Pozneje je sprememba odvisna od zaloge." },
    { q: "Kako prejmem številke miz?", a: "Pošljemo jih po pošti. Poštnina se obračuna posebej." },
  ],
  seoTitle: "Najem številk miz za poroko – od 1,90 € | Eventaj.si", seoDescription: "Akrilne številke miz z zlatim, srebrnim ali prozornim licem in podstavki. Najem od 1,90 € na mizo, do 30 številk.", sku: "EVENTAJ-STEVILKE-MIZ", availability: "LimitedAvailability", images: [
    { src: "/application/oprema/stevilke-mize/stevilka-mize-zlata.webp", alt: "Akrilna številka za poročno mizo z zlatim ogledalnim napisom in podstavkom" },
    { src: "/application/oprema/stevilke-mize/stevilka-mize-srebrna.webp", alt: "Akrilna številka za poročno mizo s srebrnim ogledalnim napisom in podstavkom" },
    { src: "/application/oprema/stevilke-mize/stevilka-mize-prozorna.webp", alt: "Prozorna akrilna številka za poročno mizo s podstavkom" },
  ],
});

products.push({
  id: "place-names", slug: "imena-za-na-kroznik", name: "Imena za na krožnik", eyebrow: "Oprema za dogodke · Personalizacija", heading: ["Izdelava", "imen za na krožnik."],
  shortDescription: "Izrezano ime gosta iz naravnega ali belo barvanega lesa. Po dogodku ga gost odnese domov.",
  description: "Vsako ime izrežemo posebej iz 3 mm vezanega lesa. Izbiraš med naravno in belo izvedbo ter tremi pisavami, preizkušenimi tudi na dolgih imenih.",
  status: "Izdelava 14 dni", cardNote: "Najmanj 40 kosov", price: 1.9, priceLabel: "1,90 €", priceSubtitle: "za kos, v last", pricingMode: "per-unit", fulfillmentMode: "post",
  quantity: { label: "Količina", min: 40, max: 300, defaultValue: 100, unit: "imen" },
  selectors: [
    { label: "Izvedba", options: [{ label: "Bela" }, { label: "Navadna" }] },
    { label: "Pisava", options: [{ label: "Pisana" }, { label: "Tiskana" }, { label: "Serifna" }] },
  ],
  calculationLabel: "Informativni izračun", deliveryText: "Pošiljanje po pošti je na voljo. Poštnina se obračuna posebej.", cta: "Pošlji povpraševanje", finePrint: "Seznam imen pošlji najpozneje 30 dni pred dogodkom. Pet odstotkov nadmere dodamo brezplačno.",
  includedSubtitle: "Pripravljeno za razporeditev po mizah", included: ["Izrez posameznega imena", "Bela ali navadna lesena izvedba", "Izbira med tremi pisavami", "5 % nadmere brez doplačila", "Sortirano po mizah, če pošlješ sedežni red", "Pakiranje za pošiljanje"],
  useCasesTitle: "Namesto kartončka, ki ga nihče ne obdrži.", useCases: [
    { title: "Sedežni red", text: "Ime položiš na krožnik ali ga prisloniš ob kozarec. Gost takoj ve, kje sedi." },
    { title: "Darilce za goste", text: "Gost ga po dogodku odnese domov kot osebni spominek." },
    { title: "Poslovne večerje", text: "Dodamo lahko ime in priimek, ime podjetja ali funkcijo gosta." },
  ],
  helpTitle: "Imaš dolg seznam gostov?", helpText: "Pošlji ga v Excelu ali Google Sheetu. Če pošlješ še sedežni red, imena zapakiramo po mizah.",
  faq: [
    { q: "Kako pošljem imena?", a: "V Excelu, Google Sheetu ali navadnem seznamu. Šumnike uredimo mi, preveri pa pravilen zapis imen." },
    { q: "Kaj če se gostje dodajo po oddaji seznama?", a: "Pet odstotkov nadmere dodamo brezplačno. Dodatne kose izdelamo po isti ceni, če je do dogodka še vsaj 14 dni." },
    { q: "Se dolga imena odlomijo?", a: "Ne. Pisave so preizkušene na dolgih imenih, črke pa povežemo tako, da ime drži obliko." },
    { q: "Ali lahko dobim vzorec pred naročilom?", a: "Da, vzorčni kos stane 5 €. Znesek odštejemo od naročila." },
    { q: "Kakšno je najmanjše naročilo?", a: "Najmanjše naročilo je 40 kosov." },
    { q: "Kdaj moram naročiti?", a: "Najpozneje 30 dni prej. Poznejše naročilo je možno z doplačilom 25 %, če imamo prost termin." },
  ],
  seoTitle: "Lesena imena za na krožnik po meri | Eventaj.si", seoDescription: "Personalizirana lesena imena gostov za na krožnik v beli ali naravni izvedbi. Za sedežni red in darilce, izdelava od 40 kosov po 1,90 €.", sku: "EVENTAJ-IMENA-KROZNIK", availability: "PreOrder", images: [
    { src: "/application/oprema/kroznik/belo-ime-za-na-kroznik.webp", alt: "Belo leseno ime gosta Luka na modrem poročnem krožniku", fit: "contain" },
    { src: "/application/oprema/kroznik/naravno-leseno-ime-za-na-kroznik.webp", alt: "Naravno leseno ime gosta Luka na modrem poročnem krožniku", fit: "contain" },
  ],
});

products.push({
  id: "guest-book-frame", slug: "knjiga-gostov-v-okvirju", name: "Knjiga gostov v okvirju", eyebrow: "Oprema za dogodke · Knjiga gostov", heading: ["Knjiga gostov", "v obliki srca ali drevesa."],
  shortDescription: "Gostje podpišejo leseno ploščico in jo spustijo v okvir, ki ga po dogodku obesita na steno.",
  description: "Personaliziran brezov okvir 50 × 50 cm s pleksi sprednjo stranjo. Gost napiše voščilo na leseno ploščico in jo skozi režo spusti v okvir.",
  status: "Izdelava 21 dni", cardNote: "Personalizacija vključena", price: 175, priceLabel: "od 175 €", priceSubtitle: "personaliziran komplet, v last", pricingMode: "fixed", fulfillmentMode: "post",
  selectors: [
    { label: "Oblika", options: [{ label: "Srce" }, { label: "Drevo življenja" }] },
    { label: "Barva okvirja", options: [{ label: "Naravna breza" }, { label: "Temni oreh", priceDelta: 15 }] },
    { label: "Število ploščic", options: [{ label: "150 kosov", price: 175 }, { label: "200 kosov", price: 200 }] },
  ],
  calculationLabel: "Izbrani komplet", deliveryText: "Pošiljanje po pošti je na voljo. Poštnina se obračuna posebej.", cta: "Pošlji povpraševanje", finePrint: "Gravura imen in datuma je v ceni. Osnutek prejmeš v 48 urah.",
  includedSubtitle: "Komplet, ki ga samo postaviš na mizo pri vhodu", included: ["Personaliziran okvir 50 × 50 cm z lesenim stojalom", "150 ali 200 lesenih ploščic, srčkov ali listov", "Lesena škatla za ploščice", "Tabla z navodilom za goste", "Gravura vajinih imen in datuma", "Dva markerja za les"],
  useCasesTitle: "Knjiga gostov, ki po poroki ostane na steni.", useCases: [
    { title: "Pri vhodu", text: "Postavi jo poleg table dobrodošlice. Gostje jo izpolnijo med aperitivom." },
    { title: "Kratka voščila", text: "Ploščica ima prostor za eno poved, zato jo lažje izpolnijo tudi gostje, ki ne pišejo radi." },
    { title: "Po poroki", text: "Okvir obesita na steno ali postavita na polico. Ploščice lahko pozneje vzameta ven." },
  ],
  helpTitle: "Koliko ploščic potrebujeta?", helpText: "Izberita 150 ploščic za 175 € ali 200 ploščic za 200 €. Personalizacija z imenoma in datumom je vključena.",
  faq: [
    { q: "Ali navadni kemični svinčnik piše po lesu?", a: "Ne dovolj dobro, zato priložimo dva markerja, ki se ne razmažeta." },
    { q: "Koliko ploščic lahko izberem?", a: "Na voljo sta personalizirana kompleta s 150 ploščicami za 175 € in 200 ploščicami za 200 €." },
    { q: "Ali je gravura imen vključena?", a: "Da, imena in datum so v ceni. Osnutek prejmeš v 48 urah, dva popravka sta brezplačna." },
    { q: "Kaj če se okvir ne napolni do vrha?", a: "Videti je urejen tudi delno poln. Preostale ploščice lahko izpolnita pozneje." },
    { q: "Ali lahko okvir pozneje odprem?", a: "Da, hrbtna stran je pritrjena z vijaki." },
    { q: "Katera oblika je bolj priljubljena?", a: "Srce je pogostejša izbira. Drevo se dobro obnese pri večjem številu gostov." },
  ],
  seoTitle: "Personalizirana knjiga gostov v okvirju od 175 € | Eventaj.si", seoDescription: "Personalizirana lesena knjiga gostov v obliki srca ali drevesa. Izberi 150 ploščic za 175 € ali 200 ploščic za 200 €. Gravura je vključena.", sku: "EVENTAJ-KNJIGA-OKVIR", availability: "PreOrder", images: [
    { src: "/application/oprema/knjiga-gostov/knjiga-gostov-srce.webp", alt: "Lesena poročna knjiga gostov v obliki srca s podpisanimi ploščicami in škatlo" },
    { src: "/application/oprema/knjiga-gostov/knjiga-gostov-drevo-zivljenja.webp", alt: "Lesena poročna knjiga gostov v obliki drevesa življenja s podpisanimi listi in škatlo" },
  ],
});

products.push({
  id: "wedding-puzzle", slug: "porocni-puzzle", name: "Poročni puzzle", eyebrow: "Oprema za dogodke · Knjiga gostov", heading: ["Knjiga gostov v obliki", "puzzla."],
  shortDescription: "Vsak gost podpiše svoj košček. Ko ga sestavita, dobita sliko za na steno.",
  description: "Personaliziran sredinski kos je graviran z vajinima imenoma in datumom, preostale podpišejo gostje. Puzzle je iz 4 mm vezanega lesa.",
  status: "Izdelava 21 dni", cardNote: "Personalizacija vključena", price: 200, priceLabel: "od 200 €", priceSubtitle: "personaliziran komplet, v last", pricingMode: "fixed", fulfillmentMode: "post",
  selectors: [
    { label: "Število kosov", options: [{ label: "90 kosov", price: 200 }, { label: "160 kosov", price: 250 }] },
    { label: "Stojalo", options: [{ label: "Brez stojala" }, { label: "Stojalo za razstavo", priceDelta: 19 }] },
  ],
  calculationLabel: "Izbrani komplet", deliveryText: "Pošiljanje po pošti je na voljo. Poštnina se obračuna posebej.", cta: "Pošlji povpraševanje", finePrint: "Naroči vsaj 10 koščkov več, kot imaš gostov. Vedno se kakšen izgubi.",
  includedSubtitle: "Vse, kar rabita za mizo pri vhodu", included: ["Puzzle z gravuro imen in datuma na sredinskem kosu", "Lesena škatla za koščke", "Tabla z navodilom za goste", "Dva markerja za les"],
  useCasesTitle: "Za pare, ki hočejo nekaj obesiti na steno.", useCases: [
    { title: "Med aperitivom", text: "Gost vzame kos iz škatle, ga podpiše in odloži nazaj." },
    { title: "Sestavljanje po poroki", text: "Ko puzzle sestavita, prebereta vsa voščila naenkrat." },
    { title: "Za manjše in večje poroke", text: "Izberi personaliziran komplet z 90 ali 160 koščki glede na število gostov." },
  ],
  helpTitle: "Katero velikost izbrati?", helpText: "Vzemi vsaj deset koščkov več, kot imaš gostov. Nekaj jih bo končalo pod mizo, otroci pa včasih podpišejo dva.",
  faq: [
    { q: "Se koščki izgubljajo?", a: "Da, zato naroči vsaj deset koščkov več in ob puzzle postavi škatlo za podpisane kose." },
    { q: "S čim se podpiše na les?", a: "Z markerjem, ki ga priložimo. Navaden kemični svinčnik pušča komaj vidno sled." },
    { q: "Ali puzzle po sestavljanju drži skupaj?", a: "Da. Za obešanje priporočamo, da ga s hrbtne strani prelepita s trakom." },
    { q: "Koliko koščkov lahko izberem?", a: "Na voljo sta personalizirana kompleta z 90 koščki za 200 € in 160 koščki za 250 €." },
    { q: "Ali lahko dodam svoj motiv?", a: "Dodamo lahko preprost simbol ali monogram. Fotografij ne graviramo." },
    { q: "Kdaj moram naročiti?", a: "Najmanj 21 dni pred dogodkom. Rok začne teči po potrditvi osnutka." },
  ],
  seoTitle: "Personaliziran poročni puzzle od 200 € | Eventaj.si", seoDescription: "Personaliziran lesen poročni puzzle z gravuro imen in datuma. Izberi 90 koščkov za 200 € ali 160 koščkov za 250 €. Markerja sta vključena.", sku: "EVENTAJ-POROCNI-PUZZLE", availability: "PreOrder", images: [
    { src: "/application/oprema/puzzle/porocni-puzzle-podpisani-koscki.webp", alt: "Leseni poročni puzzle z gravuro imen Nina in Andrej ter podpisanimi koščki", fit: "contain" },
    { src: "/application/oprema/puzzle/leseni-puzzle-knjiga-gostov.webp", alt: "Poročni puzzle kot knjiga gostov z lesenimi koščki za voščila", fit: "contain" },
    { src: "/application/oprema/puzzle/personaliziran-porocni-puzzle.webp", alt: "Personaliziran leseni poročni puzzle z imenoma, datumom in tablico z navodilom", fit: "contain" },
  ],
});

products.push({
  id: "event-games", slug: "igre-za-dogodke", name: "Igre za dogodke", eyebrow: "Oprema za dogodke · Igre", heading: ["Najem", "iger za dogodke."],
  shortDescription: "Limbo, štrbunk, metanje obročkov, podiranje stolpa in kotaljenje žogic za čas med aperitivom, večerjo in glasbo.",
  description: "Lesene igre postavimo na lokaciji in jih poberemo naslednji dan. Ob vsaki je tablica s pravili, zato dodatna razlaga ni potrebna.",
  status: "Na voljo 5", cardNote: "Postavitev vključena", price: 149, priceLabel: "od 149 €", priceSubtitle: "paket štirih iger za 1 dan", pricingMode: "fixed", fulfillmentMode: "transport",
  selectors: [
    { label: "Igra", options: [{ label: "Limbo" }, { label: "Štrbunk" }, { label: "Metanje obročkov" }, { label: "Podiranje stolpa" }, { label: "Kotaljenje žogic" }], note: "Pri paketu končni izbor štirih iger zapiši v opombe povpraševanja." },
    { label: "Paket", options: [{ label: "Paket 4 iger", price: 149 }, { label: "Posamezna igra", price: 49 }, { label: "Paket 4 + dodatna", price: 178 }] },
  ],
  calculationLabel: "Izbrani paket", deliveryText: "Prevoz se obračuna posebej po 0,40 €/km do 75 km.", cta: "Preveri termin", finePrint: "Za limbo potrebuješ ravno podlago. Igre zvečer pospravi pod streho.",
  includedSubtitle: "Postavljeno in pripravljeno pred prihodom gostov", included: ["Štiri igre po tvoji izbiri", "Lesene tablice s pravili", "Vsi rekviziti", "Postavitev in odvoz", "Zamenjava drobnih rekvizitov, če se kaj izgubi"],
  useCasesTitle: "Za čas med kosilom in prvim plesom.", useCases: [
    { title: "Poroke na prostem", text: "Igre zapolnijo čas med kosilom in glasbo, ko gostje čakajo na nadaljevanje programa." },
    { title: "Družinska praznovanja", text: "Limbo, obročki in štrbunk hkrati zaposlijo otroke in odrasle." },
    { title: "Poslovni pikniki", text: "Gostje se razporedijo sami, brez moderatorja ali organizirane animacije." },
  ],
  helpTitle: "Ne veš, katere igre izbrati?", helpText: "Povej nam število gostov in kakšen je teren. Za travo odsvetujemo podiranje stolpa, za neravno dvorišče pa limbo.",
  faq: [
    { q: "Ali igre postavite vi?", a: "Da, pripeljemo in postavimo jih zjutraj, poberemo pa naslednji dan. Prevoz se obračuna posebej." },
    { q: "Kaj če dežuje?", a: "Igre prenesejo kratko ploho, ne pa noči na dežju. Zvečer jih pospravi pod streho." },
    { q: "Kakšno podlago potrebujem?", a: "Limbo potrebuje ravno površino. Podiranje stolpa in štrbunk potrebujeta trdno podlago." },
    { q: "Ali so primerne za otroke?", a: "Da. Limbo in obročki se najbolje obneseta pri otrocih med šestim in dvanajstim letom." },
    { q: "Kaj če se rekvizit izgubi?", a: "Manjkajočih obročkov in žogic ne zaračunamo. Poškodovano večjo igro obračunamo po ceniku popravila." },
    { q: "Lahko vzamem samo eno igro?", a: "Da, posamezna igra stane 49 €. Za samostojno dostavo najema velja najmanjše naročilo 80 €." },
  ],
  seoTitle: "Najem lesenih iger za poroko in dogodke | Eventaj.si", seoDescription: "Najem limba, štrbunka, metanja obročkov, podiranja stolpa in kotaljenja žogic. Paket štirih iger od 149 € s postavitvijo in odvozom.", sku: "EVENTAJ-IGRE", availability: "LimitedAvailability", images: [
    { src: "/application/oprema/igre/limbo-lesena-igra.webp", alt: "Lesena igra limbo na travniku ob poročnem obredu" },
    { src: "/application/oprema/igre/strbunk-porocna-igra.webp", alt: "Poročna igra štrbunk za ekipi neveste in ženina na prostem" },
    { src: "/application/oprema/igre/metanje-obrockov-porocna-igra.webp", alt: "Lesena igra metanje obročkov s steklenicami na poročnem prizorišču" },
    { src: "/application/oprema/igre/podiranje-stolpa-lesena-igra.webp", alt: "Lesena igra podiranje stolpa z lesenimi valji in žogicami" },
    { src: "/application/oprema/igre/kotaljenje-zogic-lesena-igra.webp", alt: "Lesena igra kotaljenje žogic z odprtinami za dve ekipi", fit: "contain" },
  ],
});

products.push({
  id: "beer-pong-table", slug: "beer-pong-miza", name: "Beer pong miza", eyebrow: "Oprema za dogodke · Igre", heading: ["Najem", "beer pong mize."],
  shortDescription: "Poročna ali LED izvedba s kozarci in žogicami za večerni del dogodka.",
  description: "Zložljiva miza 240 × 60 cm z 22 kozarci in šestimi žogicami. Poročna izvedba ima delitev na ekipi neveste in ženina, LED izvedba pa osvetljene obroče.",
  status: "Na voljo 2", cardNote: "Kozarci in žogice vključeni", price: 49, priceLabel: "49 €", priceSubtitle: "za dan dogodka", pricingMode: "fixed", fulfillmentMode: "transport",
  selectors: [{ label: "Izvedba", options: [{ label: "Poročna", price: 49 }, { label: "LED", price: 49 }] }],
  calculationLabel: "Izbrana izvedba", deliveryText: "Prevoz se obračuna posebej po 0,40 €/km do 75 km.", cta: "Preveri termin", finePrint: "Varščina je 50 € in jo vrnemo ob prevzemu mize. LED izvedba potrebuje vtičnico 220 V.",
  includedSubtitle: "Postaviš in igraš", included: ["Miza 240 × 60 cm, zložljiva na polovico", "22 kozarcev in 6 žogic", "Tablica s pravili", "Pri LED izvedbi napajalnik, 3 m kabla in daljinec", "Odvoz po dogodku"],
  useCasesTitle: "Za del večera, ko orkester neha.", useCases: [
    { title: "Poroke po polnoči", text: "Poročna miza z ekipama neveste in ženina je pripravljena za goste, ki ostanejo pozno v noč." },
    { title: "Osemnajstke in rojstni dnevi", text: "LED izvedba ima šest barvnih načinov in pride do izraza v zatemnjenem prostoru." },
    { title: "Poslovne zabave", text: "Igra pomaga začeti neformalno druženje brez moderatorja." },
  ],
  helpTitle: "Katero mizo izbrati?", helpText: "Za poroko izberi poročno izvedbo z ekipama neveste in ženina. Za zabavo v zaprtem in zatemnjenem prostoru izberi LED. Zunaj podnevi osvetlitev ni dobro vidna.",
  faq: [
    { q: "Ali je miza zložljiva?", a: "Da, zloži se na dolžino 120 cm in gre v prtljažnik večine avtomobilov." },
    { q: "Potrebuje LED izvedba elektriko?", a: "Da, vtičnico 220 V. Kabel je dolg tri metre, podaljška ne prilagamo." },
    { q: "Kakšna je poročna izvedba?", a: "Ima standardni črno-beli tisk z ekipama neveste in ženina. Personalizacija z imeni ni na voljo." },
    { q: "So kozarci vključeni?", a: "Da, priložimo 22 kozarcev in 6 žogic." },
    { q: "Ali je primerna za zunaj?", a: "Poročna miza da. LED izvedbo odsvetujemo zunaj podnevi." },
    { q: "Kolikšna je varščina?", a: "Varščina je 50 €. Vrnemo jo ob prevzemu nepoškodovane mize." },
  ],
  seoTitle: "Najem beer pong mize za poroko ali zabavo | Eventaj.si", seoDescription: "Najem poročne ali LED beer pong mize s kozarci in žogicami za 49 € na dan. Prevoz se obračuna posebej.", sku: "EVENTAJ-BEER-PONG", availability: "LimitedAvailability", images: [
    { src: "/application/oprema/beerpong/bela-porocna-beer-pong-miza.webp", alt: "Bela poročna beer pong miza za ekipi neveste in ženina s kozarci" },
    { src: "/application/oprema/beerpong/led-beer-pong-miza.webp", alt: "LED beer pong miza z modro in rožnato osvetlitvijo ter kozarci" },
  ],
});

products.push({
  id: "guest-fans", slug: "pahljace-za-goste", name: "Pahljače za goste", eyebrow: "Oprema za dogodke · Tiskovine", heading: ["Tisk", "pahljač za goste."],
  shortDescription: "Obojestransko potiskane pahljače za poletni obred, s programom ali besedilom pesmi.",
  description: "Obojestranski barvni tisk na 300 g karton z lesenim ročajem. Spredaj so imena in datum, zadaj pa program obreda ali besedilo pesmi.",
  status: "Izdelava 14 dni", cardNote: "Najmanj 50 kosov", price: 3, priceLabel: "od 2 €", priceSubtitle: "na kos glede na količino", pricingMode: "per-unit", fulfillmentMode: "post",
  quantity: { label: "Količina", min: 50, defaultValue: 50, unit: "kosov" },
  quantityTiers: [{ min: 50, unitPrice: 3 }, { min: 100, unitPrice: 2.5 }, { min: 200, unitPrice: 2 }],
  selectors: [
    { label: "Hrbtna stran", options: [{ label: "Prazna" }, { label: "Program obreda" }, { label: "Besedilo pesmi" }] },
  ],
  calculationLabel: "Informativni izračun", deliveryText: "Pošiljanje po pošti je na voljo. Poštnina se obračuna posebej.", cta: "Pošlji povpraševanje", finePrint: "50–99 kosov: 3 €/kos. 100–199 kosov: 2,50 €/kos. Od 200 kosov: 2 €/kos.",
  includedSubtitle: "Sestavljeno in pripravljeno za razdelitev", included: ["Obojestranski barvni tisk na 300 g karton", "Lesen ročaj, prilepljen in pripravljen", "Oblikovanje z vajinimi podatki", "Pakiranje za pošiljanje"],
  useCasesTitle: "Za poletne obrede na soncu.", useCases: [
    { title: "Obred na prostem", text: "Pahljača gostom pomaga pri dolgem poletnem obredu na soncu." },
    { title: "Program obreda", text: "Na hrbtno stran dodamo potek obreda ali besedilo pesmi, zato ločeni programi niso potrebni." },
    { title: "Fotografije", text: "Na skupinskih fotografijah gostje s pahljačami lažje uskladijo položaj rok." },
  ],
  helpTitle: "Koliko jih naročiti?", helpText: "Ena na osebo je navadno preveč, ker si jih pari delijo. Za 100 gostov je običajno dovolj 70 do 80 kosov.",
  faq: [
    { q: "Kdaj moram naročiti?", a: "Najmanj 14 dni pred dogodkom. Po potrditvi osnutka gre naročilo v tisk." },
    { q: "Zakaj ne izdelujete pod 50 kosov?", a: "Priprava tiska in oblikovanje sta enaka pri 20 in 200 kosih. Pod 50 kosi bi bila cena na kos previsoka." },
    { q: "Kako se obračuna količinski popust?", a: "Od 50 do 99 kosov je cena 3 € na kos, od 100 do 199 kosov 2,50 € na kos, od 200 kosov naprej pa 2 € na kos." },
    { q: "Ali lahko dam na hrbtno stran program obreda?", a: "Da. Pošlji nam potek in ga oblikujemo za tisk." },
    { q: "So ročaji že prilepljeni?", a: "Da, pahljače prispejo sestavljene in pripravljene za razdelitev." },
    { q: "Kakšen je papir?", a: "Uporabljamo 300 g karton z mat premazom, ki med uporabo ohrani obliko." },
  ],
  seoTitle: "Pahljače za poroko od 2 € na kos | Eventaj.si", seoDescription: "Personalizirane poročne pahljače z lesenim ročajem. Cena je 3 € na kos, od 100 kosov 2,50 €, od 200 kosov pa 2 €. Najmanj 50 kosov.", sku: "EVENTAJ-PAHLJACE", availability: "PreOrder",
  images: [
    {
      src: "/application/oprema/pahljace/porocna-pahljaca-zahvala.webp",
      alt: "Personalizirana poročna pahljača z zahvalo gostom in lesenim ročajem",
      fit: "contain",
    },
    {
      src: "/application/oprema/pahljace/personalizirana-pahljaca-za-goste.webp",
      alt: "Bela personalizirana pahljača za poročne goste z lesenim ročajem",
      fit: "contain",
    },
    {
      src: "/application/oprema/pahljace/porocna-pahljaca-obokana.webp",
      alt: "Obokana poročna pahljača z dobrodošlico, imenoma in datumom poroke",
      fit: "contain",
    },
  ],
});

export const equipmentProducts: ReadonlyArray<EquipmentProduct> = [standingTable, ...products];

export function getEquipmentProduct(slug: string) {
  return equipmentProducts.find((product) => product.slug === slug);
}

export const equipmentFaq = [
  { q: "Kako naročim ali najamem opremo?", a: "Izberi izdelek in možnosti ter pošlji datum in lokacijo. Preverimo zalogo ali rok izdelave in ti pošljemo ponudbo." },
  { q: "Kateri izdelki so za najem in kateri za nakup?", a: "Pri vsakem izdelku je označeno, ali ga najameš ali ga izdelamo zate. Tabla dobrodošlice je na voljo v obeh različicah." },
  { q: "Kako potekata prevoz in pošiljanje?", a: "Za stoječe mize, igre in beer pong mizo se prevoz obračuna posebej po 0,40 €/km do 75 km. Ostale izdelke pošljemo po pošti, poštnina pa se obračuna posebej." },
  { q: "Lahko opremo kombiniram z drugimi storitvami Eventaj?", a: "Da. V opombe zapiši, da želiš opremo združiti s Photo Boothom ali 360° Boothom." },
] as const;

export const standingTableFaq = standingTable.faq;
