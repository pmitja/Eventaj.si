"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormEvent, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { InquiryWithOffers } from "@/lib/db/inquiries";
import { buildOfferVariants, defaultPricePerKm, formatEur, type PackageHours } from "@/lib/offers/pricing";
import type { OfferOptions } from "@/lib/offers/schema";
import {
  isBoothService,
  serviceForInquiry,
  services,
  tableRental,
  tableSelectionFromInquiry,
  type BoothService,
  type OfferService,
} from "@/lib/offers/services";
import { CustomItemsEditor } from "./custom-items-editor";
import { OfferFormFields } from "./offer-form-fields";
import { OfferItemsEditor } from "./offer-items-editor";
import { OfferResult, type GeneratedOffer } from "./offer-result";

const boothChoices: { value: BoothService; label: string }[] = [
  { value: "photo", label: services.photo.label },
  { value: "360", label: services["360"].label },
  { value: "combo", label: "Photo + 360° (combo)" },
];

/** The album the inquiry asked for, or none when the service has no album. */
function albumFor(inquiry: InquiryWithOffers, service: OfferService): Pick<OfferOptions, "albumSize" | "albumColor"> {
  const data = inquiry.formData;
  if (!isBoothService(service) || !services[service].hasAlbum) return { albumSize: "", albumColor: "" };
  const hours = Number(data.hours) || 2;
  return { albumSize: data.albumSize ?? (hours >= 3 ? "small" : ""), albumColor: data.albumColor ?? "" };
}

function initialOptions(inquiry: InquiryWithOffers): OfferOptions {
  const data = inquiry.formData;
  const hours = Number(data.hours) || 2;
  const packageHours = String(Math.min(Math.max(hours, 2), 4)) as PackageHours;
  const service = serviceForInquiry(data) ?? "photo";
  const tables = tableSelectionFromInquiry(data.equipmentSummary);
  return {
    service,
    hours: packageHours,
    eventDate: data.date ?? "",
    extraHours: Math.max(hours - 4, 0),
    days: 1,
    compareHours: "",
    discountPercent: 0,
    ...albumFor(inquiry, service),
    qrGallery: Boolean(data.qrGallery),
    qrGalleryPromo: false,
    tableCount: Math.min(tables.count, tableRental.maxTables),
    tableclothColor: tables.color,
    pickup: service === "tables" && (tables.count < tableRental.pickupBelow || data.fulfillment === "Osebni prevzem"),
    customItems: [],
    itemOverrides: {},
    locationUnknown: !data.location?.trim(),
    distanceKm: null,
    pricePerKm: defaultPricePerKm,
    validityDays: 8,
    instructions: "",
  };
}

type Props = { inquiry: InquiryWithOffers; onClose: () => void };

export function OfferDialog({ inquiry, onClose }: Props) {
  const router = useRouter();
  const [options, setOptions] = useState(() => initialOptions(inquiry));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<GeneratedOffer | null>(null);
  const [prefillLoading, setPrefillLoading] = useState(false);
  const [prefillNotes, setPrefillNotes] = useState<string[]>([]);

  const variants = useMemo(() => buildOfferVariants(options), [options]);
  const baseVariants = useMemo(() => buildOfferVariants({ ...options, itemOverrides: {} }), [options]);
  const needsDistance = !options.pickup && !options.locationUnknown && options.distanceKm === null;

  const update = <K extends keyof OfferOptions>(key: K, value: OfferOptions[K]) =>
    setOptions((current) => ({ ...current, [key]: value }));

  // A booth inquiry can be offered another booth, e.g. when the client asks for the 360° Booth after a Photo Booth offer.
  const inquiryService = serviceForInquiry(inquiry.formData);
  const boothInquiry = inquiryService !== null && isBoothService(inquiryService) ? inquiryService : null;
  const changeService = (service: BoothService) => {
    if (service === options.service) return;
    setPrefillNotes([]);
    setOptions((current) => ({
      ...current,
      service,
      ...albumFor(inquiry, service),
      // Edited lines belong to the old service's items.
      itemOverrides: {},
      // Drop presets that only fit the other booth; keep the admin's own lines.
      customItems: current.customItems.filter((item) => {
        const isPreset = boothChoices.some((choice) => services[choice.value].presets.some((p) => p.description === item.description));
        return !isPreset || services[service].presets.some((p) => p.description === item.description);
      }),
    }));
  };

  const runPrefill = async () => {
    setPrefillLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/inquiries/${inquiry.id}/offers/prefill`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(options),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Izpolnjevanje ni uspelo");
      setOptions((current) => ({ ...current, ...body.prefill }));
      setPrefillNotes(body.notes);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Izpolnjevanje ni uspelo");
    } finally {
      setPrefillLoading(false);
    }
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (needsDistance) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/inquiries/${inquiry.id}/offers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...options,
          customItems: options.customItems.filter((item) => item.description.trim()),
        }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Generiranje ni uspelo");
      setResult(body.offer);
      toast.success(`Ponudba ${body.offer.number} je ustvarjena`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generiranje ni uspelo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && !loading && onClose()}>
      <DialogContent
        onInteractOutside={(event) => loading && event.preventDefault()}
        className="admin-root block max-h-[92dvh] w-[calc(100vw-24px)] max-w-2xl overflow-y-auto overscroll-contain rounded-[20px] border border-adm-ink bg-adm-bg p-5 shadow-[0_24px_60px_rgba(28,24,20,.25)] sm:rounded-[20px] sm:p-7 [&>button:last-child]:hidden"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <DialogDescription className="text-xs uppercase tracking-[.08em] text-adm-muted">Povpraševanje #{inquiry.id}</DialogDescription>
            <DialogTitle className="mt-1.5 font-display text-[30px] font-normal leading-[1.05] tracking-normal">
              Ponudba za {inquiry.formData.name}
            </DialogTitle>
            <p className="text-sm text-adm-muted">Lokacija: {inquiry.formData.location || "ni navedena"}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-adm-soft transition-[border-color,transform] hover:rotate-90 hover:border-adm-ink disabled:opacity-50"
            aria-label="Zapri"
          >
            <X className="size-4" />
          </button>
        </div>

        {result ? (
          <OfferResult offer={result} onAnother={() => setResult(null)} />
        ) : (
          <form onSubmit={submit} className="mt-5 space-y-5">
            {boothInquiry && (
              <div>
                <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-adm-muted">Storitev ponudbe</span>
                <div className="flex flex-wrap gap-1.5">
                  {boothChoices.map((choice) => (
                    <button
                      key={choice.value}
                      type="button"
                      onClick={() => changeService(choice.value)}
                      className={`rounded-full border px-3 py-1.5 text-sm ${
                        options.service === choice.value ? "border-adm-ink bg-adm-ink text-adm-bg" : "border-adm-ink/20 bg-adm-card"
                      }`}
                    >
                      {choice.label}
                      {choice.value === boothInquiry && <span className="opacity-60"> · izbrala stranka</span>}
                    </button>
                  ))}
                </div>
                {options.service !== boothInquiry && isBoothService(options.service) && (
                  <p className="mt-1.5 text-xs text-adm-muted">
                    Stranka je v obrazcu izbrala {services[boothInquiry].label}, ponudba bo za {services[options.service].label}.
                  </p>
                )}
              </div>
            )}

            <OfferFormFields
              options={options}
              update={update}
              prefill={{ run: runPrefill, loading: prefillLoading, notes: prefillNotes }}
            />

            {variants.map((variant, variantIndex) => (
              <div key={variantIndex} className="rounded-[14px] border border-adm-line bg-adm-card p-4 text-sm">
                {variant.label && (
                  <p className="pb-1 text-xs font-medium uppercase tracking-wider text-adm-muted">{variant.label}</p>
                )}
                <OfferItemsEditor
                  variantIndex={variantIndex}
                  // Custom items are edited below the first variant and shown as is in the second.
                  items={variant.items.filter((item) => !item.key?.startsWith("custom:") || variantIndex > 0)
                    .map((item) => (item.key?.startsWith("custom:") ? { ...item, key: undefined } : item))}
                  baseItems={baseVariants[variantIndex]?.items ?? []}
                  overrides={options.itemOverrides}
                  onChange={(value) => update("itemOverrides", value)}
                />
                {variantIndex === 0 && (
                  <CustomItemsEditor
                    items={options.customItems}
                    presets={isBoothService(options.service) ? services[options.service].presets : []}
                    onChange={(value) => update("customItems", value)}
                  />
                )}
                <div className="mt-3 flex justify-between border-t border-adm-ink pt-2 font-semibold">
                  <span>Skupaj</span>
                  <span className="tabular-nums">{formatEur(variant.total)}</span>
                </div>
              </div>
            ))}

            {error && <p className="text-sm text-adm-accent">{error}</p>}

            <button
              type="submit"
              disabled={loading || prefillLoading || needsDistance}
              className="w-full rounded-full bg-adm-ink px-5 py-3 text-sm font-medium text-adm-bg disabled:opacity-50"
            >
              {loading
                ? "Claude pripravlja ponudbo … (lahko traja do minute)"
                : needsDistance
                  ? "Vnesi razdaljo ali označi, da lokacija ni znana"
                  : "Zgeneriraj ponudbo (PDF)"}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
