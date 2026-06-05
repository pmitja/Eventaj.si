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
  seoTitle?: string;
  text: string;
}

const BasicBoothHero = ({ title, seoTitle, text }: HeroProps) => {
  const { scrolled } = useNavigation();

  return (
    <section
      className={`relative min-h-[720px] overflow-hidden text-[var(--eventaj-ink)] md:min-h-screen ${
        scrolled
          ? "pt-16 md:pt-20"
          : "pt-[calc(64px+48px)] md:pt-[calc(80px+48px)]"
      }`}
    >
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/application/photo-booth-hero/hero-photo-booth-img.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[64%_center] md:object-center"
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--eventaj-paper)] to-transparent" />
      </motion.div>

      <div className="relative z-10 flex min-h-[620px] items-center md:min-h-[calc(100vh-7rem)]">
        <div className="container mx-auto px-5 md:px-10">
          <FadeIn
            delay={0.2}
            className="mb-6 inline-flex max-w-full items-center gap-2.5 rounded-full border border-[rgba(20,17,15,0.15)] bg-[rgba(251,248,242,0.7)] px-3 py-2 text-[10px] uppercase tracking-[0.08em] text-[var(--eventaj-muted)] backdrop-blur-md sm:px-4 sm:text-xs sm:tracking-[0.12em]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--eventaj-accent)]" />
            Photo booth najem · od 279 €
          </FadeIn>

          <div className="max-w-[660px]">
            {seoTitle ? (
              <>
                <h1 className="sr-only">{seoTitle}</h1>
                <motion.div
                  aria-hidden="true"
                  className="font-serif-display text-[clamp(46px,8vw,104px)] font-[350] leading-[0.92] text-balance"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                >
                  {title}
                </motion.div>
              </>
            ) : (
              <motion.h1
                className="font-serif-display text-[clamp(46px,8vw,104px)] font-[350] leading-[0.92] text-balance"
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
            )}

            <FadeIn delay={0.8} className="mt-6 max-w-[560px] md:mt-7">
              <p className="text-base leading-relaxed text-[var(--eventaj-ink-2)] sm:text-lg md:text-[19px]">
                {text}
              </p>
            </FadeIn>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
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
                className="w-full border-[rgba(20,17,15,0.22)] bg-[rgba(251,248,242,0.56)] text-[var(--eventaj-ink)] backdrop-blur-md hover:bg-[var(--eventaj-ink)] hover:text-[var(--eventaj-paper)] sm:w-auto"
              >
                <Link href="#kako-deluje">Kako deluje?</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        <ScrollIndicator />
      </div>
    </section>
  );
};

export default BasicBoothHero;
