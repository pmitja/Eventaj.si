import { getGuide, priceFactors, priceQuestions } from "@/content/nasveti";
import Link from "next/link";
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
} from "./guide-shell";
import { PricingTable } from "./comparison-tables";
import type { TocItem } from "./guide-toc";

const guide = getGuide("koliko-stane-najem-photo-bootha");

const toc: readonly TocItem[] = [
  { id: "odgovor", label: "Odgovor takoj" },
  { id: "cenik", label: "Naš cenik" },
  { id: "dejavniki", label: "Zakaj se cene razlikujejo" },
  { id: "vprasanja", label: "Šest vprašanj" },
  { id: "proracun", label: "Če je proračun tesen" },
];

export function BoothPriceGuide() {
  return (
    <main>
      <GuideHero
        eyebrow="Cene"
        title="Koliko stane najem photo bootha v Sloveniji"
        lede="Cena je odvisna od števila ur in od tega, kaj je v paketu že vključeno. Naši paketi stanejo od 279 do 379 evrov. Spodaj je cel cenik in razlaga, zakaj sta dve ponudbi z isto ceno lahko na koncu večera stali zelo različno."
        breadcrumb="Cena najema photo bootha"
        readMinutes={guide.readMinutes}
        updated={guide.updated}
      />

      <GuideLayout
        toc={toc}
        aside={
          <GuideAside
            eyebrow="Naše cene"
            title="Od 279 € za dve uri"
            body="Neomejeno tiskanje, prisotna ekipa in fotografije v 48 urah so vključeni v vsak paket."
            href="/cenik"
            cta="Odpri cenik"
            secondary={{ href: "/photo-booth", label: "Photo Booth paketi" }}
          />
        }
      >
        <GuideSection id="odgovor" title="Odgovor takoj">
          <P>
            Najem photo bootha v Sloveniji stane od 250 do 350 evrov za dve uri in od 350 do 500
            evrov za cel večer. Naši paketi so v spodnjem delu tega razpona, od 279 do 379 evrov, in
            jih objavljamo javno.
          </P>
          <P>
            Razlika med ponudniki ni toliko v opremi. Fotoaparat, osvetlitev in tiskalnik so pri
            večini podobni. Razlika je v tem, kaj je v ceni že vključeno in kaj se doplača. Če
            iščete pod imenom{" "}
            <Link
              href="/nasveti/foto-box-photo-booth-foto-stojnica"
              className="font-semibold underline underline-offset-4"
            >
              foto box ali foto stojnica
            </Link>
            , gre za isto storitev in ista pravila veljajo tudi tam.
          </P>
        </GuideSection>

        <GuideSection id="cenik" eyebrow="Naš cenik" title="Kar je v tabeli, je tudi na računu">
          <P>Naše cene so fiksne in veljajo po vsej Sloveniji.</P>
          <PricingTable />
          <P>
            Zadnji dve vrstici nista paketa photo bootha.{" "}
            <Link href="/nasveti/360-booth-ali-photo-booth" className="font-semibold underline underline-offset-4">
              360° Booth
            </Link>{" "}
            snema kratke videe namesto tiskanih fotografij, QR galerija pa zbira fotografije, ki jih
            gostje slikajo sami.
          </P>
        </GuideSection>

        <GuideSection
          id="dejavniki"
          eyebrow="Mehanizem"
          title="Zakaj se cene med ponudniki tako razlikujejo"
        >
          <P>
            Cena najema ni ena številka. Sestavljena je iz šestih stvari, ki jih ponudniki različno
            vračunavajo. Ko razumete teh šest, znate primerjati ponudbe med seboj. Brez tega
            primerjate samo velike črke na prvi strani.
          </P>
          <NumberedItems items={priceFactors} />
        </GuideSection>

        <GuideSection id="vprasanja" eyebrow="Kontrolni seznam" title="Šest vprašanj pred rezervacijo">
          <P>
            Ta seznam si shranite in ga pošljite vsakemu ponudniku, ki ga primerjate. Šest vprašanj,
            na katera je odgovor kratek. Kdor odgovori nejasno, vam bo nejasen tudi na računu.
          </P>
          <ol className="grid border-t border-[rgba(20,17,15,0.12)]">
            {priceQuestions.map((question, index) => (
              <li
                key={question}
                className="flex gap-5 border-b border-[rgba(20,17,15,0.12)] py-5 text-[17px] leading-[1.6] text-[var(--eventaj-ink-2)]"
              >
                <span className="shrink-0 text-xs font-semibold tabular-nums tracking-[0.18em] text-[var(--eventaj-accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {question}
              </li>
            ))}
          </ol>
          <div className="border-l-2 border-[var(--eventaj-accent)] bg-[var(--eventaj-paper-2)] p-6 md:p-7">
            <h3 className="text-base font-semibold">Naš odgovor</h3>
            <p className="mt-3 max-w-xl text-[17px] leading-[1.75] text-[var(--eventaj-ink-2)]">
              Tiskanje je neomejeno, ekipa je prisotna ves čas najema, postavitev traja od 30 do 45
              minut in se ne šteje v najem. Fotografije prejmete v zasebni spletni galeriji
              najkasneje v 48 urah po dogodku.
            </p>
          </div>
        </GuideSection>

        <GuideSection id="proracun" eyebrow="Cenejša pot" title="Če je proračun tesen">
          <P>
            Če vam za photo booth zmanjka proračuna, obstaja cenejša pot. QR galerija stane 35 evrov
            za cel dogodek. Na mize postavimo kode, gostje jih skenirajo s telefonom in nalagajo
            fotografije, ki jih med večerom tako ali tako delajo. Vse pristane na enem mestu, pri
            vas, namesto raztreseno po tujih telefonih.
          </P>
          <P>
            Povejmo tudi, česa pri tem ne dobite. Ne dobite tiskanih fotografij, ki bi jih gostje
            odnesli domov istega večera. Ne dobite atrakcije v kotu dvorane, h kateri se ljudje
            vračajo in pred katero nastaja vrsta. QR galerija zbira, photo booth ustvarja. To sta
            dve različni stvari. Če iščete drugo, vam prva ne bo dovolj in raje počakajte ter
            vzemite Basic paket.
          </P>
          <div className="pt-2">
            <InlineCta href="/qr-galerija" label="Poglej QR galerijo za 35 €" />
          </div>
        </GuideSection>
      </GuideLayout>

      <GuideClosingCta
        title="Preverite, ali je vaš termin še prost."
        body="Napišite nam datum in kraj dogodka. Odgovorimo s ceno in razpoložljivostjo."
        actions={[
          { href: "/photo-booth", label: "Poglej pakete in termine", variant: "primary" },
          { label: "Pridobi ponudbo", variant: "secondary" },
        ]}
      />

      <RelatedGuides currentSlug={guide.slug} />
    </main>
  );
}
