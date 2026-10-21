// Prispevki: who did how much work in a year, and how the profit is split from it.
// 1 point ≈ 1 hour of work. Profit minus fuel money is split by points and 50/50 by pair; the
// share that goes by points depends on how much of the work the busier pair did (SPLIT_TIERS).
import { computeOverview, DUO, PAIRS } from "./compute";
import type { EventRow, LedgerYear } from "./schema";

export const PEOPLE = ["Mitja", "Julija", "Jan", "Maja"] as const;
export type Person = (typeof PEOPLE)[number];
type Pair = (typeof PAIRS)[number];

export const PAIR_OF: Record<Person, Pair> = { Jan: PAIRS[0], Maja: PAIRS[0], Mitja: PAIRS[1], Julija: PAIRS[1] };

export const WORK_KINDS = ["Spletna stran", "Nove storitve / izboljšave", "Drugo"];

// Busier pair's share of points → share of the money that goes by points (rest 50/50 by pair).
// Checked top-down: the first tier whose `from` the share reaches wins.
export const SPLIT_TIERS = [
  { from: 0.8, workShare: 0.8, label: "80 % ali več" },
  { from: 0.7, workShare: 0.7, label: "nad 70 %", strict: true },
  { from: 0.55, workShare: 0.6, label: "55–70 %" },
  { from: 0, workShare: 0.5, label: "pod 55 %" },
] as const;

export function splitTier(topPairShare: number) {
  return SPLIT_TIERS.find((t) => ("strict" in t ? topPairShare > t.from : topPairShare >= t.from))!;
}

export const RULES = {
  run: 5, // izvedba dogodka na osebo
  kmStep: 50, // +1 točka na vsakih 50 km v eno smer
  help: 2, // začetna pomoč študentom
  equipment: 1.5, // priprava opreme pred in po dogodku (Mitja)
  clientPrep: 1.5, // priprava s stranko (Maja)
  inquiry: 0.5, // povpraševanje → poslana ponudba (Julija)
  confirmed: 0.5, // povpraševanje postane dogodek (Julija)
  organisation: 0.15, // študenti, organizacija, pregled, opombe, na poslano ponudbo (Julija)
  tableTrip: 1, // dostava ali prevzem miz
  material: 0.25, // naročilo potrošnega materiala
  callsPerMonth: 8, // klici (Mitja)
  socialPerMonth: 6, // socialna omrežja: po vpisanih objavah meseca; mesec brez objav 0
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
    const bonus = Math.floor((event.km ?? 0) / 2 / RULES.kmStep); // km v Dogodkih = tja in nazaj
    const team = crew(event);
    const shared = same(event.execution, DUO) || same(event.initialHelp, DUO);
    for (const { person, role } of team) {
      if (role === "run") add(person, "Izvedba dogodkov", RULES.run + bonus);
      else add(person, "Začetna pomoč", RULES.help + bonus);
      km[person] += (event.km ?? 0) / (shared && team.length > 1 ? team.length : 1);
    }
    add("Mitja", "Priprava opreme", RULES.equipment);
    add("Maja", "Priprava s stranko", RULES.clientPrep);
    add("Julija", "Povpraševanja in ponudbe", RULES.inquiry + RULES.confirmed);
    add("Julija", "Študenti in organizacija", RULES.organisation);
  }
  add("Julija", "Povpraševanja in ponudbe", unconfirmedOffers * RULES.inquiry);
  add("Julija", "Študenti in organizacija", unconfirmedOffers * RULES.organisation);

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

  // Social: a month with logged posts gives its full points, split by those posts. A month without
  // posts (no entry or 0) gives no points to anyone.
  const posts = Array.from({ length: 12 }, () => new Map<Person, number>());
  for (const row of ledger.social) {
    if (!isPerson(row.person) || row.posts === null || !row.date) continue;
    const month = posts[Number(row.date.slice(5, 7)) - 1];
    month.set(asPerson(row.person), (month.get(asPerson(row.person)) ?? 0) + row.posts);
  }
  let socialMonthsByPosts = 0;
  posts.forEach((month, i) => {
    const total = [...month.values()].reduce((s, n) => s + n, 0);
    if (!total || i >= months) return; // brez objav ali mesec se še ni začel
    socialMonthsByPosts++;
    for (const [person, n] of month) add(person, "Socialna omrežja", (RULES.socialPerMonth * n) / total);
  });

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
  const totalPoints = PEOPLE.reduce((s, p) => s + sumPoints(points[p]), 0);
  const pairShare = (pair: Pair) => (totalPoints ? PEOPLE.filter((p) => PAIR_OF[p] === pair).reduce((s, p) => s + sumPoints(points[p]), 0) / totalPoints : 0.5);
  const topPairShare = Math.max(...PAIRS.map(pairShare));
  const tier = splitTier(topPairShare);
  const workPool = distributable * tier.workShare;
  const ownerPool = distributable - workPool;

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
    topPairShare,
    workShare: tier.workShare,
    workPool,
    ownerPool,
    totalPoints,
    months,
    overCap,
    socialMonthsByPosts,
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
