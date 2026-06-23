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
      "Tailwind CSS",
      "Framer Motion",
      "Vue",
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
      "Cypress",
      "Vite",
      "Webpack",
    ],
  },
];

export const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "40+", label: "Projects Shipped" },
  { value: "20+", label: "Happy Clients" },
  { value: "15+", label: "Technologies" },
];
