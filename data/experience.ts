/**
 * Experience timeline. Most recent first.
 * Use `current: true` for your ongoing role. Edit freely with your real history.
 */

export type Experience = {
  role: string;
  org: string;
  period: string;
  current?: boolean;
  highlights: string[];
  tech?: string[];
};

export const experiences: Experience[] = [
  {
    role: "Full-Stack & AI Product Engineer",
    org: "Independent / Freelance",
    period: "2024 — Present",
    current: true,
    highlights: [
      "Built AI Pixel Board — a two-sided web product with a 1,000,000-pixel HTML Canvas grid and a searchable AI tools directory, with an SEO-driven programmatic-pages strategy.",
      "Shipped a RAG assistant (“Chat with My Docs”) with a full chunking → embeddings → vector-search pipeline and a streaming chat UI that cites its sources.",
      "Owned features end to end — UI, API integrations, and LLM/blockchain layers — using AI coding tools to ship faster while keeping quality through review.",
    ],
    tech: ["Next.js", "TypeScript", "NestJS", "OpenAI / Anthropic", "pgvector"],
  },
  {
    role: "Frontend / Web3 Developer",
    org: "Freelance Projects",
    period: "2023 — 2024",
    highlights: [
      "Integrated Solana wallets (Phantom) and on-chain transactions into React/Next.js dApp frontends.",
      "Built responsive, accessible interfaces in React + TypeScript + Tailwind, deployed to production.",
      "Collaborated with clients to turn requirements into clean, shipped experiences.",
    ],
    tech: ["React", "Next.js", "Solana", "@solana/web3.js", "Tailwind"],
  },
];
