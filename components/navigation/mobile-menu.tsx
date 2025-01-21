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
        <SheetHeader className="p-6 border-b border-gray-200 dark:border-gray-800">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <Link href="/" className="-m-1.5 p-1.5" onClick={onClose}>
            <span className="sr-only">Eventaj</span>
            <Image
              className="h-12 w-auto"
              src="/application/mobile-logo.svg"
              alt="Eventaj"
              width={32}
              height={32}
            />
          </Link>
        </SheetHeader>
        <div className="mt-6 flow-root px-6">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <SheetClose asChild key={item.name}>
                  <Link
                    href={item.href}
                    className={
                      pathname === item.href
                        ? "text-[#C99566] -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7"
                        : "text-gray-900 dark:text-white hover:text-[#C99566] dark:hover:text-[#C99566] -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7"
                    }
                    onClick={onClose}
                  >
                    {item.name}
                  </Link>
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
