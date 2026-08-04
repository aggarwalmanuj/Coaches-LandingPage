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

`cta_click` carries a `location`: `header`, `hero`, `recognition`,
`score_definition`, `sample_result`, `how_it_works`, `final`, `mobile_sticky`,
plus `faq_page`, `glossary_page` and `not_found`.

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
- Mobile is verified at 320 / 375 / 390 / 430px with no horizontal overflow. Keep
  tap targets at 44px or more.
- Items marked `TODO(launch)` in the source (live assessment URL, coach-specific VSL
  and product visuals, testimonial wording and consent, patent/publication wording,
  privacy verification) must be verified and approved before going live.
