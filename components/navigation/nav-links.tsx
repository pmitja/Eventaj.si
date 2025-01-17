"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
            className="opacity-90 hover:opacity-100 text-base md:text-sm font-medium transition-colors py-2 md:py-0"
            aria-current={link.href === pathname ? "page" : undefined}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
