import { Panel } from "@/app/admin/_components/panel";
import { formatEur, formatNumber } from "@/lib/ledger/compute";
import { RULES, type Contributions } from "@/lib/ledger/contributions";

// 5 → "5", 1.5 → "1,5", 0.25 → "0,25"
const n = (value: number) => (Number.isInteger(value) ? formatNumber(value, 0) : formatNumber(value, 2).replace(/0$/, ""));

const POINTS: [string, string, string][] = [
  ["Izvedba dogodka", `${n(RULES.run)} na osebo`, "Kdor je vpisan pod Izvedba dogodka. Jan + Mitja: oba dobita polne točke."],
  ["Začetna pomoč študentom", n(RULES.help), "Kdor je vpisan pod Začetna pomoč, kadar dogodek izvedejo študenti."],
  ["Razdalja", `+1 na ${RULES.kmStep} km`, "Na vsakih 50 km v eno smer. Km v Dogodkih so tja in nazaj, zato se delijo z 2."],
  ["Vikend", `× ${n(RULES.weekend)}`, "Izvedba in začetna pomoč na soboto ali nedeljo."],
  ["Priprava opreme pred in po dogodku", n(RULES.equipment), "Mitja, za vsak izveden dogodek."],
  ["Priprava s stranko", n(RULES.clientPrep), "Maja, za vsak izveden dogodek: okvir, ozadje, ura, kontaktna oseba, povzetek."],
  ["Povpraševanje → ponudba", n(RULES.inquiry), `Julija. Ko postane dogodek, še +${n(RULES.confirmed)}. Poslane ponudbe brez dogodka se štejejo iz Povpraševanj.`],
  ["Študenti, organizacija, pregled, opombe", n(RULES.organisation), "Julija, za vsak izveden dogodek."],
  ["Socialna omrežja", `${n(RULES.socialPerMonth)} na mesec`, `${n(RULES.socialJulija * 100)} % Julija, ${n(100 - RULES.socialJulija * 100)} % Maja.`],
  ["Klici", `${n(RULES.callsPerMonth)} na mesec`, "Mitja."],
  ["Dostava ali prevzem miz", n(RULES.tableTrip), "Na pot, iz Najema miz."],
  ["Naročilo potrošnega materiala", n(RULES.material), "Na vnos v Stroških (Potrošni material). Jan, razen če je osebno plačal kdo drug."],
  ["Ročno vpisane ure", "1 na uro", `Spletna stran, nove storitve, izboljšave. Največ ${RULES.workCapPerMonth} ur na osebo na mesec.`],
];

export function ContributionLegend({ c }: { c: Contributions }) {
  const work = RULES.workShare * 100;
  const steps: [string, string][] = [
    ["Dobiček", `Prihodki − vsi stroški, enako kot na Pregledu: ${formatEur(c.profit)}.`],
    ["Kilometrina", `Km / 100 × ${RULES.litresPer100} l × cena litra. Izplača se tistemu, ki je vozil; Jan + Mitja si km delita na pol. Prevoz, že vpisan v Stroških, se odšteje. Skupaj ${formatEur(c.fuelTotal)}.`],
    ["Za delitev", `Dobiček − kilometrina = ${formatEur(c.distributable)}.`],
    [`${work} % po točkah`, `${formatEur(c.workPool)} se razdeli po deležu točk vsake osebe.`],
    [`${100 - work} % lastništvo`, `${formatEur(c.ownerPool)} se razdeli 50/50 med paroma.`],
    ["Par dobi", "Delo obeh + polovico lastništva + kilometrino obeh."],
  ];

  return (
    <Panel title="Legenda · kako se zbirajo točke" note="1 točka ≈ 1 ura dela" className="gap-5 bg-adm-sand">
      <div className="flex flex-col text-sm">
        {POINTS.map(([label, value, note]) => (
          <div key={label} className="grid grid-cols-1 gap-x-5 gap-y-0.5 border-t border-adm-rule py-2.5 sm:grid-cols-[minmax(200px,280px)_110px_minmax(0,1fr)]">
            <span className="font-medium">{label}</span>
            <span className="tabular sm:text-right">{value}</span>
            <span className="text-adm-sub [text-wrap:pretty]">{note}</span>
          </div>
        ))}
      </div>
      <p className="m-0 text-xs leading-relaxed text-adm-muted [text-wrap:pretty]">
        Štejejo dogodki do danes z vpisano izvedbo. Mesečne postavke (klici, socialna omrežja) se štejejo za pretečeni del leta: {formatNumber(c.months, 1)} meseca.
        {c.unconfirmedOffers > 0 && ` Poslanih ponudb brez dogodka: ${c.unconfirmedOffers}.`}
      </p>
      <div className="flex flex-col gap-2 text-sm">
        <strong>Delitev denarja</strong>
        <ol className="m-0 flex list-decimal flex-col gap-1.5 pl-5">
          {steps.map(([label, text]) => (
            <li key={label} className="[text-wrap:pretty]">
              <span className="font-medium">{label}:</span> {text}
            </li>
          ))}
        </ol>
      </div>
    </Panel>
  );
}
