/**
 * Projects shown in the Projects section.
 * Add a screenshot to /public/projects and set `image` to e.g. "/projects/my-app.png".
 * When `image` is omitted, a stylized gradient cover is rendered automatically.
 */

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  /** Featured projects render first and larger */
  featured?: boolean;
  /** Marks a card as a template to fill in later */
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    slug: "ai-pixel-board",
    title: "AI Pixel Board",
    tagline: "Live AI tools marketplace & directory",
    description:
      "A two-sided web product on a single domain: a 1,000,000-pixel grid (1000×1000, rendered on HTML Canvas) where AI tool companies buy blocks to place a logo linking to their tool, wrapped around a searchable AI tools directory of thousands of tools. Built for both buyers (visibility) and seekers (discovery), with a heavy SEO / programmatic-pages strategy.",
    role: "Designed and built the product end to end — the interactive canvas board, the directory pages, and the purchase flow.",
    tech: ["Next.js 14", "HTML Canvas", "TypeScript", "Tailwind", "SEO / SSG"],
    liveUrl: "https://needaiforthis.com",
    githubUrl: undefined,
    featured: true,
  },
  {
    slug: "chat-with-my-docs",
    title: "Chat with My Docs",
    tagline: "RAG-powered AI assistant",
    description:
      "An AI app where users upload their PDFs/notes and ask questions in plain language. It answers using only those documents and shows exactly which source each answer came from. Uses the full RAG stack: chunking, embeddings, vector search, prompting, and a streaming chat UI.",
    role: "Built the chat interface, the document ingestion + embedding pipeline, and the retrieval logic.",
    tech: [
      "Next.js",
      "Vercel AI SDK",
      "pgvector",
      "Embeddings",
      "OpenAI / Anthropic",
    ],
    liveUrl: undefined,
    githubUrl: undefined,
    featured: true,
  },
  {
    slug: "automation-suite",
    title: "Automation Suite",
    tagline: "Workflow automation that removes busywork",
    description:
      "Automated pipelines that connect apps, sync data, and trigger AI actions on a schedule or event — turning repetitive manual steps into reliable, hands-off workflows. (Template card — fill in your real project details and links.)",
    role: "Designed the automation flows and the integrations between services.",
    tech: ["n8n", "Webhooks", "REST APIs", "AI actions"],
    liveUrl: undefined,
    githubUrl: undefined,
    placeholder: true,
  },
  {
    slug: "cross-platform-app",
    title: "Cross-Platform Mobile App",
    tagline: "One codebase, iOS & Android",
    description:
      "A polished mobile app built from a single codebase — native-feeling navigation, offline-friendly data, and push notifications. (Template card — fill in your real project details and links.)",
    role: "Built the app UI, state management, and API integration.",
    tech: ["React Native", "TypeScript", "TanStack Query", "Redux Toolkit"],
    liveUrl: undefined,
    githubUrl: undefined,
    placeholder: true,
  },
];
