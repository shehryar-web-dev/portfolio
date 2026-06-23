import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ProfilePhoto } from "@/components/profile-photo";
import { profile } from "@/data/profile";
import { skillGroups, stats } from "@/data/skills";

export function About() {
  return (
    <Section id="about" eyebrow="About" title="A bit about me" watermark="ABOUT" className="bg-background-alt">
      <div className="grid gap-10 lg:grid-cols-5 lg:items-start">
        {/* Photo */}
        <Reveal className="lg:col-span-2">
          <ProfilePhoto
            src={profile.imagePath}
            alt={profile.name}
            initial={profile.name.charAt(0)}
            className="aspect-4/5 w-full max-w-sm"
          />
        </Reveal>

        {/* Bio */}
        <Reveal className="lg:col-span-3" delay={0.08}>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {profile.aboutShort}
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {profile.aboutLong}
          </p>
        </Reveal>
      </div>

      {/* ── Skills ── */}
      <div className="mt-24" id="skills">
        {/* "MY EXPERTISE" heading with "SKILLS" watermark */}
        <Reveal className="relative mb-14 overflow-hidden py-20 text-center">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-display text-[clamp(5rem,18vw,12rem)] font-black leading-none text-foreground/5"
          >
            SKILLS
          </span>
          <div className="relative z-10">
            <h3 className="font-display text-4xl font-black tracking-tight sm:text-5xl">
              MY <span className="text-accent">EXPERTISE</span>
            </h3>
          </div>
        </Reveal>

        {/* Category rows */}
        <div className="space-y-10">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.07}>
              {/* Row header */}
              <div className="mb-4 flex items-center gap-3">
                <span className="text-accent" aria-hidden>◆</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="font-display text-base font-black uppercase tracking-widest">
                  {group.category}
                </h4>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Skill tags */}
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* Stats bar */}
        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-2 divide-x divide-y divide-border border border-border sm:grid-cols-4 sm:divide-y-0">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center px-6 py-8"
              >
                <span className="font-display text-4xl font-black text-accent">
                  {s.value}
                </span>
                <span className="mt-2 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
