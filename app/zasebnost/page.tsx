import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politika zasebnosti | Eventaj.si",
  description:
    "Politika zasebnosti in varstvo osebnih podatkov za uporabnike storitev Eventaj.si.",
  keywords: "zasebnost, varstvo podatkov, GDPR, Photo Booth, 360° Booth",
  openGraph: {
    title: "Politika zasebnosti | Eventaj.si",
    description:
      "Politika zasebnosti in varstvo osebnih podatkov za uporabnike storitev Eventaj.si.",
    url: "https://eventaj.si/zasebnost",
    siteName: "Eventaj.si",
    type: "website",
  },
  alternates: {
    canonical: "https://eventaj.si/zasebnost",
  },
};

export default function PrivacyPage() {
  return (
    <main className="bg-[var(--eventaj-paper)] px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[800px]">
        <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
          Pravni dokument
        </div>
        <h1 className="font-serif-display text-[clamp(40px,5vw,64px)] font-[350] leading-none">
          Politika zasebnosti
        </h1>

        <p className="mt-8 text-[17px] leading-relaxed text-[var(--eventaj-ink-2)]">
          Pri Eventaj.si se zavezujemo k varovanju vaše zasebnosti in osebnih
          podatkov. Ta politika zasebnosti pojasnjuje, kako zbiramo,
          uporabljamo in varujemo vaše osebne podatke v skladu s Splošno
          uredbo o varstvu podatkov (GDPR) in veljavno zakonodajo.
        </p>

        <Section title="1. Podatki o upravljalcu">
          <p>Upravljalec osebnih podatkov je:</p>
          <InfoBox>
            <p className="font-medium text-[var(--eventaj-ink)]">
              MIPA, Mitja Pak s.p.
              <br />
              Slomškova ulica 1
              <br />
              2230 Lenart v Slovenskih goricah
            </p>
            <p className="mt-4">
              <span className="font-medium text-[var(--eventaj-ink)]">Kontaktni podatki za vprašanja o zasebnosti:</span>
              <br />
              E-pošta:{" "}
              <a href="mailto:info@eventaj.si" className="text-[var(--eventaj-accent)] border-b border-[var(--eventaj-accent)] pb-px">
                info@eventaj.si
              </a>
              <br />
              Telefon:{" "}
              <a href="tel:+38631285143" className="text-[var(--eventaj-accent)] border-b border-[var(--eventaj-accent)] pb-px">
                +386 31 285 143
              </a>{" "}
              / +386 31 544 751
            </p>
          </InfoBox>
        </Section>

        <Section title="2. Katere podatke zbiramo">
          <p>
            Pri izvajanju naših storitev zbiramo različne vrste osebnih
            podatkov:
          </p>
          <SubHeading>2.1 Podatki, ki jih posredujete neposredno</SubHeading>
          <List>
            <li>Osnovni podatki (ime, priimek, naslov)</li>
            <li>Kontaktni podatki (e-pošta, telefonska številka)</li>
            <li>Podatki o dogodku (datum, lokacija, vrsta dogodka)</li>
            <li>Podatki za izdajo računov</li>
          </List>
          <SubHeading>2.2 Podatki, ki nastanejo med izvajanjem storitev</SubHeading>
          <List>
            <li>Fotografije in video posnetki iz Photo Bootha</li>
            <li>360° video posnetki</li>
            <li>Podatki o uporabi naših storitev</li>
          </List>
          <SubHeading>2.3 Podatki, ki se zbirajo samodejno</SubHeading>
          <List>
            <li>IP naslov</li>
            <li>Podatki o napravi in brskalniku</li>
            <li>Podatki o uporabi spletne strani</li>
            <li>Piškotki in podobne tehnologije</li>
          </List>
        </Section>

        <Section title="3. Namen zbiranja in pravna podlaga">
          <p>Vaše osebne podatke zbiramo in obdelujemo za naslednje namene:</p>
          <SubHeading>3.1 Izvajanje pogodbe (člen 6(1)(b) GDPR)</SubHeading>
          <List>
            <li>Zagotavljanje naročenih storitev Photo Bootha</li>
            <li>Komunikacija glede rezervacij in dogodkov</li>
            <li>Izdajanje računov in vodenje evidenc</li>
          </List>
          <SubHeading>3.2 Zakonske obveznosti (člen 6(1)(c) GDPR)</SubHeading>
          <List>
            <li>Hramba računovodskih podatkov</li>
            <li>Izpolnjevanje davčnih obveznosti</li>
          </List>
          <SubHeading>3.3 Zakoniti interes (člen 6(1)(f) GDPR)</SubHeading>
          <List>
            <li>Izboljšanje naših storitev</li>
            <li>Zagotavljanje varnosti sistema</li>
            <li>Analitika spletne strani</li>
          </List>
          <SubHeading>3.4 Privolitev (člen 6(1)(a) GDPR)</SubHeading>
          <List>
            <li>Pošiljanje e-novic in promocijskih sporočil</li>
            <li>Uporaba fotografij za promocijske namene</li>
            <li>Nebistveni piškotki</li>
          </List>
        </Section>

        <Section title="4. Deljenje podatkov">
          <p>
            Vaše osebne podatke delimo samo z zaupanja vrednimi partnerji, ki
            so potrebni za izvajanje naših storitev:
          </p>
          <List>
            <li>Ponudniki oblačnih storitev za shranjevanje fotografij in posnetkov</li>
            <li>Ponudniki e-poštnih storitev za komunikacijo</li>
            <li>Računovodski servisi za obdelavo računov</li>
            <li>Ponudniki analitičnih storitev za izboljšanje spletne strani</li>
          </List>
          <p>
            <strong className="font-medium text-[var(--eventaj-ink)]">Pomembno:</strong>{" "}
            Z vsemi pogodbenimi obdelovalci imamo sklenjene ustrezne pogodbe o
            obdelavi podatkov, ki zagotavljajo enako raven varstva vaših
            podatkov. Vaših podatkov nikoli ne prodajamo tretjim osebam.
          </p>
        </Section>

        <Section title="5. Hramba podatkov">
          <p>
            Različne vrste podatkov hranimo različno dolgo, skladno z namenom
            obdelave:
          </p>
          <div className="overflow-hidden rounded-[2px] border border-[rgba(20,17,15,0.1)]">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-[rgba(20,17,15,0.1)] bg-[var(--eventaj-cream)]">
                  <th className="px-5 py-3 text-left font-medium text-[var(--eventaj-ink)]">Vrsta podatkov</th>
                  <th className="px-5 py-3 text-left font-medium text-[var(--eventaj-ink)]">Obdobje hrambe</th>
                  <th className="px-5 py-3 text-left font-medium text-[var(--eventaj-ink)]">Razlog</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(20,17,15,0.08)]">
                <tr>
                  <td className="px-5 py-4 text-[var(--eventaj-ink-2)]">Fotografije in posnetki</td>
                  <td className="px-5 py-4 text-[var(--eventaj-ink-2)]">3 mesece po dogodku</td>
                  <td className="px-5 py-4 text-[var(--eventaj-ink-2)]">Dostop strankam in varnostna kopija</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 text-[var(--eventaj-ink-2)]">Podatki o naročilih</td>
                  <td className="px-5 py-4 text-[var(--eventaj-ink-2)]">5 let</td>
                  <td className="px-5 py-4 text-[var(--eventaj-ink-2)]">Davčni predpisi</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 text-[var(--eventaj-ink-2)]">Podatki za e-novice</td>
                  <td className="px-5 py-4 text-[var(--eventaj-ink-2)]">Do preklica privolitve</td>
                  <td className="px-5 py-4 text-[var(--eventaj-ink-2)]">Marketing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="6. Pravice uporabnikov">
          <p>
            V skladu z GDPR imate naslednje pravice v zvezi z vašimi osebnimi
            podatki:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Pravica do dostopa", body: "Lahko zahtevate informacije o vaših podatkih, ki jih obdelujemo." },
              { title: "Pravica do popravka", body: "Lahko zahtevate popravek netočnih podatkov." },
              { title: "Pravica do izbrisa", body: "Lahko zahtevate izbris vaših podatkov (\"pravica do pozabe\")." },
              { title: "Pravica do omejitve", body: "Lahko zahtevate omejitev obdelave vaših podatkov." },
              { title: "Pravica do prenosljivosti", body: "Lahko zahtevate prenos vaših podatkov k drugemu upravljavcu." },
              { title: "Pravica do ugovora", body: "Lahko ugovarjate obdelavi vaših podatkov." },
            ].map(({ title, body }) => (
              <div key={title} className="bg-[var(--eventaj-cream)] p-5">
                <p className="font-medium text-[var(--eventaj-ink)]">{title}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-[var(--eventaj-ink-2)]">{body}</p>
              </div>
            ))}
          </div>
          <p>
            Za uveljavljanje katerekoli od teh pravic nas kontaktirajte na{" "}
            <a href="mailto:info@eventaj.si" className="text-[var(--eventaj-accent)] border-b border-[var(--eventaj-accent)] pb-px">
              info@eventaj.si
            </a>. Na vašo zahtevo bomo odgovorili v najkrajšem možnem
            času, najkasneje pa v enem mesecu.
          </p>
        </Section>

        <Section title="7. Piškotki">
          <p>
            Naša spletna stran uporablja piškotke in podobne tehnologije za
            zagotavljanje najboljše uporabniške izkušnje:
          </p>
          <div className="overflow-hidden rounded-[2px] border border-[rgba(20,17,15,0.1)]">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-[rgba(20,17,15,0.1)] bg-[var(--eventaj-cream)]">
                  <th className="px-5 py-3 text-left font-medium text-[var(--eventaj-ink)]">Vrsta piškotkov</th>
                  <th className="px-5 py-3 text-left font-medium text-[var(--eventaj-ink)]">Namen</th>
                  <th className="px-5 py-3 text-left font-medium text-[var(--eventaj-ink)]">Trajanje</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(20,17,15,0.08)]">
                <tr>
                  <td className="px-5 py-4 text-[var(--eventaj-ink-2)]">Nujni piškotki</td>
                  <td className="px-5 py-4 text-[var(--eventaj-ink-2)]">Osnovno delovanje strani</td>
                  <td className="px-5 py-4 text-[var(--eventaj-ink-2)]">Seja</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 text-[var(--eventaj-ink-2)]">Analitični piškotki</td>
                  <td className="px-5 py-4 text-[var(--eventaj-ink-2)]">Analiza obiska in izboljšave</td>
                  <td className="px-5 py-4 text-[var(--eventaj-ink-2)]">2 leti</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 text-[var(--eventaj-ink-2)]">Funkcionalni piškotki</td>
                  <td className="px-5 py-4 text-[var(--eventaj-ink-2)]">Nastavitve uporabnika</td>
                  <td className="px-5 py-4 text-[var(--eventaj-ink-2)]">1 leto</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Piškotke lahko kadarkoli upravljate ali onemogočite v nastavitvah
            vašega brskalnika.
          </p>
        </Section>

        <Section title="8. Varnost podatkov">
          <p>Za zaščito vaših podatkov uporabljamo najsodobnejše varnostne ukrepe:</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-[var(--eventaj-cream)] p-5">
              <p className="font-medium text-[var(--eventaj-ink)]">Tehnični ukrepi</p>
              <List className="mt-3">
                <li>SSL/TLS šifriranje</li>
                <li>Požarni zid</li>
                <li>Redno varnostno kopiranje</li>
                <li>Protivirusna zaščita</li>
              </List>
            </div>
            <div className="bg-[var(--eventaj-cream)] p-5">
              <p className="font-medium text-[var(--eventaj-ink)]">Organizacijski ukrepi</p>
              <List className="mt-3">
                <li>Omejen dostop do podatkov</li>
                <li>Usposabljanje osebja</li>
                <li>Politike varnosti</li>
                <li>Redni varnostni pregledi</li>
              </List>
            </div>
          </div>
        </Section>

        <Section title="9. Pravica do pritožbe">
          <p>
            Če menite, da obdelava vaših osebnih podatkov krši GDPR ali druge
            predpise o varstvu podatkov, imate pravico do pritožbe pri nadzornem
            organu:
          </p>
          <InfoBox>
            <p className="font-medium text-[var(--eventaj-ink)]">
              Informacijski pooblaščenec Republike Slovenije
              <br />
              Dunajska cesta 22, 1000 Ljubljana
              <br />
              Telefon: 01 230 97 30
              <br />
              E-pošta:{" "}
              <a href="mailto:gp.ip@ip-rs.si" className="text-[var(--eventaj-accent)] border-b border-[var(--eventaj-accent)] pb-px">
                gp.ip@ip-rs.si
              </a>
            </p>
          </InfoBox>
          <p>
            Priporočamo, da se pred vložitvijo pritožbe najprej obrnete na nas,
            da skupaj poiščemo rešitev.
          </p>
        </Section>

        <Section title="10. Spremembe politike zasebnosti">
          <p>
            To politiko zasebnosti lahko občasno posodobimo. Vse spremembe bodo
            objavljene na tej strani, o pomembnejših spremembah pa vas bomo
            obvestili tudi preko e-pošte.
          </p>
          <p className="text-[13px] text-[var(--eventaj-muted)]">Zadnja posodobitev: 19. marec 2024</p>
        </Section>

        <Section title="11. Kontakt">
          <p>
            Za vsa vprašanja glede zasebnosti in varstva osebnih podatkov smo
            vam na voljo:
          </p>
          <InfoBox>
            <p className="font-medium text-[var(--eventaj-ink)]">
              E-pošta:{" "}
              <a href="mailto:info@eventaj.si" className="text-[var(--eventaj-accent)] border-b border-[var(--eventaj-accent)] pb-px">
                info@eventaj.si
              </a>
              <br />
              Telefon:{" "}
              <a href="tel:+38631285143" className="text-[var(--eventaj-accent)] border-b border-[var(--eventaj-accent)] pb-px">
                +386 31 285 143
              </a>{" "}
              / +386 31 544 751
              <br />
              Naslov: Slomškova ulica 1, 2230 Lenart v Slovenskih goricah
            </p>
          </InfoBox>
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
    <h3 className="pt-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--eventaj-muted)]">
      {children}
    </h3>
  );
}

function List({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <ul className={`ml-5 list-disc space-y-1.5 marker:text-[var(--eventaj-muted)] ${className ?? ""}`}>
      {children}
    </ul>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--eventaj-cream)] p-5 text-[15px] leading-relaxed text-[var(--eventaj-ink-2)]">
      {children}
    </div>
  );
}

export const dynamic = "force-static";
