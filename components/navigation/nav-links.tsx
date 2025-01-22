"use client";

import { navigation } from "@/content/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavLinksProps {
  isScrolled: boolean;
}

export function NavLinks({ isScrolled }: NavLinksProps) {
  return (
    <nav className="hidden md:flex items-center gap-6">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-brand",
            isScrolled ? "text-gray-900 dark:text-gray-100" : "text-white"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
