"use client";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../logo";
import { HeroBookingDialog } from "../sections/hero-booking-dialog";
import { Button } from "../ui/button";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";

interface NavbarProps {
  scrolled: boolean;
}

const Navbar = ({ scrolled }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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

  // Handle route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "fixed left-0 right-0 z-40 transition-all duration-300",
        scrolled || isOpen
          ? "top-0 bg-background/80 backdrop-blur-sm border-b border-border shadow-sm text-foreground"
          : "top-14 sm:top-12 bg-background/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none text-foreground dark:text-white"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center flex-shrink-0"
            aria-label="Go to homepage"
          >
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div
            className="hidden lg:flex items-center justify-center flex-1"
            role="navigation"
          >
            <NavLinks isScrolled={scrolled} />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4 ml-auto">
            <div className="hidden lg:block">
              <HeroBookingDialog>
                <Button variant="glow" size="lg">
                  Rezerviraj termin
                </Button>
              </HeroBookingDialog>
            </div>
            <ThemeSwitcher />
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                className="rounded-full p-0"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close main menu" : "Open main menu"}
              >
                {isOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </nav>
  );
};

export default Navbar;
