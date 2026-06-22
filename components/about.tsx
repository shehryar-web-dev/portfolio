import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ProfilePhoto } from "@/components/profile-photo";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";

export function About() {
  return (
    <Section id="about" eyebrow="About" title="A bit about me">
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

      {/* Skills */}
      <div className="mt-16" id="skills">
        <Reveal>
          <h3 className="text-xl font-semibold">Skills &amp; tools</h3>
        </Reveal>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/40">
                <h4 className="text-lg font-semibold">{group.category}</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {group.blurb}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-lg border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
