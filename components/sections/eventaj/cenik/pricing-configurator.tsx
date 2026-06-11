"use client";

import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { cn } from "@/lib/utils";
import { ConfiguratorBlock, PriceRow } from "./configurator-parts";
import { usePricingConfigurator } from "./use-pricing-configurator";

const serviceOptions = [
  { id: "photo", label: "Photo Booth", price: "od 279 €" },
  { id: "360", label: "360° Booth", price: "od 299 €" },
  { id: "custom", label: "Oba", price: "po meri" },
] as const;

export function PricingConfigurator({ compact = false }: { compact?: boolean }) {
  const {
    hours,
    type,
    selectedAddons,
    baseHours,
    basePrice,
    hourPrice,
    extraHours,
    albumAvailable,
    animations360Available,
    rangeMin,
    rangeProgress,
    addonPrices,
    addonLabels,
    total,
    selectType,
    changeHours,
    toggleAddon,
  } = usePricingConfigurator();

  const addonRows = [
    {
      id: "album",
      label: "Album",
      price: "+20 €",
      available: albumAvailable,
      note: "Na voljo pri 2-urnem paketu Photo Booth",
    },
    {
      id: "woodenSigns",
      label: "Personalizirane lesene tablice 10 kosov",
      price: "+40 €",
      available: true,
      note: null,
    },
    {
      id: "animations360",
      label: "Personalizirane animacije za 360° Booth",
      price: "+59 €",
      available: animations360Available,
      note: "Na voljo samo pri paketu 360° Booth",
    },
  ];

  return (
    <section
      id="cenik-po-meri"
      className={cn(
        "bg-[var(--eventaj-paper-2)] px-5 py-24 md:px-10 md:py-32",
        compact && "py-20 md:py-24",
      )}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 text-center">
          <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
            Cenik
          </div>
          <h2 className="font-serif-display text-[clamp(40px,5.5vw,76px)] font-[350] leading-none text-balance">
            Sestavi svojo{" "}
            <em className="font-serif-italic italic text-[var(--eventaj-accent)]">
              ponudbo
            </em>
            .
          </h2>
          <p className="mx-auto mt-5 max-w-[540px] text-[17px] text-[var(--eventaj-ink-2)]">
            Sestavi okvirno ponudbo glede na svoje želje. Končno ponudbo
            pripravimo in potrdimo pred rezervacijo.
          </p>
        </div>
        <div className="grid border border-[rgba(20,17,15,0.1)] bg-[var(--eventaj-paper)] lg:grid-cols-[1.2fr_1fr]">
          <div className="p-6 md:p-12">
            <ConfiguratorBlock label="01 — Izberi storitev">
              <div className="grid gap-2 md:grid-cols-3">
                {serviceOptions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectType(item.id)}
                    className={cn(
                      "border p-4 text-left transition-colors",
                      type === item.id
                        ? "border-[var(--eventaj-ink)] bg-[var(--eventaj-ink)] text-[var(--eventaj-paper)]"
                        : "border-[rgba(20,17,15,0.15)]",
                    )}
                  >
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="mt-1 font-serif-italic text-[11px] italic opacity-70">
                      {item.price}
                    </div>
                  </button>
                ))}
              </div>
            </ConfiguratorBlock>
            <ConfiguratorBlock label="02 — Trajanje">
              <div className="mb-4 flex items-baseline justify-between">
                <div />
                <div className="font-serif-display text-2xl">
                  {hours}{" "}
                  <span className="text-sm text-[var(--eventaj-muted)]">
                    {hours < 5 ? "ure" : "ur"}
                  </span>
                </div>
              </div>
              <input
                type="range"
                min={rangeMin}
                max={8}
                value={hours}
                onChange={(event) => changeHours(Number(event.target.value))}
                className="eventaj-range w-full"
                style={{
                  background: `linear-gradient(to right, var(--eventaj-accent) 0%, var(--eventaj-accent) ${rangeProgress}%, rgba(20,17,15,0.18) ${rangeProgress}%, rgba(20,17,15,0.18) 100%)`,
                }}
                disabled={type === "custom"}
              />
              <div className="mt-1.5 flex justify-between text-[11px] text-[var(--eventaj-muted)]">
                <span>{rangeMin} h</span>
                <span>8 h</span>
              </div>
            </ConfiguratorBlock>
            <ConfiguratorBlock label="03 — Dodatki" last>
              <div className="grid gap-2.5">
                {addonRows.map((addon) => (
                  <label
                    key={addon.id}
                    className={cn(
                      "flex items-center justify-between border px-4 py-3.5 transition-colors",
                      addon.available
                        ? "cursor-pointer"
                        : "cursor-not-allowed opacity-45",
                      selectedAddons[addon.id as keyof typeof selectedAddons] &&
                        addon.available
                        ? "border-[var(--eventaj-ink)] bg-[var(--eventaj-paper-2)]"
                        : "border-[rgba(20,17,15,0.12)]",
                    )}
                  >
                    <span className="flex items-center gap-3.5">
                      <input
                        type="checkbox"
                        checked={
                          selectedAddons[
                            addon.id as keyof typeof selectedAddons
                          ] && addon.available
                        }
                        disabled={!addon.available}
                        onChange={(event) =>
                          toggleAddon(addon.id, event.target.checked)
                        }
                        className="h-4 w-4 accent-[var(--eventaj-ink)]"
                      />
                      <span>
                        <span className="block text-sm">{addon.label}</span>
                        {addon.note && (
                          <span className="mt-0.5 block text-[10px] text-[var(--eventaj-muted)]">
                            {addon.note}
                          </span>
                        )}
                      </span>
                    </span>
                    <span className="font-serif-italic text-[13px] italic text-[var(--eventaj-muted)]">
                      {addon.price}
                    </span>
                  </label>
                ))}
              </div>
            </ConfiguratorBlock>
          </div>
          <div className="flex flex-col justify-between bg-[var(--eventaj-ink)] p-6 text-[var(--eventaj-paper)] md:p-12">
            <div>
              <div className="mb-7 text-[11px] uppercase tracking-[0.2em] opacity-60">
                Tvoja ponudba
              </div>
              <div className="grid gap-3.5 text-sm">
                <PriceRow
                  label={
                    type === "photo"
                      ? "Photo Booth"
                      : type === "360"
                        ? "360° Booth"
                        : "Photo + 360° Booth"
                  }
                  value={type === "custom" ? "po meri" : `${basePrice} €`}
                />
                {type !== "custom" && (
                  <PriceRow
                    label={`${baseHours} uri (izhodiščno)`}
                    value="—"
                    muted
                  />
                )}
                {extraHours > 0 && (
                  <PriceRow
                    label={`+${extraHours} ${extraHours === 1 ? "dodatna ura" : "dodatne ure"}`}
                    value={`${extraHours * hourPrice} €`}
                  />
                )}
                {Object.entries(selectedAddons)
                  .filter(
                    ([key, value]) =>
                      value &&
                      (key !== "album" || albumAvailable) &&
                      (key !== "animations360" || animations360Available) &&
                      addonPrices[key as keyof typeof addonPrices] > 0,
                  )
                  .map(([key]) => (
                    <PriceRow
                      key={key}
                      label={addonLabels[key as keyof typeof addonLabels]}
                      value={`+${addonPrices[key as keyof typeof addonPrices]} €`}
                    />
                  ))}
              </div>
              <div className="mt-8 border-t border-[rgba(244,239,230,0.2)] pt-8">
                <div className="mb-2 text-[11px] uppercase tracking-[0.18em] opacity-60">
                  Skupaj okvirno
                </div>
                <div className="font-serif-display text-[clamp(54px,7vw,72px)] leading-none">
                  {type === "custom" ? "Po meri" : `${total} €`}
                </div>
                <div className="mt-2.5 font-serif-italic text-xs italic opacity-60">
                  Končna ponudba vključuje potrjeno lokacijo in posebne zahteve.
                </div>
              </div>
            </div>
            <InquiryTrigger className="mt-8 rounded-full bg-[var(--eventaj-paper)] px-7 py-5 text-[15px] font-medium text-[var(--eventaj-ink)] transition-colors hover:bg-[var(--eventaj-accent)] hover:text-[var(--eventaj-paper)]">
              Pridobi ponudbo →
            </InquiryTrigger>
          </div>
        </div>
      </div>
    </section>
  );
}
