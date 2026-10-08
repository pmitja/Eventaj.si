"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormEvent, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { InquiryWithOffers } from "@/lib/db/inquiries";
import { buildOfferItems, defaultPricePerKm, formatEur, sumItems, type PackageHours } from "@/lib/offers/pricing";
import type { OfferOptions } from "@/lib/offers/schema";
import { serviceForInquiryType, services } from "@/lib/offers/services";
import { CustomItemsEditor } from "./custom-items-editor";
import { OfferFormFields } from "./offer-form-fields";
import { OfferResult, type GeneratedOffer } from "./offer-result";

function initialOptions(inquiry: InquiryWithOffers): OfferOptions {
  const data = inquiry.formData;
  const hours = Number(data.hours) || 2;
  const packageHours = String(Math.min(Math.max(hours, 2), 4)) as PackageHours;
  const service = serviceForInquiryType(data.type) ?? "photo";
  const hasAlbum = services[service].hasAlbum;
  return {
    service,
    hours: packageHours,
    extraHours: Math.max(hours - 4, 0),
    albumSize: hasAlbum ? data.albumSize ?? (hours >= 3 ? "small" : "") : "",
    albumColor: hasAlbum ? data.albumColor ?? "" : "",
    qrGallery: Boolean(data.qrGallery),
    customItems: [],
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

  const fixedItems = useMemo(() => buildOfferItems({ ...options, customItems: [] }), [options]);
  const total = useMemo(() => sumItems(buildOfferItems(options)), [options]);
  const needsDistance = !options.locationUnknown && options.distanceKm === null;

  const update = <K extends keyof OfferOptions>(key: K, value: OfferOptions[K]) =>
    setOptions((current) => ({ ...current, [key]: value }));

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
            <OfferFormFields options={options} update={update} />

            <div className="rounded-[14px] border border-adm-line bg-adm-card p-4 text-sm">
              {fixedItems.map((item, index) => (
                <div key={index} className="flex justify-between gap-4 py-1">
                  <span>{item.description}</span>
                  <span className="shrink-0 tabular-nums">{item.amount === null ? item.note : formatEur(item.amount)}</span>
                </div>
              ))}
              <CustomItemsEditor
                items={options.customItems}
                presets={services[options.service].presets}
                onChange={(value) => update("customItems", value)}
              />
              <div className="mt-3 flex justify-between border-t border-adm-ink pt-2 font-semibold">
                <span>Skupaj</span>
                <span className="tabular-nums">{formatEur(total)}</span>
              </div>
            </div>

            {error && <p className="text-sm text-adm-accent">{error}</p>}

            <button
              type="submit"
              disabled={loading || needsDistance}
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
