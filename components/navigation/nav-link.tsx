"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname();
  console.log(pathname);
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "relative py-2",
        "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-primary after:transition-transform after:duration-300",
        isActive && "after:scale-x-100",
        className
      )}
    >
      {children}
    </Link>
  );
}
