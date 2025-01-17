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
      <nav
        role="navigation"
        aria-label="Mobile navigation"
        className="container mx-auto px-4 py-6 h-screen"
      >
        <NavLinks />
        <div className="mt-6 flex justify-center">
          <button
            className="bg-[#C89364] text-white px-6 py-2.5 rounded-lg hover:bg-[#b88357] transition-colors text-sm font-medium"
            aria-label="Rezerviraj"
          >
            Rezerviraj
          </button>
        </div>
      </nav>
    </div>
  );
};
