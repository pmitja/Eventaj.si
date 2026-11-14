import { marqueeItems } from "@/content/eventaj/data";

/** The occasions as one still, centred line, set like the guest list on an invitation. */
export function OccasionRibbon() {
  return (
    <div className="ev-dark border-t border-[var(--ev-rule-dark)] py-8 md:py-10">
      <p className="sr-only">Izvajamo: {marqueeItems.join(", ")}.</p>
      <ul
        aria-hidden="true"
        className="ev-wrap flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-center xl:gap-x-0"
      >
        {marqueeItems.map((item, index) => (
          <li key={item} className="flex items-center">
            {index > 0 && <span className="mx-8 hidden h-1 w-1 rounded-full bg-[var(--ev-champagne)] xl:block" />}
            <span className="ev-display text-[20px] leading-none text-[var(--ev-porcelain)] md:text-[24px]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
