# Shehryar Naeem — Resume

**Full Stack Engineer**
Lahore, Pakistan (Remote) | +92 311 1404107 | shehryarwebdev@gmail.com
Portfolio: https://shehryar-web-dev.vercel.app/ | GitHub: https://github.com/shehryar-web-dev/ | LinkedIn: https://www.linkedin.com/in/shehryar-naeem-831691213/

## Professional Summary

Full-stack engineer with 3 years building distributed, event-driven systems: webhook pipelines that survive provider timeouts, idempotent write-ahead-log processing that prevents double payments over an at-least-once blockchain primitive, and authorization layers hardened against real production defects. Writes maintainable, SOLID-aligned code — single-responsibility service layers, reusable typed abstractions — and owns the frontend integration layer end-to-end, translating designs into pixel-accurate production UI.

## Technical Skills

- **Languages:** JavaScript, TypeScript
- **Backend:** Node.js, Express, NestJS, REST APIs, Socket.IO
- **Databases:** PostgreSQL (Prisma), MongoDB, Redis
- **Architecture:** Event-Driven Systems, Distributed Systems, Message Queues
- **Frontend:** React, Next.js, React Native, TanStack Query, Tailwind CSS, Figma-to-Code
- **AI:** LLM Integration (OpenAI GPT-4), Retrieval-Augmented Generation (RAG), Prompt Engineering, Workflow Automation
- **Infrastructure:** Docker (Compose), AWS S3, Git/GitHub, Nginx, PM2, Jest
- **Blockchain:** Blockchain Integration, Wallet-Based Authentication

## Professional Experience

### Full Stack Developer — Weiblocks
*Lahore, Pakistan (Remote) | 2023 – Present*

- Shipped 8 production systems end-to-end across fintech, AI, and marketplace platforms, owning backend architecture, API design, and the frontend integration layer on each.
- Built event-driven ingestion pipelines (Redis Streams, BullMQ) that decouple slow downstream work from webhook acknowledgment, eliminating data loss from provider timeouts.
- Designed idempotent, write-ahead-logged transaction processing — conditional atomic updates, signature-derived idempotency keys — that prevents double-payment or lost-payment over an at-least-once blockchain primitive.
- Replaced password-based auth with wallet-signature verification (Ed25519) and role-based access control across multiple trust levels, closing a stored-credential attack surface entirely.

### Frontend Developer Intern — Excellence Code Solution
*Lahore, Pakistan | 2023 · 2 months*

- Built responsive user interfaces and reusable React components for production web applications.
- Collaborated with senior developers to refine layouts, resolve UI issues, and follow production development practices.

## Key Projects

### TWQ
*Node.js, Express, MongoDB, Redis, BullMQ, Next.js*

Solo-built real-time on-chain token monitoring and alerting platform consolidating 8 external data sources into one automated workflow.

- Cut webhook ingestion volume ~99.8% (~100K → ~200 events/hr) by narrowing event subscriptions to the 4 programs and 3 event types the product needs.
- Built a shared, self-throttling rate limiter across every outbound API call so concurrent webhook bursts never exceed a provider's request cap.
- Removed passwords and private keys from the attack surface entirely with single-use, wallet-signature (Ed25519) authentication.

### Dibzi
*Node.js, Express, MongoDB, React Native, React*

NFC-triggered loyalty platform letting merchants edit live reward tiers customers already hold, at zero blockchain cost per update.

- Made merchant-editable rewards possible on an architecture where metadata is normally permanent, by inverting which half of the token data is fixed.
- Made tier downgrades structurally impossible, not just blocked, so a customer can never lose an already-earned reward.

### FinTrust
*NestJS, PostgreSQL/Prisma, Redis, Anchor (Rust)*

Non-custodial staking and rewards platform tying token staking to real card benefits, engineered for crash-safe financial operations.

- Closed an entire class of double-pay/lost-payment bugs by construction with a write-ahead-log disbursement engine that self-heals within 5 minutes.
- Ran 3–10 concurrent replicas correctly with zero coordination layer by making every write idempotent by construction.

### Flyverr
*Next.js, TypeScript, TanStack Query, Stripe Connect*

Staged digital-product resale marketplace with multi-round pricing and Stripe Connect payouts, built from a blank Next.js scaffold.

- Built the auth, access-control, and API-integration foundation that later feature domains — including a teammate's — were built on top of.
- Replaced four independently-drifting Stripe-readiness checks with one reusable gate enforced identically everywhere a purchase or listing happens.

### Additional Projects

- **Lindo Mart** — internal operations platform (NestJS, MongoDB, React, Socket.IO); 6 authorization/data-integrity defects found and fixed in inherited code.
- **SocialFi Trading** — Solana bonding-curve social trading platform (NestJS, Anchor/Rust, React Native); 4 Anchor smart contracts.
- **Mindful Oasis** — XRPL wellness rewards platform (React, Node.js).
- **Social Locket** — real-estate social marketplace (React, Stripe, PayPal, Web3Modal).

## Education

**University of Education, Lahore**
Bachelor's Degree — Information Technology

---

## Changes in this revision

- **Consolidated to a single resume.** Dropped the Pakistan and Gulf market-variant title/summary text and the `marketVariants` swap logic in `scripts/generate-resume-pdf.mjs` — confirmed via your uploaded PDF that the Remote version (shown above) is the one to keep. The script now writes only `public/resume.pdf`; `resume-pakistan.pdf` and `resume-gulf.pdf` have been deleted from `public/`.

## Open items — still unconfirmed

1. **Start date at Weiblocks** — written as "2023 – Present"; sources disagreed on the month (Jan vs. Jun). Confirm the real one.
2. **Onsite vs. remote at Weiblocks** — written as "(Remote)"; sources disagreed here too.
3. **Production numbers** still open for Dibzi, TWQ, FinTrust, Flyverr, and Lindo Mart, plus team size and any latency/uptime/before-after figures — none exist in the codebases by design. Send anything defensible and it goes straight in.
