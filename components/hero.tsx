"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useNavigation } from "./navigation/navigation-context";
import ScrollIndicator from "./scroll-indicator";
import { HeroBookingDialog } from "./sections/hero-booking-dialog";
import { FadeIn } from "./ui/fade-in";

interface HeroProps {
  title: string;
  text: string;
}

const Hero = ({ title, text }: HeroProps) => {
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
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-[url('/application/eventaj-hero-image.webp')] darker-gradient-overlay"
      />

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-[60vh] 2xl:min-h-[854px]">
        <div className="container mx-auto px-4 text-center">
          {/* Rating display */}
          <FadeIn
            delay={0.2}
            className="flex items-center justify-center gap-1 mb-3 md:mb-6"
          >
            <div className="flex -space-x-2 text-gray-700 font-medium">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 flex items-center justify-center border border-gray-400">
                <span>J</span>
              </div>
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 flex items-center justify-center border border-gray-400">
                <span>K</span>
              </div>
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 flex items-center justify-center border border-gray-400">
                <span>M</span>
              </div>
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 flex items-center justify-center border border-gray-400">
                <Image
                  src="/application/autodelta.webp"
                  alt="Star"
                  width={24}
                  height={24}
                />
              </div>
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 flex items-center justify-center border border-gray-400">
                <Image
                  src="/application/sksg.webp"
                  alt="Star"
                  width={24}
                  height={24}
                />
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
            {title}
          </motion.h1>

          {/* Subtext */}
          <FadeIn
            delay={0.8}
            className="max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto mb-8 md:mb-12"
          >
            <p className="text-base sm:text-lg md:text-xl">{text}</p>
          </FadeIn>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
          >
            <HeroBookingDialog>
              <Button variant="glow" size="lg" className="w-full sm:w-auto">
                Rezerviraj termin
              </Button>
            </HeroBookingDialog>
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
