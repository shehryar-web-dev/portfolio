import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="The stack I build with"
      description="Grouped by specialty. “Core” means I can go deep in an interview; “Familiar” means I'm comfortable and shipping with it."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.06}>
            <div className="h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/40">
              <h3 className="text-lg font-semibold">{group.category}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{group.blurb}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className={cn(
                      "rounded-lg border px-2.5 py-1 text-xs font-medium",
                      skill.level === "core"
                        ? "border-accent/30 bg-accent/10 text-accent"
                        : "border-border bg-muted text-muted-foreground",
                    )}
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
