import { getProject } from "@/data/projects";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ArchitectureDiagram } from "@/components/architecture-diagram";

/**
 * One architecture, drawn properly, so the shape of the work is legible
 * without reading a case study first.
 */
export function ArchitectureShowcase() {
  const twq = getProject("twq");
  const dibzi = getProject("dibzi");
  if (!twq || !dibzi) return null;

  return (
    <Section
      id="architecture"
      eyebrow="Architecture"
      title="Ingestion decoupled from processing, and an immutable token made editable"
      description="Two diagrams of how the system actually behaves, not what it's built with. The first is the event-driven pattern: acknowledge fast, record durably, process elsewhere. The second is what happens when a blockchain's permanence works against the product: point the token at a stable address, and compute what lives behind it on every request."
      watermark="ARCHITECTURE"
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
        <Reveal>
          <div>
            <h3 className="mb-1 text-base font-semibold">
              {twq.title} — event ingestion to notification
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              The webhook handler returns 200 before it validates anything, because the
              provider disconnects slow subscribers and a dropped event has no replay.
            </p>
            <ArchitectureDiagram architecture={twq.architecture} />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div>
            <h3 className="mb-1 text-base font-semibold">
              {dibzi.title} — check-in to computed reward
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              A reward minted as a token is permanently frozen once issued, so the token
              URI points at a fixed address on Dibzi&apos;s own API instead of IPFS —
              editing a reward becomes a database write, never a blockchain transaction.
            </p>
            <ArchitectureDiagram architecture={dibzi.architecture} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
