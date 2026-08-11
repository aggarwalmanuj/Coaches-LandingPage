import Image from "next/image";
import Link from "next/link";
import ReactDOM from "react-dom";
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  Building2,
  CreditCard,
  Eye,
  FileText,
  Compass,
  MessageSquareQuote,
  RefreshCw,
  Repeat,
  Sparkles,
} from "lucide-react";
import { FaqItem } from "@/components/faq-item";
import { LandingAnalytics } from "@/components/landing-analytics";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { Reveal } from "@/components/reveal";
import { ScorecardCta } from "@/components/scorecard-cta";
import { SectionViewTracker } from "@/components/section-view-tracker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  PageStructuredData,
  howToNode,
  publicationNode,
  videoNode,
} from "@/components/structured-data";
import { VslPlayer } from "@/components/vsl-player";
import { Walkthrough } from "@/components/walkthrough";
import { LetterReveal, MagneticButton, WordReveal } from "@/components/motion";
import { DeviceFrame } from "@/components/visuals/device-frame";
import { ReportPreviewCard } from "@/components/visuals/report-preview";
import { RECOGNITION_SCENES } from "@/components/visuals/scene-cards";
import { PillarDial } from "@/components/visuals/score-visuals";
import {
  PILLAR_COLORS,
  PILLAR_ICONS,
  PILLAR_LABELS,
  PILLAR_ORDER,
  PILLAR_TEXT_COLORS,
  SAMPLE_SUBSCORES,
} from "@/lib/pillars";
import type { CtaLocation } from "@/lib/analytics";
import { DOORWAY_FAQS, toFaqEntries } from "@/lib/faq";
import { LINKS } from "@/lib/seo";
import { ROUTES } from "@/lib/site";

/* ==========================================================================
   AI Merge, Coaches and Consultants Belief Score doorway page.

   Marine design system: deep navy ground, one teal accent, and the FOUR
   pillar colours the assessment itself scores with. Fraunces display + Inter,
   ambient lighting, VSL player.

   ---------------------------------------------------------------------------
   STRUCTURE NOTE - read this before adding a section back.

   Earlier revisions rendered the spec's Blocks 01-14 one-to-one, which put
   thirteen argument sections and several thousand words on a doorway page
   whose only job is one free assessment. The owners' review was blunt: too
   much text, too much of it explaining AI Merge rather than the score, and
   too little to actually look at.

   So this page no longer maps one section per spec block. It keeps every
   BINDING element - the single offer, the single CTA, the Pattern-to-Belief
   Map as the named mechanism, the participant's authority over their own
   result, and every categorical disclaimer (consolidated into the Essential
   Questions accordion) - and drops the argumentative middle: the skepticism
   rebuttal, the "why now" essay, the five-stage spine, the process
   demonstration, the identity-transition section, and the ten-row
   differentiation table. The reinforcing-loop diagram is gone as well.

   What replaced them is the product, shown: the report artifact, the four
   scored pillars in their own colours, and a walkthrough of every screen a
   visitor will see. Show-don't-tell is also, conveniently, far fewer words.

   Register (unchanged, all still binding):
   - The free "Coaches and Consultants Belief Score" is the ONLY primary offer.
     Its public mechanism is the "Pattern-to-Belief Map." One CTA everywhere.
   - ONE dominant commercial pattern carries the page: creating more value when
     the business needs a direct invitation.
   - Belief is never presented as the sole cause of a commercial outcome.
   - AI is supporting technology, not the authority. The participant decides
     what fits.
   - Not a business assessment, personality test, or professional evaluation.
   - No urgency, no scarcity, no guaranteed client or revenue outcome.
   - Question count and completion time are NOT published (the spec forbids
     both until measured). No capture of the question screen appears anywhere,
     because that screen renders a question counter.
   - "TODO(launch)" markers keep the spec's verification-register items as
     honest placeholders rather than invented specifics.
========================================================================== */

/* Prior professional work behind AI Merge: pedigree, not endorsement (the
   disclaimer under the row says so). Verify approved monochrome assets. */
const TRUST_LOGOS = [
  { src: "/logos/ibm.png", alt: "IBM" },
  { src: "/logos/microsoft.png", alt: "Microsoft" },
  { src: "/logos/tmobile.png", alt: "T-Mobile" },
  { src: "/logos/pearson.png", alt: "Pearson" },
  { src: "/logos/un.png", alt: "United Nations" },
];

const HERO_CRED_CHIPS = [
  "Four patents held by the creator",
  "Published in the Mensa Research Journal",
  "Founder & CIO, TetraNoodle Technologies",
];

/* The five fields a Pattern-to-Belief Map produces: the WRITTEN half of the
   result, as distinct from the four scored pillars. Both are real and they are
   not the same thing, so the page gives them two different visual systems -
   the pillars own the colour, these ride on the single accent.

   v3.0 replaced the DEFINITIONS here with a WORKED EXAMPLE, verbatim from the
   spec's illustrative card. A definition ("what that repeated experience may
   have taught you to conclude") describes the field; the example ("Helping
   preserves trust. Selling risks damaging it.") lets a reader recognise
   themselves in it, which is the only thing that makes a free assessment feel
   worth ten minutes. It is labelled illustrative wherever it renders, and the
   line beneath says the reader's own result is built from their words. */
const MAP_FIELDS = [
  {
    title: "The repeated moment",
    body: "When a client is ready for a clear recommendation, more value is added instead of naming the next step.",
  },
  {
    title: "A possible belief",
    body: "“Helping preserves trust. Selling risks damaging it.”",
  },
  {
    title: "The reinforcing loop",
    body: "More value added → next step unclear → prospect delays → pipeline weakens → selling feels heavier.",
  },
  {
    title: "The moment to watch",
    body: "The urge to add more before stating the recommendation.",
  },
  {
    title: "The next evidence",
    body: "One conversation ended with a clear recommendation and a decision point.",
  },
];

const MAP_FIELD_ICONS = [Repeat, MessageSquareQuote, RefreshCw, Eye, ArrowUpRight];

/* The dominant pattern, told as three stages. This is the ONE recognition
   sequence the page keeps: creating more value when the business needs a
   direct invitation. */
const RECOGNITION_ACTS = [
  {
    label: "The work is valuable",
    lead: "The discovery call went well. They can see the transformation. The next step is available.",
    body: "The client results are real. The framework has depth. The proposal is nearly ready. Then something changes.",
  },
  {
    label: "One more pass",
    lead: "“It needs one more pass.” Or: “I should give them more context first.” Or: “I don’t want this to feel salesy.”",
    body: "One more clarification seems necessary. One more resource would make the offer stronger. One more custom element could show how much you care.",
  },
  {
    label: "The cycle stays open",
    lead: "So you return to the place where you already feel capable. You help. You teach. You customize.",
    body: "The work stays alive. But the commercial cycle stays incomplete: the recommendation softens, the next step goes vague, the proposal waits.",
  },
];

/* The possible beliefs underneath the pattern. The spec's verbatim
   quotations, always framed as "may sound like".

   v3.0 cut these from four to two. Past the second quote the section was
   restating rather than building, and a reader who recognises themselves does
   it on the first or second line - the third and fourth only add scroll. */
const POSSIBLE_BELIEFS = [
  "Helping preserves trust. Selling risks damaging it.",
  "Receiving more requires giving more first.",
];

/* TODO(launch): verify exact approved wording for title, patents, and
   publication before this ships. */
const CREDENTIALS = [
  { label: "Role", value: "Founder & CIO, TetraNoodle Technologies" },
  { label: "Patents", value: "Four, in human-AI decision systems" },
  { label: "Published", value: "Mensa Research Journal" },
  { label: "Built", value: "The AI Merge methodology" },
];

const CREDENTIAL_ICONS = [Building2, Award, FileText, Sparkles];

/* The four things a visitor is actually agreeing to, stated once beside the
   accordion. This exists because the Essential Questions block was the one
   section on the page with nothing to look at: a column of collapsed rows
   reads as fine print, and fine print next to a CTA is where hesitation
   collects. Each row is a fact already stated in approved copy - the card
   restates them where the doubt is, with the pillar palette carrying the
   colour so the section belongs to the same system as the score. */
const REASSURANCES = [
  {
    Icon: BadgeCheck,
    label: "The complete score is free",
    body: "You receive the full result before any optional paid step is mentioned.",
    color: "var(--pillar-1)",
  },
  {
    Icon: CreditCard,
    label: "No credit card",
    body: "Nothing to enter, nothing to cancel.",
    color: "var(--pillar-2)",
  },
  {
    Icon: FileText,
    label: "Yours to keep",
    body: "Your score and your Pattern-to-Belief Map are sent to you.",
    color: "var(--pillar-3)",
  },
  {
    Icon: Compass,
    label: "Reflective, not diagnostic",
    body: "A hypothesis to check against your own judgment. Not an evaluation of you.",
    color: "var(--pillar-4)",
  },
];

/* TODO(launch): verify exact wording, name or approved anonymity,
   professional role, program referenced, written consent, and display
   restrictions for each statement below. */
const TESTIMONIALS = [
  {
    quote: "There's a stress part of my brain that has gone silent.",
    name: "Nick H.",
    role: "Video Producer",
  },
  {
    quote:
      "It shifted something within. It's something I'm going to be reading over and over again.",
    name: "Oliver",
    role: "Real Estate",
  },
];

/* Zone A microcopy. The words under every primary CTA carry the artifact spec
   (free, personalized, no card, reflective), never a caveat. The categorical
   disclaimers live in the Essential Questions accordion. */
const CTA_MICROCOPY =
  "Free · Personalized · No credit card · Reflective, not diagnostic";

/* v3.0 Fix 08: ONE label, everywhere, including the mobile sticky bar. The
   page previously ran three different labels ("Get Your Free Coaches and
   Consultants Belief Score", a shortened phone variant, and "Start step one"),
   which reads as three different offers and makes cta_click impossible to
   compare across placements. There is no long/short split any more: at eight
   words the label wraps to three lines at 320px and stays legible. */
const CTA_LABEL = "Get My Free Belief Score";

/** Section chapter mark. The roman numeral is the page's editorial signature
 *  and it orients a visitor who arrives mid-page from an ad. Decorative to
 *  assistive tech, since the heading beneath carries the meaning. */
function ChapterMark({
  numeral,
  children,
  animate = false,
  className = "",
}: {
  numeral?: string;
  children: string;
  animate?: boolean;
  className?: string;
}) {
  return (
    <p className={`chapter text-eyebrow ${className}`}>
      <span className="chapter-dot" aria-hidden />
      {numeral && (
        <span className="text-faint" aria-hidden>
          {numeral} ·
        </span>
      )}
      <span>{animate ? <LetterReveal text={children} /> : children}</span>
    </p>
  );
}

/** Primary CTA + the reassurance line beneath it. */
function CtaBlock({
  location,
  microcopy = CTA_MICROCOPY,
  align = "center",
  className = "",
}: {
  location: CtaLocation;
  microcopy?: string;
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === "center" ? "items-center" : "items-start"
      } ${className}`}
    >
      {/* Two nested wrappers, each with one job. MagneticButton owns the
          transform that pulls the pill toward the cursor; .cta-halo owns the
          light behind it. They cannot be merged: the halo is a z-index:-1
          pseudo-element, and a transform on the same element would make it a
          stacking context, flipping the halo to paint ON TOP of the button
          and washing its face teal. */}
      <MagneticButton className="w-full sm:w-auto">
        <span className="cta-halo w-full sm:w-auto">
          <ScorecardCta
            variant="signal"
            size="lg"
            location={location}
            className="w-full min-h-11 sm:w-auto"
          >
            {CTA_LABEL}
          </ScorecardCta>
        </span>
      </MagneticButton>
      <p
        className={`text-sm text-faint ${align === "center" ? "text-center" : ""}`}
      >
        {microcopy}
      </p>
    </div>
  );
}

export default function Home() {
  // LCP preload. The hero video's poster frame is the largest element in the
  // initial viewport on desktop, but a `poster` attribute is only discovered
  // once the <video> is parsed, and browsers fetch posters at low priority, so
  // it loses the race to assets that matter less.
  //
  // ReactDOM.preload rather than a literal <link rel="preload">: React hoists a
  // rendered <link> into <head> but ALSO emits its own hint for it, shipping
  // the same preload twice. This emits exactly one. It is NOT `priority` on a
  // next/image, because a <video> poster never passes through that pipeline.
  ReactDOM.preload("/video/vsl-coaches-poster.jpg", {
    as: "image",
    fetchPriority: "high",
  });

  return (
    <>
      <SiteHeader />
      {/* FAQ, video, HowTo and publication JSON-LD: homepage only, because only
          this page renders the Essential Questions accordion, the VSL, and the
          four-step process they describe. The FAQ entities are generated from
          the same lib/faq.ts array the accordion below renders, so the markup
          and the visible copy cannot drift apart.

          howToNode's four steps ARE the walkthrough's four steps. Edit one and
          you must edit the other, or the page and its structured data will
          describe two different products. */}
      <PageStructuredData
        name="Free Coaches and Consultants Belief Score"
        path={ROUTES.home.path}
        description="See the belief that may be shaping one repeated commercial moment, built from your own words. Free, personalized, and reflective rather than diagnostic."
        updated={ROUTES.home.updated}
        faqs={toFaqEntries(DOORWAY_FAQS)}
        speakableSelectors={["#hero-headline", "#what-you-receive"]}
        extraNodes={[videoNode, howToNode, publicationNode]}
      />
      <LandingAnalytics />
      <main id="main" className="relative flex-1">
        {/* The ambient lighting layers. globals.css defines a three-part system
            - a document-anchored field, a hero spotlight, and a
            viewport-anchored vignette plus key light. Each is decorative,
            pointer-events-none and painted at z-index -1, so none of it can
            intercept a click or shift a pixel of layout. */}
        <div className="ambient-field" aria-hidden />
        <div className="page-vignette" aria-hidden />

        {/* ===================== Hero =====================
            Spec order: eyebrow, headline, VSL, CTA, trust line, credibility
            line. NO supporting paragraph between headline, VSL, and CTA. */}
        <section id="hero" className="relative overflow-hidden">
          <div className="spotlight-hero" aria-hidden />

          {/* Everything above the fold uses `immediate`, so it renders visible
              in the first HTML and animates via CSS instead of waiting for an
              IntersectionObserver. <Reveal> holds children at opacity 0 until
              hydration, which would both blank the headline for its entire
              word-by-word compose AND charge that animation to LCP, since a
              transparent element does not count as painted. */}
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-5 pb-10 pt-12 text-center sm:px-8 sm:pt-16">
            <Reveal immediate>
              <p className="cred-chip">
                <span className="pulse-dot" aria-hidden />
                AI Merge · Free Coaches and Consultants Belief Score
              </p>
            </Reveal>
            <Reveal immediate>
              {/* v3.0 Fix 07: H1 and subhead are SEPARATE elements.
                  Previously both clauses sat inside one run-on <h1>, which
                  gave the page a 21-word heading - bad for the skim test, bad
                  for the SERP snippet, and it flattened the turn between the
                  statement and the question into a font-style change.

                  This supersedes v2.1's "DO NOT ADD a supporting paragraph
                  between headline, VSL and CTA": v3.0 specifies the subhead
                  explicitly. It is the second half of one sentence, not new
                  supporting copy, so the fold still carries exactly one idea. */}
              <h1 id="hero-headline" className="text-display mt-8">
                <WordReveal
                  step={70}
                  segments={[
                    {
                      kind: "text",
                      text: "Coaches and consultants: you know how to create value.",
                    },
                  ]}
                />
              </h1>
            </Reveal>
            <Reveal immediate>
              {/* Delayed past the H1's last word (9 words x 70ms + 300ms) so
                  the two clauses arrive in reading order rather than racing. */}
              <p
                className="text-emphasis rise-in mt-5 max-w-2xl text-2xl leading-snug sm:text-3xl"
                style={{ "--rise-delay": "930ms" } as React.CSSProperties}
              >
                But what belief decides whether that value gets sold, received,
                and scaled?
              </p>
            </Reveal>
          </div>

          <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
            <Reveal immediate>
              <VslPlayer />
            </Reveal>
            <Reveal delay={220}>
              {/* Hero CTA shows the full label at every breakpoint; the button
                  wraps to two lines on narrow screens rather than shortening. */}
              <CtaBlock location="hero" className="mt-8" />
            </Reveal>
          </div>

          <Reveal delay={320}>
            <ul className="mx-auto mt-10 flex w-full max-w-4xl list-none flex-wrap items-center justify-center gap-3 px-5 pb-16 sm:px-8">
              {HERO_CRED_CHIPS.map((chip) => (
                <li key={chip} className="cred-chip">
                  {chip}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* =============== I · What you receive ===============
            The artifact, shown. This is the section the page turns on: a
            stranger ten seconds in has to be able to say what they physically
            get. Spec column left, product right. */}
        <section className="relative overflow-hidden border-y border-line bg-surface">
          <div className="section-orbs" aria-hidden />
          <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
            <SectionViewTracker event="whatyouget_view" />

            {/* `min-w-0` on both items. Grid items default to `min-width:
                auto`, which means ANY unshrinkable descendant (a nowrap label,
                a long token, a fixed-width control) silently widens the track
                past the container instead of wrapping. Below `lg` this is a
                single column, so one such descendant blows out the whole
                section on a phone. This is the second line of defence; the
                first is not creating unshrinkable descendants. */}
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="min-w-0">
                <Reveal>
                  <ChapterMark numeral="I">What you receive</ChapterMark>
                </Reveal>
                <Reveal delay={60}>
                  <h2 className="text-headline mt-5">
                    A personalized Pattern-to-Belief Map,{" "}
                    <span className="text-emphasis">
                      built from your own words.
                    </span>
                  </h2>
                </Reveal>
                <Reveal delay={100}>
                  <p
                    id="what-you-receive"
                    className="text-body-lg mt-6 text-muted"
                  >
                    You describe one recurring commercial moment. Your Map comes
                    back with five things in it:
                  </p>
                </Reveal>

                {/* The five written fields, as a WORKED EXAMPLE rather than as
                    definitions - see the note on MAP_FIELDS. Compact rows, not
                    cards: the four PILLARS below are the section that earns
                    colour and space, and two competing card grids would flatten
                    both.

                    The "Illustrative" chip is not decoration. Spec rule: every
                    product example must be labelled where it is READ, not only
                    in a caption someone may scroll past. */}
                <Reveal delay={130}>
                  <p className="mt-6">
                    {/* 11px, not 10px: this is a compliance label sitting in
                        the page's own reading column, not chrome inside the
                        mock, so it has to survive being read on a phone. */}
                    <span className="rounded-full border border-line px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-faint">
                      Illustrative example
                    </span>
                  </p>
                </Reveal>
                <ul className="mt-4 grid list-none gap-4">
                  {MAP_FIELDS.map((field, i) => {
                    const Icon = MAP_FIELD_ICONS[i];
                    return (
                      <Reveal as="li" key={field.title} delay={140 + i * 40}>
                        <div className="flex items-start gap-3.5">
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-signal">
                            <Icon
                              className="h-4 w-4"
                              strokeWidth={1.75}
                              aria-hidden
                            />
                          </span>
                          <p className="min-w-0">
                            <span className="font-medium text-fg">
                              {field.title}
                            </span>
                            <span className="text-muted"> — {field.body}</span>
                          </p>
                        </div>
                      </Reveal>
                    );
                  })}
                </ul>

                <Reveal delay={330}>
                  <p className="mt-6 text-sm text-faint">
                    Your result is built from your words, not this one.
                  </p>
                </Reveal>

                <Reveal delay={340}>
                  <CtaBlock
                    location="early_proof"
                    align="start"
                    microcopy="Free · No credit card · Yours to keep"
                    className="mt-10"
                  />
                </Reveal>
              </div>

              {/* The artifact itself, inside app-window chrome. Rendered rather
                  than screenshotted so it cannot drift from the palette and
                  cannot leak a fact the spec forbids publishing. Its numbers
                  are illustrative and the caption says so directly beneath. */}
              <Reveal delay={140} className="min-w-0">
                <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                  <DeviceFrame title="your-belief-score">
                    <ReportPreviewCard />
                  </DeviceFrame>
                  <p className="mt-3 text-center text-[11px] uppercase tracking-[0.18em] text-faint">
                    Illustrative example · yours is built from your own words
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* =============== II · The four pillars ===============
            The colour system, and the answer to "what does the number actually
            measure?". These four are the assessment's real scored dimensions,
            in the funnel's own order, with its own labels and hues. */}
        <section className="relative overflow-hidden">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
            <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div>
                <Reveal>
                  <ChapterMark numeral="II">Scored across four</ChapterMark>
                </Reveal>
                <Reveal delay={60}>
                  <h2 className="text-headline mt-5">
                    One number, and the four things underneath it
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={100}>
                <p className="text-body-lg text-muted lg:pb-2">
                  The overall score says how much room there is to move on this
                  one pattern. The four pillars say where.
                </p>
              </Reveal>
            </div>

            <Reveal delay={140}>
              <div className="hairline-anim hairline my-12 sm:my-14" />
            </Reveal>

            {/* Each dial carries an icon, an over-line, a label, a value, and a
                plain-language reading. Colour is the fifth encoding, never the
                only one. */}
            <ul className="grid list-none gap-5 sm:grid-cols-2">
              {PILLAR_ORDER.map((key, i) => (
                <Reveal as="li" key={key} delay={i * 80}>
                  <PillarDial
                    dimension={key}
                    value={SAMPLE_SUBSCORES[key]}
                  />
                </Reveal>
              ))}
            </ul>

            <Reveal delay={200}>
              <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-faint">
                Illustrative values. A lower number means more room to move on
                this pattern. It is not a grade, and it does not rate your
                expertise, your methodology, your pricing, or your professional
                judgment.
              </p>
            </Reveal>
          </div>
        </section>

        {/* =============== III · The walkthrough ===============
            Every screen, before they commit to any of them. */}
        <section
          id="walkthrough"
          className="relative overflow-hidden border-y border-line bg-surface"
          aria-labelledby="walkthrough-heading"
        >
          <div className="section-orbs" aria-hidden />
          <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
            <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div>
                <Reveal>
                  <ChapterMark numeral="III">The walkthrough</ChapterMark>
                </Reveal>
                <Reveal delay={60}>
                  <h2 id="walkthrough-heading" className="text-headline mt-5">
                    See the whole thing{" "}
                    <span className="text-emphasis">before you begin.</span>
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={100}>
                <p className="text-body-lg text-muted lg:pb-2">
                  Every screen, start to finish, so you know exactly what you
                  are walking into and what you walk away with.
                </p>
              </Reveal>
            </div>

            <Reveal delay={140}>
              <div className="hairline-anim hairline my-12 sm:my-14" />
            </Reveal>

            <Reveal delay={150}>
              <Walkthrough />
            </Reveal>
          </div>
        </section>

        {/* =============== IV · Sound familiar ===============
            The one recognition sequence the page keeps: three acts, the moment
            itself, and the beliefs that may sit underneath it. */}
        <section className="relative overflow-hidden">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
            <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
              <div>
                <Reveal>
                  <ChapterMark numeral="IV">Sound familiar</ChapterMark>
                </Reveal>
                <Reveal delay={60}>
                  <h2 className="text-headline mt-5">
                    The coaching is good. The consulting works. The client
                    results are real.
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={100}>
                <p className="text-body-lg text-muted lg:pb-2">
                  Watch one familiar moment turn back into more teaching, the
                  same way it does every time.
                </p>
              </Reveal>
            </div>

            <ol className="mt-14 grid list-none gap-4 md:grid-cols-3 md:gap-5">
              {RECOGNITION_ACTS.map((act, i) => {
                const Scene = RECOGNITION_SCENES[i];
                return (
                <Reveal
                  as="li"
                  key={act.label}
                  delay={i * 90}
                  className="relative"
                >
                  <div className="liftable flex h-full flex-col rounded-2xl border border-line bg-card p-7">
                    <div className="mb-6 flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface-2 text-xs font-semibold text-signal">
                        {i + 1}
                      </span>
                      <span className="text-eyebrow text-signal">
                        {act.label}
                      </span>
                    </div>
                    {/* The drawn scene for this act. Three artifacts, one tell:
                        work finished everywhere except the field that would ask
                        for a decision. See components/visuals/scene-cards.tsx
                        for why these are drawn rather than photographed. */}
                    <Scene />
                    <p className="text-title">{act.lead}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {act.body}
                    </p>
                  </div>
                  {/* Connector chevron: down on mobile, right on desktop. */}
                  {i < RECOGNITION_ACTS.length - 1 && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute left-1/2 top-full z-10 -translate-x-1/2 translate-y-1 text-signal md:left-full md:top-1/2 md:-translate-x-1 md:translate-y-0"
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="rotate-90 md:rotate-0"
                      >
                        <path
                          d="M9 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                </Reveal>
                );
              })}
            </ol>

            {/* NO PHOTOGRAPH HERE, and none anywhere on this page.

                An atmospheric stock shot of a consultant sat here until the
                v3.0 review. The rule it broke: every human image on this page
                must be a real participant with written consent, the real
                founder, or a clearly-staged illustrative scene shot for this
                brand. Licensed stock of an unnamed professional beside copy
                about someone's business failing to close reads, to a skeptical
                buyer, as a customer who does not exist - and a professional
                audience is exactly the audience that checks.

                The replacement is not another image. The three act cards above
                already carry this beat visually; what this block needed was
                less, not a different picture. IMG-03/04/05 in the v3.0 manifest
                are staged scenes to be shot alongside the ad creative for ads
                01, 14 and 15, and they belong inside those three cards when
                they exist. */}

            {/* The reframe this section exists to deliver. */}
            <Reveal delay={140}>
              <p className="text-headline mx-auto mt-16 max-w-3xl">
                The extra value may not only be improving the offer.{" "}
                <span className="text-emphasis">
                  It may be protecting the relationship, the expertise, or the
                  professional identity from receiving a direct market answer.
                </span>
              </p>
            </Reveal>

            {/* The beliefs. A single column of hanging quotes on a hairline
                rail, not a card grid: these are things a reader might quietly
                recognise in themselves, and a 2-across grid of hoverable panels
                turns private admissions into a feature comparison. */}
            <Reveal delay={160}>
              <p className="text-body-lg mx-auto mt-14 max-w-2xl text-muted">
                The possible belief may sound like:
              </p>
            </Reveal>
            <ul className="mx-auto mt-7 max-w-2xl list-none border-l border-line">
              {POSSIBLE_BELIEFS.map((line, i) => (
                <Reveal as="li" key={line} delay={i * 60}>
                  <blockquote className="py-3.5 pl-6 text-xl leading-relaxed text-fg sm:pl-8">
                    &ldquo;{line}&rdquo;
                  </blockquote>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={170}>
              <div className="text-body-lg mx-auto mt-10 max-w-2xl space-y-3 text-muted">
                <p>The belief may not be the whole business problem.</p>
                <p className="font-medium text-fg">
                  But it may be influencing what happens each time care,
                  expertise, and commercial clarity need to coexist.
                </p>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <CtaBlock location="recognition" className="mt-12" />
            </Reveal>
          </div>
        </section>

        {/* =============== V · Proof ===============
            Participants, then the person behind the method, then the logos.
            The founder is a quote plus a four-fact credential strip rather
            than the five-paragraph narrative this used to be: a visitor needs
            to know the creator has stood inside the same commercial moment,
            and then needs to get back to the offer. */}
        <section className="relative overflow-hidden border-y border-line bg-surface">
          <div className="section-orbs" aria-hidden />
          <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <Reveal>
                <ChapterMark numeral="V" className="justify-center">
                  In their words
                </ChapterMark>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="text-headline mt-5">
                  What people have noticed working through AI Merge
                </h2>
              </Reveal>
            </div>

            <ul className="mt-12 grid list-none gap-5 md:grid-cols-2">
              {TESTIMONIALS.map((t, i) => (
                <Reveal as="li" key={t.name} delay={i * 80}>
                  {/* Typographic, deliberately. The image rules forbid putting
                      a stock portrait next to a quote from someone who is not
                      that person - manufactured proof is the fastest way to
                      lose a skeptical professional reader. So the VISUAL is
                      typography: an oversized quote glyph in the pillar colour,
                      a coloured top rule, and a bar of ink. No faces borrowed
                      from anyone. */}
                  <figure
                    className="liftable relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card p-8 pt-9"
                    style={{
                      borderColor: `color-mix(in srgb, ${
                        [PILLAR_COLORS.directionClarity, PILLAR_COLORS.decisionReadiness][i]
                      } 24%, var(--border))`,
                    }}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-0.5"
                      style={{
                        background: [
                          PILLAR_COLORS.directionClarity,
                          PILLAR_COLORS.decisionReadiness,
                        ][i],
                        opacity: 0.65,
                      }}
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-2 -top-6 select-none font-serif text-[9rem] leading-none"
                      style={{
                        color: [
                          PILLAR_COLORS.directionClarity,
                          PILLAR_COLORS.decisionReadiness,
                        ][i],
                        opacity: 0.1,
                      }}
                    >
                      &rdquo;
                    </span>
                    <blockquote className="text-title relative flex-1">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="relative mt-6 flex items-center gap-2.5 text-sm">
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{
                          background: [
                            PILLAR_COLORS.directionClarity,
                            PILLAR_COLORS.decisionReadiness,
                          ][i],
                        }}
                        aria-hidden
                      />
                      <span className="font-medium text-fg">{t.name}</span>
                      <span className="text-faint">· {t.role}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </ul>

            {/* v3.0 Fix 03: the twelve-clip video wall is GONE, not shrunk.

                It sat directly above a disclaimer conceding that the speakers
                may not be coaches or consultants and may not be talking about
                this product. Twelve faces making a claim the caption
                immediately withdraws is worse than no proof at all in front of
                a professional audience - the rule is at most two clips, chosen
                for relevance, and text only if none qualify. None currently
                qualify, so this is text only.

                The two quotes above are typographic on purpose. Adding stock
                portraits of people who are not the actual participants is
                manufactured proof, which is the fastest way to lose a
                skeptical reader.

                TODO(launch): restore <TestimonialReel /> with at most two
                clips once coach or consultant participants with written
                consent for this funnel exist. The component is still in the
                repo. */}
            <Reveal delay={120}>
              <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-faint">
                Individual experiences vary. These accounts reflect experiences
                across the broader AI Merge work rather than the free Coaches
                and Consultants Belief Score, and do not guarantee that another
                participant will receive the same result.
              </p>
            </Reveal>

            {/* The creator, compressed. */}
            <div className="mt-20 grid items-center gap-10 lg:grid-cols-[0.5fr_1.5fr] lg:gap-14">
              <Reveal>
                <div className="signal-halo relative">
                  <div className="img-hover-zoom relative overflow-hidden rounded-2xl border border-line">
                    <Image
                      src="/manuj/closeup.jpg"
                      alt="Manuj Aggarwal, creator of AI Merge"
                      width={1400}
                      height={1867}
                      sizes="(min-width: 1024px) 280px, 60vw"
                      className="aspect-3/4 w-full object-cover object-top"
                    />
                  </div>
                </div>
              </Reveal>

              <div className="min-w-0">
                <Reveal delay={60}>
                  <blockquote className="text-emphasis text-xl leading-relaxed sm:text-2xl">
                    &ldquo;I knew how to create transformation. I did not always
                    see the belief deciding when that work could be priced,
                    received, simplified, or carried by someone other than
                    me.&rdquo;
                  </blockquote>
                </Reveal>
                {/* v3.0 marks Block 06 "unchanged" and keeps these two
                    sentences. They are the whole persuasive job of the block:
                    the creator has stood inside the same commercial moment.
                    Do NOT re-expand past this into life history or career
                    chronology - that is what v2.1 already cut. */}
                <Reveal delay={100}>
                  <div className="text-body-lg mt-6 space-y-4 text-muted">
                    <p>
                      Across three decades of consulting, advising, and building
                      companies, the same gap kept appearing, in my own work and
                      in the work of the experts around me.
                    </p>
                    <p>
                      Knowing how to solve the problem is one capability.
                      Letting the work be priced, simplified, delegated, and
                      directly offered is a different one.
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={130}>
                  <p className="mt-6 font-medium text-fg">
                    Manuj Aggarwal
                    <span className="ml-2 font-normal text-faint">
                      · creator of AI Merge
                    </span>
                  </p>
                </Reveal>
                <ul className="mt-8 grid list-none gap-x-6 gap-y-5 sm:grid-cols-2">
                  {CREDENTIALS.map((c, i) => {
                    const Icon = CREDENTIAL_ICONS[i];
                    return (
                      <Reveal as="li" key={c.label} delay={140 + i * 50}>
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-signal">
                            <Icon
                              className="h-4 w-4"
                              strokeWidth={1.75}
                              aria-hidden
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="text-eyebrow block text-faint">
                              {c.label}
                            </span>
                            <span className="mt-1 block text-sm leading-snug text-fg">
                              {c.value}
                            </span>
                          </span>
                        </div>
                      </Reveal>
                    );
                  })}
                </ul>
              </div>
            </div>

            <Reveal delay={100}>
              <div className="mt-16">
                <p className="text-eyebrow text-center text-faint">
                  Professional experience behind AI Merge
                </p>
                <ul className="mt-8 flex list-none flex-wrap items-center justify-center gap-x-12 gap-y-6">
                  {TRUST_LOGOS.map((logo) => (
                    <li
                      key={logo.alt}
                      className="relative h-9 w-24 opacity-60 grayscale transition-all duration-700 sm:h-10 sm:w-28 [@media(hover:hover)]:hover:opacity-100 [@media(hover:hover)]:hover:grayscale-0"
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        fill
                        sizes="(min-width: 640px) 112px, 96px"
                        className="object-contain"
                      />
                    </li>
                  ))}
                </ul>
                <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-faint">
                  Organizations shown reflect prior professional work by Manuj
                  Aggarwal and do not imply endorsement of the Coaches and
                  Consultants Belief Score, AI Merge, TetraNoodle Technologies,
                  or this offer.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* =============== Essential questions ===============
            EVERY categorical disclaimer on this page lives here. When sections
            were cut, their compliance copy was folded into this accordion
            rather than deleted - the "keep what helps" answer below is the
            entire former differentiation block. Do not trim these answers
            without checking what else used to carry the same statement. */}
        <section className="relative overflow-hidden">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              {/* Left rail: the heading and the reassurance card. Sticky on
                  desktop so the four guarantees stay beside whichever question
                  the reader has opened. */}
              <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
                <Reveal>
                  <ChapterMark numeral="VI">Before you start</ChapterMark>
                </Reveal>
                <Reveal delay={60}>
                  <h2 className="text-headline mt-5">Essential questions</h2>
                </Reveal>

                <ul className="mt-9 grid list-none gap-3">
                  {REASSURANCES.map(({ Icon, label, body, color }, i) => (
                    <Reveal as="li" key={label} delay={100 + i * 60}>
                      <div
                        className="flex items-start gap-3.5 rounded-xl border bg-card p-4"
                        style={{
                          borderColor: `color-mix(in srgb, ${color} 26%, var(--border))`,
                        }}
                      >
                        <span
                          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                          style={{
                            background: `color-mix(in srgb, ${color} 14%, transparent)`,
                            color,
                          }}
                        >
                          <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-fg">
                            {label}
                          </span>
                          <span className="mt-1 block text-[13px] leading-relaxed text-muted">
                            {body}
                          </span>
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </div>

              {/* Right column: the accordion and the answer-engine links. A
                  plain div rather than a <Reveal>, so each child can reveal on
                  its own timing. */}
              <div className="min-w-0">
                <Reveal delay={80}>
                <div>
                {/* Rendered from DOORWAY_FAQS in lib/faq.ts, which is also
                    what generates this page's FAQPage JSON-LD above. One array
                    for both, so the markup an answer engine reads and the copy
                    a visitor sees cannot diverge. v3.0 cut the doorway from six
                    questions to three; the other three still render on /faq. */}
                {DOORWAY_FAQS.map((faq) => (
                  <FaqItem key={faq.q} question={faq.q}>
                    {faq.a.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </FaqItem>
                ))}

                <FaqItem question="Is this a replacement for strategy, positioning, or sales training?">
                  <p>
                    No. A better offer may improve conversion. Sales training
                    may improve commercial conversations. A CRM may improve
                    follow-up. A business coach may improve strategy and
                    accountability. Professional supervision may protect quality
                    and ethics. Keep what helps.
                  </p>
                  <p>
                    The Belief Score does not replace market research, offer
                    design, sales skill, positioning, pricing strategy, proof,
                    distribution, referrals, content strategy, financial
                    discipline, legal or professional advice, or direct market
                    evidence. It asks one narrower question: what happens in the
                    moment when you already know the next useful business
                    action, but move back into helping, refining, customizing,
                    explaining, or preparing?
                  </p>
                  <p>
                    It is an additional layer, not a replacement, and belief is
                    never presented as the sole cause of a commercial outcome.
                  </p>
                </FaqItem>

                <FaqItem question="View research, privacy, technology, and professional-boundary details">
                  <h3 className="text-title">Research foundation</h3>
                  <p>
                    Research across learning, expectations, identity, stress,
                    attention, emotional memory, decision-making, social
                    evaluation, and behavior suggests that prior beliefs may
                    influence what people notice, what they expect, how they
                    interpret uncertainty, what feels safe enough to attempt,
                    what they avoid, how they respond under pressure, and what
                    each result appears to prove.
                  </p>
                  <p>
                    This does not mean belief is the sole cause of a commercial
                    or professional outcome. The AI Merge methodology combines
                    established scientific principles with a proprietary
                    interpretive framework. The Coaches and Consultants Belief
                    Score should be treated as a reflective and educational tool
                    unless direct validation research establishes stronger
                    claims.
                  </p>
                  {/* TODO(launch): insert approved public research summary,
                      source register, exact publication wording, approved
                      "peer-reviewed" wording, and the distinction between
                      established research, AI Merge interpretation, and
                      product-specific evidence. */}

                  <h3 className="text-title">
                    How technology supports the result
                  </h3>
                  <p>
                    The system uses the information you provide to organize what
                    happened, what you did next, what the moment may have come
                    to mean, what belief may have formed or become reinforced,
                    how the loop may continue, and what another response could
                    look like. The technology helps reveal the pattern. You
                    decide what it means. Your actions create the evidence that
                    matters.
                  </p>
                  <p>
                    The system does not independently know your full business.
                    It does not access your CRM, client files, financial
                    accounts, private communications, or business systems unless
                    a future product explicitly requests and discloses such
                    access.
                  </p>

                  <h3 className="text-title">Privacy and data</h3>
                  {/* TODO(launch): verify and disclose what information is
                      collected, why, where it is stored, retention period,
                      whether humans may review it, which vendors process it,
                      whether it is used for model or system improvement,
                      whether it is sold or shared, deletion and access
                      procedures, and marketing-consent behavior. */}
                  <p>
                    Before publication, the published policy discloses what
                    information is collected, why it is collected, where it is
                    stored, the retention period, whether humans may review it,
                    which vendors process it, whether it is used for model or
                    system improvement, whether it is shared, deletion and
                    access procedures, and marketing-consent behavior.
                  </p>

                  <h3 className="text-title">Professional boundaries</h3>
                  <p>
                    The Coaches and Consultants Belief Score is not business
                    consulting, legal advice, tax advice, financial advice,
                    investment advice, employment advice, professional
                    supervision, medical advice, mental-health treatment,
                    diagnosis, psychotherapy, or crisis support. It is not a
                    business assessment, a personality test, or a professional
                    evaluation, and it is not a guarantee of clients, revenue,
                    pricing, scale, or business outcomes.
                  </p>
                  <p>
                    Use personal judgment and seek qualified support when
                    needed.
                  </p>
                </FaqItem>
                </div>
                </Reveal>

                {/* In-body links to the two answer-engine pages. Without these
                    they are reachable only from the footer, which both readers
                    and link-graph analysis discount. */}
                <Reveal delay={120}>
                  <p className="mt-8 text-sm text-faint">
                More answers on the{" "}
                <Link
                  href={LINKS.faq.href}
                  className="font-medium text-fg underline underline-offset-4"
                >
                  full FAQ
                </Link>
                , or see every term defined in the{" "}
                <Link
                  href={LINKS.glossary.href}
                  className="font-medium text-fg underline underline-offset-4"
                >
                  glossary
                </Link>
                    .
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* =============== Final CTA =============== */}
        <section className="relative overflow-hidden border-t border-line bg-surface">
          <div className="section-orbs" aria-hidden />
          <div className="relative mx-auto w-full max-w-2xl px-5 py-24 text-center sm:px-8 sm:py-32">
            {/* The four pillars as chips, ABOVE the headline.

                v3.0 specifies no image at the close, and it is right: anything
                sitting near the button gives the eye a second place to stop.
                But the section still needed something to look at, so the
                graphic goes above the argument rather than beside the click
                target, and it is a RECAP rather than a new idea - the same
                four chips, in the same four colours, that the real assessment
                shows on its own first screen. A visitor who arrives here from
                a scroll sees what they are about to get, in one row. */}
            <Reveal>
              <ul className="mx-auto mb-10 flex list-none flex-wrap items-center justify-center gap-2">
                {PILLAR_ORDER.map((key, i) => {
                  const Icon = PILLAR_ICONS[key];
                  const color = PILLAR_COLORS[key];
                  return (
                    <li key={key}>
                      <span
                        className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10.5px] uppercase tracking-[0.14em]"
                        style={{
                          // Border and tint take the GRAPHICS token (3:1 is
                          // the bar for a non-text object); the label takes
                          // the lifted -ink token, because at 10.5px it is
                          // small text and needs 4.5:1 on this ground.
                          borderColor: `color-mix(in srgb, ${color} 45%, transparent)`,
                          background: `color-mix(in srgb, ${color} 9%, transparent)`,
                          color: PILLAR_TEXT_COLORS[key],
                          // Stagger via the existing rise-in, so the row
                          // assembles left to right as it enters.
                          ["--rise-delay" as string]: `${i * 90}ms`,
                        }}
                      >
                        <Icon className="h-3 w-3" strokeWidth={2} aria-hidden />
                        {PILLAR_LABELS[key].label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
            <Reveal>
              <h2 className="text-display">
                <WordReveal
                  step={65}
                  segments={[
                    {
                      kind: "text",
                      text: "You already know what the pattern keeps doing.",
                    },
                    { kind: "br" },
                    {
                      kind: "italic",
                      text: "Now see what it may have taught you to believe.",
                    },
                  ]}
                />
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-body-lg mt-8 text-muted">
                One recurring pattern, described in your own words. Your score
                out of 100, four scored pillars, and your personalized
                Pattern-to-Belief Map.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <CtaBlock location="final" className="mt-10" />
            </Reveal>
            <Reveal delay={220}>
              <p className="mx-auto mt-10 max-w-md text-sm leading-relaxed text-faint">
                Your result is a starting point for reflection. Not a final
                statement about your business, ability, value, or identity.
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileStickyCta />
    </>
  );
}
