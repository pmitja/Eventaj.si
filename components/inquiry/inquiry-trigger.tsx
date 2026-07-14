"use client";

import { ReactNode } from "react";
import type { InquiryData } from "./inquiry-types";

export function openInquiryDialog(defaults: Partial<InquiryData> = {}) {
  window.dispatchEvent(
    new CustomEvent<Partial<InquiryData>>("eventaj:open-inquiry", {
      detail: defaults,
    }),
  );
}

export function InquiryTrigger({
  children,
  className,
  defaults,
}: {
  children: ReactNode;
  className?: string;
  defaults?: Partial<InquiryData>;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => openInquiryDialog(defaults)}
    >
      {children}
    </button>
  );
}
