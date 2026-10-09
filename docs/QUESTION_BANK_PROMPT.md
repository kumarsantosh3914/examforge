# Prompt: turn previous-year PDFs into ExamForge question sets

Give everything below the line to the AI model, once per exam. Fill in the four `<<…>>` values first.
Attach or point it at the PDFs for that exam only. It writes JSON into `incoming/`; integrating that into
`cleaned/`, the importer, the catalogue and the site is a separate coding step.

---

You are preparing practice tests for ExamForge, an exam-practice website. Turn the previous-year question
papers I give you into mock-test JSON files. Accuracy matters more than quantity: a wrong answer key teaches
a candidate the wrong thing and, with negative marking, costs them marks. When in doubt, leave a question out.

## Hard rules (a batch that breaks any of these is rejected)

1. **Never reuse a question.** Each source question appears in at most one set, once. If there are not enough
   good questions for the requested sets, write fewer sets and say so. Never pad.
2. **Every set follows the section mix in Step 2**, including the subject (e.g. Computer Science) questions.
   A set made only of general sections is wrong.
3. **Image-only questions must be read, not skipped.** Many papers store question and option text as images.
   Extract them (`pdfimages -png -p paper.pdf out/`, or render the page) and read them visually. The green
   key is still in the PDF text/colours. Skip an image question only if it is unreadable or needs a figure.
4. **Use the exact JSON format in Step 4**: same field names, `options` as an `A`–`D` object, `answer` as a
   letter, `translations.hi`. Do not invent another schema.
5. **Every question needs an English and a Hindi version and an explanation in both languages.** If the paper
   gives only one language, translate it. Explanations are written by you and must agree with the official key.
6. **Use the time limit given in "This batch"**, not one you choose.

## This batch

- Exam: `<<exam name, e.g. DSSSB PGT Computer Science>>`
- Folder slug: `<<lowercase-kebab, e.g. dsssb-pgt/computer-science>>` (use `<exam>/<category>` when the exam has subjects or posts, otherwise just `<exam>`)
- Set size and time: `<<e.g. 30 questions, 10 minutes>>`
- Number of sets: `<<e.g. 5>>`

## Step 1: read the PDFs and get the official answers

These are mostly iON/TCS response sheets: each question shows "Q.n", four options (A–D or 1–4) and a tick or
cross per option. **The correct option is printed in green; wrong ones in red.** That green option is the
official key. Never answer a question from your own knowledge and call it the key.

If you can run code, use the repo's extractor, which reads the green colour directly from the PDF:

```sh
python3 -I scripts/pdf/extract.py "<paper>.pdf" /tmp/<paper>.json   # needs poppler (brew install poppler)
```

Known PDF problems:
- A white overlay hides the left side of rendered pages, so read text via the extractor, not screenshots.
- Hindi-medium papers often store questions as images: the extractor returns empty question text but still gives
  the correct answer. Read the text from the embedded images (`pdfimages -png -p paper.pdf out/` gives each
  question and option image, in order). Option images can be tiny (e.g. 30×23 px) — don't skip them.
- Hindi text in some PDFs extracts with missing matras (e.g. "न न ल खत" for "निम्नलिखित"). Never guess
  Devanagari spelling for a spelling/grammar question; read it from the page image or leave the question out.
- Section names sometimes don't extract; questions restart at Q.1 in each section, in the order printed on the paper.
- Superscripts and subscripts get detached ("cm 2", "10 seconds –12"). Fix the formatting only if you are sure
  of the original; otherwise leave the question out.

## Step 2: choose questions

For each set, mirror the real paper's section mix in proportion. Find the official pattern (sections, marks,
negative marking, duration) from the exam board's own notice or advertisement, and tell me the source URL.
Example: DSSSB TGT is 100 general (5 sections × 20) + 100 subject, so a 30-question set uses 3 from each
general section and 15 subject questions.

Leave a question out if:
- it needs a figure, diagram, table, chart or image that text cannot reproduce;
- an option is blank, or two options are identical;
- the official key looks wrong or the question is ambiguous (more than one defensible answer, e.g. "who" vs "that");
- it depends on a reading passage that you would have to include in full;
- it is time-sensitive in a misleading way ("current" office-holders) unless the question names the date;
- it duplicates a question already used in another set.

Use each source question at most once across all sets. Keep the official option order and the official answer.
You may fix obvious typos and grammar in the wording ("form" → "from", "Mcllroy" → "McIlroy") without
changing the meaning.

## Step 3: write each question in English and Hindi, with explanations

Every question needs:
- `question`: English. Put statement lists, code and data on separate lines with `\n` (they display as written;
  indent code with two spaces).
- `options`: exactly `A`–`D`, non-empty, no letters or numbers in the text ("Fungi", not "A. Fungi").
- `answer`: the official key, as `A`–`D` (convert 1→A, 2→B, 3→C, 4→D).
- `explanation`: 1–3 sentences on why the answer is right; for a calculation show the working; mention why a
  tempting wrong option is wrong when useful. Plain, correct, no filler.
- `translations.hi`: the same `question`, `options` and `explanation` in natural, standard Hindi (Devanagari).
  Keep technical terms recognisable, e.g. "पेज फ़ॉल्ट (Page fault)", "बाइनरी सर्च". Use these for statement options:
  `केवल I`, `केवल II`, `I और II दोनों`, `न तो I और न ही II`.

Special cases:
- English-language questions (grammar, vocabulary, idioms): the Hindi version translates the instruction only;
  the English sentence and options stay in English. The explanation is in Hindi.
- Hindi-language questions (sandhi, samas, spelling, muhavare): the English version gives the instruction in
  English and keeps the Hindi words in Devanagari, options unchanged. Explain in English in the English version.
- Hindi-medium source papers: the English text is your translation; the Hindi should match the paper.
- Use typographic characters: `’` `‘` `“ ”`, `−` for minus, `×`, `÷`, `²`, `₹`.

## Step 4: output files

Write UTF-8 JSON, two-space indent, trailing newline, real Devanagari (not `\u` escapes):

```
incoming/<slug>/
  meta.json
  mock-test/set-01.json … set-NN.json
```

`meta.json`:

```json
{
  "exam": "DSSSB PGT",
  "category": "Computer Science",
  "negativeMarking": 0.25,
  "negativeMarkingSource": "https://… (official notice; quote the sentence)",
  "questionsPerSet": 30,
  "durationMinutes": 10,
  "pattern": "One paragraph: sections, questions, marks, duration, from the official source.",
  "sources": [
    { "file": "DSSSB-PGT-….pdf", "date": "2021-08-01", "shift": "3", "usedInSets": [1, 2] }
  ],
  "skipped": [
    { "file": "…pdf", "section": "General Awareness", "number": 6, "reason": "Official key says 1917; Kheda Satyagraha was 1918" }
  ]
}
```

Use `"category": null` when the exam has no category level, and `"negativeMarking": null` when there is none.

Each `set-NN.json` (N zero-padded):

```json
{
  "subject": "Mock Test",
  "set": 1,
  "title": "DSSSB PGT Mock Test 1",
  "questions": [
    {
      "id": "mock-test-01-001",
      "number": 1,
      "question": "Which organism causes rust of wheat?",
      "options": { "A": "Fungi", "B": "Virus", "C": "Bacteria", "D": "Protozoa" },
      "answer": "A",
      "explanation": "Rust of wheat is a fungal disease caused by Puccinia species, which form rust-coloured pustules on the leaves and stems.",
      "source": { "file": "DSSSB-TGT-….pdf", "section": "General Awareness", "number": 2 },
      "translations": {
        "hi": {
          "question": "गेहूँ का किट्ट (रस्ट) रोग किस जीव के कारण होता है?",
          "options": { "A": "कवक", "B": "विषाणु", "C": "जीवाणु", "D": "प्रोटोज़ोआ" },
          "explanation": "गेहूँ का किट्ट (रस्ट) रोग पक्सीनिया (Puccinia) नामक कवक से होता है, जो पत्तियों और तनों पर जंग जैसे भूरे धब्बे बनाता है।"
        }
      }
    }
  ]
}
```

IDs are `mock-test-<set>-<question>` (`mock-test-01-001`), numbered 1…N in order with no gaps. Order questions
section by section in the paper's order. Keep `source` on every question; it is used to re-check keys.

## Step 5: check before you finish

For every set, confirm and report:
- exactly the agreed number of questions, IDs sequential, no source question used twice;
- every `answer` equals the green option in the PDF (re-check against the extractor output, not memory);
- every option non-empty, no two options identical, Hindi options in the same order as English;
- every explanation agrees with the answer, and its arithmetic is correct;
- the JSON parses (`python3 -m json.tool file.json`).

Finish with a short report: sets written, questions per section, how many questions you skipped and why
(counts by reason), the official pattern and negative-marking source, and anything you were unsure about.
