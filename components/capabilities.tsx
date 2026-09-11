import { capabilities } from "@/data/engineering";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

/**
 * Capabilities organised by the problem solved. Technologies are listed
 * underneath as supporting evidence — never as the headline.
 */
export function Capabilities() {
  return (
    <Section
      id="capabilities"
      eyebrow="Capabilities"
      title="What I can be handed"
      description="Grouped by what it solves rather than by language or framework. The technologies under each are the ones actually used in the systems described on this site."
      watermark="CAPABLE"
    >
      <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
        {capabilities.map((capability, i) => (
          <li key={capability.title} className="bg-background p-5 sm:p-7">
            <Reveal delay={i * 0.03}>
              <h3 className="text-base font-semibold">{capability.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {capability.body}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {capability.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-faint"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
