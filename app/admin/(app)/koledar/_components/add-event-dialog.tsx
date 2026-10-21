"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormDialog, type FieldSpec, type FormValues } from "@/app/admin/_components/form-dialog";
import { NO_DELIVERY } from "@/lib/ledger/lists";
import { addCalendarEvent, type NewCalendarEvent } from "../actions";

export type CalendarLists = { executions: string[]; students: string[]; tableDrivers: string[] };

const SERVICES = ["Photo Booth", "360° Booth", "Mize"] as const;

const isTables = (values: FormValues) => values.service === "Mize";
const isBooth = (values: FormValues) => !isTables(values);

function dateLabel(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("sl-SI", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

// Adds a booth event to Dogodki or a rental to Najem miz for the clicked day.
export function AddEventDialog({ date, lists, onClose }: { date: string | null; lists: CalendarLists; onClose: () => void }) {
  const router = useRouter();

  const fields: FieldSpec[] = [
    { key: "service", label: "Storitev", kind: "seg", wide: true, options: [...SERVICES] },
    { key: "client", label: "Naročnik", kind: "text", required: true, placeholder: "Ime ali podjetje" },
    { key: "contact", label: "Kontakt", kind: "text", placeholder: "E-pošta ali telefon", when: isBooth },
    { key: "startTime", label: "Ura pričetka", kind: "text", placeholder: "npr. 19:00", when: isBooth },
    { key: "hours", label: "Ure", kind: "number", placeholder: "npr. 3", when: isBooth },
    { key: "location", label: "Lokacija", kind: "text", wide: true, placeholder: "Naslov dogodka" },
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
    { key: "students", label: "Študenti", kind: "multi", wide: true, options: lists.students },
    { key: "notes", label: "Opombe", kind: "area", wide: true },
  ];

  return (
    <FormDialog
      open={date !== null}
      onOpenChange={(open) => !open && onClose()}
      eyebrow={date ? `Nov dogodek · ${dateLabel(date)}` : "Nov dogodek"}
      title="Dodaj v koledar"
      fields={fields}
      submitLabel="Dodaj"
      onSubmit={async (values) => {
        if (!date) return null;
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
