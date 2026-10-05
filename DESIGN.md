---
name: ExamForge
description: Free timed practice for Indian government exams, in English and Hindi.
colors:
  forge-navy: "#132a34"
  forge-navy-raised: "#21434e"
  forge-green: "#11765b"
  forge-green-deep: "#085b45"
  mint-signal: "#7fd6ae"
  spark-chip: "#c8f0dc"
  soft-mint: "#eaf5ef"
  focus-teal: "#289d85"
  ink: "#182532"
  muted-slate: "#616d7b"
  hairline: "#e4e9ed"
  cool-ground: "#f6f8fa"
  sheet-white: "#ffffff"
  error-red: "#b33d49"
typography:
  display:
    fontFamily: "Anek Devanagari, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 4.8vw, 3.75rem)"
    fontWeight: 650
    lineHeight: 1.04
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 94"
  headline:
    fontFamily: "Anek Devanagari, system-ui, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 630
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Anek Devanagari, system-ui, sans-serif"
    fontSize: "1.32rem"
    fontWeight: 640
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  title-featured:
    fontFamily: "Anek Devanagari, system-ui, sans-serif"
    fontSize: "clamp(1.55rem, 2.3vw, 1.95rem)"
    fontWeight: 640
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  wordmark:
    fontFamily: "Anek Devanagari, system-ui, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 650
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 92"
  fact:
    fontFamily: "Anek Devanagari, system-ui, sans-serif"
    fontSize: "1.22rem"
    fontWeight: 640
    fontFeature: "'tnum'"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  body-small:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "0.86rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "0.75rem"
    fontWeight: 650
    lineHeight: 1.2
rounded:
  tag: "5px"
  field: "6px"
  control: "7px"
  panel: "10px"
  search: "12px"
  sheet: "14px"
  pill: "999px"
spacing:
  gutter-mobile: "16px"
  card-gap: "20px"
  gutter: "24px"
  card-pad: "24px"
  section: "72px"
components:
  button-primary:
    backgroundColor: "{colors.forge-green}"
    textColor: "{colors.sheet-white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.forge-green-deep}"
  button-secondary:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
    height: "46px"
  button-small:
    rounded: "{rounded.control}"
    padding: "8px 15px"
    height: "38px"
  nav-link:
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "8px 13px"
  nav-link-active:
    backgroundColor: "{colors.soft-mint}"
    textColor: "{colors.forge-green-deep}"
  status-live:
    backgroundColor: "{colors.soft-mint}"
    textColor: "{colors.forge-green-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "5px 11px"
  status-soon:
    backgroundColor: "#eff2f5"
    textColor: "#4d5964"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "5px 11px"
  subject-chip:
    backgroundColor: "#fafcfb"
    textColor: "#2c3a46"
    rounded: "{rounded.pill}"
    padding: "6px 13px"
    height: "34px"
  family-tab:
    textColor: "#dce8eb"
    rounded: "{rounded.pill}"
    padding: "8px 15px"
    height: "40px"
  family-tab-active:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.forge-navy}"
  exam-card:
    backgroundColor: "{colors.sheet-white}"
    rounded: "{rounded.sheet}"
    padding: "{spacing.card-pad}"
  exam-card-soon:
    backgroundColor: "#fbfcfd"
    rounded: "{rounded.sheet}"
    padding: "{spacing.card-pad}"
  panel-card:
    backgroundColor: "{colors.sheet-white}"
    rounded: "{rounded.panel}"
    padding: "25px"
  search-hero:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.search}"
    padding: "0 14px 0 20px"
    height: "60px"
  input-field:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "13px 14px"
---

# Design System: ExamForge

## Overview

**Creative North Star: "The Exam Hall Noticeboard"**

ExamForge looks like a well-kept notice board in a quiet exam hall: a deep navy field that holds the one question that matters, and clean white sheets pinned against a cool grey ground, each carrying exactly the facts a candidate needs. Nothing shouts. Green appears where something can be done or has been done: start, live, saved, correct, current.

The density is practical rather than airy. Cards are white sheets with one hairline border, information is set in short facts and tabular numbers, and the test screen strips the shell back to a focus header so the question owns the page. Hindi is set in the same display family as English (Anek Devanagari carries both scripts), so bilingual text reads as one voice rather than a translation bolted on.

The system refuses the portal default of ad-dense banners over identical tile grids: the landing answers one question with a filterable shelf, and planned exams sit visibly quieter than live ones.

**Key Characteristics:**
- Navy owns large fields (hero band, auth story panel, logo tile); white sheets carry content on a cool grey ground.
- Green is meaning, not decoration: actions, live and saved state, correct answers, the current item.
- One display family, Anek Devanagari, for Latin and Devanagari display text; system UI for body.
- Hairline borders first, soft low-contrast shadows second; no hard edges or offsets.
- Live things look raised; planned things look flat and quiet.

## Colors

A two-anchor palette, deep navy and forge green, over cool near-white neutrals, with one red reserved for errors and urgency.

### Primary
- **Forge Green** (forge-green): every primary action (Start, Sign in, Explore), the live dot, positive scores, the selected answer's check, the current palette cell, the text caret, and functional icons in explanatory lists.
- **Forge Green Deep** (forge-green-deep): primary-button hover, text on mint tints (active nav, live status, active family-tab count), link hovers.

### Secondary
- **Forge Navy** (forge-navy): the hero band, the auth story panel, the logo tile, the wordmark's "Exam", card titles and facts. It is the only colour allowed to fill a full-width band.
- **Navy Raised** (forge-navy-raised): the logo tile when the mark sits on navy, so the tile stays visible.

### Tertiary
- **Mint Signal** (mint-signal): the logo tick, the wordmark's "Forge" on dark, and the focus ring inside the navy hero.
- **Spark Chip** (spark-chip): only the struck chip in the logo mark.
- **Soft Mint** (soft-mint): the tint behind active nav items and the live status pill.
- **Focus Teal** (focus-teal): the global 3px focus outline on light surfaces.

### Neutral
- **Ink** (ink): body text and headings on light surfaces.
- **Muted Slate** (muted-slate): secondary copy, metadata, fact labels. Passes AA on the ground and on white.
- **Hairline** (hairline): every card border, divider and header rule.
- **Cool Ground** (cool-ground): the page background.
- **Sheet White** (sheet-white): cards, header, footer, inputs.
- **Error Red** (error-red): wrong answers, urgent timer, negative values. Never used decoratively.

Older pages (library, results, history, test) also carry many one-off greys and pastel tints, each contrast-corrected to WCAG AA. They are local values, not tokens; new surfaces use the tokens above.

### Named Rules
**The Green Means Go Rule.** Forge green marks something actionable or a positive state (live, saved, correct, current). It is never a background field, an illustration fill, or a heading colour.

**The Brand Exception.** The wordmark's "Forge" is set in forge green (mint signal on dark), and the logo mark uses mint signal and spark chip. This is a deliberate, declared exception to the Green Means Go Rule and applies to the logo and wordmark only; it does not license green type elsewhere.

**The Navy Field Rule.** Only navy fills a full-width band. Pale tints may back a state (active nav, status pill, selected option) but never a whole section on new surfaces.

## Typography

**Display Font:** Anek Devanagari (via next/font, Latin and Devanagari subsets, variable `wdth` axis), falling back to system-ui
**Body Font:** System UI stack (-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif)

**Character:** An Indian-foundry display family set slightly condensed and tightly tracked gives headings a firm, poster-like voice, while the system body stays fast and neutral. Because the same family carries Devanagari, Hindi spans sit in the display face at matching weight.

### Hierarchy
- **Display** (650, clamp(2.3rem, 4.8vw, 3.75rem), 1.04, width 94%): the single question in the hero band. Balanced wrapping.
- **Headline** (620-630, 1.5-1.6rem, -0.015em): section heads on the landing (shelf head, practice flow).
- **Title** (640, 1.32rem, 1.15): exam card titles; the featured live card scales to clamp(1.55rem, 2.3vw, 1.95rem).
- **Fact** (640, 1.22rem, tabular figures): counts in the live card's fact list.
- **Wordmark** (650, 1.45rem, width 92%; 1.28rem under 760px): "ExamForge" beside the mark.
- **Body** (400, 16px, 1.5): running text; the hero lede is 1.07rem at 1.6 with a 58ch measure, card blurbs 0.95rem with a 62ch measure.
- **Label** (650, 0.75rem): status pills and badges, sentence case.

### Named Rules
**The One Voice, Two Scripts Rule.** Hindi display text uses the display family at weight 560 (`[lang=hi]`), never a second Devanagari face. Long Devanagari must wrap (`overflow-wrap:anywhere` on question and option text).

**The Display Face Is For Display Rule.** Anything set at display or headline size uses Anek Devanagari. Body, labels and form controls stay in the system stack.

## Layout

Content is centred in a 1240px page column with 24px gutters (16px under 760px). The global top navbar is sticky, 68px tall (60px on mobile), white with a hairline bottom rule. On the landing the navy hero band runs full width with a centred 860px column, and the exam shelf pulls up 122px so its heading sits on navy and the first card row starts on the band's lower edge.

The featured live exam spans the shelf as a two-column card (1.05fr / 1fr, 40px gap); planned exams sit in a 4-column grid on subgrid rows so titles, bodies and footers align across cards. Cards are separated by 20px. The practice-flow strip is a 3-column ordered list under a hairline rule, 72px below the shelf.

Responsive steps: the exam grid drops to 2 columns at 980px and the live card stacks; at 760px the nav collapses into a toggle menu, family tabs become a single horizontal scroll row, the grid goes to 1 column and the "/" hint disappears. Incumbent pages step at 1150px, 900px and 700px (side panels stack, palettes reflow, auth story hides). Everything must hold at 375px and 200% zoom.

## Elevation & Depth

A hybrid: hairline borders define every surface, and soft, tinted, low-contrast shadows lift only what is live or floating. Planned cards, panels and the header are flat.

### Shadow Vocabulary
- **Sheet lift** (`box-shadow: 0 1px 2px rgba(16,40,52,.05), 0 10px 26px -18px rgba(16,40,52,.35)`): live and planned-but-loaded exam cards on the landing shelf.
- **Search float** (`box-shadow: 0 14px 34px -14px rgba(0,0,0,.55)`): the hero search on navy.
- **Hover lift** (`box-shadow: 0 5px 20px #153f3010`): subject cards on hover, with a green-tinted border.
- **Dialog** (`box-shadow: 0 25px 90px #0a241d40`): the submit dialog, over a navy backdrop with a 3px blur.
- **Press hint** (`box-shadow: 0 2px 3px #073e2710`): primary buttons.

### Named Rules
**The Live Things Rise Rule.** Elevation signals availability. Coming-soon cards drop their shadow and take a slightly off-white sheet (#fbfcfd); live cards keep the sheet lift.

## Shapes

Soft, consistent rounding that grows with the object: 5px for tags and palette cells, 6px for fields, 7px for buttons and nav items, 10-11px for page panels, 12px for the hero search, 14px for landing exam cards, and full pills for status, subject chips and family tabs. The logo tile uses the same ratio (11 on 40). Borders are 1px hairlines; dashed hairlines mark something incomplete (the "+n more" chip, the coming-soon note rule).

## Components

### Buttons
Calm, solid, unmistakable.
- **Shape:** gently rounded (7px), 46px tall (38px small).
- **Primary:** forge green with white 600-weight text, 12px 20px padding, optional trailing arrow icon.
- **Hover / Focus:** background deepens to forge green deep in 150ms; focus is a 3px focus-teal outline offset 4px (mint signal inside the navy hero).
- **Secondary:** white with a pale grey border and dark slate text; hover tints green-grey.
- **Text button:** green, no chrome, underline on hover.

### Chips
- **Subject chips:** pill, near-white fill, pale green-grey border, dark text; hover turns border green and text deep green. "+n more" uses a dashed border and deep-green text.
- **Status pills:** pill, label type. Live: soft mint with deep-green text and a 7px green dot. Coming soon: cool grey with slate text.
- **Family tabs (on navy):** outlined pills with a translucent white border and a tabular count; the pressed tab turns solid white with navy text and a deep-green count.

### Cards / Containers
- **Corner Style:** 14px on landing exam cards, 10-11px on page panels.
- **Background:** sheet white; coming-soon cards #fbfcfd.
- **Shadow Strategy:** sheet lift for live cards only (see Elevation).
- **Border:** one hairline.
- **Internal Padding:** 24px (live card 30px 32px; 20px on mobile).

### Inputs / Fields
- **Style:** white, 1px pale grey border, 6px radius, 13px 14px padding; caret in forge green.
- **Hero search:** 60px tall (54px mobile), 12px radius, search float shadow, leading search icon, a "/" key hint that becomes a clear button once typed.
- **Focus:** 3px outline (focus-teal on light, mint signal on navy).

### Navigation
- **Top navbar:** mark plus wordmark at left, then Exams and My attempts, account area pushed right (guest allowance in tabular figures and a small primary Sign in, or email and a small secondary Sign out).
- **Links:** 0.92rem at 560 weight, 7px radius; hover tints grey-green; the current page takes soft mint with deep-green text.
- **Mobile:** under 760px links and account fold into a menu toggle that opens a stacked panel under the bar.
- **Test screen:** replaces the navbar with a focus header (brand, focus indicator, exit link).

### Logo
The mark is a navy rounded tile (40 unit, 11 radius) with a round-capped mint tick that strikes a small pale-green diamond chip off its tip. It appears at 34px in the navbar and 20px in the footer; on navy the tile lightens to navy raised. Favicon, apple icon and .ico are generated from the same mark.

### Exam Shelf
The landing's signature: a featured live exam (title, family and body, blurb, primary CTA, a 2x2 fact list in the display face, subject chips) above a grid of quiet coming-soon cards that are never links. Cards enter with a 320ms rise (ease-out-expo) staggered 30ms; reduced motion disables it.

## Do's and Don'ts

### Do:
- **Do** keep forge green for actions and positive state; use forge green deep for green text on tints.
- **Do** fill full-width bands with forge navy only, and switch focus rings to mint signal on navy.
- **Do** set every display and headline size in Anek Devanagari, including Hindi spans, and keep body in the system stack.
- **Do** give every card one hairline border; add the sheet lift only to live, actionable cards.
- **Do** show planned exams flat, with a "Coming soon" pill and no link.
- **Do** use tabular figures for counts, timers and scores.
- **Do** keep text at 4.5:1 or better; reuse muted slate rather than inventing lighter greys.

### Don't:
- **Don't** use green as a section background, illustration fill or heading colour; the wordmark and logo mark are the only brand exception.
- **Don't** put uppercase tracked labels (eyebrows or kickers) above headings; the heading carries its own context.
- **Don't** set display-size headings in the system font.
- **Don't** use hard or offset shadows; depth is soft and tinted toward navy.
- **Don't** make a coming-soon exam look or behave as available.
- **Don't** introduce a second display family or a separate Devanagari face.
