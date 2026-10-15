"use server";

import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import EventDetailsRequestEmail from "@/emails/event-details-request";
import { requireAdminAction } from "@/lib/admin-auth";
import { ensureEventDetailsRequest, markEventDetailsEmailed } from "@/lib/db/event-details";
import { deleteInquiry, getInquiry, inquiryStatuses, setInquiryCrew, setInquiryStatus, type InquiryStatus } from "@/lib/db/inquiries";
import { setOfferSent } from "@/lib/db/offers";
import { formatSlovenianDate } from "@/lib/slovenian-date";

type Result<T> = { ok: true; value: T } | { ok: false; error: string };

async function attempt<T>(run: () => Promise<T>): Promise<Result<T>> {
  try {
    return { ok: true, value: await run() };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Napaka pri shranjevanju" };
  }
}

export async function removeInquiry(id: number) {
  await requireAdminAction();
  const result = await attempt(() => deleteInquiry(id));
  if (result.ok) revalidatePath("/admin");
  return result;
}

export async function markOfferSent(id: number, sent: boolean) {
  await requireAdminAction();
  const result = await attempt(() => setOfferSent(id, sent));
  if (result.ok) revalidatePath("/admin");
  return result;
}

export async function changeInquiryStatus(id: number, status: InquiryStatus) {
  await requireAdminAction();
  const result = await attempt(async () => {
    if (!inquiryStatuses.includes(status)) throw new Error("Neznan status");
    await setInquiryStatus(id, status);
  });
  if (result.ok) revalidatePath("/admin");
  return result;
}

export async function changeInquiryCrew(id: number, crew: string) {
  await requireAdminAction();
  const result = await attempt(async () => {
    const value = crew.trim();
    if (value.length > 200) throw new Error("Besedilo je predolgo");
    await setInquiryCrew(id, value || null);
    return value || null;
  });
  if (result.ok) {
    revalidatePath("/admin");
    revalidatePath("/admin/koledar");
  }
  return result;
}

async function confirmedInquiry(id: number) {
  const inquiry = await getInquiry(id);
  if (!inquiry) throw new Error("Povpraševanje ne obstaja");
  if (inquiry.status !== "confirmed") throw new Error("Obrazec je na voljo le za potrjen dogodek");
  return inquiry;
}

// For sending the form in our own email (e.g. together with a manually sent offer).
export async function createEventDetailsLink(id: number) {
  await requireAdminAction();
  const result = await attempt(async () => {
    await confirmedInquiry(id);
    return ensureEventDetailsRequest(id);
  });
  if (result.ok) revalidatePath("/admin");
  return result;
}

export async function sendEventDetailsForm(id: number) {
  await requireAdminAction();
  const result = await attempt(async () => {
    const inquiry = await confirmedInquiry(id);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL ni nastavljen");

    const token = await ensureEventDetailsRequest(id);
    const data = inquiry.formData;
    const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: "Eventaj.si <info@eventaj.si>",
      to: data.email,
      subject: "Podatki za vaš dogodek – Eventaj.si",
      react: EventDetailsRequestEmail({
        name: data.name?.split(" ")[0] ?? "",
        date: data.date ? formatSlovenianDate(data.date) : "",
        url: `${baseUrl.replace(/\/$/, "")}/podatki/${token}`,
      }),
    });
    if (error) throw new Error(`E-pošta ni bila poslana: ${error.message}`);
    await markEventDetailsEmailed(id);
  });
  if (result.ok) revalidatePath("/admin");
  return result;
}
