"use client";

import { Inbox, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { InquiryWithOffers } from "@/lib/db/inquiries";
import { plural } from "./charts";
import { groupByEventDate, matchesQuery } from "./inquiry-groups";
import { InquiryMonthGroup } from "./inquiry-month-group";
import { Reveal, Stagger } from "./motion";
import { OfferDialog } from "./offer-dialog";

const PAGE = 3;

type Props = { inquiries: InquiryWithOffers[]; empty: string; viewLabel: string };

export function InquiryList({ inquiries, empty, viewLabel }: Props) {
  const [active, setActive] = useState<InquiryWithOffers | null>(null);
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);
  // Only groups the admin toggled are stored; the rest use their default (past/undated start closed).
  const [toggled, setToggled] = useState<Record<string, boolean>>({});

  const searching = query.trim().length > 0;
  const groups = useMemo(
    () => groupByEventDate(searching ? inquiries.filter((inquiry) => matchesQuery(inquiry, query)) : inquiries),
    [inquiries, query, searching],
  );
  const visible = searching ? groups : groups.slice(0, shown);
  const hidden = groups.slice(shown);
  const isOpen = (key: string, muted?: boolean) => (searching ? true : toggled[key] ?? !muted);

  // Links from the calendar point at a card that may sit in a closed or not yet loaded month.
  useEffect(() => {
    const id = Number(window.location.hash.match(/^#povprasevanje-(\d+)$/)?.[1]);
    if (!id) return;
    const index = groups.findIndex((group) => group.inquiries.some((inquiry) => inquiry.id === id));
    if (index < 0) return;
    setShown((current) => Math.max(current, index + 1));
    setToggled((current) => ({ ...current, [groups[index].key]: true }));
    const timer = window.setTimeout(
      () => document.getElementById(`povprasevanje-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }),
      150,
    );
    return () => window.clearTimeout(timer);
    // Runs once on arrival; later re-groupings (search, refresh) must not scroll again.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (inquiries.length === 0) {
    return (
      <Reveal className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-adm-soft px-6 py-16 text-center text-adm-muted">
        <Inbox className="size-8" />
        {empty}
      </Reveal>
    );
  }

  return (
    <>
      <label className="flex items-center gap-2.5 rounded-full border border-adm-soft bg-adm-card px-4 py-2.5 text-sm transition-colors focus-within:border-adm-ink">
        <Search className="size-4 shrink-0 text-adm-muted" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={`Išči med »${viewLabel}« – ime, e-pošta, telefon, lokacija, datum ...`}
          aria-label="Išči povpraševanja"
          className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-adm-faint [&::-webkit-search-cancel-button]:hidden"
        />
        {searching && (
          <>
            <span className="shrink-0 tabular text-adm-muted">
              {plural(groups.reduce((sum, group) => sum + group.inquiries.length, 0), "zadetek", "zadetka", "zadetki", "zadetkov")}
            </span>
            <button type="button" onClick={() => setQuery("")} aria-label="Počisti iskanje" className="text-adm-muted hover:text-adm-ink">
              <X className="size-4" />
            </button>
          </>
        )}
      </label>

      {groups.length === 0 ? (
        <p className="m-0 rounded-2xl border border-dashed border-adm-soft px-6 py-10 text-center text-adm-muted">
          Ni zadetkov za »{query.trim()}« med »{viewLabel}«.
        </p>
      ) : (
        <Stagger className="flex flex-col gap-4">
          {visible.map((group) => (
            <InquiryMonthGroup
              key={group.key}
              group={group}
              open={isOpen(group.key, group.muted)}
              onOpenChange={(open) => setToggled((current) => ({ ...current, [group.key]: open }))}
              onGenerate={setActive}
            />
          ))}
        </Stagger>
      )}

      {!searching && hidden.length > 0 && (
        <button
          type="button"
          onClick={() => setShown((current) => current + PAGE)}
          className="self-center rounded-full border border-adm-ink px-5 py-2.5 text-sm transition-colors hover:bg-adm-ink hover:text-adm-bg"
        >
          Prikaži več · še{" "}
          {plural(hidden.reduce((sum, group) => sum + group.inquiries.length, 0), "povpraševanje", "povpraševanji", "povpraševanja", "povpraševanj")}
        </button>
      )}

      {active && <OfferDialog key={active.id} inquiry={active} onClose={() => setActive(null)} />}
    </>
  );
}
