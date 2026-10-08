import { neon } from "@neondatabase/serverless";

let client: ReturnType<typeof neon> | null = null;

export function sql() {
  if (!client) {
    const url = process.env.NEON_DB_URL;
    if (!url) throw new Error("NEON_DB_URL ni nastavljen");
    client = neon(url);
  }
  return client;
}
