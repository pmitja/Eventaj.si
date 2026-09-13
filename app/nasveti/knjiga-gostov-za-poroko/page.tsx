import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "react-schemaorg";
import type { Article, BreadcrumbList } from "schema-dts";
import { getGuide } from "@/content/nasveti";
import { equipmentProducts } from "@/content/eventaj/equipment";
import {
  guideArticleSchema,
  guideBreadcrumbSchema,
} from "@/content/nasveti-schema";
import {
  GuideHero,
  GuideLayout,
  GuideSection,
  GuideAside,
  GuideClosingCta,
  RelatedGuides,
  InlineCta,
  NumberedItems,
  TipList,
  P,
  guideShell,
} from "@/components/nasveti/guide-shell";
const guide = getGuide("knjiga-gostov-za-poroko");
const title =
  "Knjiga gostov za poroko: katera se dejansko izpolni | Eventaj.si";
const description =
  "Pet vrst knjige gostov, cene od 25 do 200 €, in pošteno o tem, katera ostane prazna. Primerjava in nasveti za poroko.";
const product = equipmentProducts.find(
  (item) => item.slug === "knjiga-gostov-v-okvirju",
)!;
const image = product.images[0];
const url = `https://www.eventaj.si/nasveti/${guide.slug}`;
export const metadata: Metadata = {
  title,
  description,
  keywords: [guide.label, "poroka", "oprema za dogodke"],
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    siteName: "Eventaj.si",
    type: "article",
    locale: "sl_SI",
    publishedTime: guide.updated,
    modifiedTime: guide.updated,
    images: [{ url: image.src, alt: image.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image.src],
  },
};
export default function GuidePage() {
  return (
    <>
      <JsonLd<Article>
        item={guideArticleSchema({
          slug: guide.slug,
          headline: guide.label,
          description,
          image: image.src,
          published: guide.updated,
          modified: guide.updated,
          keywords: [guide.label, "poroka"],
        })}
      />
      <JsonLd<BreadcrumbList>
        item={guideBreadcrumbSchema({ slug: guide.slug, name: guide.label })}
      />
      <main>
        <GuideHero
          eyebrow={guide.eyebrow}
          title={guide.label}
          lede={guide.teaser}
          breadcrumb={guide.label}
          readMinutes={guide.readMinutes}
          updated={guide.updated}
        />
        <div className={`${guideShell} pb-14 md:pb-20`}>
          <div className="relative aspect-[4/3] md:aspect-[16/7] overflow-hidden bg-[var(--eventaj-paper-2)]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              className="object-contain"
              sizes="(max-width: 1279px) 100vw, 1280px"
            />
          </div>
        </div>
        <GuideLayout
          toc={[
            { label: "Uvod", id: "uvod" },
            { label: "Pet možnosti", id: "moznosti" },
            { label: "Primerjava", id: "primerjava" },
            { label: "Od česa je odvisno", id: "nasveti" },
            { label: "Kaj bi izbrali mi", id: "mnenje" },
          ]}
          aside={
            <GuideAside
              eyebrow="Omenjeno v članku"
              title="Knjiga gostov v okvirju"
              body="Srček ali drevo življenja, 150 ploščic, škatla in tablica z navodilom. Gravura imen in datuma je v ceni."
              href="/oprema-za-dogodke/knjiga-gostov-v-okvirju"
              cta="Poglej za 175 €"
              secondary={{
                href: "/oprema-za-dogodke/porocni-puzzle",
                label: "Poročni puzzle",
              }}
            />
          }
        >
          <GuideSection id="uvod" title="Vprašanje ni, katera je najlepša">
            <P>
              {
                "Prodajamo dve od petih možnosti na tem seznamu, zato to zapišimo takoj. Preostale tri opisujemo tako, kot jih vidimo pri dogodkih, ne tako, kot bi nam ustrezalo."
              }
            </P>
            <P>
              {
                "Če imate pet minut: za poroko do 60 gostov zadošča klasična knjiga, nad 80 gosti pa se splača nekaj, kjer gost napiše en stavek in ne cele strani."
              }
            </P>
          </GuideSection>
          <GuideSection
            id="moznosti"
            title="Kaj ponuja trg"
            eyebrow="Pet možnosti"
          >
            <NumberedItems
              items={[
                {
                  number: "01",
                  title: "Klasična knjiga",
                  body: "Vezan album s praznimi stranmi, od 25 do 40 €. Najcenejša in najbolj znana možnost. Težava je prazna stran, ki jo gost dobi pred sabo brez navodila, koliko naj napiše. Pri večjih porokah jo izpolni manj kot polovica gostov.",
                },
                {
                  number: "02",
                  title: "Srček ali drevo z lesenimi ploščicami",
                  body: "Okvir s pleksi sprednjo stranjo, v katerega gostje spuščajo podpisane ploščice. Od 175 €. Ker ima ploščica prostor za eno poved, je pritisk manjši in izpolnjenost bistveno višja. Po poroki ostane na steni. Naša.",
                },
                {
                  number: "03",
                  title: "Poročni puzzle",
                  body: "Gost podpiše svoj košček, par pa puzzle pozneje sestavi. Od 200 €. Deluje enako dobro pri majhnih in velikih porokah. Koščki se izgubljajo, zato jih naročite deset več, kot imate gostov, in postavite zraven škatlo. Tudi naš.",
                },
                {
                  number: "04",
                  title: "Zvočna knjiga gostov",
                  body: "Preurejen retro telefon, v katerega gost posname voščilo. Najem okoli 55 €. Starejši gostje se ga pogosto ne dotaknejo, mlajši pa posnamejo več, kot bi kdaj napisali. Za prevzem posnetkov potrebujete ponudnika, ki vam jih dejansko preda.",
                },
                {
                  number: "05",
                  title: "Polaroid album",
                  body: "Gost se fotografira, sliko prilepi v album in se podpiše zraven. Najem fotoaparata okoli 30 €, film pa 1 do 1,50 € na posnetek. Pri sto gostih je film sam dražji od marsikatere druge možnosti na tem seznamu.",
                },
              ]}
            />
          </GuideSection>
          <GuideSection
            id="primerjava"
            title="Vseh pet drug ob drugem"
            eyebrow="Primerjava"
          >
            <P>{"Cene so za slovenski trg jeseni 2026 in vključujejo DDV."}</P>
            <P>
              {
                "Primerjava petih vrst knjige gostov po ceni, rezultatu in slabosti."
              }
            </P>
            <div
              role="region"
              aria-label="Primerjalna tabela"
              tabIndex={0}
              className="overflow-x-auto border border-[rgba(20,17,15,0.12)]"
            >
              <table className="w-full min-w-[560px] text-left text-sm">
                <caption className="sr-only">Vseh pet drug ob drugem</caption>
                <thead>
                  <tr>
                    <th scope="col" className="bg-[var(--eventaj-paper-2)] p-4">
                      {"Možnost"}
                    </th>
                    <th scope="col" className="bg-[var(--eventaj-paper-2)] p-4">
                      {"Cena"}
                    </th>
                    <th scope="col" className="bg-[var(--eventaj-paper-2)] p-4">
                      {"Kaj dobite"}
                    </th>
                    <th scope="col" className="bg-[var(--eventaj-paper-2)] p-4">
                      {"Kje razpade"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[rgba(20,17,15,0.12)]">
                    <th scope="row" className="p-4">
                      {"Klasična knjiga"}
                    </th>
                    <td className="p-4">{"25 do 40 €"}</td>
                    <td className="p-4">{"Vezan album z voščili"}</td>
                    <td className="p-4">
                      {"Prazna stran odvrne polovico gostov"}
                    </td>
                  </tr>
                  <tr className="border-t border-[rgba(20,17,15,0.12)]">
                    <th scope="row" className="p-4">
                      {"Srček ali drevo"}
                    </th>
                    <td className="p-4">{"od 175 €"}</td>
                    <td className="p-4">{"Okvir za na steno"}</td>
                    <td className="p-4">
                      {"Število ploščic je treba prilagoditi gostom"}
                    </td>
                  </tr>
                  <tr className="border-t border-[rgba(20,17,15,0.12)]">
                    <th scope="row" className="p-4">
                      {"Poročni puzzle"}
                    </th>
                    <td className="p-4">{"od 200 €"}</td>
                    <td className="p-4">{"Sestavljanka za na steno"}</td>
                    <td className="p-4">{"Koščki se izgubijo"}</td>
                  </tr>
                  <tr className="border-t border-[rgba(20,17,15,0.12)]">
                    <th scope="row" className="p-4">
                      {"Zvočna knjiga"}
                    </th>
                    <td className="p-4">{"najem okoli 55 €"}</td>
                    <td className="p-4">{"Posnetki glasov"}</td>
                    <td className="p-4">{"Starejši gostje ga ne uporabijo"}</td>
                  </tr>
                  <tr className="border-t border-[rgba(20,17,15,0.12)]">
                    <th scope="row" className="p-4">
                      {"Polaroid album"}
                    </th>
                    <td className="p-4">{"30 € + film"}</td>
                    <td className="p-4">{"Fotografije z voščili"}</td>
                    <td className="p-4">{"Film podraži na 150 € in več"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GuideSection>
          <GuideSection
            id="nasveti"
            title="Od česa je odvisno, ali se izpolni"
            eyebrow="Velja za vse"
          >
            <TipList
              items={[
                {
                  title: "Pisalo mora pisati po podlagi",
                  body: "Navaden kemični svinčnik po brušenem lesu pusti komaj vidno sled. Pri leseni knjigi gostov potrebujete fine marker, sicer gostje po drugem poskusu odnehajo. To je najpogostejši razlog za polovično izpolnjeno knjigo.",
                },
                {
                  title: "Postavite jo tja, kjer ljudje stojijo",
                  body: "Knjiga gostov na mizi v kotu ostane prazna. Pri vhodu ali ob aperitivu, kjer svatje že stojijo s kozarcem in čakajo, se izpolni sama.",
                },
                {
                  title: "En stavek je manjši pritisk kot prazna stran",
                  body: "Ploščica ali košček puzzla gostu pove, koliko se od njega pričakuje. Prazna stran ne pove nič in prav zato marsikdo obrne na naslednjo.",
                },
                {
                  title: "Nekdo mora gostom povedati",
                  body: "Napišite navodilo na tablico zraven in prosite voditelja, naj to enkrat omeni. Deset sekund med večerjo naredi razliko med polovico in tremi četrtinami.",
                },
              ]}
            />
          </GuideSection>
          <GuideSection
            id="mnenje"
            title="Kaj bi izbrali mi"
            eyebrow="Naše mnenje"
          >
            <P>
              {
                "Do 60 gostov klasična knjiga s spodobnim pisalom. Pri tem obsegu se izpolni in 150 € prihranka je 150 € prihranka."
              }
            </P>
            <P>
              {
                "Nad 80 gostov srček ali drevo. Ne zato ker ga prodajamo, ampak zato ker pri tem številu gostov prazna stran postane realna možnost, ploščica pa ne."
              }
            </P>
            <P>
              {
                "Puzzle vzemite, če vam je všeč misel, da ga boste sestavljali naslednji dan ob kavi. Če vam to ne pomeni nič, vzemite okvir, ker je manj dela."
              }
            </P>
            <P>
              {
                "Zvočno knjigo bi vzeli kot dodatek in ne kot edino rešitev. Glasovi so lepi, seznam podpisov pa ostane koristen."
              }
            </P>
            <InlineCta
              href="/oprema-za-dogodke/knjiga-gostov-v-okvirju"
              label="Poglejte knjigo gostov v okvirju"
            />
          </GuideSection>
        </GuideLayout>
        <div className={`${guideShell} py-10 xl:hidden`}>
          {
            <GuideAside
              eyebrow="Omenjeno v članku"
              title="Knjiga gostov v okvirju"
              body="Srček ali drevo življenja, 150 ploščic, škatla in tablica z navodilom. Gravura imen in datuma je v ceni."
              href="/oprema-za-dogodke/knjiga-gostov-v-okvirju"
              cta="Poglej za 175 €"
              secondary={{
                href: "/oprema-za-dogodke/porocni-puzzle",
                label: "Poročni puzzle",
              }}
            />
          }
        </div>
        <GuideClosingCta
          title="Knjiga, ki po poroki ostane na steni."
          body="Okvir s 150 ploščicami, od 175 €. Izdelava 21 dni."
          actions={[
            {
              label: "Poglej knjigo gostov",
              variant: "primary",
              href: "/oprema-za-dogodke/knjiga-gostov-v-okvirju",
            },
            {
              href: "/oprema-za-dogodke",
              label: "Poglej vso opremo",
              variant: "secondary",
            },
          ]}
        />
        <RelatedGuides currentSlug={guide.slug} />
      </main>
    </>
  );
}
export const dynamic = "force-static";
