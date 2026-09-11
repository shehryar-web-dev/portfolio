import { principles } from "@/data/engineering";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/** How the work gets approached, not which tools are known. Full list — this is a single page. */
export function HowIEngineer() {
  return (
    <Section
      id="engineering"
      eyebrow="How I engineer"
      title="The approach behind the systems"
      description="Architecture is mostly decided by what the things you integrate with do when you are slow, wrong, or offline. These are the habits that came out of answering that question repeatedly, across eight unrelated codebases."
      watermark="ENGINEER"
    >
      <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
        {principles.map((principle, i) => (
          <li key={principle.id} className="bg-background p-5 sm:p-7">
            <Reveal delay={i * 0.03}>
              <p className="label">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-base font-semibold">{principle.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {principle.body}
              </p>
              <ul className="mt-4 space-y-2 border-t border-border pt-4">
                {principle.evidence.map((line) => (
                  <li
                    key={line}
                    className="relative pl-4 text-[13px] leading-relaxed text-faint before:absolute before:left-0 before:top-[0.65em] before:h-1 before:w-1 before:rounded-full before:bg-border-strong"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
        {/* Keep the grid visually even when the count is odd. */}
        {principles.length % 2 === 1 && (
          <li aria-hidden="true" className={cn("hidden bg-background sm:block")} />
        )}
      </ul>
    </Section>
  );
}
