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
const guide = getGuide("igre-na-poroki");
const title =
  "Igre na poroki: kaj zapolni luknjo med kosilom in plesom | Eventaj.si";
const description =
  "Pet vrtnih iger za poroko, za koga so, koliko prostora potrebujejo in kje odpovejo. Cene najema in nasveti za postavitev.";
const product = equipmentProducts.find(
  (item) => item.slug === "igre-za-dogodke",
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
            { label: "Pet iger", id: "igre" },
            { label: "Primerjava", id: "primerjava" },
            { label: "Preden jih postavite", id: "nasveti" },
            { label: "Kaj bi postavili mi", id: "mnenje" },
          ]}
          aside={
            <GuideAside
              eyebrow="Omenjeno v članku"
              title="Igre za dogodke"
              body="Štiri igre po izbiri, tablice s pravili in vsi rekviziti. Postavitev in odvoz sta v ceni."
              href="/oprema-za-dogodke/igre-za-dogodke"
              cta="Poglej paket, od 149 €"
              secondary={{ href: "/oprema-za-dogodke", label: "Vsa oprema" }}
            />
          }
        >
          <GuideSection id="uvod" title="Dve uri, ki jih nihče ne načrtuje">
            <P>
              {
                "Orkester še ne igra, kosilo je pospravljeno, starejši sedijo za mizami, otroci tečejo po dvorišču in mlajši gostje gledajo v telefone. Ta del dneva je na vsaki poroki in skoraj nikjer v načrtu."
              }
            </P>
            <P>
              {
                "Igre so najcenejši način, da ga zapolnite. Oddajamo jih, zato to preberite z zdravo mero dvoma, spodnje slabosti pa so vse resnične."
              }
            </P>
          </GuideSection>
          <GuideSection
            id="igre"
            title="Kaj deluje na travi"
            eyebrow="Pet iger"
          >
            <NumberedItems
              items={[
                {
                  number: "01",
                  title: "Limbo",
                  body: "Palica na dveh stojalih z nastavljivo višino. Pobere najstnike in tridesetletnike, starejši gostje samo gledajo, kar je tudi v redu. Potrebuje ravno podlago, sicer stojali nista poravnani in palica pada sama od sebe.",
                },
                {
                  number: "02",
                  title: "Štrbunk",
                  body: "Metanje vrečk v nagnjeno desko z luknjo, v svetu znan kot cornhole. V Sloveniji ima svojo zvezo in uradna pravila, zato ga marsikdo že pozna. Edina igra s tega seznama, ki jo gostje poimenujejo sami.",
                },
                {
                  number: "03",
                  title: "Metanje obročkov",
                  body: "Obročki na steklenice v zaboju. Najlažja za razumevanje in edina, ki hkrati zaposli petletnika in njegovo babico. Obročki se izgubljajo v travi, zato računajte, da jih boste nekaj pobrali iz žive meje.",
                },
                {
                  number: "04",
                  title: "Podiranje stolpa",
                  body: "Leseni valji v piramidi, ki jih podirate z žogico. Sejemska igra, ki na poroki deluje zato, ker traja trideset sekund in gost ne izgubi kozarca iz roke.",
                },
                {
                  number: "05",
                  title: "Kotaljenje žogic",
                  body: "Žogico zakotalite po klančini proti luknjam z različnim številom točk. Angleško bagatelle. Slovenskega imena nima, zato jo poimenujte opisno, sicer je nihče ne bo razumel s tablice.",
                },
              ]}
            />
          </GuideSection>
          <GuideSection
            id="primerjava"
            title="Drug ob drugem"
            eyebrow="Primerjava"
          >
            <P>
              {
                "Primerjava petih vrtnih iger po ciljni skupini, potrebnem prostoru in slabostih."
              }
            </P>
            <div
              role="region"
              aria-label="Primerjalna tabela"
              tabIndex={0}
              className="overflow-x-auto border border-[rgba(20,17,15,0.12)]"
            >
              <table className="w-full min-w-[560px] text-left text-sm">
                <caption className="sr-only">Drug ob drugem</caption>
                <thead>
                  <tr>
                    <th scope="col" className="bg-[var(--eventaj-paper-2)] p-4">
                      {"Igra"}
                    </th>
                    <th scope="col" className="bg-[var(--eventaj-paper-2)] p-4">
                      {"Za koga"}
                    </th>
                    <th scope="col" className="bg-[var(--eventaj-paper-2)] p-4">
                      {"Prostor"}
                    </th>
                    <th scope="col" className="bg-[var(--eventaj-paper-2)] p-4">
                      {"Kje razpade"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[rgba(20,17,15,0.12)]">
                    <th scope="row" className="p-4">
                      {"Limbo"}
                    </th>
                    <td className="p-4">{"12 do 40 let"}</td>
                    <td className="p-4">{"3 x 3 m, ravna tla"}</td>
                    <td className="p-4">{"Na strmini ne stoji"}</td>
                  </tr>
                  <tr className="border-t border-[rgba(20,17,15,0.12)]">
                    <th scope="row" className="p-4">
                      {"Štrbunk"}
                    </th>
                    <td className="p-4">{"vse starosti"}</td>
                    <td className="p-4">{"10 m dolžine"}</td>
                    <td className="p-4">{"Vrečke ob dežju navlečejo vodo"}</td>
                  </tr>
                  <tr className="border-t border-[rgba(20,17,15,0.12)]">
                    <th scope="row" className="p-4">
                      {"Metanje obročkov"}
                    </th>
                    <td className="p-4">{"otroci in starejši"}</td>
                    <td className="p-4">{"4 m dolžine"}</td>
                    <td className="p-4">{"Obročki se izgubijo v travi"}</td>
                  </tr>
                  <tr className="border-t border-[rgba(20,17,15,0.12)]">
                    <th scope="row" className="p-4">
                      {"Podiranje stolpa"}
                    </th>
                    <td className="p-4">{"vse starosti"}</td>
                    <td className="p-4">{"5 m dolžine"}</td>
                    <td className="p-4">
                      {"Potrebuje mizo ali trdno podlago"}
                    </td>
                  </tr>
                  <tr className="border-t border-[rgba(20,17,15,0.12)]">
                    <th scope="row" className="p-4">
                      {"Kotaljenje žogic"}
                    </th>
                    <td className="p-4">{"odrasli"}</td>
                    <td className="p-4">{"2 x 1 m, miza"}</td>
                    <td className="p-4">{"Ime je treba razložiti"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GuideSection>
          <GuideSection
            id="nasveti"
            title="Preden jih postavite"
            eyebrow="Velja za vse"
          >
            <TipList
              items={[
                {
                  title: "Ravna podlaga ali nič",
                  body: "Na travniku z naklonom polovica iger ne stoji. Preverite teren, preden se odločite za limbo, ali pa izberite igre, ki stojijo na mizi.",
                },
                {
                  title: "Pravila na tablico ob igro",
                  body: "Brez tablice boste vi tisti, ki boste ves popoldan razlagali pravila. Ena poved zadošča.",
                },
                {
                  title: "Dogovorite se, kdo jih zvečer pospravi",
                  body: "Les prenese popoldansko ploho, noči na dežju pa ne. Recite priči ali komu iz ekipe, naj jih ob mraku pospravi pod streho.",
                },
                {
                  title: "Ne postavljajte jih med obedom",
                  body: "Postavite jih po kosilu, ne pred njim. Če stojijo že ob aperitivu, so do popoldneva stara novica, ravno takrat, ko bi jih potrebovali.",
                },
              ]}
            />
          </GuideSection>
          <GuideSection
            id="mnenje"
            title="Kaj bi postavili mi"
            eyebrow="Naše mnenje"
          >
            <P>
              {
                "Če vzamete eno samo, vzemite metanje obročkov. Razume jo vsak, ne potrebuje razlage in pokrije najširši razpon let."
              }
            </P>
            <P>
              {
                "Če vzamete štiri, dodajte limbo za mlajše, štrbunk za tiste, ki tekmujejo, in podiranje stolpa za tiste, ki mimogrede vržejo enkrat. To je kombinacija, ki jo pri dogodkih vidimo delovati najbolj enakomerno."
              }
            </P>
            <P>
              {
                "Česar ne bi počeli: iger ne postavljajte kot organizirano animacijo z voditeljem in urnikom. Delujejo prav zato, ker gost pride mimo, vrže trikrat in gre naprej."
              }
            </P>
            <InlineCta
              href="/oprema-za-dogodke/igre-za-dogodke"
              label="Poglejte paket iger za dogodke"
            />
          </GuideSection>
        </GuideLayout>
        <div className={`${guideShell} py-10 xl:hidden`}>
          {
            <GuideAside
              eyebrow="Omenjeno v članku"
              title="Igre za dogodke"
              body="Štiri igre po izbiri, tablice s pravili in vsi rekviziti. Postavitev in odvoz sta v ceni."
              href="/oprema-za-dogodke/igre-za-dogodke"
              cta="Poglej paket, od 149 €"
              secondary={{ href: "/oprema-za-dogodke", label: "Vsa oprema" }}
            />
          }
        </div>
        <GuideClosingCta
          title="Postavimo zjutraj, poberemo naslednji dan."
          body="Paket štirih iger od 149 €, postavitev in odvoz vključena. Prevoz se obračuna posebej po 0,40 €/km do 75 km."
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
