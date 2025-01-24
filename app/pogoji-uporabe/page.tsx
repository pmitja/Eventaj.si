import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pogoji uporabe | Eventaj.si",
  description:
    "Pogoji uporabe in zasebnost za najem photo booth in 360 photo booth storitev.",
  keywords: "pogoji uporabe, zasebnost, photo booth, 360 photo booth, najem",
  openGraph: {
    title: "Pogoji uporabe | Eventaj.si",
    description:
      "Pogoji uporabe in zasebnost za najem photo booth in 360 photo booth storitev.",
    url: "https://eventaj.si/pogoji-uporabe",
    siteName: "Eventaj.si",
    type: "website",
  },
  alternates: {
    canonical: "https://eventaj.si/pogoji-uporabe",
  },
};

export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 pt-32 md:pt-40 pb-24">
      <div className="prose prose-lg dark:prose-invert mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-12">Pogoji uporabe</h1>

        <section className="mb-12">
          <h2>1. Splošne določbe</h2>
          <p>
            Ti splošni pogoji poslovanja določajo pravice in obveznosti med
            podjetjem MIPA, Mitja Pak s.p. (v nadaljevanju: ponudnik) in
            naročnikom storitev (v nadaljevanju: naročnik) ter veljajo za vse
            storitve, ki jih ponuja ponudnik.
          </p>
          <p>
            Ponudnik:
            <br />
            MIPA, Mitja Pak s.p.
            <br />
            Slomškova ulica 1
            <br />
            2230 Lenart v Slovenskih goricah
          </p>
          <p>
            Ponudnik ponuja storitve najema photo booth in 360 photo booth
            opreme za različne dogodke, vključno s profesionalno postavitvijo,
            tehnično podporo in upravljanjem opreme med dogodkom.
          </p>
        </section>

        <section className="mb-12">
          <h2>2. Naročilo in plačilni pogoji</h2>
          <h3>2.1 Naročilo storitev</h3>
          <p>Naročilo storitev je mogoče opraviti:</p>
          <ul>
            <li>Preko spletnega obrazca na strani eventaj.si</li>
            <li>Po elektronski pošti: eventaj.si@gmail.com</li>
            <li>Po telefonu: +386 31 285 143 / +386 31 544 751</li>
          </ul>
          <p>
            Naročilo je potrjeno, ko ponudnik prejme predplačilo v višini 30%
            celotnega zneska storitve.
          </p>

          <h3>2.2 Plačilni pogoji</h3>
          <p>
            Predplačilo v višini 30% celotnega zneska je potrebno poravnati ob
            potrditvi rezervacije. Preostali znesek mora biti poravnan
            najkasneje 72 ur pred začetkom dogodka.
          </p>
          <p>Sprejemamo naslednje načine plačila:</p>
          <ul>
            <li>Bančno nakazilo</li>
            <li>Plačilo s kreditno kartico</li>
          </ul>
          <p>
            Vse cene vključujejo DDV. Po opravljenem plačilu ponudnik izda račun
            v elektronski obliki.
          </p>
        </section>

        <section className="mb-12">
          <h2>3. Odpoved ali sprememba rezervacije</h2>
          <h3>3.1 Odpoved rezervacije</h3>
          <p>V primeru odpovedi rezervacije veljajo naslednji pogoji:</p>
          <ul>
            <li>Več kot 14 dni pred dogodkom: vračilo celotnega predplačila</li>
            <li>7-14 dni pred dogodkom: vračilo 50% predplačila</li>
            <li>Manj kot 7 dni pred dogodkom: predplačilo se ne vrača</li>
          </ul>

          <h3>3.2 Sprememba termina</h3>
          <p>
            Sprememba termina je možna brez dodatnih stroškov najmanj 14 dni
            pred dogodkom, ob pogoju razpoložljivosti novega termina. Kasnejše
            spremembe termina se obravnavajo kot odpoved rezervacije.
          </p>
        </section>

        <section className="mb-12">
          <h2>4. Odgovornost in zavarovanje opreme</h2>
          <p>
            Naročnik je odgovoren za primerno ravnanje z opremo med dogodkom. V
            primeru poškodbe opreme zaradi malomarnega ravnanja je naročnik
            dolžan poravnati stroške popravila ali zamenjave opreme.
          </p>
          <p>Ponudnik zagotavlja:</p>
          <ul>
            <li>Profesionalno postavitev opreme</li>
            <li>Prisotnost usposobljenega osebja med celotnim dogodkom</li>
            <li>Tehnično podporo in upravljanje opreme</li>
            <li>Zavarovanje opreme za primer okvare</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>5. Hramba in uporaba posnetega gradiva</h2>
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
        </section>

        <section className="mb-12">
          <h2>6. Prijava na e-novice in popusti</h2>
          <p>
            Naročniki se lahko prostovoljno prijavijo na prejemanje e-novic, ki
            vsebujejo:
          </p>
          <ul>
            <li>Informacije o posebnih ponudbah in popustih</li>
            <li>Novosti o storitvah</li>
            <li>Nasvete za organizacijo dogodkov</li>
          </ul>
          <p>
            Odjava od prejemanja e-novic je možna kadarkoli preko povezave v
            e-sporočilu ali s sporočilom na info@360booth.si.
          </p>
        </section>

        <section className="mb-12">
          <h2>7. Končne določbe</h2>
          <p>
            Za vse spore, ki izhajajo iz teh splošnih pogojev ali v zvezi z
            njimi, je pristojno sodišče v Ljubljani.
          </p>
          <p>
            Ponudnik si pridržuje pravico do spremembe teh pogojev. O vseh
            spremembah bodo naročniki obveščeni preko spletne strani ali
            e-pošte.
          </p>
        </section>
      </div>
    </main>
  );
}
