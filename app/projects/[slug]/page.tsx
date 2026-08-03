import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const images = project.gallery?.length ? project.gallery : project.image ? [project.image] : [];
  const externalLinks = [
    project.liveUrl ? { label: "Live Site", href: project.liveUrl } : null,
    project.githubUrl ? { label: "Source Code", href: project.githubUrl } : null,
  ].filter((link): link is { label: string; href: string } => Boolean(link));
  const overviewSections = [
    project.businessProblem
      ? { label: "Business Problem", body: project.businessProblem }
      : null,
    project.solution ? { label: "Solution", body: project.solution } : null,
    project.result ? { label: "Result", body: project.result } : null,
  ].filter((section): section is { label: string; body: string } => Boolean(section));
  const detailLists = [
    project.keyFeatures?.length
      ? { label: "Key Features", items: project.keyFeatures }
      : null,
    project.contributions?.length
      ? { label: "My Contributions", items: project.contributions }
      : null,
    project.challenges?.length
      ? { label: "Technical Challenges", items: project.challenges }
      : null,
  ].filter((section): section is { label: string; items: string[] } => Boolean(section));

  return (
    <article className="mx-auto w-full max-w-6xl px-5 pb-24 pt-28">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All projects
      </Link>

      <header className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide gradient-text">
            {project.tagline}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {project.description}
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            Role
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {project.role}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <span
                key={item}
                className="rounded-md bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
          {externalLinks.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-accent px-4 py-2 text-xs font-bold uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {link.label}
                  <ExternalLink className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {(overviewSections.length > 0 || detailLists.length > 0) && (
        <section className="mt-12 space-y-10">
          {overviewSections.length > 0 && (
            <div className="grid gap-5 md:grid-cols-3">
              {overviewSections.map((section) => (
                <div
                  key={section.label}
                  className="rounded-lg border border-border bg-card p-5"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-accent">
                    {section.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          )}

          {detailLists.length > 0 && (
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              {detailLists.map((section) => (
                <section key={section.label}>
                  <p className="text-xs font-bold uppercase tracking-widest text-accent">
                    {section.label}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="border-l border-border pl-4 text-sm leading-relaxed text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </section>
      )}

      {images.length > 0 && (
        <section className="mt-10">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent">
                Project Screens
              </p>
              <h2 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
                Latest photos
              </h2>
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              {images.length} images
            </p>
          </div>

          <div className="-mx-5 overflow-x-auto px-5 pb-4 [scrollbar-width:thin]">
            <div className="flex snap-x snap-mandatory gap-4">
            {images.map((src, index) => (
              <figure
                key={src}
                className={
                  project.galleryLayout === "mobile"
                    ? "w-[min(78vw,22rem)] shrink-0 snap-center overflow-hidden rounded-lg border border-border bg-card sm:w-80"
                    : "w-[min(88vw,58rem)] shrink-0 snap-center overflow-hidden rounded-lg border border-border bg-card"
                }
              >
                <div
                  className={
                    project.galleryLayout === "mobile"
                      ? "relative aspect-[9/19.5] max-h-[72vh] bg-muted"
                      : "relative aspect-[16/9] max-h-[32rem] bg-muted"
                  }
                >
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    sizes={
                      project.galleryLayout === "mobile"
                        ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        : "(max-width: 768px) 100vw, 1152px"
                    }
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
                <figcaption className="border-t border-border px-3 py-2 font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(images.length).padStart(2, "0")}
                </figcaption>
              </figure>
            ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
