import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { getInquiry } from "@/lib/db/inquiries";
import { claudeClient, MODEL, OfferGenerationError } from "./claude";
import { describeInquiry, serviceLabel } from "./generate";
import { formatEur } from "./pricing";
import { isBoothService, serviceForInquiry, services, type BoothService } from "./services";
import type { OfferOptions } from "./schema";

// Only the pricing fields Claude can read from the inquiry; distance and custom items stay with the admin.
const prefillSchema = z.object({
  hours: z.enum(["2", "3", "4"]),
  compareHours: z.enum(["", "2", "3", "4"]),
  extraHours: z.number().int(),
  days: z.number().int(),
  discountPercent: z.number(),
  qrGallery: z.boolean(),
  razlaga: z.array(z.string()),
});

export type OfferPrefill = Pick<OfferOptions, "hours" | "compareHours" | "extraHours" | "days" | "discountPercent" | "qrGallery">;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)));

function systemPrompt(service: BoothService) {
  const config = services[service];
  const packages = Object.entries(config.packages)
    .map(([hours, pkg]) => `- ${hours} h: ${pkg.name}, ${formatEur(pkg.price)} na dan`)
    .join("\n");
  return `Si pomočnik, ki iz povpraševanja stranke in navodil ponudnika nastavi obrazec za ponudbo za ${config.label}.
Besedila ponudbe ne pišeš, samo izbereš nastavitve.

# PAKETI
${packages}
- Podaljšanje: ${formatEur(config.extraHourPrice)} na dodatno uro na dan
- QR galerija za goste: ${formatEur(config.qrGalleryPrice)}, enkratno

# POLJA
- days: število dni, ko poteka najem (npr. "17., 18. in 19. 11." ali "tri dni" = 3). En dan, če ni drugače navedeno.
- hours: paket (2, 3 ali 4 ure na dan), ki ustreza trajanju najema na dan.
- compareHours: drugi paket za primerjavo, sicer "". Nastavi ga, če stranka navaja razpon (npr. "3–4 ure": hours "3",
  compareHours "4") ali če ponudnik v navodilih želi primerjavo ali več možnosti.
- extraHours: dodatne ure na dan nad 4-urnim paketom (npr. 6 ur na dan: hours "4", extraHours 2), sicer 0.
- discountPercent: samo popust, ki ga ponudnik izrecno navede v navodilih (npr. "10 % popusta" = 10). Nikoli si ga ne
  izmisli; sicer 0.
- qrGallery: true, če stranka ali ponudnik želi QR galerijo; sicer obdrži trenutno nastavitev.
- razlaga: ena kratka alineja v slovenščini za vsako nastavitev, ki jo spremeniš glede na trenutne nastavitve, s
  podatkom iz povpraševanja ali navodil, na katerega se opiraš. Nastavitve poimenuj kot v obrazcu (Paket, Primerjava,
  Število dni, Dodatne ure, Popust, QR galerija), ne z imeni polj. Če nečesa ne moreš razbrati, to zapiši.

Prevoz se samodejno zaračuna za vsak dan, razdaljo in ročne postavke pa vnese ponudnik, zato jih v razlagi ne omenjaj.

Navodila ponudnika imajo prednost pred povpraševanjem.`;
}

export async function prefillOffer(inquiryId: number, options: OfferOptions) {
  const client = claudeClient();
  const inquiry = await getInquiry(inquiryId);
  if (!inquiry) throw new OfferGenerationError("Povpraševanje ne obstaja");
  const service = serviceForInquiry(inquiry.formData);
  if (!service || !isBoothService(service)) {
    throw new OfferGenerationError("Samodejno izpolnjevanje je na voljo samo za Photo Booth, 360° Booth in kombinacijo");
  }

  const current = {
    hours: options.hours,
    compareHours: options.compareHours,
    extraHours: options.extraHours,
    days: options.days,
    discountPercent: options.discountPercent,
    qrGallery: options.qrGallery,
  };
  const response = await client.beta.messages.parse({
    model: MODEL,
    max_tokens: 4000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "low", format: betaZodOutputFormat(prefillSchema) },
    system: systemPrompt(service),
    messages: [{
      role: "user",
      content: `# POVPRAŠEVANJE STRANKE
"""
${describeInquiry(inquiry.formData, inquiry.createdAt, serviceLabel(service))}
"""

# NAVODILA PONUDNIKA
${options.instructions.trim() || "(ni navodil)"}

# TRENUTNE NASTAVITVE
${JSON.stringify(current)}`,
    }],
  });

  const result = response.parsed_output;
  if (response.stop_reason === "refusal" || !result) {
    throw new OfferGenerationError("Claude ni mogel izpolniti obrazca, nastavi ga ročno");
  }

  const prefill: OfferPrefill = {
    hours: result.hours,
    compareHours: result.compareHours === result.hours ? "" : result.compareHours,
    extraHours: clamp(result.extraHours, 0, 12),
    days: clamp(result.days, 1, 7),
    discountPercent: clamp(result.discountPercent, 0, 50),
    qrGallery: result.qrGallery,
  };
  return { prefill, notes: result.razlaga.filter(Boolean) };
}
