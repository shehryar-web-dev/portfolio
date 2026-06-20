/**
 * Central profile + site configuration.
 * Edit this file to update your name, bio, links, and SEO metadata.
 */

export const profile = {
  name: "Shehryar",
  /** Used in <title> and headings, e.g. "Shehryar — Full-Stack Engineer" */
  role: "Full-Stack · Blockchain · AI Engineer",
  headline: "Full-Stack Engineer building AI-powered & Solana dApps.",
  subline:
    "I'm Shehryar — I build fast, interactive web apps with React/Next.js, on-chain (Solana) integrations, and AI-powered products. I turn ideas into polished, production-ready software.",

  aboutShort:
    "I'm a full-stack developer who builds modern, interactive web apps with React and Next.js, backed by Node/NestJS APIs. I've gone deep into two high-impact areas: blockchain — integrating Solana wallets and writing on-chain smart contracts — and AI engineering, where I build chatbots and RAG (“chat with your docs”) apps on top of LLM APIs. I also work fluently with AI tools to ship faster and smarter.",

  aboutLong:
    "My background is in web development — building responsive, accessible interfaces with React, Next.js, TypeScript, and Tailwind, paired with Node.js/NestJS backends. As the web evolved, so did I: I started integrating Solana into apps (wallet connections, on-chain transactions, and smart contracts with Rust/Anchor) and building AI features — from streaming chatbots to retrieval-augmented apps that answer questions from a user's own documents. What sets my work apart is that I don't just use AI to write code — I build with it deliberately, combining solid web fundamentals with modern AI and blockchain layers. If you need someone who can own the frontend, wire up the integrations, and ship — that's me.",

  email: "usamalatif13001@gmail.com",
  location: "Remote · Available worldwide",

  /** Path to the resume PDF inside /public */
  resumePath: "/resume.pdf",

  socials: {
    github: "https://github.com/shehryar",
    linkedin: "https://www.linkedin.com/in/shehryar",
    twitter: "https://x.com/shehryar",
  },
} as const;

export const siteConfig = {
  /** Update to your real domain before deploy (used for SEO / Open Graph) */
  url: "https://shehryar.dev",
  title: `${profile.name} — ${profile.role}`,
  description:
    "Portfolio of Shehryar, a full-stack engineer building AI-powered web apps, RAG chatbots, and Solana dApps with React, Next.js, NestJS, Rust, and LLM APIs.",
  keywords: [
    "Shehryar",
    "Full-Stack Engineer",
    "Next.js Developer",
    "React Developer",
    "Solana dApp",
    "Blockchain Developer",
    "AI Engineer",
    "RAG",
    "NestJS",
  ],
} as const;
