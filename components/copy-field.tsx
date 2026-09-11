"use client";

import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

/**
 * A clickable contact card on the dark Contact slab: icon, label, value
 * (as a mailto:/tel: link), and a copy button. The whole card is a link
 * target on top of the value itself, so tapping anywhere goes to the
 * mail/phone app — the copy button is a secondary affordance.
 *
 * `icon` takes a rendered element (not a component reference) so this
 * client component stays serializable when its server-rendered parent
 * passes one in.
 */
export function CopyField({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API can be unavailable (older browsers, non-secure context).
      // The value is still reachable via the link itself, so fail silently.
    }
  }

  return (
    <div
      className="group relative flex items-center gap-4 rounded-xl border p-4 text-left transition-colors sm:p-5"
      style={{
        borderColor: "var(--slab-border)",
        background: "rgba(255, 255, 255, 0.03)",
      }}
    >
      <span
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11"
        style={{
          background: "color-mix(in oklab, var(--slab-accent) 16%, transparent)",
          color: "var(--slab-accent)",
        }}
      >
        {icon}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-xs" style={{ color: "var(--slab-muted)" }}>
          {label}
        </p>
        <a
          href={href}
          className="mt-0.5 block truncate text-[15px] font-semibold text-white sm:text-base"
        >
          <span aria-hidden="true" className="absolute inset-0 rounded-xl" />
          {value}
        </a>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? `${value} copied to clipboard` : `Copy ${value}`}
        className="relative z-10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-colors hover:text-white"
        style={{ borderColor: "var(--slab-border)", color: "var(--slab-muted)" }}
      >
        {copied ? (
          <Check aria-hidden="true" className="h-4 w-4" />
        ) : (
          <Copy aria-hidden="true" className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
