/**
 * Professional experience.
 *
 * Bullets follow: what I owned → what problem existed → how I engineered it → what resulted.
 * No invented metrics: figures are structural counts from the codebases themselves.
 */

export type Experience = {
  role: string;
  org: string;
  period: string;
  current?: boolean;
  /** One-line framing of the role. */
  summary?: string;
  /** Systems worked on during this role, by project slug. */
  systems?: string[];
  /** Engineering contributions in owned → problem → approach → result form. */
  highlights: string[];
  tech?: string[];
};

export const experiences: Experience[] = [
  {
    role: "Full Stack Developer",
    org: "Weiblocks",
    period: "2023 — Present",
    current: true,
    summary:
      "Building production web and blockchain platforms end to end — backend services, smart-contract integration, and the frontend/API layer that consumes them.",
    systems: ["twq", "dibzi", "socialfi-trading", "fintrust", "flyverr", "social-locket", "lindo-mart"],
    highlights: [
      "Owned the ingestion path for an event-driven Solana analytics platform. Because the webhook provider disconnects subscribers that respond slowly, doing work inside the handler risked silent event loss under exactly the market conditions the product existed for — so the handler acknowledges before validating anything, writes the raw event to a capped Redis Stream, and hands processing to a separate worker pool across three queues. Webhook response time is now fully independent of how long downstream processing takes.",
      "Engineered an exactly-once disbursement engine over an at-least-once blockchain primitive. A token transfer can land on-chain while its confirmation is lost, so a write-ahead-log row is inserted before submission and the transaction signature is persisted in a separate unconditional write if effects-application later fails — letting a reconciler finish the job without ever resubmitting. This closed the double-pay and lost-pay failure class on admin-signed payouts.",
      "Migrated a social trading engine from a custodial, database-only ledger to a non-custodial, wallet-signed model across a NestJS backend and four Solana Anchor programs, and moved trade pricing from a cached database row to live on-chain state — closing a recurring on-chain slippage rejection traced to quoting against stale supply.",
      "Inverted the NFT metadata architecture on an NFC loyalty platform after a fully built IPFS pipeline proved structurally wrong for the product: pinning made already-issued rewards permanently uneditable. Pointing the token URI at a fixed API address and computing the metadata document per request from live database state made tier progression — the core product mechanic — possible at all.",
      "Established the frontend integration architecture for a marketplace from an empty scaffold — a single HTTP client with token refresh, a features/<domain>/{services, hooks, types} convention, live server-verified route gating, and query-key invalidation on mutation. A teammate was still building unrelated features on that convention six weeks after my own commits stopped.",
      "Built a nine-domain reference-data subsystem across eight REST controllers and five NestJS modules, and found six real authorization and data-integrity defects in inherited code — including a JavaScript truthiness bug in a shared roles guard that made every intended-public endpoint reject every caller, and a form visibility query that let a Supervisor read another Supervisor's forms.",
      "Integrated GPT-4 as an advisory layer grounded in eight technical indicators computed from raw price history, cached, with a weighted rule-based scorer as a deterministic fallback — so the feature still returns a real prediction when the model provider is unavailable.",
    ],
    tech: [
      "TypeScript",
      "Node.js",
      "NestJS",
      "Express",
      "PostgreSQL",
      "Prisma",
      "MongoDB",
      "Redis",
      "BullMQ",
      "Socket.IO",
      "Next.js",
      "React",
      "React Native",
      "TanStack Query",
      "Tailwind CSS",
      "Solana",
      "Anchor",
      "Rust",
      "XRPL",
      "Docker",
      "Nginx",
      "PM2",
    ],
  },
  {
    role: "Frontend Developer Intern",
    org: "Excellence Code Solution",
    period: "2023 · 2 months",
    summary: "First production exposure — responsive interfaces and component-based UI work.",
    highlights: [
      "Built responsive web interfaces with React, JavaScript, HTML and CSS, working through real project tasks rather than exercises.",
      "Worked alongside senior developers on layout corrections and UI defects, which is where the habit of reading existing code before changing it started.",
    ],
    tech: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
];
