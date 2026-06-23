import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  watermark?: string;
};

/** A standard page section with a consistent heading block. */
export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  watermark,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-20 py-20 sm:py-28", className)}
    >
      <div className="mx-auto w-full max-w-6xl container-px">
        <Reveal className="relative mb-12 overflow-hidden py-4 text-center">
          {/* Watermark background text */}
          {watermark && (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-display text-[clamp(4rem,14vw,10rem)] font-black leading-none text-foreground/5"
            >
              {watermark}
            </span>
          )}
          <div className="relative z-10">
            {eyebrow && (
              <p className="mb-2 text-sm font-semibold tracking-wide gradient-text uppercase">
                {eyebrow}
              </p>
            )}
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h2>
            {description && (
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
