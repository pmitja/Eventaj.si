import { PageHeader } from "@/app/admin/_components/page-header";
import { listStudentAccounts, requireAdminPage } from "@/lib/admin-auth";
import { getLists } from "@/lib/db/ledger";
import { ListsForm } from "../_components/lists-form";
import { StudentAccounts } from "../_components/student-accounts";

export default async function LedgerSettingsPage() {
  await requireAdminPage();
  const [lists, accounts] = await Promise.all([getLists(), listStudentAccounts()]);

  return (
    <>
      <PageHeader
        eyebrow="Poslovanje"
        title="Nastavitve"
        subtitle="Izbire v spustnih seznamih (nekdanji list »Pomožni podatki«). Ena vrednost na vrstico."
      />
      <ListsForm lists={lists} />
      <StudentAccounts accounts={accounts} students={lists.students} />
    </>
  );
}
