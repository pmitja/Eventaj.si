"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { NavLinks } from "./nav-links";
import { HamburgerMenu } from "./hamburger-menu";
import { MobileMenu } from "./mobile-menu";
import Logo from "../logo";
import { Button } from "../ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";

interface NavbarProps {
  scrolled: boolean;
}

const Navbar = ({ scrolled }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav
      aria-label="Main navigation"
      className={`transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-background/80 backdrop-blur-sm border-b border-border shadow-sm text-foreground"
          : "bg-transparent text-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center flex-shrink-0 mr-auto"
            aria-label="Go to homepage"
          >
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div
            className="hidden md:flex items-center justify-center flex-grow gap-8"
            role="navigation"
          >
            <NavLinks />
          </div>

          {/* Rezerviraj Button */}
          <div className="hidden md:block flex-shrink-0">
            <Button
              variant="glow"
              size="lg"
              asChild
              className="w-full sm:w-auto"
              aria-label="Rezerviraj"
            >
              <Link href="/kontakt">Rezerviraj termin</Link>
            </Button>
          </div>

          {/* Add Theme Switcher */}
          <div className="flex items-center ml-auto md:ml-4">
            <ThemeSwitcher />
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden ml-4">
            <HamburgerMenu
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-menu" aria-hidden={!isOpen}>
        <MobileMenu isOpen={isOpen} />
      </div>
    </nav>
  );
};

export default Navbar;
