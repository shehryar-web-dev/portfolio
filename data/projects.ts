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
  businessProblem?: string;
  solution?: string;
  keyFeatures?: string[];
  contributions?: string[];
  challenges?: string[];
  result?: string;
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
      "An event-driven crypto analytics platform for Solana traders with market intelligence, wallet authentication, rug checks, AI insights, and Telegram alerts.",
    description:
      "TWQ is an event-driven cryptocurrency analytics platform focused on the Solana ecosystem. It helps traders monitor newly launched tokens, analyze contract risks, receive personalized Telegram alerts, and access AI-powered market insights through one unified dashboard.",
    businessProblem:
      "Crypto traders often switch between CoinGecko, Birdeye, Solana Explorer, Telegram groups, TradingView, and rug-checking tools. Important opportunities and risks can be missed because market events happen continuously across many disconnected sources.",
    solution:
      "TWQ aggregates blockchain activity, token market data, wallet authentication, contract risk analysis, AI-assisted insights, and preference-based notifications into a single product experience.",
    keyFeatures: [
      "Solana market analytics dashboard",
      "Wallet authentication with Phantom, Solflare, MetaMask, and WalletConnect",
      "Contract risk analysis with liquidity and holder distribution checks",
      "Personalized Telegram notification workflows",
      "AI-powered chatbot and market insight experience",
      "User preference management for alert filtering",
    ],
    contributions: [
      "Developed the wallet authentication flow using Phantom, Solflare, and WalletConnect.",
      "Implemented wallet signature verification and JWT-based authentication.",
      "Built responsive dashboard interfaces for market analytics and user preferences.",
      "Integrated external cryptocurrency data providers including CoinGecko and Birdeye.",
      "Designed the notification workflow for personalized Telegram alerts.",
      "Developed contract risk analysis features including liquidity verification and holder distribution analysis.",
      "Integrated GPT-4 for AI-powered chatbot functionality.",
      "Built reusable frontend components and connected backend APIs.",
      "Optimized state management and API communication for real-time dashboard updates.",
    ],
    challenges: [
      "Supporting multiple wallet providers while keeping one consistent login experience.",
      "Normalizing real-time cryptocurrency data from APIs with different response formats, update frequencies, and rate limits.",
      "Filtering Telegram alerts around user preferences to reduce unnecessary notifications.",
      "Combining liquidity, holder concentration, ownership, and token metadata into a practical risk analysis flow.",
      "Keeping market dashboard updates responsive while token prices and events change frequently.",
    ],
    result:
      "Delivered an MVP cryptocurrency analytics platform that combines wallet authentication, market analytics, AI-assisted insights, personalized Telegram notifications, and contract risk analysis in one user experience.",
    role: "Frontend Developer focused on wallet authentication, dashboard UI, API integration, notifications, and user experience.",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "NestJS",
      "Solana Wallet Adapter",
      "WalletConnect",
      "JWT",
      "Redis",
      "CoinGecko API",
      "Birdeye API",
      "GPT-4",
      "Telegram Bot API",
    ],
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
    tagline: "Solana staking and rewards platform",
    summary:
      "A full-stack decentralized staking platform on Solana with token purchases, configurable staking tiers, referrals, cashback, vesting, and admin controls.",
    description:
      "FinTrust is a full-stack decentralized staking and rewards platform built on Solana. It enables users to purchase platform tokens, stake assets across configurable reward tiers, earn cashback and referral incentives, claim vested NFT-based rewards, and participate in ICO phases through smart contracts and an administrative management system.",
    businessProblem:
      "Traditional staking products often stop at basic token locking and reward distribution. FinTrust was built to combine staking, vesting, referrals, cashback, ICO participation, KYC, and administrative tokenomics controls in one blockchain application.",
    solution:
      "The platform connects a responsive dashboard, backend reward services, PostgreSQL data, and Solana smart contract interactions so users and administrators can manage the complete staking economy from one place.",
    keyFeatures: [
      "Wallet-based authentication with Solana Wallet Adapter",
      "Token purchase and ICO participation flows",
      "Configurable staking tiers and reward visualization",
      "Cashback, referral, and transaction history screens",
      "NFT-based vesting and reward claim experience",
      "Administrative dashboard for tokenomics and reward management",
    ],
    contributions: [
      "Built wallet-based authentication using Solana Wallet Adapter.",
      "Developed staking and rewards user interfaces.",
      "Integrated backend APIs for staking, rewards, referrals, and cashback.",
      "Implemented transaction history and reward visualization screens.",
      "Connected frontend screens with smart contract interactions.",
      "Developed reusable React components for staking workflows.",
      "Implemented responsive dashboard layouts.",
      "Participated in blockchain integration and testing across staking, vesting, and reward flows.",
    ],
    challenges: [
      "Synchronizing on-chain blockchain state with off-chain PostgreSQL data.",
      "Managing asynchronous blockchain transaction confirmations.",
      "Designing secure wallet authentication without traditional passwords.",
      "Handling reward calculations across multiple staking tiers.",
      "Building responsive interfaces for complex staking workflows.",
      "Maintaining consistency between smart contract state and backend services.",
    ],
    result:
      "Delivered a production-ready Solana staking platform supporting token sales, configurable staking tiers, NFT-based vesting, cashback, referrals, KYC-enabled ICO participation, and administrative reward controls.",
    role: "Frontend Developer focused on wallet authentication, staking workflows, dashboard UI, API integration, and blockchain flow testing.",
    tech: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "React Query",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Solana",
      "Anchor",
      "Rust",
      "SPL Token",
      "Metaplex NFT",
      "Docker",
      "REST APIs",
    ],
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
      "A full-stack customer loyalty platform using NFC check-ins, blockchain-backed NFT rewards, mobile membership flows, and merchant/admin dashboards.",
    description:
      "NFC Loyalty System is a full-stack customer loyalty platform that enables merchants to build stronger customer relationships using NFC technology and blockchain-based NFTs. Customers can check in at participating businesses, earn NFT-based loyalty rewards, progress through membership tiers, and manage their loyalty history through a mobile app while merchants and administrators manage the ecosystem through web dashboards.",
    businessProblem:
      "Traditional loyalty programs rely on physical cards, QR codes, or manual points systems that are easy to lose, hard to manage, and limited in customer engagement.",
    solution:
      "The system modernizes loyalty by combining NFC-based check-ins, blockchain-powered NFT rewards, merchant management, centralized administration, and mobile customer history into one digital platform.",
    keyFeatures: [
      "Mobile loyalty application for customers",
      "NFC customer check-in workflows",
      "NFT rewards and membership tier progression",
      "Merchant dashboard for customer and activity management",
      "Admin dashboard for merchants, users, rewards, and settings",
      "Cloud media, map, email, and IPFS integrations",
    ],
    contributions: [
      "Developed responsive user interfaces for the merchant and administration dashboards.",
      "Built and integrated REST APIs with the frontend.",
      "Implemented wallet-based user authentication using Privy.",
      "Developed customer check-in and merchant connection workflows.",
      "Integrated NFT minting and tier upgrade functionality into the application flow.",
      "Built reusable React components and optimized application state management.",
      "Connected Google Maps, Cloudinary, and IPFS services with backend APIs.",
      "Participated in deployment and production environment configuration using PM2 and Nginx.",
    ],
    challenges: [
      "Integrating secure wallet authentication with Privy and backend token validation.",
      "Synchronizing NFT minting and tier upgrades with customer check-in flows.",
      "Keeping mobile app, merchant dashboard, admin dashboard, and backend behavior aligned through shared APIs.",
      "Designing a check-in workflow that identifies merchants, verifies users, records visits, upgrades tiers, mints NFTs, and updates dashboards.",
      "Managing NFT media and metadata through Cloudinary and Pinata/IPFS.",
      "Deploying independent applications behind Nginx with PM2 process management and production API communication.",
    ],
    result:
      "Successfully delivered a full-stack NFC loyalty platform with mobile, merchant, admin, and backend services that helps businesses digitize loyalty through NFC check-ins, NFT rewards, centralized merchant management, and automated customer engagement workflows.",
    role: "Full-stack contributor focused on dashboards, REST API integration, wallet authentication, NFC check-in flows, NFT rewards, and deployment support.",
    tech: [
      "React Native",
      "Expo",
      "React",
      "Vite",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT Authentication",
      "Privy Authentication",
      "Wallet Authentication",
      "NFT Minting",
      "IPFS",
      "Pinata",
      "Cloudinary",
      "Google Maps API",
      "Brevo Email",
      "PM2",
      "Nginx",
    ],
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
      "A digital marketplace for limited downloadable products with creator selling tools, licensing, resale flows, dashboards, reviews, analytics, and payments.",
    description:
      "Flyverr is a modern digital marketplace that enables creators to sell limited digital products such as eBooks, templates, courses, and downloadable assets. The platform also introduces a controlled resale marketplace where buyers can purchase products either for personal use or future resale under platform-defined licensing rules.",
    businessProblem:
      "Digital creators usually sell products once and lose future earning opportunities. Traditional marketplaces do not create scarcity or encourage resale, so creators, buyers, and the platform have limited ways to keep earning after the first sale.",
    solution:
      "Flyverr creates a complete marketplace ecosystem with authentication, product management, payments, user dashboards, reviews, analytics, and licensing-aware resale flows.",
    keyFeatures: [
      "Creator product listing and management screens",
      "Marketplace browsing, filters, and product detail pages",
      "Controlled digital product licensing and resale model",
      "User dashboard, profile, reviews, and analytics experiences",
      "Authentication and account management flows",
      "Payment-ready frontend integrations for marketplace checkout",
    ],
    contributions: [
      "Designed and implemented responsive user interfaces using Next.js, TypeScript, Tailwind CSS, and ShadCN UI.",
      "Built reusable and scalable UI components to improve maintainability.",
      "Integrated frontend screens with backend REST APIs using Axios.",
      "Implemented authentication, marketplace, product detail, dashboard, and profile-related screens.",
      "Focused on smooth user experience across desktop and mobile devices.",
      "Collaborated with backend developers to integrate APIs and ensure accurate data flow.",
      "Participated in UI refinement, usability improvements, and frontend optimization.",
    ],
    challenges: [
      "Building scalable marketplace component architecture for shared cards, filters, dashboards, and account screens.",
      "Integrating multiple backend endpoints while maintaining loading, error, and success states.",
      "Designing responsive layouts for filters, product grids, dashboards, and tables across desktop, tablet, and mobile.",
      "Improving navigation, page consistency, and visual hierarchy across many marketplace workflows.",
    ],
    result:
      "Delivered a modern, responsive marketplace interface aligned with product requirements, integrated with backend APIs, and structured around reusable UI components that support future feature development.",
    role: "Frontend Developer focused on frontend design, API integration, reusable components, marketplace flows, and user experience.",
    tech: [
      "Next.js 14",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "ShadCN UI",
      "Axios",
      "App Router",
      "Node.js",
      "Express.js",
      "Supabase",
      "PostgreSQL",
      "JWT",
      "Supabase Auth",
      "Stripe",
      "Paystack",
      "Sentry",
      "PostHog",
      "SendGrid",
      "Supabase Storage",
      "REST APIs",
    ],
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
