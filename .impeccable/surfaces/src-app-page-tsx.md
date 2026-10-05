---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/components/ui.tsx"]
---

# Surface: exam catalogue landing (/), plus global top navbar and new logo

Mode: Persuade (a light one: the job is "find my exam and start"). Audience: government-exam aspirants on phones and laptops. Action: open a live exam's practice library. Proof on hand: the real BPSC TRE 4.0 Computer Science bank (14 subjects, 70 sets, 2,098 questions, bilingual). No testimonials or counts beyond that.

Constraints: live exams come from /api/catalog; planned exams (SSC GD Constable, SSC MTS, RRB NTPC, CTET) are labelled "Coming soon" and are never clickable. Families: Teaching, SSC, Railway (more later: Banking, State PSC). The library moves to /exams/<examId>; the test screen keeps its focus header.

## Direction contract

THESIS: The home page asks one question, "Which exam are you preparing for?", and answers it with a filterable shelf of exams. It refuses the portal default of an ad-dense banner over an undifferentiated grid of identical tiles.

OWN-WORLD: The incumbent navy #132a34 and forge green #11765b on a cool #f6f8fa ground. The navy owns the whole hero band; green is reserved for actions and live status. Display type in Anek Latin (Ek Type, Indian foundry, with a Devanagari sibling) for headings and the wordmark; system UI for body. Cards are white sheets with one hairline border; live cards carry subject chips, planned cards are flat and quiet.

STORY: Visitors see in seconds that ExamForge is free timed practice for government exams, find their exam by family or search, and open it. If it isn't live yet, they see it is coming.

FIRST VIEWPORT: White top navbar (new mark + wordmark left; Exams and My attempts; account right). A navy band holds the question at about 3.4rem, one line of product truth, and a wide search field with family tabs underneath. The first card row starts at the bottom edge of the band, with the live BPSC card first.

FORM: Catalogue board raised with the search-led question; list position 1 (raised by 7); seed key 8b40668e.

Signature interaction: family tabs and search filter the shelf instantly, show live counts, and "/" focuses search.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
