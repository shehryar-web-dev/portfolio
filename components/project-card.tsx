import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reversed = index % 2 === 1;

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 md:flex-row",
        reversed && "md:flex-row-reverse",
      )}
    >
      {/* Cover */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-border md:aspect-auto md:w-2/5 md:border-b-0">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full min-h-44 w-full items-center justify-center bg-accent/10">
            <span className="font-display select-none text-7xl font-black text-accent/80">
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

      {/* Body */}
      <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
        <h3 className="text-2xl font-bold">{project.title}</h3>
        <p className="mt-1 text-sm font-medium text-accent">
          {project.tagline}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-foreground/70">
          <span className="font-semibold text-foreground">My role: </span>
          {project.role}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-muted-foreground"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-4 pt-2">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
            >
              Live demo <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : (
            <span className="text-sm text-muted-foreground">Demo soon</span>
          )}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <GithubIcon className="h-4 w-4" /> Code
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
