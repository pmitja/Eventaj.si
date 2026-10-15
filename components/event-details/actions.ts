"use server";

import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { saveEventDetails } from "@/lib/db/event-details";
import { getInquiry } from "@/lib/db/inquiries";
import { albumText, eventDetailsSchema, eventTypeText, type EventDetails } from "@/lib/event-details/schema";

type Result = { ok: true } | { ok: false; error: string };

function summary(data: EventDetails) {
  return [
    `Točna lokacija: ${data.location}`,
    `Vrsta dogodka: ${eventTypeText(data)}`,
    `Pričetek najema: ${data.startTime}`,
    `Trajanje najema: ${data.hours} h`,
    `Kontaktna oseba: ${data.contactName}, ${data.contactPhone}`,
    `Album: ${albumText(data) || "—"}`,
    `Ideja za okvir: ${data.frameIdea || "—"}`,
    `Izbrano ozadje: ${data.background || "—"}`,
  ].join("\n");
}

export async function submitEventDetails(token: string, input: unknown): Promise<Result> {
  const parsed = eventDetailsSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Preverite vnesene podatke." };

  let inquiryId: number;
  try {
    inquiryId = await saveEventDetails(token, parsed.data);
  } catch (error) {
    console.error("Error saving event details:", error);
    return { ok: false, error: "Podatkov ni bilo mogoče shraniti. Poskusite znova ali nam pišite na info@eventaj.si." };
  }
  revalidatePath("/admin");

  try {
    const inquiry = await getInquiry(inquiryId);
    await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: "Eventaj.si <info@eventaj.si>",
      to: "eventaj.si@gmail.com",
      subject: `Podatki za dogodek: ${inquiry?.formData.name ?? `#${inquiryId}`}`,
      text: `Stranka je izpolnila podatke za dogodek (povpraševanje #${inquiryId}).\n\n${summary(parsed.data)}`,
    });
  } catch (error) {
    // The data is saved and visible in admin; the notification is a convenience.
    console.error("Error sending event details notification:", error);
  }

  return { ok: true };
}
