"use client";

import { navigation } from "@/content/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex items-center w-full">
      <div className="flex items-center justify-center gap-8 flex-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={
              pathname === item.href
                ? "text-[#C99566] text-sm font-semibold leading-6"
                : "text-gray-900 dark:text-white hover:text-[#C99566] dark:hover:text-[#C99566] text-sm font-semibold leading-6"
            }
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
