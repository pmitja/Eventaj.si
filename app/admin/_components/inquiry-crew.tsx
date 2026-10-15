"use client";

import { Users } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { changeInquiryCrew } from "../(app)/actions";

// Who works a confirmed event. Shown in the calendar; saved when the field loses focus.
export function InquiryCrewControl({ id, crew }: { id: number; crew: string | null }) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(crew ?? "");
  const [draft, setDraft] = useState(crew ?? "");

  function save() {
    if (draft.trim() === saved) return setDraft(saved);
    startTransition(async () => {
      const result = await changeInquiryCrew(id, draft);
      if (!result.ok) {
        toast.error(result.error);
        setDraft(saved);
        return;
      }
      setSaved(result.value ?? "");
      setDraft(result.value ?? "");
      toast.success(result.value ? `Na dogodek gre: ${result.value}` : "Ekipa je odstranjena");
    });
  }

  return (
    <label className="flex flex-wrap items-center gap-2.5">
      <span className="flex items-center gap-1.5 text-adm-muted">
        <Users className="size-4" />
        Kdo gre:
      </span>
      <input
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={save}
        onKeyDown={(event) => {
          if (event.key === "Enter") event.currentTarget.blur();
          if (event.key === "Escape") setDraft(saved);
        }}
        disabled={pending}
        maxLength={200}
        placeholder="npr. Jan, Klara"
        className="min-w-0 flex-1 rounded-full border border-dashed border-adm-soft bg-transparent px-3 py-1 outline-none transition-colors placeholder:text-adm-faint hover:border-adm-ink focus:border-solid focus:border-adm-ink disabled:opacity-50 sm:max-w-[320px]"
      />
    </label>
  );
}
