import { boothDifferences, boothNames, getGuide } from "@/content/nasveti";
import Link from "next/link";
import {
  GuideAside,
  GuideClosingCta,
  GuideHero,
  GuideLayout,
  GuideSection,
  NumberedItems,
  P,
  RelatedGuides,
  TipList,
} from "./guide-shell";
import type { TocItem } from "./guide-toc";

const guide = getGuide("foto-box-photo-booth-foto-stojnica");

const toc: readonly TocItem[] = [
  { id: "odgovor", label: "Kratek odgovor" },
  { id: "imena", label: "Od kod toliko imen" },
  { id: "razlike", label: "Kaj spremeni izkušnjo" },
  { id: "povprasevanje", label: "Kaj napisati" },
];

export function BoothNamesGuide() {
  return (
    <main>
      <GuideHero
        eyebrow="Razlaga izrazov"
        title="Foto box, photo booth ali foto stojnica: je to isto?"
        lede="Za isto storitev v slovenskih ponudbah kroži pet imen. Spodaj piše, od kod pride vsako, kje se izvedbe res razlikujejo in kaj naj napišete, ko pošiljate povpraševanje. Ena od naštetih stvari res ni isto, vse ostale so."
        breadcrumb="Foto box ali photo booth"
        readMinutes={guide.readMinutes}
        updated={guide.updated}
      />

      <GuideLayout
        toc={toc}
        aside={
          <GuideAside
            eyebrow="Hitri odgovor"
            title="Pet imen, ena storitev"
            body="Izjema je samo 360 booth, kjer namesto fotografije nastane kratek video."
            href="/photo-booth"
            cta="Poglej pakete"
            secondary={{ href: "/nasveti/koliko-stane-najem-photo-bootha", label: "Koliko to stane" }}
          />
        }
      >
        <GuideSection id="odgovor" title="Kratek odgovor: v večini primerov je isto">
          <P>
            Da, isto je. Foto box, fotobox, photo booth, foto stojnica, foto kotiček in foto kabina
            pri slovenskih ponudnikih pomenijo isto storitev. Fotoaparat, osvetlitev, tiskalnik in
            nekdo, ki poskrbi, da vse deluje. Gost se postavi pred objektiv, se slika in v nekaj
            sekundah drži fotografijo v roki.
          </P>
          <P>
            Razlike so v izvedbi, ne v imenu. Dva ponudnika lahko oglašujeta photo booth in imata
            popolnoma različno opremo. Tretji piše foto stojnica in ima boljšo od obeh. Zato ime v
            naslovu ponudbe ne pove skoraj ničesar o tem, kaj boste na dogodku dobili. To povedo
            specifikacije nižje v ponudbi.
          </P>
        </GuideSection>

        <GuideSection id="imena" eyebrow="Izvor" title="Od kod toliko imen">
          <P>
            Vsako ime ima svojo pot v slovenski jezik in svojo skupino ljudi, ki ga uporablja.
          </P>
          <NumberedItems items={boothNames} />
        </GuideSection>

        <GuideSection id="razlike" eyebrow="Uporabni del" title="Kaj res spremeni izkušnjo">
          <P>
            Namesto imena preverite teh pet stvari. Vsaka od njih se na dogodku vidi, ime pa ne.
          </P>
          <TipList items={boothDifferences} />
          <div className="border-l-2 border-[var(--eventaj-accent)] bg-[var(--eventaj-paper-2)] p-6 md:p-7">
            <h3 className="text-base font-semibold">360 booth</h3>
            <p className="mt-3 max-w-xl text-[17px] leading-[1.75] text-[var(--eventaj-ink-2)]">
              Edina različica, ki res ni isto. Namesto fotografije nastane kratek video, posnet z
              vrtečo se kamero okoli stoječega gosta. Kdaj se katera bolj obnese, smo razložili na{" "}
              <Link
                href="/nasveti/360-booth-ali-photo-booth"
                className="font-semibold underline underline-offset-4"
              >
                strani o razliki med 360 boothom in photo boothom
              </Link>
              .
            </p>
          </div>
        </GuideSection>

        <GuideSection id="povprasevanje" eyebrow="Preden pošljete" title="Kaj napisati v povpraševanje">
          <P>
            Uporabite ime, ki vam gre lažje z jezika. Vsak resen ponudnik razume vseh pet. Namesto z
            imenom se ukvarjajte s podatki, iz katerih dobite pravo ceno namesto razpona. To so
            datum, kraj, približno število gostov in koliko ur potrebujete opremo. Če veste tudi,
            kje v prostoru bo oprema stala, dopišite še to.
          </P>
          <P>
            Preden potrdite, preverite specifikacijo. Najbolj pogosta neprijetnost je omejitev
            tiskanja, skrita v drobnem tisku. Paket obljublja neomejeno slikanje, odtisov pa je sto,
            kar pri sto gostih poide v prvi uri. Kaj natanko vprašati in kaj je pri nas vključeno v
            posamezen paket, piše na{" "}
            <Link
              href="/nasveti/koliko-stane-najem-photo-bootha"
              className="font-semibold underline underline-offset-4"
            >
              strani s cenami
            </Link>
            .
          </P>
        </GuideSection>
      </GuideLayout>

      <GuideClosingCta
        title="Pri nas temu rečemo photo booth."
        body="Razumemo vas tudi, če napišete foto box, fotobox ali foto stojnica. Cene in paketi so na eni strani."
        actions={[
          { href: "/photo-booth", label: "Poglej pakete", variant: "primary" },
          { href: "/nasveti/koliko-stane-najem-photo-bootha", label: "Koliko to stane", variant: "secondary" },
        ]}
      />

      <RelatedGuides currentSlug={guide.slug} />
    </main>
  );
}
