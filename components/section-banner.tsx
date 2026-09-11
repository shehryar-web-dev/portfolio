import { cn } from "@/lib/utils";

/**
 * The dark navy/teal heading slab used to open every major section.
 * A giant, very faint watermark word sits behind a small accent eyebrow and
 * a bold white heading — then the section's actual content continues on the
 * normal (light) page background below it.
 */
export function SectionBanner({
  eyebrow,
  title,
  description,
  watermark,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  /** Short word rendered huge and faint behind the heading. Defaults to the eyebrow. */
  watermark?: string;
  className?: string;
}) {
  return (
    <div className={cn("slab", className)}>
      <span aria-hidden="true" className="slab-watermark">
        {watermark ?? eyebrow}
      </span>
      <div className="shell container-px relative z-10 py-14 text-center sm:py-20">
        <p className="slab-label">{eyebrow}</p>
        <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">{title}</h2>
        {description && (
          <p
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed"
            style={{ color: "var(--slab-muted)" }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
