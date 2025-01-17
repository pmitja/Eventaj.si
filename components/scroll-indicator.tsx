"use client";
import { motion } from "framer-motion";

const ScrollIndicator = () => {
  return (
    <div className="flex flex-col items-center gap-2 absolute -bottom-4 left-1/2 -translate-x-1/2 z-10">
      <div className="relative">
        <motion.div
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#C89364] flex items-center justify-center cursor-pointer"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            });
          }}
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollIndicator;
