import {
  getGuide,
  weddingPhotoMethods,
  weddingPhotoTips,
} from "@/content/nasveti";
import Image from "next/image";
import {
  GuideAside,
  GuideClosingCta,
  GuideHero,
  GuideLayout,
  GuideSection,
  InlineCta,
  NumberedItems,
  P,
  RelatedGuides,
  TipList,
  guideShell,
} from "./guide-shell";
import { WeddingMethodTable } from "./comparison-tables";
import type { TocItem } from "./guide-toc";

const guide = getGuide("kako-zbrati-fotografije-gostov-na-poroki");

const toc: readonly TocItem[] = [
  { id: "uvod", label: "Uvod" },
  { id: "nacini", label: "Pet načinov" },
  { id: "primerjava", label: "Primerjava" },
  { id: "nasveti", label: "Nasveti za vse" },
  { id: "zakljucek", label: "Kaj bi izbrali mi" },
];

export function WeddingPhotosGuide() {
  return (
    <main>
      <GuideHero
        eyebrow="Vodnik za pare"
        title="Kako zbrati fotografije gostov na poroki"
        lede="Fotograf vam preda nekaj sto fotografij. Sto gostov jih naredi nekajkrat toliko. Vprašanje je samo, koliko jih res pride do vas."
        breadcrumb="Fotografije gostov na poroki"
        readMinutes={guide.readMinutes}
        updated={guide.updated}
      />

      <div className={`${guideShell} pb-14 md:pb-20`}>
        <div className="relative aspect-[16/7] overflow-hidden bg-[var(--eventaj-paper-2)]">
          <Image
            src="/qr-galerija/utrinki/photo-8.jpg"
            alt="Poročni gostje na plesišču, posneto s telefonom"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1279px) 100vw, 1280px"
          />
        </div>
      </div>

      <GuideLayout
        toc={toc}
        aside={
          <GuideAside
            eyebrow="Omenjeno v članku"
            title="QR galerija za poroko"
            body="Gostje skenirajo kodo na mizi in naložijo svoje fotografije, videe in voščila. Brez računa in brez aplikacije."
            href="/qr-galerija/poroka"
            cta="Poglej za 35 €"
            secondary={{ href: "/qr-galerija", label: "Kako galerija deluje" }}
          />
        }
      >
        <GuideSection id="uvod" title="Pet načinov, ki jih pari dejansko uporabljajo">
          <P>
            Spodaj je pet načinov zbiranja fotografij svatov, od popolnoma brezplačnih do
            plačljivih. Pri vsakem piše, kaj v resnici dobite in kje razpade. Zadnji je naš, zato
            je pošteno, da to preberete z zdravo mero dvoma.
          </P>
          <P>
            Če imate za odločitev pet minut: skupni Google album je najboljša brezplačna izbira,
            QR galerija pa najboljša, če hočete originale in čim manj korakov za gosta.
          </P>
        </GuideSection>

        <GuideSection id="nacini" eyebrow="Pet načinov" title="Kaj deluje in kje se zatakne">
          <NumberedItems items={weddingPhotoMethods} />
          <div className="border-l-2 border-[var(--eventaj-accent)] bg-[var(--eventaj-paper-2)] p-6 md:p-7">
            <div className="text-xs font-semibold tabular-nums tracking-[0.18em] text-[var(--eventaj-accent)]">
              05
            </div>
            <h3 className="mt-4 font-serif-display text-2xl font-[400] leading-tight">
              QR galerija
            </h3>
            <p className="mt-3 max-w-xl text-[17px] leading-[1.75] text-[var(--eventaj-ink-2)]">
              Gost skenira kodo na mizi in naloži. Brez računa, brez aplikacije, originali ostanejo
              originali, zraven gredo lahko tudi kratki videi in glasovna voščila. Edini način na
              tem seznamu, ki ni brezplačen. Pri nas stane 35 € na dogodek.
            </p>
            <div className="mt-6">
              <InlineCta href="/qr-galerija/poroka" label="QR galerija za poroko" />
            </div>
          </div>
        </GuideSection>

        <GuideSection id="primerjava" eyebrow="Primerjava" title="Vseh pet načinov drug ob drugem">
          <P>
            Cene so orientacijske in veljajo za povprečno poroko s sto gosti. Stolpec »kje razpade«
            je tisti, ki v praksi odloči.
          </P>
          <WeddingMethodTable />
        </GuideSection>

        <GuideSection
          id="nasveti"
          eyebrow="Velja za vse načine"
          title="Ne glede na to, kaj izberete"
        >
          <P>
            Odziv gostov je odvisen bolj od tega, kako jih povabite, kot od tehnologije, ki jo
            izberete. Teh pet stvari velja za vse načine na tem seznamu.
          </P>
          <TipList items={weddingPhotoTips} />
        </GuideSection>

        <GuideSection id="zakljucek" eyebrow="Naše mnenje" title="Kaj bi izbrali mi">
          <P>
            Če vam gre za nekaj spominov na telefonu, je skupni Google album dovolj in ne stane nič.
          </P>
          <P>
            Če hočete originale, videe in posnetke, ki jih boste čez deset let še odprli, se izplača
            plačati za način, pri katerem gostu ni treba ničesar odpirati, nameščati ali potrjevati.
            Prav zato smo QR galerijo sploh naredili.
          </P>
          <div className="pt-2">
            <InlineCta
              href="/qr-galerija/poroka"
              label="Poglej QR galerijo za poroko"
            />
          </div>
        </GuideSection>
      </GuideLayout>

      <GuideClosingCta
        title="Ena QR koda na mizi. Vse fotografije svatov na enem mestu."
        body="35 € na dogodek, neomejeno gostov, brez naročnine."
        actions={[
          { href: "/qr-galerija/poroka", label: "QR galerija za poroko", variant: "primary" },
          { href: "/nasveti/qr-koda-za-fotografije", label: "Kako pripraviti QR kodo", variant: "secondary" },
        ]}
      />

      <RelatedGuides currentSlug={guide.slug} />
    </main>
  );
}
