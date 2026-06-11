import Link from "next/link";

export function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<[string, string]>;
}) {
  return (
    <div>
      <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--eventaj-cream)] opacity-50">
        {title}
      </div>
      <div className="grid gap-2.5">
        {links.map(([label, href]) => (
          <Link
            key={label}
            href={href}
            className="text-sm text-[var(--eventaj-cream)] opacity-85 no-underline transition-opacity hover:opacity-100"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
