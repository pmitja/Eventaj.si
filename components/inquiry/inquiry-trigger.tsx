"use client";

import { ReactNode } from "react";

export function openInquiryDialog() {
  window.dispatchEvent(new CustomEvent("eventaj:open-inquiry"));
}

export function InquiryTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button type="button" className={className} onClick={openInquiryDialog}>
      {children}
    </button>
  );
}
