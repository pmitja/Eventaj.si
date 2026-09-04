"use client";

import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import type { EquipmentProduct } from "@/content/eventaj/equipment";
import { Check, Minus, Plus, Truck } from "lucide-react";
import { useMemo, useState } from "react";

const euro = new Intl.NumberFormat("sl-SI", { style: "currency", currency: "EUR" });

export function EquipmentInquiryCard({ product }: { product: EquipmentProduct }) {
  const [quantityInput, setQuantityInput] = useState(String(product.quantity?.defaultValue ?? 1));
  const [selections, setSelections] = useState<number[]>(() => product.selectors?.map(() => 0) ?? []);

  const quantity = product.quantity
    ? Math.min(
        product.quantity.max ?? Number.MAX_SAFE_INTEGER,
        Math.max(product.quantity.min, Math.trunc(Number(quantityInput)) || product.quantity.min),
      )
    : 1;

  const chosenOptions = useMemo(
    () => product.selectors?.map((selector, index) => selector.options[selections[index] ?? 0]) ?? [],
    [product.selectors, selections],
  );
  const tierUnitPrice = product.quantityTiers?.reduce(
    (price, tier) => quantity >= tier.min ? tier.unitPrice : price,
    product.price,
  ) ?? product.price;
  const unitPrice = chosenOptions.reduce((price, option) => option?.price ?? price, tierUnitPrice);
  const extras = chosenOptions.reduce((sum, option) => sum + (option?.priceDelta ?? 0), 0);
  const total = (product.pricingMode === "per-unit" ? unitPrice * quantity : unitPrice) + extras;
  const selectedLabel = chosenOptions.map((option) => option.label).join(", ");

  function select(groupIndex: number, optionIndex: number) {
    setSelections((current) => current.map((value, index) => index === groupIndex ? optionIndex : value));
  }

  return (
    <aside className="border border-[rgba(20,17,15,0.14)] bg-[rgba(251,248,242,0.96)] p-6 shadow-[0_28px_70px_-45px_rgba(20,17,15,0.45)] md:p-8 lg:sticky lg:top-28">
      <div className="flex items-start justify-between gap-5 border-b border-[rgba(20,17,15,0.1)] pb-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--eventaj-muted)]">Cena</div>
          <div className="mt-2 font-serif-display text-4xl font-[350] leading-none">{product.priceLabel}</div>
          <div className="mt-2 text-sm text-[var(--eventaj-muted)]">{product.priceSubtitle}</div>
        </div>
        <span className="rounded-full bg-[#E8B584]/25 px-3 py-2 text-xs font-medium">{product.status}</span>
      </div>

      {product.quantity && (
        <div className="py-6">
          <div className="mb-3 flex items-center justify-between">
            <label htmlFor={`${product.id}-quantity`} className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--eventaj-muted)]">{product.quantity.label}</label>
            <span className="text-xs text-[var(--eventaj-muted)]">{product.quantity.min}{product.quantity.max ? `–${product.quantity.max}` : "+"} {product.quantity.unit}</span>
          </div>
          <div className="flex h-14 items-center justify-between border border-[rgba(20,17,15,0.18)]">
            <button type="button" onClick={() => setQuantityInput(String(Math.max(product.quantity!.min, quantity - 1)))} disabled={quantity <= product.quantity.min} className="flex h-full w-14 items-center justify-center disabled:opacity-30" aria-label="Zmanjšaj količino"><Minus className="h-4 w-4" /></button>
            <input
              id={`${product.id}-quantity`}
              type="number"
              inputMode="numeric"
              step="1"
              min={product.quantity.min}
              max={product.quantity.max}
              value={quantityInput}
              onChange={(event) => setQuantityInput(event.target.value)}
              onBlur={() => setQuantityInput(String(quantity))}
              className="w-20 bg-transparent text-center text-lg font-medium outline-none"
            />
            <button type="button" onClick={() => setQuantityInput(String(product.quantity!.max ? Math.min(product.quantity!.max, quantity + 1) : quantity + 1))} disabled={product.quantity.max ? quantity >= product.quantity.max : false} className="flex h-full w-14 items-center justify-center disabled:opacity-30" aria-label="Povečaj količino"><Plus className="h-4 w-4" /></button>
          </div>
        </div>
      )}

      {product.selectors?.map((selector, groupIndex) => (
        <div key={selector.label} className="border-t border-[rgba(20,17,15,0.1)] py-6 last:border-b">
          <fieldset>
            <legend className="mb-3 block w-full text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--eventaj-muted)]">{selector.label}</legend>
            <div className="grid grid-cols-2 gap-2">
              {selector.options.map((option, optionIndex) => {
                const active = selections[groupIndex] === optionIndex;
                return <button key={option.label} type="button" onClick={() => select(groupIndex, optionIndex)} aria-pressed={active} className={`flex min-h-12 items-center justify-between border px-3 py-2 text-left text-sm transition-colors ${active ? "border-[var(--eventaj-ink)] bg-[var(--eventaj-ink)] text-[var(--eventaj-paper)]" : "border-[rgba(20,17,15,0.16)] hover:border-[var(--eventaj-ink)]"}`}>{option.label}{active && <Check className="h-4 w-4 shrink-0" />}</button>;
              })}
            </div>
            {selector.note && <p className="mt-3 text-xs leading-relaxed text-[var(--eventaj-muted)]">{selector.note}</p>}
          </fieldset>
        </div>
      ))}

      <div className="flex items-end justify-between py-6">
        <div><div className="text-[11px] uppercase tracking-[0.15em] text-[var(--eventaj-muted)]">{product.calculationLabel}</div><div className="mt-1 text-xs text-[var(--eventaj-muted)]">{product.quantity ? `${quantity} ${product.quantity.unit}${product.quantityTiers ? ` · ${euro.format(unitPrice)}/kos` : ""}` : selectedLabel}</div></div>
        <div className="font-serif-display text-4xl font-[350]">{euro.format(total)}</div>
      </div>

      <div className="mb-6 flex gap-3 border border-[rgba(20,17,15,0.12)] bg-[var(--eventaj-paper-2)] p-4"><Truck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--eventaj-accent)]" /><p className="text-xs leading-relaxed text-[var(--eventaj-muted)]">{product.deliveryText}</p></div>
      <InquiryTrigger defaults={{ type: "Oprema za dogodke", product: product.name, quantity: String(quantity), tableclothColor: selectedLabel, fulfillment: product.fulfillmentMode === "post" ? "Pošiljanje po pošti" : "Prevoz na lokacijo", notes: `${product.name}: ${selectedLabel}`, estimatedPrice: String(total) }} className="w-full rounded-full bg-[var(--eventaj-ink)] px-6 py-4 text-sm font-medium text-[var(--eventaj-paper)] transition-colors hover:bg-[var(--eventaj-accent)]">{product.cta} →</InquiryTrigger>
      <p className="mt-4 text-center text-xs leading-relaxed text-[var(--eventaj-muted)]">{product.finePrint}</p>
    </aside>
  );
}
