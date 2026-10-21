import { createHmac, randomBytes, scrypt, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { sql } from "@/lib/db";

const COOKIE_NAME = "eventaj_admin";
const SESSION_DAYS = 30;

// "admin" sees the whole dashboard, "student" only their own schedule at /admin/razpored.
export type UserRole = "admin" | "student";
export type AdminUser = { id: number; email: string; name: string; role: UserRole; student: string | null };

export const STUDENT_HOME = "/admin/razpored";

function secret() {
  // ADMIN_PASSWORD was the single shared login before per-user accounts; it still signs sessions
  // so existing deployments keep working without a new env var.
  const value = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!value) throw new Error("ADMIN_SESSION_SECRET ni nastavljen");
  return value;
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(`eventaj-admin:${value}`).digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function derive(password: string, salt: Buffer) {
  return new Promise<Buffer>((resolve, reject) =>
    scrypt(password, salt, 64, (error, key) => (error ? reject(error) : resolve(key))),
  );
}

// Format: scrypt$<salt hex>$<key hex>. scripts/admin-users.mjs writes the same format.
export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  return `scrypt$${salt.toString("hex")}$${(await derive(password, salt)).toString("hex")}`;
}

async function verifyPassword(password: string, stored: string) {
  const [scheme, salt, key] = stored.split("$");
  if (scheme !== "scrypt" || !salt || !key) return false;
  const expected = Buffer.from(key, "hex");
  const actual = await derive(password, Buffer.from(salt, "hex"));
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function authenticate(email: string, password: string): Promise<AdminUser | null> {
  const rows = (await sql()`
    SELECT id, email, name, role, student, password_hash FROM admin_users WHERE lower(email) = lower(${email.trim()})
  `) as (AdminUser & { password_hash: string })[];
  const row = rows[0];
  if (!row || !(await verifyPassword(password, row.password_hash))) return null;
  return { id: row.id, email: row.email, name: row.name, role: row.role, student: row.student };
}

export async function createSession(userId: number) {
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = `${userId}.${expires}`;
  const store = await cookies();
  store.set(COOKIE_NAME, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expires),
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE_NAME);
}

export const getAdminUser = cache(async (): Promise<AdminUser | null> => {
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value) return null;
  const [userId, expires, signature] = value.split(".");
  if (!userId || !expires || !signature || Number(expires) < Date.now()) return null;
  if (!safeEqual(signature, sign(`${userId}.${expires}`))) return null;
  // Looked up on every request so removing a user revokes their session.
  const rows = (await sql()`SELECT id, email, name, role, student FROM admin_users WHERE id = ${Number(userId)}`) as AdminUser[];
  return rows[0] ?? null;
});

// Where a signed-in user lands after login.
export function homeFor(user: AdminUser) {
  return user.role === "student" ? STUDENT_HOME : "/admin";
}

// Everything outside the student schedule is for admins only; students are sent to their schedule.
export async function requireAdminPage() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  if (user.role !== "admin") redirect(STUDENT_HOME);
  return user;
}

export async function requireAdminAction() {
  const user = await getAdminUser();
  if (!user || user.role !== "admin") throw new Error("Ni dostopa");
  return user;
}

export async function requireAdminApi() {
  const user = await getAdminUser();
  return user?.role === "admin" ? null : Response.json({ error: "Ni dostopa" }, { status: 401 });
}

export async function requireUserAction() {
  const user = await getAdminUser();
  if (!user) throw new Error("Ni dostopa");
  return user;
}

export async function updateAdminUser(id: number, changes: { name: string; email: string; password?: string }) {
  const email = changes.email.trim().toLowerCase();
  const taken = (await sql()`SELECT id FROM admin_users WHERE lower(email) = ${email} AND id <> ${id}`) as { id: number }[];
  if (taken.length > 0) throw new Error("Ta e-naslov že uporablja drug račun");
  if (changes.password) {
    const hash = await hashPassword(changes.password);
    await sql()`UPDATE admin_users SET name = ${changes.name.trim()}, email = ${email}, password_hash = ${hash} WHERE id = ${id}`;
  } else {
    await sql()`UPDATE admin_users SET name = ${changes.name.trim()}, email = ${email} WHERE id = ${id}`;
  }
}

export async function setPassword(id: number, password: string) {
  await sql()`UPDATE admin_users SET password_hash = ${await hashPassword(password)} WHERE id = ${id}`;
}

export type StudentAccount = { id: number; email: string; student: string };

export async function listStudentAccounts() {
  return (await sql()`
    SELECT id, email, student FROM admin_users WHERE role = 'student' ORDER BY lower(student), id
  `) as StudentAccount[];
}

export async function createStudentAccount(student: string, email: string, password: string) {
  const address = email.trim().toLowerCase();
  const taken = (await sql()`SELECT id FROM admin_users WHERE lower(email) = ${address}`) as { id: number }[];
  if (taken.length > 0) throw new Error("Ta e-naslov že uporablja drug račun");
  await sql()`
    INSERT INTO admin_users (email, name, password_hash, role, student)
    VALUES (${address}, ${student.trim()}, ${await hashPassword(password)}, 'student', ${student.trim()})
  `;
}

// Only student accounts can be changed or removed from the dashboard; admins stay script-managed.
export async function resetStudentPassword(id: number, password: string) {
  const hash = await hashPassword(password);
  const rows = (await sql()`
    UPDATE admin_users SET password_hash = ${hash} WHERE id = ${id} AND role = 'student' RETURNING id
  `) as { id: number }[];
  if (!rows[0]) throw new Error("Račun ne obstaja");
}

export async function deleteStudentAccount(id: number) {
  await sql()`DELETE FROM admin_users WHERE id = ${id} AND role = 'student'`;
}
