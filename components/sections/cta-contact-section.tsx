"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CTABookingDialog } from "./cta-booking-dialog";

export interface CTAContactSectionProps {
  title: string;
  description: string;
  action: {
    text: string;
    variant?: "default" | "outline" | "glow";
  };
  isGlow?: boolean;
  className?: string;
}

export function CTAContactSection({
  title,
  description,
  action,
  isGlow = true,
  className,
}: CTAContactSectionProps) {
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
        <CTABookingDialog>
          <Button
            variant="glow"
            size="lg"
            className="opacity-0 animate-fade-in-up delay-500"
          >
            {action.text}
          </Button>
        </CTABookingDialog>

        {isGlow && (
          <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 animate-scale-in delay-700">
            <div className="absolute inset-0 bg-[#C99566]/20 blur-3xl" />
          </div>
        )}
      </div>
    </section>
  );
}
