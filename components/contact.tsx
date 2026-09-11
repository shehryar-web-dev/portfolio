import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { CopyField } from "@/components/copy-field";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const socials = [
  { label: "GitHub", href: profile.socials.github, icon: GithubIcon },
  { label: "LinkedIn", href: profile.socials.linkedin, icon: LinkedinIcon },
];

/**
 * Closing CTA — the dark navy/teal slab, matching the rest of the section
 * banners but full-height: portrait, heading, the open-to roles, two
 * contact cards (email/phone), and a closing row of location + socials.
 */
export function Contact() {
  return (
    <section id="contact" className="slab scroll-mt-16">
      <span aria-hidden="true" className="slab-watermark">
        CONTACT
      </span>

      <div className="shell container-px relative z-10 py-20 sm:py-28">
        <div className="mx-auto max-w-xl text-center">
          <span
            className="relative mx-auto block h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 sm:h-20 sm:w-20"
            style={{ borderColor: "var(--slab-border)" }}
          >
            <Image
              src={profile.imagePath}
              alt=""
              fill
              sizes="80px"
              className="object-cover object-top"
            />
          </span>

          <p className="slab-label mt-6">Contact</p>

          <h2 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">
            Let&apos;s work{" "}
            <span style={{ color: "var(--slab-accent)" }}>together.</span>
          </h2>

          <p
            className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed"
            style={{ color: "var(--slab-muted)" }}
          >
            Open to {profile.openTo.slice(0, -1).join(", ")} and{" "}
            {profile.openTo[profile.openTo.length - 1]} roles — particularly where the hard
            part is reliability, asynchronous workflows, or an integration surface that has
            to hold together.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
          <CopyField
            icon={<Mail className="h-4.5 w-4.5" />}
            label="Email"
            value={profile.email}
            href={`mailto:${profile.email}`}
          />
          <CopyField
            icon={<Phone className="h-4.5 w-4.5" />}
            label="Phone"
            value={profile.phone}
            href={`tel:${profile.phone.replace(/\s+/g, "")}`}
          />
        </div>

        <div
          className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-5 border-t pt-8 sm:flex-row sm:justify-between"
          style={{ borderColor: "var(--slab-border)" }}
        >
          <p
            className="flex items-center gap-1.5 text-sm"
            style={{ color: "var(--slab-muted)" }}
          >
            <MapPin aria-hidden="true" className="h-4 w-4" />
            {profile.location}
          </p>

          <div className="flex items-center gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors hover:text-white"
                style={{ borderColor: "var(--slab-border)", color: "var(--slab-muted)" }}
              >
                <Icon className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
