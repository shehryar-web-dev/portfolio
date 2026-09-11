import Image from "next/image";
import { profile } from "@/data/profile";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

/** About — full copy. This is a single page, so there is no separate /about to link to. */
export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Engineer first, framework second"
      watermark="ABOUT"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:gap-16">
        <Reveal>
          <div className="max-w-2xl space-y-5">
            {profile.aboutLong.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="lg:sticky lg:top-24">
            <div className="relative aspect-[4/5] w-full max-w-[16rem] overflow-hidden rounded-lg border border-border bg-surface">
              <Image
                src={profile.imagePath}
                alt={`Portrait of ${profile.fullName}`}
                fill
                sizes="(max-width: 1024px) 60vw, 16rem"
                className="object-cover object-top"
              />
            </div>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="label mb-1">Currently</dt>
                <dd className="text-muted-foreground">
                  Full Stack Developer at Weiblocks
                </dd>
              </div>
              <div>
                <dt className="label mb-1">Based</dt>
                <dd className="text-muted-foreground">{profile.location}</dd>
              </div>
              <div>
                <dt className="label mb-1">Open to</dt>
                <dd className="text-muted-foreground">{profile.openTo.join(", ")}</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
