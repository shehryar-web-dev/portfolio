import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";
import { ButtonLink } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

/**
 * The first screen has one job: say who this is, what kind of engineer,
 * and what they can be handed — before the reader scrolls.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Static hairline grid. No motion, no glow — it is texture, not decoration. */}
      <div
        aria-hidden="true"
        className="hairline-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
      />

      <div className="shell container-px relative flex flex-col items-center py-12 text-center sm:py-16 lg:py-20">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-border sm:h-20 sm:w-20">
          <Image
            src={profile.imagePath}
            alt={profile.fullName}
            fill
            sizes="80px"
            className="object-cover object-top"
            priority
          />
        </div>

        <p className="label mt-4">{profile.role}</p>

        <h1 className="mt-4 max-w-4xl text-2xl font-semibold leading-[1.15] sm:text-4xl lg:text-5xl">
          {profile.headline}
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {profile.lede}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/#work" size="lg">
            View my work
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/#contact" variant="outline" size="lg">
            Contact me
          </ButtonLink>
        </div>

        {/* What kind of systems get built, not a generic skills list. */}
        <div className="mt-12 border-t border-border pt-6">
          <p className="label">Systems I build</p>
          <ul className="mt-3 flex flex-wrap justify-center gap-x-2 gap-y-2">
            {profile.systemsBuilt.slice(0, 4).map((item) => (
              <li
                key={item}
                className="rounded border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
