// Check candidate titles, meta descriptions and headings with TypeSafe Jev.
// Jev does not write text: candidates are written by hand in jev-meta.json and
// Jev answers five yes/no checks for each. A candidate passes when the three
// SEO checks (query, one name, benefit) are all >= 0.90; passing candidates
// are ranked by the other two (natural Slovenian, search intent).
// Scores drift by about ±0.02 between runs, so run twice before going live.
// Usage: node --env-file=.env scripts/jev-meta.mjs [scripts/jev-meta.json]
import { readFile } from "node:fs/promises";

const configPath = process.argv[2] ?? "scripts/jev-meta.json";
const { market, brand, pages } = JSON.parse(await readFile(configPath, "utf8"));
const apiKey = process.env.TYPESAFE_API_KEY;
const model = process.env.TYPESAFE_MODEL ?? "jev-latest";
if (!apiKey) {
  console.error("Manjka TYPESAFE_API_KEY. Zaženi z: node --env-file=.env scripts/jev-meta.mjs");
  process.exit(1);
}

const MIN_SCORE = 0.9;
const fieldNames = {
  title: "naslov strani (title tag)",
  description: "meta opis",
  h1: "glavni naslov H1",
};
const checks = {
  primary: { gate: true, text: "Ali besedilo vsebuje primary_query v obliki, kot jo ljudje vpišejo v Google (dovoljena je slovenska sklanjatev)?" },
  natural: { gate: false, text: "Ali je besedilo naravna, slovnično pravilna slovenščina, kot bi jo napisal domači govorec?" },
  clean: {
    gate: true,
    text: "Ali besedilo za isto storitev uporablja samo eno ime, brez oklepajev in brez naštevanja dveh imen zapored (napačno je npr. 'foto box (photo booth)' ali 'foto box / photo booth')? Ena sama tuja beseda, kot je photo booth, je dovoljena.",
    // Without these anchors Jev also penalises a lone English term like "photo booth".
    criteria: {
      true: "Storitev je poimenovana z enim samim imenom, npr. 'Photo booth za obletnico', 'Foto kotiček za poroko' ali '360 photo booth najem'.",
      false: "Storitev je poimenovana z dvema imenoma, npr. 'Foto box (photo booth)', 'foto box / photo booth', 'Photo booth najem – foto stojnica' ali 'Foto kotiček in photo booth'.",
    },
  },
  benefit: { gate: true, text: "Ali besedilo iskalcu pove konkretno ceno ali konkretno prednost storitve?" },
  intent: { gate: false, text: "Ali besedilo jasno ustreza iskalnemu namenu primary_query in iskalca prepriča, da je to prava stran zanj?" },
};

for (const page of pages) {
  for (const [field, candidates] of Object.entries(page.fields)) {
    const state = {
      market,
      brand,
      page: page.path,
      field: fieldNames[field] ?? field,
      primary_query: page.primary,
      secondary_queries: page.secondary,
      // Real search data, e.g. from Search Console; Jev can't know what people type.
      query_evidence: page.evidence,
      offer: page.offer,
    };
    const questions = {};
    candidates.forEach((text, i) => {
      for (const [name, check] of Object.entries(checks)) {
        questions[`${name}_${i}`] = {
          type: "noul",
          instructions: `Besedilo: "${text}". ${check.text}`,
          ...(check.criteria && { criteria: check.criteria }),
        };
      }
    });

    const res = await fetch("https://api.typesafe.ai/v1/systemone", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model, state, questions }),
    });
    if (!res.ok) {
      console.error(`${page.path} ${field}: ${res.status} ${await res.text()}`);
      continue;
    }
    const { answers } = await res.json();

    console.log(`\n=== ${page.path} | ${field} | ${page.primary}`);
    console.log(`  (${Object.keys(checks).join(" ")})`);
    candidates
      .map((text, i) => {
        const scores = Object.keys(checks).map((name) => answers[`${name}_${i}`].noul);
        const gate = Math.min(...Object.values(checks).flatMap((c, j) => (c.gate ? [scores[j]] : [])));
        const passed = gate >= MIN_SCORE;
        const rank = passed
          ? 1 + Object.values(checks).reduce((sum, c, j) => sum + (c.gate ? 0 : scores[j]), 0)
          : gate;
        return { text, scores, passed, rank };
      })
      .sort((a, b) => b.rank - a.rank)
      .forEach(({ text, scores, passed }) => {
        const mark = passed ? "OK" : "--";
        console.log(`  ${mark} | ${scores.map((s) => s.toFixed(2)).join(" ")} | [${text.length} zn.] ${text}`);
      });
  }
}
