"use client";

import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { usePathname } from "next/navigation";
import { HeroBookingDialog } from "../sections/hero-booking-dialog";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  isPopular: boolean;
}

export type { PricingPlan };

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function PricingPlans({
  plans,
  title = "Izberi paket po tvoji meri",
  description = "Vsi paketi vključujejo postavitev in upravljanje za celoten čas najema.",
}: PricingProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const pathname = usePathname();

  // Determine the default booth type based on the current page
  const getDefaultBoothType = () => {
    if (pathname === "/photo-booth") return "photo-booth";
    if (pathname === "/360-photo-booth") return "360-photo-booth";
    return undefined;
  };

  return (
    <div className="container py-20">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h2>
        <p className="text-muted-foreground text-lg whitespace-pre-line">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 sm:2 gap-4">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 1 }}
            whileInView={
              isDesktop
                ? {
                    y: plan.isPopular ? -20 : 0,
                    opacity: 1,
                    x: index === 2 ? -30 : index === 0 ? 30 : 0,
                    scale: index === 0 || index === 2 ? 0.94 : 1.0,
                  }
                : {}
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.4,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              `rounded-2xl border-[1px] p-6 bg-background text-center lg:flex lg:flex-col lg:justify-center relative`,
              plan.isPopular ? "border-[#C99566] border-2" : "border-border",
              "flex flex-col",
              !plan.isPopular && "mt-5",
              index === 0 || index === 2
                ? "z-0 transform translate-x-0 translate-y-0 -translate-z-[50px] rotate-y-[10deg]"
                : "z-10",
              index === 0 && "origin-right",
              index === 2 && "origin-left"
            )}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-[#C99566] py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                <Star className="text-white h-4 w-4 fill-current" />
                <span className="text-white ml-1 font-sans font-semibold">
                  Najbolj priljubljen
                </span>
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <p className="text-base font-semibold text-muted-foreground">
                {plan.name}
              </p>
              <div className="mt-6 flex items-center justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-foreground">
                  {plan.price}€
                </span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                  / {plan.period}
                </span>
              </div>

              <ul className="mt-8 gap-3 flex flex-col">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#C99566] mt-1 flex-shrink-0" />
                    <span className="text-left">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <HeroBookingDialog
                  defaultBoothType={getDefaultBoothType()}
                  defaultPackage={index}
                >
                  <Button
                    variant={"glow"}
                    className="group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter"
                  >
                    Rezerviraj termin
                  </Button>
                </HeroBookingDialog>
                <p className="mt-6 text-xs leading-5 text-muted-foreground">
                  {plan.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
