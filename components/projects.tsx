import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";

export function Projects() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <section id="projects" className="scroll-mt-20 py-24 container-px mx-auto max-w-6xl">
      <div className="relative mb-16 overflow-hidden py-6 text-center">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-display text-[clamp(6rem,20vw,14rem)] font-black leading-none text-foreground/5"
        >
          WORK
        </span>
        <div className="relative z-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Projects
          </p>
          <h2 className="font-display text-5xl font-black leading-none tracking-tight sm:text-7xl">
            MY <span className="text-accent">PORTFOLIO</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            A focused look at recent products, starting with TWQ, Fintrust, and
            the NFC app.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08}>
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 border border-accent px-5 py-3 text-xs font-bold uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          View All Projects
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
