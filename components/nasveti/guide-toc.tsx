"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

/**
 * Sticky table of contents with scroll spy. The active id is the last heading
 * that has crossed the top reading line, so the highlight never blanks out
 * between two sections.
 */
export function GuideToc({ items }: { items: readonly TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    if (headings.length === 0) return;

    const update = () => {
      const readingLine = 140;
      let current = headings[0];
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= readingLine) current = heading;
      }
      setActiveId(current.id);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <nav aria-label="Vsebina strani" className="lg:sticky lg:top-28">
      <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-muted)]">
        Vsebina
      </div>
      <ol className="grid gap-1 border-l border-[rgba(20,17,15,0.12)]">
        {items.map((item, index) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "true" : undefined}
                className={`-ml-px flex gap-3 border-l py-2 pl-4 text-sm no-underline transition-colors ${
                  active
                    ? "border-[var(--eventaj-accent)] text-[var(--eventaj-ink)]"
                    : "border-transparent text-[var(--eventaj-muted)] hover:text-[var(--eventaj-ink)]"
                }`}
              >
                <span className="tabular-nums opacity-50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Collapsed variant shown above the article on small screens. */
export function GuideTocMobile({ items }: { items: readonly TocItem[] }) {
  return (
    <details className="group border border-[rgba(20,17,15,0.12)] lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-medium marker:hidden">
        Vsebina strani
        <span className="text-xl font-light text-[var(--eventaj-accent)] transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <ol className="grid gap-1 border-t border-[rgba(20,17,15,0.12)] px-5 py-4">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex gap-3 py-1.5 text-sm text-[var(--eventaj-muted)] no-underline"
            >
              <span className="tabular-nums opacity-50">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
