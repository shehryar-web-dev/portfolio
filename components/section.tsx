import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionBanner } from "@/components/section-banner";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  /** Short word for the giant watermark behind the heading. Defaults to the eyebrow. */
  watermark?: string;
};

/**
 * The page-section primitive: a dark navy/teal heading slab (eyebrow, title,
 * optional lead, giant watermark word), followed by the section's content on
 * the normal light page background.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  watermark,
}: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-16", className)}>
      <SectionBanner
        eyebrow={eyebrow}
        title={title}
        description={description}
        watermark={watermark}
      />
      <div className="shell container-px py-14 sm:py-20">{children}</div>
    </section>
  );
}

/** A plain (non-slab) heading block, for lighter-weight pages like /blog. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && <p className="label mb-3">{eyebrow}</p>}
      <Tag
        className={cn(
          "font-semibold",
          Tag === "h1" ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl",
        )}
      >
        {title}
      </Tag>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
