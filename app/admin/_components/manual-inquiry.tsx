"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import type { InquiryWithOffers } from "@/lib/db/inquiries";
import { addManualInquiry, type ManualInquiryInput } from "../(app)/actions";
import { FormDialog, type FieldSpec, type FormValues } from "./form-dialog";
import { OfferDialog } from "./offer-dialog";

const SERVICES = [
  { value: "basic", label: "Photo Booth" },
  { value: "360", label: "360° Booth" },
  { value: "both", label: "Photo + 360°" },
  { value: "tables", label: "Mize" },
];

const isTables = (values: FormValues) => values.type === "tables";
const isBooth = (values: FormValues) => !isTables(values);

const fields: FieldSpec[] = [
  { key: "type", label: "Storitev", kind: "seg", wide: true, options: SERVICES },
  { key: "name", label: "Ime stranke", kind: "text", required: true, placeholder: "Ime ali podjetje" },
  { key: "email", label: "E-pošta", kind: "email", placeholder: "stranka@primer.si" },
  { key: "phone", label: "Telefon", kind: "text" },
  { key: "date", label: "Datum dogodka", kind: "date" },
  { key: "location", label: "Lokacija", kind: "text", wide: true, placeholder: "Kraj ali prizorišče" },
  { key: "hours", label: "Trajanje", kind: "seg", options: ["2", "3", "4", "5", "6"].map((h) => ({ value: h, label: `${h} h` })), initial: "3", when: isBooth },
  { key: "eventType", label: "Vrsta dogodka", kind: "text", placeholder: "Poroka, rojstni dan …", when: isBooth },
  { key: "tableCount", label: "Št. miz", kind: "number", required: true, placeholder: "npr. 6", when: isTables },
  { key: "tablecloth", label: "Prti", kind: "seg", options: ["Bel prt", "Črn prt", "Beli in črni prti"], when: isTables },
  { key: "fulfillment", label: "Prevzem", kind: "seg", wide: true, options: ["Dostava", "Osebni prevzem"], when: isTables },
  { key: "message", label: "Sporočilo stranke", kind: "area", wide: true, placeholder: "Prilepi e-pošto ali povzetek pogovora" },
];

// For customers who wrote straight to our e-mail: the inquiry gets the same card as a form one,
// then the offer dialog opens right away.
export function ManualInquiryButton({ onActiveView }: { onActiveView: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [created, setCreated] = useState<InquiryWithOffers | null>(null);

  async function submit(values: FormValues) {
    const tables = isTables(values);
    const input: ManualInquiryInput = {
      type: values.type as ManualInquiryInput["type"],
      name: values.name,
      email: values.email,
      phone: values.phone,
      date: values.date,
      location: values.location,
      hours: tables ? "" : values.hours,
      eventType: tables ? "" : values.eventType,
      tableCount: tables ? values.tableCount : "",
      tablecloth: tables ? values.tablecloth : "",
      pickup: tables && values.fulfillment === "Osebni prevzem",
      message: values.message,
    };
    const result = await addManualInquiry(input);
    if (!result.ok) return result.error;
    toast.success(`Povpraševanje #${result.value.id} je dodano med aktivna`);
    setOpen(false);
    setCreated(result.value);
    if (!onActiveView) router.push("/admin");
    return null;
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className="group flex items-center gap-2 rounded-full bg-adm-ink px-[18px] py-[11px] text-sm text-adm-bg transition-colors hover:bg-adm-accent"
      >
        <Sparkles className="size-4 transition-transform duration-300 group-hover:rotate-12" />
        Zgeneriraj ponudbo
      </motion.button>

      <FormDialog
        open={open}
        onOpenChange={setOpen}
        eyebrow="Povpraševanje prek e-pošte"
        title="Novo povpraševanje"
        fields={fields}
        validate={(values) => {
          if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) return "E-naslov ni veljaven";
          if (isTables(values) && !(Number(values.tableCount) >= 1)) return "Vpiši število miz";
          return null;
        }}
        onSubmit={submit}
        submitLabel="Dodaj in pripravi ponudbo"
      />

      {created && <OfferDialog key={created.id} inquiry={created} onClose={() => setCreated(null)} />}
    </>
  );
}
