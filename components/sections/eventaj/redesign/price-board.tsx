"use client";

import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import {
  albumColorLabels,
  albumSizeLabels,
  getAlbumPriceLabel,
} from "@/content/eventaj/album-pricing";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { usePricingConfigurator } from "../cenik/use-pricing-configurator";

const serviceOptions = [
  { id: "photo", label: "Photo Booth", price: "od 299 €" },
  { id: "360", label: "360° Booth", price: "od 319 €" },
  { id: "custom", label: "Oba", price: "po meri" },
] as const;

function Choice({
  pressed,
  onClick,
  children,
  className,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "border px-4 py-3 text-left transition-colors",
        pressed
          ? "border-[var(--ev-night)] bg-[var(--ev-night)] text-[var(--ev-porcelain)]"
          : "border-[var(--ev-rule)] bg-transparent hover:border-[var(--ev-night)]",
        className,
      )}
    >
      {children}
    </button>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className={cn("grid grid-cols-[1fr_auto] gap-4 border-b border-[var(--ev-rule-dark)] py-3", muted && "text-[var(--ev-mist)]")}>
      <span>{label}</span>
      <span className="ev-tabular">{value}</span>
    </div>
  );
}

export function PriceBoard() {
  const c = usePricingConfigurator();

  const addonRows = [
    {
      id: "qrGallery",
      label: "QR galerija dogodka",
      price: `+${c.addonPrices.qrGallery} € / dogodek`,
      available: true,
      note: "Neomejeno gostov, fotografije, komentarji in live slideshow",
    },
    { id: "woodenSigns", label: "Personalizirane lesene tablice 10 kosov", price: "+40 €", available: true, note: null },
    {
      id: "animations360",
      label: "Personalizirane animacije za 360° Booth",
      price: "+59 €",
      available: c.animations360Available,
      note: "Na voljo samo pri paketu 360° Booth",
    },
  ] as const;

  const serviceLabel = c.type === "photo" ? "Photo Booth" : c.type === "360" ? "360° Booth" : "Photo + 360° Booth";

  return (
    <section id="cenik-po-meri" aria-labelledby="ev-price-title" className="border-t ev-rule bg-[var(--ev-white)] py-24 md:py-36">
      <div className="ev-wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="ev-price-title" className="ev-display ev-h2 lg:col-span-7">
            Sestavi svojo <em>ponudbo</em>
          </h2>
          <p className="ev-lede text-[var(--ev-stone)] lg:col-span-4 lg:col-start-9">
            Sestavi okvirno ponudbo glede na svoje želje. Končno ponudbo pripravimo in potrdimo pred
            rezervacijo. Celoten cenik je na strani{" "}
            <Link href="/cenik" className="text-[var(--ev-night)] underline decoration-1 underline-offset-4">
              cenik
            </Link>
            .
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="grid gap-12 lg:col-span-7">
            <fieldset>
              <legend className="mb-4 text-[12px] uppercase tracking-[0.14em] text-[var(--ev-stone)]">Storitev</legend>
              <div className="grid gap-2 sm:grid-cols-3">
                {serviceOptions.map((item) => (
                  <Choice key={item.id} pressed={c.type === item.id} onClick={() => c.selectType(item.id)}>
                    <span className="ev-display block text-[20px]">{item.label}</span>
                    <span className="mt-0.5 block text-[14px] opacity-75">{item.price}</span>
                  </Choice>
                ))}
              </div>
            </fieldset>

            <div>
              <div className="mb-5 flex items-baseline justify-between">
                <label htmlFor="ev-hours" className="text-[12px] uppercase tracking-[0.14em] text-[var(--ev-stone)]">
                  Trajanje
                </label>
                <span className="ev-display ev-tabular text-[32px] leading-none">
                  {c.hours} <span className="text-[18px]">{c.hours < 5 ? "ure" : "ur"}</span>
                </span>
              </div>
              <input
                id="ev-hours"
                type="range"
                min={c.rangeMin}
                max={8}
                value={c.hours}
                onChange={(event) => c.changeHours(Number(event.target.value))}
                disabled={c.type === "custom"}
                className="ev-range"
                style={{
                  background: `linear-gradient(to right, var(--ev-night) ${c.rangeProgress}%, rgba(28,13,23,0.14) ${c.rangeProgress}%)`,
                }}
              />
              <div className="mt-3 flex justify-between text-[13px] text-[var(--ev-stone)]">
                <span>{c.rangeMin} h</span>
                <span>8 h</span>
              </div>
            </div>

            <fieldset>
              <legend className="mb-4 text-[12px] uppercase tracking-[0.14em] text-[var(--ev-stone)]">Dodatki</legend>
              <div className="border-t ev-rule">
                {c.type === "photo" && (
                  <div className="border-b ev-rule py-5">
                    <p className="text-[15px] font-medium">Spominski album</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                      {[
                        { id: "", label: "Brez albuma", price: "" },
                        { id: "small", label: albumSizeLabels.small, price: getAlbumPriceLabel(c.hours, "small") },
                        { id: "large", label: albumSizeLabels.large, price: getAlbumPriceLabel(c.hours, "large") },
                      ].map((option) => (
                        <Choice
                          key={option.id || "none"}
                          pressed={c.albumSize === option.id}
                          onClick={() => c.selectAlbumSize(option.id as typeof c.albumSize)}
                          className="text-[14px]"
                        >
                          <span className="block font-medium">{option.label}</span>
                          {option.price && <span className="block opacity-75">{option.price}</span>}
                        </Choice>
                      ))}
                    </div>
                    {c.albumSize && (
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="mr-2 text-[14px] text-[var(--ev-stone)]">Barva albuma</span>
                        {(["black", "white"] as const).map((color) => (
                          <Choice
                            key={color}
                            pressed={c.albumColor === color}
                            onClick={() => c.setAlbumColor(color)}
                            className="px-4 py-2 text-[14px]"
                          >
                            {albumColorLabels[color]}
                          </Choice>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {addonRows.map((addon) => {
                  const checked = c.selectedAddons[addon.id] && addon.available;
                  return (
                    <label
                      key={addon.id}
                      className={cn(
                        "flex items-center justify-between gap-4 border-b ev-rule py-4 transition-opacity",
                        addon.available ? "cursor-pointer" : "cursor-not-allowed opacity-50",
                      )}
                    >
                      <span className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={!addon.available}
                          onChange={(event) => c.toggleAddon(addon.id, event.target.checked)}
                          className="peer sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center border peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--ev-champagne)]",
                            checked ? "border-[var(--ev-night)] bg-[var(--ev-night)] text-[var(--ev-porcelain)]" : "border-[var(--ev-stone-2)]",
                          )}
                        >
                          {checked && <Check className="h-3.5 w-3.5" strokeWidth={2} />}
                        </span>
                        <span>
                          <span className="block text-[15px]">{addon.label}</span>
                          {addon.note && <span className="mt-0.5 block text-[13px] text-[var(--ev-stone)]">{addon.note}</span>}
                        </span>
                      </span>
                      <span className="ev-price ev-tabular shrink-0 text-[14px] font-medium">{addon.price}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <div className="ev-dark flex flex-col justify-between p-7 md:p-10 lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            <div>
              <p className="ev-display text-[30px] leading-none">
                Tvoja <em>ponudba</em>
              </p>
              <div className="mt-7 text-[15px]" aria-live="polite">
                <Row label={serviceLabel} value={c.type === "custom" ? "po meri" : `${c.basePrice} €`} />
                {c.type !== "custom" && (
                  <Row label={`Paket ${c.baseHours} ${c.baseHours === 2 ? "uri" : "ure"}`} value="vključeno" muted />
                )}
                {c.extraHours > 0 && (
                  <Row
                    label={`+${c.extraHours} ${c.extraHours === 1 ? "dodatna ura" : "dodatne ure"}`}
                    value={`${c.extraHours * c.hourPrice} €`}
                  />
                )}
                {c.type === "photo" && c.albumSize && (
                  <Row
                    label={`${albumSizeLabels[c.albumSize]}${c.albumColor ? ` · ${albumColorLabels[c.albumColor]}` : ""}`}
                    value={c.albumPrice === 0 ? "vključen" : `+${c.albumPrice} €`}
                  />
                )}
                {Object.entries(c.selectedAddons)
                  .filter(
                    ([key, value]) =>
                      value &&
                      (key !== "animations360" || c.animations360Available) &&
                      c.addonPrices[key as keyof typeof c.addonPrices] > 0,
                  )
                  .map(([key]) => (
                    <Row
                      key={key}
                      label={c.addonLabels[key as keyof typeof c.addonLabels]}
                      value={`+${c.addonPrices[key as keyof typeof c.addonPrices]} €`}
                    />
                  ))}
              </div>
              <div className="mt-10">
                <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--ev-mist)]">Skupaj okvirno</p>
                <p className="ev-display ev-price ev-tabular mt-2 text-[clamp(46px,4.8vw,72px)] leading-none">
                  {c.type === "custom" ? "Po meri" : `${c.total} €`}
                </p>
                <p className="mt-4 text-[14px] text-[var(--ev-mist)]">
                  Končna ponudba vključuje potrjeno lokacijo in posebne zahteve.
                </p>
              </div>
            </div>
            <InquiryTrigger
              defaults={{
                type: c.type === "photo" ? "Photo Booth" : c.type === "360" ? "360° Booth" : "Oba",
                hours: String(c.hours),
                qrGallery: c.selectedAddons.qrGallery,
                albumSize: c.type === "photo" ? c.albumSize : "",
                albumColor: c.type === "photo" ? c.albumColor : "",
              }}
              className="ev-btn ev-btn-primary mt-10 w-full"
            >
              Pridobi ponudbo
              <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
            </InquiryTrigger>
          </div>
        </div>
      </div>
    </section>
  );
}
