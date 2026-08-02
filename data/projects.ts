/**
 * Projects shown across the homepage, all-projects page, and project details.
 * Store screenshots under /public/projects and reference them from the site root.
 */

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  description: string;
  role: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  imageFit?: "cover" | "contain";
  galleryLayout?: "screens" | "mobile";
  gallery?: string[];
  /** Featured projects render first and larger */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "twq",
    title: "TWQ",
    tagline: "Trading intelligence for Solana markets",
    summary:
      "A dark, data-forward trading interface with wallet connection, Solana DEX views, rug checks, pricing, and market intelligence flows.",
    description:
      "TWQ is a trading intelligence product focused on Solana market discovery and analysis. The uploaded screens show a complete landing experience, coin views, pricing, and rug-check style workflows with a consistent dark visual system.",
    role: "Built the frontend experience and translated the product flow into responsive screens.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Solana", "Wallet UI"],
    image: "/projects/TWQ/one.png",
    gallery: [
      "/projects/TWQ/one.png",
      "/projects/TWQ/two.png",
      "/projects/TWQ/three.png",
      "/projects/TWQ/four.png",
      "/projects/TWQ/five.png",
      "/projects/TWQ/six.png",
      "/projects/TWQ/seven.png",
      "/projects/TWQ/eight.png",
      "/projects/TWQ/nine.png",
    ],
    featured: true,
  },
  {
    slug: "fintrust",
    title: "Fintrust",
    tagline: "Finance dashboard and account experience",
    summary:
      "A clean fintech product interface covering authentication, account overview, balances, recent transactions, and currency management screens.",
    description:
      "Fintrust is a financial account interface with polished login, dashboard, transaction, fiat, and crypto currency screens. The latest project photos now drive the portfolio card and project gallery.",
    role: "Built the user-facing screens and responsive product UI.",
    tech: ["React", "TypeScript", "Tailwind", "Dashboard UI", "Fintech"],
    image: "/projects/fintrust/one.png",
    gallery: [
      "/projects/fintrust/one.png",
      "/projects/fintrust/two.png",
      "/projects/fintrust/three.png",
      "/projects/fintrust/four.png",
      "/projects/fintrust/five.png",
      "/projects/fintrust/six.png",
      "/projects/fintrust/seven.png",
      "/projects/fintrust/eight.png",
      "/projects/fintrust/nine.png",
      "/projects/fintrust/ten.png",
      "/projects/fintrust/eleven.png",
      "/projects/fintrust/image 39.png",
    ],
    featured: true,
  },
  {
    slug: "nfc-app",
    title: "NFC App",
    tagline: "Mobile loyalty program experience",
    summary:
      "A mobile-first loyalty app flow with onboarding, profile, rewards, card, and supporting screens for a member program experience.",
    description:
      "The NFC app is a mobile loyalty program interface. The project gallery includes tall mobile screens and wider feature screens so visitors can inspect the app flow in detail.",
    role: "Built the mobile UI screens and app flow presentation.",
    tech: ["React Native", "Mobile UI", "Loyalty", "NFC", "Rewards"],
    image: "/projects/NFC/one.jpg",
    imageFit: "contain",
    galleryLayout: "mobile",
    gallery: [
      "/projects/NFC/one.jpg",
      "/projects/NFC/two.jpg",
      "/projects/NFC/third.jpg",
      "/projects/NFC/four.jpg",
      "/projects/NFC/five.jpg",
      "/projects/NFC/six.jpg",
      "/projects/NFC/seven.jpg",
      "/projects/NFC/eight.png",
      "/projects/NFC/nine.png",
      "/projects/NFC/ten.png",
    ],
    featured: true,
  },
  {
    slug: "flyver",
    title: "Flyverr",
    tagline: "Digital marketplace interface",
    summary:
      "A marketplace product UI for digital products, filters, product cards, creator flows, and account screens.",
    description:
      "Flyverr is a digital marketplace interface with browsing, product cards, filters, and authentication views. The portfolio detail page uses the latest screenshots from the project folder.",
    role: "Built the marketplace frontend screens and reusable interface patterns.",
    tech: ["Next.js", "TypeScript", "Marketplace", "Tailwind"],
    image: "/projects/flyver/one.png",
    gallery: [
      "/projects/flyver/one.png",
      "/projects/flyver/Screenshot 2026-08-01 112758.png",
      "/projects/flyver/Screenshot 2026-08-01 112814.png",
      "/projects/flyver/Screenshot 2026-08-01 112838.png",
      "/projects/flyver/Screenshot 2026-08-01 213858.png",
      "/projects/flyver/Screenshot 2026-08-01 213922.png",
    ],
  },
  {
    slug: "mindfull-oasis",
    title: "Mind Oasis",
    tagline: "Mindfulness and token-gated wellness app",
    summary:
      "A calm wellness product with wallet connection, guided access, mindful activities, and token-gated experience screens.",
    description:
      "Mind Oasis is a wellness app interface centered on mindful habits, wallet access, and token-based progression. The detail page presents the uploaded screenshots as a project gallery.",
    role: "Built the landing and app interface screens for the mindfulness experience.",
    tech: ["Next.js", "Web3", "Wallet UI", "Wellness", "Tailwind"],
    image: "/projects/mindfull-oasis/one.png",
    gallery: [
      "/projects/mindfull-oasis/one.png",
      "/projects/mindfull-oasis/two.png",
      "/projects/mindfull-oasis/three.png",
      "/projects/mindfull-oasis/four.png",
      "/projects/mindfull-oasis/five.png",
      "/projects/mindfull-oasis/six.png",
      "/projects/mindfull-oasis/seven.png",
      "/projects/mindfull-oasis/eight.png",
      "/projects/mindfull-oasis/nine.png",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
