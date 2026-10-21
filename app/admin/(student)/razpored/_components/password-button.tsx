"use client";

import { KeyRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { FormDialog } from "@/app/admin/_components/form-dialog";
import { changePassword } from "../actions";

export function PasswordButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-[13px] text-adm-muted transition-colors hover:text-adm-ink"
      >
        <KeyRound className="size-3.5" /> Geslo
      </button>
      <FormDialog
        open={open}
        onOpenChange={setOpen}
        eyebrow="Moj račun"
        title="Novo geslo"
        fields={[
          { key: "password", label: "Novo geslo", kind: "password", required: true },
          { key: "password2", label: "Ponovi geslo", kind: "password", required: true },
        ]}
        onSubmit={async (values) => {
          const error = await changePassword(values);
          if (!error) {
            setOpen(false);
            toast.success("Geslo je spremenjeno");
          }
          return error;
        }}
      />
    </>
  );
}
