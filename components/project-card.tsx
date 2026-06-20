import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

const coverGradients = [
  "from-violet-500/30 via-fuchsia-500/20 to-cyan-500/30",
  "from-cyan-500/30 via-blue-500/20 to-violet-500/30",
  "from-emerald-500/30 via-teal-500/20 to-cyan-500/30",
  "from-orange-500/30 via-pink-500/20 to-violet-500/30",
];

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const gradient = coverGradients[index % coverGradients.length];

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5",
        project.featured && "lg:col-span-1",
      )}
    >
      {/* Cover */}
      <div className="relative aspect-video overflow-hidden border-b border-border">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={cn(
              "flex h-full w-full items-center justify-center bg-linear-to-br",
              gradient,
            )}
          >
            <span className="select-none text-6xl font-black text-foreground/80">
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
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold">{project.title}</h3>
        <p className="mt-1 text-sm font-medium gradient-text">
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

        <div className="mt-6 flex items-center gap-3 pt-2">
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
