import { Blocks, Bot, Code2 } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/profile";

const specialties = [
  {
    icon: Code2,
    title: "Full-Stack Web",
    body: "React, Next.js & TypeScript on the front; Node.js / NestJS APIs behind them.",
  },
  {
    icon: Blocks,
    title: "Blockchain (Solana)",
    body: "Wallet integrations, on-chain transactions, and smart contracts in Rust/Anchor.",
  },
  {
    icon: Bot,
    title: "AI Engineering",
    body: "LLM-powered chatbots and RAG apps that answer from your own documents.",
  },
];

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Building across the full stack">
      <div className="grid gap-10 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {profile.aboutShort}
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            I love taking a product from idea to a clean, shipped experience —
            owning the frontend, wiring up the integrations, and getting it live.
          </p>
        </Reveal>

        <div className="grid gap-4 lg:col-span-2">
          {specialties.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="flex gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/40">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
