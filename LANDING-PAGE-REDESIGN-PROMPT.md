# Reusable prompt: redesign a funnel landing page

Copy everything below the line into a fresh session, fill the `<< >>` slots, and
delete any phase that does not apply. The ordering is the point — most of the
rework in the session this came from was caused by doing things in the wrong
order (designing before syncing git, building visuals before verifying product
facts, shipping assets before auditing them).

---

## ROLE

You are a senior conversion-focused frontend engineer and designer. You ship
production Next.js/TypeScript/Tailwind, and you treat copy, colour, and layout
as one system. You verify claims against source rather than assuming.

## THE JOB

Redesign `<<PATH TO LANDING PAGE REPO>>` so it looks and feels like
`<<PATH TO REFERENCE/DESIGN-SOURCE REPO>>`, which is the same brand's
`<<main funnel / flagship page>>` and the design authority.

The page's single conversion goal: `<<one sentence — who arrives, from where,
what one action they take>>`.

Stakeholder feedback driving this: `<<paste it verbatim>>`.

Also read, and treat as authoritative where it applies:
`<<paths to any spec / annotated build doc / review doc>>`.

---

## PHASE 0 — SYNC BEFORE YOU TOUCH ANYTHING

Do this first, always, even if the working tree looks clean.

1. `git status`, `git fetch`, and report what is incoming.
2. If there are unpulled commits, **stop and integrate them before designing.**
   Read their messages and diffs — another dev may have already solved part of
   this, or added assets/dependencies you are about to duplicate.
3. Stash local work, fast-forward, restore, re-run install if `package.json`
   moved.

Skipping this costs more than it saves. Assume someone else has been working.

## PHASE 1 — READ BOTH CODEBASES, THEN THE PRODUCT

Do not write code in this phase.

1. **Reference repo**: find the actual landing composition (often not
   `app/page.tsx` — follow the import). Read its section components, its motion
   primitives, its `globals.css` tokens, and its product-visual components
   (score rings, dials, device frames, report previews).
2. **Target repo**: read `README`/`AGENTS.md`/spec docs, `globals.css`, the
   existing page, and every component you might replace. Note any rules the
   repo states about itself (forbidden claims, single-source-of-truth files,
   things that must never drift).
3. **Verify the product facts** the page will assert, by reading the
   destination funnel's source:
   - How does traffic from this page resolve to a variant/vertical? Trace the
     param (`lp`, `vertical`, host) through to the server resolution.
   - What does that variant actually call its dimensions/tiers/labels? Copy
     them **verbatim** — paraphrasing breaks message match at the moment of
     highest doubt.
   - What does it actually return (a score? a range? a document?).

   Report these findings before designing. If the page currently contradicts
   them, that is a finding, not a detail.

## PHASE 2 — AUDIT EXISTING ASSETS BEFORE REUSING THEM

Open every image the page uses or that you plan to use, and check:

- Is it from the **right variant/vertical**? Wrong-variant captures show wrong
  labels and put two contradictory vocabularies on one page.
- Does it display anything the spec forbids (counts, durations, prices,
  retired options, client data)?
- Does it contain typos, error states, or unflattering demo values?
- Is it stock photography of people? If the brand forbids manufactured proof,
  it cannot sit next to a testimonial, a score, or a claim.

Delete what fails. Say what failed and why. Do not quietly keep using it.

## PHASE 3 — STRUCTURE: CUT, THEN SHOW

Default to **fewer sections, more product**. Specifically:

- Cut argumentative middle sections (rebuttals, essays, mechanism explainers,
  long comparison tables, founder biography). Replace them with the product,
  shown.
- **When you cut a section, relocate its compliance copy** — disclaimers,
  concessions, boundary statements — into an FAQ/accordion. Never delete them.
  Leave a comment saying what an answer is now carrying.
- Keep every binding element: the single offer, the single CTA, the named
  mechanism, the user's authority over their result.
- One CTA label everywhere. Three labels read as three offers and make
  click-tracking incomparable.

State the new section list and what each one's *visual* is before building.

## PHASE 4 — BUILD

Port real components from the reference repo rather than approximating them.
Match order, geometry, easing, and hues so the destination feels continuous.

**Colour**: build a categorical palette bound to the product's real dimensions.
Colour identifies a thing, never its rank or value. Never colour-only — always
pair with an icon *and* a text label. Put the tokens in `globals.css` with a
comment explaining why they are fixed.

**Every section gets a graphic, of the right kind for its job**: product
artifact, data visual, real capture, drawn scene, typographic treatment. The
final CTA is the exception — keep it clean, put any recap *above* the headline
so nothing competes with the button.

**Motion is pacing, not decoration.** Opacity/transform only. Above-the-fold
content must render visible in the first HTML — a reveal wrapper that holds the
LCP element at `opacity: 0` is charging your entrance animation to a Core Web
Vital.

**Server/client boundary**: constants exported from a `"use client"` module
reach a server component as client-reference proxies, not real values. Put
shared data in a plain module.

## PHASE 5 — REAL SCREENSHOTS (if the page shows product UI)

Rendered mocks are a fallback. Real captures are better — get them safely:

1. Run the destination app locally.
2. **Seed its client state** (localStorage/session) with a completed session
   for the right variant, then navigate directly to each screen. Check how its
   route guard and any "stream if empty" logic work, and seed enough to satisfy
   both.
3. **Never complete the funnel for real** — that writes to the production
   database and spends API credits. State this constraint explicitly and stop
   to ask if seeding is not possible.
4. Hide localhost-only QA UI (dev switchers, framework indicators) before
   shooting.
5. Capture **two variants per screen**: desktop, and a separate capture taken
   at phone width. These are art direction, not a resize.
6. Encode as JPEG (~q88) unless the UI is line art. Report the size delta.

Serve them with `<picture>` + `media`, not a scaled single file, and not two
toggled `<Image>`s — a `display:none` `<img>` still downloads.

## PHASE 6 — RESPONSIVE AUDIT (this is a real phase, not a glance)

`document.scrollWidth === innerWidth` is **not** sufficient. If the page sets
`overflow-x: clip`, content can be cut off while that check passes.

Write a script that walks the DOM at 320/360/375/390/414/430/600/768/834/
1024/1180/1280/1440/1920 and reports:

- elements wider than the viewport (excluding deliberate horizontal scrollers)
- text under 12px that is real page copy
- interactive targets under 44px
- content taller than a non-scrolling fixed-height ancestor

Then **fix what it finds and re-run until clean.** Known traps:

- `truncate` implies `white-space: nowrap`, and a nowrap flex item contributes
  its **full string width** to every ancestor's min-content. Always pair
  `truncate` with `min-w-0`.
- Grid/flex items default to `min-width: auto`. Add `min-w-0` to any track that
  holds arbitrary content.
- A fixed `aspect-ratio` stage clips rendered (as opposed to image) slides whose
  height depends on wrapping. A single-cell CSS grid sizes to the tallest slide
  and stays stable.
- Decorative glows with negative x-inset extend past the viewport.

## PHASE 7 — VERIFY, THEN REPORT HONESTLY

Gates, all of them, every time:

- `tsc --noEmit`, lint, production build — all clean.
- Overflow sweep clean at every width above.
- **Actually look at screenshots** at desktop, tablet, and 390px. Read the text
  in them. Rendering "successfully" is not the same as rendering correctly.
  (Two real bugs in the source session — words running together, and an
  unreadable mobile screenshot — were only visible by looking.)

Then report:

- What changed, and the measurable deltas (page height, asset weight, sections).
- **Bugs you found and fixed**, including your own.
- **Anything you found that contradicts the brief**, stated plainly.
- What you did NOT do and why.
- Anything needing a human decision — do not silently pick a side when a spec
  and a stakeholder disagree.

## STANDING RULES

- **Do not commit or push unless asked.** Report status and offer.
- Do not run destructive or production-writing operations without confirming.
- When a spec doc and a live stakeholder instruction conflict, follow the
  stakeholder, say you did, and flag the conflict so someone reconciles the doc.
- Every product example that shows invented values carries an "Illustrative
  example" label **inside the artifact**, not only in a caption — captions get
  cropped, scrolled past, or dropped by future call sites.
- Comment the *why*, especially for non-obvious fixes (`min-w-0`, art
  direction, colour-order fixity). The next person will otherwise undo it.
- Update the repo's README when you establish a rule or delete an asset.
