"use client";
import { useState, useEffect } from "react";
import Navbar from "./navbar";
import TopBanner from "./top-banner";
import { NavigationContext } from "./navigation-context";

interface WithNavigationProps {
  showBanner?: boolean;
}

const WithNavigation = ({ showBanner = true }: WithNavigationProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 48) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <NavigationContext.Provider value={{ scrolled }}>
      <header className="fixed top-0 left-0 right-0 z-50" role="banner">
        {showBanner && (
          <TopBanner isVisible={!scrolled} isScrolled={scrolled} />
        )}
        <Navbar scrolled={scrolled} />
      </header>
    </NavigationContext.Provider>
  );
};

export default WithNavigation;
