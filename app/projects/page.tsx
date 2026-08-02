import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected project work by Shehryar.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-28">
      <header className="mb-12 max-w-3xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide gradient-text">
          Projects
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Selected work
        </h1>
        <p className="mt-4 text-muted-foreground">
          A fuller look at recent product interfaces and app builds.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className={`transition-transform duration-500 group-hover:scale-[1.03] ${
                    project.imageFit === "contain" ? "object-contain p-3" : "object-cover"
                  }`}
                  priority={index < 2}
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="font-display text-7xl font-black text-accent/20">
                    {project.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-bold uppercase tracking-widest text-accent">
                  {project.tagline}
                </p>
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">
                {project.title}
              </h2>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {project.summary}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent">
                View Details
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
