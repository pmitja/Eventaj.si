import { loadYear } from "../../_components/load";
import { StudentsWorkspace } from "../../_components/students-workspace";

export default async function StudentsPage({ params }: { params: Promise<{ year: string }> }) {
  const { ledger, lists } = await loadYear(params);
  return <StudentsWorkspace year={ledger.year} rows={ledger.students} events={ledger.events} lists={lists} />;
}
