"use client";

import Image from "next/image";
import { useState } from "react";
import { Zap } from "lucide-react";
import { LogoIcon } from "@/components/logo-icon";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type Stat = { label: string; value: string };

// Hardcoded placeholders for now — dev-appropriate. Swap for real data later.
const defaultStats: Stat[] = [
  { label: "Projects", value: "40+" },
  { label: "Clients", value: "20+" },
  { label: "Experience", value: "3+ yrs" },
];

/**
 * Rich profile card for the About section — corner-bracket frame, glowing
 * grayscale photo (with monogram fallback), identity row, stat tiles, and a
 * floating "live" badge. Styled with the site's teal/navy tokens.
 */
export function ProfileCard({
  src = profile.imagePath,
  name = profile.name,
  role = "AI & Blockchain Engineer",
  stats = defaultStats,
  className,
}: {
  src?: string;
  name?: string;
  role?: string;
  stats?: Stat[];
  className?: string;
}) {
  const [errored, setErrored] = useState(false);

  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      {/* ── Card ── */}
      <div className="relative rounded-2xl border border-border bg-card p-3 shadow-xl shadow-black/20 ring-1 ring-inset ring-white/5">
        {/* Corner brackets */}
        <span aria-hidden className="pointer-events-none absolute left-2 top-2 h-5 w-5 rounded-tl-lg border-l-2 border-t-2 border-accent/70" />
        <span aria-hidden className="pointer-events-none absolute right-2 top-2 h-5 w-5 rounded-tr-lg border-r-2 border-t-2 border-accent/70" />
        <span aria-hidden className="pointer-events-none absolute bottom-2 left-2 h-5 w-5 rounded-bl-lg border-b-2 border-l-2 border-accent/70" />
        <span aria-hidden className="pointer-events-none absolute bottom-2 right-2 h-5 w-5 rounded-br-lg border-b-2 border-r-2 border-accent/70" />

        {/* Photo */}
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl bg-background">
          {/* Accent glow behind the subject */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 55% at 50% 42%, color-mix(in oklab, var(--accent) 30%, transparent) 0%, transparent 72%)",
            }}
          />
          {!errored ? (
            <Image
              src={src}
              alt={name}
              fill
              sizes="(max-width: 1024px) 100vw, 24rem"
              className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
              onError={() => setErrored(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-7xl font-bold text-accent">
                {name.charAt(0)}
              </span>
            </div>
          )}
          {/* Bottom fade so the identity row reads cleanly */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/3"
            style={{ background: "linear-gradient(to top, var(--card) 4%, transparent 100%)" }}
          />
        </div>

        {/* Identity row */}
        <div className="mt-4 flex items-center justify-between gap-3 px-1">
          <div className="min-w-0">
            <h3 className="font-display text-2xl font-black leading-tight tracking-tight">
              {name}
            </h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {role}
            </p>
          </div>
          <LogoIcon className="h-7 w-7 shrink-0 text-accent" />
        </div>

        {/* Stat tiles */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-border bg-background/60 px-2 py-3 text-center"
            >
              <div className="text-[0.6rem] font-semibold uppercase tracking-widest text-muted-foreground">
                {s.label}
              </div>
              <div className="mt-1 font-display text-lg font-black text-foreground">
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Floating "live" badge ── */}
      <div className="glass absolute -bottom-3 -left-3 flex items-center gap-2.5 rounded-xl border border-border px-3 py-2 shadow-lg shadow-black/30">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent/15 text-accent">
          <Zap className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Live AI workflows
          </div>
          <div className="text-[0.6rem] font-medium uppercase tracking-widest text-muted-foreground">
            Running 24/7
          </div>
        </div>
      </div>
    </div>
  );
}
