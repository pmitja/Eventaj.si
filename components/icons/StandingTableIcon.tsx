import type { SVGProps } from "react";

export function StandingTableIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 5.25h16" />
      <path d="M6.25 5.25c.35 2.2 2.2 3.75 4.45 3.75h2.6c2.25 0 4.1-1.55 4.45-3.75" />
      <path d="m10.4 9-2.15 10.25" />
      <path d="m13.6 9 2.15 10.25" />
      <path d="M6.75 19.25h10.5" />
    </svg>
  );
}
