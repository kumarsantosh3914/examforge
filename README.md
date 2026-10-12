# ExamForge

A production-oriented BPSC TRE 4.0 Computer Science practice platform built with Next.js and MongoDB. Guests can complete three timed practice sets before an account is required. Tests resume across refreshes, use server-authoritative deadlines, save answers to MongoDB, and produce a detailed server-scored review.

## Local setup

Requires Node.js 22+ and a MongoDB replica set (transactions are used to keep attempts and the free allowance consistent).

1. Copy `.env.example` to `.env.local` and set a development MongoDB URI, database name, origin, and random session secret.
2. Install dependencies with `npm install`.
3. Import the cleaned question bank with `npm run seed`.
4. Start development with `npm run dev`, then open `http://localhost:3000`.

For a local MongoDB replica set, start the included container with `docker compose up -d`, wait for it to become healthy, then use `mongodb://127.0.0.1:27018/?replicaSet=rs0&directConnection=true`. A Homebrew `mongod --replSet rs0` (after `rs.initiate()`) works too. Integration tests create a throwaway `examforge_test_*` database (Atlas caps names at 38 bytes) and drop it afterwards.

## Commands

- `npm run dev` — development server.
- `npm run build && npm start` — production build and server.
- `npm run seed` — validate and idempotently upsert the cleaned bank.
- `npm run validate` — data validation, lint, type checking, and unit tests.
- `npm run test:integration` — isolated MongoDB integration tests.
- `npm run test:e2e` — browser flow against a running `npm run dev` (guest limit, resume, stale tabs, expiry, auth, mobile layout). Needs Playwright's Chromium (`npx playwright install chromium`) and the server's `MONGODB_URI`/`MONGODB_DB`; screenshots land in `test-results/e2e/`.
- `npm run expire` — eagerly finalize expired attempts; schedule every minute in production.

The seed source is `cleaned/` (`bihar-police-constable/`, `bpsc-tre-4.0/computer/`, `bpsc-tre-4.0/physics-11-12/`, `ctet-paper-1/`, `ctet-paper-2/`, `dsssb-tgt/computer-science/` and `ssc-gd-constable/`). The raw `data/` tree is retained unchanged. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for data models, security choices, guest-attempt policy, and deployment notes.
