"use client";

import { motion } from "framer-motion";
import { Check, FileText, Send, Sparkles, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { markOfferSent, removeInquiry } from "../(app)/actions";
import { albumColorLabels, albumSizeLabels } from "@/content/eventaj/album-pricing";
import type { InquiryWithOffers, OfferSummary } from "@/lib/db/inquiries";
import { formatEur } from "@/lib/offers/pricing";
import { formatSlovenianDate } from "@/lib/slovenian-date";
import { StaggerItem } from "./motion";

const typeLabels: Record<string, string> = {
  basic: "Photo Booth",
  "360": "360° Booth",
  both: "Photo Booth + 360° Booth",
  equipment: "Oprema za dogodke",
};

const receivedParts = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "Europe/Ljubljana",
});

// Built from numeric parts so server (Node ICU) and browser render identical text.
function formatReceived(iso: string) {
  const parts = Object.fromEntries(receivedParts.formatToParts(new Date(iso)).map(({ type, value }) => [type, value]));
  return `${parts.day}. ${parts.month}. ${parts.year}, ${parts.hour}.${parts.minute}`;
}

function OfferRow({ offer }: { offer: OfferSummary }) {
  const [pending, startTransition] = useTransition();

  function toggleSent() {
    const sent = !offer.sentAt;
    if (!sent && !window.confirm(`Odstranim oznako »poslano« pri ponudbi ${offer.number}?`)) return;
    startTransition(async () => {
      const result = await markOfferSent(offer.id, sent);
      if (!result.ok) toast.error(result.error);
      else toast.success(sent ? `Ponudba ${offer.number} je označena kot poslana` : `Oznaka »poslano« je odstranjena`);
    });
  }

  return (
    <li className="flex flex-wrap items-center gap-2.5">
      <a
        href={`/api/admin/offers/${offer.id}/pdf`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1.5 rounded-full border border-adm-ink px-3 py-1 tabular transition-colors hover:bg-adm-ink hover:!text-adm-bg"
      >
        <FileText className="size-3.5" />
        {offer.number} · {formatEur(offer.total)}
      </a>
      {offer.sentAt ? (
        <button
          type="button"
          onClick={toggleSent}
          disabled={pending}
          title="Klikni za odstranitev oznake"
          className="flex items-center gap-1.5 rounded-full bg-adm-side px-3 py-1 tabular text-adm-ink transition-opacity hover:opacity-70 disabled:opacity-50"
        >
          <Check className="size-3.5 text-adm-accent" />
          Poslano {formatReceived(offer.sentAt)}
        </button>
      ) : (
        <button
          type="button"
          onClick={toggleSent}
          disabled={pending}
          className="flex items-center gap-1.5 rounded-full border border-dashed border-adm-soft px-3 py-1 text-adm-muted transition-colors hover:border-adm-ink hover:text-adm-ink disabled:opacity-50"
        >
          <Send className="size-3.5" />
          Označi kot poslano
        </button>
      )}
    </li>
  );
}

type Props = { inquiry: InquiryWithOffers; onGenerate: () => void };

export function InquiryCard({ inquiry, onGenerate }: Props) {
  const data = inquiry.formData;
  const [deleting, startDelete] = useTransition();

  function handleDelete() {
    const offers = inquiry.offers.length;
    const warning = offers ? ` Izbrisane bodo tudi ponudbe (${offers}).` : "";
    if (!window.confirm(`Izbrišem povpraševanje #${inquiry.id} (${data.name})?${warning}`)) return;
    startDelete(async () => {
      const result = await removeInquiry(inquiry.id);
      if (!result.ok) toast.error(result.error);
      else toast.success(`Povpraševanje #${inquiry.id} je izbrisano`);
    });
  }

  const album = data.albumSize ? `${albumSizeLabels[data.albumSize]}${data.albumColor ? `, ${albumColorLabels[data.albumColor]}` : ""}` : null;
  const details = [
    ["Datum dogodka", formatSlovenianDate(data.date)],
    ["Lokacija", data.location || "—"],
    ["Trajanje", data.type === "equipment" ? data.hours : `${data.hours} h`],
    ["Vrsta dogodka", data.eventType],
    ["Album", album],
    ["QR galerija", data.qrGallery ? "da" : null],
    ["Oprema", data.equipmentSummary],
  ].filter(([, value]) => Boolean(value));

  return (
    <StaggerItem
      layout
      whileHover={{ y: -3, boxShadow: "0 14px 34px rgba(28,24,20,.10)" }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className="flex flex-col gap-[18px] rounded-2xl border border-adm-ink bg-adm-card px-5 py-6 sm:px-[26px]"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1.5">
          <span className="text-xs uppercase tracking-[.06em] text-adm-muted">
            #{inquiry.id} · {formatReceived(inquiry.createdAt)} · {typeLabels[data.type] ?? data.type}
          </span>
          <span className="text-xl font-semibold">{data.name}</span>
          <span className="text-sm text-adm-muted">
            <a href={`mailto:${data.email}`} className="transition-colors hover:!text-adm-accent">
              {data.email}
            </a>{" "}
            ·{" "}
            <a href={`tel:${data.phone}`} className="transition-colors hover:!text-adm-accent">
              {data.phone}
            </a>
          </span>
        </div>
        <div className="flex items-center gap-2">
          {(data.type === "basic" || data.type === "360") && (
            <motion.button
              type="button"
              onClick={onGenerate}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="group flex items-center gap-2 rounded-full bg-adm-ink px-[18px] py-[11px] text-sm text-adm-bg transition-colors hover:bg-adm-accent"
            >
              <Sparkles className="size-4 transition-transform duration-300 group-hover:rotate-12" />
              Zgeneriraj ponudbo
            </motion.button>
          )}
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            aria-label="Izbriši povpraševanje"
            title="Izbriši povpraševanje"
            className="flex size-[42px] items-center justify-center rounded-full border border-adm-ink text-adm-muted transition-colors hover:border-red-700 hover:bg-red-700 hover:text-white disabled:opacity-50"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>

      <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-8 gap-y-2.5 text-sm">
        {details.map(([label, value]) => (
          <div key={label} className="flex gap-2">
            <dt className="shrink-0 text-adm-muted">{label}:</dt>
            <dd className="m-0 whitespace-pre-line">{value}</dd>
          </div>
        ))}
        {inquiry.totalPrice ? (
          <div className="flex gap-2">
            <dt className="shrink-0 text-adm-muted">Okvirna cena:</dt>
            <dd className="m-0 font-semibold tabular">{formatEur(inquiry.totalPrice)}</dd>
          </div>
        ) : null}
      </dl>

      {data.message && <p className="m-0 whitespace-pre-line rounded-xl bg-adm-side px-4 py-3.5 text-sm leading-relaxed [text-wrap:pretty]">{data.message}</p>}

      {inquiry.offers.length > 0 && (
        <div className="flex flex-wrap items-start gap-2.5 border-t border-adm-ink pt-3.5 text-sm">
          <span className="py-1 text-adm-muted">Ponudbe:</span>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {inquiry.offers.map((offer) => (
              <OfferRow key={offer.id} offer={offer} />
            ))}
          </ul>
        </div>
      )}
    </StaggerItem>
  );
}
