"use client";

import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { DesktopNav } from "./desktop-nav";
import { HamburgerButton } from "./hamburger-button";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader({
  scrolled,
  menuOpen,
  onToggleMenu,
  pathname,
}: {
  scrolled: boolean;
  menuOpen: boolean;
  onToggleMenu: () => void;
  pathname: string;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Glavna navigacija"
        className={cn(
          "flex items-center justify-between px-5 transition-all duration-300 md:px-10",
          scrolled || menuOpen
            ? "border-b border-[rgba(20,17,15,0.08)] bg-[rgba(251,248,242,0.92)] py-3 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-5 md:py-6",
        )}
      >
        <Link
          href="/"
          className="flex items-center text-[var(--eventaj-ink)] no-underline [&_svg]:h-8 [&_svg]:w-auto md:[&_svg]:h-10"
          aria-label="Eventaj.si domov"
        >
          <Logo />
        </Link>

        <DesktopNav pathname={pathname} />

        <HamburgerButton open={menuOpen} onToggle={onToggleMenu} />
      </nav>

      {menuOpen && <MobileMenu />}
    </header>
  );
}
