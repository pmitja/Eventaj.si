import { notFound } from "next/navigation";
import { requireAdminPage } from "@/lib/admin-auth";
import { getLedgerYear, getLists } from "@/lib/db/ledger";

export async function loadYear(params: Promise<{ year: string }>) {
  await requireAdminPage();
  const year = Number((await params).year);
  const [ledger, lists] = await Promise.all([getLedgerYear(year), getLists()]);
  if (!ledger) notFound();
  return { ledger, lists };
}
