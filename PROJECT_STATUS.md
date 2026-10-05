# Project Status and Completion Plan

**Status:** Feature-complete and verified against a real database and browser (2026-10-05). The code is ready to deploy. What remains is operator work that needs production infrastructure and secrets (see *Remaining Work*).

## Implemented

### Application architecture

- Next.js 16 App Router application with TypeScript and React 19.
- Server-only MongoDB access using the official driver; the browser never connects directly to MongoDB.
- Zod validation for API inputs and question-bank records.
- Architecture and operating decisions documented in `docs/ARCHITECTURE.md`.
- Local setup, commands, and replica-set requirements documented in `README.md`.

### Question bank and database

- Cleaned seed source copied to `cleaned/bpsc-tre-4.0/computer/`; raw `data/` files remain separate and unchanged.
- Dynamic discovery of exams, categories, subjects, sets, and questions.
- Validated source totals: **14 subjects, 70 sets, 2,099 source records**.
- **2,098 usable questions**; `programming-languages-05-027` is quarantined because option C is blank.
- Idempotent upsert-based seed process with stable identifiers, content digests, deactivation of removed records, indexes, and import summaries.
- Collections: `exams`, `subjects`, `sets`, `questions`, `actors`, `users`, `sessions`, `attempts`, and `rateLimits`.

### Core product flows

- Database-generated subject and set catalogue with search and responsive layouts.
- Anonymous sessions stored in secure HttpOnly cookies and backed by a database actor.
- Three completed guest attempts; a fourth start requires registration or login.
- Email/password registration and login using salted `scrypt` hashes and opaque hashed session tokens.
- Timed attempts with server-owned start and deadline timestamps.
- Answer autosave, stale-tab revision checks, refresh/resume support, manual submission, and automatic expiration.
- Server-side scoring with correct, wrong, unanswered, score, percentage, and question-level explanations.
- Active-attempt responses omit correct answers and explanations.
- Attempt history, logout, loading, empty, authentication, expiration, and service-error states.

## Verification Completed

| Check | Result |
| --- | --- |
| Data validation | Pass: 14 subjects, 70 sets, 2,098 usable questions, 1 quarantined |
| Unit tests | Pass: 10/10 |
| TypeScript, ESLint, production build | Pass |
| Atlas dev seed (`examforge_dev`) | Pass: first run inserted 2,183 records; second run inserted/updated 0 (2,183 skipped). Active totals 14 / 70 / 2,098 |
| MongoDB integration suite | Pass: 9/9 on Atlas and on a local single-node replica set |
| Local Docker stack (`docker compose up -d`) | Pass: seed idempotent, integration 9/9, end-to-end 17/17, `npm run expire` runs. Needs `directConnection=true` in the URI (now in `.env.example`) |
| Browser end-to-end (`npm run test:e2e`) | Pass: 17/17 steps, no unexpected console errors |
| Accessibility scan | Pass: AA text contrast on all pages, keyboard answering, dialog focus/Escape, no horizontal scroll at 375px or 200% zoom |
| Impeccable detector (`src/app`, `src/components`) | Pass: 0 findings |

The end-to-end flow covers guest practice, autosave, refresh/resume, answer-key redaction, stale second-tab conflicts, the resume banner, manual submit, auto-submit on expiry, abandoned untouched expiry, the three-attempt limit with redirect to signup, registration continuing into the blocked set, claimed history, logout, wrong-password rejection, login, cross-origin rejection, and mobile layouts including long Hindi content.

### Fixed during final verification

- **Integration suite on Atlas:** test database names exceeded Atlas's 38-byte limit, and a failed setup left the client open so the run hung forever instead of failing. Names are now shorter, and cleanup always closes the client.
- **Guest→account claim:** a guest test in progress at sign-in was tagged to the user but not locked on the account actor, so a second concurrent test could start. The active attempt now moves to the account actor in the same transaction (covered by a new integration test that fails without the fix).
- **Rate-limit IP behind proxy:** used the leftmost `X-Forwarded-For` entry, which the client controls when a proxy appends. It now uses the rightmost entry.
- **Keyboard answering:** the answer fieldset was disabled during autosave, which removed focus from the selected radio and broke arrow-key navigation. Controls now stay enabled, and `answer()` already ignores input while a save is in flight.
- **Contrast:** 46 secondary-text colors raised to at least 4.5:1 on their surfaces (hue preserved); decorative icons kept at ≥3:1.
- **Detector findings:** removed the unloaded `Inter` font from the stack (consistent system UI font everywhere), and switched the progress bar from animating `width` to `transform`.
- **`npm run test:e2e`:** previously invoked `playwright test` with no config or `@playwright/test` package; it now runs `tests/e2e/flow.mjs`.

New concurrency coverage: simultaneous starts from two tabs reserve one attempt; answer saves racing duplicate submissions always score exactly the stored answers.

## Remaining Work (operator, needs production access)

1. **Rotate the MongoDB credential** in `.env.local` (it has been shared) and create a separate production database user.
2. **Production environment:** HTTPS host, `APP_ORIGIN` set to the public origin, a newly generated `SESSION_SECRET`, `MONGODB_URI`/`MONGODB_DB` for the production database, and `TRUST_PROXY=true` behind the platform's proxy (otherwise IP limits share one global bucket).
3. **Seed production:** `npm run seed` with production secrets; expect 14 / 70 / 2,098 active.
4. **Scheduler:** run `npm run expire` every minute. Lazy expiry stays authoritative without it.
5. **Operations:** database backups, uptime/error monitoring, and a post-deploy smoke run (`E2E_BASE_URL=https://… npm run test:e2e` against a staging database, since the script edits deadlines in the DB).

## Known Constraints

- MongoDB must support transactions; Atlas or a replica-set deployment is required.
- One cleaned source record is intentionally excluded rather than repaired by guessing.
- Deleting all cookies or changing browsers creates a new anonymous identity. Preventing that would require intrusive fingerprinting, which is deliberately excluded.
- Email verification and password recovery require a mail provider and are deferred; only email/password signup, login, persistent sessions, and logout are implemented.
- The supplied MongoDB credential exists only in ignored `.env.local` and must be rotated before deployment.
