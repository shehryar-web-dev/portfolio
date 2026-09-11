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
  const fintrust = getProject("fintrust");
  if (!twq || !fintrust) return null;

  return (
    <Section
      id="architecture"
      eyebrow="Architecture"
      title="Ingestion decoupled from processing, and no write before confirmation"
      description="Two diagrams that account for most of what I do. The first is the event-driven pattern: acknowledge fast, record durably, process elsewhere. The second is the rule that keeps a database honest about a blockchain it cannot control."
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
              {fintrust.title} — prepare, sign, confirm, then write
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              No database record of a user&apos;s on-chain action can exist without a
              confirmed transaction behind it. An indexer heals whatever the chain drops.
            </p>
            <ArchitectureDiagram architecture={fintrust.architecture} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
