"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { InquiryWithOffers } from "@/lib/db/inquiries";
import { cn } from "@/lib/utils";
import { InquiryCard } from "./inquiry-card";
import type { CrewLists } from "./inquiry-crew";
import type { InquiryGroup } from "./inquiry-groups";

type Props = {
  group: InquiryGroup;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate: (inquiry: InquiryWithOffers) => void;
  crewLists: CrewLists;
};

export function InquiryMonthGroup({ group, open, onOpenChange, onGenerate, crewLists }: Props) {
  return (
    <Collapsible open={open} onOpenChange={onOpenChange} asChild>
      <section aria-label={group.label} className="flex flex-col">
        <CollapsibleTrigger
          className={cn(
            "group flex items-center gap-2.5 border-b border-adm-line pb-2 pt-2 text-left transition-colors hover:text-adm-accent",
            group.muted && "text-adm-muted",
          )}
        >
          <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }} className="text-adm-muted">
            <ChevronRight className="size-5" />
          </motion.span>
          <span className="font-display text-2xl font-normal">{group.label}</span>
          <span className="text-sm tabular text-adm-faint">{group.inquiries.length}</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="flex flex-col gap-5 pb-2 pt-4">
            {group.inquiries.map((inquiry) => (
              <InquiryCard key={inquiry.id} inquiry={inquiry} onGenerate={() => onGenerate(inquiry)} crewLists={crewLists} />
            ))}
          </div>
        </CollapsibleContent>
      </section>
    </Collapsible>
  );
}
