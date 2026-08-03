"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Layers, Briefcase, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { label: "About",      href: "/#about",      id: "about",      Icon: User },
  { label: "Projects",   href: "/#projects",   id: "projects",   Icon: Layers },
  { label: "Experience", href: "/#experience", id: "experience", Icon: Briefcase },
  { label: "Contact",    href: "/#contact",    id: "contact",    Icon: Mail },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    if (!isHome) return;
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* ── Desktop: pill nav at top ── */}
      <header className="fixed inset-x-0 top-0 z-50 hidden md:block">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-center container-px">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-border bg-card/80 px-2 py-1.5 shadow-sm backdrop-blur">
              {navItems.map(({ label, href, id }) => (
                <Link
                  key={id}
                  href={href}
                  onClick={(e) => handleNavClick(e, id)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                    isHome && active === id
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {label}
                </Link>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* ── Mobile: fixed bottom nav bar ── */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur md:hidden">
        <div className="grid grid-cols-5 items-stretch px-1 pb-safe">
          {navItems.map(({ label, href, id, Icon }) => (
            <Link
              key={id}
              href={href}
              onClick={(e) => handleNavClick(e, id)}
              className={cn(
                "flex min-w-0 flex-col items-center justify-center gap-1 px-1 py-3 transition-colors",
                isHome && active === id
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="max-w-full truncate text-[9px] font-semibold leading-none sm:text-[10px]">
                {label}
              </span>
            </Link>
          ))}
          <div className="flex min-w-0 flex-col items-center justify-center gap-1 px-1 py-3">
            <ThemeToggle />
            <span className="max-w-full truncate text-[9px] font-semibold leading-none text-muted-foreground sm:text-[10px]">
              Theme
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}
