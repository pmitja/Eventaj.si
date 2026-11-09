# Eventaj.si: SEO, AEO in GEO revizija

9. november 2026 • pregled z marketingskills skilloma `seo-audit` in `ai-seo`

## 1. Povzetek

Tehnična osnova je v redu: vseh 48 URL-jev iz sitemapa vrne 200, vsaka stran ima svoj naslov, opis in kanonično povezavo, vsebina je v začetnem HTML-ju, AI boti niso blokirani in `llms.txt` je med boljšimi, kar sem jih videl pri majhnih podjetjih. Težave so drugje: **na spletu obstajajo nasprotujoča si dejstva o ceni, prevozu, prostoru in omejitvah**, in ravno ta dejstva AI asistenti povzemajo in citirajo. Večina točk P1 iz revizije 6. 9. 2026 je še odprtih.

Prvih pet nalog:

1. **Odločiti, katere cene veljajo za 2027.** Generator ponudb od 4. 11. dodaja +20 € na booth paket za dogodke v 2027, spletna stran, shema in `llms.txt` pa povsod navajajo 279 € / 299 € brez letnice. Poročni termini se rezervirajo 2–4 mesece in več vnaprej, zato je večina novih povpraševanj že za 2027. AI in Google bosta citirala 279 €, stranka pa bo dobila ponudbo za 299 €.
2. **Izbrisati ali preusmeriti `/llm.txt`.** Stara datoteka je javno dostopna in trdi "Slovenia's premier", "Free transportation and setup included" in "24/7 service". Vse troje je v nasprotju z `llms.txt` in z dejansko ponudbo (brezplačno do 20 km).
3. **Popraviti 360° kalkulator.** 3 ure brez dodatkov še vedno pokažejo 379 €, paket stane 349 €. 4 ure: 459 € proti 399 €.
4. **Uskladiti stare FAQ strani** (`/photo-booth/faq`, `/360-photo-booth/faq`, `/pogosta-vprasanja`): 2 × 2 m namesto 2,5 × 2 m, 60 minut postavitve namesto 30–45, 5 oseb na platformi namesto 4. Hkrati na 360° strani zamenjati skupni FAQ o tiskanju z vprašanji o videu.
5. **Prijaviti stran v Bing Webmaster Tools in vklopiti IndexNow.** ChatGPT išče prek Bingovega indeksa. V kodi ni Bingove verifikacije, iskalnik, ki sem ga uporabil za test, pa eventaj.si ni našel niti pri iskanju točne domene.

Hitre zmage (manj kot ura dela): izbris `/llm.txt`, odstranitev "Vodilni ponudnik" iz sheme, dvojna pika v H1 na dveh straneh, "| Eventaj.si" v H1 na štirih straneh, Bing verifikacija.

## 1a. Search Console (zadnjih 12 mesecev, izvoz 9. 11. 2026)

Skupaj 1.443 klikov in ~30.900 prikazov. Povprečna pozicija se je izboljšala s 25–40 (junij–julij) na 8–10 (oktober–november), klikov je zdaj ~7 na dan, leto prej 2–4. Mobilni telefoni prinesejo dve tretjini klikov in imajo dvakrat višji CTR (6,1 %) kot namizje (3,1 %).

**Kjer Eventaj že zmaga:** "photo booth najem" (poz. 4,4, CTR 12 %), "photo booth najem cena" (2,9, 18 %), "360 photo booth najem" (1,5, 23 %), "360 photo booth" (2,8). `/360-photo-booth` ima CTR 11,5 % na poziciji 7.

**Največ neizkoriščenih prikazov** (veliko prikazov, slaba pozicija):

| Poizvedba | Prikazi | Pozicija | Opomba |
|---|---|---|---|
| foto box | 1.825 | 25 | `/photo-booth` |
| foto stojnica (+ "za poroko", tipkarske napake) | 1.712 + 1.231 | 42–44 | Najšibkejši sinonim |
| foto zabava | 1.628 | 36 | Delno drug namen |
| foto box za poroko | 1.584 | 24 | **Popravljeno:** poročna stran preimenovana |
| fotobox za zabavo | 1.574 | 38 | `/photo-booth-za-rojstni-dan` |
| selfie box za poroko | 1.180 | 15 | **Popravljeno:** izraz dodan na poročno stran |
| foto ogledalo za poroke | 1.199 | 16–25 | Mirror booth: Eventaj ga ne ponuja (poslovna odločitev) |
| foto za rojstni dan | 405 | 14 | |
| photo booth ljubljana / maribor | 164 / 63 | 17 / 9 | Dodan odgovor o mestih v FAQ na `/photo-booth` |

**Strani z veliko prikazi in malo kliki:** `/photo-booth-za-poroko` (2.225 prikazov, CTR 0,49 %), `/pogosta-vprasanja` (1.294, 0,31 %), `/photo-booth-za-obletnico` (362, 0,28 %).

**Product snippets:** 5.405 prikazov in 246 klikov prihaja iz prikaza s ceno in oceno. To spremeni priporočilo iz poglavja 7: oceno in Offer v Service shemah **pustiti**, dokler Search Console ne pokaže drugače.

**Brez znamke:** med poizvedbami ni nobene z "eventaj". Ljudje Eventaj najdejo prek kategorije, ne po imenu, kar je za AI priporočila slab znak (glej poglavje 7, prisotnost zunaj strani).

**Dolga vprašanja v naravnem jeziku**, npr. "kje lahko v ljubljani kupim opremo za dogodke?" (96 prikazov, poz. 3,3), so tipična za Googlov AI Mode. Eventaj se pri nekaterih pojavlja visoko, kar potrjuje, da vsebina v Nasvetih deluje tudi za AI.

**Stari URL-ji s prikazi:** `/blog/kako-izbrati-pravi-photo-booth-za-vas-dogodek` (129), `/blog/5-vprasanj-…-rojstni-dan` (26), `/photo-booth-za-maturantski-ples` (12, vrnil 404), `/foto-box-najem/`. Vsi imajo zdaj ustrezno preusmeritev.

## 1b. Popravljeno 9. 11. 2026 (v kodi, še ni objavljeno)

| Popravek | Datoteke |
|---|---|
| 360° kalkulator: 2–4 ure po ceni paketov (299 / 349 / 399 €), nad 4 ure +80 €/uro, kot v generatorju ponudb | `use-pricing-configurator.ts`, `pricing-configurator.tsx` |
| Stari FAQ usklajeni: 2,5 × 2 m, 3 × 3 m, postavitev 30–45 min, do 4 osebe na platformi, en telefon, galerija v 48 urah; odstranjena podvojena vprašanja | `photo-booth/faq`, `360-photo-booth/faq`, `pogosta-vprasanja` |
| 360° stran ima svoja vprašanja (video, platforma, ni tiska, prevoz) v vsebini in FAQPage shemi | `data.ts` (`booth360FaqItems`), `service-page-content.tsx`, `360-photo-booth/page.tsx` |
| Prevoz v FAQ: brezplačno do 20 km od Lenarta; novo vprašanje o Ljubljani, Mariboru, Celju | `data.ts` |
| `/llm.txt` izbrisan, 308 na `/llms.txt`; `llms.txt` z datumom posodobitve, opombo, da cene veljajo za 2026, in 10 namesto 15 miz | `public/` , `next.config.js` |
| Shema domače strani: brez "Vodilni ponudnik", en Facebook URL, `@id` za Organization in LocalBusiness | `app/page.tsx` |
| OG opis brez "brezplačnim prevozom po celotni Sloveniji" | `app/layout.tsx` |
| H1 brez "| Eventaj.si" (cenik, FAQ strani), krajši naslov `/pogosta-vprasanja` (85 → 67 znakov) | `faq-section-client.tsx`, `cenik-page-content.tsx` |
| Dvojna pika v H1 poroke in obletnice | `event-pages.ts` |
| Poročna stran: naslov "Foto box za poroko…", opis s photo booth, foto stojnica, selfie box | `event-pages.ts` |
| Mize: opis z "izposoja" in "za poroke in dogodke" | `najem-stojecih-miz/page.tsx`, `equipment.ts` |
| Preusmeritve starih URL-jev s prikazi | `next.config.js` |
| Povezave: glava in noga na `/pogosta-vprasanja`, produktni strani na svoj FAQ, QR stran na praznovanja ter konference in sejme | `data.ts`, `site-footer.tsx`, `faq-section.tsx`, `qr-gallery-page.tsx` |
| GA4 `generate_lead` po uspešno oddanem povpraševanju | `lib/analytics.ts`, `use-inquiry-form.ts` |
| Sitemap `lastmod` 2026-11-09 | `app/sitemap.ts` |

Preverjeno: `tsc`, ESLint, `next build` ter produkcijski build v brskalniku (kalkulator, H1, naslovi, shema, preusmeritve, povezave).

### Drugi krog (po odločitvah lastnika)

| Odločitev | Kaj je spremenjeno |
|---|---|
| Cene 2027 povsod | Photo Booth 299 / 349 / 399 €, 360° Booth 319 / 369 / 419 €, combo +40 €, Photo Booth + QR 324 €. Strani, naslovi, opisi, shema (Offer, AggregateOffer), cenik, kalkulator, obrazec za povpraševanje, vodiči (naslov "(2027)", datum posodobitve), `llms.txt`. Generator ponudb že doda +20 € za dogodke v 2027. |
| Dodatna ura Photo Booth 60 € | Kalkulator, cenik, paketi, vodiči, `llms.txt` in generator ponudb (tudi za combo: 140 €). 360° ostane 80 €. |
| Brez avansa | FAQ strani in pogoji uporabe: celoten znesek z bančnim nakazilom najkasneje 72 ur pred dogodkom (enako kot v generatorju ponudb). Odstranjeni 30 % predplačilo, vračila predplačila, kartično plačilo, drugi telefon in trditev "cene vključujejo DDV" (ponudnik ni zavezanec za DDV). |
| QR: neomejeno videov | Odstranjeno "do 1.000 videov". |
| Odgovarjamo enkrat na dan | Iz sheme odstranjen delovni čas 00:00–23:59 vse dni; v `llms.txt` čas odziva, plačilo in DDV. Obljuba "odgovor v 24 urah" ostaja. |

Preverjeno: testi cen (5/5), `tsc`, ESLint, `next build`, pregled vseh 48 strani na lokalnem buildu (brez starih cen 360° ali dodatne ure 50 €) in kalkulator v brskalniku za 2–5 ur.

**Za pregled pred objavo:** nova odpovedna klavzula v pogojih uporabe ("odpoved pred rokom za plačilo nima stroškov") je napisana na novo, ker stara temelji na predplačilu. Pri najemu miz in tabli dobrodošlice FAQ še omenja predplačilo; tega nisem spreminjal.

**Ostaja odprto:** Bing Webmaster Tools, avtor člankov, ocene na GBP, mirror booth.

## 2. Obseg in omejitve

Pregledano: lokalna koda (`main`, a6db431), vseh 48 URL-jev iz živega sitemapa (status, naslov, opis, H1, H2, kanonična povezava, JSON-LD, notranje povezave, slike, video), preusmeritve, `robots.txt`, `llms.txt`, `llm.txt`, dostop za GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Googlebot in Bingbot, nalaganje domače strani v brskalniku ter iskanje znamke v neodvisnem iskalnem indeksu.

Ni bilo dostopa do Search Console, GA4, Bing Webmaster Tools, Google Business Profila in orodij za spremljanje AI citatov. PageSpeed API je drugič zapored vrnil 429 (dnevna kvota), zato mobilnih Core Web Vitals ni. AI odgovorov v ChatGPT, Perplexity in Gemini nisem testiral; v poglavju 8 je pripravljen seznam vprašanj za ročni test.

Surovi podatki: `crawl.json` in `url-povzetek.txt` v tej mapi.

## 3. Kaj se je spremenilo od 6. 9. 2026

| Ugotovitev iz septembra | Stanje 9. 11. |
|---|---|
| Ocena 4,9 / 30 ocen brez vira | **Popravljeno.** 5,0 / 13, usklajeno z GBP (27. 10.) |
| Naslovi photo booth strani | **Popravljeno.** Fraza in cena na začetku (27. 10.) |
| 360° kalkulator 379 € proti paketu 349 € | Odprto |
| Stari FAQ: prostor, postavitev, število oseb | Odprto |
| QR dodatek "Neomejeno videov" + "do 1.000 videov" | Odprto (`qr-gallery-offer.tsx:156`) |
| Skupni FAQ o tiskanju na 360° strani | Odprto (tudi v FAQPage shemi) |
| 5 strani brez notranje povezave | Odprto, vseh 5 |
| Ni dogodka `generate_lead` ob uspešni oddaji | Odprto |
| Nove strani | Dodani `kozarci-za-sampanjec`, posodobljeni vodiči |

## 4. Tehnični SEO

| Preverjanje | Rezultat |
|---|---|
| Status sitemap URL-jev | 48 / 48 vrne 200 |
| `eventaj.si`, `http://www`, `/photo-booth/` | 308 na `https://www.eventaj.si/...` brez verig |
| Neobstoječ URL | Pravi 404 |
| Kanonične povezave | 48 / 48 kažejo nase |
| noindex | Nikjer |
| `robots.txt` | `Allow: /` za vse, sitemap naveden |
| AI boti (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot) | Vsi dobijo 200 in polno vsebino; ni WAF blokade |
| Vsebina v HTML-ju brez JS | Da, strani so statično generirane |
| TTFB domače strani | ~100 ms; CLS 0 v brskalniku |
| Slike brez `alt` | 0 |

### Ugotovitve

**Sitemap `lastmod` ne sledi spremembam** (Nizek vpliv, P3). Vse produktne in pristajalne strani imajo `2026-09-03`, čeprav so se naslovi spremenili 27. 10. in oprema 4. 11. Google `lastmod` upošteva le, če je zanesljiv. Popravek: datum na stran (kot že velja za vodiče) ali vsaj premik skupnega datuma ob vsaki vsebinski spremembi. `priority` in `changefreq` Google ignorira.

**`/llm.txt` je zastarel dvojnik** (Visok vpliv za AI, P1). Glej poglavje 7.

**Bing ni potrjen** (Srednji vpliv, P1). V `layout.tsx` je samo Google verifikacija. Bing Webmaster Tools omogoča uvoz iz Search Console v nekaj minutah. IndexNow pošlje spremembe Bingu takoj, kar je pomembno za ChatGPT in Copilot.

**Hitrost ni izmerjena na mobilnem** (P2). Domača stran v prvih 6 sekundah prenese ~1 MB (namizje, brez omejitve hitrosti), videi se nalagajo po delih. Na `/360-photo-booth` je 26 `<video>` elementov, na 360° pristajalnih straneh po 9. Ko se kvota PSI ponastavi, izmeriti domov, `/photo-booth`, `/360-photo-booth` in `/qr-galerija` na mobilnem.

**Zunanji Google Fonts** (Nizek, P3). Tri družine pisav se nalagajo z `fonts.googleapis.com` kot blokirajoči CSS. Prehod na `next/font` odstrani zunanjo zahtevo. Odločitev naj sledi meritvi.

## 5. On-page SEO

**H1 vsebuje "| Eventaj.si"** (Srednji, P2). Na `/cenik`, `/photo-booth/faq`, `/360-photo-booth/faq` in `/pogosta-vprasanja` je H1 kopija naslova strani, vključno z imenom znamke. Primer: "Cenik Photo Bootha, 360° Bootha in QR galerije | Eventaj.si".

**Dvojna pika v H1** (Nizek, hitra zmaga). `/photo-booth-za-poroko` prikaže "Vajina poroka, ujeta v fotografijah.." in `/photo-booth-za-obletnico` "…ohraniti..". Vzrok: `italicWord` v `content/eventaj/event-pages.ts:117` in `:393` se konča s piko, `landing-hero.tsx:38` pa doda še eno.

**H1 pristajalnih strani ne vsebuje teme strani** (Srednji, P2). Naslovi strani so dobri ("Foto kotiček za poroko z neomejenim tiskom"), H1 pa so čustveni ("Prvi ples, v gibanju", "Magnet za množice"). Google in AI motorji uporabljajo H1 za razumevanje teme odseka. Predlog: obdržati slog, dodati ključni izraz v nadnaslov nad H1 kot del H1 ali pa v H1 vključiti storitev, npr. "360° Booth za poroko: prvi ples, v gibanju".

**Naslov `/pogosta-vprasanja` ima 85 znakov** in našteva sopomenke ("Photo Booth, Foto Kotiček, Foto Stojnica, 360° Booth"). Predlog: "Pogosta vprašanja o najemu photo bootha in 360° bootha | Eventaj.si" ali krajše.

**Ostalo:** opis `/photo-booth/faq` ima 214 znakov; `/nasveti/igre-na-poroki` naslov 69 znakov; `/pogosta-vprasanja`, `/zasebnost`, `/pogoji-uporabe` nimajo `og:image`; `/nasveti` ima le ~370 besed in opis 106 znakov.

**Notranje povezave** (Srednji, P2). Brez vhodne povezave v HTML-ju ostajajo `/photo-booth/faq`, `/360-photo-booth/faq`, `/pogosta-vprasanja`, `/qr-galerija/za-dogodke/praznovanja` in `/qr-galerija/za-dogodke/konference-in-sejmi`. Le eno povezavo imajo `/qr-galerija/funkcije`, `/qr-galerija/poslovni-dogodek`, `rojstni-dnevi`, `team-building` in `/nasveti/najem-opreme-maribor`. Povezava na `/pogosta-vprasanja` je v `content/navigation.ts`, vendar se ne izriše v strežniškem HTML-ju. Predlog iz septembra velja: najprej uskladiti FAQ, nato bodisi povezati bodisi združiti in preusmeriti (po pregledu GSC prometa).

## 6. Vsebina in zaupanje (E-E-A-T)

**Dobro:** vodiči v `/nasveti` imajo jasen odgovor na začetku, tabele, cene, datum posodobitve, Article shemo in FAQ. Članek o ceni pokriva razpon na trgu, kar AI rad citira. Sopomenke (fotobox, foto stojnica, foto kotiček) so razložene na eni strani namesto razpršene po skoraj enakih straneh.

**Ni avtorja.** Vsi članki imajo kot avtorja organizacijo. Predlog: stran o ekipi (kdo izvaja dogodke, od kdaj, koliko dogodkov), avtor Mitja Pak kot `Person` v Article shemi in kratek podpis pod vodiči. To je eden redkih signalov, ki ga majhen ponudnik lahko doda brez stroškov.

**Ni lastnih podatkov.** "100+ dogodkov" je edina številka. Študija GEO (Aggarwal in sod., 2023) je pokazala, da statistike z virom močno povečajo verjetnost citata. Eventaj ima podatke, ki jih nihče drug nima: povprečno število natisov na dogodek, delež gostov, ki se fotografirajo, najpogostejši meseci, povprečna velikost poroke. Če so podatki resnični in izmerjeni, iz njih narediti kratek članek ali tabelo na `/nasveti/koliko-stane-najem-photo-bootha`. Izmišljenih številk ne objavljati.

**Trditve brez dokaza.** Organization shema na domači strani pravi "Vodilni ponudnik Photo Booth in 360° Booth storitev v Sloveniji". Septembrsko poročilo je svetovalo, da se tega brez dokaza ne trdi. Zamenjati z dejstvom: "Najem photo bootha in 360° bootha za poroke, poslovne dogodke in praznovanja po Sloveniji, iz Lenarta pri Mariboru."

## 7. AEO in GEO (AI iskalniki)

### Dostop in strojno berljive datoteke

| Preverjanje | Stanje |
|---|---|
| AI crawlerji v `robots.txt` | Dovoljeni (ena pravila za `*`, kar priporoča skill) |
| Vsebina brez JS | Da |
| `/llms.txt` | Dober: storitve, paketi, cene, dodatki, prevoz, kontakt, vodiči, oprema |
| `/llm.txt` | **Zastarel in protisloven**, javno dostopen |
| Strukturirani podatki | Service, Offer, FAQPage, Article, HowTo, Breadcrumb, LocalBusiness |
| Javni cenik v HTML-ju | Da, na vseh produktnih straneh |

### P1: nasprotujoča si dejstva

AI asistenti povzamejo vse verzije, ki jih najdejo, in lahko navedejo katerokoli. Trenutno so na voljo te:

| Dejstvo | Verzija A | Verzija B |
|---|---|---|
| Prevoz | `llms.txt`, FAQ: brezplačno do 20 km, ostalo po ponudbi | `llm.txt`: "Free transportation and setup included"; `layout.tsx` OG: "brezplačnim prevozom po celotni Sloveniji" (ta OG trenutno ni izpisan, ker ga strani prepišejo) |
| Delovni čas | – | `llm.txt` "24/7", shema LocalBusiness 00:00–23:59 vse dni |
| Položaj | – | `llm.txt` "Slovenia's premier", shema "Vodilni ponudnik" |
| Cena 2027 | Stran: od 279 € / 299 € | Ponudba: +20 € za dogodke v 2027 |
| 360° 3 ure | Paket 349 € | Kalkulator 379 € |
| Prostor za photo booth | 2,5 × 2 m | Stari FAQ: 2 × 2 m |
| Postavitev 360° | 30–45 min | `/360-photo-booth/faq`: 60 min |
| Oseb na 360° platformi | do 4 | `/pogosta-vprasanja`: do 5 |
| QR videi | Doplačilo odstrani omejitev | "Neomejeno videov" + "do 1.000 videov" |
| Facebook | `facebook.com/eventaj.si` (Organization) | `facebook.com/profile.php?id=61567672817538` (LocalBusiness) |

Popravek: `/llm.txt` izbrisati (ali 301 na `/llms.txt`), ostalo uskladiti z eno resnico v `content/eventaj/data.ts`. Za cene 2027 je potrebna poslovna odločitev: ali objaviti nove cene zdaj, ali jasno napisati "cene za dogodke v 2026; za 2027 +20 € na paket". V `llms.txt` dodati vrstico "Posodobljeno: <datum>" in letnico veljavnosti cen.

### P2: shema

- `aggregateRating` (5,0 / 13) je na 13 straneh, tudi na Service za QR galerijo in vseh pristajalnih straneh. 13 ocen je ocen podjetja na Googlu, ne QR galerije. **Popravek po Search Console:** "Product snippets" prinašajo 246 klikov, zato oceno zaenkrat pustiti. Odstraniti jo samo s QR galerije, če želiš biti strog, in spremljati prikaze.
- Organization in LocalBusiness na domači strani sta dve ločeni entiteti brez skupnega `@id`; Service sheme imajo vsaka svojo kopijo ponudnika. Predlog: ena entiteta z `@id: https://www.eventaj.si/#business`, na katero se sklicujejo vse Service in Article sheme. Vanjo dodati `sameAs` tudi za Google Business Profile.
- Delovni čas 00:00–23:59 vse dni ni resničen. Uskladiti z GBP ali odstraniti.
- `/qr-galerija` nima BreadcrumbList; `/qr-galerija/funkcije`, `/poslovni-dogodek` in štiri strani `za-dogodke` nimajo nobene sheme.
- FAQPage obogateni rezultati v Googlu niso več prikazani (od maja 2026). Shemo obdržati, ker jo drugi AI motorji berejo, ni pa razlog za dodajanje novih.

### P2: prisotnost zunaj lastne strani

AI priporočila temeljijo na tem, kar o ponudniku pišejo drugi. Iskalni indeks, ki sem ga uporabil (ne Google), za poizvedbi "eventaj.si" in "Eventaj photo booth" ni vrnil nobenega zadetka z Eventaja ali o njem. Rezultat je iz ameriškega indeksa in ni dokaz neindeksiranosti v Googlu, je pa znak, da je entiteta zunaj Googla šibka.

Predlogi, po vrstnem redu:

1. Bing Webmaster Tools + IndexNow, Bing Places (ChatGPT in Copilot).
2. Apple Business Connect (Apple Maps, Siri).
3. Google Business Profile: več ocen (13 je malo za 100+ dogodkov), redne objave, storitve s cenami.
4. Slovenski poročni portali in imeniki ponudnikov za dogodke, kjer so že konkurenti. Enak opis podjetja povsod.
5. Objave s strankami in prizorišči (poroke, podjetja iz seznama `trustLogos`), kjer partner omeni Eventaj z povezavo.

### P2: pokritost vprašanj (fan-out)

Ko nekdo vpraša AI "koliko stane photo booth za poroko", motor v ozadju išče tudi sorodna vprašanja. Obstoječi vodiči pokrijejo ceno, razlike med vrstami, prostor in QR galerijo. Manjkajo ali so razpršeni odgovori na:

- Koliko natisov naredijo gostje na poroki s 100 gosti?
- Ali photo booth potrebuje operaterja?
- Kdaj na poroki postaviti photo booth (ura, prostor)?
- Photo booth na prostem ali v šotoru?
- Najem photo bootha Ljubljana / Maribor / Celje (en odsek o območju in prevozu na `/photo-booth`, ne ločene strani).

## 8. Ročni test AI vidnosti

Vsako vprašanje zastaviti 3-krat v ChatGPT (z iskanjem), Perplexity in Google (AI Overview / AI Mode). Zabeležiti, ali je Eventaj omenjen ali citiran, kateri URL in kdo je namesto njega. Ponoviti mesečno.

| Vprašanje | ChatGPT | Perplexity | Google AI | Eventaj? | Kdo namesto |
|---|---|---|---|---|---|
| photo booth najem Slovenija | | | | | |
| koliko stane najem photo bootha | | | | | |
| foto box za poroko cena | | | | | |
| 360 booth najem Maribor | | | | | |
| photo booth ali 360 booth za poroko | | | | | |
| kako zbrati fotografije gostov na poroki | | | | | |
| QR koda za fotografije poroka | | | | | |
| najem stoječih miz Maribor | | | | | |
| kaj napisati na tablo dobrodošlice | | | | | |
| Eventaj photo booth mnenja | | | | | |

Pri zadnjem vprašanju preveriti tudi, ali AI navaja pravilne cene, prevoz in ocene.

## 9. Akcijski načrt

**Kritično (ta teden)**

1. Odločitev o cenah 2027 in uskladitev strani, sheme, `llms.txt` in cenika.
2. Izbris `/llm.txt`.
3. 360° kalkulator na iste cene kot paketi (`use-pricing-configurator.ts:31-48`).
4. Stari FAQ: prostor, postavitev, število oseb; 360° FAQ z vprašanji o videu.
5. QR dodatek: en opis omejitve videov.

**Hitre zmage**

6. "Vodilni ponudnik" iz Organization sheme, delovni čas, en Facebook URL.
7. Dvojna pika v H1 (`event-pages.ts:117`, `:393`).
8. "| Eventaj.si" iz H1 na štirih straneh; krajši naslov `/pogosta-vprasanja`.
9. Bing Webmaster Tools in IndexNow.

**Velik vpliv (naslednji mesec)**

10. `generate_lead` ob uspešni oddaji povpraševanja.
11. Ena povezana poslovna entiteta v shemi (`@id`), ocena samo na LocalBusiness.
12. Avtor in stran o ekipi; lastni podatki iz izvedenih dogodkov.
13. Notranje povezave ali združitev petih nepovezanih strani.
14. Ključni izraz v H1 pristajalnih strani.

**Dolgoročno**

15. Ocene na GBP, Bing Places, Apple Business Connect, poročni imeniki.
16. Mesečni test AI vidnosti (poglavje 8).
17. Mobilna meritev hitrosti in po potrebi lažji videi na 360° straneh.
18. Datum `lastmod` po strani v sitemapu.
