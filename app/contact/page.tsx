import type { Metadata } from "next";
import type { ComponentType } from "react";
import { Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Shehryar — by email, phone, or LinkedIn.",
};

type Method = {
  label: string;
  value: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  external?: boolean;
};

const methods: Method[] = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s+/g, "")}`,
    icon: Phone,
  },
  {
    label: "LinkedIn",
    value: "Connect on LinkedIn",
    href: profile.socials.linkedin,
    icon: LinkedinIcon,
    external: true,
  },
  {
    label: "GitHub",
    value: "See my work on GitHub",
    href: profile.socials.github,
    icon: GithubIcon,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div className="pt-16">
      <Section
        id="contact"
        eyebrow="Contact"
        title="Let's connect"
        description="Prefer email or a quick call? Here's the best way to reach me — I read everything."
      >
        <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
          {methods.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06}>
              <a
                href={m.href}
                {...(m.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <m.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{m.label}</span>
                  <span className="block truncate text-sm text-muted-foreground">
                    {m.value}
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
