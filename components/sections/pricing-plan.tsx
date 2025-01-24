"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { HeroBookingDialog } from "./hero-booking-dialog";

interface PricingPlanProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  index: number;
}

export function PricingPlan({
  title,
  description,
  price,
  features,
  index,
}: PricingPlanProps) {
  const pathname = usePathname();
  const defaultBoothType = pathname.includes("360")
    ? "360-photo-booth"
    : "photo-booth";

  return (
    <div className="relative flex flex-col p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      <div className="mt-4">
        <span className="text-4xl font-bold text-gray-900 dark:text-white">
          {price}
        </span>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          /dogodek
        </span>
      </div>
      <ul className="mt-4 space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="text-sm text-gray-900 dark:text-white">
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <HeroBookingDialog
          defaultBoothType={defaultBoothType}
          defaultPackage={index}
        >
          <Button variant="glow" className="w-full">
            Rezerviraj termin
          </Button>
        </HeroBookingDialog>
      </div>
    </div>
  );
}
