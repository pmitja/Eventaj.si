"use client";

import { ChevronDown } from "lucide-react";
import { Children, useState, type ReactNode } from "react";

type Props = { initial: number; step?: number; className?: string; children: ReactNode };

// Shows the first few items and a "Naloži več" button that reveals the next batch.
export function ShowMore({ initial, step = 5, className, children }: Props) {
  const items = Children.toArray(children);
  const [shown, setShown] = useState(initial);
  const hidden = items.length - shown;

  return (
    <>
      <div className={className}>{items.slice(0, shown)}</div>
      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setShown((count) => count + step)}
          className="flex items-center justify-center gap-1.5 self-center rounded-full border border-adm-soft px-5 py-2.5 text-sm transition-colors hover:border-adm-ink"
        >
          Naloži več
          <span className="tabular text-xs text-adm-muted">{hidden}</span>
          <ChevronDown className="size-3.5 text-adm-muted" />
        </button>
      )}
    </>
  );
}
