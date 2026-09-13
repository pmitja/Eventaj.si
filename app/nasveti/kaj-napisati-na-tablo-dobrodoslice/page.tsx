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
  TipList,
  CheckList,
  P,
  guideShell,
} from "@/components/nasveti/guide-shell";
const guide = getGuide("kaj-napisati-na-tablo-dobrodoslice");
const title =
  "Kaj napisati na tablo dobrodošlice: primeri besedil | Eventaj.si";
const description =
  "Deset besedil za tablo dobrodošlice, kako zapisati potek dneva in štiri napake, zaradi katerih tabla ne opravi svojega dela.";
const product = equipmentProducts.find(
  (item) => item.slug === "tabla-dobrodoslice",
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
            { label: "Dve nalogi", id: "naloge" },
            { label: "Primeri besedil", id: "primeri" },
            { label: "Potek dneva", id: "urnik" },
            { label: "Napake", id: "napake" },
            { label: "Kaj bi napisali mi", id: "mnenje" },
          ]}
          aside={
            <GuideAside
              eyebrow="Omenjeno v članku"
              title="Tabla dobrodošlice"
              body="Najem s stojalom 49 €, dvodelna s potekom dneva v nakup 79 €. Osnutek prejmete v 48 urah."
              href="/oprema-za-dogodke/tabla-dobrodoslice"
              cta="Poglej tablo"
              secondary={{
                href: "/oprema-za-dogodke/stevilke-miz",
                label: "Številke miz",
              }}
            />
          }
        >
          <GuideSection id="naloge" title="Tabla ima dve nalogi">
            <P>
              {
                "Prva je, da gost ve, da je prišel na pravi naslov. Druga je, da ve, kdaj je večerja."
              }
            </P>
            <P>
              {
                "Prvo opravi večina tabel. Drugo skoraj nobena, čeprav je vprašanje o večerji tisto, ki ga boste ta dan slišali največkrat."
              }
            </P>
          </GuideSection>
          <GuideSection
            id="primeri"
            title="Deset besedil, ki delajo"
            eyebrow="Primeri"
          >
            <P>{"Imena, datum in kraj so obvezni. Vse ostalo je okras."}</P>
            <CheckList
              items={[
                "Dobrodošli na poroki Ane in Marka",
                "Ana in Marko · 12. september 2026",
                "Danes se poročava. Hvala, ker ste tu.",
                "Dobrodošli v najin najlepši dan",
                "Ana & Marko · Domačija Pri Lipi · 12. 9. 2026",
                "Prišli ste prav. Poroka Ane in Marka.",
                "Danes praznujeva z vami",
                "Poroka Ane in Marka · Sedite, kamor želite",
                "Hvala, da ste si vzeli ta dan za naju",
                "Ana in Marko · Zaobljuba ob 16h",
              ]}
            />
            <P>
              {
                "Primer s prostim sedenjem in primer z uro zaobljube poleg pozdrava gostom povesta tudi nekaj uporabnega."
              }
            </P>
          </GuideSection>
          <GuideSection
            id="urnik"
            title="Kako zapisati potek dneva"
            eyebrow="Urnik"
          >
            <P>
              {
                "Dvodelna tabla ima na levi pozdrav, na desni pa potek dneva. Ta stran je tista, ki gostom dejansko koristi."
              }
            </P>
            <P>
              {
                "Zapišite štiri do pet postavk, ne več. Obred, aperitiv, večerja, prvi ples, torta. Vsaka dodatna vrstica zmanjša možnost, da bo gost prebral katerokoli."
              }
            </P>
            <P>
              {
                "Ur ne pišite natančno. Namesto »Večerja 19:00« napišite »Večerja okoli 19h«. Poroke redno zamujajo in tabla, ki obljublja 19:00, ob pol devetih dela slabo voljo pri lačnih ljudeh. Ena beseda vas reši očitka."
              }
            </P>
          </GuideSection>
          <GuideSection
            id="napake"
            title="Štiri napake, ki jih vidimo najpogosteje"
            eyebrow="Napake"
          >
            <TipList
              items={[
                {
                  title: "Točne ure",
                  body: "Opisano zgoraj in daleč najpogostejša. »Okoli« je najcenejša beseda na celi tabli.",
                },
                {
                  title: "Predolgo besedilo",
                  body: "Citat iz pesmi, zahvala staršem in dobrodošlica na isti tabli pomenijo, da ne bo prebrano nič. Za zahvalo obstaja govor.",
                },
                {
                  title: "Premajhna pisava",
                  body: "Tabla stoji zunaj, gost jo bere v hoji, s tri metre razdalje, pogosto v soncu. Imena naj bodo visoka vsaj 6 cm, urnik vsaj 2 cm.",
                },
                {
                  title: "Manjkajoč datum",
                  body: "Deluje nesmiselno, ker vsi vedo, kateri dan je. Fotografija table pa bo čez deset let brez datuma samo fotografija table.",
                },
              ]}
            />
          </GuideSection>
          <GuideSection
            id="mnenje"
            title="Kaj bi napisali mi"
            eyebrow="Naše mnenje"
          >
            <P>
              {
                "Imeni velika, datum in kraj pod njima, na desni strani pet postavk poteka dneva z besedo »okoli« pred vsako uro."
              }
            </P>
            <P>
              {
                "Brez citatov. Brez pesmi. Brez »welcome to our happily ever after«, ker je v slovenskem prostoru to stavek, ki se bere kot prevod."
              }
            </P>
            <P>
              {"Če imate samo eno stran, se odpovejte okrasu in ne urniku."}
            </P>
            <InlineCta
              href="/oprema-za-dogodke/tabla-dobrodoslice"
              label="Poglejte tablo dobrodošlice"
            />
          </GuideSection>
        </GuideLayout>
        <div className={`${guideShell} py-10 xl:hidden`}>
          {
            <GuideAside
              eyebrow="Omenjeno v članku"
              title="Tabla dobrodošlice"
              body="Najem s stojalom 49 €, dvodelna s potekom dneva v nakup 79 €. Osnutek prejmete v 48 urah."
              href="/oprema-za-dogodke/tabla-dobrodoslice"
              cta="Poglej tablo"
              secondary={{
                href: "/oprema-za-dogodke/stevilke-miz",
                label: "Številke miz",
              }}
            />
          }
        </div>
        <GuideClosingCta
          title="Tabla, ki pove tudi, kdaj je večerja."
          body="Najem s stojalom 49 €, dvodelna s potekom dneva 79 €."
          actions={[
            { label: "Preveri termin", variant: "primary" },
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
