/**
 * Central profile + site configuration.
 * Edit this file to update your name, bio, links, and SEO metadata.
 */

export const profile = {
  name: "Shehryar",
  /** Used in <title> and headings */
  role: "AI Engineer",
  /** Keep it short — exactly one "&" (the part after it is highlighted in the hero) */
  headline: "I build fast, modern web & AI products.",
  subline:
    "Helping businesses turn ambitious ideas into digital reality. Creating solutions that are reliable, scalable, and user-focused.",

  aboutShort:
    "I'm a full-stack engineer who turns ideas into clean, production-ready products. I care about fast, intuitive interfaces, dependable backends, and AI features that genuinely help people — and I love owning a product from idea to launch.",

  aboutLong: [
    "I love understanding systems from the inside out.",
    "Whether it's a web application, a database, or a large language model, I'm always asking the same questions: Why was it built? What problem does it solve? How does it work internally?",
    "I'm a Software Engineer with experience building modern web applications and I'm currently focused on becoming an AI Engineer. My journey started with web development, but my curiosity has taken me deeper into distributed systems, databases, cloud infrastructure, machine learning, and large language models.",
    "I enjoy building projects, experimenting with new technologies, and continuously improving my understanding of software architecture. I'm not interested in memorizing frameworks—I prefer learning the underlying concepts that make technologies work.",
    "My long-term goal is to build intelligent, scalable products that combine strong software engineering practices with artificial intelligence. I believe the best engineers never stop learning, and that's the mindset I bring to every project I work on.",
  ],

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
