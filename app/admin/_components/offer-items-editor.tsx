"use client";

import { RotateCcw } from "lucide-react";
import { formatEur, overrideKey, type ItemOverride, type ItemOverrides, type OfferItem } from "@/lib/offers/pricing";
import { itemInputClass } from "./custom-items-editor";

type Props = {
  variantIndex: number;
  /** Lines with overrides applied; custom items are skipped here and edited separately. */
  items: OfferItem[];
  /** The same variant without overrides, to name removed lines. */
  baseItems: OfferItem[];
  overrides: ItemOverrides;
  onChange: (overrides: ItemOverrides) => void;
};

/** Every computed line of the offer can be reworded, repriced or removed. */
export function OfferItemsEditor({ variantIndex, items, baseItems, overrides, onChange }: Props) {
  const keyOf = (item: OfferItem) => overrideKey(variantIndex, item.key!);
  const patch = (item: OfferItem, change: ItemOverride) =>
    onChange({ ...overrides, [keyOf(item)]: { ...overrides[keyOf(item)], ...change } });
  const reset = (item: OfferItem) => {
    const rest = { ...overrides };
    delete rest[keyOf(item)];
    onChange(rest);
  };
  const removed = baseItems.filter((item) => item.key && overrides[keyOf(item)]?.removed);

  return (
    <div className="space-y-1.5">
      {items.map((item) => {
        if (!item.key) {
          return (
            <div key={item.description} className="flex justify-between gap-4 py-1">
              <span>{item.description}</span>
              <span className="shrink-0 tabular-nums">{item.amount === null ? item.note : formatEur(item.amount)}</span>
            </div>
          );
        }
        const override = overrides[keyOf(item)];
        const amount = override && "amount" in override ? override.amount : item.amount;
        return (
          <div key={item.key} className="flex items-center gap-2">
            <input
              value={override?.description ?? item.description}
              onChange={(event) => patch(item, { description: event.target.value })}
              aria-label="Opis postavke"
              className={`${itemInputClass} flex-1`}
            />
            <input
              type="number"
              step={0.01}
              inputMode="decimal"
              value={amount === null || amount === undefined ? "" : amount}
              placeholder={item.note ?? "vključeno"}
              onChange={(event) => patch(item, { amount: event.target.value === "" ? null : Number(event.target.value) })}
              aria-label="Znesek v evrih (prazno = brez zneska)"
              className={`${itemInputClass} w-28 text-right tabular-nums placeholder:text-xs`}
            />
            <span className="text-sm">€</span>
            {override ? (
              <button
                type="button"
                onClick={() => reset(item)}
                aria-label="Ponastavi postavko"
                title="Ponastavi na izračunano"
                className="px-1 text-adm-muted hover:text-adm-accent"
              >
                <RotateCcw className="size-3.5" />
              </button>
            ) : (
              <span className="w-[22px]" />
            )}
            <button
              type="button"
              onClick={() => patch(item, { removed: true })}
              aria-label="Odstrani postavko"
              className="px-1 text-lg leading-none text-adm-muted hover:text-adm-accent"
            >
              ×
            </button>
          </div>
        );
      })}
      {removed.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {removed.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => reset(item)}
              title="Vrni postavko"
              className="rounded-full border border-dashed border-adm-ink/20 px-3 py-1 text-xs text-adm-muted line-through decoration-adm-muted/60 hover:border-adm-accent hover:no-underline"
            >
              ↺ {item.description}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
