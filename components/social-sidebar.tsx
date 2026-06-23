"use client";

import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";

const socials = [
  {
    label: "GitHub",
    href: profile.socials.github,
    icon: GithubIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    href: profile.socials.linkedin,
    icon: LinkedinIcon,
    external: true,
  },
  {
    label: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    external: false,
  },
];

export function SocialSidebar() {
  return (
    <>
      {/* ── Desktop: fixed left column ── */}
      <aside className="fixed bottom-0 left-5 z-40 hidden flex-col items-center gap-5 md:flex xl:left-8">
        {socials.map(({ label, href, icon: Icon, external }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group relative flex items-center"
          >
            {/* Tooltip label — appears to the right on hover */}
            <span
              className="absolute left-9 whitespace-nowrap rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground opacity-0 shadow-sm transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
              aria-hidden
            >
              {label}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:text-white">
              <Icon className="h-5 w-5" />
            </span>
          </a>
        ))}
        {/* Vertical line below icons */}
        <span className="h-24 w-px bg-border" />
      </aside>

    </>
  );
}
