import { PageHeader } from "@/app/admin/_components/page-header";
import { requireAdminPage } from "@/lib/admin-auth";
import { getLists } from "@/lib/db/ledger";
import { ListsForm } from "../_components/lists-form";

export default async function LedgerSettingsPage() {
  await requireAdminPage();
  const lists = await getLists();

  return (
    <>
      <PageHeader
        eyebrow="Poslovanje"
        title="Nastavitve"
        subtitle="Izbire v spustnih seznamih (nekdanji list »Pomožni podatki«). Ena vrednost na vrstico."
      />
      <ListsForm lists={lists} />
    </>
  );
}
