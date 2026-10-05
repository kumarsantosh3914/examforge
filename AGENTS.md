# Repository Guidelines

## Project Structure & Module Organization

This repository contains BPSC TRE 4.0 computer subject question banks. Data lives in `data/bpsc-tre-4.0/computer/`:

- `index.json` lists subjects, directory slugs, and set counts.
- `<subject-slug>/index.json` lists mock-test sets, question counts, and filenames.
- `<subject-slug>/set-01.json` contains set metadata and questions, including English content and Hindi translations under `translations.hi`.

There are currently 14 subject directories and five sets per subject. No application source, separate assets, or test directory is present.

## Build, Test, and Development Commands

There is no configured build system, development server, or package manager. Run these commands from the repository root with Python 3:

- `python3 -m json.tool data/bpsc-tre-4.0/computer/index.json` checks and displays a single JSON file.
- The following command validates JSON syntax across the dataset:

```sh
python3 - <<'PY'
import json
from pathlib import Path
files = list(Path("data").rglob("*.json"))
for path in files:
    json.loads(path.read_text(encoding="utf-8"))
print(f"Validated {len(files)} JSON files")
PY
```

## Coding Style & Naming Conventions

Use two-space indentation, double-quoted JSON strings, UTF-8 text, and a trailing newline. Preserve readable Hindi characters. Use lowercase kebab-case subject directories and zero-padded filenames such as `set-01.json`. Follow question IDs such as `computer-fundamentals-01-001`. Preserve existing field names and ordering, and avoid unrelated reformatting.

## Testing Guidelines

No automated test framework or coverage threshold is configured. Before submitting changes, validate JSON syntax and manually verify:

- Subject slugs and referenced set files resolve correctly.
- `setCount` and `questionCount` match actual contents.
- Question IDs are unique and numbering is sequential within each set.
- Options use `A`–`D`, and `answer` identifies the correct option.
- English and Hindi questions, options, and explanations remain aligned.

Preserve existing `hash` fields during unrelated edits; no hash-generation procedure is documented here.

## Commit & Pull Request Guidelines

Git metadata is unavailable in this checkout, so existing commit conventions cannot be verified. Use concise, imperative messages, for example `Fix DBMS set 02 answer explanations`.

Keep changes focused. In pull requests, identify affected subjects, sets, and question IDs; explain corrections; link relevant issues or supporting references; and report validation performed. Update both index levels when adding or removing sets or subjects.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
