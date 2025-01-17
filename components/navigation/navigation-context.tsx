"use client";
import { createContext, useContext } from "react";

interface NavigationContextType {
  scrolled: boolean;
}

export const NavigationContext = createContext<NavigationContextType>({
  scrolled: false,
});

export const useNavigation = () => useContext(NavigationContext);
