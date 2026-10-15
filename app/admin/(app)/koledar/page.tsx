import { PageHeader } from "@/app/admin/_components/page-header";
import { requireAdminPage } from "@/lib/admin-auth";
import { listConfirmedEvents } from "@/lib/db/inquiries";
import { listDoneEvents } from "@/lib/db/ledger";
import { getSlovenianDateString } from "@/lib/slovenian-date";
import { EventCalendar } from "./_components/event-calendar";

export default async function CalendarPage() {
  await requireAdminPage();
  const [planned, done] = await Promise.all([listConfirmedEvents(), listDoneEvents()]);

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-5">
      <PageHeader title="Koledar" subtitle="Potrjena povpraševanja in opravljeni dogodki iz poslovanja, čez vsa leta." />
      <EventCalendar planned={planned} done={done} today={getSlovenianDateString()} />
    </div>
  );
}
