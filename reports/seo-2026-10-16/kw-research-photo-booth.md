# Photo booth: ključne besede in kanibalizacija (16. 10. 2026)

Odziv na hitri pregled SEO/GEO strokovnjaka: (1) title `/photo-booth` je sestavljanka "Foto box (photo booth)" in ni exact match, (2) obstaja kanibalizacija.

## Viri in omejitve

- Google Autocomplete (`hl=sl`, `gl=si`) za 24 izrazov: pokaže, katere poizvedbe Slovenci dejansko tipkajo, ne pa obsega.
- Ročni pregled google.si za 10 poizvedb (lokacija Lenart, en posnetek, 16. 10. 2026).
- `site:eventaj.si photo booth`.
- Google Trends je vrnil 429, Keyword Planner in Search Console nista bila na voljo. **Mesečnih iskanj ni v tem poročilu.**

## 1. Kateri izraz je "exact match"

| Izraz | Kaj predlaga Autocomplete (SI) | Ocena |
|---|---|---|
| **photo booth** | najem, ljubljana, cena, najem maribor, maribor, slovenija, 360, nakup | Najmočnejši izraz, največ slovenskih nadaljevanj |
| photobooth (skupaj) | najem, maribor, slovenija, ljubljana, cena | Ista poizvedba v drugem zapisu |
| **fotobox** (skupaj) | cena, najem, nakup, maribor, najem cena | Edini zapis "foto box", ki ima slovensko povpraševanje |
| foto box (narazen) | dm, studio, terdekat, mieten, kaufen | Skoraj samo tuje poizvedbe, v SI zanemarljivo |
| foto stojnica | nakup, najem, cena, ljubljana, maribor, kranj | Solidna slovenska sopomenka |
| foto kotiček | najem, na poroki, poroka, na zabavi, napis | Mešan namen: poroka in DIY dekoracija |
| fotokabina | Praga, Krakov, dokumenti | Ni relevantno |

`najem photo …` se dopolni v "najem photo booth", `najem foto …` pa v "najem foto kotička", "najem foto stojnice", "najem fotobox".

**Ugotovitev:** strokovnjak ima prav. Title začne z "Foto box", tj. z zapisom, ki ga v Sloveniji skoraj nihče ne išče. Pravi exact match je **"photo booth najem"**. Če želimo sopomenko v naslovu, je to "fotobox" (skupaj), ne "foto box".

### Search Console (16 mesecev, do 16. 10. 2026)

Skupaj 1,64K klikov, 33,5K prikazov, CTR 4,9 %, povprečna pozicija 20,3. Top 10 poizvedb po klikih:

| Poizvedba | Kliki | Prikazi | CTR |
|---|---|---|---|
| photo booth najem | 132 | 1.011 | 13,1 % |
| photo booth najem cena | 84 | 456 | 18,4 % |
| 360 photo booth najem | 63 | 241 | 26,1 % |
| 360 photo booth | 47 | 405 | 11,6 % |
| photobooth najem | 36 | 214 | 16,8 % |
| photo booth 360 | 31 | 249 | 12,4 % |
| najem photo booth | 27 | 245 | 11,0 % |
| **photo booth** | 22 | **962** | **2,3 %** |
| foto booth najem | 11 | 107 | 10,3 % |
| photo booth cena | 10 | 141 | 7,1 % |

To potrjuje ugotovitev iz Autocomplete:

- **Vseh 10 poizvedb uporablja "photo booth" (ali photobooth, foto booth).** "Foto box", "fotobox", "foto stojnica" ali "foto kotiček" se v top 10 ne pojavijo, čeprav je "Foto box" prva beseda naslova glavne strani.
- **"photo booth" ima skoraj toliko prikazov kot "photo booth najem", a samo 2,3 % CTR.** To je poizvedba, kjer se Google ne odloči med `/` in `/photo-booth` (na SERP-u je Eventaj viden samo prek Maps profila). To je največja priložnost.
- **Cena je del iskalnega namena** ("photo booth najem cena" 18,4 % CTR), zato cena v naslovu `/photo-booth` ostane.
- **360 iščejo kot "360 photo booth najem"**, ne "360° booth najem", kar je zdaj naslov `/360-photo-booth`. Isti problem exact matcha velja tudi za 360 stran. Ker obe poizvedbi vsebujeta "photo booth", je treba preveriti, ali se "photo booth 360" deli med `/photo-booth` in `/360-photo-booth`.

## 2. Kje Eventaj trenutno stoji (google.si, Lenart)

| Poizvedba | URL Eventaj v rezultatih | Opomba |
|---|---|---|
| photo booth najem | `/photo-booth` (1. organski) | + Google Maps profil |
| foto stojnica najem | `/photo-booth` (1. organski) | |
| photo booth cena | `/photo-booth` (~3.) | `/cenik` ni viden |
| photo booth za poroko | `/photo-booth-za-poroko` | pravilna stran |
| **photo booth slovenija** | **domača stran `/`** | ne `/photo-booth` |
| **photo booth maribor** | **domača stran `/`** | ne `/photo-booth` |
| photo booth | samo Maps profil | ni v organskih na 1. strani |
| fotobox najem | ni na 1. strani | |
| foto kotiček najem | ni na 1. strani | |
| photo booth ljubljana | ni na 1. strani | |

## 3. Kanibalizacija: kje je dejansko

### GSC po straneh

**Poizvedba "photo booth najem" (16 mesecev):**

| Stran | Kliki | Prikazi |
|---|---|---|
| `/photo-booth` | 132 | 987 |
| `/` | 0 | 60 |
| `/360-photo-booth` | 0 | 25 |
| `/pogosta-vprasanja` | 0 | 12 |
| `/photo-booth/faq` | 0 | 6 |
| `/blog/photo-boothi-spreminjajo-nacin-kako-praznujemo` | 0 | 2 (stran zdaj vrne 404) |

Pri glavni poizvedbi kanibalizacije v praksi ni: `/photo-booth` dobi 98 % prikazov in vse klike, povprečna pozicija je 4,4. Domača stran se pojavi le občasno.

**Vse poizvedbe, zadnji 3 meseci, po straneh:**

| Stran | Kliki | Prikazi | CTR |
|---|---|---|---|
| `/photo-booth` | 149 | 5.100 | 2,9 % |
| `/` | 88 | 3.707 | 2,4 % |
| `/oprema-za-dogodke/najem-stojecih-miz` | 69 | 648 | 10,6 % |
| `/360-photo-booth` | 67 | 699 | 9,6 % |
| `/oprema-za-dogodke` | 18 | 627 | 2,9 % |
| `/photo-booth-za-rojstni-dan` | 12 | 957 | 1,3 % |
| **`/photo-booth-za-poroko`** | **6** | **1.841** | **0,3 %** |
| `/cenik` | 4 | 174 | 2,3 % |
| `/qr-galerija` | 4 | 59 | 6,8 % |
| `/photo-booth/faq` | 4 | 49 | 8,2 % |

Najbolj sumljiva je **poročna stran**: v treh mesecih ima drugo največ prikazov med photo booth stranmi, a skoraj nič klikov. Če je to "photo booth za poroko" na dobri poziciji, bi CTR moral biti bistveno višji. Bolj verjetno se prikazuje za generične poizvedbe ("photo booth", "foto box", "photo booth najem") na slabih pozicijah, ker ima skoraj enak naslov kot `/photo-booth` ("Foto box (photo booth) za poroko – 279 €" proti "Foto box (photo booth) najem od 279 €"). To bi bila kanibalizacija, ki jo omenja strokovnjak. **Potrditi:** v GSC filter Stran = `/photo-booth-za-poroko` → zavihek Poizvedbe.

Domača stran ima 3.707 prikazov pri 2,4 % CTR. Potrebno je še preveriti, ali je med njimi "photo booth" (962 prikazov, 2,3 % CTR, 16 mesecev): filter Poizvedba = `photo booth` → zavihek Strani.

### a) Domača stran in `/photo-booth`

- `/` title: "Eventaj.si | Photo Booth in 360° Booth za dogodke"
- `/photo-booth` title: "Foto box (photo booth) najem od 279 € | Eventaj.si"

Pri "photo booth najem" GSC tega ne potrjuje (glej zgoraj). Za generične poizvedbe ("photo booth slovenija", "photo booth maribor") pa je SERP pokazal, da Google izbere domačo stran, za "najem" in "cena" pa `/photo-booth`. Isti iskalni namen se deli med dva URL-ja, kar je točno nihanje, ki ga opisuje strokovnjak. Ker domača stran nosi "Photo Booth" na prvem mestu v naslovu, in ker ima največ notranjih in zunanjih povezav, Google ne ve, katera stran je "prava" za photo booth.

### b) Štiri strani z istim vzorcem naslova

```
Foto box (photo booth) najem od 279 €         /photo-booth
Foto box (photo booth) za poroko – 279 €      /photo-booth-za-poroko
Foto box (photo booth) za rojstni dan – 279 € /photo-booth-za-rojstni-dan
Foto box (photo booth) za obletnico – 279 €   /photo-booth-za-obletnico
Foto box za poslovni dogodek – 279 €          /photo-booth-za-poslovni-dogodek
```

Razlikuje jih samo ena beseda. Namen je sicer različen (poroka ≠ splošni najem) in poročna stran pravilno rangira za "photo booth za poroko", zato teh strani ne bi združeval. Popraviti je treba vzorec naslova, da začne z exact match in s ciljno besedo dogodka.

### c) Ceno pokrivajo trije URL-ji (sekundarno)

`/photo-booth` (od 279 € v naslovu), `/cenik` in `/nasveti/koliko-stane-najem-photo-bootha`. Trenutno za "photo booth cena" rangira `/photo-booth`. To ni nujno slabo, ampak pred ukrepanjem preveriti v GSC.

## 4. Predlagan zemljevid ključnih besed

| URL | Glavna KW | Sekundarne | Ne cilja |
|---|---|---|---|
| `/` | Eventaj (znamka), foto atrakcije / oprema za dogodke | 360 booth, QR galerija, oprema kot krovni pregled | "photo booth najem" kot glavni izraz |
| `/photo-booth` | **photo booth najem** | photobooth, fotobox najem, foto stojnica najem, photo booth slovenija, photo booth maribor/ljubljana, photo booth cena | konkretni dogodki |
| `/photo-booth-za-poroko` | **photo booth za poroko** | foto kotiček za poroko, fotobox poroka, poročni photobooth | splošni najem |
| `/photo-booth-za-rojstni-dan` | photo booth za rojstni dan | fotobox za rojstni dan, abraham, 18. rojstni dan | |
| `/photo-booth-za-obletnico` | photo booth za obletnico | foto kotiček abraham, 50 let | |
| `/photo-booth-za-poslovni-dogodek` | photo booth za poslovni dogodek | novoletna zabava, team building, photo booth z logotipom | |
| `/cenik` | cenik photo booth, 360 booth, QR galerija | primerjava paketov | |
| `/nasveti/koliko-stane-najem-photo-bootha` | koliko stane najem photo bootha | photo booth najem cena (informativno) | |
| `/nasveti/foto-box-photo-booth-foto-stojnica` | kaj je photo booth / foto stojnica / fotobox | razlike v imenih | najem |

## 5. Predlogi naslovov

| URL | Zdaj | Predlog | Znakov |
|---|---|---|---|
| `/` | Eventaj.si \| Photo Booth in 360° Booth za dogodke | Eventaj.si \| Foto atrakcije in oprema za dogodke | 48 |
| `/photo-booth` | Foto box (photo booth) najem od 279 € \| Eventaj.si | **Photo booth najem po Sloveniji od 279 € \| Eventaj.si** | 52 |
| `/360-photo-booth` | 360° Booth najem po Sloveniji od 299 € \| Eventaj.si | **360 photo booth najem od 299 € \| Eventaj.si** | 45 |
| `/photo-booth-za-poroko` | Foto box (photo booth) za poroko – 279 € \| Eventaj.si | Photo booth za poroko od 279 € \| Eventaj.si | 43 |
| `/photo-booth-za-rojstni-dan` | Foto box (photo booth) za rojstni dan – 279 € \| … | Photo booth za rojstni dan od 279 € \| Eventaj.si | 48 |
| `/photo-booth-za-obletnico` | Foto box (photo booth) za obletnico – 279 € \| … | Photo booth za obletnico in abraham \| Eventaj.si | 48 |
| `/photo-booth-za-poslovni-dogodek` | Foto box za poslovni dogodek – 279 € \| … | Photo booth za poslovni dogodek z logotipom \| Eventaj.si | 56 |

Ob naslovih:

- **H1 `/photo-booth`**: "Najem photo bootha po Sloveniji" in v prvem odstavku enkrat: "photo booth, ki mu rečemo tudi fotobox ali foto stojnica". Zapis "foto box" narazen zamenjati s "fotobox" povsod (title, H1, opisi paketov, meta description).
- **Domača stran**: H1 in uvod naj ne bosta "photo booth" stran. Kartica Photo Booth naj ima povezavo z besedilom "photo booth najem" na `/photo-booth`.
- **Lokalno**: ker "photo booth maribor" in "photo booth slovenija" zdaj vleče domača stran, mora `/photo-booth` dobiti kratek razdelek o območju (Maribor, Ljubljana, Celje …) z dejanskimi pogoji dostave, sicer po spremembi naslova domače strani te pozicije začasno izgubimo.
- Meta `keywords` ostaja nepomemben (Google ga ne bere).

## 6. Tveganja

- Domača stran trenutno nosi poizvedbe "photo booth slovenija" in "photo booth maribor". Po spremembi naslova lahko pozicije nekaj tednov nihajo, preden jih prevzame `/photo-booth`.
- Posnetek SERP-a je iz ene lokacije in enega dne. Ne nadomešča GSC.

## 7. Kaj potrebujemo za potrditev

1. **Search Console**: Uspešnost → zadnjih 3 mesecev → filter poizvedb vsebuje "booth" ali "box" ali "stojnic" ali "kotič" → zavihek Strani. Za vsako poizvedbo, kjer se pojavita dva URL-ja (`/` in `/photo-booth`), je to potrjena kanibalizacija.
2. **Keyword Planner** (Slovenija, 12 mesecev): photo booth najem, photobooth, fotobox, foto stojnica, foto kotiček, photo booth cena, photo booth za poroko, photo booth maribor, photo booth ljubljana. S tem dobimo dejanske obsege za odločitev, ali gre "fotobox" v title ali samo v besedilo.
3. Po objavi novih naslovov v GSC zahtevati ponovno indeksiranje `/` in `/photo-booth` ter čez 4 tedne ponoviti primerjavo iz točke 2.

## 8. Uvedeni naslovi (preverjeni z Jev, 16. 10. 2026)

Kandidate je napisal Claude, TypeSafe Jev (`jev-1.13.0`) pa je za vsakega odgovoril na pet vprašanj da/ne. Pogoj za objavo: **vsebuje poizvedbo, eno samo ime in konkretna cena/prednost so vsi ≥ 0,90**, in to v dveh zaporednih zagonih (ocene med zagoni nihajo za ±0,02). Med kandidati, ki to izpolnijo, odločata naravna slovenščina in iskalni namen. Ponovna ocena: `node --env-file=.env scripts/jev-meta.mjs`.

Kontrola: stari naslovi s "Foto box (photo booth)" dobijo pri pogoju "eno ime" 0,05–0,14. Pade tudi prvi predlog iz te seje ("Photo booth najem – foto stojnica", "Foto kotiček in photo booth"; 0,04–0,19), ker gre prav tako za dve imeni zapored.

| URL | Title | poizvedba / eno ime / prednost |
|---|---|---|
| `/photo-booth` | Photo booth najem po vsej Sloveniji od 279 € \| Eventaj.si | 0,92 / 0,93 / 0,95 |
| `/photo-booth-za-poroko` | Foto kotiček za poroko z neomejenim tiskom \| Eventaj.si | 0,92 / 0,91 / 0,93 |
| `/photo-booth-za-rojstni-dan` | Photo booth za rojstni dan z neomejenim tiskom \| Eventaj.si | 0,91 / 0,91 / 0,93 |
| `/photo-booth-za-obletnico` | Photo booth za obletnico – od 279 € \| Eventaj.si | 0,91 / 0,90 / 0,90 |
| `/photo-booth-za-poslovni-dogodek` | Photo booth za poslovni dogodek, od 279 € \| Eventaj.si | 0,92 / 0,93 / 0,91 |
| `/360-photo-booth` | 360 photo booth najem po Sloveniji od 299 € \| Eventaj.si | 0,90 / 0,92 / 0,94 |

Prav tako sta mejo prešla meta opisa vseh šestih strani ter H1 na `/photo-booth` ("Photo booth najem s takojšnjim tiskom") in `/360-photo-booth` ("360 photo booth najem od 299 €").

Opombe:
- Za `/photo-booth` in `/360-photo-booth` je Jev dobil podatek iz Search Consolea, da je glavna poizvedba res najbolj klikana. Brez tega je pogoj "vsebuje poizvedbo" ostal pri 0,87–0,89, čeprav se naslov z njo dobesedno začne.
- Eyebrow na poročni strani ("Foto kotiček za poroko") meje ne preide (0,73–0,80 pri pogoju "vsebuje poizvedbo"). To je okrasni napis, ne mesto, ki ga Google bere kot naslov, zato ga Jev ne ocenjuje kot iskalno polje. Slogan H1 poročne strani ("Vajina poroka, ujeta v fotografijah") ni bil ocenjen.
- Sopomenke foto stojnica, fotobox in foto kotiček zdaj ne nastopajo v naslovih (razen foto kotiček na poročni strani). Pogoj "eno ime" izključuje naštevanje, zato so ostale v uvodnem besedilu `/photo-booth`.
