"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const NavLinks = () => {
  const pathname = usePathname();
  const links = [
    { href: "/360-photo-booth", label: "360° Photo Booth" },
    { href: "/photo-booth", label: "Photo Booth" },
    { href: "/ozadja", label: "Ozadja" },
    { href: "/rekviziti", label: "Rekviziti" },
    { href: "/reference", label: "Reference" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <ul className="flex md:flex-row flex-col items-center gap-6" role="list">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={cn(
              "opacity-90 hover:opacity-100 transition-colors",
              "text-lg md:text-base font-medium",
              "py-3 md:py-0",
              "hover:text-primary dark:hover:text-primary"
            )}
            aria-current={link.href === pathname ? "page" : undefined}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
