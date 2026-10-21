// Prispevki: who did how much work in a year, and how the profit is split from it.
// 1 point ≈ 1 hour of work. Profit minus fuel money is split 60 % by points, 40 % 50/50 by pair.
import { computeOverview, DUO, PAIRS } from "./compute";
import type { EventRow, LedgerYear } from "./schema";

export const PEOPLE = ["Mitja", "Julija", "Jan", "Maja"] as const;
export type Person = (typeof PEOPLE)[number];
type Pair = (typeof PAIRS)[number];

export const PAIR_OF: Record<Person, Pair> = { Jan: PAIRS[0], Maja: PAIRS[0], Mitja: PAIRS[1], Julija: PAIRS[1] };

export const WORK_KINDS = ["Spletna stran", "Nove storitve / izboljšave", "Drugo"];

export const RULES = {
  workShare: 0.6, // del dobička, ki se deli po točkah; ostanek 50/50 med paroma
  run: 5, // izvedba dogodka na osebo
  kmStep: 50, // +1 točka na vsakih 50 km v eno smer
  weekend: 1.25, // sobota ali nedelja
  help: 2, // začetna pomoč študentom
  equipment: 1.5, // priprava opreme pred in po dogodku (Mitja)
  clientPrep: 1.5, // priprava s stranko (Maja)
  inquiry: 0.5, // povpraševanje → poslana ponudba (Julija)
  confirmed: 0.5, // povpraševanje postane dogodek (Julija)
  organisation: 0.5, // študenti, organizacija, pregled, opombe (Julija)
  tableTrip: 1, // dostava ali prevzem miz
  material: 0.25, // naročilo potrošnega materiala
  callsPerMonth: 8, // klici (Mitja)
  socialPerMonth: 6, // socialna omrežja: Julija 75 %, Maja 25 %
  socialJulija: 0.75,
  workCapPerMonth: 20, // največ ur ročnega vnosa na osebo na mesec
  litresPer100: 7, // poraba za kilometrino
} as const;

export const CATEGORIES = [
  "Izvedba dogodkov",
  "Začetna pomoč",
  "Priprava opreme",
  "Priprava s stranko",
  "Povpraševanja in ponudbe",
  "Študenti in organizacija",
  "Socialna omrežja",
  "Klici",
  "Dostava in prevzem miz",
  "Naročila materiala",
  "Ročno vpisane ure",
] as const;
export type Category = (typeof CATEGORIES)[number];

const same = (a: string | null | undefined, b: string) => (a ?? "").toLowerCase() === b.toLowerCase();
const isPerson = (name: string | null | undefined): name is Person => PEOPLE.some((p) => same(name, p));
const asPerson = (name: string) => PEOPLE.find((p) => same(name, p))!;

// Share of the year that has passed, in months (12 for past years).
export function elapsedMonths(year: number, today: string) {
  const now = Date.parse(`${today}T00:00:00Z`);
  const start = Date.UTC(year, 0, 1);
  const end = Date.UTC(year + 1, 0, 1);
  if (now >= end) return 12;
  if (now <= start) return 0;
  return ((now - start) / (end - start)) * 12;
}

function isWeekend(date: string) {
  const day = new Date(`${date}T00:00:00Z`).getUTCDay();
  return day === 0 || day === 6;
}

// Who came to an event and in what role. "Jan + Mitja" in either column means both.
function crew(event: EventRow) {
  const runs = (p: Person) => same(event.execution, p) || same(event.execution, DUO);
  const helps = (p: Person) => !runs(p) && (same(event.initialHelp, p) || same(event.initialHelp, DUO));
  return (["Jan", "Mitja"] as Person[]).flatMap((person): { person: Person; role: "run" | "help" }[] =>
    runs(person) ? [{ person, role: "run" }] : helps(person) ? [{ person, role: "help" }] : [],
  );
}

export function computeContributions(ledger: LedgerYear, today: string, unconfirmedOffers: number) {
  const points = Object.fromEntries(PEOPLE.map((p) => [p, Object.fromEntries(CATEGORIES.map((c) => [c, 0]))])) as Record<Person, Record<Category, number>>;
  const km = Object.fromEntries(PEOPLE.map((p) => [p, 0])) as Record<Person, number>;
  const add = (p: Person, c: Category, n: number) => (points[p][c] += n);

  const done = ledger.events.filter((e) => e.date && e.date <= today && e.execution);
  for (const event of done) {
    const factor = isWeekend(event.date!) ? RULES.weekend : 1;
    const bonus = Math.floor((event.km ?? 0) / 2 / RULES.kmStep); // km v Dogodkih = tja in nazaj
    const team = crew(event);
    const shared = same(event.execution, DUO) || same(event.initialHelp, DUO);
    for (const { person, role } of team) {
      if (role === "run") add(person, "Izvedba dogodkov", (RULES.run + bonus) * factor);
      else add(person, "Začetna pomoč", (RULES.help + bonus) * factor);
      km[person] += (event.km ?? 0) / (shared && team.length > 1 ? team.length : 1);
    }
    add("Mitja", "Priprava opreme", RULES.equipment);
    add("Maja", "Priprava s stranko", RULES.clientPrep);
    add("Julija", "Povpraševanja in ponudbe", RULES.inquiry + RULES.confirmed);
    add("Julija", "Študenti in organizacija", RULES.organisation);
  }
  add("Julija", "Povpraševanja in ponudbe", unconfirmedOffers * RULES.inquiry);

  for (const rental of ledger.tables.filter((t) => t.date && t.date <= today)) {
    for (const [who, distance] of [
      [rental.deliveredBy, rental.kmDelivery],
      [rental.pickedBy, rental.kmPickup],
    ] as const) {
      if (!isPerson(who)) continue;
      add(asPerson(who), "Dostava in prevzem miz", RULES.tableTrip);
      km[asPerson(who)] += distance ?? 0;
    }
  }

  // Material is ordered by Jan unless someone else paid for it personally.
  for (const cost of ledger.costs.filter((c) => same(c.category, "Potrošni material"))) {
    add(isPerson(cost.payer) ? asPerson(cost.payer) : "Jan", "Naročila materiala", RULES.material);
  }

  const months = elapsedMonths(ledger.year, today);
  add("Mitja", "Klici", RULES.callsPerMonth * months);
  add("Julija", "Socialna omrežja", RULES.socialPerMonth * months * RULES.socialJulija);
  add("Maja", "Socialna omrežja", RULES.socialPerMonth * months * (1 - RULES.socialJulija));

  // Logged hours count up to the monthly cap per person.
  const logged = new Map<string, number>();
  for (const row of ledger.work) {
    if (!isPerson(row.person) || !row.hours) continue;
    const key = `${asPerson(row.person)}|${row.date?.slice(0, 7) ?? "brez datuma"}`;
    logged.set(key, (logged.get(key) ?? 0) + row.hours);
  }
  let overCap = 0;
  for (const [key, hours] of logged) {
    add(key.split("|")[0] as Person, "Ročno vpisane ure", Math.min(hours, RULES.workCapPerMonth));
    overCap += Math.max(hours - RULES.workCapPerMonth, 0);
  }

  // Fuel: km/100 × 7 l × price. Transport already claimed under Stroški → Prevoz is part of the same
  // money, so it is added back to the profit and counted as already paid.
  const fuelRate = (RULES.litresPer100 / 100) * ledger.fuelPrice;
  const claimed = Object.fromEntries(
    PEOPLE.map((p) => [p, ledger.costs.filter((c) => same(c.category, "Prevoz") && same(c.payer, p)).reduce((s, c) => s + (c.amount ?? 0), 0)]),
  ) as Record<Person, number>;
  const fuel = Object.fromEntries(PEOPLE.map((p) => [p, Math.max(km[p] * fuelRate, claimed[p])])) as Record<Person, number>;
  const claimedTotal = PEOPLE.reduce((s, p) => s + claimed[p], 0);

  const profit = computeOverview(ledger).profit + claimedTotal;
  const fuelTotal = PEOPLE.reduce((s, p) => s + fuel[p], 0);
  const distributable = profit - fuelTotal;
  const workPool = distributable * RULES.workShare;
  const ownerPool = distributable - workPool;
  const totalPoints = PEOPLE.reduce((s, p) => s + sumPoints(points[p]), 0);

  const people = PEOPLE.map((person) => {
    const own = sumPoints(points[person]);
    const share = totalPoints ? own / totalPoints : 0;
    return { person, pair: PAIR_OF[person], points: own, share, byCategory: points[person], work: workPool * share, km: km[person], fuel: fuel[person], claimed: claimed[person] };
  });

  const pairs = PAIRS.map((pair) => {
    const members = people.filter((p) => p.pair === pair);
    const work = members.reduce((s, p) => s + p.work, 0);
    const fuel = members.reduce((s, p) => s + p.fuel, 0);
    const total = work + ownerPool / 2 + fuel;
    return {
      pair,
      points: members.reduce((s, p) => s + p.points, 0),
      share: members.reduce((s, p) => s + p.share, 0),
      work,
      owner: ownerPool / 2,
      fuel,
      total,
      ofProfit: profit ? total / profit : 0,
      vsEqual: total - profit / 2,
    };
  });

  return {
    profit,
    claimedTotal,
    fuelRate,
    fuelTotal,
    distributable,
    workPool,
    ownerPool,
    totalPoints,
    months,
    overCap,
    unconfirmedOffers,
    eventsDone: done.length,
    weekendEvents: done.filter((e) => isWeekend(e.date!)).length,
    people,
    pairs,
  };
}

function sumPoints(byCategory: Record<Category, number>) {
  return Object.values(byCategory).reduce((s, n) => s + n, 0);
}

export type Contributions = ReturnType<typeof computeContributions>;
