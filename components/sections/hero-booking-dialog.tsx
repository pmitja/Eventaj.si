"use client";

import { BookingForm } from "@/components/forms/booking-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export interface HeroBookingDialogProps {
  children: React.ReactNode;
  defaultBoothType?: "photo-booth" | "360-booth";
  defaultPackage?: number;
}

export function HeroBookingDialog({
  children,
  defaultBoothType,
  defaultPackage,
}: HeroBookingDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Rezervirajte termin</DialogTitle>
          <DialogDescription>
            Izpolnite obrazec in rezervirajte termin za vaš dogodek.
          </DialogDescription>
        </DialogHeader>
        <BookingForm
          onSuccess={() => setOpen(false)}
          defaultBoothType={defaultBoothType}
          defaultPackage={defaultPackage}
        />
      </DialogContent>
    </Dialog>
  );
}
