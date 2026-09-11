/**
 * Engineering depth content: how I work, why systems are shaped the way they are,
 * and what I can be handed.
 *
 * Every example points at a real system in data/projects.ts.
 */

export type Principle = {
  id: string;
  title: string;
  /** How I approach it. */
  body: string;
  /** Concrete places it shows up. */
  evidence: string[];
};

export const principles: Principle[] = [
  {
    id: "event-driven",
    title: "Event-Driven Systems",
    body:
      "Incoming events get acknowledged and durably recorded first; everything else happens after. The provider's timeout behaviour, not the application's convenience, decides what an ingestion handler is allowed to do — because a webhook provider that disconnects a slow subscriber is telling you that work inside the handler is a data-loss risk.",
    evidence: [
      "TWQ acknowledges a Helius webhook with 200 before validating anything, then writes the raw event to a Redis Stream capped at ~100k entries.",
      "A separate worker pool consumes that stream across three BullMQ queues, so a stalled worker or slow third-party API cannot cause a dropped event.",
    ],
  },
  {
    id: "queues",
    title: "Queue-Based Processing",
    body:
      "Anything slow, expensive, or dependent on something outside the process moves off the request path onto a worker. The request path's job is to be correct and fast; the worker's job is to be retryable. Splitting them means each can be scaled and retried on its own terms.",
    evidence: [
      "TWQ separates ingestion, enrichment and notification into distinct queues rather than one worker doing all three.",
      "FinTrust runs weekly reward snapshots and reconciliation as background jobs, never inside a user request.",
      "SocialFi Trading fans notifications out through queues so a slow push provider never blocks a trade.",
    ],
  },
  {
    id: "reliability",
    title: "Reliable & Idempotent Processing",
    body:
      "Retries, duplicates and partial failures are the normal case, not the exception. The safest version of a correctness rule is one the database enforces, so preconditions go into the query and idempotency keys are derived from something the external system already guarantees is unique.",
    evidence: [
      "SocialFi Trading derives its trade idempotency key from the on-chain transaction signature, so the indexer cannot double-write a trade the synchronous path already recorded.",
      "FinTrust uses a conditional updateMany so an at-most-once flip is unraceable by construction, with no distributed lock.",
      "FinTrust's write-ahead log records intent before submission, so a crash mid-transfer is recoverable without resubmitting.",
    ],
  },
  {
    id: "notifications",
    title: "Notification Architecture",
    body:
      "A notification that can be lost between 'the thing happened' and 'the user was told' is a correctness bug, not a delivery inconvenience. Writing the notification in the same transaction as the event that causes it removes the window entirely; a poller and a socket layer handle delivery afterwards.",
    evidence: [
      "SocialFi Trading records notifications through a transactional outbox, polled and fanned out over Socket.IO rooms scoped per entry and per user.",
      "TWQ matches events against per-user alert preferences before delivery, across three Telegram delivery modes.",
    ],
  },
  {
    id: "integration",
    title: "Frontend / API Integration Architecture",
    body:
      "One HTTP client, one service layer per domain, and a conversion boundary where an external payload becomes an internal type. The moment a raw backend or third-party shape reaches a component, that component is coupled to something outside the codebase's control — and a renamed field becomes a search-and-replace across the UI instead of a one-file change.",
    evidence: [
      "TWQ, Flyverr, FinTrust and Social Locket each centralise every network call through a single client with token injection and 401 handling.",
      "Flyverr's features/<domain>/{services, hooks, types} convention was adopted by a teammate for unrelated work six weeks after my commits stopped.",
      "Cache lifetimes are set by how fast the data actually changes — 30 seconds for live prices, up to 24 hours for reference data.",
    ],
  },
  {
    id: "authorization",
    title: "Authorization & Access Control",
    body:
      "A client-cached role flag is for instant UI feedback, never for the access decision. The sensitive path re-verifies server-side every time, and where a public read is genuinely needed it gets its own field-limited endpoint rather than a widened admin route.",
    evidence: [
      "Flyverr's ProtectedRoute waits on a live current-user query rather than the cached auth flag.",
      "FinTrust gates every data hook on a value that resolves only when wallet, JWT and wallet identity all agree.",
      "Lindo Mart exposes a second field-limited /public endpoint per domain, and six real authorization defects were found and fixed in inherited code.",
    ],
  },
  {
    id: "async-flows",
    title: "Async Flows as State Machines",
    body:
      "Any multi-step action that can fail halfway — a wallet signature, an OTP round trip, a payment redirect, an OS share-sheet handoff — is modelled as explicit states with typed, distinguishable errors. A single isLoading boolean cannot represent 'the user closed the wallet popup' differently from 'the challenge expired', so the UI ends up stuck on a spinner.",
    evidence: [
      "Wallet-signing state machines were built independently three times, in three unrelated codebases: TWQ, FinTrust and SocialFi Trading.",
      "SocialFi Trading persists an ephemeral dapp keypair so a signing session survives the mobile OS recreating the app process mid-round-trip.",
      "Every failure returns to a recoverable step rather than a dead end.",
    ],
  },
  {
    id: "ai",
    title: "AI Engineering",
    body:
      "A model is asked to explain something already computed, not to invent the number. Grounding the output in deterministic signals makes it checkable, caching keeps cost and latency predictable, and a non-AI fallback means the feature still works when the provider does not.",
    evidence: [
      "TWQ computes eight technical indicators from primary formulas, then uses GPT-4 to explain them rather than to predict from raw prices.",
      "Predictions are cached for 180 minutes; a weighted rule-based scorer produces a real prediction from the same indicators when OpenAI is unavailable.",
    ],
  },
  {
    id: "deployment",
    title: "Deployment & Operations",
    body:
      "Independent applications behind a reverse proxy with process management, environment-scoped configuration, and secrets that never live in plaintext env files once the system is handling real value.",
    evidence: [
      "Dibzi's four applications deploy behind Nginx with PM2 process management and production API configuration.",
      "SocialFi Trading's platform signer moved out of plaintext environment variables into a secrets-abstraction service.",
    ],
  },
];

/**
 * Engineering Decisions — technical reasoning, in Q&A form.
 * Every answer is drawn from a decision actually made in one of these systems.
 */
export type DecisionQA = {
  question: string;
  answer: string;
  /** Which system this came from. */
  source: string;
};

export const decisionQA: DecisionQA[] = [
  {
    question: "Why acknowledge a webhook before processing it?",
    answer:
      "Because the provider decides the deadline, not the application. Helius disconnects subscribers that respond slowly, and a dropped event has no replay. Returning 200 first and writing the raw event to a durable stream means the handler's latency is bounded by a Redis write rather than by whatever the slowest downstream API happens to be doing. The cost is real and worth naming: the system becomes eventually consistent, and there are two moving parts to reason about instead of one.",
    source: "TWQ",
  },
  {
    question: "Why a queue instead of doing the work inline?",
    answer:
      "Because the request path and the work have different failure profiles. A user request should fail fast and mean something; a background job should retry with backoff and eventually succeed. Separating them lets each be scaled and retried on its own terms, and it stops a slow third-party call from occupying a request handler. Splitting ingestion, enrichment and notification into distinct queues also means one saturating does not starve the others.",
    source: "TWQ · FinTrust · SocialFi Trading",
  },
  {
    question: "How do you stop the same event being processed twice?",
    answer:
      "By deriving the idempotency key from something the external system already guarantees is unique, then letting the database enforce it. In the trading platform, that key is sha256(\"onchain:\" + txSignature) — so when the blockchain indexer and the synchronous confirm path both observe the same trade, the second write is rejected by a uniqueness constraint rather than by an application check that could race. The safety is structural: it holds even if someone later writes a new code path that forgets to check.",
    source: "SocialFi Trading",
  },
  {
    question: "How do you pay out exactly once over a blockchain that only guarantees at-least-once?",
    answer:
      "You accept that no protocol lets a database and a chain commit atomically, and design for the gap. A write-ahead-log row is inserted before submission, and if applying the effects afterwards fails, the transaction signature is still persisted in a separate unconditional write outside the failed transaction — so a reconciler or the indexer can finish the job without ever resubmitting. The reasoning is written directly into the code: we cannot prove the original transaction did not land, so retrying could double-spend. The cost is a real, bounded window where the chain has moved and the database has not.",
    source: "FinTrust",
  },
  {
    question: "Why a conditional update instead of a distributed lock?",
    answer:
      "Because a lock is a second system that has to be available for correctness to hold. Putting the precondition in the WHERE clause of a conditional updateMany makes an at-most-once flip unraceable by construction, with no Redis or coordinator in the critical path. The trade-off is that the losing caller in a race gets no feedback about why nothing happened, so the calling code has to be written to expect a zero-row result.",
    source: "FinTrust",
  },
  {
    question: "Why is a notification written in the same transaction as the event?",
    answer:
      "Because the alternative has a window. If the event commits and the notification is sent separately, a crash in between means the thing happened and nobody was told — and there is no record that a notification was owed. A transactional outbox writes the notification row in the same transaction as the state change, and a poller delivers it afterwards over Socket.IO. Delivery can then be retried freely, because the intent is already durable.",
    source: "SocialFi Trading",
  },
  {
    question: "Why not trust the client-cached role flag for route access?",
    answer:
      "Because it is not evidence of anything. A cached flag exists to render the right UI instantly; the access decision has to come from the server on the request that matters. So a protected route waits on a live current-user query, and a wallet-gated action resolves only when the connected wallet, the JWT, and the wallet the JWT was issued for all agree. The cost is an extra query per protected-route mount, in exchange for a gate that cannot be spoofed by editing local storage.",
    source: "Flyverr · FinTrust",
  },
  {
    question: "Why PostgreSQL on one platform and MongoDB on another?",
    answer:
      "It follows the shape of the data, not preference. The staking and trading platforms have a strongly relational core — ledger accounts, earnings splits across three tables, tiers, vesting schedules, referral graphs — where foreign keys and transactional integrity are the point, so PostgreSQL with Prisma. The loyalty and operations platforms are document-shaped: a check-in record, a form submission with a different schema per form type, reference-data collections read far more than written. In those, MongoDB with Mongoose avoided modelling seven form variants as seven join-heavy tables.",
    source: "FinTrust · SocialFi Trading · Dibzi · Lindo Mart",
  },
  {
    question: "Why compute NFT metadata on request instead of pinning it?",
    answer:
      "Because immutability was the wrong default for the product. Pinning to IPFS is correct for provenance and structurally wrong for a reward whose artwork a merchant is expected to update. The token URI became a permanent address pointing at the platform's own API, and the document it returns is computed from live database state. The full IPFS pipeline had already been built and tested before this became clear — throwing it out was cheaper than shipping a reward nobody could edit. The trade-off is that metadata correctness now depends on this API's uptime rather than on a decentralized network's.",
    source: "Dibzi",
  },
  {
    question: "Why recompute rather than store a user's current tier?",
    answer:
      "Because each tier is a blockchain token, so an incorrect downgrade is a permanent, public record. Recomputing eligibility from thresholds on every check-in makes a downgrade structurally inexpressible — the code path cannot produce one — which is a stronger guarantee than validating against it. It costs a sort on every check-in instead of an O(1) lookup of a stored pointer.",
    source: "Dibzi",
  },
  {
    question: "Why quote a trade from the chain instead of the database?",
    answer:
      "Because the database copy of token supply lags the chain, and quoting against it produced a repeating failure: a trade priced off stale supply and then rejected on-chain for slippage. Recomputing cost from live on-chain state costs one extra RPC read per quote and closes the failure class rather than retrying through it.",
    source: "SocialFi Trading",
  },
  {
    question: "Why is a 'property wanted' listing its own type rather than a flag?",
    answer:
      "Because what a buyer is looking for and what a seller is offering are genuinely different objects with different lifecycles — a wanted listing produces matches, a normal listing produces enquiries. Modelling the buyer side as a boolean forces every downstream branch to re-derive which kind of thing it is holding, and those branches drift. Two explicit code paths cost more to maintain and produce matching logic that is actually correct for each side.",
    source: "Social Locket",
  },
];

/** Capabilities framed by what I solve, with technologies as supporting evidence. */
export type Capability = {
  title: string;
  body: string;
  tech: string[];
};

export const capabilities: Capability[] = [
  {
    title: "Backend & Distributed Systems",
    body:
      "API and service design, asynchronous workflows, queue-based background processing, event ingestion, idempotent consumers, and the reliability work that decides whether a system survives its dependencies failing.",
    tech: [
      "Node.js",
      "NestJS",
      "Express",
      "PostgreSQL",
      "Prisma",
      "MongoDB",
      "Mongoose",
      "Redis",
      "Redis Streams",
      "BullMQ",
      "Socket.IO",
      "REST",
      "JWT",
    ],
  },
  {
    title: "Frontend Engineering",
    body:
      "Application architecture rather than screen assembly: a single HTTP transport, a domain service layer, typed conversion at the boundary, cache-key design matched to how fast data changes, and multi-step async flows modelled as explicit state machines.",
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "React Native",
      "TanStack Query",
      "Tailwind CSS",
      "react-hook-form",
      "Zod / Yup",
      "Framer Motion",
    ],
  },
  {
    title: "Blockchain Engineering",
    body:
      "On-chain program development and integration across two ecosystems, in both custodial and non-custodial models — wallet-signature authentication, prepare/confirm transaction flows, event indexing, and recovery paths for accounts stranded by a program upgrade.",
    tech: [
      "Solana",
      "Anchor",
      "Rust",
      "SPL Token",
      "Metaplex",
      "ethers.js",
      "XRPL",
      "Helius",
      "Solana Wallet Adapter",
      "WalletConnect",
      "Privy",
    ],
  },
  {
    title: "AI Engineering",
    body:
      "LLM features grounded in deterministic computation rather than asked to invent facts — computed signals in, explanation out, cached, with a non-AI fallback so the feature degrades to a real answer instead of an error.",
    tech: ["OpenAI API", "GPT-4", "Prompt design", "Response caching", "Deterministic fallbacks"],
  },
  {
    title: "Cloud & Infrastructure",
    body:
      "Getting several applications onto one host and keeping them there: reverse proxying, process management, environment-scoped configuration, container workflows, and moving secrets out of plaintext once a system handles real value.",
    tech: ["Docker", "Nginx", "PM2", "AWS S3", "GitHub Actions", "Vercel", "Supabase"],
  },
  {
    title: "Integration & Third-Party Systems",
    body:
      "Treating rate limits, timeouts, inconsistent response shapes and missing fields as first-class design inputs — including deciding what an absent value actually means in the domain rather than rejecting it as invalid.",
    tech: [
      "Stripe",
      "Stripe Connect",
      "PayPal",
      "Cloudinary",
      "Telegram Bot API",
      "Google Maps Places",
      "IPFS / Pinata",
      "SendGrid / Brevo",
      "Sentry",
      "PostHog",
    ],
  },
];
