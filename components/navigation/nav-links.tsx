"use client";

import { navigation } from "@/content/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinksProps {
  isScrolled: boolean;
}

export function NavLinks({ isScrolled }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-6">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "text-md font-medium transition-colors hover:text-primary relative pb-1",
              isScrolled
                ? "text-gray-900 dark:text-foreground"
                : "text-white dark:text-white",
              isActive &&
                "after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-primary"
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
