"use client";

import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ColumnBars, MONTHS, PALETTE } from "@/app/admin/_components/charts";
import { FormDialog, type FieldSpec } from "@/app/admin/_components/form-dialog";
import { KpiCard } from "@/app/admin/_components/kpi-card";
import { ease, Stagger, StaggerItem, useAppear } from "@/app/admin/_components/motion";
import { PageHeader } from "@/app/admin/_components/page-header";
import { Panel } from "@/app/admin/_components/panel";
import { formatEur } from "@/lib/ledger/compute";
import { formatDate } from "../poslovanje/_components/format";
import { updateProfile } from "./actions";

export type ProfileData = {
  name: string;
  email: string;
  pair: string | null;
  stats: {
    year: number;
    fullRuns: number;
    hours: number;
    km: number;
    helps: number;
    months: number[];
    settlement: { paid: number; refunded: number; due: number; instruction: string } | null;
    recent: { id: number; date: string; client: string; role: string; total: number }[];
  } | null;
};

export function ProfileView({ data }: { data: ProfileData }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const { stats } = data;

  const fields: FieldSpec[] = [
    { key: "name", label: "Ime", kind: "text", required: true, initial: data.name },
    { key: "email", label: "E-pošta", kind: "email", required: true, initial: data.email },
    { key: "password", label: "Novo geslo", kind: "password", placeholder: "Pusti prazno" },
    { key: "password2", label: "Ponovi geslo", kind: "password" },
  ];

  const editButton = (
    <motion.button
      type="button"
      onClick={() => setEditing(true)}
      whileTap={{ scale: 0.96 }}
      className="flex items-center gap-2 rounded-full border border-adm-ink px-[18px] py-2.5 text-sm transition-colors hover:bg-adm-ink hover:text-adm-bg"
    >
      <Pencil className="size-3.5" /> Uredi profil
    </motion.button>
  );

  return (
    <>
      <PageHeader
        eyebrow="Moj profil"
        title={data.name}
        leading={
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="grid size-16 shrink-0 place-items-center rounded-full bg-adm-ink font-display text-[32px] text-adm-bg sm:size-[84px] sm:text-[40px]"
          >
            {data.name.charAt(0).toUpperCase()}
          </motion.span>
        }
        subtitle={
          <span className="flex flex-wrap items-center gap-2">
            {data.email}
            {data.pair && <span className="rounded-full border border-adm-soft px-2.5 py-0.5 text-xs text-adm-ink">Par: {data.pair}</span>}
          </span>
        }
        action={editButton}
      />

      {stats ? (
        <>
          <Stagger className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
            <KpiCard size="md" label={`Polne izvedbe ${stats.year}`} value={stats.fullRuns} format="int" sub={`${stats.helps}× začetna pomoč`} />
            <KpiCard size="md" label="Ure polnih izvedb" value={stats.hours} />
            <KpiCard size="md" label="Kilometri" value={stats.km} format="km" />
            <KpiCard size="md" label="Še za povračilo" value={stats.settlement?.due ?? 0} format="eur" dark />
          </Stagger>

          <div className="flex flex-wrap gap-5">
            <Panel title="Moji dogodki po mesecih" note="polne izvedbe in začetne pomoči" className="flex-[3_1_520px]">
              <ColumnBars columns={MONTHS.map((label, i) => ({ label, value: stats.months[i] }))} color={PALETTE[1]} />
            </Panel>
            <Panel title={`Moja poravnava${data.pair ? ` · ${data.pair}` : ""}`} className="flex-[2_1_340px] gap-3.5">
              {stats.settlement ? <Settlement {...stats.settlement} /> : <span className="text-sm text-adm-muted">Račun ni vezan na par.</span>}
            </Panel>
          </div>

          <div className="flex flex-wrap gap-5">
            <Panel title="Moji zadnji dogodki" className="flex-[3_1_520px] gap-2">
              <Stagger className="flex flex-col">
                {stats.recent.map((e) => (
                  <StaggerItem
                    key={e.id}
                    className="grid grid-cols-[90px_minmax(0,1fr)_auto] items-center gap-3 border-t border-adm-rule py-[11px] text-sm sm:grid-cols-[110px_minmax(0,1fr)_auto_auto] sm:gap-4"
                  >
                    <span className="text-adm-muted tabular">{formatDate(e.date)}</span>
                    <span className="truncate">{e.client}</span>
                    <span className="hidden rounded-full bg-adm-sand px-2.5 py-0.5 text-xs sm:inline">{e.role}</span>
                    <span className="min-w-[80px] text-right tabular">{formatEur(e.total)}</span>
                  </StaggerItem>
                ))}
                {stats.recent.length === 0 && <span className="text-sm text-adm-muted">Ni še dogodkov.</span>}
              </Stagger>
            </Panel>
            <Account data={data} onEdit={() => setEditing(true)} />
          </div>
        </>
      ) : (
        <Account data={data} onEdit={() => setEditing(true)} />
      )}

      <FormDialog
        open={editing}
        onOpenChange={setEditing}
        eyebrow="Moj profil"
        title="Uredi profil"
        fields={fields}
        validate={(v) => (v.password !== v.password2 ? "Gesli se ne ujemata" : null)}
        onSubmit={async (values) => {
          const error = await updateProfile(values);
          if (error) return error;
          setEditing(false);
          toast.success("Profil je posodobljen");
          router.refresh();
          return null;
        }}
      />
    </>
  );
}

function Settlement({ paid, refunded, due, instruction }: { paid: number; refunded: number; due: number; instruction: string }) {
  const [ref, inView] = useAppear<HTMLDivElement>();
  return (
    <>
      <span className="font-display text-[34px] leading-none tabular">{formatEur(due)}</span>
      <div ref={ref} className="h-2 overflow-hidden rounded-full bg-adm-track">
        <motion.div
          className="h-full rounded-full"
          style={{ background: PALETTE[2] }}
          initial={{ width: 0 }}
          animate={{ width: inView && paid ? `${Math.min((refunded / paid) * 100, 100)}%` : 0 }}
          transition={{ duration: 0.9, ease }}
        />
      </div>
      <div className="flex flex-col">
        {[
          ["Osebno plačano", formatEur(paid)],
          ["Povrnjeno", formatEur(refunded)],
          ["Še za povračilo", formatEur(due)],
        ].map(([label, value], i) => (
          <div key={label} className={`flex justify-between border-t border-adm-rule py-[9px] text-sm tabular ${i === 2 ? "font-semibold" : ""}`}>
            <span>{label}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      <span className="text-[13px]">{instruction}</span>
    </>
  );
}

function Account({ data, onEdit }: { data: ProfileData; onEdit: () => void }) {
  return (
    <Panel title="Račun" className="flex-[2_1_340px] gap-2">
      {[
        ["Ime", data.name],
        ["E-pošta", data.email],
        ["Par", data.pair ?? "—"],
        ["Geslo", "••••••••"],
      ].map(([label, value]) => (
        <div key={label} className="flex justify-between gap-3 border-t border-adm-rule py-2.5 text-sm">
          <span className="text-adm-muted">{label}</span>
          <span className="truncate">{value}</span>
        </div>
      ))}
      <div className="pt-2.5">
        <button type="button" onClick={onEdit} className="rounded-full border border-adm-ink px-3.5 py-2 text-[13px] transition-colors hover:bg-adm-ink hover:text-adm-bg">
          Spremeni podatke
        </button>
      </div>
    </Panel>
  );
}
