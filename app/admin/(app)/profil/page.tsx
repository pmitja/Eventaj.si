import { requireAdminPage } from "@/lib/admin-auth";
import { getLedgerYear, listYears } from "@/lib/db/ledger";
import { attendance, computeOverview, DUO, FUND, payerPair, rowTotal } from "@/lib/ledger/compute";
import { ProfileView, type ProfileData } from "./profile-view";

export default async function ProfilePage() {
  const user = await requireAdminPage();
  const years = await listYears();
  const thisYear = new Date().getFullYear();
  const year = years.includes(thisYear) ? thisYear : years[years.length - 1];
  const ledger = year ? await getLedgerYear(year) : null;

  const pair = payerPair(user.name);
  const same = (value: string | null, name: string) => (value ?? "").toLowerCase() === name.toLowerCase();
  const mine = (field: string | null) => same(field, user.name) || same(field, DUO);

  let stats: ProfileData["stats"] = null;
  if (ledger) {
    const events = ledger.events.filter((e) => e.date);
    const me = attendance(events, user.name);
    const overview = computeOverview(ledger);
    const pairRow = overview.pairs.find((p) => p.pair === pair);
    const involved = events.filter((e) => mine(e.execution) || mine(e.initialHelp));
    stats = {
      year: ledger.year,
      fullRuns: me.fullRuns,
      hours: me.hours,
      km: me.km,
      helps: me.initialHelps,
      months: Array.from({ length: 12 }, (_, i) => involved.filter((e) => Number(e.date!.slice(5, 7)) - 1 === i).length),
      settlement: pairRow ? { paid: pairRow.paidPersonally, refunded: pairRow.refunded, due: pairRow.due, instruction: pairRow.instruction } : null,
      recent: [...involved]
        .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
        .slice(0, 6)
        .map((e) => ({
          id: e.id,
          date: e.date!,
          client: e.client ?? "—",
          role: same(e.execution, DUO) ? "Skupaj" : mine(e.execution) ? "Polna izvedba" : "Začetna pomoč",
          total: rowTotal(e) ?? 0,
        })),
    };
  }

  return (
<ProfileView data={{ name: user.name, email: user.email, pair: pair && pair !== FUND ? pair : null, stats }} />
  );
}
