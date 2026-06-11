import { trustedNames } from "@/content/eventaj/data";

export function TrustLogosText() {
  return (
    <div className="mt-24 border-t border-[rgba(20,17,15,0.1)] pt-14">
      <div className="mb-7 text-center text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
        Zaupajo nam
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 lg:justify-between">
        {trustedNames.map((name) => (
          <span
            key={name}
            className="font-serif-display text-[22px] font-normal tracking-[0.02em] text-[var(--eventaj-ink)] opacity-50"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
