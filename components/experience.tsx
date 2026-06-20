import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { experiences } from "@/data/experience";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've focused"
      description="Outcomes over titles — here's what I've built and the impact along the way."
    >
      <div className="relative">
        {/* Vertical line */}
        <div
          aria-hidden
          className="absolute left-[7px] top-2 bottom-2 w-px bg-border sm:left-[9px]"
        />
        <div className="space-y-10">
          {experiences.map((exp, i) => (
            <Reveal key={`${exp.org}-${exp.period}`} delay={i * 0.06}>
              <div className="relative pl-8 sm:pl-10">
                {/* Dot */}
                <span
                  className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent bg-background sm:h-5 sm:w-5"
                  aria-hidden
                >
                  {exp.current && (
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  )}
                </span>

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold">
                    {exp.role}{" "}
                    <span className="text-muted-foreground">· {exp.org}</span>
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    {exp.period}
                  </span>
                </div>

                <ul className="mt-3 space-y-2">
                  {exp.highlights.map((h, hi) => (
                    <li
                      key={hi}
                      className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>

                {exp.tech && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
