# Shehryar Naeem — Resume

**Full Stack Developer**
Lahore, Pakistan | +92 311 1404107 | shehryarwebdev@gmail.com
Portfolio: https://shehryar-web-dev.vercel.app/ | GitHub: https://github.com/shehryar-web-dev/ | LinkedIn: https://www.linkedin.com/in/shehryar-naeem-831691213/

## Professional Summary

Full Stack Developer with 3+ years of experience solving concrete production problems: acknowledging third-party webhook events within milliseconds so a slow downstream call never drops data, preventing duplicate or lost payments with a write-ahead-log disbursement engine on an at-least-once blockchain primitive, and fixing real authorization and data-integrity bugs left in existing codebases, such as an access-control guard silently rejecting every request to a public route. Comfortable owning a feature end-to-end, from redesigning how a system stores and serves data to building the frontend integration layer that consumes it, and has independently delivered multiple production systems from architecture through launch.

## Technical Skills

- **Languages:** JavaScript, TypeScript
- **Frontend:** React, Next.js, React Native, TanStack Query, Tailwind CSS
- **Backend:** Node.js, Express, NestJS, RESTful APIs, Socket.IO
- **Databases:** PostgreSQL (Prisma), MongoDB, Redis
- **Blockchain:** Solana (Web3.js, Anchor), XRPL, Wallet Auth, SPL Tokens, NFTs
- **AI:** OpenAI API, Prompt Engineering, AI-Powered Applications, RAG
- **Architecture:** Event-Driven Systems, Distributed Systems, Message Queues (BullMQ, Redis Streams)
- **Cloud & DevOps:** AWS (S3), Docker, Git/GitHub, Nginx, Jest (Automated Testing)

## Professional Experience

### Full Stack Software Engineer — Weiblocks
*Lahore, Pakistan (Remote) | Jan 2023 - Present*

- Engineered and shipped 8 production full-stack systems across fintech, blockchain, AI, and social/marketplace domains using React, Next.js, TypeScript, Node.js, NestJS, and Solana/XRPL blockchain integrations.
- Architected event-driven, distributed backend pipelines (Redis Streams, BullMQ) that decouple latency-critical webhook ingestion from asynchronous processing, eliminating data loss from third-party API timeouts.
- Designed exactly-once transaction guarantees for financial and blockchain operations using write-ahead logs, conditional atomic database updates, and signature-derived idempotency keys.
- Implemented wallet-based cryptographic authentication (Ed25519 signature verification) and JWT/role-based authorization across multiple trust levels, removing stored passwords and enforcing server-verified access.
- Built and maintained REST APIs (150+ endpoints across 25+ NestJS/Express modules) backed by PostgreSQL, MongoDB, and Redis, with automated test coverage (239+ tests) and technical documentation.
- Authored 4 Solana Anchor/Rust smart contracts and integrated XRPL token rewards, and established a reusable frontend architecture (single HTTP client, typed service layer) adopted across multiple projects.

### Frontend Developer Intern — Excellence Code Solution
*Lahore, Pakistan | 2023 - 2 Months*

- Built responsive user interfaces and reusable React components for production web applications.
- Collaborated with senior developers to refine layouts, resolve UI issues, and follow production development practices.

## Key Projects

### TWQ
*Node.js, Express, MongoDB, Redis, BullMQ, Next.js*

Solo-built real-time Solana token intelligence platform with webhook ingestion, alerting, and AI-grounded trading insights across 8 external integrations.

- Architected a two-process, event-driven pipeline (Redis Streams + BullMQ) that acknowledges webhook events in milliseconds, then processes them asynchronously with retry, backoff, and priority queues.
- Implemented passwordless Ed25519 wallet authentication and a technical-analysis engine (8 indicators computed from raw price data) with a rule-based AI fallback for continuous feature uptime.
- Established a single Next.js data-fetching boundary (one HTTP client, service-layer type conversion, volatility-tuned cache lifetimes) and designed alert filters that treat missing market data as "skip this check" rather than a rejection, so early-stage tokens are not silently filtered out.

### Dibzi
*Node.js, Express, MongoDB, React Native, React*

NFC-triggered on-chain loyalty platform enabling merchants to update already-issued rewards at zero blockchain cost.

- Owned 90% of commits (237/264) across 4 codebases (API, mobile app, 2 dashboards) over a 6-month build; redesigned NFT metadata to be editable with no re-mint cost.
- Built a 3-tier, database-verified authorization system and authored a ranked defect audit (6 critical, 5 high, 12 medium) that drove real security and data-integrity fixes.
- Resolved a Node/browser dependency incompatibility that was blocking the admin dashboard build with a custom polyfill configuration, and migrated live check-in history across three schema formats with zero downtime and no data loss.

### FinTrust
*NestJS, PostgreSQL/Prisma, Redis, Anchor (Rust)*

Non-custodial Solana staking, rewards, and ICO platform backed by a custom Anchor smart contract and a 25-module NestJS backend.

- Designed a write-ahead-log disbursement engine guaranteeing exactly-once on-chain token transfers, closing the double-pay/lost-pay failure class by construction.
- Built 157 REST endpoints over 37 Prisma models and a 2,430-line Anchor program (27 instructions), backed by 239 automated tests and a 34-flow manual QA runbook.
- Split every wallet-signed action into a prepare/confirm request pair so the database is only written after on-chain confirmation, and hardened reward-claim instructions by re-verifying every attacker-suppliable account on-chain.

### SocialFi Trading
*NestJS, PostgreSQL, Anchor (Rust), React Native*

Content-as-assets social trading platform pricing posts and comments on a Solana bonding curve, with a mobile app and admin console.

- Migrated the trading engine from a custodial database ledger to a non-custodial, wallet-signed model, closing custodial fund risk and a stale-price slippage bug class.
- Authored 4 Rust/Anchor smart contracts and remediated 2 security weaknesses (plaintext secrets, a shared encryption key) with a migration path that did not disrupt existing users.
- Built a resilient mobile wallet-signing flow with ephemeral session keys that survive OS-level app suspension, and implemented a transactional-outbox notification pipeline so a trade event can never be recorded without also being delivered.

### Flyverr
*Next.js, TypeScript, TanStack Query, Stripe Connect*

Staged resale marketplace for digital products with multi-round pricing and Stripe Connect payouts.

- Established the frontend's core architecture (auth context, route guards, typed API layer) from an empty scaffold, later extended by another engineer for unrelated features.
- Built a reusable Stripe-readiness HOC and shared admin table/pagination primitives, replacing per-screen readiness checks and one-off table implementations.
- Enforced route-level access control with a live, server-verified user query instead of a cached role flag, and built the admin moderation console (product approval with auto-suggested staged pricing) on shared table and pagination primitives.

### Additional Projects

- **Lindo Mart** — internal operations platform (NestJS, MongoDB, React, Socket.IO); fixed 6 authorization and data-integrity defects.
- **Mindful Oasis** — XRPL wellness rewards platform (React, Node.js).
- **Social Locket** — real-estate social marketplace (React, Stripe, PayPal, Web3Modal).

## Education

**University of Education, Lahore**
Bachelor's Degree - Information Technology
