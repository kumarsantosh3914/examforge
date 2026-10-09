# ExamForge architecture

## Application

A single Next.js App Router application runs on Node.js. React renders the catalogue, test workspace, authentication, history, and review pages. Route handlers call a shared TypeScript service layer; only that layer accesses MongoDB through the official driver. Zod validates input. No separate backend, global state library, or admin dashboard is necessary.

## Data and reproducibility

`cleaned/` was copied byte-for-byte from the adjacent `bpsc-tre-crawler/cleaned` directory because this checkout originally contained only raw `data/`. Neither raw tree nor the crawler is modified. The importer discovers exam/category indexes and validates every subject, set, and question. The one known invalid record, `programming-languages-05-027`, has an empty English option; it is explicitly quarantined, never repaired by guessing. Unexpected validation failures stop the import before database writes. Displayed counts reflect usable questions, not stale source counts.

Collections: `exams`, `subjects`, `sets`, `questions`, `users`, `actors`, `sessions`, `attempts`, `rateLimits`. String identifiers are stable and scoped by exam/category/set. Original question IDs are retained separately. Seed upserts are content-digest based and indexed uniquely. Removed records are deactivated, not deleted. Attempts embed immutable question snapshots so later seed changes cannot change historical results. Scores are embedded in attempts rather than duplicated in a results collection.

## Anonymous allowance and authentication

A random 256-bit guest token in an HttpOnly, SameSite=Lax cookie identifies a persistent database actor. Only its SHA-256 digest is stored. Guests may complete three attempts. A transactional actor lock permits only one active attempt, so concurrent tabs cannot reserve extra free attempts. Manual submission always counts, even when blank. Automatic expiration counts if at least one answer was saved; untouched expired attempts become ABANDONED and reveal no answers. Abandoning early does not refund a manually submitted attempt. Clearing localStorage, refreshing, or opening another tab cannot reset usage. Deleting all cookies or using another browser creates a new identity; preventing that without signup requires intrusive fingerprinting and is deliberately out of scope.

Passwords use Node's scrypt with a unique salt and constant-time verification. Auth sessions use random opaque tokens, hashed at rest, with a 30-day expiry and Secure cookies on HTTPS. Login rotates the auth session. Guest history is claimed once by the signed-in user. A guest test still in progress at sign-in moves to the account actor (unless the account already has one running), so the one-active-attempt lock still holds. Logout revokes the current session. MongoDB-backed limits protect login by identity and trusted proxy IP. Mutations require the configured same origin and JSON bodies; no client-controlled query objects are accepted.

## Attempt consistency

Question and option ordering follow the source and are frozen at start. Duration is one minute per usable question unless the subject index gives a set a fixed `durationMinutes` (DSSSB sets: 30 questions in 10 minutes). An exam index may set `negativeMarking`, the marks deducted per wrong answer (DSSSB: 0.25); it is copied onto each set and then onto each attempt at start, so later bank changes never rescore a test in progress. Unanswered questions cost nothing, and a score can fall below zero. The server stores start/deadline timestamps. Answers require ownership, IN_PROGRESS status, a future server deadline, and the current revision. Stale tab updates receive a conflict and resync. Answer keys and explanations are omitted from active-attempt DTOs, including translations. Scoring and allowance changes commit in one MongoDB transaction; repeated submissions return the existing result.

The browser counts down using a monotonic clock calibrated to server time, autosaves each answer, polls for other-tab changes, and resyncs on focus/reconnection. Expiration is enforced on every attempt operation regardless of browser activity. Run `npm run expire` every minute to eagerly finalize closed-browser attempts; lazy finalization remains authoritative without the scheduler. Database replica-set support is required for transactions (Atlas provides this).

## Deployment

Deploy the standalone Node build behind HTTPS, use a separate production MongoDB database, set APP_ORIGIN and a random SESSION_SECRET, and configure an expiration job. The supplied Atlas database is development/test only. Keep credentials out of client bundles and source control. Set `TRUST_PROXY=true` only behind a reverse proxy that sets or appends `X-Forwarded-For`; the rightmost entry is used as the client IP. Without it, IP-keyed limits (guest creation, auth) share one global bucket, which throttles legitimate traffic under load. Horizontal workers share sessions, counters, and rate limits in MongoDB. Production readiness also requires operational backups, monitoring, and a mail provider before adding email verification/password recovery.
