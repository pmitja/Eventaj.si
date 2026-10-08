import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { albumColorLabels, albumSizeLabels } from "@/content/eventaj/album-pricing";
import { getInquiry, type StoredFormData } from "@/lib/db/inquiries";
import { getOffer, insertOffer, nextOfferNumber } from "@/lib/db/offers";
import { formatNumericSlovenianDate, getSlovenianDateString } from "@/lib/slovenian-date";
import { buildOfferItems, sumItems } from "./pricing";
import { buildOfferSystemPrompt, buildOfferUserPrompt } from "./prompt";
import { serviceForInquiryType, services } from "./services";
import { offerContentSchema, type OfferOptions } from "./schema";

const MODEL = "claude-opus-5-5";

export class OfferGenerationError extends Error {}

function describeInquiry(formData: StoredFormData, createdAt: string, serviceLabel: string) {
  const album = formData.albumSize
    ? `${albumSizeLabels[formData.albumSize]}${formData.albumColor ? `, ${albumColorLabels[formData.albumColor]}` : ""}`
    : "";
  return [
    `Prejeto: ${formatNumericSlovenianDate(createdAt.slice(0, 10))}`,
    `Naročnik: ${formData.name}`,
    `E-pošta: ${formData.email}`,
    `Telefon: ${formData.phone}`,
    `Storitev: ${serviceLabel}`,
    `Trajanje (izbrano v obrazcu): ${formData.hours} h`,
    formData.eventType ? `Vrsta dogodka: ${formData.eventType}` : "",
    `Datum dogodka: ${formatNumericSlovenianDate(formData.date)}`,
    `Lokacija: ${formData.location || "ni navedena"}`,
    formData.guests ? `Število gostov: ${formData.guests}` : "",
    album ? `Album: ${album}` : "",
    formData.qrGallery ? "QR galerija: da" : "",
    formData.message ? `Sporočilo stranke:\n${formData.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function addDays(dateString: string, days: number) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days));
  return date.toISOString().slice(0, 10);
}

export async function generateOffer(inquiryId: number, options: OfferOptions) {
  if (!process.env.ANTHROPIC_API_KEY) throw new OfferGenerationError("ANTHROPIC_API_KEY ni nastavljen v .env");

  const inquiry = await getInquiry(inquiryId);
  if (!inquiry) throw new OfferGenerationError("Povpraševanje ne obstaja");
  const service = serviceForInquiryType(inquiry.formData.type);
  if (!service) {
    throw new OfferGenerationError("Ponudbo je mogoče generirati samo za Photo Booth in 360° Booth");
  }
  options = { ...options, service, ...(services[service].hasAlbum ? {} : { albumSize: "", albumColor: "" }) };

  const draftItems = buildOfferItems(options);
  const total = sumItems(draftItems);
  const date = getSlovenianDateString();
  const validUntil = addDays(date, options.validityDays);
  const year = Number(date.slice(0, 4));

  // Organization-scoped API keys must name the workspace on every request.
  const workspaceId = process.env.ANTHROPIC_WORKSPACE_ID;
  const client = new Anthropic({
    defaultHeaders: workspaceId ? { "anthropic-workspace-id": workspaceId } : undefined,
  });
  const response = await client.beta.messages.parse({
    model: MODEL,
    max_tokens: 16000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "medium", format: betaZodOutputFormat(offerContentSchema) },
    system: buildOfferSystemPrompt(service),
    messages: [
      {
        role: "user",
        content: buildOfferUserPrompt({
          inquiryText: describeInquiry(inquiry.formData, inquiry.createdAt, services[service].label),
          date: formatNumericSlovenianDate(date),
          validityDays: options.validityDays,
          validUntil: formatNumericSlovenianDate(validUntil),
          items: draftItems,
          packageName: services[service].packages[options.hours].name,
          instructions: options.instructions,
        }),
      },
    ],
  });

  if (response.stop_reason === "refusal") {
    throw new OfferGenerationError("Model je zavrnil pripravo ponudbe");
  }
  if (response.stop_reason === "max_tokens" || !response.parsed_output) {
    throw new OfferGenerationError("Model ni vrnil veljavne ponudbe, poskusite ponovno");
  }

  const content = response.parsed_output;
  const items = buildOfferItems(options, { place: content.dogodek.kraj });

  // Number is assigned at insert time so parallel generations cannot collide.
  for (let attempt = 0; attempt < 3; attempt++) {
    const number = await nextOfferNumber(year);
    try {
      const id = await insertOffer({
        inquiryId,
        number,
        options: { ...options, date, validUntil },
        content,
        items,
        total,
      });
      return (await getOffer(id))!;
    } catch (error) {
      if (attempt === 2) throw error;
    }
  }
  throw new OfferGenerationError("Shranjevanje ponudbe ni uspelo");
}
