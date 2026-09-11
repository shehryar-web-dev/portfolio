/**
 * Kept for backwards compatibility with older sections.
 * The site's primary capability content now lives in data/engineering.ts.
 *
 * NOTE: the previous version of this file carried unverifiable marketing figures
 * ("25+ projects shipped", "20+ happy clients"). They have been replaced with
 * counts that are checkable against the codebases themselves.
 */

export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Backend",
    skills: [
      "Node.js",
      "NestJS",
      "Express",
      "PostgreSQL",
      "Prisma",
      "MongoDB",
      "Redis",
      "BullMQ",
      "Socket.IO",
      "REST",
    ],
  },
  {
    category: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "React Native",
      "TanStack Query",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    category: "Blockchain",
    skills: ["Solana", "Anchor", "Rust", "SPL Token", "ethers.js", "XRPL", "Helius"],
  },
  {
    category: "Infrastructure & Tools",
    skills: ["Docker", "Nginx", "PM2", "AWS S3", "GitHub Actions", "Git", "Sentry"],
  },
];

/** Verifiable counts only — nothing here is traffic, revenue or client numbers. */
export const stats = [
  { value: "3 yrs", label: "In production engineering" },
  { value: "8", label: "Production systems" },
  { value: "4", label: "Backend stacks" },
  { value: "2", label: "Blockchain ecosystems" },
];
