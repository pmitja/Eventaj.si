interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

export const HamburgerMenu = ({ isOpen, onClick }: HamburgerMenuProps) => {
  return (
    <button
      type="button"
      className="p-2 text-white"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <div className="w-6 h-6 flex items-center justify-center relative">
        {/* Hamburger icon */}
        <span
          className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
            isOpen ? "rotate-45" : "-translate-y-1.5"
          }`}
        />
        <span
          className={`block absolute h-0.5 w-5 bg-current transition-opacity duration-500 ease-in-out ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
            isOpen ? "-rotate-45" : "translate-y-1.5"
          }`}
        />
      </div>
    </button>
  );
};
