"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  onSave: (draft: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  label: string;
  saved: string;
  suffix?: string;
  decimals?: number;
};

// Hand-entered yearly number (fund opening balance, fuel price) that saves on blur.
export function YearAmountInput({ value, onSave, label, saved, suffix = "€", decimals = 2 }: Props) {
  const original = value.toFixed(decimals).replace(".", ",");
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
      const result = await onSave(draft);
      setError(result.ok ? null : result.error);
      if (result.ok) toast.success(saved);
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
          aria-label={label}
          title="Ročni vnos"
          className={cn(
            "w-28 rounded-lg border border-dashed border-adm-soft bg-adm-hi px-2 py-0.5 text-right tabular outline-none transition-shadow focus:border-adm-ink focus:shadow-[0_0_0_3px_#E7DCCB] disabled:opacity-60",
            error && "border-adm-accent",
          )}
          disabled={pending}
        />
        {suffix}
      </span>
      {error && <span className="text-xs text-adm-accent">{error}</span>}
    </span>
  );
}
