"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { navigation } from "@/content/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeroBookingDialog } from "../sections/hero-booking-dialog";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-sm p-0">
        <SheetHeader className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center flex-row">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <Link href="/" className="-m-1.5 p-1.5 w-fit">
            <span className="sr-only">Eventaj</span>
            <Image
              className="h-12 w-auto"
              src="/application/mobile-logo.svg"
              alt="Eventaj"
              width={32}
              height={32}
            />
          </Link>
          <Button
            variant="ghost"
            className="rounded-full p-0"
            onClick={onClose}
            aria-label="Close mobile menu"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </Button>
        </SheetHeader>
        <div className="mt-6 flow-root px-6">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <SheetClose asChild key={item.name}>
                  <div className="flex flex-row items-center justify-between">
                    <Link
                      href={item.href}
                      className={cn(
                        "w-full flex flex-row items-center justify-between",
                        pathname === item.href
                          ? "text-[#C99566] -mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7"
                          : "text-gray-900 dark:text-white hover:text-[#C99566] dark:hover:text-[#C99566] -mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7"
                      )}
                      onClick={onClose}
                    >
                      <span>{item.name}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <div className="px-3 pt-4">
                  <HeroBookingDialog>
                    <Button variant="glow" size="lg" className="w-full">
                      Rezerviraj termin
                    </Button>
                  </HeroBookingDialog>
                </div>
              </SheetClose>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
