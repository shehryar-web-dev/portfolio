"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { profile } from "@/data/profile";

const specializations = [
  "Full-Stack Web App",
  "Mobile Developer",
  "Blockchain Integration",
  "AI Automation",
  "Agents & RAG",
];

const GRID = 48;
/* Cells constrained to the clearly-visible 3-D floor zone */
const COL_MIN = 5;   // x ≥ 240px — clear of side vignette
const COL_MAX = 23;  // x ≤ 1104px — clear of side vignette
const ROW_MIN = 3;   // y ≥ 144px — below the tiny horizon fade
const ROW_MAX = 10;  // y ≤ 480px — stays on-screen after perspective expansion

const FADE = 500; // ms for fade out before teleport
const intervals = [3400, 4200, 3800, 2900, 4600, 3100, 4000, 3600];

function randomPos() {
  return {
    left: (COL_MIN + Math.floor(Math.random() * (COL_MAX - COL_MIN))) * GRID,
    top:  (ROW_MIN + Math.floor(Math.random() * (ROW_MAX - ROW_MIN))) * GRID,
  };
}

/* Pick a position not adjacent to any existing cell */
function randomPosAway(others: { left: number; top: number }[]) {
  let pos = randomPos();
  for (let t = 0; t < 120; t++) {
    const ok = others.every(
      (o) => Math.abs(pos.left - o.left) > GRID || Math.abs(pos.top - o.top) > GRID
    );
    if (ok) return pos;
    pos = randomPos();
  }
  return pos;
}

/* Seed initial positions with no adjacency */
function seedCells() {
  const placed: { left: number; top: number }[] = [];
  return intervals.map(() => {
    const pos = randomPosAway(placed);
    placed.push(pos);
    return { ...pos, visible: true };
  });
}

type Cell = { left: number; top: number; visible: boolean };

export function Hero() {
  const [cells, setCells] = useState<Cell[]>(seedCells);

  useEffect(() => {
    const timers = intervals.map((ms, i) =>
      setInterval(() => {
        // 1 — fade out this cell
        setCells((prev) => prev.map((c, j) => j === i ? { ...c, visible: false } : c));
        // 2 — after fade, teleport to a non-adjacent spot and fade back in
        setTimeout(() => {
          setCells((prev) => {
            const others = prev.filter((_, j) => j !== i);
            const pos = randomPosAway(others);
            return prev.map((c, j) => j === i ? { ...pos, visible: true } : c);
          });
        }, FADE);
      }, ms)
    );
    return () => timers.forEach(clearInterval);
  }, []);
  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-center overflow-hidden pb-28 pt-20 md:pb-10"
    >
      {/* ── Animated 3-D grid background ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Grid lines + cells share the same 3-D plane.
            transformOrigin "50% 0%" pins the pivot at the TOP edge so the
            horizon sits at the very top of the section and the floor fills
            the entire hero from top to bottom. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: "-60%",   /* extra canvas so bottom rows don't get clipped */
            transformOrigin: "50% 0%",
            transform: "perspective(700px) rotateX(55deg)",
            backgroundImage: `
              linear-gradient(rgba(0,207,209,0.14) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,207,209,0.14) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        >
          {/* Pulsing cells — on the same plane so they tilt with the grid */}
          {cells.map((cell, i) => (
            <motion.span
              key={i}
              className="absolute bg-accent/30"
              animate={{ opacity: cell.visible ? 1 : 0 }}
              transition={{ duration: FADE / 1000, ease: "easeInOut" }}
              style={{ left: cell.left, top: cell.top, width: 47, height: 47 }}
            />
          ))}
        </div>

        {/* Gradient masks — z-index:2 forces paint above the GPU-composited 3-D layer */}
        {/* Top: tiny fade to smooth the horizon line */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
          background: "linear-gradient(to bottom, var(--background) 0%, transparent 10%)",
        }} />
        {/* Bottom edge */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
          background: "linear-gradient(to top, var(--background) 0%, transparent 8%)",
        }} />
        {/* Left / right edges */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
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

            {/* Role badge — ornamental border with flower accents */}
            <div className="mt-6 flex justify-center">
              <div className="relative inline-flex items-center gap-3 rounded-full border border-accent/40 px-6 py-2.5">
                <span className="absolute -left-2 -top-2 text-accent" aria-hidden>✦</span>
                <span className="absolute -right-2 -top-2 text-accent" aria-hidden>✦</span>
                <span className="absolute -left-2 -bottom-2 text-accent" aria-hidden>✦</span>
                <span className="absolute -right-2 -bottom-2 text-accent" aria-hidden>✦</span>
                <span className="text-xs text-accent/60" aria-hidden>❖</span>
                <span className="font-display text-sm font-black uppercase tracking-[0.2em] text-foreground sm:text-base">
                  AI Engineer
                </span>
                <span className="text-xs text-accent/60" aria-hidden>❖</span>
              </div>
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
