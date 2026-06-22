"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Download } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { profile } from "@/data/profile";

const specializations = [
  "Full-Stack Web App",
  "Mobile Developer",
  "Blockchain Integration",
  "AI Automation",
  "Agents & RAG",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden pt-16"
    >
      {/* Parallax glow orbs */}
      <motion.div style={{ y: y1 }} className="orb orb-1" aria-hidden />
      <motion.div style={{ y: y2 }} className="orb orb-2" aria-hidden />
      <motion.div style={{ y: y3 }} className="orb orb-3" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-4xl container-px text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >

          {/* Greeting + name */}
          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            Hi, I&apos;m{" "}
            <span className="text-accent">{profile.name}</span>
          </h1>

          {/* Role */}
          <p className="mt-3 text-xl font-semibold text-muted-foreground sm:text-2xl">
            Senior Full Stack Engineer
          </p>

          {/* Specialization tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2"
          >
            {specializations.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground"
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
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <ButtonLink href="/#projects" variant="primary" size="lg">
              View Projects <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href={profile.resumePath}
              external
              variant="outline"
              size="lg"
            >
              <Download className="h-4 w-4" /> Download Resume
            </ButtonLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
