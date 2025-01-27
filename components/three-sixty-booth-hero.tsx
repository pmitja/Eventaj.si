"use client";

import { HeroBookingDialog } from "@/components/sections/hero-booking-dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ThreeSixtyBoothHero() {
  return (
    <section className="relative overflow-hidden bg-background pt-[48px]">
      <div className="container relative z-20 mx-auto px-4 py-12 sm:px-6 lg:flex lg:h-screen lg:items-center lg:py-16">
        <div className="flex flex-col items-center text-center lg:flex lg:w-1/2 lg:items-start lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
          >
            360° Photo Booth
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground"
          >
            Ustvarite edinstvene 360° video posnetke, ki bodo navdušili vaše
            goste. Naš 360° Photo Booth je popolna izbira za vse, ki želijo
            nekaj posebnega na svojem dogodku.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <HeroBookingDialog defaultBoothType="360-photo-booth">
              <Button variant="glow" size="lg">
                Rezerviraj termin
              </Button>
            </HeroBookingDialog>
          </motion.div>
        </div>
        <div className="mt-12 hidden lg:mt-0 lg:block lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
            }}
            className="relative mx-auto w-full rounded-lg"
          >
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/360-booth-preview-poster.webp"
              controlsList="nodownload"
            >
              <source
                src="/360-booth-preview.mp4"
                type="video/mp4; codecs=hevc,mp4a.40.2"
              />
              <source src="/360-booth-preview.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
