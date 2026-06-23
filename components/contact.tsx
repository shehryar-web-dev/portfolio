"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Copy } from "lucide-react";
import { profile } from "@/data/profile";

export function Contact() {
  const [copied, setCopied] = useState<"email" | "phone" | null>(null);

  function copy(value: string, key: "email" | "phone") {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  return (
    <section
      id="contact"
      className="scroll-mt-20 flex min-h-screen flex-col border-t border-border bg-background"
    >
      {/* Main content */}
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
        {/* Watermark */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-display text-[clamp(5rem,18vw,13rem)] font-black leading-none text-foreground/4"
        >
          CONTACT
        </span>

        {/* Big heading with floating avatar */}
        <div className="relative z-10 inline-flex flex-col items-center">
          <h2 className="font-display text-[clamp(3rem,10vw,7rem)] font-black leading-none tracking-tight text-foreground">
            Let&apos;s work
          </h2>

          {/* Circular avatar overlapping both lines */}
          <div className="relative z-10 -my-3 flex h-20 w-20 items-center justify-center sm:-my-4 sm:h-28 sm:w-28">
            <div className="h-full w-full overflow-hidden rounded-full border-4 border-background bg-muted shadow-lg">
              <Image
                src={profile.imagePath}
                alt={profile.name}
                width={112}
                height={112}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <h2 className="font-display text-[clamp(3rem,10vw,7rem)] font-black leading-none tracking-tight text-accent">
            together
          </h2>
        </div>

        {/* Email */}
        <p className="mt-10 text-sm text-muted-foreground">Drop me an email:</p>
        <div className="mt-2 flex items-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="text-lg font-semibold text-foreground transition-colors hover:text-accent sm:text-xl"
          >
            {profile.email}
          </a>
          <button
            type="button"
            onClick={() => copy(profile.email, "email")}
            aria-label="Copy email address"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
          >
            {copied === "email" ? (
              <Check className="h-4 w-4 text-accent" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Phone */}
        <p className="mt-6 text-sm text-muted-foreground">Or call me:</p>
        <div className="mt-2 flex items-center gap-2">
          <a
            href={`tel:${profile.phone.replace(/\s+/g, "")}`}
            className="text-lg font-semibold text-foreground transition-colors hover:text-accent sm:text-xl"
          >
            {profile.phone}
          </a>
          <button
            type="button"
            onClick={() => copy(profile.phone, "phone")}
            aria-label="Copy phone number"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
          >
            {copied === "phone" ? (
              <Check className="h-4 w-4 text-accent" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Bottom bar — hidden on mobile since copyright is the only content */}
      <div className="hidden border-t border-border px-6 py-5 sm:block">
        <div className="text-center text-xs text-muted-foreground">
          ©{new Date().getFullYear()} {profile.name}
        </div>
      </div>
    </section>
  );
}
