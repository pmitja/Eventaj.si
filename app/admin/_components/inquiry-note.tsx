"use client";

import { NotebookPen, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { changeInquiryNote } from "../(app)/actions";
import { FormDialog } from "./form-dialog";

type DialogProps = {
  id: number;
  note: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // Right after confirming, the dialog asks instead of just editing.
  afterConfirm?: boolean;
};

export function InquiryNoteDialog({ id, note, open, onOpenChange, afterConfirm }: DialogProps) {
  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      eyebrow={afterConfirm ? `Povpraševanje #${id} je potrjeno` : `Povpraševanje #${id}`}
      title={afterConfirm ? "Želiš dodati opombo?" : note ? "Uredi opombo" : "Dodaj opombo"}
      fields={[
        {
          key: "note",
          label: "Opomba",
          kind: "area",
          wide: true,
          initial: note ?? "",
          placeholder: "Npr. dostop do lokacije, kontakt na dogodku, posebne želje …",
        },
      ]}
      submitLabel="Shrani opombo"
      cancelLabel={afterConfirm ? "Brez opombe" : "Prekliči"}
      onSubmit={async ({ note: text }) => {
        const result = await changeInquiryNote(id, text);
        if (!result.ok) return result.error;
        toast.success(text.trim() ? "Opomba je shranjena" : "Opomba je odstranjena");
        onOpenChange(false);
        return null;
      }}
    />
  );
}

// Our internal note on the inquiry card. On a confirmed one it is also Opombe in Dogodki / Najem miz.
export function InquiryNote({ id, note }: { id: number; note: string | null }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-wrap items-start gap-2.5">
      <span className="py-1 text-adm-muted">Opomba:</span>
      {note ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          title="Klikni za urejanje"
          className="flex min-w-0 flex-1 items-start gap-2 rounded-xl bg-adm-side px-3 py-1.5 text-left transition-opacity hover:opacity-75"
        >
          <NotebookPen className="mt-0.5 size-3.5 shrink-0 text-adm-accent" />
          <span className="whitespace-pre-line [text-wrap:pretty]">{note}</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 rounded-full border border-dashed border-adm-soft px-3 py-1 text-adm-muted transition-colors hover:border-adm-ink hover:text-adm-ink"
        >
          <Plus className="size-3.5" />
          Dodaj opombo
        </button>
      )}
      <InquiryNoteDialog id={id} note={note} open={open} onOpenChange={setOpen} />
    </div>
  );
}
