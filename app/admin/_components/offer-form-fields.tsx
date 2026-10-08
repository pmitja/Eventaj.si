"use client";

import type { ReactNode } from "react";
import { services } from "@/lib/offers/services";
import type { OfferOptions } from "@/lib/offers/schema";

type Props = {
  options: OfferOptions;
  update: <K extends keyof OfferOptions>(key: K, value: OfferOptions[K]) => void;
};

const inputClass =
  "w-full rounded-lg border border-adm-ink/20 bg-adm-card px-3 py-2 text-sm outline-none focus:border-adm-accent disabled:opacity-50";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-adm-muted">{label}</span>
      {children}
    </label>
  );
}

function Segmented<T extends string>({ value, options, onChange }: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-full border px-3 py-1.5 text-sm ${
            value === option.value
              ? "border-adm-ink bg-adm-ink text-adm-bg"
              : "border-adm-ink/20 bg-adm-card"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function Check({ checked, onChange, children }: { checked: boolean; onChange: (value: boolean) => void; children: ReactNode }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 shrink-0" style={{ appearance: "auto", colorScheme: "light", accentColor: "var(--eventaj-accent)" }} />
      {children}
    </label>
  );
}

export function OfferFormFields({ options, update }: Props) {
  const service = services[options.service];
  return (
    <>
      <div className="rounded-xl border border-adm-accent/40 bg-adm-card p-4">
        <p className="text-sm font-medium">Koliko km je do kraja dogodka (v eno smer, iz Lenarta)?</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field label="Razdalja (km)">
            <input
              type="number"
              min={0}
              step={1}
              inputMode="numeric"
              disabled={options.locationUnknown}
              value={options.distanceKm ?? ""}
              onChange={(event) => update("distanceKm", event.target.value === "" ? null : Number(event.target.value))}
              className={inputClass}
              autoFocus
            />
          </Field>
          <Field label="Cena na km (€)">
            <input
              type="number"
              min={0}
              step={0.01}
              disabled={options.locationUnknown}
              value={options.pricePerKm}
              onChange={(event) => update("pricePerKm", Number(event.target.value))}
              className={inputClass}
            />
          </Field>
        </div>
        <div className="mt-3">
          <Check checked={options.locationUnknown} onChange={(value) => update("locationUnknown", value)}>
            Ne vemo lokacije (prevoz ne bo zaračunan)
          </Check>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Paket">
          <Segmented
            value={options.hours}
            onChange={(value) => update("hours", value)}
            options={(["2", "3", "4"] as const).map((hours) => ({
              value: hours,
              label: `${service.packages[hours].shortName} ${hours} h`,
            }))}
          />
        </Field>
        <Field label={`Dodatne ure (${service.extraHourPrice} €/h)`}>
          <input
            type="number"
            min={0}
            max={12}
            value={options.extraHours}
            onChange={(event) => update("extraHours", Math.max(0, Number(event.target.value) || 0))}
            className={inputClass}
          />
        </Field>
        {service.hasAlbum && (
          <>
            <Field label="Album">
              <Segmented
                value={options.albumSize}
                onChange={(value) => update("albumSize", value)}
                options={[
                  { value: "", label: "Brez" },
                  { value: "small", label: "Mali" },
                  { value: "large", label: "Veliki" },
                ]}
              />
            </Field>
            <Field label="Barva albuma">
              <Segmented
                value={options.albumColor}
                onChange={(value) => update("albumColor", value)}
                options={[
                  { value: "", label: "Ni izbrana" },
                  { value: "black", label: "Črn" },
                  { value: "white", label: "Bel" },
                ]}
              />
            </Field>
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <Check checked={options.qrGallery} onChange={(value) => update("qrGallery", value)}>
          QR galerija (+{service.qrGalleryPrice} €)
        </Check>
      </div>

      <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
        <Field label="Veljavnost (dni)">
          <input
            type="number"
            min={1}
            max={90}
            value={options.validityDays}
            onChange={(event) => update("validityDays", Math.max(1, Number(event.target.value) || 1))}
            className={inputClass}
          />
        </Field>
        <Field label="Dodatna navodila za Claude">
          <textarea
            rows={3}
            value={options.instructions}
            onChange={(event) => update("instructions", event.target.value)}
            placeholder="npr. naročnik je OŠ Lenart, dogodek 17.00–21.00, tema noč čarovnic"
            className={inputClass}
          />
        </Field>
      </div>
    </>
  );
}
