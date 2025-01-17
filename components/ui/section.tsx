"use client";
import { cn } from "@/lib/utils";

interface SectionProps {
  heading?: string | React.ReactNode;
  text?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headingClassName?: string;
  textClassName?: string;
}

const Section = ({
  heading,
  text,
  children,
  className,
  headingClassName,
  textClassName,
}: SectionProps) => {
  return (
    <section className={cn("py-12 md:py-24", className)}>
      <div className="container-sm mx-auto px-4">
        <h2
          className={cn(
            "text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 md:mb-6",
            headingClassName
          )}
        >
          {heading}
        </h2>
        {text && (
          <p
            className={cn(
              "text-center mx-auto mb-8 md:mb-12 text-base md:text-lg",
              textClassName
            )}
          >
            {text}
          </p>
        )}
      </div>
      {children}
    </section>
  );
};

export default Section;
