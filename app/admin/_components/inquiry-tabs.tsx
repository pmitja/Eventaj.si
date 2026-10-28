import Link from "next/link";
import { cn } from "@/lib/utils";
import { INQUIRY_VIEWS, type InquiryView } from "./inquiry-groups";

type Props = { active: InquiryView; counts: Record<InquiryView["slug"], number> };

export function InquiryTabs({ active, counts }: Props) {
  return (
    <nav aria-label="Prikaz povpraševanj" className="flex flex-wrap gap-1.5 text-sm">
      {INQUIRY_VIEWS.map((view) => {
        const current = view.slug === active.slug;
        return (
          <Link
            key={view.slug}
            href={view.slug === INQUIRY_VIEWS[0].slug ? "/admin" : `/admin?prikaz=${view.slug}`}
            aria-current={current ? "page" : undefined}
            className={cn(
              "flex items-center gap-2 rounded-full border px-4 py-2 transition-colors",
              current
                ? "border-adm-ink bg-adm-ink !text-adm-bg"
                : "border-adm-soft text-adm-muted hover:border-adm-ink hover:!text-adm-ink",
            )}
          >
            {view.label}
            <span className={cn("tabular text-xs", current ? "text-adm-soft" : "text-adm-faint")}>{counts[view.slug]}</span>
          </Link>
        );
      })}
    </nav>
  );
}
