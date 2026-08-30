import { boothSpaceRules, boothVerdicts, getGuide } from "@/content/nasveti";
import Link from "next/link";
import {
  GuideAside,
  GuideClosingCta,
  GuideHero,
  GuideLayout,
  GuideSection,
  P,
  RelatedGuides,
  TipList,
} from "./guide-shell";
import { BoothComparisonTable } from "./comparison-tables";
import type { TocItem } from "./guide-toc";

const guide = getGuide("360-booth-ali-photo-booth");

const toc: readonly TocItem[] = [
  { id: "razlika", label: "Glavna razlika" },
  { id: "tabela", label: "Primerjava" },
  { id: "prostor", label: "Prostor" },
  { id: "priporocilo", label: "Kdaj katerega" },
];

export function Booth360Guide() {
  return (
    <main>
      <GuideHero
        eyebrow="Primerjava naših storitev"
        title="360 booth ali klasični photo booth"
        lede="Ponujamo oboje, zato vam lahko povemo brez ovinkov. Photo booth naredi fotografijo, ki jo gost odnese domov v roki, 360 booth pa kratek video, ki ga objavi še isti večer. Prvi konča na hladilniku, drugi na Instagramu."
        breadcrumb="360 booth ali photo booth"
        readMinutes={guide.readMinutes}
        updated={guide.updated}
      />

      <GuideLayout
        toc={toc}
        aside={
          <GuideAside
            eyebrow="Pred rezervacijo"
            title="Izmerite prostor"
            body="360 booth potrebuje 3 × 3 m prostih tal in vtičnico, photo booth pa 2,5 × 2 m. Izmerite prej, kot rezervirate."
            href="/360-photo-booth"
            cta="360° Booth paketi"
            secondary={{ href: "/photo-booth", label: "Photo Booth paketi" }}
          />
        }
      >
        <GuideSection id="razlika" title="Glavna razlika je v tem, kaj gost odnese">
          <P>
            Photo booth fotografira in natisne na mestu. Gost odnese fotografijo s seboj takoj, z
            vašim okvirjem, imeni in datumom. Ta fotografija pristane na hladilniku, na mizi v
            pisarni, v denarnici. Čez leta jo bo še vedno imel.
          </P>
          <P>
            360 booth deluje drugače. Gost stopi na ploščad, kamera na roki zaokroži okoli njega in
            posname nekaj sekund videa v počasnem posnetku. Video dobi na telefon, preden se vrne na
            plesišče. Taka 360 video stojnica dela predvsem za omrežja. Glasba, počasni posnetek in
            obrazi vaših gostov. Če vam je pomembno, da ljudje o vašem dogodku objavljajo že med
            njim, je to prava naprava.
          </P>
        </GuideSection>

        <GuideSection id="tabela" eyebrow="Primerjava" title="Po številkah">
          <P>Tole so podatki, po katerih se najpogosteje odločate.</P>
          <BoothComparisonTable />
          <P>
            Razlika v ceni je majhna, razlika v prostoru pa ni. 360 booth potrebuje 3 × 3 m prostih
            tal, in prav to je razlog, zaradi katerega največkrat odpade. Kaj je v posameznem paketu
            vključeno, piše na{" "}
            <Link href="/cenik" className="font-semibold underline underline-offset-4">
              ceniku
            </Link>
            .
          </P>
        </GuideSection>

        <GuideSection id="prostor" eyebrow="Najpogostejši razlog za odpoved" title="Kaj preveriti v dvorani">
          <P>
            Kvadratura ni edino, kar odloči. Preden rezervirate 360 booth, poglejte štiri stvari.
          </P>
          <TipList items={boothSpaceRules} />
          <P>
            Če niste prepričani, nam pošljite fotografijo prostora in vam povemo, ali gre notri. Na
            poroki 360 kamera za poroko najbolje dela pozno zvečer, ko se ples začne. Postavite jo
            blizu plesišča, a ne na pot do šanka.
          </P>
        </GuideSection>

        <GuideSection id="priporocilo" eyebrow="Priporočilo" title="Kdaj katerega">
          <div className="grid border-t border-[rgba(20,17,15,0.12)]">
            {boothVerdicts.map((verdict) => (
              <div key={verdict.title} className="border-b border-[rgba(20,17,15,0.12)] py-7">
                <h3 className="font-serif-display text-2xl font-[400] leading-tight">
                  {verdict.title}
                </h3>
                <p className="mt-3 max-w-2xl text-[17px] leading-[1.75] text-[var(--eventaj-muted)]">
                  {verdict.body}
                </p>
              </div>
            ))}
          </div>
        </GuideSection>
      </GuideLayout>

      <GuideClosingCta
        title="Kateri od obeh je za vaš dogodek?"
        body="Poglejte pakete in cene za oba. Če niste prepričani, nam napišite velikost dvorane in število gostov."
        actions={[
          { href: "/360-photo-booth", label: "360° Booth paketi", variant: "primary" },
          { href: "/photo-booth", label: "Photo booth paketi", variant: "secondary" },
        ]}
      />

      <RelatedGuides currentSlug={guide.slug} />
    </main>
  );
}
