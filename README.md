# Coaches-Consultants

AI Merge, **Coaches and Consultants Belief Score** landing page (free-score doorway).

Built on Next.js 16 (App Router, Turbopack) with the "Marine" design system:
deep-navy ground + a single teal accent, Fraunces display + Inter UI.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
```

Copy `.env.example` to `.env.local` for the Meta Pixel and PostHog keys. Set
`NEXT_PUBLIC_SCORECARD_BASE_URL` to point the CTAs at a local funnel while
testing, and leave it unset in production, otherwise every dev click creates a
real lead in the live database.

## Structure

- `app/page.tsx`, the landing page (Blocks 01-14, per `COACH-CONSULTANT-Landing-Page.md`).
- `app/faq/`, `app/glossary/`, the answer-engine pages (see below).
- `app/layout.tsx`, fonts, metadata, global providers.
- `app/globals.css`, the Marine design tokens and component styles.
- `app/llms.txt/route.ts`, the AI-assistant summary, generated from the same data the site renders.
- `components/`, VSL player, testimonial reel, header, footer, FAQ, CTA, etc.
- `components/content-page.tsx`, the shared shell for every non-doorway route.
- `components/motion.tsx`, the editorial motion primitives (`WordReveal`,
  `LetterReveal`, `MagneticButton`, `CursorHalo`, `ParallaxImage`). All of them
  no-op on touch and under `prefers-reduced-motion`.
- `components/walkthrough.tsx`, the auto-advancing four-step product tour.
- `components/visuals/`, presentational pieces: `EditorialFigure` (photography
  with parallax, hover-zoom and a captioned rule), `DeviceFrame` (app-window
  chrome), `score-visuals.tsx` (`ScoreRing`, `PillarDial`), `report-preview.tsx`
  (page one of the report artifact) and `screens.tsx` (the four rendered
  assessment screens the walkthrough displays).
- `lib/pillars.ts`, the four scored dimensions: order, colours, icons, labels
  and the sample values. Deliberately NOT a client module, see the note below.
- `public/images/`, the atmospheric photography. `public/graphics/`, product
  captures (currently unused, see the note below).

## Single sources of truth

Several things used to be written down in two or three places and drift apart.
Each now has exactly one home. Edit the source, not the copies:

| What | Lives in | Consumed by |
|---|---|---|
| Origin, brand, contact email | `lib/site.ts` | metadata, JSON-LD, robots, sitemap, footer |
| Route paths + `lastModified` | `lib/site.ts` (`ROUTES`) | `sitemap.ts`, each page's "Last updated" line, JSON-LD `dateModified` |
| FAQ questions and answers | `lib/faq.ts` | the homepage accordion, `/faq`, the FAQPage JSON-LD, `llms.txt` |
| Term definitions | `lib/glossary.ts` | `/glossary`, the DefinedTermSet JSON-LD, `llms.txt` |
| Internal cross-links | `lib/seo.ts` (`LINKS`) | every page's "Related pages" block, the 404 |
| Canonical URL per page | `lib/seo.ts` (`pageMetadata()`) | every sub-page's `<link rel=canonical>` and og:url |
| CTA destination + attribution | `lib/scorecard.ts` | every CTA on every page |
| The four scored pillars | `lib/pillars.ts` | the pillar dials, the report preview, the walkthrough's result screen |

Bump a route's `updated` date **only** when its content actually changes: an
uncorroborated `lastmod` is a false freshness signal that Google discounts.

## Funnel

The CTA hands off to `https://www.aimerge.live/challenge/audience`, tagged
`lp=coaches-consultants` with the campaign
`COACH_CONSULT_BELIEF_SCORE_COLD_CA`. The public domain is
`https://coaches.aimerge.live`. All four values live in `lib/scorecard.ts` and
`lib/site.ts`.

UTMs, click ids (`fbclid`/`gclid`/`ttclid`/`msclkid`), the Meta `_fbp`/`_fbc`
cookies and a stable first-party `ref` are captured on first touch and forwarded
on every CTA click. First touch wins, except that a record carrying no campaign
data is upgraded by a later ad click, so an organic visit cannot permanently
unattribute the paid click that converted.

`cta_click` carries a `location`: `header`, `hero`, `early_proof`,
`recognition`, `how_it_works`, `final`, `mobile_sticky`, plus `faq_page`,
`glossary_page` and `not_found`. `score_definition` and `sample_result` were
removed with the sections they belonged to; `what_you_get` was renamed
`early_proof` per v3.0 Fix 02.

## Notes

- The free Coaches and Consultants Belief Score is the only primary offer on this page.
- The public mechanism is the **Pattern-to-Belief Map**: the repeated moment, a
  possible belief, the reinforcing loop, the moment to watch, the next evidence.
- Belief is never presented as the sole cause of a commercial outcome, AI is never
  the authority, and no client or revenue outcome is guaranteed. The page is never
  presented as a business assessment, personality test, or professional evaluation.
- **Never publish a question count or completion time.** The spec forbids both until
  measured. This is why the Block 07 interface is built in JSX rather than
  screenshotted: the original capture displayed "Question 1 · 5".
- FAQ markup must always match visible FAQ copy; generating both from `lib/faq.ts`
  is what enforces that. Do not hand-write questions into either consumer.
- New pages must go through `pageMetadata()`. A page that skips it inherits the root
  layout's `canonical: "/"` and tells Google it is the homepage.
- `llms.txt` is a route handler, not a static file. It must never also exist in
  `public/`, because `public/` is served ahead of route handlers.
- **There is no approved coach VSL yet**, so the hero renders a placeholder card.
  The previous file was the B2B healthcare cut (its poster reads "Your healthcare
  organization") and now sits unused in `public/video/placeholder/`. To restore the
  player: set `VSL_SRC`/`VSL_POSTER` in `components/vsl-player.tsx`, re-add
  `videoNode` to `extraNodes` in `app/page.tsx`, restore the poster preload, and
  delete the placeholder folder.
- The testimonial reel is general AI Merge participants, not coaches or consultants,
  and the on-page disclaimer says so. Replace with consented coach/consultant proof.
- **One CTA label, everywhere: `Get My Free Belief Score`** (v3.0 Fix 08).
  The page previously ran three different labels, which reads as three
  different offers and makes `cta_click` incomparable across placements. The
  only exception is the header pill below `sm`, which shows "Free Score"
  because the full label clips beside the wordmark at 320px; the mobile sticky
  bar carries the standardised label in full.
- **No stock photography of people, anywhere on this page.** Every human image
  must be a real participant with written consent, the real founder, or a
  clearly-staged scene shot for this brand. Licensed stock of an unnamed
  professional beside copy about someone's business struggling reads as a
  fabricated customer, and this audience checks. An atmospheric stock photo was
  removed from the recognition block for exactly this reason. IMG-03/04/05 in
  the v3.0 manifest are staged scenes to be shot alongside the ad creative for
  ads 01, 14 and 15; they belong inside the three act cards when they exist.
- **Every product example carries its "Illustrative example" label INSIDE the
  artifact**, not only in a caption beneath it. A caption is a separate element
  that can be cropped out of a screenshot, scrolled past, or dropped by a
  future call site. The label travels with the thing it labels.
- **The homepage FAQ renders `DOORWAY_FAQS` (3), not `ESSENTIAL_FAQS` (6).**
  Both the accordion and this page's FAQPage JSON-LD read the same array, so
  the markup and the visible copy cannot diverge. All six still render on
  `/faq`. The deep accordion (research, technology, privacy, professional
  boundaries) is retained in full and must not be trimmed - it is collapsed, so
  it costs no scroll, and its length is what makes the page defensible.
- **The 12-clip video wall is removed, not shrunk** (v3.0 Fix 03). It sat above
  a disclaimer conceding the speakers may not be coaches or consultants and may
  not be discussing this product. The rule is at most two clips chosen for
  relevance, or text only. `TestimonialReel` is still in the repo for when
  consented coach/consultant clips exist.
- **The page no longer maps one section per spec block.** The owners' review
  ("too much text, too much of it explaining AI Merge, nothing to look at")
  was answered by cutting the argumentative middle - the skepticism rebuttal,
  the "why now" essay, the five-stage spine, the process demonstration, the
  identity-transition section, the differentiation table and the
  reinforcing-loop diagram - and replacing it with the product, shown. Every
  BINDING element survives: one offer, one CTA, the Pattern-to-Belief Map as
  the named mechanism, the participant's authority over their result, and
  every categorical disclaimer. **Disclaimers from deleted sections were folded
  into the Essential Questions accordion, not dropped** - check what an answer
  is carrying before trimming it. The page went from ~26,000px to ~11,500px.
- **`public/graphics/*.png` are currently UNUSED, and should not be put back
  without re-capturing.** All four are captures of the wrong vertical:
  - `reportsummary.png` / `reportpdf.png` come from the main B2C funnel. They
    render "Clarity Readiness Index" and the B2C pillar names (Direction
    Clarity / Identity Alignment / Decision Readiness / Energy Alignment). The
    `coaches` vertical scores the same four keys under different names
    (Pattern Precision / Identity Distance / Evidence Readiness / Cost
    Realism), so showing these alongside the pillar section put two
    contradictory sets of pillar names on one page. Their body copy is
    consumer wellness, they show a red 18/100 badged "DEEP STUCK · COLLAPSED",
    and one carries a visible typo ("regualarly").
  - `beat.png` renders "REFLECTION 5 · 5" and a five-dot progress bar, which
    publishes a question count the spec forbids until it is measured.
  - `audience.png` offers an "Individual / Team & Organization" path choice.
    The `team` audience was retired from the funnel in July 2026.

  `components/visuals/screens.tsx` renders replacements that are on-palette and
  coach-accurate. Delete it once real `vertical=coaches` captures exist.
- **The pillar labels are not ours to reword.** `lp=coaches-consultants`
  resolves (server-side, via `VERTICAL_ALIASES`) to the funnel's `coaches`
  vertical, so the labels in `lib/pillars.ts` are the exact words a visitor's
  own report will carry. They are copied verbatim from that repo's
  `lib/vertical-display.ts`. Paraphrasing them breaks message match at the
  moment of highest doubt.
- **`lib/pillars.ts` must stay a non-client module.** Constants exported from a
  `"use client"` file cross the boundary as client-reference proxies rather
  than their real values, so a server component importing the array got
  something without a `.map`. That was a build-breaking prerender error, not a
  style preference.
- The five Map stages are colour-coded from `--field-1..5` in `globals.css`. It
  is a CATEGORICAL palette, colour identifies the stage, never its rank or
  value, and the order and assignment are fixed. Block 02's cards and Block 06's
  spine share it on purpose. Colour is never the only encoding: every use ships
  with an icon and a text label.
- The walkthrough's stage is a single-cell CSS grid, not a fixed aspect ratio.
  Its slides are rendered rather than screenshotted, so their heights depend on
  the viewport and on how the copy wraps; a fixed ratio clipped the tallest one.
  One grid cell sizes the stage to the tallest slide and then holds still, which
  keeps the crossfade from reflowing the page.
- Mobile is verified at 320 / 360 / 375 / 390 / 430px with no horizontal
  overflow (also checked at 768 / 1024 / 1280 / 1440 / 1920). Keep tap targets
  at 44px or more.
- Items marked `TODO(launch)` in the source (live assessment URL, coach-specific VSL
  and product visuals, testimonial wording and consent, patent/publication wording,
  privacy verification) must be verified and approved before going live.
