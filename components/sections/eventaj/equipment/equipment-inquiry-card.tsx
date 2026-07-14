"use client";

import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { standingTable } from "@/content/eventaj/equipment";
import { Check, Minus, Plus, Truck } from "lucide-react";
import { useState } from "react";

export function EquipmentInquiryCard() {
  const [quantity, setQuantity] = useState(1);
  const [clothColor, setClothColor] = useState<(typeof standingTable.clothColors)[number]>("Bel prt");
  const total = quantity * standingTable.price;

  return (
    <aside className="border border-[rgba(20,17,15,0.14)] bg-[rgba(251,248,242,0.96)] p-6 shadow-[0_28px_70px_-45px_rgba(20,17,15,0.45)] md:p-8 lg:sticky lg:top-28">
      <div className="flex items-start justify-between gap-5 border-b border-[rgba(20,17,15,0.1)] pb-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--eventaj-muted)]">Cena najema</div>
          <div className="mt-2 font-serif-display text-5xl font-[350] leading-none">10 €</div>
          <div className="mt-2 text-sm text-[var(--eventaj-muted)]">na mizo za 1 dan</div>
        </div>
        <span className="rounded-full bg-[#E8B584]/25 px-3 py-2 text-xs font-medium">Na voljo 15</span>
      </div>

      <div className="py-6">
        <div className="mb-3 flex items-center justify-between">
          <label htmlFor="table-quantity" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--eventaj-muted)]">Količina</label>
          <span className="text-xs text-[var(--eventaj-muted)]">1–15 miz</span>
        </div>
        <div className="flex h-14 items-center justify-between border border-[rgba(20,17,15,0.18)]">
          <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} disabled={quantity === 1} className="flex h-full w-14 items-center justify-center disabled:cursor-not-allowed disabled:opacity-30" aria-label="Zmanjšaj količino">
            <Minus className="h-4 w-4" aria-hidden="true" />
          </button>
          <input id="table-quantity" type="number" min={1} max={standingTable.available} value={quantity} onChange={(event) => setQuantity(Math.min(standingTable.available, Math.max(1, Number(event.target.value) || 1)))} className="w-16 bg-transparent text-center text-lg font-medium outline-none" aria-label="Število miz" />
          <button type="button" onClick={() => setQuantity((value) => Math.min(standingTable.available, value + 1))} disabled={quantity === standingTable.available} className="flex h-full w-14 items-center justify-center disabled:cursor-not-allowed disabled:opacity-30" aria-label="Povečaj količino">
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <fieldset className="border-y border-[rgba(20,17,15,0.1)] py-6">
        <legend className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--eventaj-muted)]">Barva prta</legend>
        <div className="grid grid-cols-2 gap-2">
          {standingTable.clothColors.map((color) => {
            const active = color === clothColor;
            return (
              <button key={color} type="button" onClick={() => setClothColor(color)} aria-pressed={active} className={`flex min-h-12 items-center justify-between border px-4 text-sm transition-colors ${active ? "border-[var(--eventaj-ink)] bg-[var(--eventaj-ink)] text-[var(--eventaj-paper)]" : "border-[rgba(20,17,15,0.16)] hover:border-[var(--eventaj-ink)]"}`}>
                {color}
                {active && <Check className="h-4 w-4" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-[var(--eventaj-muted)]">Želiš kombinacijo? Razmerje belih in črnih prtov zapiši v opombe.</p>
      </fieldset>

      <div className="flex items-end justify-between py-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.15em] text-[var(--eventaj-muted)]">Informativno</div>
          <div className="mt-1 text-xs text-[var(--eventaj-muted)]">{quantity} {quantity === 1 ? "miza" : quantity === 2 ? "mizi" : "miz"} × 10 €</div>
        </div>
        <div className="font-serif-display text-4xl font-[350]">{total} €</div>
      </div>

      <div className="mb-6 flex gap-3 border border-[rgba(20,17,15,0.12)] bg-[var(--eventaj-paper-2)] p-4">
        <Truck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--eventaj-accent)]" strokeWidth={1.5} aria-hidden="true" />
        <p className="text-xs leading-relaxed text-[var(--eventaj-muted)]">
          Dostava je možna do {standingTable.delivery.maxDistanceKm} km in se obračuna {standingTable.delivery.priceLabel}.
        </p>
      </div>

      <InquiryTrigger defaults={{ type: "Oprema za dogodke", product: standingTable.name, quantity: String(quantity), tableclothColor: clothColor }} className="w-full rounded-full bg-[var(--eventaj-ink)] px-6 py-4 text-sm font-medium text-[var(--eventaj-paper)] transition-colors hover:bg-[var(--eventaj-accent)]">
        Preveri razpoložljivost →
      </InquiryTrigger>
      <p className="mt-4 text-center text-xs leading-relaxed text-[var(--eventaj-muted)]">Brez obveznosti. Termin in logistiko potrdimo v ponudbi.</p>
    </aside>
  );
}
