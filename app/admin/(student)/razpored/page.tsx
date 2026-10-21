import { redirect } from "next/navigation";
import { KpiCard } from "@/app/admin/_components/kpi-card";
import { Stagger } from "@/app/admin/_components/motion";
import { PageHeader } from "@/app/admin/_components/page-header";
import { getAdminUser } from "@/lib/admin-auth";
import { listOpenEvents } from "@/lib/db/open-events";
import { getStudentSchedule } from "@/lib/db/student-schedule";
import { formatEur } from "@/lib/ledger/compute";
import { getSlovenianDateString } from "@/lib/slovenian-date";
import { OpenEvents } from "./_components/open-events";
import { NextShift, PastShifts, UpcomingShifts } from "./_components/shift-lists";

type Props = { searchParams: Promise<{ student?: string | string[] }> };

// A student sees their own schedule; an admin can open anyone's with ?student=<ime> to check what they see.
export default async function StudentSchedulePage({ searchParams }: Props) {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  const param = (await searchParams).student;
  const student = user.role === "student" ? user.student : typeof param === "string" ? param : null;
  if (user.role === "admin" && !student) redirect("/admin/poslovanje/nastavitve");

  if (!student) {
    return <PageHeader eyebrow="Moj razpored" title={`Živijo, ${user.name}`} subtitle="Račun še ni povezan s študentom. Javi se Mitji ali Janu." />;
  }

  const today = getSlovenianDateString();
  const [shifts, open] = await Promise.all([getStudentSchedule(student), listOpenEvents(student, today)]);
  const year = today.slice(0, 4);
  const upcoming = shifts.filter((s) => s.date >= today);
  const past = shifts.filter((s) => s.date < today).reverse();
  const thisYear = shifts.filter((s) => s.date.startsWith(year));
  const sum = (list: typeof shifts) => list.reduce((total, s) => total + (s.amount ?? 0), 0);
  const owed = shifts.filter((s) => !s.paid && s.amount !== null);
  const [next, ...later] = upcoming;

  return (
    <>
      <PageHeader
        eyebrow={user.role === "admin" ? "Predogled študentskega pogleda" : "Moj razpored"}
        title={`Živijo, ${student}`}
        subtitle={
          upcoming.length === 0
            ? "Trenutno nimaš prihajajočih dogodkov."
            : `Prihajajoči dogodki: ${upcoming.length}. Klik na lokacijo odpre zemljevid, na telefon pa klic.`
        }
      />

      {next && <NextShift shift={next} today={today} />}

      {open.length > 0 && <OpenEvents events={open} today={today} canClaim={user.role === "student"} />}

      <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <KpiCard label={`Zaslužek ${year}`} value={sum(thisYear)} format="eur" size="md" dark />
        <KpiCard label="Izplačano" value={sum(thisYear.filter((s) => s.paid))} format="eur" size="md" sub={`v letu ${year}`} />
        <KpiCard
          label="Čaka na izplačilo"
          value={sum(owed)}
          format="eur"
          size="md"
          sub={owed.length ? `${owed.length} × dogodek` : "vse poravnano"}
        />
        <KpiCard label={`Dogodki ${year}`} value={thisYear.length} format="int" size="md" sub={`skupaj ${formatEur(sum(shifts))}`} />
      </Stagger>

      {later.length > 0 && <UpcomingShifts shifts={later} today={today} />}
      {past.length > 0 && <PastShifts shifts={past} />}
    </>
  );
}
