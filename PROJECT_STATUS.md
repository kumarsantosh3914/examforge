# Project Status and Completion Plan

**Status:** Live at https://examforge.bevritti.in (deployed 2026-10-05; see `docs/DEPLOYMENT.md`). Production database seeded (14 / 70 / 2,098), HTTPS with auto-renewing Let's Encrypt certificate, per-minute expiry timer, and a production browser smoke test passed.

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

## Landing page, navbar and search readiness (2026-10-05)

- Exam catalogue landing at `/` (search, family filters, live exam card, coming-soon exams), global top navbar and new logo; the BPSC library moved to `/exams/bpsc-tre-4.0/computer`. Design records: `PRODUCT.md`, `DESIGN.md`.
- Search readiness: indexing enabled, `robots.txt`, database-driven `sitemap.xml`, server-rendered exam and subject pages with per-page metadata and canonical URLs, Open Graph/Twitter images, web manifest, WebSite/Organization structured data, `noindex` on personal pages, real 404s. Search Console steps are in `docs/DEPLOYMENT.md`.

## SSC GD Constable (2026-10-06)

- Second live exam at `/exams/ssc-gd-constable`. The importer now also accepts exams without a category level (`<exam>/index.json`, `"category": null`).
- Seed source `cleaned/ssc-gd-constable/` is copied from raw `data/ssc-gd-constable/` with three changes: the English subject is left out (all 100 questions have an empty question text in English and Hindi), mock-test titles read `Mock Test N` instead of `Mock Test Mock Test N`, and nothing else is edited.
- New validation rule: a question fails if another option repeats the answer text exactly. `reasoning-02-002` and `hindi-05-003` fail it and are quarantined; BPSC is unaffected.
- Totals: 2 exams, 19 subjects, 100 sets, 3,296 usable questions (3 quarantined). SSC GD: 5 subjects, 30 sets, 1,198 questions.
- Exam guides: long-form "about this exam" content (pattern, syllabus, selection, tips) lives in `src/lib/exam-guides.ts` and renders server-side under the subject list via `src/components/exam-guide.tsx`. BPSC TRE 4.0 Computer Science and SSC GD both have one (with an FAQ); exams without an entry show nothing. The BPSC guide follows the official TRE 4.0 Advertisement 15/2026 (22 Sep 2026) and its 29 Sep 2026 corrigendum: 1/3 negative marking with an Option E, merit on Parts II + III, Computer Science only for Classes 11–12 (407 posts). Exam date not yet announced; update `facts` in `src/lib/exam-guides.ts` when it is.

## Remaining Work

1. **Rotate the MongoDB credential.** Production currently uses the same Atlas user as development, and that credential has been shared. Create a dedicated production user, update `MONGODB_URI` in the server's `.env.local`, and run `sudo systemctl restart examforge`.
2. **Operations:** Atlas backups, uptime/error monitoring, and log retention.
3. **Optional hardening:** restrict SSH (port 22) to known IPs; restrict Atlas network access to the Elastic IP `52.66.13.189`.

## Known Constraints

- MongoDB must support transactions; Atlas or a replica-set deployment is required.
- One cleaned source record is intentionally excluded rather than repaired by guessing.
- Deleting all cookies or changing browsers creates a new anonymous identity. Preventing that would require intrusive fingerprinting, which is deliberately excluded.
- Email verification and password recovery require a mail provider and are deferred; only email/password signup, login, persistent sessions, and logout are implemented.
- The supplied MongoDB credential exists only in ignored `.env.local` and must be rotated before deployment.
