import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

/**
 * All eight systems, one compact row each — title, category, tagline, the
 * single most telling stat, and a link into the full case study. The depth
 * (problem, architecture, decisions, trade-offs) lives on the detail page,
 * not here.
 */
export function Projects() {
  return (
    <Section
      id="work"
      eyebrow="Selected engineering work"
      title="Eight systems I built, and the constraint that shaped each one"
      description="Each one is summarised by the problem it had to solve — the full case study covers the architecture, the challenges, the decisions and their trade-offs."
      watermark="WORK"
    >
      <ol className="divide-y divide-border border-t border-border">
        {projects.map((project, i) => {
          const stat = project.facts?.[0];
          return (
            <Reveal key={project.slug} delay={Math.min(i, 6) * 0.03}>
              <li>
                <Link
                  href={`/work/${project.slug}`}
                  className="group flex flex-col gap-3 py-5 transition-colors hover:bg-surface sm:flex-row sm:items-center sm:gap-6 sm:py-6"
                >
                  <div className="flex items-start gap-3 sm:w-[15rem] sm:shrink-0 sm:items-center">
                    <span className="label text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold text-foreground sm:text-lg">
                        {project.title}
                      </h3>
                      <p className="label mt-0.5 truncate">{project.category}</p>
                    </div>
                  </div>

                  <p className="min-w-0 text-sm leading-relaxed text-muted-foreground sm:flex-1">
                    {project.tagline}
                  </p>

                  <div className="flex items-center justify-between gap-4 sm:shrink-0 sm:justify-end">
                    {stat && (
                      <div className="text-right">
                        <span className="block font-mono text-base font-semibold leading-none text-foreground">
                          {stat.value}
                        </span>
                        <span className="mt-1 block text-[11px] leading-snug text-faint">
                          {stat.label}
                        </span>
                      </div>
                    )}
                    <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-accent">
                      Case study
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
