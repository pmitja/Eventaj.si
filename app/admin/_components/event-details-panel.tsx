"use client";

import { Check, Clock, ExternalLink, Link2, Mail } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { createEventDetailsLink, sendEventDetailsForm } from "../(app)/actions";
import type { EventDetailsRequest } from "@/lib/db/event-details";
import { albumText, eventTypeText } from "@/lib/event-details/schema";
import { BackgroundReady } from "./background-ready";
import { formatReceived } from "./format-received";

type Props = { inquiryId: number; request: EventDetailsRequest | null; backgroundReadyAt: string | null };

const formUrl = (token: string) => `${window.location.origin}/podatki/${token}`;

const primaryButton =
  "flex items-center gap-1.5 rounded-full bg-adm-ink px-4 py-2 text-adm-bg transition-colors hover:bg-adm-accent disabled:opacity-50";
const outlineButton =
  "flex items-center gap-1.5 rounded-full border border-adm-ink px-3 py-1 transition-colors hover:bg-adm-ink hover:!text-adm-bg disabled:opacity-50";
const quietButton =
  "flex items-center gap-1.5 rounded-full border border-dashed border-adm-soft px-3 py-1 text-adm-muted transition-colors hover:border-adm-ink hover:text-adm-ink disabled:opacity-50";

export function EventDetailsPanel({ inquiryId, request, backgroundReadyAt }: Props) {
  const [sending, startSend] = useTransition();
  const [linking, startLink] = useTransition();
  const data = request?.data;

  function send() {
    const again = Boolean(request?.emailedAt);
    if (again && !window.confirm("Stranki ponovno pošljem e-pošto z obrazcem? Povezava ostane ista.")) return;
    startSend(async () => {
      const result = await sendEventDetailsForm(inquiryId);
      if (!result.ok) toast.error(result.error);
      else toast.success(again ? "Obrazec je ponovno poslan" : "Obrazec za okvir je poslan stranki");
    });
  }

  async function copy(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Povezava do obrazca je kopirana");
    } catch {
      // Clipboard can be refused after an awaited server call; let the admin copy it by hand.
      window.prompt("Kopirajte povezavo do obrazca:", url);
    }
  }

  function copyLink() {
    if (request) return copy(formUrl(request.token));
    startLink(async () => {
      const result = await createEventDetailsLink(inquiryId);
      if (!result.ok) toast.error(result.error);
      else await copy(formUrl(result.value));
    });
  }

  const rows = data
    ? [
        ["Točna lokacija", data.location],
        ["Vrsta dogodka", eventTypeText(data)],
        ["Pričetek najema", data.startTime],
        ["Trajanje najema", `${data.hours} h`],
        ["Kontaktna oseba", `${data.contactName}, ${data.contactPhone}`],
        ["Album", albumText(data) || "—"],
        ["Ideja za okvir", data.frameIdea || "—"],
        ["Izbrano ozadje", data.background || "—"],
      ]
    : [];

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-adm-side px-4 py-3.5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          {!request && <span className="text-adm-muted">Obrazec za okvir še ni poslan.</span>}
          {request && !request.submittedAt && (
            <>
              <Clock className="size-4 text-adm-muted" />
              {request.emailedAt
                ? `Obrazec poslan po e-pošti ${formatReceived(request.emailedAt)}`
                : `Povezava ustvarjena ${formatReceived(request.sentAt)}`}{" "}
              · čaka na odgovor
            </>
          )}
          {request?.submittedAt && (
            <>
              <Check className="size-4 text-adm-accent" />
              <span className="font-semibold">Podatki izpolnjeni {formatReceived(request.submittedAt)}</span>
            </>
          )}
        </span>
        <div className="flex flex-wrap gap-2">
          {request && (
            <a href={`/podatki/${request.token}`} target="_blank" rel="noreferrer" className={outlineButton}>
              <ExternalLink className="size-3.5" />
              Odpri obrazec
            </a>
          )}
          <button
            type="button"
            onClick={copyLink}
            disabled={linking}
            title="Za pošiljanje v svoji e-pošti, npr. skupaj s ponudbo"
            className={request ? outlineButton : quietButton}
          >
            <Link2 className="size-3.5" />
            {linking ? "Ustvarjam ..." : "Kopiraj povezavo"}
          </button>
          <button
            type="button"
            onClick={send}
            disabled={sending}
            className={request ? quietButton : primaryButton}
          >
            <Mail className="size-3.5" />
            {sending ? "Pošiljam ..." : request?.emailedAt ? "Pošlji ponovno" : "Pošlji po e-pošti"}
          </button>
        </div>
      </div>

      {data && (
        <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-x-8 gap-y-2 border-t border-adm-line pt-3">
          {rows.map(([label, value]) => (
            <div key={label} className="flex min-w-0 gap-2">
              <dt className="shrink-0 text-adm-muted">{label}:</dt>
              <dd className="m-0 min-w-0 whitespace-pre-line [overflow-wrap:anywhere]">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      <BackgroundReady inquiryId={inquiryId} readyAt={backgroundReadyAt} />
    </div>
  );
}
