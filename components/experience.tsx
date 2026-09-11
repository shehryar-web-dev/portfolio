import Link from "next/link";
import { experiences } from "@/data/experience";
import { getProject } from "@/data/projects";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

/**
 * Experience written as engineering contributions:
 * what was owned → what problem existed → how it was engineered → what resulted.
 */
export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Professional experience"
      title="Where the work happened"
      description="Roles, and the systems and contributions that belong to each. Figures are structural counts from the codebases themselves — commit shares, module and route counts, test counts. Nothing here is a traffic, revenue or user number, because those repositories carry no such instrumentation."
      watermark="EXPERIENCE"
    >
      <ol className="space-y-12">
        {experiences.map((exp, i) => (
          <Reveal key={`${exp.org}-${exp.role}`} delay={i * 0.04}>
            <li className="border-t border-border-strong pt-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <div>
                  <h3 className="text-lg font-semibold sm:text-xl">{exp.role}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{exp.org}</p>
                </div>
                <p className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-faint">
                  {exp.period}
                  {exp.current && (
                    <span className="ml-2 rounded border border-border px-1.5 py-0.5 text-[10px] normal-case tracking-normal text-muted-foreground">
                      Current
                    </span>
                  )}
                </p>
              </div>

              {exp.summary && (
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground-soft">
                  {exp.summary}
                </p>
              )}

              <div className="mt-6">
                <p className="label mb-3">Engineering contributions</p>
                <ul className="max-w-3xl space-y-3">
                  {exp.highlights.map((line) => (
                    <li
                      key={line}
                      className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-[0.62em] before:h-1 before:w-1 before:rounded-full before:bg-border-strong"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              {exp.systems && exp.systems.length > 0 && (
                <div className="mt-6">
                  <p className="label mb-3">Systems</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {exp.systems.map((slug) => {
                      const project = getProject(slug);
                      if (!project) return null;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/work/${slug}`}
                            className="inline-block rounded border border-border px-2.5 py-1 text-[13px] text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
                          >
                            {project.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {exp.tech && exp.tech.length > 0 && (
                <div className="mt-6">
                  <p className="label mb-3">Technologies</p>
                  <p className="max-w-3xl font-mono text-[12px] leading-relaxed text-faint">
                    {exp.tech.join(" · ")}
                  </p>
                </div>
              )}
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
