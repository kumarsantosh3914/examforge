"""Extract questions and answer keys from iON-style response-sheet PDFs (DSSSB, SSC, etc.).

Usage: python3 -I scripts/pdf/extract.py <paper.pdf> <out.json>
Needs poppler's `pdftohtml` on PATH (brew install poppler).

The response sheet prints the correct option in green and the others in red;
`pdftohtml -xml` exposes each text run's colour, so the key is read from the PDF
itself rather than guessed. Options may be labelled A–D or 1–4 (1–4 become A–D).
Output: a JSON list of {section, number, page, question, options, answer, figures}.
`answer` is null when exactly one green option could not be found.
Questions stored as images (common in Hindi-medium papers) come out with empty text;
read those from the page images instead (`pdfimages -png -p`).
Hindi in some papers extracts with broken matras; check Devanagari against the page.
"""
import html, json, re, subprocess, sys, tempfile
import xml.etree.ElementTree as ET
from collections import Counter
from pathlib import Path

GREENS = {'#40c64a', '#40c54a'}
REDS = {'#f61717', '#ff0000'}

def main(pdf: str, out: str) -> None:
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(['pdftohtml', '-xml', '-q', '-nodrm', pdf, f'{tmp}/doc'], check=True)
        root = ET.parse(f'{tmp}/doc.xml').getroot()
    colours = {f.get('id'): f.get('color', '').lower() for f in root.iter('fontspec')}
    questions, section, q, opt = [], None, None, None
    for page in root.iter('page'):
        items = sorted((el for el in page if el.tag in ('text', 'image')), key=lambda e: (int(e.get('top')), int(e.get('left'))))
        for el in items:
            if el.tag == 'image':
                w, h = int(el.get('width')), int(el.get('height'))
                if q and 30 < w < 700 and 30 < h < 600: q['figures'] += 1
                continue
            text = html.unescape(''.join(el.itertext())).strip()
            if not text: continue
            colour = colours.get(el.get('font'))
            if text.startswith('Section') and ':' in text:
                section = text.split(':', 1)[1].strip() or section; continue
            if re.match(r'^(Question ID|Option \d ID)', text):
                if text.startswith('Question ID') and q: questions.append(q); q, opt = None, None
                continue
            m = re.match(r'^Q\.(\d+)\s*(.*)$', text, re.S)
            if m:
                q = {'section': section, 'number': int(m.group(1)), 'page': int(page.get('number')), 'question': m.group(2), 'options': {}, 'colours': {}, 'figures': 0}
                opt = None; continue
            if not q or text == 'Ans': continue
            if text.startswith('Ans '): text = text[4:].strip()
            m = re.match(r'^([A-D1-4])\.\s*(.*)$', text, re.S)
            if m and colour in GREENS | REDS:
                key = 'ABCD'['1234'.index(m.group(1))] if m.group(1).isdigit() else m.group(1)
                if key not in q['options']:
                    opt = key; q['options'][key] = m.group(2); q['colours'][key] = colour; continue
            if opt: q['options'][opt] = (q['options'][opt] + ' ' + text).strip()
            else: q['question'] += '\n' + text
    for q in questions:
        green = [k for k, c in q.pop('colours').items() if c in GREENS]
        q['answer'] = green[0] if len(green) == 1 else None
        q['question'] = q['question'].strip()
    Path(out).write_text(json.dumps(questions, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(len(questions), 'questions;', sum(1 for q in questions if q['answer']), 'with exactly one green option')
    print(dict(Counter(q['section'] for q in questions)))

if __name__ == '__main__':
    main(*sys.argv[1:3])
