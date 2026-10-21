"use client";

import { motion } from "framer-motion";
import { Eye, KeyRound, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { FormDialog } from "@/app/admin/_components/form-dialog";
import { Panel } from "@/app/admin/_components/panel";
import type { StudentAccount } from "@/lib/admin-auth";
import { addStudentAccount, removeStudentAccount, setStudentAccountPassword } from "../actions";

type Dialog = { kind: "add" } | { kind: "password"; account: StudentAccount } | null;

const iconButton =
  "grid size-8 place-items-center rounded-full border border-adm-soft text-adm-ink transition-colors hover:border-adm-ink";

export function StudentAccounts({ accounts, students }: { accounts: StudentAccount[]; students: string[] }) {
  const router = useRouter();
  const [dialog, setDialog] = useState<Dialog>(null);
  const close = (open: boolean) => !open && setDialog(null);

  const remove = async (account: StudentAccount) => {
    if (!window.confirm(`Odstranim dostop za ${account.student} (${account.email})?`)) return;
    await removeStudentAccount(account.id);
    toast.success("Dostop je odstranjen");
    router.refresh();
  };

  return (
    <Panel
      title="Dostopi za študente"
      note="Študent se prijavi na isti strani in vidi samo svoje dogodke, podatke za izvedbo in svoj zaslužek."
    >
      {accounts.length > 0 && (
        <div className="flex flex-col">
          {accounts.map((account) => (
            <div key={account.id} className="flex items-center justify-between gap-3 border-b border-adm-rule py-2.5 last:border-b-0">
              <div className="flex min-w-0 flex-col">
                <span className="text-sm font-semibold">{account.student}</span>
                <span className="truncate text-xs text-adm-muted">{account.email}</span>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <Link href={`/admin/razpored?student=${encodeURIComponent(account.student)}`} className={iconButton} title="Predogled" aria-label="Predogled">
                  <Eye className="size-3.5" />
                </Link>
                <button type="button" onClick={() => setDialog({ kind: "password", account })} className={iconButton} title="Novo geslo" aria-label="Novo geslo">
                  <KeyRound className="size-3.5" />
                </button>
                <button type="button" onClick={() => remove(account)} className={`${iconButton} hover:border-adm-accent hover:text-adm-accent`} title="Odstrani" aria-label="Odstrani">
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <motion.button
        type="button"
        onClick={() => setDialog({ kind: "add" })}
        whileTap={{ scale: 0.96 }}
        className="flex items-center gap-2 self-start rounded-full border border-adm-ink px-[18px] py-2 text-sm transition-colors hover:bg-adm-ink hover:text-adm-bg"
      >
        <Plus className="size-4" /> Dodaj dostop
      </motion.button>

      <FormDialog
        open={dialog?.kind === "add"}
        onOpenChange={close}
        eyebrow="Dostopi za študente"
        title="Nov dostop"
        submitLabel="Ustvari"
        fields={[
          { key: "student", label: "Študent", kind: "select", required: true, options: students, wide: true },
          { key: "email", label: "E-pošta", kind: "email", required: true },
          { key: "password", label: "Geslo", kind: "text", required: true, placeholder: "vsaj 8 znakov" },
        ]}
        onSubmit={async (values) => {
          const error = await addStudentAccount(values);
          if (!error) {
            setDialog(null);
            toast.success(`Dostop za ${values.student} je ustvarjen`);
            router.refresh();
          }
          return error;
        }}
      />
      <FormDialog
        open={dialog?.kind === "password"}
        onOpenChange={close}
        eyebrow={dialog?.kind === "password" ? dialog.account.student : ""}
        title="Novo geslo"
        fields={[{ key: "password", label: "Geslo", kind: "text", required: true, placeholder: "vsaj 8 znakov", wide: true }]}
        onSubmit={async (values) => {
          if (dialog?.kind !== "password") return null;
          const error = await setStudentAccountPassword(dialog.account.id, values);
          if (!error) {
            setDialog(null);
            toast.success("Geslo je nastavljeno");
          }
          return error;
        }}
      />
    </Panel>
  );
}
