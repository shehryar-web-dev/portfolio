/**
 * Engineering case studies.
 *
 * Every project below follows the same eight-part structure so they can be
 * compared against each other:
 *   01 Problem · 02 Product · 03 My Role · 04 Architecture
 *   05 Engineering Challenges · 06 Engineering Decisions · 07 Outcome · 08 Technology
 *
 * CONTENT RULE: no invented metrics. `facts` entries are structural counts read
 * directly from the codebase, schema, config or commit history. Nothing here is
 * traffic, revenue, user counts, or business results, because none of these
 * repositories carry that instrumentation.
 */

/**
 * What role a pipeline step plays, so the diagram can draw a distinct icon
 * per step instead of a plain numbered box:
 *   trigger  — the external event or user action that starts this run
 *   inbound  — the surface that receives it (webhook, endpoint, client)
 *   gate     — a check, guard, or signature this step cannot proceed without
 *   queue    — buffered, streamed, or handed to a worker pool
 *   compute  — business logic runs here
 *   store    — state is read or written (database or chain)
 *   notify   — the result reaches a person or another system
 */
export type PipelineIcon =
  | "trigger"
  | "inbound"
  | "gate"
  | "queue"
  | "compute"
  | "store"
  | "notify";

export type Architecture = {
  /** One-sentence description of the shape of the system. */
  summary: string;
  /** How the system actually behaves at runtime: the steps a request or event
   * moves through, in order, rendered as a connected flow diagram. Describes
   * mechanism (what happens, and why at that step), not the tech stack. */
  pipeline: { name: string; note?: string; icon: PipelineIcon }[];
};

export type Decision = {
  /** The choice, phrased as a decision. */
  choice: string;
  /** Why — the constraint that forced it. */
  because: string;
  /** What it cost. A decision with no trade-off is not a decision. */
  tradeoff: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Short domain label, e.g. "Trading infrastructure". */
  category: string;
  tagline: string;
  /** One-line product description used on cards. */
  summary: string;

  /** 01 */ problem: string;
  /** 02 */ product: string;
  /** 03 */ role: string;
  /** 03 */ owned: string[];
  /** 04 */ architecture: Architecture;
  /** 05 */ challenges: string[];
  /** 06 */ decisions: Decision[];
  /** 07 */ outcome: string[];
  /** 08 */ tech: string[];

  /** Verifiable structural counts. Shown as a small stat row. */
  facts?: { value: string; label: string }[];

  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  imageFit?: "cover" | "contain";
  galleryLayout?: "screens" | "mobile";
  gallery?: string[];
  /** Featured projects appear on the homepage, ordered by engineering depth. */
  featured?: boolean;
};

export const projects: Project[] = [
  /* ─────────────────────────────────────────────────────────────── */
  {
    slug: "twq",
    title: "TWQ",
    category: "Event-driven market intelligence",
    tagline: "Acknowledge the webhook first, process it later",
    summary:
      "A Solana token intelligence platform built on webhook ingestion, Redis Streams and queue workers — with contract risk analysis, Telegram alerting, and AI advisory grounded in indicators computed from raw price history.",

    problem:
      "Blockchain events do not wait. Helius disconnects a webhook subscriber that responds slowly, and a dropped event is simply gone — there is no replay. Doing real work inside the webhook handler therefore guarantees data loss under exactly the conditions the product exists for: high market activity. On top of that, the token data the product depends on arrives from providers with different response shapes, update frequencies and rate limits, and it is frequently incomplete.",
    product:
      "A single dashboard for Solana traders: newly launched token tracking, contract risk analysis with liquidity and holder-distribution checks, preference-filtered Telegram alerts, wallet-signature login, and an AI advisory layer.",
    role:
      "Sole engineer — backend, frontend, and all eight external integrations.",
    owned: [
      "Built the ingestion path that acknowledges a webhook before doing any validation or work, writing the raw event to a capped Redis Stream for a separate worker pool to consume.",
      "Implemented eight technical indicators — RSI, MACD, SMA, EMA, Bollinger Bands, Stochastic, ADX, OBV — from primary formulas, with no charting library involved.",
      "Built the AI advisory layer to explain computed indicators rather than predict from raw prices, cached, with a weighted rule-based scorer that still produces a real answer when OpenAI is unavailable.",
      "Designed the alert-matching engine and the preference model that filters Telegram notifications per user.",
      "Built the Next.js frontend on a single HTTP client with centralized token injection and 401 handling — no ad-hoc fetch calls anywhere in the codebase.",
      "Tuned cache lifetimes to how fast the underlying data actually changes: 30 seconds for live prices, up to 24 hours for reference data.",
    ],

    architecture: {
      summary:
        "Ingestion is fully decoupled from processing: the handler's only job is to return 200 fast and durably record the event.",
      pipeline: [
        { name: "Solana", note: "on-chain activity", icon: "trigger" },
        { name: "Helius webhook", note: "disconnects slow subscribers", icon: "inbound" },
        { name: "Handler", note: "ACK 200 before any work", icon: "gate" },
        { name: "Redis Stream", note: "capped at ~100k entries", icon: "queue" },
        { name: "Worker pool", note: "3 BullMQ queues", icon: "compute" },
        { name: "MongoDB", note: "tokens, rules, history", icon: "store" },
        { name: "Alert matcher", note: "per-user preferences", icon: "compute" },
        { name: "Telegram", note: "3 delivery modes", icon: "notify" },
      ],
    },

    challenges: [
      "Helius drops slow subscribers, so any work done before acknowledging the webhook is a data-loss risk.",
      "Six market data providers return different shapes, refresh at different rates, and enforce different rate limits.",
      "Liquidity data is often missing for exactly the newly launched tokens the product exists to surface.",
      "An LLM asked to predict prices from raw numbers produces confident nonsense, and it can be down when a user asks.",
      "Supporting Phantom, Solflare, MetaMask and WalletConnect while keeping one consistent login experience and one session model.",
    ],

    decisions: [
      {
        choice: "Acknowledge the webhook before validating or processing it.",
        because:
          "The provider's timeout behaviour, not the application's convenience, determines what the handler is allowed to do.",
        tradeoff:
          "The system becomes eventually consistent, and there are two moving parts to reason about instead of one.",
      },
      {
        choice: "Treat a missing liquidity value as 'skip this check', not 'reject this token'.",
        because:
          "A naive numeric filter silently discards brand-new tokens, which are precisely what the product is for.",
        tradeoff:
          "More false positives — accepted deliberately, because a missed alert is worse than an extra one.",
      },
      {
        choice:
          "Compute the indicators deterministically and use the model only to explain them, with a non-AI fallback.",
        because:
          "Grounding the model in real computed signals makes the output checkable, and the product must still work when OpenAI does not.",
        tradeoff: "A cached answer can be up to three hours stale.",
      },
    ],

    outcome: [
      "Webhook response time is fully decoupled from downstream processing, so a slow third-party API or stalled worker can no longer cause a dropped event.",
      "Token research moved from a manual routine across several disconnected tools into one workflow that runs unattended.",
      "The AI layer degrades to a real, deterministic prediction instead of an error page when the model provider is unavailable.",
      "No passwords and no private keys are stored anywhere in the system — authentication is a signature challenge.",
    ],

    facts: [
      { value: "8", label: "external providers integrated" },
      { value: "8", label: "indicators from primary formulas" },
      { value: "3", label: "BullMQ queues" },
      { value: "~100k", label: "capped Redis Stream entries" },
    ],

    tech: [
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "Redis Streams",
      "BullMQ",
      "Next.js 14",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "Solana Wallet Adapter",
      "WalletConnect",
      "JWT",
      "OpenAI GPT-4",
      "Telegram Bot API",
      "Helius",
      "Birdeye",
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

  /* ─────────────────────────────────────────────────────────────── */
  {
    slug: "dibzi",
    title: "Dibzi",
    category: "NFC loyalty + on-chain rewards",
    tagline: "Making an immutable reward editable",
    summary:
      "An NFC check-in loyalty platform where rewards are blockchain tokens — spanning a mobile app, two role-scoped dashboards and a backend, with 90% of commits across four codebases.",

    problem:
      "The product's core mechanic is tier progression: check in, climb a tier, get better reward artwork. But a reward minted as a blockchain token with metadata pinned to IPFS is permanently frozen — a merchant can never update the artwork or copy on a reward already issued. The full IPFS pipeline was built and working before that immutability was understood to be structurally wrong for the product. Separately, an incorrect tier downgrade would be written permanently and publicly to a chain.",
    product:
      "Customers tap an NFC tag at a participating business, earn token-based loyalty rewards, and progress through membership tiers in a mobile app. Merchants manage customers and activity in one dashboard; platform admins manage merchants, rewards and settings in another.",
    role:
      "Lead engineer across four codebases — backend API, React Native app, admin dashboard, merchant dashboard.",
    owned: [
      "Inverted the NFT metadata architecture: the token URI became a permanent address pointing at Dibzi's own API, and the document it returns is computed at request time from live database state.",
      "Built the tier-resolution engine to recompute eligibility from thresholds on every check-in, making an incorrect downgrade structurally inexpressible rather than merely guarded against.",
      "Engineered the NFC hardware session lifecycle, releasing the hardware lock in a finally on every exit path and bounding every wait with an explicit 60-second timeout.",
      "Solved the Node/browser build bridge that let a Node-only Web3/IPFS dependency tree bundle for a browser at all — an explicit builtin alias map, a dev/prod polyfill plugin pair, and a 15-line interop shim for a transitive dependency with no documented fix.",
      "Shipped a per-visit history schema migration across three simultaneously-live data formats with no downtime and no data loss.",
      "Modelled loyalty state as belonging to the merchant–customer relationship rather than to either party.",
      "Produced a ranked defect audit of the platform, including findings against my own work.",
    ],

    architecture: {
      summary:
        "The token points at a stable URL; the metadata behind that URL is generated on demand, so editing a reward is a database write rather than a blockchain transaction.",
      pipeline: [
        { name: "NFC tap", note: "hardware session, 60s bound", icon: "trigger" },
        { name: "Check-in API", note: "identify merchant + verify user", icon: "inbound" },
        { name: "Tier resolution", note: "recomputed from thresholds", icon: "compute" },
        { name: "Mint / upgrade", note: "ethers.js", icon: "store" },
        { name: "Token URI", note: "fixed → Dibzi API", icon: "inbound" },
        { name: "Metadata endpoint", note: "computed from live DB state", icon: "compute" },
        { name: "Dashboards", note: "merchant + admin", icon: "notify" },
      ],
    },

    challenges: [
      "Reward artwork on an already-issued token has to be editable, but the token itself is immutable by design.",
      "A wrong tier downgrade is a permanent, public record — guarding against it in application code is not strong enough.",
      "NFC hardware fails in three distinguishable ways — absent, disabled, or working — and the app previously failed silently across all of them.",
      "A Node-only Web3/IPFS dependency tree would not bundle for a browser, and one transitive dependency had no documented fix anywhere.",
      "Shipping a new per-visit history format while two older formats were still live in production, with no downtime window available.",
    ],

    decisions: [
      {
        choice:
          "Point the token URI at a permanent address on Dibzi's own API and compute the metadata document per request.",
        because:
          "Immutable storage is the right default for provenance and the wrong default for a reward whose artwork the merchant is expected to edit.",
        tradeoff:
          "Metadata correctness now depends on this API's uptime rather than on a decentralized network's.",
      },
      {
        choice: "Recompute tier eligibility from thresholds on every check-in, never from a stored position.",
        because:
          "If a downgrade cannot be expressed by the code path at all, it cannot happen — which is stronger than validating against it.",
        tradeoff: "A sort on every check-in instead of an O(1) stored-pointer lookup.",
      },
      {
        choice: "Express invitation-token validity inside the database query predicate itself.",
        because:
          "Security that depends on a developer remembering to check something after the fetch will eventually be forgotten.",
        tradeoff: "The rule lives in the query rather than somewhere obvious in the service layer.",
      },
    ],

    outcome: [
      "Tier progression — the mechanic the entire product is built on — became possible at all.",
      "Artwork and copy on already-issued rewards are now updated from a web form at no blockchain cost.",
      "A hardware interaction that used to fail silently now distinguishes absent hardware from disabled hardware and recovers.",
      "Per-visit history shipped across three live schema formats with zero downtime and zero data loss.",
    ],

    facts: [
      { value: "4", label: "codebases kept in sync" },
      { value: "3,345", label: "lines of documentation, sole author" },
      { value: "23", label: "defects found and ranked in audit" },
    ],

    tech: [
      "React Native",
      "Expo",
      "Node.js",
      "Express",
      "MongoDB",
      "ethers.js",
      "React 19",
      "Vite",
      "Privy",
      "JWT",
      "IPFS",
      "Pinata",
      "Cloudinary",
      "Google Maps API",
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

  /* ─────────────────────────────────────────────────────────────── */
  {
    slug: "socialfi-trading",
    title: "SocialFi Trading",
    category: "Social trading platform",
    tagline: "Every post and comment is a tradeable on-chain asset",
    summary:
      "A social platform where content is priced on a Solana bonding curve — real-time feeds and comments on one side, a non-custodial trading engine and four smart contracts on the other.",

    problem:
      "A social product where content carries real financial value cannot be built the way a normal social app is built. Every like-equivalent is a trade, every trade moves money, and the platform sits between a user's wallet and an on-chain program that confirms asynchronously. The original implementation held user funds custodially and priced trades from a cached database row — which produced a recurring, named failure mode where a trade quoted against stale supply was rejected on-chain for slippage.",
    product:
      "A mobile-first social network where posts and comments are minted as tradeable assets priced by a bonding curve. Users post, comment with audio and video, share content in from other apps, follow each other, and buy or sell positions in content — with a moderation pipeline, staking, lending, a DAO module, and an admin analytics console behind it.",
    role:
      "Full-stack engineer across the NestJS backend, four Solana Anchor programs, the React Native app, and the React admin console.",
    owned: [
      "Migrated the trading engine from a custodial, database-only ledger to a non-custodial, wallet-signed model — the backend builds transactions but never signs on a user's behalf.",
      "Built the blockchain indexer that reconciles on-chain trade events against the synchronous write path, keyed on an idempotency hash derived from the transaction signature.",
      "Engineered the real-time comment and notification pipeline on a transactional outbox with a poller, fanned out over Socket.IO rooms scoped per entry and per user.",
      "Built a native iOS Share Extension in Swift, handing content into React Native through App Groups and shared UserDefaults.",
      "Remediated two security findings: a platform signer keypair held in plaintext environment variables, and a single hardcoded encryption key shared across every mobile install.",
      "Wrote admin-only on-chain recovery instructions that bypass normal Borsh deserialization to rescue program-derived accounts stranded in an incompatible layout after an upgrade.",
    ],

    architecture: {
      summary:
        "Trades are prepared server-side, signed in the user's wallet, and confirmed on-chain — then reconciled by an indexer that cannot double-write, because the idempotency key is derived from the transaction signature itself.",
      pipeline: [
        { name: "Mobile app", note: "React Native", icon: "trigger" },
        { name: "Prepare trade", note: "NestJS builds unsigned tx", icon: "compute" },
        { name: "Wallet deep link", note: "user signs in Phantom", icon: "gate" },
        { name: "Broadcast", note: "Solana bonding-curve program", icon: "store" },
        { name: "Indexer", note: "reads on-chain trade events", icon: "inbound" },
        { name: "Idempotent write", note: "sha256(txSignature) key", icon: "store" },
        { name: "Outbox", note: "notification recorded in same tx", icon: "queue" },
        { name: "Poller → Socket.IO", note: "per-entry / per-user rooms", icon: "notify" },
      ],
    },

    challenges: [
      "A mobile wallet round trip can be interrupted by the operating system suspending the app — the signing session has to survive process recreation, not just a backgrounded screen.",
      "The bonding-curve pricing formula and fee constants exist in both Rust and TypeScript and cannot share an implementation, so they have to be proven numerically identical from two sides.",
      "A single trade changes data rendered on many unrelated screens — feed, market, holdings, portfolio, wallet transactions, leaderboard — so cache invalidation is a design problem, not an afterthought.",
      "A program upgrade left program-derived accounts in an old memory layout that the new Anchor code refused to deserialize, surfacing in production as error 3003.",
      "Fixing the shared mobile encryption key could not simply rotate it — existing installs held data encrypted under the old one.",
    ],

    decisions: [
      {
        choice:
          "Move trading off a custodial database ledger to non-custodial, wallet-signed transactions.",
        because:
          "A platform that holds user funds to execute trades carries a custodial-loss failure class no amount of application code removes.",
        tradeoff:
          "The backend can build a transaction but cannot complete one on the user's behalf — every trade needs a live wallet round trip, including on mobile.",
      },
      {
        choice: "Recompute trade cost from live on-chain state, never the cached database copy.",
        because:
          "The database copy of token supply lags the chain, and quoting against it is what produced the recurring on-chain slippage rejections.",
        tradeoff: "An extra RPC read on every quote, in exchange for closing a named bug class.",
      },
      {
        choice:
          "Derive the trade idempotency key from the on-chain transaction signature — sha256(\"onchain:\" + txSignature).",
        because:
          "The indexer and the synchronous confirm path can both observe the same trade, and a check that runs in application code can race.",
        tradeoff:
          "The safety is a database uniqueness constraint rather than a code path, so it is invisible until someone reads the schema.",
      },
      {
        choice:
          "Ship a per-install random encryption key with a one-time backward-compatible migration, instead of rotating the shared one.",
        because:
          "A hardcoded key shared across every install means one extracted key compromises every device — but existing users already had data under it.",
        tradeoff:
          "A migration step every existing install runs once, rather than a clean break that would have lost their local state.",
      },
    ],

    outcome: [
      "Custodial fund risk on the trading engine is closed by construction — the platform never holds user SOL to trade.",
      "The stale-supply slippage failure the migration was built to fix is closed by design, not by retry logic.",
      "Both security findings were remediated with a path that did not require existing users to reinstall or lose local data.",
      "Notifications cannot be lost between being recorded and being delivered, because they are written in the same transaction as the event that causes them.",
    ],

    facts: [
      { value: "4", label: "Anchor/Rust smart contracts" },
      { value: "~30", label: "NestJS backend modules" },
      { value: "~1,150", label: "lines of Prisma schema" },
      { value: "15", label: "on-chain test scenarios" },
    ],

    tech: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "Socket.IO",
      "Solana",
      "Anchor",
      "Rust",
      "React Native",
      "Swift",
      "React 19",
      "TanStack Query",
      "Recharts",
    ],
    featured: true,
  },

  /* ─────────────────────────────────────────────────────────────── */
  {
    slug: "fintrust",
    title: "FinTrust",
    category: "Staking & rewards protocol",
    tagline: "Exactly-once payouts over an at-least-once blockchain",
    summary:
      "A non-custodial Solana staking, vesting and ICO platform with weekly on-chain reward snapshots, referral and cashback pools, and a write-ahead-log disbursement engine.",

    problem:
      "Paying real tokens to real wallets is the one operation you cannot get wrong twice. A blockchain transfer is an at-least-once primitive: a submission can succeed on-chain while the response never reaches you. Retrying blindly double-spends; not retrying loses the payout. Meanwhile the staking economy itself — tiers, vesting NFTs, referrals, cashback, KYC-gated ICO phases, card spend limits — all has to stay consistent between an Anchor program and a PostgreSQL database that update at different times.",
    product:
      "A staking and rewards platform where users buy platform tokens, stake across configurable reward tiers, earn referral and cashback incentives, claim vesting NFT rewards, and participate in KYC-gated ICO phases — with an admin console for tokenomics and reward controls.",
    role:
      "Full-stack engineer across the NestJS backend, the Anchor smart contract, and both Next.js frontends.",
    owned: [
      "Designed the write-ahead-log disbursement engine that makes admin-signed payouts exactly-once over an at-least-once chain primitive.",
      "Split every on-chain user action into prepare (server builds an unsigned transaction, no database write) and confirm (submits the wallet-signed transaction, writes only after chain confirmation).",
      "Built the wallet-authentication state machine and the derived gate that every data-fetching hook in the app depends on.",
      "Implemented the reconciler and blockchain indexer that self-heal dropped on-chain events within one polling interval.",
      "Used conditional updateMany as a lock-free concurrency primitive for every at-most-once invariant, encoding the precondition in the WHERE clause.",
      "Audited the deployed system against its own published tokenomics and named where enforcement had drifted from it.",
    ],

    architecture: {
      summary:
        "No database write ever precedes chain confirmation on the user path; on the admin payout path a write-ahead-log row precedes submission, so a crash mid-transfer is recoverable without resubmitting.",
      pipeline: [
        { name: "Frontend", note: "wallet connected + JWT verified", icon: "trigger" },
        { name: "prepare*", note: "server builds unsigned tx · no DB write", icon: "compute" },
        { name: "Wallet signature", note: "user signs", icon: "gate" },
        { name: "confirm*", note: "submit signed tx", icon: "inbound" },
        { name: "Chain confirmation", note: "Anchor program", icon: "gate" },
        { name: "PostgreSQL write", note: "only now", icon: "store" },
        { name: "Indexer + reconciler", note: "heals dropped events", icon: "compute" },
      ],
    },

    challenges: [
      "A token transfer can land on-chain while the confirmation response is lost, leaving the system unable to prove whether the transfer happened.",
      "Weekly reward snapshots must apply exactly once even when several triggers fire concurrently.",
      "Any account address an attacker can supply must be re-derived and re-verified on-chain rather than trusted to exist and deserialize.",
      "The browser focus event and the wallet adapter's connection promise are not ordered relative to each other, so naive cancel detection fires on a successful connect.",
      "Off-chain PostgreSQL state and on-chain program state advance at different times and must converge without a distributed transaction.",
    ],

    decisions: [
      {
        choice:
          "Write-ahead log before submission, with asynchronous reconciliation — not a two-phase commit.",
        because:
          "There is no protocol that lets a database and a blockchain commit atomically, and the code says so plainly: we cannot prove the original transaction did not land, so retrying could double-spend.",
        tradeoff:
          "A real, bounded window where the chain has moved and the database has not caught up yet.",
      },
      {
        choice: "Conditional updateMany instead of a distributed lock for exactly-once flips.",
        because:
          "Encoding the precondition in the WHERE clause makes the invariant unraceable by construction, without introducing Redis or Zookeeper as a correctness dependency.",
        tradeoff: "The losing caller in a race gets no feedback about why nothing happened.",
      },
      {
        choice:
          "Gate every data-fetching hook on a single derived value that resolves only when wallet, JWT and wallet identity all agree.",
        because:
          "A wallet being connected does not mean it is the wallet the session was issued for, and a user can switch accounts in the extension at any moment.",
        tradeoff:
          "One derived value becomes load-bearing for the whole app — it has to be right, and it needs an 800ms grace period to survive event-ordering races.",
      },
    ],

    outcome: [
      "The double-pay and lost-pay failure class on admin-signed disbursements is closed by construction.",
      "Dropped blockchain events self-heal within one polling interval rather than surfacing as a user-reported incident.",
      "No database record of a user's on-chain action can exist without a confirmed transaction behind it.",
      "Where enforcement had drifted from the published tokenomics, that was documented directly rather than left for someone else to find.",
    ],

    facts: [
      { value: "27", label: "on-chain instructions" },
      { value: "157", label: "HTTP routes over 37 Prisma models" },
      { value: "239", label: "automated tests" },
      { value: "2,430", label: "lines in the Anchor program" },
    ],

    tech: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "Solana",
      "Anchor",
      "Rust",
      "SPL Token",
      "Metaplex",
      "Next.js",
      "React",
      "TanStack Query",
      "Tailwind CSS",
      "Docker",
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
    ],
    featured: true,
  },

  /* ─────────────────────────────────────────────────────────────── */
  {
    slug: "flyverr",
    title: "Flyverr",
    category: "Marketplace frontend architecture",
    tagline: "A frontend convention that outlived its author",
    summary:
      "A staged resale marketplace for digital products, built from an empty scaffold — auth, the API integration layer, purchase and licensing flows, and an admin back-office on two shared primitives.",

    problem:
      "There was no prior frontend convention to extend: an empty create-next-app scaffold and an unusual business model. Products are sold in limited rounds and resold under platform licensing rules, so the same product can be in different states for different users at the same time. Without a shared integration pattern, twenty screens each invent their own approach to fetching, caching, error handling and access control — and then drift.",
    product:
      "A marketplace where creators sell limited digital products and buyers can purchase for personal use or for controlled resale, with dashboards, reviews, analytics, payments, and an admin approval workflow that suggests staged resale pricing.",
    role:
      "Frontend engineer — established the architecture from a blank slate, then built the highest-complexity surfaces on it.",
    owned: [
      "Established the features/<domain>/{services, hooks, types} convention, the shared Axios and TanStack Query integration pattern, AuthContext, ProtectedRoute and the authenticated dashboard shell.",
      "Split route access into a fast client-cached check and a slow authoritative one, and made only the authoritative one the actual gate.",
      "Replaced four hand-rolled Stripe readiness checks with a single HOC centralising an ordered requireReady() chain.",
      "Built the admin back-office on two shared primitives — one AdminTable reused across 11 pages, one PaginationControls across 10 — rather than per-screen tables.",
      "Made every mutation invalidate specific TanStack Query keys rather than hand-patching cached objects.",
      "Mapped backend error codes to distinct UX outcomes at the service boundary, so components never see a raw backend payload.",
    ],

    architecture: {
      summary:
        "A protected screen renders on a cached flag for instant feedback, but nothing is fetched until a live server check confirms it — one convention, applied identically across twenty-three feature domains.",
      pipeline: [
        { name: "Route mount", note: "ProtectedRoute renders", icon: "trigger" },
        { name: "Cached flag", note: "instant UI, not trusted", icon: "gate" },
        { name: "Live user query", note: "useGetCurrentUser() — the real gate", icon: "gate" },
        { name: "Domain hook", note: "features/<domain>/hooks · TanStack Query", icon: "compute" },
        { name: "Domain service", note: "converts to domain types", icon: "compute" },
        { name: "Axios client", note: "refresh + retry once on 401", icon: "inbound" },
        { name: "Backend / Stripe Connect", note: "REST", icon: "store" },
        { name: "Cache invalidation", note: "specific query keys, never patched", icon: "notify" },
      ],
    },

    challenges: [
      "A multi-round resale model means the same product is in different states for different users simultaneously, and the buyer must never be confused about which.",
      "Client-cached role flags are convenient and spoofable, so they cannot be the real access gate.",
      "Four separate action components each needed the same Stripe onboarding precondition, and four copies of a precondition drift.",
      "Roughly two dozen backend endpoints each need coherent loading, error and success states without twenty different approaches to them.",
    ],

    decisions: [
      {
        choice: "Gate protected routes on a live server query, not the cached auth flag.",
        because: "The cached flag exists for instant UI feedback; it is not evidence of authorisation.",
        tradeoff: "An extra query per protected-route mount, in exchange for a gate that cannot be spoofed.",
      },
      {
        choice: "One readiness HOC instead of four inline checks.",
        because: "A precondition that changes should change in one place, not four call sites.",
        tradeoff: "A layer of indirection every new contributor has to learn once.",
      },
      {
        choice: "Invalidate specific query keys on mutation rather than patching the cache by hand.",
        because:
          "Hand-patched cache objects encode assumptions about the server's response shape that quietly stop being true.",
        tradeoff: "A refetch where a local patch would have been instant.",
      },
    ],

    outcome: [
      "An unusual multi-round resale economy shipped as a deterministic, unambiguous buyer experience.",
      "The convention established here was still what a teammate built unrelated features on six weeks after my own commits stopped — visible in the commit history.",
      "Admin screens gained pagination, sorting and empty states uniformly, because they share two components rather than eleven implementations.",
    ],

    facts: [
      { value: "6 + 17", label: "feature domains under one convention" },
      { value: "11", label: "admin pages on one shared table" },
      { value: "1", label: "HOC replacing 4 inline checks" },
    ],

    tech: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "TanStack Query",
      "Axios",
      "Tailwind CSS",
      "shadcn/ui",
      "Node.js",
      "Express",
      "Supabase",
      "PostgreSQL",
      "Stripe Connect",
      "Sentry",
      "PostHog",
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

  /* ─────────────────────────────────────────────────────────────── */
  {
    slug: "social-locket",
    title: "Social Locket",
    category: "Real-estate social marketplace",
    tagline: "What a buyer wants is a different object from what a seller offers",
    summary:
      "A social property marketplace with listings, a distinct 'property wanted' listing type, matching, offers, group-owned listings, messaging and payments.",

    problem:
      "A property marketplace usually models one thing: a listing. But a buyer describing what they are looking for and a seller describing what they have are different objects with different lifecycles — a wanted listing produces matches, a normal listing produces enquiries. Modelling the buyer side as a boolean flag on a listing forces every downstream branch to re-derive which kind of thing it is holding.",
    product:
      "A marketplace where users publish property listings or 'property wanted' listings, get matched against the other side, exchange offers and messages, collaborate on a listing as a group with member and admin roles, and pay through Stripe or PayPal.",
    role: "Frontend engineer (React) — listing and marketplace workflows, payments and auth surfaces.",
    owned: [
      "Modelled 'property wanted' as its own listing type with its own matching and offer endpoints, rather than a flag on a normal listing.",
      "Built one shared listing form used for both creation and editing, driven by a single react-hook-form/Yup schema encoding real domain rules.",
      "Built an image pipeline that compresses and crops in the browser before upload, so a large source photo never reaches the network unprocessed.",
      "Added a group-collaboration layer over individual listings — member and admin roles plus a separate user-to-user connection request flow.",
      "Routed every network call through one API client that all service modules import from, one file per domain.",
      "Pulled reference data — currency, inventory type, bedroom counts — through shared hooks reused across creation, search and dashboard screens.",
    ],

    architecture: {
      summary:
        "One shared form branches by listing type at the schema level, so a 'wanted' listing and a normal listing diverge into their own matching logic instead of being told apart by a flag.",
      pipeline: [
        { name: "Listing form", note: "one shared form, both types", icon: "trigger" },
        { name: "Yup schema", note: "validation branches by type", icon: "gate" },
        { name: "Photo capture", note: "compressed + cropped in-browser first", icon: "compute" },
        { name: "ApiClient", note: "single client, every service imports it", icon: "inbound" },
        { name: "Type router", note: "normal listing vs wanted listing", icon: "compute" },
        { name: "Matching engine", note: "wanted listings only", icon: "compute" },
        { name: "Offers & messaging", note: "both sides converge here", icon: "store" },
        { name: "Payment", note: "Stripe or PayPal", icon: "notify" },
      ],
    },

    challenges: [
      "Two listing types share most of a large form but diverge in validation rules and downstream behaviour.",
      "Property photos come from phone cameras at sizes that make uploads slow and unreliable on mobile connections.",
      "Listing ownership needed to extend to a group without bolting a separate co-listing data model onto an existing single-owner schema.",
      "Two payment providers and an OTP verification flow all resolve through redirects, so each needs an explicit resumable state.",
    ],

    decisions: [
      {
        choice: "A distinct 'property wanted' listing type instead of a flag on a normal listing.",
        because:
          "A match triggers differently from a new listing, and the two have genuinely different lifecycles.",
        tradeoff: "Two listing code paths to maintain, in exchange for correct type-specific matching.",
      },
      {
        choice: "One form and one validation schema for both creation and editing.",
        because: "Two parallel forms for the same object drift, and the drift shows up as data that fails only on edit.",
        tradeoff: "A single schema that has to express conditional rules rather than two simpler ones.",
      },
      {
        choice: "Compress and crop in the browser before upload, not after.",
        because: "Processing after upload still pays the full upload cost on the user's connection.",
        tradeoff: "More work on the client device, and a cropping step in the user's path.",
      },
    ],

    outcome: [
      "A wanted listing and a standard listing share one consistent matching, offer and messaging flow instead of diverging code paths.",
      "Reference data is defined once and consumed identically on every screen that needs it, rather than drifting per screen.",
      "Listings can be owned and managed collaboratively without a parallel data model.",
    ],

    facts: [
      { value: "22", label: "top-level routes" },
      { value: "9+", label: "required or conditional listing fields" },
      { value: "2", label: "payment providers behind one flow" },
    ],

    tech: [
      "React 18",
      "Create React App",
      "TanStack Query",
      "react-hook-form",
      "Yup",
      "Axios",
      "Stripe",
      "PayPal",
      "Cloudinary",
      "AWS S3",
      "Web3Modal",
      "wagmi",
      "viem",
      "Google Maps Places",
      "Bootstrap",
      "PrimeReact",
    ],
  },

  /* ─────────────────────────────────────────────────────────────── */
  {
    slug: "lindo-mart",
    title: "Lindo Mart",
    category: "Internal operations platform",
    tagline: "Six real authorization defects in inherited code",
    summary:
      "An internal operations platform — a nine-domain reference-data subsystem built end to end, a rebuilt multi-step form workflow, and six authorization and data-integrity defects found and fixed in someone else's code.",

    problem:
      "Regular staff needed real inventory, equipment and alert options inside forms, but those options lived behind admin-only CRUD routes — and granting staff admin access to populate a dropdown is not an option. The intended public endpoints existed but rejected every caller, and nobody knew why. The cause was a JavaScript truthiness bug in the shared roles guard: an empty required-roles array is truthy, so 'no roles required' was being read as 'reject everyone'.",
    product:
      "An internal platform for inventory, equipment, multi-step operational forms and safety reporting, with role-scoped dashboards across four user roles and real-time updates.",
    role:
      "Full-stack engineer — new subsystem end to end, plus defect work in a pre-existing codebase.",
    owned: [
      "Built a nine-domain reference-data subsystem across eight REST controllers and five NestJS modules, matched end to end by React Query hooks and admin CRUD pages.",
      "Gave every reference-data module a second, field-limited /public endpoint alongside its admin routes, so staff read options without being granted admin access.",
      "Found and fixed the RolesGuard truthiness bug that was silently rejecting every request to every intended-public route.",
      "Redesigned Form recipient references from raw strings to typed MongoDB ObjectIds and rewrote the visibility query to branch on an explicit recipientType enum — closing a case where a Supervisor could read a form addressed to a different Supervisor.",
      "Traced a 'hard refresh logs valid users out' bug to a race between a synchronous auth check and an async localStorage read, and replaced the derived state with an explicit loading flag.",
      "Collapsed five structurally identical alert features into one generic schema and component set parameterised at the route level.",
    ],

    architecture: {
      summary:
        "Every reference-data domain exposes two doors: full admin CRUD, and a field-limited public read that returns only what a form dropdown needs — gated by a guard that had been silently rejecting every caller.",
      pipeline: [
        { name: "Staff request", note: "needs dropdown options, not admin access", icon: "trigger" },
        { name: "/public endpoint", note: "field-limited read", icon: "inbound" },
        { name: "RolesGuard", note: "empty @Roles() now reads as public", icon: "gate" },
        { name: "Controller", note: "8 REST controllers · 5 modules", icon: "compute" },
        { name: "Form dispatcher", note: "validates by form type", icon: "compute" },
        { name: "recipientType check", note: "typed ObjectId, not string match", icon: "gate" },
        { name: "MongoDB / Mongoose", note: "typed references", icon: "store" },
        { name: "Socket.IO", note: "pushes update to dashboard", icon: "notify" },
      ],
    },

    challenges: [
      "The bug was in a guard's boolean logic, so every endpoint looked correctly configured and still rejected every caller.",
      "Form visibility was decided by comparing role and user strings, which cannot distinguish 'addressed to any Supervisor' from 'addressed to this Supervisor'.",
      "Five alert features were structurally identical but had been implemented as five near-duplicate CRUD stacks.",
      "Auth state derived synchronously from an asynchronously-read storage value logs valid users out on refresh, intermittently.",
    ],

    decisions: [
      {
        choice: "Expose a second field-limited /public endpoint rather than relaxing the admin routes.",
        because:
          "Staff need three fields for a dropdown, not the full record — and widening an admin route to serve them widens it for everything.",
        tradeoff: "Two endpoints per domain to keep in sync instead of one.",
      },
      {
        choice: "Typed ObjectId references and an explicit recipientType enum over raw string comparison.",
        because: "An unambiguous enum makes the visibility query express the actual rule instead of approximating it.",
        tradeoff: "A schema migration, in exchange for closing a real cross-user visibility bug.",
      },
      {
        choice: "One generic schema and component set for five alert types, parameterised by route.",
        because: "Five near-duplicates means every fix has to be applied five times, and eventually is not.",
        tradeoff: "Slightly more indirection than five literal implementations.",
      },
    ],

    outcome: [
      "Every public reference-data endpoint now returns data instead of rejecting all callers.",
      "Non-Super-Admin roles see only the dashboard statistics and forms actually addressed to them.",
      "A hard page refresh no longer ejects an authenticated user to the login screen.",
      "Around 150 lines of duplicated markup were removed by extracting one reusable component.",
    ],

    facts: [
      { value: "9", label: "reference-data domains built" },
      { value: "6", label: "real defects fixed in inherited code" },
      { value: "7+", label: "form types behind 1 dispatcher" },
    ],

    tech: [
      "NestJS",
      "TypeScript",
      "MongoDB",
      "Mongoose",
      "class-validator",
      "Socket.IO",
      "React 18",
      "TanStack Query",
      "JWT",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const featuredProjects = projects.filter((project) => project.featured);
