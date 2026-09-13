import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
  P,
  guideShell,
} from "@/components/nasveti/guide-shell";
const guide = getGuide("najem-opreme-maribor");
const title = "Najem opreme za dogodke v Mariboru: vodnik | Eventaj.si";
const description =
  "Photo booth, igre in oprema za dogodke v Mariboru in okolici. Cene, dostava iz Lenarta in vprašanja pred najemom.";
const product = equipmentProducts.find(
  (item) => item.slug === "najem-stojecih-miz",
)!;
const image = product.images[2];
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
            { id: "obmocje", label: "Kje začeti" },
            { id: "oprema", label: "Izbira opreme" },
            { id: "dostava", label: "Dostava in prevzem" },
            { id: "nasveti", label: "Pred rezervacijo" },
            { id: "vprasanja", label: "Pogosta vprašanja" },
          ]}
          aside={
            <GuideAside
              eyebrow="Omenjeno v članku"
              title="Oprema iz Lenarta"
              body="Mize, igre in personalizirani izdelki. Sporočite datum in lokacijo, da lahko preverimo termin in strošek dostave."
              href="/oprema-za-dogodke"
              cta="Poglej opremo"
              secondary={{
                href: "/photo-booth",
                label: "Photo booth od 279 €",
              }}
            />
          }
        >
          <GuideSection id="obmocje" title="Najprej lokacija in datum">
            <P>
              Pri najemu opreme za dogodek v Mariboru poleg cene preverite še
              dostavo, postavitev in prevzem. Ponudba za mizo, ki jo prevzamete
              sami, ni enaka ponudbi s prevozom in postavitvijo na lokaciji.
            </P>
            <P>
              Naša oprema je v Lenartu. Dostavo usklajujemo za Maribor, Ptuj,
              Slovensko Bistrico, Slovenske Konjice, Mursko Soboto, Ljutomer,
              Ormož, Gornjo Radgono in druge kraje v okolici. Spodaj
              predstavljamo svojo ponudbo in vprašanja, ki jih je smiselno
              zastaviti pred najemom.
            </P>
          </GuideSection>
          <GuideSection
            id="oprema"
            eyebrow="Ponudba"
            title="Kaj lahko najamete in kaj naročite v last"
          >
            <P>
              Photo booth gostom natisne fotografijo, 360° booth posname video,
              QR galerija pa zbere posnetke z njihovih telefonov. Pri mizah in
              igrah gre za najem. Knjige gostov in drugi personalizirani izdelki
              ostanejo vaši, zato imajo tudi rok izdelave.
            </P>
            <div className="grid gap-4 sm:grid-cols-2">
              {equipmentProducts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/oprema-za-dogodke/${item.slug}`}
                  className="border border-[rgba(20,17,15,0.12)] p-5 no-underline hover:bg-[var(--eventaj-paper-2)]"
                >
                  <h3 className="font-serif-display text-2xl">{item.name}</h3>
                  <p className="mt-3 text-sm text-[var(--eventaj-muted)]">
                    {item.shortDescription}
                  </p>
                  <p className="mt-4 font-semibold">{item.priceLabel}</p>
                  <p className="mt-1 text-xs text-[var(--eventaj-muted)]">
                    {item.priceSubtitle}
                  </p>
                </Link>
              ))}
              <Link
                href="/photo-booth"
                className="border border-[rgba(20,17,15,0.12)] p-5 no-underline hover:bg-[var(--eventaj-paper-2)]"
              >
                <h3 className="font-serif-display text-2xl">Photo booth</h3>
                <p className="mt-3 text-sm text-[var(--eventaj-muted)]">
                  Fotografiranje in tisk fotografij na dogodku.
                </p>
                <p className="mt-4 font-semibold">Od 279 €</p>
              </Link>
              <Link
                href="/qr-galerija"
                className="border border-[rgba(20,17,15,0.12)] p-5 no-underline hover:bg-[var(--eventaj-paper-2)]"
              >
                <h3 className="font-serif-display text-2xl">QR galerija</h3>
                <p className="mt-3 text-sm text-[var(--eventaj-muted)]">
                  Fotografije, videi in voščila gostov na enem mestu.
                </p>
                <p className="mt-4 font-semibold">35 € na dogodek</p>
              </Link>
            </div>
            <InlineCta href="/360-photo-booth" label="Poglejte še 360° booth" />
          </GuideSection>
          <GuideSection
            id="dostava"
            eyebrow="Logistika"
            title="Koliko stane pot do vaše lokacije"
          >
            <P>
              Pri opremi s prevozom se dostava obračuna posebej po 0,40 €/km do
              75 km. Končni strošek preverite v ponudbi, skupaj s potmi za
              dostavo in prevzem. Postavitev in odvoz pri igrah sta vključena v
              paket, prevoz pa se obračuna posebej.
            </P>
            <P>
              Za lokacijo, oddaljeno 20 km, znaša ena 20-kilometrska pot po tej
              tarifi 8 €. To še ni končna cena celotne logistike dogodka.
              Sporočite točen naslov in se dogovorite, koliko poti bo potrebnih.
            </P>
            <P>
              Za osebni prevzem v Lenartu se dogovorite vnaprej. Preverite mere
              opreme, prostor v vozilu in čas vračila. Pri izdelkih, ki jih
              pošiljamo po pošti, se poštnina obračuna posebej.
            </P>
          </GuideSection>
          <GuideSection
            id="nasveti"
            eyebrow="Pred rezervacijo"
            title="Kaj preveriti pri lokalnem ponudniku"
          >
            <TipList
              items={[
                {
                  title: "Celotna cena",
                  body: "Primerjajte opremo, trajanje najema, prevoz, postavitev in odvoz. Krajša pot lahko zniža strošek, končno primerjavo pa naredite na podlagi pisne ponudbe.",
                },
                {
                  title: "Razpoložljivost za vaš datum",
                  body: "Bližina ponudnika še ne pomeni prostega termina. Ob povpraševanju navedite datum, lokacijo in želeno opremo.",
                },
                {
                  title: "Dostop do prostora",
                  body: "Sporočite, ali so na poti stopnice, kje se lahko razloži oprema in kdaj je dovoljena postavitev. Pri boothu preverite tudi električni priključek.",
                },
                {
                  title: "Ogled in rok izdelave",
                  body: "Če želite opremo videti v živo, vprašajte za ogled v Lenartu. Personalizirane izdelke naročite dovolj zgodaj, saj imajo posamezni izdelki različne roke izdelave.",
                },
              ]}
            />
          </GuideSection>
          <GuideSection
            id="vprasanja"
            eyebrow="Vprašanja"
            title="Preden pošljete povpraševanje"
          >
            <TipList
              items={[
                {
                  title: "Ali pokrivate tudi Prekmurje?",
                  body: "Za dostavo v Mursko Soboto, Ljutomer, Gornjo Radgono ali drug kraj pošljite točen naslov. Razdaljo in strošek potrdimo v ponudbi.",
                },
                {
                  title: "Koliko stane dostava v Maribor?",
                  body: "Pri opremi s prevozom je tarifa 0,40 €/km do 75 km. Končni znesek je odvisen od naslova in potrebnih poti za dostavo ter prevzem.",
                },
                {
                  title: "Ali lahko opremo prevzamem sam?",
                  body: "Za osebni prevzem v Lenartu se dogovorite ob povpraševanju. Tako lahko uskladimo primerno vozilo, termin prevzema in vračilo.",
                },
                {
                  title: "Ali delate tudi izven Štajerske?",
                  body: "Za dogodke drugod po Sloveniji pošljite lokacijo in želeno storitev. Možnost prevoza ter njegovo ceno uskladimo posebej.",
                },
                {
                  title: "Kako hitro odgovorite?",
                  body: "Podrobnosti ponudbe za opremo pošljemo v 24 urah. Navedite datum, kraj, količino in želene možnosti, da lahko pripravimo uporaben odgovor.",
                },
              ]}
            />
          </GuideSection>
        </GuideLayout>
        <GuideClosingCta
          title="Pošljite datum, kraj in seznam opreme."
          body="Photo booth od 279 €, QR galerija 35 €, stoječa miza 10 € na dan."
          actions={[
            { label: "Pošlji povpraševanje", variant: "primary" },
            {
              href: "tel:+38631285143",
              label: "Pokliči 031 285 143",
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
