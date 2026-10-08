import type { ReactNode } from "react";
import { requireAdminPage } from "@/lib/admin-auth";
import { countInquiries } from "@/lib/db/inquiries";
import { getLedgerCounts, listYears } from "@/lib/db/ledger";
import { AdminShell } from "../_components/admin-shell";

export default async function AdminAppLayout({ children }: { children: ReactNode }) {
  const user = await requireAdminPage();
  const [inquiryCount, years, counts] = await Promise.all([countInquiries(), listYears(), getLedgerCounts()]);

  return (
    <AdminShell user={{ name: user.name, email: user.email }} inquiryCount={inquiryCount} years={years} counts={counts}>
      {children}
    </AdminShell>
  );
}
