/**
 * Skills grouped by category. `level` shows an honest depth cue:
 *  - "core": you can talk about it in depth in an interview
 *  - "familiar": you've used it and are comfortable, but it's not your strongest
 */

export type SkillLevel = "core" | "familiar";

export type Skill = {
  name: string;
  level: SkillLevel;
};

export type SkillGroup = {
  category: string;
  /** Short tagline for the group */
  blurb: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    blurb: "Interfaces that are fast, accessible, and nice to use.",
    skills: [
      { name: "React", level: "core" },
      { name: "Next.js", level: "core" },
      { name: "TypeScript", level: "core" },
      { name: "Tailwind CSS", level: "core" },
      { name: "Framer Motion", level: "familiar" },
      { name: "HTML5 / CSS3", level: "core" },
    ],
  },
  {
    category: "Backend",
    blurb: "APIs and services that power the product.",
    skills: [
      { name: "Node.js", level: "core" },
      { name: "NestJS", level: "core" },
      { name: "REST APIs", level: "core" },
      { name: "Prisma", level: "familiar" },
      { name: "PostgreSQL", level: "familiar" },
      { name: "MongoDB", level: "familiar" },
    ],
  },
  {
    category: "Blockchain / Web3",
    blurb: "On-chain apps and smart contracts on Solana.",
    skills: [
      { name: "Solana", level: "core" },
      { name: "Rust / Anchor", level: "familiar" },
      { name: "@solana/web3.js", level: "core" },
      { name: "Phantom Wallet", level: "core" },
      { name: "dApp Frontends", level: "core" },
    ],
  },
  {
    category: "AI Engineering",
    blurb: "LLM products: chatbots, RAG, and tool use.",
    skills: [
      { name: "LLM APIs (OpenAI / Anthropic)", level: "core" },
      { name: "RAG (embeddings, vector DB)", level: "core" },
      { name: "Prompt Engineering", level: "core" },
      { name: "Vercel AI SDK", level: "familiar" },
      { name: "Function Calling / Tool Use", level: "familiar" },
    ],
  },
  {
    category: "DevOps / Tools",
    blurb: "Shipping, hosting, and collaborating.",
    skills: [
      { name: "Git / GitHub", level: "core" },
      { name: "Docker", level: "familiar" },
      { name: "AWS", level: "familiar" },
      { name: "DigitalOcean", level: "familiar" },
      { name: "Supabase", level: "familiar" },
      { name: "Vercel", level: "core" },
      { name: "Figma", level: "familiar" },
    ],
  },
];
