"use server";

import { revalidatePath } from "next/cache";
import { requireUserAction, setPassword } from "@/lib/admin-auth";
import { claimOpenEvent } from "@/lib/db/open-events";
import { reportStudentWork } from "@/lib/db/student-schedule";
import { parseClockHours } from "@/lib/ledger/compute";
import { getSlovenianDateString } from "@/lib/slovenian-date";

export async function changePassword(values: { password?: string; password2?: string }) {
  const user = await requireUserAction();
  const password = values.password ?? "";
  if (password.length < 8) return "Geslo mora imeti vsaj 8 znakov";
  if (password !== (values.password2 ?? "")) return "Gesli se ne ujemata";
  await setPassword(user.id, password);
  return null;
}

// A student signs up for an open event and is on the crew right away. An admin previewing a
// student's page signs that student up.
export async function claimEvent(key: string, forStudent?: string): Promise<string | null> {
  const user = await requireUserAction();
  const student = user.role === "student" ? user.student : user.role === "admin" ? forStudent?.trim() : null;
  if (!student) return "Ni izbranega študenta";
  try {
    await claimOpenEvent(key, student, getSlovenianDateString());
  } catch (error) {
    return error instanceof Error ? error.message : "Prijava ni uspela";
  }
  revalidatePath("/admin", "layout");
  return null;
}

// clock: hours may also be written as "6:40" (6 h 40 min → 6,67).
function reportNumber(raw: string | undefined, label: string, max: number, clock = false) {
  const text = (raw ?? "").trim();
  if (!text) return null;
  const value = (clock ? parseClockHours(text) : null) ?? Number(text.replace(/\s/g, "").replace(",", "."));
  if (!Number.isFinite(value) || value < 0) return clock ? `${label}: vpiši npr. 6:40 ali 6,5` : `${label}: vpiši število`;
  if (value > max) return `${label}: največ ${max}`;
  return Math.round(value * 100) / 100;
}

// After an event the student logs hours worked and km driven; both may be left empty.
// A student always logs for themselves; an admin previewing a student's page logs for that student.
export async function reportWork(key: string, values: { hours?: string; km?: string }, forStudent?: string): Promise<string | null> {
  const user = await requireUserAction();
  const student = user.role === "student" ? user.student : user.role === "admin" ? forStudent?.trim() : null;
  if (!student) return "Ni izbranega študenta";
  const hours = reportNumber(values.hours, "Ure", 24, true);
  const km = reportNumber(values.km, "Km", 2000);
  if (typeof hours === "string") return hours;
  if (typeof km === "string") return km;
  try {
    await reportStudentWork(student, key, { workedHours: hours, km }, getSlovenianDateString(), user.email);
  } catch (error) {
    return error instanceof Error ? error.message : "Shranjevanje ni uspelo";
  }
  revalidatePath("/admin", "layout");
  return null;
}
