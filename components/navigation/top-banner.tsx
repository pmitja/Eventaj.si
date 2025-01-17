"use client";

interface TopBannerProps {
  isVisible: boolean;
  isScrolled?: boolean;
}

const TopBanner = ({ isVisible, isScrolled = false }: TopBannerProps) => {
  return (
    <div
      role="alert"
      aria-live="polite"
      className={`bg-muted text-muted-foreground px-4 text-center font-semibold transition-all duration-300 dark:text-white dark:bg-primary/70 ${
        isVisible ? "opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden"
      } ${isScrolled ? "py-0" : "py-3"}`}
    >
      <p className="text-sm md:text-base text-inherit">
        Pokliči in rezerviraj svojega že danes:{" "}
        <a
          href="tel:031285143"
          className="hover:underline"
          aria-label="Pokliči 031 285 143"
        >
          031 285 143
        </a>{" "}
        ali{" "}
        <a
          href="tel:030350300"
          className="hover:underline"
          aria-label="Pokliči 031 544 751"
        >
          031 544 751
        </a>
      </p>
    </div>
  );
};

export default TopBanner;
