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

## DSSSB TGT Computer Science (2026-10-09)

- Third live exam at `/exams/dsssb-tgt/computer-science`: one subject (Mock Test) with 5 sets of 30 questions and a 10-minute limit each, 150 questions in English and Hindi with explanations.
- Built from three response-sheet PDFs (`newexam/`, not committed): 1 Aug 2021, 7 Aug 2021 Shift 3 and 24 Jun 2023 Shift 3. Each set mirrors the real paper's mix: 3 questions from each of the five Section A sections and 15 from Section B (Computer Science, with 1–2 teaching-methodology questions). Sets 1–2 come from the 1 Aug paper, 3–4 from 7 Aug, and 5 from the 2023 paper; most Hindi-language questions in sets 1–4 come from the 2023 paper, whose Hindi text extracts cleanly.
- Answer keys are the options marked correct (green) in the official response sheets, read from the PDFs' text colours; every key was also checked by hand. Questions that depend on a figure, whose formulas did not survive extraction, or whose official key looked wrong (for example 1917 for the Kheda Satyagraha) were left out. New questions have no `hash` (no documented procedure).
- Negative marking: DSSSB deducts 0.25 marks per wrong MCQ answer (DSSSB "New Examination Scheme" notice). The exam index now accepts `negativeMarking` and the subject index accepts a per-set `durationMinutes`; scores, the set list, the test header and the result sheet all reflect the deduction. BPSC and SSC GD are unchanged (still no deduction; their guides tell candidates to score by hand). Turning it on for them is one field in their `index.json`.
- SSC GD and DSSSB both have a `mock-test` subject, so source question IDs such as `mock-test-01-001` repeat across exams; database IDs stay exam-qualified, and the data test now checks uniqueness per exam.
- Totals: 3 exams, 20 subjects, 105 sets, 3,446 usable questions (3 quarantined, none new).

## CTET Paper 2 (2026-10-12)

- Fourth live exam at `/exams/ctet-paper-2` (Classes 6–8, CBSE): 9 subjects, 90 sets, 5,098 usable questions in English and Hindi with explanations. Two full-test subjects (Mathematics & Science, Social Studies/Social Science) have 10 sets of 150 questions with 150 minutes, the real paper's length; the seven section subjects (Child Development and Pedagogy, Language I (Hindi), Language II (English), Mathematics, Science, Social Studies, Social Science) have 10 sets of 30. No negative marking, as in CTET.
- Seed source `cleaned/ctet-paper-2/` is copied from raw `data/ctet-paper-2/` (freetesthub.com/ctet-paper-2 structure) with one change: full-test set titles read `Mathematics & Science Full Test N` and `Social Studies / Social Science Full Test N` instead of `Mock Test Mathematics & Science (Full Test) Mock Test N`.
- `mathematics-06-014` and its copy `mock-test-mathematics-science-full-test-05-073` (Roman numeral for 99, `XCIX` as both A and C) fail the duplicate-answer rule and are quarantined, so those sets have 29 and 149 questions.
- Known source quirks, left as supplied: full tests are assembled from the section sets in the order English, Hindi, then subject/CDP blocks (not the real paper's order); 15 questions repeat inside a full test; Social Science has only 153 distinct questions across its 300; and answer keys lean heavily on B (59% overall; Mathematics 84% A, Language I 85% B), as in the BPSC bank.
- Exam guide in `src/lib/exam-guides.ts` (pattern, syllabus with practice links, eligibility, qualifying marks, tips, FAQ). It does not state an exam date because reports of the next cycle conflict; it points to ctet.nic.in. The planned "CTET" card is now "CTET Paper 1".
- Totals: 4 exams, 29 subjects, 195 sets, 8,544 usable questions (5 quarantined).

## CTET Paper 1 (2026-10-12)

- Fifth live exam at `/exams/ctet-paper-1` (Classes 1–5, CBSE): 6 subjects, 60 sets, 2,998 usable questions in English and Hindi with explanations. The full-test subject has 10 sets of 150 questions with 150 minutes; the five section subjects (Child Development and Pedagogy, Language I (Hindi), Language II (English), Mathematics, Environmental Studies (EVS)) have 10 sets of 30. No negative marking.
- Seed source `cleaned/ctet-paper-1/` is copied from raw `data/ctet-paper-1/` (freetesthub.com/ctet-paper-1 structure) with three changes: the subject `Child Development and Pedagogy:` loses its trailing colon; `Mock Test(Full Test)` becomes `Mock Test (Full Test)` with set titles `Full Test N`; and Mathematics set 10, which held its 30 questions twice (31–60 repeat 1–30 in a shuffled order), is cut to the first 30.
- `mathematics-05-014` and its copy `mock-test-full-test-05-105` (the same `XCIX` duplicate-option question as Paper 2) are quarantined, so those sets have 29 and 149 questions.
- Known source quirks, left as supplied: full tests are assembled from the section sets in the order language, EVS, language, Mathematics, CDP; 8 questions repeat inside a full test (sets 1, 2, 9, 10), full tests 8 and 9 use the same EVS block, and 1 and 10 overlap in EVS; answer keys lean heavily on B (57% overall; Mathematics 84% A, Language I 85% B).
- Exam guide in `src/lib/exam-guides.ts`, mirroring Paper 2. The "CTET Paper 1" coming-soon card is removed; the planned list is now SSC MTS and RRB NTPC.
- Totals: 5 exams, 35 subjects, 255 sets, 11,542 usable questions (7 quarantined).

## BPSC TRE 4.0 Physics, Classes 11–12 (2026-10-12)

- Sixth live exam at `/exams/bpsc-tre-4.0/physics-11-12`, the second category under BPSC TRE 4.0: 20 subjects (the Class 11–12 units, from Physical World & Measurement to Communication Systems), 100 sets, 1,996 questions in English and Hindi with explanations. Sets have 20 questions and 20 minutes; four have 19. No deduction in the app, as for Computer Science.
- Seed source `cleaned/bpsc-tre-4.0/physics-11-12/` follows the freetesthub.com/bpsc-tre-4.0-physics-11-12 structure and has no raw copy in `data/`. Two changes on import: Electronic Devices set 4 held 30 questions whose 11–20 repeated 1–10 in a shuffled order, so the repeats are dropped and 21–30 renumbered `electronic-devices-04-011`…`020`; and the 30 questions in Atoms & Nuclei set 1 and Dual Nature of Matter set 5 that were written in LaTeX (`$^{56}_{26}Fe$`, `\frac`, `\lambda`), which the app does not render, now use plain Unicode (`⁵⁶₂₆Fe`, `λ = h/√(2mK)`) like the rest of the bank, in English and Hindi.
- Known source quirks, left as supplied: four 19-question sets keep their original numbering, so each has one gap (Physical World set 5 has no `004`, Oscillations set 4 no `007`, Current Electricity set 5 no `002`, Magnetism set 5 no `003`); 37 questions repeat across sets; and answer keys rarely use D (3%, against 44% B).
- Exam guide in `src/lib/exam-guides.ts`, sharing the TRE 4.0 pattern, marking, age and merit rules with Computer Science. Physics has 1,758 Class 11–12 posts; the qualification is a postgraduate degree in Physics with 50% and a B.Ed. (or an integrated alternative) plus STET Paper-II.
- Totals: 6 exams, 55 subjects, 355 sets, 13,538 usable questions (7 quarantined, none new). Seeded to dev (`examforge_dev`) and production (`examforge`); deployed 2026-10-12.

## Bihar Police Constable (2026-10-12)

- Seventh live exam at `/exams/bihar-police-constable`, under a new **Police** family on the landing page: 3 subjects, 15 sets, 675 questions in English and Hindi with explanations. Mock Test has 5 full 100-question papers mixing Hindi, English, Mathematics, Science, Social Science and Bihar GK, timed at the real 2 hours (`durationMinutes: 120`); General Knowledge has 5 sets of 20 and General Science 5 sets of 15, at one minute per question. No deduction, as in the CSBC exam.
- Seed source `cleaned/bihar-police-constable/` follows the freetesthub.com/Bihar-Police-Constable structure and has no raw copy in `data/`. Changes on import: subjects renamed from "Bihar Police Constable Mock Test", "GK" and "GS" to Mock Test (`mock-test`), General Knowledge (`general-knowledge`) and General Science (`general-science`), with set titles and question IDs to match (`mock-test-01-001`); three Hindi sandhi questions whose romanised English options repeated each other now spell them apart from the Hindi (`mock-test-03-100` B "Vidy + Arthi", `mock-test-04-014` D "Paa + Van", `mock-test-05-060` A–D "Mahaa/Mahee/Mahi + Indra/Eendra"); and `general-knowledge-03-001` now gives Bihar's state animal as the Gaur (Indian bison), not "Ox (Gaur)", in English and Hindi.
- Known source quirks, left as supplied: 42 questions repeat across sets (mostly mock-test questions that reappear in the GK and GS sets); a few questions are pinned to 2024 ("Chief Election Commissioner (as of 2024)"); and answer keys rarely use D (3%, against 54% B).
- Exam guide in `src/lib/exam-guides.ts`: written exam of 100 one-mark questions in 2 hours, qualifying at 30%, with merit decided by PET marks (running 50, shot put 25, high jump 25). Facts cite CSBC Advertisement 01/2025 (19,838 posts); no current advertisement is assumed.
- Totals: 7 exams, 58 subjects, 370 sets, 14,213 usable questions (7 quarantined, none new). Seeded to dev (`examforge_dev`) and production (`examforge`); deployed 2026-10-12.

## SSC MTS (2026-10-12)

- Eighth live exam at `/exams/ssc-mts`, under the SSC family: 6 subjects, 36 sets, 1,203 questions in English and Hindi with explanations. Mock Test (Session I) has 10 sets of 33–39 Mathematics and Reasoning questions and Mock Test (Session II) 9 sets of 48–50 General Awareness and English questions, both on the real 45-minute session timer (`durationMinutes: 45`). The sectional subjects (Mathematical Ability 5 sets, Reasoning Ability 3, General Awareness 4, English Language 5, of 20 or 25 questions) allow one minute per question. No deduction in the app; the real Session II deducts 1 of 3 marks per wrong answer, and the guide tells candidates to score it by hand, as for BPSC and SSC GD.
- Seed source `cleaned/ssc-mts/` follows the freetesthub.com/SSC-MTS structure and has no raw copy in `data/`. Changes on import: subjects `Mock Test(Session I)`/`(Session II)` become `Mock Test (Session I)`/`(Session II)` with set titles `Session I Mock Test N`; `mock-test-session-i-03-023` had a fifth option E holding the answer (HKTG), which now replaces the wrong option D (GKUG) and the key is D, in English and Hindi; `english-language-01-020` listed "Grammer" as both A and C, so C is now "Grammor"; and `mock-test-session-i-04-026` and `reasoning-ability-02-015` (dictionary order) had `null` explanations, which now explain the order in English and Hindi. Their keys were checked and are unchanged.
- Known source quirks, left as supplied: set numbers have gaps (General Awareness has no set 2, Reasoning Ability no sets 3 and 5, Session II no set 8), and IDs keep the source numbers; Session I sets have 33–39 of the paper's 40 questions and most sets have numbering gaps; Session II sets 2 and 10 have 48; 7 questions repeat exactly across sets; a few reasoning questions describe a figure in words (Venn diagrams, mirror and water images) and stay because they are answerable as text; and answer keys rarely use D (3%, against 51% B).
- Exam guide in `src/lib/exam-guides.ts` (pattern, syllabus with practice links, eligibility, stages including the Havaldar PET/PST, merit, tips, FAQ). It does not state dates or vacancies because reports of the 2026 cycle conflict; it points to ssc.gov.in. The "SSC MTS" coming-soon card is removed; RRB NTPC is the only planned exam left.
- Totals: 8 exams, 64 subjects, 406 sets, 15,416 usable questions (7 quarantined, none new). Dev database (`examforge_dev`) seeded; production not yet.

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
