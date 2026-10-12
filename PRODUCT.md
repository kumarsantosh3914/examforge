# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Aspirants preparing for Indian government recruitment exams, starting with BPSC TRE 4.0 (Bihar teacher recruitment) Computer Science candidates. They practise on phones and laptops, often in Hindi and English, and want timed mock tests that feel like the real paper followed by explanations they can learn from.

## Product Purpose

ExamForge offers timed practice sets with server-scored results and question-by-question bilingual explanations. Success means a candidate finds their exam quickly, starts a set without friction, and returns to keep practising.

## Positioning

Practice-first: no signup for the first three sets, answers save to the server as you go, tests resume across refreshes and devices, and every result comes with English and Hindi explanations. Scope will grow from one exam to government exams broadly.

## Operating Context

- Exam families planned: Teaching (BPSC TRE, CTET, STET), SSC, Police, Railway, Banking, and State PSC.
- Live today: BPSC TRE 4.0 Computer Science — 14 subjects, 70 sets, 2,098 questions; BPSC TRE 4.0 Physics (Classes 11–12) — 20 subjects, 100 sets, 1,996 questions; SSC GD Constable — 5 subjects, 30 sets, 1,198 questions; DSSSB TGT Computer Science — 5 mock tests of 30 questions in 10 minutes, with 0.25 marks deducted per wrong answer; CTET Paper 2 (Classes 6–8) — 9 subjects, 90 sets (20 full 150-question mock tests), 5,098 questions; CTET Paper 1 (Classes 1–5) — 6 subjects, 60 sets (10 full 150-question mock tests), 2,998 questions; Bihar Police Constable — 3 subjects, 15 sets (5 full 100-question, 2-hour mock tests), 675 questions.
- Announced as "coming soon" (not yet live, no questions): SSC MTS, RRB NTPC. These must never be clickable or presented as available.
- Exams, categories, subjects and sets are discovered from the question bank and the `exams` collection; the landing page must list live exams from data, not hard-coded copies.

## Capabilities and Constraints

- Guests get three completed attempts; then a free email/password account is required.
- One active attempt per learner; server-owned timers; answer keys hidden until submission.
- Bilingual content (English and Hindi) at the question level.
- Next.js App Router + MongoDB; deployed at https://examforge.bevritti.in.
- Undecided: pricing beyond the free tier, email verification and password recovery.

## Brand Commitments

- Name: **ExamForge** (kept). A new logo mark and wordmark are wanted.
- Current voice: calm, encouraging, practical ("Make every practice count."). No hype or fake urgency.

## Evidence on Hand

- Real question banks in `cleaned/` (BPSC TRE 4.0 Computer Science, BPSC TRE 4.0 Physics, SSC GD Constable, DSSSB TGT Computer Science, CTET Paper 1, CTET Paper 2, Bihar Police Constable).
- No testimonials, user counts, pass rates, partner logos or press. Do not invent any.

## Product Principles

1. Practice before persuasion: a candidate should reach a real test in two clicks.
2. Honest availability: only live exams are actionable; planned exams are clearly labelled.
3. Bilingual by default: Hindi is a first-class reading experience, not a toggle afterthought.
4. Progress is never lost: saved answers, resumable tests, server-authoritative scoring.

## Accessibility & Inclusion

WCAG 2.2 AA: keyboard-complete, ≥4.5:1 text contrast, usable at 375px and 200% zoom, long Devanagari text must wrap cleanly.
