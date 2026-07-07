"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { profile } from "@/data/profile";

const specializations = [
  "Full-Stack Web App",
  "Mobile Developer",
  "Blockchain Integration",
  "AI Automation",
  "AI Agents & RAG",
];

const DOT_GAP = 22; // px between dots
const SPOT_RADIUS = 170; // px — how far the cursor spotlight reaches

// Evenly-spaced dot field; `color` is theme-driven via color-mix.
const dotLayer = (color: string) => `radial-gradient(circle, ${color} 1px, transparent 1.5px)`;
// Reveal mask / glow centred on the cursor. Falls back off-screen before the
// first mousemove so nothing is stuck at (0,0).
const cursorAt = (radius: number) =>
  `circle ${radius}px at var(--mx, -200px) var(--my, -200px)`;

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  // Cursor spotlight: write pointer position + a fade flag to CSS variables so
  // the mask-reveal happens on the GPU with no React re-render per move.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    // Respect reduced motion — keep the static dots, skip the pointer spotlight.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", `${px}px`);
      el.style.setProperty("--my", `${py}px`);
      el.style.setProperty("--spot-opacity", "1");
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      px = e.clientX - rect.left;
      py = e.clientY - rect.top;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      el.style.setProperty("--spot-opacity", "0");
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="home"
      className="relative flex min-h-[92vh] items-center overflow-hidden pb-28 pt-20 md:pb-10"
    >
      {/* ── Interactive dotted-grid background ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Soft central glow so the field reads as depth, not a flat mesh */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(60% 45% at 50% 34%, color-mix(in oklab, var(--accent) 14%, transparent) 0%, transparent 70%)",
          }}
        />

        {/* Base dots — dim, cover the whole area */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: dotLayer("color-mix(in oklab, var(--accent) 14%, transparent)"),
            backgroundSize: `${DOT_GAP}px ${DOT_GAP}px`,
          }}
        />

        {/* Spotlight dots — brighter, revealed only within the cursor mask */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: dotLayer("color-mix(in oklab, var(--accent) 60%, transparent)"),
            backgroundSize: `${DOT_GAP}px ${DOT_GAP}px`,
            opacity: "var(--spot-opacity, 0)",
            transition: "opacity 500ms ease",
            maskImage: `radial-gradient(${cursorAt(SPOT_RADIUS)}, #000 0%, transparent 70%)`,
            WebkitMaskImage: `radial-gradient(${cursorAt(SPOT_RADIUS)}, #000 0%, transparent 70%)`,
          }}
        />

        {/* Faint accent halo trailing the cursor for extra depth */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: "var(--spot-opacity, 0)",
            transition: "opacity 500ms ease",
            background: `radial-gradient(${cursorAt(SPOT_RADIUS + 60)}, color-mix(in oklab, var(--accent) 12%, transparent) 0%, transparent 70%)`,
          }}
        />

        {/* Edge fades so the grid dissolves into the page background */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, var(--background) 0%, transparent 12%, transparent 88%, var(--background) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, var(--background) 0%, transparent 12%, transparent 88%, var(--background) 100%)",
        }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-6xl container-px">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {/* Available badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              <span className="text-sm text-muted-foreground">Available for work</span>
            </div>

            {/* Name */}
            <h1 className="font-display text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Hi, I&apos;m{" "}
              <span className="text-accent">{profile.name}</span>
            </h1>

            {/* Role — flanked by centered rule lines + diamond accents */}
            <div className="mt-7 flex items-center justify-center gap-4">
              <span aria-hidden className="h-px w-14 bg-accent/40 sm:w-20" />
              <span className="text-xl text-accent/60 sm:text-2xl" aria-hidden>❖</span>
              <span className="font-display text-base font-black uppercase tracking-[0.25em] text-foreground sm:text-lg">
                AI Engineer
              </span>
              <span className="text-xl text-accent/60 sm:text-2xl" aria-hidden>❖</span>
              <span aria-hidden className="h-px w-14 bg-accent/40 sm:w-20" />
            </div>

            {/* Bio */}
            <p className="mx-auto mt-5 max-w-lg leading-relaxed text-muted-foreground">
              {profile.subline}
            </p>

            {/* Specialization tags */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-6 flex flex-wrap justify-center gap-2"
            >
              {specializations.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              <ButtonLink href="/#projects" variant="primary" size="lg">
                View Projects <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href={profile.resumePath} external variant="outline" size="lg">
                <Download className="h-4 w-4" /> Download Resume
              </ButtonLink>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground"
            >
              <MapPin className="h-4 w-4 text-accent" />
              {profile.location}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
