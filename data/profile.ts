/**
 * Central profile + site configuration.
 * Everything the site says about who Shehryar is lives here.
 *
 * Content rule for this file (and every data file in this folder):
 * no invented metrics, users, revenue, traffic, or business outcomes.
 * Numbers appear only where they are verifiable from the underlying codebases.
 */

export const profile = {
  name: "Shehryar",
  fullName: "Shehryar Naeem",

  /** Primary identity — used in <title>, hero, and structured data. */
  role: "Full Stack Developer",

  /** Supporting strengths. Deliberately ordered: backend first. */
  focus: [
    "Backend Engineering",
    "System Design",
    "Event-Driven Architecture",
    "API Development",
    "Cloud & DevOps",
    "AI / LLM Applications",
    "Blockchain / Solana",
  ],

  /** The kinds of systems actually shipped — shown in the hero, not a skills list. */
  systemsBuilt: [
    "Multi-Tenant Systems",
    "Event-Driven Systems",
    "Real-Time Trading Systems",
    "Marketplace Platforms",
    "Async & Queue Processing Pipelines",
    "Blockchain Integration Systems",
    "AI/LLM-Integrated Products",
    "Internal Ops Tooling",
  ],

  /** The one sentence a recruiter reads first. */
  headline: "Latency is a constraint. Engineer for it.",

  /** Hero paragraph. Concrete, not aspirational. */
  lede:
    "The theory behind reliable systems. Not performance optimization or scaling hacks — the structural decisions that decide whether your system survives when the network is slow, dependencies timeout, or a provider silently returns the wrong data. These come from three years of shipping event-driven backends, blockchain integrations, and payment systems where failure is not theoretical.",

  /** Short version used on cards and meta descriptions. */
  aboutShort:
    "Full-stack engineer working across backend architecture, event-driven systems, and the frontend/API integration layer — with production work spanning Solana and XRPL blockchain platforms, real-time trading and social products, marketplaces, and internal operations tooling.",

  aboutLong: [
    "I work at the seam where systems meet: the API integration layer, the auth and session model, and the data-shape boundary that everything else in an application ends up built on top of. It is the least glamorous part of most products and the part that decides whether the rest of it holds together.",
    "Most of my production work has been on systems with an unforgiving external dependency — a blockchain that confirms transactions asynchronously, a webhook provider that disconnects if you respond slowly, a wallet extension the user can close halfway through signing. Those constraints are what make the architecture interesting: you cannot design only for the path where everything works.",
    "Across eight production systems I have built webhook ingestion and queue-based worker pipelines, exactly-once disbursement engines over at-least-once blockchain primitives, wallet-signature state machines rebuilt independently three times, multi-tenant authorization layers, and the frontend integration architecture that consumes all of it.",
    "I care about naming what is still wrong. Every project I have documented in depth ships with a ranked list of its own real defects, including ones in code I wrote. That is part of the engineering work, not an admission that undermines it.",
  ],

  /** What I am actually open to — used in the About and Contact sections. */
  openTo: [
    "Full Stack Engineering",
    "Backend Engineering",
    "Distributed & Event-Driven Systems",
    "AI Engineering",
  ],

  email: "shehryarwebdev@gmail.com",
  phone: "+92 311 1404107",
  location: "Remote · Available worldwide",

  imagePath: "/profile.png",
  resumePath: "/resume.pdf",

  socials: {
    github: "https://github.com/shehryar-web-dev",
    linkedin: "https://www.linkedin.com/in/shehryar-naeem-831691213/",
    twitter: "https://x.com/shehryar",
  },
} as const;

/**
 * The recruiter "at a glance" strip.
 * `proof` is a short, factual supporting line — never a marketing claim.
 */
export type GlanceItem = {
  label: string;
  proof: string;
};

export const atAGlance: GlanceItem[] = [
  {
    label: "3 years in production engineering",
    proof: "Full-stack engineer at Weiblocks since 2023, after a frontend internship.",
  },
  {
    label: "8 production systems",
    proof:
      "Trading, staking, loyalty, marketplace, social, wellness and internal ops platforms.",
  },
  {
    label: "Backend & system design",
    proof:
      "NestJS and Express services, PostgreSQL/Prisma and MongoDB, Redis, BullMQ, Socket.IO.",
  },
  {
    label: "Event-driven & async processing",
    proof:
      "Webhook ingestion, Redis Streams, queue workers, transactional outbox, idempotent consumers.",
  },
  {
    label: "Blockchain engineering",
    proof:
      "Solana Anchor/Rust programs and XRPL integrations; custodial and non-custodial signing models.",
  },
  {
    label: "AI / LLM integration",
    proof:
      "GPT-4 advisory grounded in computed indicators, with caching and a deterministic fallback.",
  },
];

export const siteConfig = {
  /** Update to the real domain before deploy (used for SEO / Open Graph). */
  url: "https://shehryar.dev",
  title: `${profile.name} — ${profile.role}`,
  description:
    "Shehryar is a full-stack developer building backend architecture, event-driven systems, and API integration layers for production blockchain, AI and marketplace products.",
  keywords: [
    "Shehryar",
    "Full Stack Developer",
    "Backend Engineer",
    "System Design",
    "Event-Driven Architecture",
    "NestJS",
    "Node.js",
    "Next.js",
    "Solana",
    "Anchor",
    "AI Engineer",
    "Distributed Systems",
  ],
} as const;
