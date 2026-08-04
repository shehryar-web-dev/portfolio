export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "React Native",
      "Tailwind CSS",
      "Framer Motion",
      "Redux",
      "Zustand",
    ],
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "GraphQL",
      "REST API",
      "Prisma",
      "Redis",
    ],
  },
  {
    category: "AI & Automation",
    skills: [
      "LLMs",
      "RAG",
      "LangChain",
      "OpenAI API",
      "Pinecone",
      "n8n",
      "Workflow Automation",
    ],
  },
  {
    category: "Tools & Others",
    skills: [
      "Git",
      "Docker",
      "AWS",
      "Figma",
      "Jest",
      "CI/CD",
    ],
  },
];

export const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "25+", label: "Projects Shipped" },
  { value: "20+", label: "Happy Clients" },
  { value: "15+", label: "Technologies" },
];
