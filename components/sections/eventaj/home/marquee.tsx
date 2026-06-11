import { marqueeItems } from "@/content/eventaj/data";

export function Marquee() {
  const content = [...marqueeItems, ...marqueeItems, ...marqueeItems];
  return (
    <div className="overflow-hidden border-y border-[rgba(244,239,230,0.1)] bg-[var(--eventaj-ink)] py-5 text-[var(--eventaj-paper)]">
      <div className="flex w-max gap-14 whitespace-nowrap motion-safe:animate-[eventaj-marquee_40s_linear_infinite]">
        {content.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-14"
          >
            <span className="font-serif-italic text-[32px] font-light italic">
              {item}
            </span>
            <span className="text-sm opacity-40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
