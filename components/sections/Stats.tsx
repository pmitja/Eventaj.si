"use client";

import Section from "../ui/section";
import { cn } from "@/lib/utils";
import { Users, Calendar, Image, Video } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    value: "100%",
    label: "Zadovoljstvo strank",
    description: "Uspešno izvedenih dogodkov",
    icon: Users,
    color: "text-[#6695C9]",
  },
  {
    value: "15+",
    label: "Dogodkov",
    description: "V zadnjem letu",
    icon: Calendar,
    color: "text-[#C89364]",
  },
  {
    value: "1.700+",
    label: "Fotografij",
    description: "Ustvarjenih spominov",
    icon: Image,
    color: "text-[#6695C9]",
  },
  {
    value: "670+",
    label: "Video posnetkov",
    description: "Zabavnih spominov",
    icon: Video,
    color: "text-[#C89364]",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function StatsSection() {
  return (
    <Section className="bg-white dark:bg-background border-y overflow-hidden">
      <div className="container max-w-5xl py-12">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={item}
              className="group flex flex-col items-center md:items-start text-center md:text-left space-y-4"
            >
              <div className="relative">
                <div
                  className={cn(
                    "absolute inset-0 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity",
                    stat.color
                  )}
                />
                <div
                  className={cn(
                    "relative flex items-center justify-center w-12 h-12 rounded-full",
                    "bg-white/90 dark:bg-gray-900/90 shadow-lg backdrop-blur-sm",
                    "transform group-hover:scale-110 transition-transform"
                  )}
                >
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
              </div>
              <div>
                <p className="text-4xl font-bold tracking-tight mb-1">
                  {stat.value}
                </p>
                <p className="font-medium text-foreground mb-1">{stat.label}</p>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
