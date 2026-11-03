"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormDialog, type FieldSpec, type FormValues } from "@/app/admin/_components/form-dialog";
import type { Absence } from "@/lib/db/absences";
import { NO_DELIVERY, splitPeople } from "@/lib/ledger/lists";
import { addAbsence, addCalendarEvent, type NewCalendarEvent } from "../actions";
import { absenceWarning, absentAmong } from "./absences";

// people: who can be marked away (the names from Izvedba dogodka, without Študenti).
export type CalendarLists = { executions: string[]; students: string[]; tableDrivers: string[]; people: string[] };

export const ABSENCE = "Odsotnost";
const SERVICES = ["Photo Booth", "360° Booth", "Mize", ABSENCE] as const;

const isAbsence = (values: FormValues) => values.service === ABSENCE;
const isTables = (values: FormValues) => values.service === "Mize";
const isBooth = (values: FormValues) => !isTables(values) && !isAbsence(values);
const isEvent = (values: FormValues) => !isAbsence(values);

function dateLabel(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("sl-SI", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

type Props = { date: string | null; service?: string; lists: CalendarLists; absences: Absence[]; onClose: () => void };

// Adds a booth event to Dogodki, a rental to Najem miz, or an absence, starting on the clicked day.
export function AddEventDialog({ date, service, lists, absences, onClose }: Props) {
  const router = useRouter();

  const fields: FieldSpec[] = [
    { key: "service", label: "Vrsta", kind: "seg", wide: true, options: [...SERVICES], initial: service },
    { key: "client", label: "Naročnik", kind: "text", required: true, placeholder: "Ime ali podjetje", when: isEvent },
    { key: "contact", label: "Kontakt", kind: "text", placeholder: "E-pošta ali telefon", when: isBooth },
    { key: "startTime", label: "Ura pričetka", kind: "text", placeholder: "npr. 19:00", when: isBooth },
    { key: "hours", label: "Ure", kind: "number", placeholder: "npr. 3", when: isBooth },
    { key: "location", label: "Lokacija", kind: "text", wide: true, placeholder: "Naslov dogodka", when: isEvent },
    { key: "execution", label: "Izvedba dogodka", kind: "select", wide: true, options: lists.executions, when: isBooth },
    {
      key: "studentsNeeded",
      label: "Št. potrebnih študentov",
      kind: "seg",
      wide: true,
      options: ["1", "2", "3", "4"],
      initial: "2",
      when: (values) => isBooth(values) && values.execution === "Študenti",
    },
    { key: "tableCount", label: "Št. miz", kind: "number", placeholder: "npr. 6", when: isTables },
    { key: "deliveredBy", label: "Dostavil / peljal", kind: "select", wide: true, options: [...lists.tableDrivers, NO_DELIVERY], when: isTables },
    { key: "students", label: "Študenti", kind: "multi", wide: true, options: lists.students, when: isEvent },
    { key: "people", label: "Kdo bo odsoten", kind: "multi", wide: true, required: true, options: lists.people, when: isAbsence },
    { key: "from", label: "Od", kind: "date", required: true, initial: date ?? "", when: isAbsence },
    { key: "to", label: "Do (vključno)", kind: "date", required: true, initial: date ?? "", when: isAbsence },
    { key: "notes", label: "Opombe", kind: "area", wide: true },
  ];

  // Warns when someone picked to work that day has an absence entered.
  function summary(values: FormValues): [string, string][] {
    if (!date || isAbsence(values)) return [];
    const names = [...splitPeople(isTables(values) ? values.deliveredBy : values.execution), ...(values.students ? values.students.split("\n") : [])];
    const warning = absenceWarning(absentAmong(absences, date, names));
    return warning ? [["Pozor", warning]] : [];
  }

  return (
    <FormDialog
      open={date !== null}
      onOpenChange={(open) => !open && onClose()}
      eyebrow={date ? `Koledar · ${dateLabel(date)}` : "Koledar"}
      title="Dodaj v koledar"
      fields={fields}
      summary={summary}
      validate={(values) => (isAbsence(values) && values.to && values.from && values.to < values.from ? "Datum »do« je pred datumom »od«" : null)}
      submitLabel="Dodaj"
      onSubmit={async (values) => {
        if (!date) return null;
        if (isAbsence(values)) {
          const result = await addAbsence({ from: values.from, to: values.to, people: values.people.split("\n"), note: values.notes });
          if (!result.ok) return result.error;
          toast.success("Odsotnost dodana");
          onClose();
          router.refresh();
          return null;
        }
        const tables = isTables(values);
        const input: NewCalendarEvent = {
          date,
          service: values.service as NewCalendarEvent["service"],
          client: values.client,
          contact: tables ? "" : values.contact,
          location: values.location,
          startTime: tables ? "" : values.startTime,
          hours: tables ? "" : values.hours,
          studentsNeeded: tables ? "" : values.studentsNeeded,
          tableCount: tables ? values.tableCount : "",
          execution: tables ? values.deliveredBy : values.execution,
          students: values.students ? values.students.split("\n") : [],
          notes: values.notes,
        };
        const result = await addCalendarEvent(input);
        if (!result.ok) return result.error;
        toast.success(tables ? "Dodano v Najem miz" : "Dodano v Dogodke");
        onClose();
        router.refresh();
        return null;
      }}
    />
  );
}
