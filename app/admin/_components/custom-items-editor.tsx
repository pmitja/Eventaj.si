"use client";

import type { CustomItem } from "@/lib/offers/pricing";

const inputClass =
  "min-w-0 rounded-lg border border-adm-ink/20 bg-adm-card px-2.5 py-1.5 text-sm outline-none focus:border-adm-accent";

type Props = { items: CustomItem[]; presets: CustomItem[]; onChange: (items: CustomItem[]) => void };

export function CustomItemsEditor({ items, presets, onChange }: Props) {
  const set = (index: number, patch: Partial<CustomItem>) =>
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  const unusedPresets = presets.filter((preset) => !items.some((item) => item.description === preset.description));

  return (
    <div className="space-y-2 border-t border-adm-ink/10 pt-3">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            value={item.description}
            onChange={(event) => set(index, { description: event.target.value })}
            placeholder="Opis postavke"
            aria-label="Opis postavke"
            className={`${inputClass} flex-1`}
          />
          <input
            type="number"
            step={0.01}
            inputMode="decimal"
            value={Number.isFinite(item.amount) ? item.amount : ""}
            onChange={(event) => set(index, { amount: event.target.value === "" ? 0 : Number(event.target.value) })}
            aria-label="Znesek v evrih"
            className={`${inputClass} w-24 text-right tabular-nums`}
          />
          <span className="text-sm">€</span>
          <button
            type="button"
            onClick={() => onChange(items.filter((_, i) => i !== index))}
            aria-label="Odstrani postavko"
            className="px-1 text-lg leading-none text-adm-muted hover:text-adm-accent"
          >
            ×
          </button>
        </div>
      ))}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onChange([...items, { description: "", amount: 0 }])}
          className="rounded-full border border-dashed border-adm-ink/30 px-3 py-1 text-sm hover:border-adm-accent"
        >
          + Dodaj postavko
        </button>
        {unusedPresets.map((preset) => (
          <button
            key={preset.description}
            type="button"
            onClick={() => onChange([...items, preset])}
            className="rounded-full border border-adm-ink/15 bg-adm-side px-3 py-1 text-sm hover:border-adm-accent"
          >
            + {preset.description} ({preset.amount} €)
          </button>
        ))}
      </div>
    </div>
  );
}
