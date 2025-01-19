import { Button } from "../ui/button";
import { NavLinks } from "./nav-links";

interface MobileMenuProps {
  isOpen: boolean;
}

export const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      className={`md:hidden transition-all duration-300 absolute w-full ${
        isOpen
          ? "bg-background/95 backdrop-blur-sm border-b border-border opacity-100 visible"
          : "opacity-0 invisible"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          <NavLinks />
          <Button variant="glow" size="lg" asChild>
            <a href="/kontakt">Rezerviraj termin</a>
          </Button>
        </div>
      </div>
    </div>
  );
};
