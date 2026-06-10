import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pogoji uporabe | Eventaj.si",
  description:
    "Splošni pogoji uporabe storitev eventaj.si. Preberite naše pogoje uporabe za najem Photo Booth in 360° Booth opreme.",
  keywords: "pogoji uporabe, Photo Booth, 360° Booth, najem opreme",
  openGraph: {
    title: "Pogoji uporabe | Eventaj.si",
    description:
      "Splošni pogoji uporabe storitev eventaj.si. Preberite naše pogoje uporabe za najem Photo Booth in 360° Booth opreme.",
    url: "https://www.eventaj.si/pogoji-uporabe",
    siteName: "Eventaj.si",
    type: "website",
  },
  alternates: {
    canonical: "https://www.eventaj.si/pogoji-uporabe",
  },
};

export default function TermsPage() {
  return (
    <main className="bg-[var(--eventaj-paper)] px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[800px]">
        <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
          Pravni dokument
        </div>
        <h1 className="font-serif-display text-[clamp(40px,5vw,64px)] font-[350] leading-none">
          Splošni pogoji uporabe
        </h1>

        <p className="mt-8 text-[17px] leading-relaxed text-[var(--eventaj-ink-2)]">
          Ti splošni pogoji uporabe (v nadaljevanju: pogoji) določajo pravice
          in obveznosti uporabnikov storitev eventaj.si ter pravice in
          obveznosti ponudnika storitev.
        </p>

        <Section title="1. Splošne določbe">
          <p>
            Ponudnik storitev je podjetje MIPA, Mitja Pak s.p., Slomškova ulica
            1, 2230 Lenart v Slovenskih goricah (v nadaljevanju: ponudnik).
          </p>
          <p>
            Uporabnik je vsaka fizična ali pravna oseba, ki uporablja storitve
            eventaj.si (v nadaljevanju: uporabnik).
          </p>
          <p>
            Ponudnik ponuja storitve najema Photo Booth in 360° Booth opreme za
            različne dogodke, vključno s profesionalno postavitvijo, tehnično
            podporo in upravljanjem opreme med dogodkom.
          </p>
        </Section>

        <Section title="2. Naročilo in plačilni pogoji">
          <SubHeading>2.1 Naročilo storitev</SubHeading>
          <p>Naročilo storitev je mogoče opraviti:</p>
          <List>
            <li>Preko spletnega obrazca na strani eventaj.si</li>
            <li>Po elektronski pošti: <a href="mailto:info@eventaj.si" className="text-[var(--eventaj-accent)] border-b border-[var(--eventaj-accent)] pb-px">info@eventaj.si</a></li>
            <li>Po telefonu: <a href="tel:+38631285143" className="text-[var(--eventaj-accent)] border-b border-[var(--eventaj-accent)] pb-px">+386 31 285 143</a> / +386 31 544 751</li>
          </List>
          <p>
            Naročilo je potrjeno, ko ponudnik prejme predplačilo v višini 30%
            celotnega zneska storitve.
          </p>

          <SubHeading>2.2 Plačilni pogoji</SubHeading>
          <p>
            Predplačilo v višini 30% celotnega zneska je potrebno poravnati ob
            potrditvi rezervacije. Preostali znesek mora biti poravnan
            najkasneje 72 ur pred začetkom dogodka.
          </p>
          <p>Sprejemamo naslednje načine plačila:</p>
          <List>
            <li>Bančno nakazilo</li>
            <li>Plačilo s kreditno kartico</li>
          </List>
          <p>
            Vse cene vključujejo DDV. Po opravljenem plačilu ponudnik izda
            račun v elektronski obliki.
          </p>
        </Section>

        <Section title="3. Odpoved ali sprememba rezervacije">
          <SubHeading>3.1 Odpoved rezervacije</SubHeading>
          <p>V primeru odpovedi rezervacije veljajo naslednji pogoji:</p>
          <List>
            <li>Več kot 14 dni pred dogodkom: vračilo celotnega predplačila</li>
            <li>7–14 dni pred dogodkom: vračilo 50% predplačila</li>
            <li>Manj kot 7 dni pred dogodkom: predplačilo se ne vrača</li>
          </List>

          <SubHeading>3.2 Sprememba termina</SubHeading>
          <p>
            Sprememba termina je možna brez dodatnih stroškov najmanj 14 dni
            pred dogodkom, ob pogoju razpoložljivosti novega termina. Kasnejše
            spremembe termina se obravnavajo kot odpoved rezervacije.
          </p>
        </Section>

        <Section title="4. Odgovornost in zavarovanje opreme">
          <p>
            Naročnik je odgovoren za primerno ravnanje z opremo med dogodkom. V
            primeru poškodbe opreme zaradi malomarnega ravnanja je naročnik
            dolžan poravnati stroške popravila ali zamenjave opreme.
          </p>
          <p>Ponudnik zagotavlja:</p>
          <List>
            <li>Profesionalno postavitev opreme</li>
            <li>Prisotnost usposobljenega osebja med celotnim dogodkom</li>
            <li>Tehnično podporo in upravljanje opreme</li>
            <li>Zavarovanje opreme za primer okvare</li>
          </List>
        </Section>

        <Section title="5. Hramba in uporaba posnetega gradiva">
          <p>
            Vse fotografije in posnetki, narejeni med dogodkom, se hranijo 3
            mesece od datuma dogodka. Po tem obdobju se gradivo avtomatično
            izbriše iz naših strežnikov.
          </p>
          <p>
            Naročnik prejme dostop do vseh fotografij in posnetkov preko spletne
            galerije v roku 48 ur po dogodku.
          </p>
          <p>
            Ponudnik lahko uporablja izbrane fotografije in posnetke za
            promocijske namene, razen če naročnik temu izrecno nasprotuje.
          </p>
        </Section>

        <Section title="6. Prijava na e-novice in popusti">
          <p>
            Naročniki se lahko prostovoljno prijavijo na prejemanje e-novic, ki
            vsebujejo:
          </p>
          <List>
            <li>Informacije o posebnih ponudbah in popustih</li>
            <li>Novosti o storitvah</li>
            <li>Nasvete za organizacijo dogodkov</li>
          </List>
          <p>
            Odjava od prejemanja e-novic je možna kadarkoli preko povezave v
            e-sporočilu ali s sporočilom na{" "}
            <a href="mailto:info@eventaj.si" className="text-[var(--eventaj-accent)] border-b border-[var(--eventaj-accent)] pb-px">
              info@eventaj.si
            </a>.
          </p>
        </Section>

        <Section title="7. Končne določbe">
          <p>
            Za vse spore, ki izhajajo iz teh splošnih pogojev ali v zvezi z
            njimi, je pristojno sodišče v Ljubljani.
          </p>
          <p>
            Ponudnik si pridržuje pravico do spremembe teh pogojev. O vseh
            spremembah bodo naročniki obveščeni preko spletne strani ali
            e-pošte.
          </p>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14 border-t border-[rgba(20,17,15,0.1)] pt-10">
      <h2 className="font-serif-display text-[clamp(24px,3vw,34px)] font-[350] leading-tight text-[var(--eventaj-ink)]">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[var(--eventaj-ink-2)]">
        {children}
      </div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="pt-2 text-[15px] font-semibold uppercase tracking-[0.08em] text-[var(--eventaj-muted)]">
      {children}
    </h3>
  );
}

function List({ children }: { children: React.ReactNode }) {
  return (
    <ul className="ml-5 list-disc space-y-1.5 marker:text-[var(--eventaj-muted)]">
      {children}
    </ul>
  );
}

export const dynamic = "force-static";
