import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";

const links = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/contact" },
];

/** Footer is visible on mobile only — desktop uses the sticky social sidebar. */
export function Footer() {
  return (
    <footer className="border-t border-border md:hidden">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 py-10 container-px sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="text-lg font-bold tracking-tight">
            {profile.name}
            <span className="text-accent">.</span>
          </Link>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            {profile.role}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-muted-foreground">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-foreground"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-foreground"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
