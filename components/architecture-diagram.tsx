import type { Architecture } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Data-driven technical diagrams. Two shapes:
 *
 *  · pipeline — a linear flow, rendered as a chain of steps. Vertical on
 *    phones, horizontal and wrapping from `sm` up, so it stays readable
 *    without ever forcing horizontal page scroll.
 *  · layers  — stacked tiers (clients / services / state), rendered as
 *    labelled rows of nodes.
 *
 * Both are plain semantic lists with the connectors hidden from assistive
 * technology, so a screen reader gets the sequence rather than a pile of arrows.
 */

/**
 * The connector between two steps.
 *
 * The pipeline lays out as 1 / 2 / 4 columns depending on how much room the
 * diagram's *container* has (container queries, not viewport breakpoints —
 * the same diagram appears full-width on a case study and half-width in a
 * two-up comparison). `hideAt` removes the connector on the step that ends a
 * row at a given column count, so no arrow ever dangles off a row edge.
 */
function Arrow({ position }: { position: number }) {
  const endsRowAt2 = position % 2 === 0;
  const endsRowAt4 = position % 4 === 0;

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center py-1 text-faint @md:w-6 @md:py-0",
        endsRowAt2 ? "@md:hidden" : "@md:flex",
        endsRowAt4 ? "@2xl:hidden" : "@2xl:flex",
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 rotate-90 @md:rotate-0"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

function Node({
  name,
  note,
  index,
}: {
  name: string;
  note?: string;
  index?: number;
}) {
  return (
    <div className="min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-2.5">
      {typeof index === "number" && (
        <span className="label mb-1 block text-[10px]">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <span className="block text-[13px] font-medium leading-snug text-foreground">
        {name}
      </span>
      {note && (
        <span className="mt-0.5 block font-mono text-[11px] leading-snug text-faint">
          {note}
        </span>
      )}
    </div>
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
  const { summary, pipeline, layers } = architecture;

  return (
    <figure className={cn("m-0", className)}>
      <div className="@container rounded-lg border border-border bg-surface p-4 sm:p-6">
        {pipeline && pipeline.length > 0 && (
          <ol className="grid grid-cols-1 gap-y-0 @md:grid-cols-2 @md:gap-y-2 @2xl:grid-cols-4">
            {pipeline.map((step, i) => (
              <li key={step.name} className="flex flex-col @md:flex-row @md:items-center">
                <Node name={step.name} note={step.note} index={i} />
                {i < pipeline.length - 1 && <Arrow position={i + 1} />}
              </li>
            ))}
          </ol>
        )}

        {layers && layers.length > 0 && (
          <ul className={cn("space-y-3", pipeline && pipeline.length > 0 && "mt-6")}>
            {layers.map((layer, i) => (
              <li key={layer.label}>
                <div className="rounded-md border border-border bg-background p-3 @md:flex @md:items-start @md:gap-4">
                  <p className="label mb-2 shrink-0 @md:mb-0 @md:w-28 @md:pt-1.5">
                    {layer.label}
                  </p>
                  <div className="flex flex-1 flex-wrap gap-2">
                    {layer.nodes.map((node) => (
                      <div
                        key={node.name}
                        className="min-w-0 flex-1 rounded border border-border bg-surface px-2.5 py-1.5 @md:flex-none"
                      >
                        <span className="block text-[13px] font-medium leading-snug">
                          {node.name}
                        </span>
                        {node.note && (
                          <span className="mt-0.5 block font-mono text-[11px] leading-snug text-faint">
                            {node.note}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                {i < layers.length - 1 && (
                  <div aria-hidden="true" className="flex justify-center py-1">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-faint"
                    >
                      <path d="M12 5v14M6 13l6 6 6-6" />
                    </svg>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {caption ?? summary}
      </figcaption>
    </figure>
  );
}
