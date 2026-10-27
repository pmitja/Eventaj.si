import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminToaster } from "./_components/admin-toaster";
import { MotionProvider } from "./_components/motion";

export const metadata: Metadata = {
  title: "Admin | Eventaj.si",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-root min-h-screen">
      <MotionProvider>{children}</MotionProvider>
      <AdminToaster />
    </div>
  );
}
