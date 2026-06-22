"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Profile photo with a monogram fallback.
 * Renders the optimized image; if the file is missing (e.g. /profile.jpg not
 * added yet) it falls back to a clean accent monogram instead of a broken image.
 */
export function ProfilePhoto({
  src,
  alt,
  initial,
  className,
}: {
  src: string;
  alt: string;
  initial: string;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10",
        className,
      )}
    >
      {!errored ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-accent/10">
          <span className="font-display text-7xl font-bold text-accent">
            {initial}
          </span>
        </div>
      )}
      {/* Subtle accent ring on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-accent/0 transition-all group-hover:ring-accent/30" />
    </div>
  );
}
