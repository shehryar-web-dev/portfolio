import { atAGlance } from "@/data/profile";
import { Reveal } from "@/components/reveal";

/**
 * The scan-in-ten-seconds strip. Each item is a claim plus the specific
 * thing that backs it — no unverifiable counts.
 */
export function AtAGlance() {
  return (
    <section aria-labelledby="glance-heading" className="border-b border-border bg-surface">
      <div className="shell container-px py-14 sm:py-16">
        <h2 id="glance-heading" className="label">
          At a glance
        </h2>
        <Reveal>
          <ul className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {atAGlance.map((item) => (
              <li key={item.label} className="border-t border-border-strong pt-4">
                <p className="text-[15px] font-medium leading-snug text-foreground">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.proof}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
