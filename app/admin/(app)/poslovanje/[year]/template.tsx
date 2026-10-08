"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ease } from "@/app/admin/_components/motion";

// Re-mounts on every navigation, so each page fades in.
export default function AdminTemplate({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease }}
      className="flex min-w-0 flex-col gap-7"
    >
      {children}
    </motion.div>
  );
}
