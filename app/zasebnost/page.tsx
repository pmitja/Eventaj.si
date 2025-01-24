import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politika zasebnosti | 360booth.si",
  description:
    "Politika zasebnosti in varstvo osebnih podatkov za uporabnike storitev 360booth.si.",
  keywords: "zasebnost, varstvo podatkov, GDPR, photo booth, 360 photo booth",
  openGraph: {
    title: "Politika zasebnosti | 360booth.si",
    description:
      "Politika zasebnosti in varstvo osebnih podatkov za uporabnike storitev 360booth.si.",
    url: "https://360booth.si/zasebnost",
    siteName: "360booth.si",
    type: "website",
  },
  alternates: {
    canonical: "https://360booth.si/zasebnost",
  },
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 pt-32 md:pt-40 pb-24">
      <div className="prose prose-lg dark:prose-invert mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-12">
          Politika zasebnosti
        </h1>

        <section className="mb-12">
          <p className="lead text-xl text-muted-foreground">
            Pri 360booth.si se zavezujemo k varovanju vaše zasebnosti in osebnih
            podatkov. Ta politika zasebnosti pojasnjuje, kako zbiramo,
            uporabljamo in varujemo vaše osebne podatke v skladu s Splošno
            uredbo o varstvu podatkov (GDPR) in veljavno zakonodajo.
          </p>
        </section>

        <section className="mb-12">
          <h2>1. Podatki o upravljalcu</h2>
          <p>Upravljalec osebnih podatkov je:</p>
          <div className="not-prose bg-muted p-6 rounded-lg">
            <p className="font-medium">
              MIPA, Mitja Pak s.p.
              <br />
              Slomškova ulica 1
              <br />
              2230 Lenart v Slovenskih goricah
            </p>
            <p className="mt-4">
              <strong>Kontaktni podatki za vprašanja o zasebnosti:</strong>
              <br />
              E-pošta: eventaj.si@gmail.com
              <br />
              Telefon: +386 31 285 143 / +386 31 544 751
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2>2. Katere podatke zbiramo</h2>
          <p>
            Pri izvajanju naših storitev zbiramo različne vrste osebnih
            podatkov:
          </p>

          <h3>2.1 Podatki, ki jih posredujete neposredno</h3>
          <ul>
            <li>Osnovni podatki (ime, priimek, naslov)</li>
            <li>Kontaktni podatki (e-pošta, telefonska številka)</li>
            <li>Podatki o dogodku (datum, lokacija, vrsta dogodka)</li>
            <li>Podatki za izdajo računov</li>
          </ul>

          <h3>2.2 Podatki, ki nastanejo med izvajanjem storitev</h3>
          <ul>
            <li>Fotografije in video posnetki iz photo booth-a</li>
            <li>360° video posnetki</li>
            <li>Podatki o uporabi naših storitev</li>
          </ul>

          <h3>2.3 Podatki, ki se zbirajo samodejno</h3>
          <ul>
            <li>IP naslov</li>
            <li>Podatki o napravi in brskalniku</li>
            <li>Podatki o uporabi spletne strani</li>
            <li>Piškotki in podobne tehnologije</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>3. Namen zbiranja in pravna podlaga</h2>
          <p>Vaše osebne podatke zbiramo in obdelujemo za naslednje namene:</p>

          <h3>3.1 Izvajanje pogodbe (člen 6(1)(b) GDPR)</h3>
          <ul>
            <li>Zagotavljanje naročenih storitev photo booth-a</li>
            <li>Komunikacija glede rezervacij in dogodkov</li>
            <li>Izdajanje računov in vodenje evidenc</li>
          </ul>

          <h3>3.2 Zakonske obveznosti (člen 6(1)(c) GDPR)</h3>
          <ul>
            <li>Hramba računovodskih podatkov</li>
            <li>Izpolnjevanje davčnih obveznosti</li>
          </ul>

          <h3>3.3 Zakoniti interes (člen 6(1)(f) GDPR)</h3>
          <ul>
            <li>Izboljšanje naših storitev</li>
            <li>Zagotavljanje varnosti sistema</li>
            <li>Analitika spletne strani</li>
          </ul>

          <h3>3.4 Privolitev (člen 6(1)(a) GDPR)</h3>
          <ul>
            <li>Pošiljanje e-novic in promocijskih sporočil</li>
            <li>Uporaba fotografij za promocijske namene</li>
            <li>Nebistveni piškotki</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>4. Deljenje podatkov</h2>
          <p>
            Vaše osebne podatke delimo samo z zaupanja vrednimi partnerji, ki so
            potrebni za izvajanje naših storitev:
          </p>
          <ul>
            <li>
              Ponudniki oblačnih storitev za shranjevanje fotografij in
              posnetkov
            </li>
            <li>Ponudniki e-poštnih storitev za komunikacijo</li>
            <li>Računovodski servisi za obdelavo računov</li>
            <li>
              Ponudniki analitičnih storitev za izboljšanje spletne strani
            </li>
          </ul>
          <p>
            <strong>Pomembno:</strong> Z vsemi pogodbenimi obdelovalci imamo
            sklenjene ustrezne pogodbe o obdelavi podatkov, ki zagotavljajo
            enako raven varstva vaših podatkov. Vaših podatkov nikoli ne
            prodajamo tretjim osebam.
          </p>
        </section>

        <section className="mb-12">
          <h2>5. Hramba podatkov</h2>
          <p>
            Različne vrste podatkov hranimo različno dolgo, skladno z namenom
            obdelave:
          </p>
          <div className="not-prose">
            <table className="min-w-full bg-muted rounded-lg overflow-hidden">
              <thead className="bg-muted-foreground/10">
                <tr>
                  <th className="px-6 py-3 text-left">Vrsta podatkov</th>
                  <th className="px-6 py-3 text-left">Obdobje hrambe</th>
                  <th className="px-6 py-3 text-left">Razlog</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-6 py-4">Fotografije in posnetki</td>
                  <td className="px-6 py-4">3 mesece po dogodku</td>
                  <td className="px-6 py-4">
                    Dostop strankam in varnostna kopija
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Podatki o naročilih</td>
                  <td className="px-6 py-4">5 let</td>
                  <td className="px-6 py-4">Davčni predpisi</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Podatki za e-novice</td>
                  <td className="px-6 py-4">Do preklica privolitve</td>
                  <td className="px-6 py-4">Marketing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2>6. Pravice uporabnikov</h2>
          <p>
            V skladu z GDPR imate naslednje pravice v zvezi z vašimi osebnimi
            podatki:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Pravica do dostopa</h3>
              <p>
                Lahko zahtevate informacije o vaših podatkih, ki jih obdelujemo.
              </p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">
                Pravica do popravka
              </h3>
              <p>Lahko zahtevate popravek netočnih podatkov.</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Pravica do izbrisa</h3>
              <p>
                Lahko zahtevate izbris vaših podatkov (&ldquo;pravica do
                pozabe&rdquo;).
              </p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">
                Pravica do omejitve
              </h3>
              <p>Lahko zahtevate omejitev obdelave vaših podatkov.</p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">
                Pravica do prenosljivosti
              </h3>
              <p>
                Lahko zahtevate prenos vaših podatkov k drugemu upravljavcu.
              </p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Pravica do ugovora</h3>
              <p>Lahko ugovarjate obdelavi vaših podatkov.</p>
            </div>
          </div>
          <p className="mt-6">
            Za uveljavljanje katerekoli od teh pravic nas kontaktirajte na
            info@360booth.si. Na vašo zahtevo bomo odgovorili v najkrajšem
            možnem času, najkasneje pa v enem mesecu.
          </p>
        </section>

        <section className="mb-12">
          <h2>7. Piškotki</h2>
          <p>
            Naša spletna stran uporablja piškotke in podobne tehnologije za
            zagotavljanje najboljše uporabniške izkušnje:
          </p>
          <div className="not-prose">
            <table className="min-w-full bg-muted rounded-lg overflow-hidden">
              <thead className="bg-muted-foreground/10">
                <tr>
                  <th className="px-6 py-3 text-left">Vrsta piškotkov</th>
                  <th className="px-6 py-3 text-left">Namen</th>
                  <th className="px-6 py-3 text-left">Trajanje</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-6 py-4">Nujni piškotki</td>
                  <td className="px-6 py-4">Osnovno delovanje strani</td>
                  <td className="px-6 py-4">Seja</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Analitični piškotki</td>
                  <td className="px-6 py-4">Analiza obiska in izboljšave</td>
                  <td className="px-6 py-4">2 leti</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Funkcionalni piškotki</td>
                  <td className="px-6 py-4">Nastavitve uporabnika</td>
                  <td className="px-6 py-4">1 leto</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-6">
            Piškotke lahko kadarkoli upravljate ali onemogočite v nastavitvah
            vašega brskalnika.
          </p>
        </section>

        <section className="mb-12">
          <h2>8. Varnost podatkov</h2>
          <p>
            Za zaščito vaših podatkov uporabljamo najsodobnejše varnostne
            ukrepe:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Tehnični ukrepi</h3>
              <ul className="space-y-2">
                <li>SSL/TLS šifriranje</li>
                <li>Požarni zid</li>
                <li>Redno varnostno kopiranje</li>
                <li>Protivirusna zaščita</li>
              </ul>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">
                Organizacijski ukrepi
              </h3>
              <ul className="space-y-2">
                <li>Omejen dostop do podatkov</li>
                <li>Usposabljanje osebja</li>
                <li>Politike varnosti</li>
                <li>Redni varnostni pregledi</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>9. Pravica do pritožbe</h2>
          <p>
            Če menite, da obdelava vaših osebnih podatkov krši GDPR ali druge
            predpise o varstvu podatkov, imate pravico do pritožbe pri nadzornem
            organu:
          </p>
          <div className="not-prose bg-muted p-6 rounded-lg">
            <p className="font-medium">
              Informacijski pooblaščenec Republike Slovenije
              <br />
              Dunajska cesta 22
              <br />
              1000 Ljubljana
              <br />
              Telefon: 01 230 97 30
              <br />
              E-pošta: gp.ip@ip-rs.si
            </p>
          </div>
          <p className="mt-6">
            Priporočamo, da se pred vložitvijo pritožbe najprej obrnete na nas,
            da skupaj poiščemo rešitev.
          </p>
        </section>

        <section className="mb-12">
          <h2>10. Spremembe politike zasebnosti</h2>
          <p>
            To politiko zasebnosti lahko občasno posodobimo. Vse spremembe bodo
            objavljene na tej strani, o pomembnejših spremembah pa vas bomo
            obvestili tudi preko e-pošte.
          </p>
          <p>Zadnja posodobitev: 19. marec 2024</p>
        </section>

        <section className="mb-12">
          <h2>11. Kontakt</h2>
          <p>
            Za vsa vprašanja glede zasebnosti in varstva osebnih podatkov smo
            vam na voljo:
          </p>
          <div className="not-prose bg-muted p-6 rounded-lg">
            <p className="font-medium">
              E-pošta: eventaj.si@gmail.com
              <br />
              Telefon: +386 31 285 143 / +386 31 544 751
              <br />
              Naslov: Slomškova ulica 1, 2230 Lenart v Slovenskih goricah
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
