/**
 * Central profile + site configuration.
 * Edit this file to update your name, bio, links, and SEO metadata.
 */

export const profile = {
  name: "Shehryar",
  /** Used in <title> and headings */
  role: "Senior Full Stack Engineer",
  /** Keep it short — exactly one "&" (the part after it is highlighted in the hero) */
  headline: "I build fast, modern web & AI products.",
  subline:
    "I design and build polished products end to end — from clean, interactive interfaces to reliable backends and AI features that feel effortless.",

  aboutShort:
    "I'm a full-stack engineer who turns ideas into clean, production-ready products. I care about fast, intuitive interfaces, dependable backends, and AI features that genuinely help people — and I love owning a product from idea to launch.",

  aboutLong:
    "I build modern products end to end — from the interface a user touches to the services and data behind it. Lately I've focused on AI: chat assistants, retrieval over your own documents, and workflow automation that removes busywork. What sets my work apart is shipping: I take an idea, build it cleanly, and get it live.",

  email: "shehryarwebdev@gmail.com",
  /** Placeholder — replace with your real number */
  phone: "+92 311 1404107",
  location: "Remote · Available worldwide",

  /** Photo shown in the About section. Drop a file at /public/profile.jpg */
  imagePath: "/profile.png",

  /** Path to the resume PDF inside /public */
  resumePath: "/resume.pdf",

  socials: {
    github: "https://github.com/shehryar-web-dev",
    linkedin: "https://www.linkedin.com/in/shehryar-naeem-831691213/",
    twitter: "https://x.com/shehryar",
  },
} as const;

export const siteConfig = {
  /** Update to your real domain before deploy (used for SEO / Open Graph) */
  url: "https://shehryar.dev",
  title: `${profile.name} — ${profile.role}`,
  description:
    "Portfolio of Shehryar — a full-stack & AI engineer who designs and builds fast, modern, production-ready products from idea to launch.",
  keywords: [
    "Shehryar",
    "Full-Stack Engineer",
    "Software Engineer",
    "AI Engineer",
    "Web Developer",
    "React Native Developer",
    "Portfolio",
  ],
} as const;
