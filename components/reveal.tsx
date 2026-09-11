import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger, in seconds. Capped so nothing is ever invisible for long. */
  delay?: number;
  /** Accepted for API compatibility; travel distance is fixed in CSS. */
  y?: number;
};

/**
 * A one-shot entrance animation implemented entirely in CSS.
 *
 * Deliberately NOT a scroll-triggered, JavaScript-driven reveal: that pattern
 * parks content at opacity 0 until an IntersectionObserver fires, which means
 * the page renders blank without JS, prints blank, and ships framer-motion to
 * the client for every section. This runs on first paint, needs no JavaScript,
 * and is switched off entirely by prefers-reduced-motion.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const clamped = Math.min(Math.max(delay, 0), 0.24);
  const style: CSSProperties | undefined =
    clamped > 0 ? { animationDelay: `${clamped}s` } : undefined;

  return (
    <div className={cn("reveal", className)} style={style}>
      {children}
    </div>
  );
}
