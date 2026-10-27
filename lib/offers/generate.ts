import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { albumColorLabels, albumSizeLabels } from "@/content/eventaj/album-pricing";
import { getInquiry, type StoredFormData } from "@/lib/db/inquiries";
import { getOffer, insertOffer, nextOfferNumber } from "@/lib/db/offers";
import { formatNumericSlovenianDate, getSlovenianDateString } from "@/lib/slovenian-date";
import { buildOfferVariants, daysLabel, type PackageHours } from "./pricing";
import { buildOfferSystemPrompt, buildOfferUserPrompt } from "./prompt";
import { serviceForInquiry, services, tableRental, type BoothService, type OfferService, type ServicePackage } from "./services";
import { claudeClient, MODEL, OfferGenerationError } from "./claude";
import { offerContentSchema, type OfferOptions } from "./schema";

export function describeInquiry(formData: StoredFormData, createdAt: string, serviceLabel: string) {
  const album = formData.albumSize
    ? `${albumSizeLabels[formData.albumSize]}${formData.albumColor ? `, ${albumColorLabels[formData.albumColor]}` : ""}`
    : "";
  return [
    `Prejeto: ${formatNumericSlovenianDate(createdAt.slice(0, 10))}`,
    `Naročnik: ${formData.name}`,
    `E-pošta: ${formData.email}`,
    `Telefon: ${formData.phone}`,
    `Storitev: ${serviceLabel}`,
    formData.type === "equipment" ? `Trajanje: ${formData.hours}` : `Trajanje (izbrano v obrazcu): ${formData.hours} h`,
    formData.eventType ? `Vrsta dogodka: ${formData.eventType}` : "",
    `Datum dogodka: ${formatNumericSlovenianDate(formData.date)}`,
    `Lokacija: ${formData.location || "ni navedena"}`,
    formData.guests ? `Število gostov: ${formData.guests}` : "",
    album ? `Album: ${album}` : "",
    formData.qrGallery ? "QR galerija: da" : "",
    formData.equipmentSummary ? `Izbrana oprema:\n${formData.equipmentSummary}` : "",
    formData.fulfillment ? `Prevzem/dostava (izbrano v obrazcu): ${formData.fulfillment}` : "",
    formData.message ? `Sporočilo stranke:\n${formData.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function serviceLabel(service: OfferService) {
  return service === "tables" ? tableRental.label : services[service].label;
}

function describePackage(pkg: ServicePackage) {
  return pkg.parts ? `${pkg.name}: ${pkg.parts.map((part) => part.name).join(" + ")}` : pkg.name;
}

function describePackages(service: BoothService, options: OfferOptions) {
  const hours: PackageHours[] = options.compareHours && options.compareHours !== options.hours
    ? [options.hours, options.compareHours]
    : [options.hours];
  const names = hours.map((h) => describePackage(services[service].packages[h]));
  const days = options.days > 1 ? `, za vsak dan (${daysLabel(options.days)})` : "";
  return names.length > 1 ? `dve možnosti za primerjavo: ${names.join(" ALI ")}${days}` : `${names[0]}${days}`;
}

function addDays(dateString: string, days: number) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days));
  return date.toISOString().slice(0, 10);
}

export async function generateOffer(inquiryId: number, options: OfferOptions) {
  const client = claudeClient();
  const inquiry = await getInquiry(inquiryId);
  if (!inquiry) throw new OfferGenerationError("Povpraševanje ne obstaja");
  const service = serviceForInquiry(inquiry.formData);
  if (!service) {
    throw new OfferGenerationError("Ponudbo je mogoče generirati samo za Photo Booth, 360° Booth, kombinacijo obeh ali stoječe mize");
  }
  const hasAlbum = service !== "tables" && services[service].hasAlbum;
  options = { ...options, service, ...(hasAlbum ? {} : { albumSize: "", albumColor: "" }) };

  if (service === "tables") options = { ...options, days: 1, compareHours: "" };
  const draftVariants = buildOfferVariants(options);
  const date = getSlovenianDateString();
  const validUntil = addDays(date, options.validityDays);
  const year = Number(date.slice(0, 4));

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
          inquiryText: describeInquiry(inquiry.formData, inquiry.createdAt, serviceLabel(service)),
          date: formatNumericSlovenianDate(date),
          validityDays: options.validityDays,
          validUntil: formatNumericSlovenianDate(validUntil),
          days: options.days,
          variants: draftVariants,
          packageName: service === "tables"
            ? `${tableRental.name}: ${options.tableCount} × ${tableRental.unitPrice} €`
            : describePackages(service, options),
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
  const variants = buildOfferVariants(options, { place: content.dogodek.kraj });

  // Number is assigned at insert time so parallel generations cannot collide.
  for (let attempt = 0; attempt < 3; attempt++) {
    const number = await nextOfferNumber(year);
    try {
      const id = await insertOffer({
        inquiryId,
        number,
        options: { ...options, date, validUntil },
        content,
        variants,
      });
      return (await getOffer(id))!;
    } catch (error) {
      if (attempt === 2) throw error;
    }
  }
  throw new OfferGenerationError("Shranjevanje ponudbe ni uspelo");
}
