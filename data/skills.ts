/**
 * Skills grouped by category, shown in the About section.
 */

export type SkillGroup = {
  category: string;
  /** Short tagline for the group */
  blurb: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Core Stack",
    blurb: "Languages and frameworks I build with every day.",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "React Native",
      "TanStack",
      "Redux Toolkit",
    ],
  },
  {
    category: "Databases",
    blurb: "Relational, document, realtime, and vector stores.",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Firebase",
      "Supabase",
      "Redis",
      "Vector databases",
    ],
  },
  {
    category: "Cloud & DevOps",
    blurb: "Shipping, scaling, and hosting in production.",
    skills: ["AWS", "Docker", "Kubernetes", "S3"],
  },
  {
    category: "AI & Automation",
    blurb: "LLM apps, retrieval, and automated workflows.",
    skills: ["LLMs", "RAG", "Workflow Automation", "n8n"],
  },
];
