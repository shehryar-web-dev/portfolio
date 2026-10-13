# Professional Experience

## Professional Summary

Full-stack and blockchain engineer with production experience spanning Solana and XRPL integrations, event-driven backend systems, and React / React Native frontends — building everything from custom on-chain programs to the mobile and web clients that consume them. The recurring strength across eight independent systems is the integration layer itself: designing exactly-once event processing, wallet-signature authentication flows, and typed API boundaries that keep a frontend correct even as backend and on-chain state changes underneath it. That same integration discipline carries over to non-blockchain product work — marketplace and social-platform frontends built around real business rules (staged resale rounds, property matching and offers, group-based collaboration) rather than generic CRUD screens. Comfortable owning a feature vertically, from a Rust smart contract or a NestJS service through to the mobile screen or listing form a user actually interacts with.

---

## Professional Experience

### TWQ — Real-Time Solana Token Intelligence Platform
*A monitoring, alerting, and AI-advisory platform that watches Solana on-chain activity in real time and answers token-specific questions grounded in computed technical indicators.*

**Role:** Solo Full-Stack & Blockchain Engineer — backend, frontend, and all external integrations

- Architected an event-driven ingestion pipeline that decouples Solana webhook processing from downstream work by acknowledging incoming events immediately, writing them to a capped Redis Stream, and routing them through prioritized BullMQ queues consumed by a separate worker process — preventing a slow third-party API call or a stalled worker from causing the webhook provider to time out and drop events.
- Designed a two-layer deduplication mechanism, an in-process check backed by an atomic Redis lock, to guarantee exactly-once processing of on-chain events under concurrent stream consumers and automatic job retries.
- Implemented wallet-based authentication using single-use, time-limited Ed25519 signature challenges, removing password storage entirely and eliminating the credential-leak risk of a traditional login system.
- Built a technical-analysis engine from primary formulas (RSI, MACD, Bollinger Bands, Stochastic, ADX, OBV, SMA, EMA) computed directly from raw price history, and used it to ground an OpenAI-powered prediction feature in verifiable indicators rather than model-generated numbers, with a weighted rule-based fallback that keeps the feature functional if the AI provider fails.
- Engineered a domain-aware alert-filtering system that treats missing market data — such as a pre-launch token with no recorded liquidity — as "this filter doesn't apply" rather than a rejection, closing a gap where the platform's core use case would otherwise be silently filtered out.
- Established a single Next.js data-fetching boundary (one HTTP client, service-layer type conversion, volatility-tuned cache lifetimes) so no component consumes a raw third-party payload directly, and modeled the multi-step wallet-login flow as an explicit state machine with typed, recoverable error states.

---

### FinTrust — Solana Staking, Rewards & ICO Platform
*A non-custodial Solana staking, rewards, referral, and card-spend platform backed by a custom Anchor smart contract.*

**Role:** Full-Stack & Blockchain Engineer — backend, frontend, and smart contract

- Designed a write-ahead-log disbursement engine to guarantee exactly-once execution of admin-signed on-chain token transfers over Solana's at-least-once delivery model, persisting intent before submission and independently completing or safely flagging a transfer for review if the process crashed mid-flow — closing the double-pay / lost-pay failure class by construction rather than manual reconciliation.
- Built a dual-path blockchain event indexer combining a WebSocket log subscription with a scheduled polling safety net, both writing into one unique-keyed event table, so a dropped WebSocket connection self-heals within one polling interval instead of silently losing on-chain events.
- Implemented concurrency-safe state transitions — referral bonus payouts, ICO allocation caps — using conditional database updates instead of a distributed lock service, relying on the database's own single-statement guarantees to ensure exactly one of several concurrent callers wins a race.
- Hardened an on-chain reward-claim instruction against attacker-supplied account data by independently re-deriving and re-verifying every account a caller submits, preventing forged or out-of-order data from being trusted in a reward calculation.
- Split every wallet-signed user action into a prepare/confirm request pair, so an unsigned transaction is built server-side but the database is only written after the wallet actually confirms it on-chain, eliminating a class of ghost-record bugs from cancelled signature prompts.
- Engineered a three-way classification system for missed daily reward snapshots — already on-chain but unrecorded, recoverable within the contract's acceptance window, or permanently lost — instead of treating every gap the same way, preventing both reward overpayment and silent underpayment.

---

### Flyverr — Staged Resale Marketplace Platform
*A digital-product marketplace where a purchase is a staged, multi-round resale license rather than a one-time sale, integrated with Stripe Connect.*

**Role:** Founding Frontend Engineer — established the application's core architecture from an empty scaffold

- Established the application's frontend architecture — authentication context, a role-gated route guard, and a single Axios integration layer with automatic token refresh — from an empty Next.js scaffold, creating the foundation every later feature, including features later built by another engineer, was built on top of.
- Designed a per-domain services/hooks/types convention that became the project's standing pattern for API integration, converting every backend payload to a typed domain object at the service boundary instead of letting components consume raw responses.
- Built a single reusable Stripe Connect onboarding gate — a higher-order component running an ordered readiness check (auth, self-purchase prevention, cached status, then a live re-check) — and wired it into every purchase and product-creation action, replacing what would otherwise have been several independently drifting readiness checks.
- Modeled a multi-round resale and licensing business model as a single deterministic expression driving the buyer UI, removing the ambiguity that a conditional-JSX approach would have introduced as the rule set grew.
- Enforced route-level access control with a live, server-verified user query rather than a cached client role flag, using the cached value only for instant UI feedback while the actual access decision always resolved against the backend.
- Built the admin moderation console — product approval with auto-suggested staged pricing, user management, review moderation — on shared table and pagination primitives instead of one-off implementations per screen.

---

### Dibzi — NFC-Triggered On-Chain Loyalty Platform
*A loyalty platform where tapping a physical NFC tag mints or advances an on-chain reward token, with tier programs configurable from a web dashboard after tokens are already in circulation.*

**Role:** Full-Stack Engineer — mobile app, backend API, blockchain minting, and two role-scoped dashboards
**Timeline:** April – October 2025

- Diagnosed a structural incompatibility between the product's requirement — a loyalty reward that must remain editable after issuance — and the original storage design (IPFS, which is immutable by definition) after already building and testing that original pipeline, then redesigned the NFT metadata architecture around a fixed API endpoint that computes the metadata document from live database state at request time, making already-issued rewards editable with no re-mint and no transaction cost.
- Rebuilt tier-progression logic to recompute a customer's eligible tier from current thresholds on every check-in rather than from a stored list position, making a customer downgrade structurally impossible when a merchant edits or reorders their tier program after customers have already progressed through it.
- Designed the NFC scan lifecycle as an explicit resource with acquire/use/release semantics, guaranteeing hardware-lock release on every exit path, bounding an otherwise-indefinite scan wait with a timeout, and distinguishing absent hardware from disabled hardware with different recovery paths for each.
- Resolved a Node/browser dependency incompatibility that prevented the admin dashboard from building at all, by constructing an explicit polyfill configuration across two different bundler pipelines and writing a targeted interop shim for one transitive dependency with no documented fix available.
- Migrated live customer check-in records across three simultaneously-existing schema formats to a new per-visit history model using combined read-time normalization and an idempotent backfill job, shipping the change with no downtime or data loss for existing customers.
- Implemented three separate, composable authorization guards for a REST API serving three trust levels, with authorization state read from the database on every request, so suspending an account takes effect on the very next request without any token-revocation infrastructure.

---

### Lindo Mart — Internal Operations Platform
*An internal staff platform for inventory, equipment, and safety-reporting workflows.*

**Role:** Full-Stack Engineer — joined an in-progress, multi-developer codebase
**Timeline:** September – November 2025

- Designed and built a nine-domain reference-data subsystem (inventory, equipment, and five operational/safety alert types) across five backend modules, recognizing that five of the domains were structurally identical and consolidating them into one generic schema and component set instead of five near-duplicate implementations.
- Built a field-limited public read endpoint alongside each domain's admin CRUD routes, letting regular staff pull real inventory and alert data into form dropdowns without being granted admin access, while each domain independently controlled which fields it exposed.
- Rebuilt a single long, seven-type form into a three-step wizard driven by one per-type validation dispatcher, and redesigned the underlying data model from raw string user references to typed database references to support correct, single-query population of submitter and recipient data.
- Traced and fixed a JavaScript truthiness bug in the shared role-based access guard that had been silently rejecting every request to every route intended to be public, and closed a data-exposure defect where non-admin staff could see forms and dashboard statistics that weren't addressed to them.
- Diagnosed and fixed a React authentication race condition where a hard page refresh briefly evaluated a valid session as unauthenticated and redirected the user to the login screen, replacing a symptom-level timer workaround with an explicit loading state that resolves the underlying race.

---

### SocialFi Trading — Content-as-Assets Social Trading Platform
*A social platform where posts and comments are tradeable financial instruments priced on a Solana bonding curve, spanning a mobile app, backend, admin console, and four on-chain programs.*

**Role:** Full-Stack & Blockchain Engineer — backend, Solana smart contracts, React Native mobile app, admin console

- Migrated a live trading engine from a custodial, database-only ledger to a non-custodial architecture where the backend builds unsigned Solana transactions for a user's own wallet to sign, with a separate on-chain indexer mirroring confirmed trades back into the database using an idempotency key derived from the transaction signature — removing custodial fund risk and eliminating a specific class of stale-price slippage errors caused by the database drifting from on-chain state.
- Authored four Rust/Anchor smart contracts (a bonding-curve trading engine, an escrow program, a staking program, and a platform token) implementing price and fee calculations as pure integer math, with the fee-split logic verified identical between the Rust contract and the TypeScript backend through matching unit tests on both sides.
- Identified and remediated two security weaknesses in the existing codebase — a platform signer keypair and service-account credentials stored as plaintext environment variables, and a single hardcoded local-storage encryption key shared across every mobile install — shipping a secrets-abstraction service for the first and a per-install random key with a one-time, backward-compatible migration for the second, so existing users weren't disrupted by the fix.
- Built a resilient mobile wallet-signing flow (a Phantom/Solflare deep-link protocol with ephemeral session keys persisted through OS-level app suspension) that automatically detects and recovers from an expired wallet session or a stale on-chain account by re-fetching a fresh transaction and reopening the wallet, rather than surfacing a raw error to the user.
- Implemented a real-time comment and notification pipeline using a transactional outbox pattern — writing a notification event inside the same database transaction as the trade that triggers it — feeding queue-based delivery workers and Socket.IO channels, so a crash between recording an event and delivering it can't silently lose the notification.
- Delivered an end-to-end feature turning a creator's trading and social activity into a shareable, disclaimer-guarded summary (aggregation service, backend test, typed mobile API client, and screen), including precision-safe serialization of large token amounts and server-side content truncation to prevent the endpoint from leaking full post content.

---

### Mindful Oasis — Wellness Platform with On-Chain Rewards
*A mindfulness and meditation platform — breathwork, guided meditation, gratitude journaling, mood tracking — that rewards consistent practice with a claimable XRPL token.*

**Role:** Full-Stack Engineer — React frontend, Node/Express backend, XRPL blockchain integration

- Built a gamified progress system spanning daily streaks, levels, and a reward ledger, backed by a dedicated reward-rules engine that computes earned tokens from completed activity across ten distinct mindfulness modalities.
- Integrated XRPL wallet authentication alongside a custodial hot-wallet reward-claim system, including balance monitoring before every claim and an auto-refill mechanism that tops up the hot wallet from an admin wallet when its balance drops below a configured threshold.
- Secured the hot wallet's signing seed with AES encryption at rest instead of a plaintext environment variable, with a documented separation between a directly-configured development seed and an encrypted production seed.
- Designed a meditation-completion API that accepts a distinct response shape per activity type — breathwork cycle counts, a five-sense grounding inventory, mindful-eating observations, yoga and tai-chi step completion — backed by a history endpoint supporting type, date-range, and pagination filters.
- Built an admin panel for managing users, meditation content, and reward rules, with media uploads for meditation content handled through a dedicated media service rather than stored on the application server.

---

### Social Locket — Real Estate Social Marketplace
*A social property marketplace where users create and browse real-estate listings and "wanted" listings, get matched against each other, submit offers, collaborate in listing groups, and message other users.*

**Role:** Frontend Engineer (React) — listing and marketplace workflows, search/matching, payments and auth UI

- Built a shared property-listing form (used for both creation and editing) with a react-hook-form and Yup validation schema encoding real-estate-specific business rules — conditional numeric fields for bathrooms and reception rooms, required amenity and feature selections, and distinct sell / buy / rent / furnished / payment-type states — so an incomplete or inconsistent listing can't be submitted.
- Implemented an image pipeline for listings combining drag-and-drop upload, in-browser compression, and an in-app cropping step ahead of the Cloudinary upload, keeping large source images from ever reaching the network unprocessed.
- Designed a matching and offer system around a distinct "property wanted" listing type, backed by a dedicated matched-listing endpoint and an offers API that lets a buyer submit and track an offer against a specific listing.
- Built a group-based collaboration layer on top of individual listings — post groups with member and admin roles, plus a separate user-request flow for connecting two accounts — so a listing isn't limited to a single owner acting alone.
- Established a shared reference-data pattern (currency, inventory type, bedroom count, and other lookups each pulled through a dedicated data-fetching hook) reused across the listing-creation, search, and dashboard screens instead of re-fetching or hardcoding the same options per screen.
- Integrated Stripe and PayPal checkout with a dedicated payment-confirmation route and an OTP-based registration/login verification flow, and wired Web3 wallet-connect infrastructure (multi-chain provider configuration) at the application root ahead of the dedicated wallet-connect feature screen, so the integration point was ready to build directly against.

---

## Core Engineering Themes

- **Full-Stack Engineering** — backend, frontend, and mobile ownership within the same feature, across React, React Native, and two backend frameworks.
- **Marketplace & Social Platforms** — matching, offers, group-based collaboration, staged/multi-round purchasing, and moderation tooling built around real product rules rather than generic CRUD.
- **Backend & API Architecture** — service-boundary design, typed domain conversion, and REST APIs serving multiple trust levels.
- **Event-Driven & Asynchronous Processing** — webhook ingestion, queues and background workers, transactional outbox patterns, idempotency and deduplication under concurrency.
- **Blockchain Engineering (Solana & XRPL)** — Anchor smart contracts, wallet-signature authentication, on-chain event indexing, and both custodial and non-custodial transaction models.
- **AI Engineering** — grounding LLM output in computed, verifiable data, structured-output constraints, and graceful degradation when an AI provider is unavailable.
- **Reliability & Concurrency Engineering** — write-ahead logs, distributed deduplication, conditional database updates, and explicit failure-mode design for every external dependency.
- **System Design** — event-driven pipelines, multi-tenant authorization, and schema migrations executed against live data with no downtime.

---

## Recruiter Positioning

This experience positions the candidate as a senior full-stack and blockchain engineer suited for backend- and integration-heavy roles: fintech and DeFi platforms, event-driven and real-time systems, and any product where a mobile or web client has to stay correct against a backend or blockchain that changes underneath it. The strongest fit is a team that needs one engineer who can move from a smart contract or a queueing system down to the mobile screen without a hand-off, and who treats concurrency, failure modes, and security as first-class design constraints rather than afterthoughts.