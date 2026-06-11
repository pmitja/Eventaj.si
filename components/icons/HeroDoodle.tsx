import { cn } from "@/lib/utils";

type HeroDoodleType = "star" | "loop" | "spark" | "confetti" | "balloons";

export function HeroDoodle({
  type,
  className,
}: {
  type: HeroDoodleType;
  className: string;
}) {
  const props = {
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: cn(
      "pointer-events-none absolute z-[3] hidden md:block",
      className,
    ),
    "aria-hidden": true,
  };

  if (type === "star") {
    return (
      <svg {...props}>
        <path d="M32 6l6.7 18.2L58 25.2 42.7 37.1 47.7 56 32 45.2 16.3 56l5-18.9L6 25.2l19.3-1L32 6z" />
      </svg>
    );
  }

  if (type === "loop") {
    return (
      <svg {...props}>
        <path d="M17 44c10 8 24 3 23-7-.7-7.4-12.8-7.8-15.8-1.2-4.1 9 10.9 13.6 20.8 2.2 6.2-7.2 2.2-17.4-7.6-18.4" />
        <path d="M36 19c-4.4-.8-7.8.4-10 3.5" />
      </svg>
    );
  }

  if (type === "spark") {
    return (
      <svg {...props}>
        <path d="M32 8v10M32 46v10M8 32h10M46 32h10M15 15l7 7M42 42l7 7M49 15l-7 7M22 42l-7 7" />
        <circle cx="32" cy="32" r="3" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === "balloons") {
    return (
      <svg {...props}>
        <ellipse
          cx="23"
          cy="20"
          rx="11"
          ry="15"
          fill="currentColor"
          opacity="0.2"
        />
        <ellipse
          cx="41"
          cy="17"
          rx="10"
          ry="14"
          fill="currentColor"
          opacity="0.16"
        />
        <path d="M23 35c0 9-10 10-8 19M41 31c0 11 8 12 5 23" />
        <path d="M20 35h6M38 31h6" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M15 36c8-12 2-17-4-11M29 15c5 12 15 11 18 2M33 49c9-5 12 0 15 5" />
      <path d="M16 50l4-3M48 36l5 2M24 24l3-5" />
    </svg>
  );
}
