"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeroBookingDialog } from "./hero-booking-dialog";

interface CTAProps {
  badge?: {
    text: string;
  };
  title: string;
  description?: string;
  action: {
    text: string;
    variant?: "default" | "outline" | "glow";
  };
  withGlow?: boolean;
  className?: string;
}

export function CTASection({
  title,
  description,
  action,
  withGlow = true,
  className,
}: CTAProps) {
  return (
    <section className={cn("overflow-hidden pt-0 md:pt-0", className)}>
      <div className="relative mx-auto flex max-w-container flex-col items-center gap-6 px-8 py-12 text-center sm:gap-8 md:py-24">
        <h2 className="text-3xl font-semibold sm:text-5xl opacity-0 animate-fade-in-up delay-200">
          {title}
        </h2>

        {description && (
          <p className="text-muted-foreground opacity-0 animate-fade-in-up delay-300">
            {description}
          </p>
        )}
        <HeroBookingDialog>
          <Button
            variant="glow"
            size="lg"
            className="opacity-0 animate-fade-in-up delay-500"
          >
            {action.text}
          </Button>
        </HeroBookingDialog>

        {withGlow && (
          <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 animate-scale-in delay-700">
            <div className="absolute inset-0 bg-[#C99566]/20 blur-3xl" />
          </div>
        )}
      </div>
    </section>
  );
}
