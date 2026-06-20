import { Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something"
      description="Have a role, a project, or just want to say hi? Drop me a message — I read everything."
    >
      <div className="grid gap-8 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <div className="space-y-6">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Mail className="h-5 w-5" />
              </span>
              {profile.email}
            </a>
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <MapPin className="h-5 w-5" />
              </span>
              {profile.location}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-3" delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
