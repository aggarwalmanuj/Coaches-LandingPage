# Reusable prompt: beautify a funnel landing page

Copy everything below the line into a fresh session and fill the `<< >>` slots.

---

# MISSION

**Beautify this landing page. Every single section must carry real graphics and
visuals. No section is allowed to be text-only. Cut unnecessary text everywhere
to make room for them.**

That is the whole job. Everything else in this document exists to serve it.

Three tests you must be able to pass at the end:

1. **The mute test.** Scroll the finished page. If you hit any screen that is
   only words, that section is not finished.
2. **The squint test.** Squint at each section. Something visual should carry
   its meaning before you read a word.
3. **The cut test.** Every paragraph you kept should be one you could not
   replace with a picture of the thing it describes.

The target: `<<PATH TO LANDING PAGE REPO>>`

The design authority: `<<PATH TO REFERENCE / DESIGN-SOURCE REPO>>` — the same
brand's `<<flagship page / main funnel>>`. Match its look, its components, and
its palette exactly.

Single conversion goal: `<<who arrives, from where, the one action they take>>`.

Stakeholder feedback driving this: `<<paste verbatim>>`.

Docs to obey where they apply: `<<paths to spec / build doc / review doc>>`.

---

# PART 1 — THE DESIGN SYSTEM TO REPRODUCE

This is the system built for the AI Merge "Marine" pages. Reuse it as-is for a
sibling page in the same brand; adapt the values (but not the *structure*) for
a different brand.

## 1.1 Palette

**Ground and surfaces** — deep navy, one teal accent used sparingly:

```css
--background:       #0a232e;   /* page ground                     */
--card:             #103039;   /* raised surfaces                 */
--secondary:        #103642;   /* surface-2                       */
--muted-surface:    #16414f;
--border:           #204b5c;   /* hairlines                       */
--input:            #2c6b87;   /* border-strong                   */
--foreground:       #b6cdd8;   /* body copy                       */
--ink:              #eff5f8;   /* headings, primary text          */
--muted-foreground: #95b5c4;   /* eyebrows, captions              */
--accent:           #2a6b85;
--signal:           #5ec8d6;   /* THE accent — CTAs, dots, rules  */
--glow:             94 200 214; /* rgb triplet for rgba() glows   */
--shadow-ink:       2, 12, 18;
--radius:           0.75rem;
```

Reference repo's own marine values, for comparison: `--background: #0f2c3b`,
`--card: #163a4d`, `--signal: #5fc5d4`. Ours is a step darker — that matters in
§1.2.

**The categorical series palette** — the four scored dimensions. These are the
destination product's `DIMENSION_COLORS` **verbatim**, and its landing page
renders them too:

| Dimension | Graphics token | Text token (`-ink`) |
|---|---|---|
| Pattern Precision (teal) | `#1a9cba` | `#2bb3cf` |
| Identity Distance (orange) | `#d95926` | `#e8703f` |
| Evidence Readiness (violet) | `#9085e9` | `#a79ef0` |
| Cost Realism (amber) | `#c98500` | `#e0a52e` |

```css
--pillar-1: #1a9cba;  --pillar-1-ink: #2bb3cf;
--pillar-2: #d95926;  --pillar-2-ink: #e8703f;
--pillar-3: #9085e9;  --pillar-3-ink: #a79ef0;
--pillar-4: #c98500;  --pillar-4-ink: #e0a52e;
```

## 1.2 The colour rules (these are where it goes wrong)

- **Copy the source's hex values verbatim. Do not "improve" them.** If real
  captures of that product appear anywhere on your page, any drift means the
  visitor sees the same thing in two different colours within one scroll.
- Colour identifies a **thing**, never its rank or value. Order and assignment
  are **fixed**. Document why in CSS.
- **Never colour-only.** Every use ships with an icon *and* a text label.
- **Two tokens per series:**

  | Token | Used for | Contrast bar |
  |---|---|---|
  | `--pillar-N` | ring strokes, bar fills, icon glyphs, borders, tints | 3:1 (graphical object) |
  | `--pillar-N-ink` | only where a coloured *label* is genuinely the design | 4.5:1 (small text) |

- **Never set a series colour on text if you can avoid it.** Let the ring or bar
  carry the hue; put the label in a text token. A well-built source does this,
  which is why it needs no `-ink` variants at all.

  *This is the exact trap from the source session:* the series colour was set on
  a 9px over-line, it failed contrast on the darker card, and the "fix" was to
  lift all four hues — putting the palette 35–61 perceptual units away from the
  product it was supposed to match. The correct fix was to obey the text rule
  and keep the hues exact.

- **Darker ground than the reference? Do not shift the palette.** Add `-ink`
  variants for the few genuine coloured-label cases; leave graphics tokens alone.
- **Verify by resolving, not by eyeballing.** Read each token's computed
  `getPropertyValue` and the rendered `stroke`/`fill` of an actual ring, and diff
  against the source's hex. Report the table.

## 1.3 Typography

- **Display:** Fraunces — 400 upright, 300 italic for the emphasis clause,
  `opsz` axis only (every extra axis enlarges a font on the LCP critical path).
- **UI/body:** Inter 400/500/600/700.
- Base body `1.0625rem` / `1.78` — a notch above 16px, because the audience
  skews older and reading comfort is a conversion lever.

```css
.text-display  { font-size: clamp(2rem, 1.4rem + 3vw, 4.9rem);     line-height: 1.08; }
.text-headline { font-size: clamp(1.6rem, 1.25rem + 1.7vw, 2.7rem); line-height: 1.16; }
.text-title    { font-size: clamp(1.25rem, 1.05rem + 0.7vw, 1.6rem); }
.text-body-lg  { font-size: clamp(1.05rem, 0.98rem + 0.4vw, 1.2rem); }
.text-eyebrow  { font-size: 0.75rem; letter-spacing: 0.28em; text-transform: uppercase; }
.text-emphasis { font-family: serif; font-style: italic; font-weight: 300; }
```

The signature move: a statement in upright Fraunces, then the turn in
`.text-emphasis` italic. Use it in the hero, in section heads, and at the close.

**12px is the floor for real page copy.** Type below that is only allowed inside
a *simulated* product screenshot, where tiny chrome is the point.

## 1.4 Component inventory (build or port all of these)

| File | What it gives you |
|---|---|
| `components/motion.tsx` | `WordReveal`, `LetterReveal`, `MagneticButton`, `CursorHalo`, `ParallaxImage` |
| `components/visuals/device-frame.tsx` | App-window chrome: traffic lights + title chip |
| `components/visuals/score-visuals.tsx` | `ScoreRing` (animated SVG donut), `PillarDial` (ring + icon + label + reading) |
| `components/visuals/report-preview.tsx` | Page one of the result artifact: score ring, coloured dimension bars, redaction bars for prose |
| `components/visuals/scene-cards.tsx` | Small drawn scenes built from artifacts, for problem/recognition sections |
| `components/walkthrough.tsx` | Auto-advancing product tour: story-segment progress, crossfade stage, expanding step tablist |
| `lib/pillars.ts` | Series data — order, colours, text colours, icons, labels, sample values. **Not** a `"use client"` module (see §4.4) |

## 1.5 CSS utilities that create the atmosphere

```
Lighting     .ambient-field  .spotlight-hero  .page-vignette  .section-orbs
             .hero-glow  .cta-halo  .signal-halo  .cursor-halo
Imagery      .img-hover-zoom  .animate-ken-burns
Type motion  .word-rise  .letter-settle  .rise-in  .underline-draw
Structure    .hairline  .hairline-anim  .chapter / .chapter-dot  .pulse-dot
Interaction  .liftable  .row-interactive (+ .row-num, .row-mark)  .magnetic
Surfaces     .cred-chip  .device-frame  .media-frame  .btn / .btn-signal
Walkthrough  .wt-frame  .wt-stage  .wt-vignette  .wt-seg-bar/-fill/-done/-now
```

**Before writing new CSS, grep the reference for lighting/atmosphere classes
that are defined but never mounted.** In the source session an entire
three-layer ambient system sat in `globals.css` rendering nowhere — mounting it
was the single cheapest "make it lively" win available.

---

# PART 2 — GIVE EVERY SECTION A GRAPHIC

Match the visual to the section's job. This catalogue *is* the design language:

| Section job | The visual |
|---|---|
| Hero | The VSL/video or the product artifact — never a decorative abstract |
| What you receive | The **artifact itself** in app-window chrome, rendered from live tokens |
| What it measures | **Coloured dials** — ring + value + icon + over-line + plain-language reading |
| How it works | **Auto-advancing walkthrough** of real product captures, story-segment progress, expanding step list |
| Problem / recognition | **Drawn scenes** from artifacts (a form with one empty field, a document gaining attachments, an unsent draft) |
| Proof / testimonials | **Typographic cards**: oversized quote glyph at ~10% opacity, coloured top rule, coloured marker |
| Founder | The **real** portrait with halo + parallax + hover-zoom, plus an icon credential grid |
| Logos | Monochrome band, equal optical weight, non-endorsement disclaimer |
| FAQ / objections | **Reassurance cards** — icon + label + one line in the series colours, sticky beside the accordion |
| Final CTA | **No image.** A recap strip (e.g. the series chips) *above* the headline. Nothing competes with the button |

Every section also gets ambient depth: `.section-orbs` or the page-level
lighting layers, and a `.hairline-anim` rule under its head.

## Motion is pacing, not decoration

- Opacity/transform only, so it stays on the compositor.
- Word-by-word headline compose, letter-settle eyebrows, rise-in, parallax
  drift, cursor-follow halo, magnetic CTA, hover-zoom on imagery.
- **Above-the-fold content renders visible in the first HTML.** A reveal wrapper
  holding the LCP element at `opacity: 0` charges your entrance animation to a
  Core Web Vital.
- Anything auto-advancing needs a pause control, pauses on hover/focus, and
  starts paused under `prefers-reduced-motion` and on touch.

---

# PART 3 — CUT TEXT TO MAKE ROOM

Cutting prose is how you earn the space the graphics need. Be aggressive.

- Cut argumentative middles: rebuttals, essays, mechanism explainers, long
  comparison tables, founder biography.
- Replace description with demonstration. If a paragraph explains what the
  product returns, delete it and show the artifact.
- **When you cut a section, relocate its compliance copy** — disclaimers,
  concessions, boundary statements — into an FAQ/accordion. Never delete it.
  Comment what each answer now carries.
- Keep every binding element: single offer, single CTA, the named mechanism,
  the user's authority over their result.
- One CTA label everywhere. Three labels read as three offers and make
  click-tracking incomparable.

**Before building, deliver the new section list with one line per section naming
what its visual is.** If you cannot name the visual, that section is not
designed yet.

---

# PART 4 — ORDER OF WORK

Most rework comes from doing these out of order.

## 4.1 Sync first

`git status`, `git fetch`, report what is incoming. **Integrate unpulled commits
before designing** — another dev may have solved part of this, or added assets
and dependencies you are about to duplicate. Stash, fast-forward, restore,
re-install if `package.json` moved.

## 4.2 Read both codebases, then verify the product

No code yet.

1. **Reference repo** — find the real landing composition (often *not*
   `app/page.tsx`; follow the import). Catalogue its section components, motion
   primitives, tokens, and especially its **product-visual components**.
2. **Target repo** — read `README`/`AGENTS.md`/specs, `globals.css`, the current
   page. Write down every rule the repo states about itself. You will be held to
   these.
3. **Verify the facts the page asserts** against the destination's source: how
   traffic resolves to a variant, what that variant calls its dimensions (copy
   **verbatim**), and what it actually returns. Report before designing.

## 4.3 Audit existing assets before reusing them

Open every image. Check: right variant? forbidden content (counts, durations,
prices, retired options, client data)? typos or unflattering demo values? stock
photography of people where the brand forbids manufactured proof? Delete what
fails and say why.

## 4.4 Build — engineering notes that bite

- Constants exported from a `"use client"` module reach a server component as
  client-reference **proxies**, not real values. Put shared data in a plain
  module or the build fails at prerender.
- A fixed `aspect-ratio` stage clips *rendered* slides whose height depends on
  wrapping. A single-cell CSS grid (`grid-area: 1/1` on all children) sizes to
  the tallest slide and stays stable.

## 4.5 Real screenshots beat rendered mocks

1. Run the destination app locally.
2. **Seed its client state** (localStorage/session) with a completed session for
   the right variant, then navigate straight to each screen. Inspect its route
   guard *and* any "stream if empty" logic; seed enough to satisfy both.
3. **Never complete the funnel for real** — that writes to the production
   database and spends API credits. Say so; stop and ask if seeding is
   impossible.
4. Hide localhost-only QA UI (dev switchers, framework indicators).
5. Capture **two variants per screen**: desktop, and a separate capture at phone
   width. Art direction, not a resize.
6. JPEG ~q88 unless it is line art. Report the size delta.

Serve with `<picture>` + `media`. Not a scaled single file, and not two toggled
`<Image>`s — a `display:none` `<img>` still downloads.

## 4.6 Responsive audit — a real phase, not a glance

`document.scrollWidth === innerWidth` is **not sufficient**. With
`overflow-x: clip`, content can be cut off while that check passes.

Script a DOM walk at 320/360/375/390/414/430/600/768/834/1024/1180/1280/1440/
1920 reporting: elements wider than the viewport, real page copy under 12px,
interactive targets under 44px, content taller than a non-scrolling ancestor.
Fix and re-run until clean.

Known traps:

- **`truncate` implies `white-space: nowrap`, and a nowrap flex item contributes
  its full string width to every ancestor's min-content.** Always pair
  `truncate` with `min-w-0`. This made a heading render 409px wide on a 320px
  screen while every automated check said "clean".
- Grid/flex items default to `min-width: auto` — add `min-w-0` to any track
  holding arbitrary content.
- Decorative glows with a negative x-inset extend past the viewport.

## 4.7 Verify, then report honestly

Gates every time: `tsc --noEmit`, lint, production build, overflow sweep clean at
every width.

Then **actually look at screenshots** at desktop, tablet, and 390px, and read the
text in them. Rendering "successfully" is not rendering correctly — words running
together in a hero and an unreadable mobile screenshot both passed every
automated gate in the source session and were visible only by looking.

Report: what changed with measurable deltas (page height, asset weight, section
count); bugs found and fixed **including your own**; anything contradicting the
brief; what you did not do and why; anything needing a human decision.

---

# DEFINITION OF DONE

- [ ] **Every section has a graphic appropriate to its job. None is text-only.**
- [ ] Unnecessary prose is gone; report the page-height delta.
- [ ] The series palette matches the destination product's hex values exactly,
      verified by computed value, and always ships with an icon and a label.
- [ ] The product artifact appears at least twice — static, and in motion.
- [ ] Real captures, in desktop and phone art directions.
- [ ] Ambient/atmosphere layers are actually mounted, not just defined.
- [ ] The close has a recap graphic above the headline, nothing beside the button.
- [ ] Reviewed by eye at 390px, 768px, and 1440px.

# STANDING RULES

- **Do not commit or push unless asked.** Report status and offer.
- No destructive or production-writing operations without confirming.
- When a spec doc and a live stakeholder instruction conflict, follow the
  stakeholder, say so, and flag it so someone reconciles the doc.
- Every product example showing invented values carries an "Illustrative
  example" label **inside the artifact**, not only in a caption — captions get
  cropped, scrolled past, and dropped by future call sites.
- Comment the *why* for non-obvious fixes (`min-w-0`, art direction, colour
  fixity). The next person will otherwise undo them.
- Update the README when you establish a rule or delete an asset.
