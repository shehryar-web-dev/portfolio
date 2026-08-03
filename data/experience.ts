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
    role: "Full Stack Developer",
    org: "Weiblocks",
    period: "2023 - 2026",
    current: true,
    highlights: [
      "Worked on blockchain-based web applications across frontend, backend, API integration, wallet flows, and production-ready product interfaces.",
      "Built responsive dashboards and dApp screens using React, Next.js, TypeScript, Tailwind CSS, and modern component patterns.",
      "Integrated backend services, REST APIs, authentication flows, and Web3 functionality for staking, rewards, marketplace, and loyalty products.",
      "Collaborated with product and backend teams to turn requirements into scalable full-stack features.",
    ],
    tech: [
      "React",
      "Next.js",
      "React native",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "NestJS",
      "Web3"
    ],
  },
  {
    role: "Frontend Developer Intern",
    org: "Excellence Code Solution",
    period: "2023 - 2 months",
    highlights: [
      "Completed a two-month frontend development internship focused on building responsive web interfaces.",
      "Practiced React, JavaScript, HTML, CSS, and component-based UI development through real project tasks.",
      "Worked with senior developers to improve page layouts, fix UI issues, and understand production frontend workflows.",
    ],
    tech: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
];
