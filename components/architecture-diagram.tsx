import { Cpu, Database, Layers, Send, ShieldCheck, Webhook, Zap } from "lucide-react";
import type { Architecture, PipelineIcon } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * A data-driven system-behaviour diagram: a single connected flow, top to
 * bottom, each node the actual step a request or event moves through next
 * (and, in the note, why) — not the tech stack behind it.
 *
 * Every node carries an icon for what *kind* of step it is (an external
 * trigger, an inbound surface, a guard it can't get past, work queued for
 * later, computation, a state read/write, or a result reaching someone) so
 * the sequence reads as a real mechanism at a glance, not a numbered list.
 * One line runs behind every icon, unbroken, so nothing wraps into rows the
 * way a grid would — the rail is decorative (aria-hidden); a screen reader
 * gets a plain ordered list of names and notes.
 */
const ICONS: Record<PipelineIcon, typeof Zap> = {
  trigger: Zap,
  inbound: Webhook,
  gate: ShieldCheck,
  queue: Layers,
  compute: Cpu,
  store: Database,
  notify: Send,
};

function Node({
  name,
  note,
  icon,
}: {
  name: string;
  note?: string;
  icon: PipelineIcon;
}) {
  const Icon = ICONS[icon];
  return (
    <>
      <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-strong bg-background text-accent">
        <Icon aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1 pt-1">
        <p className="text-[13px] font-medium leading-snug text-foreground">{name}</p>
        {note && (
          <p className="mt-0.5 font-mono text-[11px] leading-snug text-faint">{note}</p>
        )}
      </div>
    </>
  );
}

export function ArchitectureDiagram({
  architecture,
  className,
  caption,
}: {
  architecture: Architecture;
  className?: string;
  caption?: string;
}) {
  const { summary, pipeline } = architecture;

  return (
    <figure className={cn("m-0", className)}>
      <div className="rounded-lg border border-border bg-surface p-4 sm:p-6">
        <ol className="relative mx-auto max-w-sm">
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-[17.5px] top-4 w-px bg-border-strong"
          />
          {pipeline.map((step, i) => (
            <li
              key={step.name}
              className={cn(
                "relative flex gap-3",
                i < pipeline.length - 1 ? "pb-6" : "pb-0",
              )}
            >
              <Node name={step.name} note={step.note} icon={step.icon} />
            </li>
          ))}
        </ol>
      </div>

      <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {caption ?? summary}
      </figcaption>
    </figure>
  );
}
