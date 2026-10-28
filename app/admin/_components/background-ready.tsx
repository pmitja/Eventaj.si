"use client";

import { Check, Palette } from "lucide-react";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";
import { markBackgroundReady } from "../(app)/actions";
import { formatReceived } from "./format-received";

type Props = { inquiryId: number; readyAt: string | null };

// Marked by whoever makes the backgrounds, so everyone sees which events still need one.
export function BackgroundReady({ inquiryId, readyAt }: Props) {
  const [pending, startTransition] = useTransition();
  const [current, setCurrent] = useOptimistic(readyAt);

  function toggle() {
    const ready = !current;
    if (!ready && !window.confirm("Odstranim oznako »ozadje pripravljeno«?")) return;
    startTransition(async () => {
      setCurrent(ready ? new Date().toISOString() : null);
      const result = await markBackgroundReady(inquiryId, ready);
      if (!result.ok) toast.error(result.error);
      else toast.success(ready ? "Ozadje je označeno kot pripravljeno" : "Oznaka »ozadje pripravljeno« je odstranjena");
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5 border-t border-adm-line pt-3">
      <span className="text-adm-muted">Ozadje:</span>
      {current ? (
        <button
          type="button"
          onClick={toggle}
          disabled={pending}
          title="Klikni za odstranitev oznake"
          className="flex items-center gap-1.5 rounded-full border border-adm-ok-fg bg-adm-ok px-3 py-1 text-adm-ok-fg transition-opacity hover:opacity-70 disabled:opacity-50"
        >
          <Check className="size-3.5" />
          Pripravljeno {formatReceived(current)}
        </button>
      ) : (
        <button
          type="button"
          onClick={toggle}
          disabled={pending}
          className="flex items-center gap-1.5 rounded-full border border-dashed border-adm-soft px-3 py-1 text-adm-muted transition-colors hover:border-adm-ink hover:text-adm-ink disabled:opacity-50"
        >
          <Palette className="size-3.5" />
          Označi ozadje kot pripravljeno
        </button>
      )}
    </div>
  );
}
