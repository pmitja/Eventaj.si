"use client";

import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Stagger, StaggerItem } from "@/app/admin/_components/motion";
import { Textarea } from "@/components/ui/textarea";
import { LIST_DEFS, LIST_KEYS, type LedgerLists } from "@/lib/ledger/lists";
import { saveLists } from "../actions";

export function ListsForm({ lists }: { lists: LedgerLists }) {
  const [message, action, pending] = useActionState(saveLists, null);

  useEffect(() => {
    if (message) toast.success("Seznami so shranjeni");
  }, [message]);

  return (
    <form action={action} className="flex flex-col gap-5">
      <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {LIST_KEYS.map((key) => (
          <StaggerItem key={key} className="flex flex-col gap-2 rounded-2xl border border-adm-line bg-adm-card p-4">
            <label htmlFor={`list-${key}`} className="text-[11px] font-semibold uppercase tracking-[.06em] text-adm-sub">
              {LIST_DEFS[key].label}
            </label>
            <Textarea
              id={`list-${key}`}
              name={key}
              defaultValue={lists[key].join("\n")}
              rows={Math.max(lists[key].length + 1, 5)}
              className="resize-y rounded-xl border-adm-line bg-adm-bg text-sm leading-relaxed focus-visible:border-adm-ink focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-[0_0_0_3px_#E7DCCB]"
            />
          </StaggerItem>
        ))}
      </Stagger>
      <p className="m-0 text-xs text-adm-muted">
        Izračuni parov (Maja + Jan, Julija + Mitja), skupnega fonda in pregleda Jan / Mitja so vezani na ta imena, tako kot v Excelu.
      </p>
      <motion.button
        type="submit"
        disabled={pending}
        whileTap={{ scale: 0.96 }}
        className="flex items-center gap-2 self-start rounded-full bg-adm-ink px-5 py-2.5 text-sm text-adm-bg disabled:opacity-70"
      >
        {pending && <LoaderCircle className="size-4 animate-spin" />}
        {pending ? "Shranjujem …" : "Shrani"}
      </motion.button>
    </form>
  );
}
