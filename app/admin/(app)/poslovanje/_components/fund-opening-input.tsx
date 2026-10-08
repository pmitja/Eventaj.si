"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { updateFundOpening } from "../actions";

export function FundOpeningInput({ year, value }: { year: number; value: number }) {
  const original = value.toFixed(2).replace(".", ",");
  const [draft, setDraft] = useState(original);
  const [synced, setSynced] = useState(original);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  if (synced !== original) {
    setSynced(original);
    setDraft(original);
  }

  const commit = () => {
    if (draft.trim() === original) return;
    startTransition(async () => {
      const result = await updateFundOpening(year, draft);
      setError(result.ok ? null : result.error);
      if (result.ok) toast.success("Začetno stanje fonda je posodobljeno");
    });
  };

  return (
    <span className="inline-flex flex-col items-end">
      <span className="inline-flex items-center gap-1">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => event.key === "Enter" && event.currentTarget.blur()}
          inputMode="decimal"
          aria-label="Začetno stanje fonda"
          title="Ročni vnos"
          className={cn(
            "w-28 rounded-lg border border-dashed border-adm-soft bg-adm-hi px-2 py-0.5 text-right tabular outline-none transition-shadow focus:border-adm-ink focus:shadow-[0_0_0_3px_#E7DCCB] disabled:opacity-60",
            error && "border-adm-accent",
          )}
          disabled={pending}
        />
        €
      </span>
      {error && <span className="text-xs text-adm-accent">{error}</span>}
    </span>
  );
}
