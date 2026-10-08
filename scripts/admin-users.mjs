// Create admin accounts or reset their password.
// Usage: node --env-file=.env scripts/admin-users.mjs '<geslo>' mitja@eventaj.si julija@eventaj.si ...
import { randomBytes, scryptSync } from "crypto";
import { neon } from "@neondatabase/serverless";

const [password, ...emails] = process.argv.slice(2);
if (!password || emails.length === 0) {
  console.error("Uporaba: node --env-file=.env scripts/admin-users.mjs '<geslo>' <email> [<email> ...]");
  process.exit(1);
}

const sql = neon(process.env.NEON_DB_URL);

// Same format as hashPassword() in lib/admin-auth.ts.
function hash(value) {
  const salt = randomBytes(16);
  return `scrypt$${salt.toString("hex")}$${scryptSync(value, salt, 64).toString("hex")}`;
}

for (const email of emails) {
  const local = email.split("@")[0];
  const name = local.charAt(0).toUpperCase() + local.slice(1);
  await sql`
    INSERT INTO admin_users (email, name, password_hash)
    VALUES (${email.toLowerCase()}, ${name}, ${hash(password)})
    ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash
  `;
  console.log(`✓ ${email}`);
}
