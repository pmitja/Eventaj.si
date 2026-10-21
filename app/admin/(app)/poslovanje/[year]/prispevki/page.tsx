import { countUnconfirmedOffers } from "@/lib/db/ledger";
import { ContributionsWorkspace } from "../../_components/contributions-workspace";
import { loadYear } from "../../_components/load";

export default async function ContributionsPage({ params }: { params: Promise<{ year: string }> }) {
  const { ledger } = await loadYear(params);
  const offers = await countUnconfirmedOffers(ledger.year);
  const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Ljubljana" });
  return <ContributionsWorkspace ledger={ledger} today={today} unconfirmedOffers={offers} />;
}
