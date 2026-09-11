import { Plus } from "lucide-react";
import { decisionQA } from "@/data/engineering";
import { Section } from "@/components/section";

/**
 * Engineering Decisions — the section that separates "I shipped a UI" from
 * "I chose this and here is what it cost".
 *
 * Uses native <details>/<summary> so it works without JavaScript, is
 * keyboard-operable by default, and is announced correctly by screen readers.
 */
export function Decisions() {
  return (
    <Section
      id="decisions"
      eyebrow="Engineering decisions"
      title="Why these systems are shaped the way they are"
      description="Every answer below comes from a decision actually made in one of these codebases, including what it cost. A decision with no trade-off is not a decision."
      watermark="DECISIONS"
    >
      <ul className="overflow-hidden rounded-lg border border-border">
        {decisionQA.map((item) => (
          <li key={item.question} className="border-b border-border last:border-b-0">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-start gap-4 px-5 py-4 transition-colors hover:bg-surface [&::-webkit-details-marker]:hidden sm:px-7 sm:py-5">
                <span className="flex-1 text-[15px] font-medium leading-snug text-foreground">
                  {item.question}
                </span>
                <span className="mt-0.5 flex shrink-0 items-center gap-3">
                  <span className="hidden font-mono text-[11px] text-faint sm:inline">
                    {item.source}
                  </span>
                  <Plus
                    aria-hidden="true"
                    className="h-4 w-4 text-faint transition-transform duration-200 group-open:rotate-45"
                  />
                </span>
              </summary>
              <div className="px-5 pb-5 sm:px-7 sm:pb-6">
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
                <p className="mt-3 font-mono text-[11px] text-faint sm:hidden">
                  {item.source}
                </p>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </Section>
  );
}
