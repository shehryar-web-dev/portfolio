import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  const label = project.featured ? "Featured Project" : "Creative Work";
  const href = project.liveUrl ?? project.githubUrl;
  const reversed = index % 2 === 1;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-background transition-all duration-300 md:block md:min-h-[380px]">

      {/* ── Image layer — fills one side, sits behind ── */}
      <div
        className={`relative h-56 w-full overflow-hidden bg-muted/10 sm:h-72 md:absolute md:inset-y-0 md:h-full md:w-[62%] ${
          reversed ? "md:right-0" : "md:left-0"
        }`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 62vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            priority={index === 0}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display select-none text-[8rem] font-black text-accent/20">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
        {project.placeholder && (
          <span className="absolute right-3 top-3 rounded-full border border-border bg-background/80 px-2.5 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            Template
          </span>
        )}
      </div>

      {/* ── Content panel — solid, in front, overlapping the image ── */}
      <div
        className={`relative z-10 flex flex-col justify-center rounded-lg bg-card p-6 shadow-2xl shadow-black/50 sm:p-8 md:my-8 md:w-[48%] ${
          reversed
            ? "md:mr-auto md:ml-8 md:translate-x-[10%]"
            : "md:ml-auto md:mr-8 md:-translate-x-[10%]"
        }`}
      >
        {/* Label + number */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            {label}
          </span>
          <span className="font-mono text-xs text-muted-foreground">{num}</span>
        </div>

        {/* Title */}
        <h3 className="mt-3 font-display text-2xl font-black uppercase tracking-tight sm:text-3xl">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-4">
          {project.description}
        </p>

        {/* Tech as spaced plain text */}
        <p className="mt-5 text-xs tracking-wide text-muted-foreground/60">
          {project.tech.join("   ")}
        </p>

        {/* CTA */}
        {href && (
          <div className="mt-6">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-accent px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <ArrowUpRight className="h-4 w-4" />
              Learn More
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
