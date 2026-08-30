import {
  getGuide,
  qrCodeMistakes,
  qrCodePrintRules,
  qrCodeRequirements,
  qrCodeSteps,
} from "@/content/nasveti";
import Image from "next/image";
import {
  CheckList,
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
import type { TocItem } from "./guide-toc";

const guide = getGuide("qr-koda-za-fotografije");

const toc: readonly TocItem[] = [
  { id: "kaj-je", label: "Kaj koda zna" },
  { id: "generator", label: "Zakaj generator ne zadošča" },
  { id: "postopek", label: "Postopek" },
  { id: "tisk", label: "Velikost za tisk" },
  { id: "napake", label: "Napake" },
];

export function QrCodeGuide() {
  return (
    <main>
      <GuideHero
        eyebrow="Razlaga"
        title="QR koda za fotografije z dogodka"
        lede="QR koda je slika, ki vsebuje povezavo. To je vse, kar zna. Zato vprašanje ni, kako narediti kodo, ampak kam naj ta koda pelje."
        breadcrumb="QR koda za fotografije"
        readMinutes={guide.readMinutes}
        updated={guide.updated}
      />

      <div className={`${guideShell} pb-14 md:pb-20`}>
        <div className="relative aspect-[16/7] overflow-hidden bg-[var(--eventaj-paper-2)]">
          <Image
            src="/qr-galerija/postavitve/table.jpg"
            alt="Mizno stojalo s QR kodo za nalaganje fotografij na dogodku"
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
            eyebrow="Koda in galerija skupaj"
            title="QR galerija Eventaj"
            body="Koda, stran za nalaganje in administracija dogodka v enem. 35 € na dogodek, brez naročnine."
            href="/qr-galerija"
            cta="Poglej QR galerijo"
            secondary={{ href: "/qr-galerija/funkcije", label: "Vse funkcije galerije" }}
          />
        }
      >
        <GuideSection id="kaj-je" title="Koda je samo naslov, ne shramba">
          <P>
            Skener v telefonu iz kode prebere povezavo in jo odpre v brskalniku. Koda sama ne
            shranjuje ničesar in ne ve, kaj je fotografija. Vse, kar bo gost doživel, se zgodi na
            strani, na katero koda pelje.
          </P>
          <P>
            Zato je vprašanje »kako narediti QR kodo« skoraj vedno napačno zastavljeno. Pravo
            vprašanje je, kaj bo gost videl v treh sekundah po skeniranju.
          </P>
        </GuideSection>

        <GuideSection
          id="generator"
          eyebrow="Najpomembnejši del"
          title="Zakaj brezplačen generator ni dovolj"
        >
          <P>
            Brezplačni generatorji naredijo kodo v tridesetih sekundah. Ne naredijo pa mesta, kamor
            bi se fotografije shranile. Če kodo usmerite na skupni album ali mapo v oblaku, se vaš
            gost sreča s prijavo, dovoljenji in aplikacijo, ki je nima nameščene. Tam ga izgubite.
          </P>
          <div className="border border-[rgba(20,17,15,0.12)] bg-[var(--eventaj-paper-2)] p-6 md:p-8">
            <h3 className="font-serif-display text-2xl font-[400] leading-tight">
              Da nalaganje na dogodku dejansko deluje, potrebujete štiri stvari
            </h3>
            <div className="mt-5">
              <CheckList items={qrCodeRequirements} />
            </div>
          </div>
          <P>
            Generator pokrije nič od naštetega. Pokrije le zadnjih pet odstotkov naloge, tistih, ki
            so tako ali tako enostavni.
          </P>
        </GuideSection>

        <GuideSection
          id="postopek"
          eyebrow="Postopek"
          title="Kako pripravite kodo za svoj dogodek"
        >
          <NumberedItems items={qrCodeSteps} />
        </GuideSection>

        <GuideSection id="tisk" eyebrow="Tisk" title="V kakšni velikosti tiskati">
          <P>
            Velikost kode določa razdalja, s katere jo bo gost skeniral, ne velikost tiskovine.
          </P>
          <TipList items={qrCodePrintRules} />
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                src: "/qr-galerija/postavitve/menu-card.jpg",
                alt: "QR koda na menijski kartici na mizi",
                caption: "Mizna kartica ali meni: 4 do 5 cm.",
              },
              {
                src: "/qr-galerija/postavitve/welcome-sign.jpg",
                alt: "QR koda na welcome tabli ob vhodu na dogodek",
                caption: "Welcome tabla: vsaj 10 cm.",
              },
            ].map((item) => (
              <figure key={item.src}>
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--eventaj-paper-2)]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 639px) 100vw, 50vw"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-[var(--eventaj-muted)]">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </GuideSection>

        <GuideSection id="napake" eyebrow="Napake" title="Štiri napake, ki se ponavljajo">
          <TipList items={qrCodeMistakes} />
          <P>
            Pri nas dobite kodo, galerijo in administracijo v enem, za 35 € na dogodek. Koda je na
            voljo v SVG za tisk in v PNG za zaslone, stran za nalaganje pa se odpre brez računa.
          </P>
          <div className="pt-2">
            <InlineCta href="/qr-galerija" label="Poglej QR galerijo" />
          </div>
        </GuideSection>
      </GuideLayout>

      <GuideClosingCta
        title="Koda, galerija in administracija v enem."
        body="35 € na dogodek. SVG za tisk, PNG za zaslone, nalaganje brez aplikacije."
        actions={[
          { href: "/qr-galerija", label: "Poglej QR galerijo", variant: "primary" },
          {
            href: "/nasveti/kako-zbrati-fotografije-gostov-na-poroki",
            label: "Vsi načini zbiranja fotografij",
            variant: "secondary",
          },
        ]}
      />

      <RelatedGuides currentSlug={guide.slug} />
    </main>
  );
}
