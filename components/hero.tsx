"use client";
import React from "react";
import { useNavigation } from "./navigation/navigation-context";
import ScrollIndicator from "./scroll-indicator";
import { FadeIn } from "./ui/fade-in";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  const { scrolled } = useNavigation();

  return (
    <section
      className={`min-h-[60vh] 2xl:min-h-[854px] text-white relative ${
        scrolled
          ? "pt-16 md:pt-20"
          : "pt-[calc(64px+48px)] md:pt-[calc(80px+48px)]"
      }`}
    >
      {/* Background Image with Gradient Overlay */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-[url('/application/eventaj-hero-image.webp')] 
          gradient-overlay"
      />

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-[60vh] 2xl:min-h-[854px]">
        <div className="container mx-auto px-4 text-center">
          {/* Rating display */}
          <FadeIn
            delay={0.2}
            className="flex items-center justify-center gap-1 mb-3 md:mb-6"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-500"
                />
              ))}
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-800 flex items-center justify-center">
                <span>A</span>
              </div>
            </div>
            <span className="ml-4 text-sm md:text-base">
              Več kot 10 zadovoljnih strank
            </span>
          </FadeIn>

          {/* Main heading */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-baloo mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.19, 1, 0.22, 1],
            }}
          >
            360°{" "}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              photo booth
            </motion.span>
          </motion.h1>

          {/* Subtext */}
          <FadeIn
            delay={0.8}
            className="max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto mb-8 md:mb-12"
          >
            <p className="text-base sm:text-lg md:text-xl">
              Preizkusite 360° photo booth, ki vas ujame iz povsem drugačne
              perspektive – prav iz vseh kotov! Naš 360° photo booth je pravi
              prvak pri ustvarjanju visokokakovostnih 360° videov.
            </p>
          </FadeIn>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
          >
            <Button
              variant="glow"
              size="lg"
              asChild
              className="w-full sm:w-auto"
            >
              <Link href="/kontakt">Rezerviraj termin</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="w-full sm:w-auto bg-transparent"
            >
              <Link href="#kako-deluje">Kako deluje?</Link>
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </div>
    </section>
  );
};

export default Hero;
