"use client";

import { Toaster } from "sonner";

// Dark pill at the bottom centre, as in the dashboard design.
export function AdminToaster() {
  return (
    <Toaster
      theme="light"
      position="bottom-center"
      offset={28}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex items-center gap-2.5 rounded-full bg-adm-ink px-5 py-3 text-sm text-adm-bg shadow-[0_12px_30px_rgba(28,24,20,.25)] font-[Instrument_Sans,system-ui,sans-serif]",
          icon: "[&>svg]:size-4",
          success: "[&_[data-icon]]:text-[#9FB27A]",
          error: "[&_[data-icon]]:text-[#E8A487]",
        },
      }}
    />
  );
}
