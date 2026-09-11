import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * A project card is engineering evidence, not a screenshot with a tech list.
 * It leads with the problem, then what was engineered, then the verifiable facts.
 */
export function ProjectCard({
  project,
  index,
  className,
}: {
  project: Project;
  index?: number;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-lg border border-border bg-background p-5 transition-colors hover:border-border-strong sm:p-7",
        className,
      )}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="label">
          {typeof index === "number" && (
            <span className="mr-2 text-faint">{String(index + 1).padStart(2, "0")}</span>
          )}
          {project.category}
        </p>
      </div>

      <h3 className="mt-3 text-xl font-semibold sm:text-2xl">
        <Link
          href={`/work/${project.slug}`}
          className="after:absolute after:inset-0 focus-visible:outline-none"
        >
          {project.title}
        </Link>
      </h3>

      <p className="mt-1 text-sm text-accent">{project.tagline}</p>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {project.summary}
      </p>

      {project.facts && project.facts.length > 0 && (
        <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-border pt-5 sm:grid-cols-4">
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="sr-only">{fact.label}</dt>
              <dd>
                <span className="block font-mono text-base font-medium text-foreground">
                  {fact.value}
                </span>
                <span className="mt-1 block text-[11px] leading-snug text-faint">
                  {fact.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-1.5">
        {project.tech.slice(0, 6).map((t) => (
          <span
            key={t}
            className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
          >
            {t}
          </span>
        ))}
        {project.tech.length > 6 && (
          <span className="font-mono text-[11px] text-faint">
            +{project.tech.length - 6}
          </span>
        )}
      </div>

      <p className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground">
        Read the case study
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </p>
    </article>
  );
}
