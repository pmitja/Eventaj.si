import { PageHeader } from "@/app/admin/_components/page-header";
import { requireAdminPage } from "@/lib/admin-auth";
import { listConfirmedEvents } from "@/lib/db/inquiries";
import { getLists, listDoneEvents, listTableRentalEvents } from "@/lib/db/ledger";
import { getSlovenianDateString } from "@/lib/slovenian-date";
import { EventCalendar } from "./_components/event-calendar";

export default async function CalendarPage() {
  await requireAdminPage();
  const [planned, done, rentals, lists] = await Promise.all([listConfirmedEvents(), listDoneEvents(), listTableRentalEvents(), getLists()]);

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-5">
      <PageHeader title="Koledar" subtitle="Potrjena povpraševanja, opravljeni dogodki in najem miz iz poslovanja, čez vsa leta. Klik na dan doda nov dogodek." />
      <EventCalendar planned={planned} done={done} rentals={rentals} lists={{ executions: lists.executions, students: lists.students, tableDrivers: lists.tableDrivers }} today={getSlovenianDateString()} />
    </div>
  );
}
