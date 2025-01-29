"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useNavigation } from "./navigation/navigation-context";
import ScrollIndicator from "./scroll-indicator";
import { HeroBookingDialog } from "./sections/hero-booking-dialog";
import { FadeIn } from "./ui/fade-in";

const ThreeSixtyHero = () => {
  const { scrolled } = useNavigation();

  const getVideoUrl = (src: string) => {
    return process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_BASE_URL}${src}`
      : src;
  };

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
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-[url('/application/360-hero-image.webp')] darker-gradient-overlay"
      />

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-[60vh] 2xl:min-h-[854px]">
        <div className="container mx-auto px-4 text-center">
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
            360° Photo booth
          </motion.h1>

          {/* Subtext */}
          <FadeIn
            delay={0.8}
            className="max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto mb-8 md:mb-12"
          >
            <p className="text-base sm:text-lg md:text-xl">
              Zajame vaše trenutke v edinstvenih 360° videoposnetkih. Popolna
              izbira za vse vrste dogodkov.
            </p>
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

        {/* Video Preview */}
        <div className="absolute inset-0 -z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="object-cover w-full h-full"
            controlsList="nodownload"
            poster={`${process.env.NEXT_PUBLIC_BASE_URL}/application/360-booth-preview-poster.webp`}
          >
            <source
              src={getVideoUrl("/360-booth-preview.mp4")}
              type="video/mp4"
            />
            <source
              src={getVideoUrl("/360-booth-preview.webm")}
              type="video/webm"
            />
            <p>
              Your browser doesn&apos;t support HTML video. Here is a
              <a href={getVideoUrl("/360-booth-preview.mp4")}>
                link to the video
              </a>{" "}
              instead.
            </p>
          </video>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </div>
    </section>
  );
};

export default ThreeSixtyHero;
