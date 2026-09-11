import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/**
 * The eight-part case study, consistent across every project:
 *   01 Problem · 02 Product · 03 My Role · 04 Architecture
 *   05 Engineering Challenges · 06 Engineering Decisions · 07 Outcome · 08 Technology
 *
 * The screenshot gallery (where a project has one) sits right under the
 * header, always visible, before the engineering write-up begins.
 */

function Part({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border py-10 sm:py-14">
      <div className="grid gap-6 lg:grid-cols-[10rem_1fr] lg:gap-12">
        <h2 className="label lg:pt-1">
          <span className="mr-2 text-faint">{index}</span>
          {title}
        </h2>
        <div className="min-w-0 max-w-3xl">{children}</div>
      </div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-4 text-[15px] leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-[0.68em] before:h-1 before:w-1 before:rounded-full before:bg-border-strong"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function CaseStudy({
  project,
  next,
}: {
  project: Project;
  next?: Project;
}) {
  const images = project.gallery?.length
    ? project.gallery
    : project.image
      ? [project.image]
      : [];

  const externalLinks = [
    project.liveUrl ? { label: "Live site", href: project.liveUrl } : null,
    project.githubUrl ? { label: "Source code", href: project.githubUrl } : null,
  ].filter((l): l is { label: string; href: string } => Boolean(l));

  return (
    <article>
      {/* ── Header ── */}
      <header className="border-b border-border">
        <div className="shell container-px py-12 sm:py-16">
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            All work
          </Link>

          <p className="label mt-8">{project.category}</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-5xl">{project.title}</h1>
          <p className="mt-3 text-lg text-accent">{project.tagline}</p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {project.summary}
          </p>

          {project.facts && project.facts.length > 0 && (
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-8 sm:grid-cols-4">
              {project.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="sr-only">{fact.label}</dt>
                  <dd>
                    <span className="block font-mono text-xl font-medium leading-none text-foreground">
                      {fact.value}
                    </span>
                    <span className="mt-2 block text-xs leading-snug text-faint">
                      {fact.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {externalLinks.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border-strong px-3 py-1.5 text-sm transition-colors hover:bg-surface-2"
                >
                  {link.label}
                  <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {images.length > 0 && (
        <section className="border-b border-border bg-surface">
          <div className="shell container-px py-10 sm:py-14">
            <p className="label mb-6">Interface</p>
            <ul
              className={cn(
                "grid gap-4",
                project.galleryLayout === "mobile"
                  ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                  : "sm:grid-cols-2",
              )}
            >
              {images.map((src, i) => (
                <li
                  key={src}
                  className={cn(
                    "relative overflow-hidden rounded-md border border-border bg-background",
                    project.galleryLayout === "mobile"
                      ? "aspect-[9/19]"
                      : "aspect-[16/10]",
                  )}
                >
                  <Image
                    src={src}
                    alt={`${project.title} interface, screen ${i + 1}`}
                    fill
                    priority={i === 0}
                    loading={i === 0 ? undefined : "lazy"}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                    className={
                      project.imageFit === "contain" ? "object-contain" : "object-cover"
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <div className="shell container-px">
        <Part index="01" title="Problem">
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            {project.problem}
          </p>
        </Part>

        <Part index="02" title="Product">
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            {project.product}
          </p>
        </Part>

        <Part index="03" title="My role">
          <p className="text-[15px] leading-relaxed text-foreground-soft">{project.role}</p>
          <p className="label mb-3 mt-8">What I personally owned</p>
          <Bullets items={project.owned} />
        </Part>

        <Part index="04" title="Architecture">
          <Reveal>
            <ArchitectureDiagram architecture={project.architecture} />
          </Reveal>
        </Part>

        <Part index="05" title="Engineering challenges">
          <Bullets items={project.challenges} />
        </Part>

        <Part index="06" title="Engineering decisions">
          <ul className="space-y-6">
            {project.decisions.map((decision) => (
              <li
                key={decision.choice}
                className="rounded-lg border border-border bg-surface p-5"
              >
                <p className="text-[15px] font-medium leading-snug text-foreground">
                  {decision.choice}
                </p>
                <dl className="mt-4 space-y-3">
                  <div>
                    <dt className="label mb-1">Because</dt>
                    <dd className="text-sm leading-relaxed text-muted-foreground">
                      {decision.because}
                    </dd>
                  </div>
                  <div>
                    <dt className="label mb-1">Trade-off</dt>
                    <dd className="text-sm leading-relaxed text-muted-foreground">
                      {decision.tradeoff}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </Part>

        <Part index="07" title="Outcome">
          <Bullets items={project.outcome} />
          <p className="mt-6 border-l-2 border-border pl-4 text-[13px] leading-relaxed text-faint">
            Described in terms of what changed structurally. No traffic, revenue or
            user figures are claimed, because this codebase carries no such
            instrumentation to verify them against.
          </p>
        </Part>

        <Part index="08" title="Technology">
          <ul className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground"
              >
                {t}
              </li>
            ))}
          </ul>
        </Part>
      </div>

      {next && (
        <div className="border-t border-border bg-surface">
          <div className="shell container-px py-10">
            <Link
              href={`/work/${next.slug}`}
              className="group flex flex-wrap items-end justify-between gap-4"
            >
              <span>
                <span className="label">Next case study</span>
                <span className="mt-2 block text-xl font-semibold sm:text-2xl">
                  {next.title}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {next.tagline}
                </span>
              </span>
              <ArrowRight
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      )}
    </article>
  );
}
