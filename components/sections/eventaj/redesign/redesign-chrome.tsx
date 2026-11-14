import { evDisplay, evSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { FontScope } from "./font-scope";
import { MobileStickyCta } from "./mobile-sticky-cta";
import { RedesignFooter } from "./redesign-footer";
import { RedesignHeader } from "./redesign-header";
import "./redesign.css";

/** Site-wide chrome of the redesign: fonts, skip link, header, main landmark and footer. */
export function RedesignChrome({ children }: { children: ReactNode }) {
  return (
    <div className={cn("ev", evDisplay.variable, evSans.variable)}>
      <FontScope />
      <a
        href="#ev-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-[var(--ev-champagne)] focus:px-5 focus:py-3 focus:text-[var(--ev-night)]"
      >
        Preskoči na vsebino
      </a>
      <RedesignHeader />
      <main id="ev-main">{children}</main>
      <RedesignFooter />
      <MobileStickyCta />
    </div>
  );
}
