import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  FileText,
  Eye,
  MessageSquareQuote,
  RefreshCw,
  PenLine,
  Repeat,
  ScrollText,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";
import ReactDOM from "react-dom";
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
import { TestimonialReel } from "@/components/testimonial-reel";
import { VslPlayer } from "@/components/vsl-player";
import type { CtaLocation } from "@/lib/analytics";
import { ESSENTIAL_FAQS, toFaqEntries } from "@/lib/faq";
import { LINKS } from "@/lib/seo";
import { ROUTES } from "@/lib/site";

/* ==========================================================================
   AI Merge, Coaches and Consultants Belief Score doorway page.

   Marine design system (deep navy ground + one teal accent,
   Fraunces display + Inter, ambient lighting, VSL player). Structure and copy
   follow the authoritative spec `COACH-CONSULTANT-Landing-Page.md` block by
   block (Blocks 01-14). Block numbers appear only in comments, never on the
   page.

   Register (from the spec):
   - The free "Coaches and Consultants Belief Score" is the ONLY primary offer.
     Its public mechanism is the "Pattern-to-Belief Map." One CTA everywhere.
   - ONE dominant commercial pattern carries the page: creating more value when
     the business needs a direct invitation.
   - Belief is never presented as the sole cause of commercial outcomes.
     Practical business conditions (demand, offer, pricing, proof, distribution,
     timing, capital) stay explicitly real.
   - AI is supporting technology, not the authority. The participant decides
     what fits.
   - Not a business assessment, personality test, or professional evaluation.
   - No urgency, no scarcity, no guaranteed client or revenue outcome.
   - Question count and completion time are NOT published (the spec forbids it
     until verified / measured).
   - "TODO(launch)" markers keep the spec's verification-register items as
     honest placeholders rather than invented specifics.
========================================================================== */

/* Prior professional work behind AI Merge, pedigree, not endorsement (the
   disclaimer below the row states this). Verify approved monochrome assets. */
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

/* Blocks 06 / 12 / 13: the five fields a Pattern-to-Belief Map produces. The
   spec repeats this list at each decision point, so it is declared once. */
const MAP_FIELDS = [
  {
    title: "The repeated moment",
    body: "The specific situation that keeps recurring, stated concretely rather than as a general complaint.",
  },
  {
    title: "A possible belief",
    body: "What that repeated experience may have taught you to conclude. An interpretation, not a verdict.",
  },
  {
    title: "The reinforcing loop",
    body: "How your response produces a consequence that appears to confirm the belief, so it repeats.",
  },
  {
    title: "The moment to watch",
    body: "The earliest observable point where the pattern begins, narrow enough to actually catch.",
  },
  {
    title: "The next evidence",
    body: "One small action that would show another response is available. A test you can run this week.",
  },
];

/** One icon per Map field, in the same order. Line icons only: the page's
 *  visual language is hairlines and restraint, so filled or duotone marks
 *  would read as a different system. */
const MAP_FIELD_ICONS = [Repeat, MessageSquareQuote, RefreshCw, Eye, ArrowUpRight];

/* Block 03: what the score explicitly does NOT replace. Naming these keeps the
   page from claiming belief work substitutes for commercial fundamentals. */
const NOT_A_REPLACEMENT_FOR = [
  "market research",
  "offer design",
  "sales skill",
  "positioning",
  "pricing strategy",
  "proof",
  "distribution",
  "referrals",
  "content strategy",
  "financial discipline",
  "legal or professional advice",
  "direct market evidence",
];

/* Block 04: the dominant pattern, told as three stages. The spec's copy runs as
   a long single-line cadence; these cards keep that sequence readable without
   turning it into a wall of one-liners. */
const RECOGNITION_ACTS = [
  {
    label: "The Work Is Valuable",
    lead: "The discovery call went well. They can see the transformation. The next step is available.",
    body: "The client results are real. The framework has depth. The proposal is nearly ready. Then something changes.",
  },
  {
    label: "One More Pass",
    lead: "“It needs one more pass.” Or: “I should give them more context first.” Or: “I do not want this to feel salesy.”",
    body: "One more clarification appears necessary. One more resource would make the offer stronger. One more custom element could show how much you care.",
  },
  {
    label: "The Cycle Stays Open",
    lead: "So you return to the place where you already feel capable. You help. You teach. You improve. You customize.",
    body: "The work remains alive. But the commercial cycle stays incomplete. The recommendation is softened. The next step is vague. The proposal waits.",
  },
];

/* Block 04: what the incomplete commercial cycle quietly costs. */
const RECOGNITION_CONSEQUENCES = [
  "the recommendation is softened",
  "the next step is vague",
  "the proposal waits",
  "the price is qualified before the prospect responds",
  "the content educates without inviting",
  "delivery becomes more dependent on you",
];

/* Block 04: the loop, rendered as a visible chain so "it keeps repeating"
   lands visually rather than as prose. */
const RECOGNITION_LOOP = [
  "pipeline becomes quiet",
  "revenue pressure rises",
  "selling becomes urgent",
  "the next conversation carries more weight",
  "action finally arrives under pressure",
  "pressure receives the credit",
];

/* Block 04: the possible beliefs underneath the pattern. Kept as the spec's
   verbatim quotations, each explicitly framed as "may sound like". */
const POSSIBLE_BELIEFS = [
  "Helping preserves trust. Selling risks damaging it.",
  "If I simplify the work, I reduce its value.",
  "Receiving more requires giving more first.",
  "If the client can succeed without my constant presence, perhaps I am less valuable.",
];

/* Block 05: the moments that look unrelated until the language, sequence,
   response, consequence, and interpretation are viewed together. */
const SEPARATE_PATTERNS = [
  { a: "A delayed proposal", b: "an overcustomized engagement" },
  { a: "A soft follow-up", b: "vague pricing" },
  { a: "A full content calendar", b: "weak commercial visibility" },
  { a: "A new AI experiment", b: "difficulty simplifying delivery" },
  { a: "An inability to delegate", b: "the way value is defined" },
];

/* Block 05: what the technology helps reflect. Not what it decides. */
const WHAT_IT_REFLECTS = [
  "what keeps happening",
  "what happens immediately before it",
  "what you tend to do next",
  "what consequence follows",
  "what the repeated moment may have come to mean",
  "where a different piece of evidence could begin",
];

/* Block 06: the Pattern-to-Belief Map, the public mechanism. Five connected
   stages (spec Block 06). */
const MAP_STAGES = [
  {
    title: "The Repeated Moment",
    body: (
      <>
        <p>What keeps happening? Not:</p>
        <blockquote>&ldquo;I need more clients.&rdquo;</blockquote>
        <p>Something specific:</p>
        <blockquote>
          &ldquo;When a prospect is ready for a clear recommendation, I add more
          value instead of naming the next step.&rdquo;
        </blockquote>
      </>
    ),
  },
  {
    title: "The Possible Belief",
    body: (
      <>
        <p>What may the repeated experience have taught you to conclude?</p>
        <blockquote>
          &ldquo;Direct selling makes the relationship less genuine.&rdquo;
        </blockquote>
        <blockquote>
          &ldquo;My value depends on giving more than the client expects.&rdquo;
        </blockquote>
        <p>A possible interpretation. Not a verdict.</p>
      </>
    ),
  },
  {
    title: "The Reinforcing Loop",
    body: (
      <>
        <p>How does the sequence keep appearing to prove the same belief?</p>
        <p>
          Prospect shows interest &rarr; a direct recommendation becomes
          available &rarr; more explanation or customization is added &rarr; the
          next step remains unclear &rarr; the prospect delays &rarr; the
          pipeline weakens &rarr; pressure rises &rarr; selling feels heavier.
        </p>
      </>
    ),
  },
  {
    title: "The Moment to Watch",
    body: (
      <>
        <p>Where does the familiar pattern begin?</p>
        <p>
          Not the whole business. Not every sales conversation. One early
          moment.
        </p>
        <blockquote>
          The urge to add more before stating the recommendation.
        </blockquote>
      </>
    ),
  },
  {
    title: "The Next Evidence",
    body: (
      <>
        <p>What observable action would suggest another response is available?</p>
        <blockquote>
          End one qualified conversation with a clear recommendation, decision
          point, and agreed follow-up date.
        </blockquote>
      </>
    ),
  },
];

/* Block 07: participant language becomes the map, step by step. */
const PROCESS_STEPS = [
  {
    title: "Your Words",
    body: (
      <blockquote>
        &ldquo;The sales conversation goes well, but when it is time to
        recommend the offer, I start explaining more, adding options, or giving
        away extra help.&rdquo;
      </blockquote>
    ),
  },
  {
    title: "The Repeated Moment",
    body: (
      <p>
        A qualified prospect is ready for a clear commercial recommendation.
        Instead, additional explanation or value is introduced.
      </p>
    ),
  },
  {
    title: "A Possible Belief",
    body: (
      <blockquote>
        &ldquo;If I sell directly, the relationship becomes less genuine.&rdquo;
      </blockquote>
    ),
  },
  {
    title: "The Reinforcing Loop",
    body: (
      <p>
        A direct recommendation feels exposed. More value is added. The next
        step becomes less clear. The prospect delays. The pipeline weakens.
        Pressure rises. Selling feels heavier next time.
      </p>
    ),
  },
  {
    title: "The Moment to Watch",
    body: (
      <p>
        The first urge to add another explanation, resource, or option before
        naming the recommendation.
      </p>
    ),
  },
  {
    title: "The Next Evidence",
    body: (
      <p>
        State the recommendation clearly and let the prospect make a real
        decision.
      </p>
    ),
  },
];

/* Block 07: the illustrative result panel, shaped like a product result.
   Copy is the spec's worked coaching / consulting example. */
const EXAMPLE_RESULT = [
  {
    label: "Your Recurring Pattern",
    body: (
      <p>
        When a prospect is ready for a direct next step, you move back into
        teaching, explaining, or customizing.
      </p>
    ),
  },
  {
    label: "A Possible Belief Underneath",
    body: (
      <blockquote className="text-title">
        &ldquo;Helping protects trust. Selling risks changing the
        relationship.&rdquo;
      </blockquote>
    ),
  },
  {
    label: "How the Pattern May Keep Proving Itself",
    body: (
      <p>
        A strong conversation creates interest. A recommendation becomes
        available. The commercial moment feels exposed. You add more
        explanation. You make the offer broader. You give another resource. The
        next step remains unclear. The prospect delays. The pipeline becomes
        quieter. Financial pressure increases. The next conversation feels more
        urgent. The mind records: &ldquo;Selling naturally becomes
        heavy.&rdquo;
      </p>
    ),
  },
  {
    label: "The Moment to Watch",
    body: (
      <p>
        The first moment you feel pulled to add more before making the
        recommendation.
      </p>
    ),
  },
  {
    label: "What Different Evidence Could Look Like",
    body: (
      <p>
        State one clear recommendation. Name the next step. Ask whether the
        prospect wants to proceed. Allow care and commercial clarity to exist in
        the same interaction.
      </p>
    ),
  },
  {
    label: "One Practical Next Step",
    body: (
      <p>
        Before the next qualified conversation, write the exact recommendation
        you would make if directness and care were allowed to coexist.
      </p>
    ),
  },
];

/* Block 08: what a different response may look like. Behavioral and specific,
   never a promise of transformation. */
const FIRST_SHIFTS = [
  "You make the recommendation before adding another resource.",
  "You name the price without apologizing for it.",
  "You publish content that includes a clear invitation.",
  "You let one offer remain stable long enough to see who actually enrols.",
  "You distinguish client value from unlimited access to you.",
  "You define one repeatable delivery component without removing judgment.",
  "You use AI for one measured workflow instead of endless experimentation.",
  "You delegate with clear standards and allow the task to remain with its owner.",
];

/* Block 09: compact credential list. TODO(launch): verify exact approved
   wording for title, patents, and publication. */
const CREDENTIALS = [
  { label: "Role", value: "Founder & CIO, TetraNoodle Technologies" },
  { label: "Created", value: "The AI Merge methodology" },
  { label: "Patents", value: "Four, in AI and technology systems" },
  { label: "Published in", value: "Mensa Research Journal" },
];

/** One icon per credential, in order. */
const CREDENTIAL_ICONS = [Building2, Sparkles, Award, FileText];

/* Block 10: approved participant statements. TODO(launch): verify exact
   wording, consent, role, and display restrictions before publishing. */
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

/* Block 11: the differentiation table. Left column = legitimate existing
   support (explicitly kept), right column = the additional layer the score
   examines. Renders as a table from md up, stacked cards on mobile (the
   spec's mobile requirement, so nothing scrolls horizontally). */
const DIFFERENTIATION = [
  {
    support: "Offer strategy",
    examines: "Why the offer keeps changing before the market can answer",
  },
  {
    support: "Sales training",
    examines:
      "Why a direct recommendation may feel less human than continued helping",
  },
  {
    support: "CRM and follow-up systems",
    examines: "Why the message remains unsent even when the task is visible",
  },
  {
    support: "Content systems",
    examines: "Why useful education may remain commercially indirect",
  },
  {
    support: "Pricing guidance",
    examines:
      "Why receiving fair value may trigger more giving or qualification",
  },
  {
    support: "AI tools",
    examines: "Why experimentation may replace one measured implementation",
  },
  {
    support: "Productization",
    examines: "Why repeatability may feel like loss of nuance or identity",
  },
  {
    support: "Delegation systems",
    examines: "Why the first imperfect version triggers reclamation",
  },
  {
    support: "Business coaching",
    examines: "The possible belief active inside one repeated business moment",
  },
  {
    support: "Professional supervision",
    examines:
      "Quality and ethics within the work, rather than the commercial identity attached to the work",
  },
];

/* Block 12, step 1: the example patterns a visitor may choose from. This is
   the public distillation of the ICP matrix, and it is what keeps the page
   coherent for every approved ad angle (ad-to-page continuity). */
const EXAMPLE_PATTERNS = [
  "building instead of selling",
  "softening the recommendation",
  "overcustomizing delivery",
  "avoiding follow-up",
  "changing positioning too quickly",
  "hiding the invitation inside educational content",
  "underpricing",
  "overdelivering",
  "struggling to delegate",
  "experimenting with AI without integration",
  "remaining indispensable to every result",
];

/* Block 12: the four process steps. */
/** One icon per step. The NUMBER stays: unlike the Block 08 options, these
 *  four genuinely run in order, so the sequence is real information. The icon
 *  carries the character of the step, the number carries its place. */
const HOW_STEP_ICONS = [Target, PenLine, ScrollText, Sparkles];

const HOW_STEPS = [
  {
    title: "Choose One Pattern",
    body: "Focus on one situation in your practice that matters now, not your entire business. One pattern.",
  },
  {
    title: "Describe What Happens",
    body: "Complete a short guided reflection in your own words. You do not need business jargon. There is no perfect wording. Messy answers are allowed.",
  },
  {
    title: "Receive Your Pattern-to-Belief Map",
    body: "Your personalized result shows the repeated moment, a possible belief, the reinforcing loop, the moment to watch, and the next evidence.",
  },
  {
    title: "Decide What Fits",
    body: "Keep what feels accurate. Question, correct, refine, or reject what does not. You remain the authority on your business and experience.",
  },
];

/* Zone A microcopy. The words under every primary CTA carry the artifact spec
   (free, personalized, no card, reflective), never a caveat. The categorical
   disclaimers live in the FAQ. */
const CTA_MICROCOPY =
  "Free · Personalized · No credit card · Reflective, not diagnostic";

/* Full label on tablet/desktop; a shorter label on phones so the pill never
   forces horizontal overflow and stays a comfortable tap target. */
const CTA_LABEL = "Get Your Free Coaches and Consultants Belief Score";
const CTA_LABEL_SHORT = "Get Your Free Belief Score";

function ChapterMark({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`chapter text-eyebrow ${className}`}>
      <span className="chapter-dot" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

/** Primary CTA + the reassurance line beneath it. Renders a short label on
 *  phones and the full label from the `sm` breakpoint up. Pass an explicit
 *  `label` to override both. */
function CtaBlock({
  location,
  label,
  labelShort,
  microcopy = CTA_MICROCOPY,
  className = "",
}: {
  location: CtaLocation;
  label?: string;
  labelShort?: string;
  microcopy?: string;
  className?: string;
}) {
  const full = label ?? CTA_LABEL;
  const short = labelShort ?? (label ? label : CTA_LABEL_SHORT);
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* Wrapper hosts the ambient light behind the button, see .cta-halo. */}
      <span className="cta-halo w-full sm:w-auto">
        <ScorecardCta
          variant="signal"
          size="lg"
          location={location}
          className="w-full min-h-11 sm:w-auto"
        >
          <span className="sm:hidden">{short}</span>
          <span className="hidden sm:inline">{full}</span>
        </ScorecardCta>
      </span>
      <p className="text-center text-sm text-faint">{microcopy}</p>
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

          `speakable` points at the hero headline and the what-you-receive
          block: the passages written to be read aloud verbatim. */}
      <PageStructuredData
        name="Free Coaches and Consultants Belief Score"
        path={ROUTES.home.path}
        description="See the belief that may be shaping one repeated commercial moment, built from your own words. Free, personalized, and reflective rather than diagnostic."
        updated={ROUTES.home.updated}
        faqs={toFaqEntries(ESSENTIAL_FAQS)}
        speakableSelectors={["#hero-headline", "#what-you-receive"]}
        extraNodes={[videoNode, howToNode, publicationNode]}
      />
      <LandingAnalytics />
      <main id="main" className="relative flex-1">
        {/* ================= Block 01 · Hero =================
            Spec order: eyebrow, headline, VSL, CTA, trust line, credibility
            line. NO supporting paragraph between headline, VSL, and CTA. */}
        <section id="hero" className="relative overflow-hidden">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-5 pb-10 pt-12 text-center sm:px-8 sm:pt-16">
            <Reveal>
              <p className="cred-chip">
                AI Merge · Free Coaches and Consultants Belief Score
              </p>
            </Reveal>
            <Reveal delay={80}>
              {/* The audience is named IN the headline, not in a line under it:
                  Block 01's "DO NOT ADD" list forbids a supporting paragraph
                  between the headline, the VSL and the CTA, so a separate
                  "for coaches and consultants" line would breach the spec.
                  Working it into the H1 satisfies the owners' note (the page
                  must address coaches and consultants) while keeping the
                  above-the-fold order intact.

                  The phrasing is the ICP matrix's own governing position:
                  "A coach or consultant who knows how to create value for other
                  people but does not consistently make that value visible,
                  sellable, scalable, or receivable." */}
              {/* Same two-clause structure and cadence as before - a statement
                  of competence, then the narrower question in italic emphasis.
                  Only the vocabulary moves: "create value / sellable /
                  scalable" was true of any business, so it becomes the language
                  of the work itself (transformation, clients, expertise). */}
              <h1 id="hero-headline" className="text-display mt-8">
                Coaches and consultants: you know how to create value.{" "}
                <span className="text-emphasis">
                  But what belief decides whether that value gets sold,
                  received, and scaled?
                </span>
              </h1>
            </Reveal>
          </div>

          <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
            <Reveal immediate>
              <VslPlayer />
            </Reveal>
            <Reveal delay={220}>
              {/* Hero CTA shows the full label on every breakpoint (no mobile
                  shortening); the button wraps to two lines on narrow screens. */}
              <CtaBlock
                location="hero"
                label={CTA_LABEL}
                labelShort={CTA_LABEL}
                className="mt-8"
              />
            </Reveal>
            <Reveal delay={280}>
              <p className="mt-3 text-center text-sm text-faint">
                Built from your own words · Based on the published AI Merge
                methodology
              </p>
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

        {/* ================= Block 02 · Early proof =================
            Product credibility before the visitor absorbs the full argument:
            the five Map fields on the left, an on-brand result card on the
            right. bg-surface so it alternates against the hero and Block 03. */}
        <section className="relative overflow-hidden border-y border-line bg-surface">
          <div className="section-orbs" aria-hidden />
          <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
            <SectionViewTracker event="whatyouget_view" />
            {/* Centred header, then the REAL score report full-bleed, then the
                five fields as icon cards. Previously this block led with a
                paragraph and a bullet list beside a coded card, which read as
                text with a decoration; the delivered artifact is the strongest
                thing this section has, so it leads. */}
            <div className="mx-auto max-w-3xl text-center">
              <Reveal>
                <ChapterMark className="justify-center">
                  What you receive
                </ChapterMark>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="text-headline mt-5">
                  A Personalized Reflection Built from the Coaching or
                  Consulting Pattern You Describe
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p id="what-you-receive" className="text-body-lg mt-6 text-muted">
                  You receive a scored, written report built from your own
                  words, not a generic business profile.
                </p>
              </Reveal>
            </div>

            {/* The delivered report. This is the score screenshot. */}
            <Reveal delay={140}>
              <figure className="mx-auto mt-12 max-w-4xl">
                <div className="media-frame overflow-hidden rounded-2xl bg-card">
                  <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-fg/25" aria-hidden />
                    <span className="h-2.5 w-2.5 rounded-full bg-fg/20" aria-hidden />
                    <span className="h-2.5 w-2.5 rounded-full bg-fg/15" aria-hidden />
                    <span className="text-eyebrow ml-2 truncate text-faint">
                      Your Belief Score report
                    </span>
                  </div>
                  <Image
                    src="/graphics/reportsummary.png"
                    alt="An example Belief Score report: an overall score with scored dimensions and a written explanation of each"
                    width={1792}
                    height={815}
                    sizes="(min-width: 1024px) 896px, 100vw"
                    className="block h-auto w-full"
                  />
                </div>
                <figcaption className="mt-3 text-center text-sm text-faint">
                  Illustrative example · your own report is generated from the
                  pattern you describe
                </figcaption>
              </figure>
            </Reveal>

            {/* The five fields, as icon cards rather than a bullet list. */}
            <ul className="mt-14 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MAP_FIELDS.map((field, i) => {
                const Icon = MAP_FIELD_ICONS[i];
                return (
                  <Reveal as="li" key={field.title} delay={60 + i * 60}>
                    <div className="liftable flex h-full flex-col rounded-2xl border border-line bg-card p-6">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface-2 text-signal">
                        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                      </span>
                      <h3 className="text-title mt-5">{field.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {field.body}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </ul>

            {/* Early participant proof, kept visually secondary to the hero.
                TODO(launch): replace with an exact approved statement. */}
            <Reveal delay={180}>
              <blockquote className="mx-auto mt-14 max-w-2xl border-l-2 border-signal pl-6">
                <p className="text-title">
                  &ldquo;It helped me see the pattern without turning it into
                  another reason to judge myself.&rdquo;
                </p>
              </blockquote>
            </Reveal>
          </div>
        </section>

        {/* ================= Block 03 · Silent skepticism =================
            Name the likely private objection before it becomes disengagement.

            Structured as a REBUTTAL, because that is what the copy is: the
            objection on the left, what the score concedes underneath it, and
            the narrower question answering back on the right. Previously all
            seven paragraphs ran down one 2xl column, so the shape gave no clue
            that a turn was happening; the argument was there but invisible.
            The two columns are separated by a rule on lg, which is the visual
            equivalent of the "That may be true, but" pivot. */}
        <section className="relative overflow-hidden">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-0">
              {/* Left: the objection, and what the score does not replace. */}
              <div className="lg:pr-14">
                <Reveal>
                  <ChapterMark>Before you scroll past</ChapterMark>
                </Reveal>
                <Reveal delay={60}>
                  <h2 className="text-headline mt-5">
                    Coaches and Consultants Often Arrive Thinking:
                  </h2>
                </Reveal>
                <Reveal delay={100}>
                  <blockquote className="mt-8 border-l-2 border-line pl-5">
                    <p className="text-title text-fg">
                      &ldquo;My problem is not belief. I need better
                      positioning, stronger acquisition, clearer pricing, or
                      more qualified leads.&rdquo;
                    </p>
                  </blockquote>
                </Reveal>
                <Reveal delay={140}>
                  <p className="text-body-lg mt-8 font-medium text-fg">
                    That may be true.
                  </p>
                </Reveal>
                <Reveal delay={160}>
                  <p className="mt-6 text-eyebrow text-faint">
                    What the score does not replace
                  </p>
                </Reveal>
                {/* Two columns of short items: a concession list is easier to
                    accept when it can be scanned than when it is a comma run. */}
                <Reveal delay={180}>
                  <ul className="mt-4 grid list-none gap-x-6 gap-y-2 sm:grid-cols-2">
                    {NOT_A_REPLACEMENT_FOR.map((item) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-2.5 text-sm text-muted"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-faint" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              {/* Right: the turn. The rule is the pivot made visible. */}
              <div className="lg:border-l lg:border-line lg:pl-14">
                <Reveal delay={120}>
                  <p className="text-eyebrow text-signal">
                    It asks one narrower question
                  </p>
                </Reveal>
                <Reveal delay={160}>
                  {/* Deliberately NOT text-headline: in a half-width column
                      that ran seven lines and overpowered the objection it is
                      answering. This keeps the italic emphasis (the pivot is
                      still the loudest thing in the column) at a size that
                      balances the left. */}
                  <p className="mt-6 text-2xl leading-snug sm:text-3xl">
                    <span className="text-emphasis">
                      What happens in the moment when you already know the next
                      useful business action, but move back into helping,
                      refining, customizing, explaining, or preparing?
                    </span>
                  </p>
                </Reveal>
                <div className="mt-10 space-y-4">
                  {[
                    "You do not have to accept another label.",
                    "You do not have to treat every commercial problem as an internal problem.",
                  ].map((line, i) => (
                    <Reveal key={line} delay={200 + i * 40}>
                      <p className="text-body-lg text-muted">{line}</p>
                    </Reveal>
                  ))}
                  <Reveal delay={280}>
                    <p className="text-body-lg border-t border-line pt-4 font-medium text-fg">
                      You only have to decide whether the repeated moment is
                      worth examining.
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ Block 04 · Recognition and revelation ============
            ONE dominant pattern: creating more value when the business needs a
            direct invitation. */}
        <section className="border-t border-line bg-surface">
          <div className="mx-auto w-full max-w-5xl px-5 py-24 sm:px-8 sm:py-36">
            {/* Opens as a split, not centred. This is the fourth section and
                the third centred header in a row would flatten the page; the
                heading also carries three short sentences that read better
                stacked left than balanced on a centre axis. */}
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
              <div>
                <Reveal>
                  <ChapterMark>Sound familiar</ChapterMark>
                </Reveal>
                <Reveal delay={60}>
                  <h2 className="text-headline mt-5">
                    The Coaching Is Good. The Consulting Works. The Client
                    Results Are Real.
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

            {/* Three stage cards with connecting arrows: a sequence, not a wall
                of one-liners. Arrows point down on mobile, right on desktop. */}
            <ol className="mt-14 grid list-none gap-4 md:grid-cols-3 md:gap-5">
              {RECOGNITION_ACTS.map((act, i) => (
                <Reveal
                  as="li"
                  key={act.label}
                  delay={i * 90}
                  className="relative"
                >
                  <div className="liftable flex h-full flex-col rounded-2xl border border-line bg-card p-7">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface-2 text-xs font-semibold text-signal">
                        {i + 1}
                      </span>
                      <span className="text-eyebrow text-signal">
                        {act.label}
                      </span>
                    </div>
                    <p className="text-title mt-5">{act.lead}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {act.body}
                    </p>
                  </div>
                  {/* Connector: chevron between cards. */}
                  {i < RECOGNITION_ACTS.length - 1 && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute left-1/2 top-full z-10 -translate-x-1/2 translate-y-1 text-signal md:left-full md:top-1/2 md:-translate-x-1 md:-translate-y-1/2 md:translate-y-0"
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
              ))}
            </ol>

            {/* From here the block is one continuous descent, not a stack of
                separate widgets. The measure NARROWS at each step (3xl -> 2xl)
                and the type quietens, so the section physically closes in on
                the belief the way the pattern closes in on the practitioner.
                This is the page's emotional low point; it should feel like one. */}

            {/* What the incomplete commercial cycle quietly costs. Rendered as
                a plain list, not pills: these are losses, and a row of rounded
                chips reads like a feature list. */}
            <Reveal delay={120}>
              <div className="mx-auto mt-16 max-w-3xl">
                <p className="text-eyebrow text-faint">
                  What it quietly costs
                </p>
                <p className="text-body-lg mt-4 text-muted">
                  The work remains alive. But the commercial cycle stays
                  incomplete:
                </p>
                {/* One column, not two. Six short phrases of uneven length in a
                    2-up grid left a ragged orphan on the last row; stacked, they
                    read as a list of losses accumulating, which is the point. */}
                <ul className="mt-6 list-none">
                  {RECOGNITION_CONSEQUENCES.map((line) => (
                    <li
                      key={line}
                      className="border-t border-line py-3 text-muted"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* The reinforcing loop. Set as a wrapping chain of small steps
                rather than a bordered card: the point is that it never stops
                and comes back around, which a boxed panel contradicts. */}
            {/* The loop, drawn rather than described.

                This is the one idea on the page that is genuinely circular:
                each step feeds the next and the last returns to the first. As
                a wrapping line of text with arrows it read as a list that
                happened to end with a curved arrow; as a ring the "it comes
                back" claim is visible before a word is read. Six nodes on a
                circle, arrowheads following the direction of travel, and the
                closing arc drawn in the accent so the return is the emphasised
                edge.

                Hand-authored inline SVG: currentColor for strokes and text so
                it themes with the page, one literal accent on the closing edge,
                role="img" + aria-label carrying the same claim for anyone who
                cannot see it. */}
            <Reveal delay={130}>
              <figure className="mx-auto mt-14 max-w-3xl">
                <p className="text-eyebrow text-center text-faint">
                  Then the loop closes
                </p>
                <svg
                  viewBox="0 0 820 470"
                  role="img"
                  aria-label="A closed cycle of six steps: the pipeline becomes quiet, revenue pressure rises, selling becomes urgent, the next conversation carries more weight, action finally arrives under pressure, pressure receives the credit, and the cycle returns to the beginning."
                  className="mt-6 h-auto w-full text-muted"
                >
                  <defs>
                    <marker
                      id="loop-arrow"
                      viewBox="0 0 10 10"
                      refX="9"
                      refY="5"
                      markerWidth="5"
                      markerHeight="5"
                      orient="auto-start-reverse"
                    >
                      <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
                    </marker>
                  </defs>

                  {/* Six connecting arcs around a 150px-radius circle centred
                      at (310,190). Each spans the gap between two nodes. */}
                  {RECOGNITION_LOOP.map((_, i) => {
                    const n = RECOGNITION_LOOP.length;
                    const gap = 0.34; // radians trimmed at each end for the node
                    const a0 = (i / n) * Math.PI * 2 - Math.PI / 2 + gap;
                    const a1 = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2 - gap;
                    const r = 140;
                    const x0 = 410 + r * Math.cos(a0);
                    const y0 = 215 + r * Math.sin(a0);
                    const x1 = 410 + r * Math.cos(a1);
                    const y1 = 215 + r * Math.sin(a1);
                    const last = i === n - 1;
                    return (
                      <path
                        key={i}
                        d={`M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={last ? 2 : 1.25}
                        className={last ? "text-signal" : "text-line"}
                        markerEnd="url(#loop-arrow)"
                        opacity={last ? 1 : 0.75}
                      />
                    );
                  })}

                  {/* Nodes: a numbered dot plus the step, set on two lines so
                      long phrases do not collide with their neighbours. */}
                  {RECOGNITION_LOOP.map((step, i) => {
                    const n = RECOGNITION_LOOP.length;
                    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
                    const x = 410 + 140 * Math.cos(a);
                    const y = 215 + 140 * Math.sin(a);
                    // Push labels outward, away from the ring's centre. The
                    // viewBox carries ~190px of runway each side and ~60px top
                    // and bottom so no label is ever clipped.
                    const lx = 410 + 168 * Math.cos(a);
                    const ly = 215 + 168 * Math.sin(a);
                    const anchor =
                      Math.abs(Math.cos(a)) < 0.25
                        ? "middle"
                        : Math.cos(a) > 0
                          ? "start"
                          : "end";
                    const words = step.split(" ");
                    const mid = Math.ceil(words.length / 2);
                    const l1 = words.length > 3 ? words.slice(0, mid).join(" ") : step;
                    const l2 = words.length > 3 ? words.slice(mid).join(" ") : "";
                    return (
                      <g key={step}>
                        <circle
                          cx={x}
                          cy={y}
                          r="5"
                          fill="currentColor"
                          className="text-signal"
                        />
                        <text
                          x={lx}
                          y={ly - (l2 ? 6 : 0)}
                          textAnchor={anchor}
                          fontSize="13"
                          fill="currentColor"
                        >
                          {l1}
                        </text>
                        {l2 && (
                          <text
                            x={lx}
                            y={ly + 11}
                            textAnchor={anchor}
                            fontSize="13"
                            fill="currentColor"
                          >
                            {l2}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  <text
                    x="410"
                    y="210"
                    textAnchor="middle"
                    fontSize="13"
                    fill="currentColor"
                    className="text-faint"
                  >
                    and it starts
                  </text>
                  <text
                    x="410"
                    y="228"
                    textAnchor="middle"
                    fontSize="13"
                    fill="currentColor"
                    className="text-faint"
                  >
                    again
                  </text>
                </svg>
                <figcaption className="mx-auto mt-4 max-w-xl text-center text-sm text-faint">
                  Because action finally arrives under pressure, pressure
                  receives the credit. Again.
                </figcaption>
              </figure>
            </Reveal>

            {/* The central reframe: the payoff the whole section builds toward.
                Promoted to text-display so the page has a SECOND peak here (the
                hero is the first). Previously this sat at text-headline, the
                same size as the seven other section headings, which buried the
                one sentence the block exists to deliver. */}
            <Reveal delay={140}>
              {/* Left-aligned, not centred: everything from here to the CTA sits
                  on one left axis, and a centred block in the middle of that
                  descent breaks the column the reader is following. Held at
                  text-headline rather than text-display so five lines of
                  Fraunces stay readable - the emphasis clause carries the peak,
                  the size does not have to. */}
              <p className="text-headline mx-auto mt-20 max-w-3xl">
                The extra value may not only be improving the offer.{" "}
                <span className="text-emphasis">
                  It may be protecting the relationship, the expertise, or the
                  professional identity from receiving a direct market answer.
                </span>
              </p>
            </Reveal>

            {/* The beliefs. Narrowed to 2xl and stripped of cards: these are
                things a reader might quietly recognise in themselves, and a
                2-across grid of hoverable panels turns private admissions into
                a product feature comparison. A single column of hanging quotes
                on a hairline rail lets them be read one at a time. */}
            <Reveal delay={160}>
              <p className="text-body-lg mx-auto mt-16 max-w-2xl text-muted">
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
              <div className="text-body-lg mx-auto mt-12 max-w-2xl space-y-3 text-muted">
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

        {/* ============ Block 05 · Why this is possible now ============
            Two columns: the "why now" narrative on the left, the moments that
            look separate on the right. */}
        <section className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Reveal>
                <ChapterMark>Why now</ChapterMark>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="text-headline mt-5">
                  Separate Business Moments, One Underlying Coaching and
                  Consulting Pattern
                </h2>
              </Reveal>
              <div className="text-body-lg mt-7 space-y-4 text-muted">
                <Reveal delay={100}>
                  <p>Each moment can appear isolated.</p>
                </Reveal>
                <Reveal delay={140}>
                  <p>
                    But when the language, sequence, response, consequence, and
                    interpretation are viewed together, a larger pattern may
                    become easier to see.
                  </p>
                </Reveal>
                <Reveal delay={160}>
                  <p>
                    Technology can help organize those connections with greater
                    consistency.
                  </p>
                </Reveal>
                {/* The technology boundary, stated as the spec requires. */}
                <Reveal delay={180}>
                  <p>Not to tell you what your practice needs.</p>
                </Reveal>
                <Reveal delay={200}>
                  <p>Not to determine the truth about your identity.</p>
                </Reveal>
                <Reveal delay={220}>
                  <p>
                    Not to replace market evidence, professional judgment, or
                    human support.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={240}>
                <p className="text-body-lg mt-8 text-muted">To help reflect:</p>
              </Reveal>
              <ul className="mt-5 grid list-none gap-3">
                {WHAT_IT_REFLECTS.map((line, i) => (
                  <Reveal as="li" key={line} delay={260 + i * 30}>
                    <div className="flex items-start gap-3">
                      <span className="list-dot mt-2.5 shrink-0" aria-hidden />
                      <p className="text-muted">{line}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>

              <Reveal delay={300}>
                <div className="text-title mt-10 space-y-3 border-l-2 border-signal pl-6 leading-relaxed">
                  <p>The technology helps reveal the pattern.</p>
                  <p className="text-emphasis">You decide what it means.</p>
                  <p>Your actions create the evidence that matters.</p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <div className="rounded-2xl border border-line bg-card p-7 sm:p-8">
                <p className="text-eyebrow text-faint">
                  Moments that may feel unrelated
                </p>
                <ul className="mt-6 grid list-none gap-4">
                  {SEPARATE_PATTERNS.map((pair, i) => (
                    <Reveal as="li" key={pair.a} delay={140 + i * 40}>
                      <div className="rounded-xl border border-line bg-surface-2 px-4 py-4">
                        <p className="text-sm font-medium text-fg">{pair.a}</p>
                        <p className="mt-1.5 flex items-start gap-2 text-sm text-muted">
                          <span className="text-signal" aria-hidden>
                            &darr;
                          </span>
                          <span>{pair.b}</span>
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ Block 06 · The Pattern-to-Belief Map ============ */}
        <section className="relative overflow-hidden border-t border-line bg-surface">
          <div className="section-orbs" aria-hidden />
          <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
            {/* Sticky two-column instead of a centred header over a tall
                column. Nine of thirteen sections opened centred, so the page
                had no change of shape to hold the eye; here the heading pins
                while the five stages travel past it, which also keeps the
                reader oriented in a long sequence. Collapses to normal stacked
                flow below lg. */}
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Reveal>
                  <ChapterMark>The mechanism</ChapterMark>
                </Reveal>
                <Reveal delay={60}>
                  <h2 className="text-headline mt-5">
                    Your Coaches and Consultants Belief Score Creates a
                    Pattern-to-Belief Map
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="text-body-lg mt-6 text-muted">
                    Not another business archetype, marketing personality, or
                    readiness label. One pattern that matters now, broken into
                    five connected stages.
                  </p>
                </Reveal>
                <Reveal delay={160}>
                  <p className="text-eyebrow mt-8 text-faint">
                    Five stages
                  </p>
                </Reveal>
              </div>

            {/* A spine, not a 5-across card row.

                Two reasons the grid was wrong here. First, these five stages are
                a SEQUENCE - each one only makes sense after the one above it -
                and five equal boxes side by side read as five independent
                options. Second, their bodies differ ~3x in length (stage 1
                carries four quoted examples, stage 5 carries one), so equal
                columns forced ragged whitespace under the short ones.

                The rail is the argument made visible: one continuous line with
                the stage number sitting on it. Numbering earns its place here
                because the order genuinely carries meaning. */}
              <ol className="list-none">
              {MAP_STAGES.map((stage, i) => (
                <Reveal as="li" key={stage.title} delay={i * 70}>
                  {/* pb-14 (not pb-9): the gap BETWEEN stages has to be clearly
                      larger than the gaps inside a stage's own body, or the
                      next stage's title reads as another paragraph of the
                      previous one. The numbered node is nudged down slightly to
                      sit on the title's optical centre. */}
                  {/* On phones the node shrinks (h-7) and the gap tightens, so
                      the rail costs ~44px of a 320px viewport instead of ~110px
                      - otherwise the body text was squeezed to a measure barely
                      wider than three words. */}
                  <div className="relative flex gap-4 pb-14 last:pb-0 sm:gap-7">
                    <div className="flex flex-col items-center">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-card text-xs text-faint tabular-nums sm:h-9 sm:w-9 sm:text-sm">
                        {i + 1}
                      </span>
                      {/* The connector stops at the last stage. */}
                      {i < MAP_STAGES.length - 1 && (
                        <span className="mt-3 w-px flex-1 bg-line" aria-hidden />
                      )}
                    </div>
                    <div className="min-w-0 pb-1">
                      <h3 className="text-title">{stage.title}</h3>
                      <div className="map-stage-body mt-3 space-y-3 leading-relaxed text-muted">
                        {stage.body}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
              </ol>
            </div>

            <Reveal delay={120}>
              <CtaBlock
                location="score_definition"
                microcopy="Short guided reflection · Personalized result · No credit card"
                className="mt-16"
              />
            </Reveal>
          </div>
        </section>

        {/* ====== Block 07 · Process demonstration + example result ====== */}
        <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <ChapterMark>From your words to your map</ChapterMark>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="text-headline mt-5">
                See How the Coaches and Consultants Belief Score Works
              </h2>
            </Reveal>
          </div>

          {/* The guided reflection interface, built in-page rather than shown as
              a screenshot.

              The previous capture was from a different AI Merge assessment and
              was disqualified on three counts: it rendered "QUESTION 1 · 5"
              (the spec forbids publishing a question count until one is
              verified), it carried a stray browser-extension icon in the
              textarea, and its copy was generic wellness framing rather than
              coach/consultant framing.

              Building it in JSX keeps the design tokens honest, keeps the copy
              on-message, and cannot leak an unverified fact. Labelled
              illustrative. TODO(launch): swap for a real capture of the approved
              Coaches and Consultants interface. */}
          <Reveal delay={100}>
            <figure className="mx-auto mt-12 max-w-3xl">
              <div className="media-frame overflow-hidden rounded-2xl bg-card">
                {/* Window chrome: the three dots + mono label is the shared
                    product-mock cue used across the other AI Merge funnel
                    pages, so a visitor who has seen one recognises this as the
                    same product family. Rendered in this page's own tokens
                    (line/faint, eyebrow tracking) rather than copied wholesale,
                    which keeps it recognisably the same but not identical. */}
                <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-fg/25" aria-hidden />
                  <span className="h-2.5 w-2.5 rounded-full bg-fg/20" aria-hidden />
                  <span className="h-2.5 w-2.5 rounded-full bg-fg/15" aria-hidden />
                  <span className="text-eyebrow ml-2 text-faint">
                    Guided reflection
                  </span>
                  <span className="ml-auto hidden text-xs text-faint sm:inline">
                    Answer in your own words
                  </span>
                </div>
                {/* Two-column body, mirroring the shared reflection graphic:
                    prompt + answer field on the left, a quiet guidance rail on
                    the right. The graphic's "QUESTION 1 · 5" counter is NOT
                    reproduced - the spec forbids publishing a question count
                    until one is verified - and the stage kicker carries the
                    orientation instead. */}
                <div className="grid gap-7 px-6 py-7 sm:px-8 sm:py-9 lg:grid-cols-[1.35fr_1fr] lg:gap-9">
                  <div className="min-w-0">
                    <p className="text-eyebrow text-faint">
                      Stage 1 · The repeated moment
                    </p>
                    <p className="text-title mt-3">
                      Think of one moment that keeps repeating in your practice.
                      What happens, and what do you tend to do next?
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-faint">
                      Not a one-word label. Tell it the way you would say it out
                      loud. There is no perfect wording, and messy answers are
                      fine.
                    </p>
                    {/* Static mock of the answer field: a div, not an input, so
                        nothing here is focusable or submittable. */}
                    <div
                      aria-hidden
                      className="mt-6 rounded-xl border border-(--border-strong) bg-bg px-5 py-4"
                    >
                      <p className="text-muted">
                        &ldquo;The conversation goes well, but when it&rsquo;s
                        time to actually recommend the offer, I start explaining
                        more and adding things instead of just naming the next
                        step.&rdquo;
                        <span className="ml-0.5 inline-block h-5 w-px translate-y-1 bg-signal" />
                      </p>
                    </div>
                  </div>

                  <div className="min-w-0 space-y-4">
                    <blockquote className="border-l-2 border-signal pl-4 text-sm leading-relaxed text-muted italic">
                      &ldquo;The constraint is almost never where it appears to
                      be.&rdquo;
                    </blockquote>
                    <div className="rounded-xl border border-line bg-surface-2 px-4 py-3.5">
                      <p className="text-sm leading-relaxed text-muted">
                        <span className="font-medium text-fg">Tip:</span> say it
                        out loud if you can. Spoken answers tend to go further
                        than typed ones.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <figcaption className="mt-3 text-center text-sm text-faint">
                Illustrative interface. The reflection is short and guided; you
                answer in plain language, and no business jargon is required.
              </figcaption>
            </figure>
          </Reveal>

          {/* Asymmetric: the left column is six short steps, the right is one
              long result panel that runs ~1.6x its height. An even 2-col split
              left a large void under the timeline, so the narrative column is
              held narrower and the panel given the extra width it actually
              needs. `items-start` keeps both pinned to the top rather than
              stretching the short column. */}
          <div className="mt-14 grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Process: participant language becomes the map, step by step. */}
            <ol className="relative list-none space-y-0">
              {PROCESS_STEPS.map((step, i) => (
                <Reveal as="li" key={step.title} delay={i * 50}>
                  {/* Same spacing rule as the Block 06 spine: the gap between
                      steps must beat the gaps inside a step's body, or each
                      title reads as a continuation of the step above it. */}
                  <div className="relative flex gap-4 pb-12 last:pb-0 sm:gap-5">
                    <div className="flex flex-col items-center">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-card text-xs text-faint tabular-nums sm:h-8 sm:w-8">
                        {i + 1}
                      </span>
                      {i < PROCESS_STEPS.length - 1 && (
                        <span className="mt-2.5 w-px flex-1 bg-line" aria-hidden />
                      )}
                    </div>
                    <div className="min-w-0 pb-1">
                      <h3 className="text-title">{step.title}</h3>
                      <div className="map-stage-body mt-2.5 space-y-2 leading-relaxed text-muted">
                        {step.body}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>

            {/* Illustrative result panel.
                Treatment borrowed from the shared funnel report graphic: window
                chrome, a titled header row with a "Sample" pill, then one
                numbered row per field on hairline dividers. The NUMBERS and
                PROGRESS BARS from that graphic are deliberately not carried
                over - they belong to a 0-100 scored index, and this product
                returns no score. The spec's product-visual rules require the
                five Map fields and forbid fake diagnostic scoring, so the
                layout is shared and the content stays true. */}
            <Reveal delay={100}>
              <figure className="vsl-frame relative overflow-hidden rounded-2xl bg-card">
                <div className="flex items-center gap-2 border-b border-line px-6 py-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-fg/25" aria-hidden />
                  <span className="h-2.5 w-2.5 rounded-full bg-fg/20" aria-hidden />
                  <span className="h-2.5 w-2.5 rounded-full bg-fg/15" aria-hidden />
                  <span className="text-eyebrow ml-2 truncate text-faint">
                    Your Pattern-to-Belief Map
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 border-b border-line px-6 py-4">
                  <div className="min-w-0">
                    <h3 className="text-title">Your result</h3>
                    <p className="text-eyebrow mt-1 text-faint">
                      Built from your own words
                    </p>
                  </div>
                  <span className="cred-chip shrink-0 !py-1.5 !text-xs">
                    Sample
                  </span>
                </div>

                <dl className="list-none">
                  {EXAMPLE_RESULT.map((row, i) => (
                    <div
                      key={row.label}
                      className="flex gap-4 border-b border-line px-6 py-5 last:border-b-0"
                    >
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-xs text-faint tabular-nums"
                        aria-hidden
                      >
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <dt className="text-eyebrow text-signal">{row.label}</dt>
                        <dd className="map-stage-body mt-1.5 leading-relaxed text-muted">
                          {row.body}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </figure>
            </Reveal>
          </div>

          {/* The downloadable summary only. The scored report itself already
              leads Block 02 ("What you receive"); repeating it here showed the
              same artifact twice within one scroll. This is the other half of
              what gets delivered - the version you keep - so it still earns a
              place, just not a duplicated one.

              NOTE ON CONTENT: this is a capture of the current live report, so
              the wording inside it is that product's rather than final
              coach-specific copy. TODO(launch): replace with the approved
              Coaches and Consultants capture. */}
          <Reveal delay={160}>
            <figure className="mx-auto mt-10 max-w-3xl">
              <div className="media-frame overflow-hidden rounded-2xl bg-card">
                <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-fg/25" aria-hidden />
                  <span className="h-2.5 w-2.5 rounded-full bg-fg/20" aria-hidden />
                  <span className="h-2.5 w-2.5 rounded-full bg-fg/15" aria-hidden />
                  <span className="text-eyebrow ml-2 truncate text-faint">
                    Your summary, ready to keep
                  </span>
                </div>
                <Image
                  src="/graphics/reportpdf.png"
                  alt="Example of the downloadable AI Merge report summary"
                  width={988}
                  height={769}
                  sizes="(min-width: 1024px) 768px, 100vw"
                  className="block h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 text-center text-sm text-faint">
                The same result, as a summary you can keep and share
              </figcaption>
            </figure>
          </Reveal>

          <div className="mx-auto mt-14 max-w-2xl text-center">
            <Reveal>
              <p className="text-title">
                Your result will be created from your own words.
              </p>
            </Reveal>
            <Reveal delay={60}>
              <p className="text-body-lg mt-5 text-muted">
                This example does not predict your result. Your
                Pattern-to-Belief Map may identify a different moment, belief,
                loop, and next evidence. You may accept, refine, question, or
                reject any part of it.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <CtaBlock location="sample_result" className="mt-10" />
            </Reveal>
          </div>
        </section>

        {/* ============== Block 08 · Identity transition ==============
            Deeper value without promising total business transformation. */}
        <section className="border-t border-line bg-surface">
          <div className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <Reveal>
                <ChapterMark>What becomes possible</ChapterMark>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="text-headline mt-5">
                  The Goal Is Not to Turn You Into a Salesperson
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="text-body-lg mt-6 text-muted">
                  It is not to stop caring. It is not to abandon depth. It is
                  not to turn every conversation into a pitch. It is not to
                  standardize work that genuinely requires judgment. It is not
                  to remove human presence from coaching or consulting.
                </p>
              </Reveal>
              <Reveal delay={140}>
                <p className="text-body-lg mt-6 font-medium text-fg">
                  It is to stop treating one repeated commercial moment as proof
                  that care and clarity cannot coexist.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <p className="text-body-lg mt-6 text-muted">
                  A different response may look like:
                </p>
              </Reveal>
            </div>

            {/* Unnumbered. These eight are ALTERNATIVES a reader might pick one
                of - they have no order, no dependency, and no progression - so
                01/02/03 markers asserted a sequence that does not exist. The
                accent tick marks each as an available option instead, which is
                what the copy actually means. */}
            <ul className="mt-12 grid list-none gap-4 sm:grid-cols-2">
              {FIRST_SHIFTS.map((line, i) => (
                <Reveal as="li" key={line} delay={i * 60}>
                  <div className="liftable flex h-full items-start gap-3.5 rounded-2xl border border-line bg-card p-6">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                      className="mt-1 shrink-0 text-signal"
                    >
                      <path
                        d="M4 12.5 9.5 18 20 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="leading-relaxed text-muted">{line}</span>
                  </div>
                </Reveal>
              ))}
            </ul>

            <div className="mx-auto mt-14 max-w-2xl text-center">
              <Reveal delay={160}>
                <p className="text-body-lg text-muted">
                  You let a prospect say yes, no, or not now without turning the
                  answer into a verdict about your worth or methodology.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="text-headline mt-8 space-y-2">
                  <p>Selling does not have to erase service.</p>
                  <p>Simplicity does not have to erase depth.</p>
                  <p>Scale does not have to erase discernment.</p>
                  <p className="text-emphasis">
                    Receiving value does not make the work less ethical.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={240}>
                <p className="text-body-lg mt-8 text-muted">
                  One different action does not rewrite a professional identity.
                  But it can begin creating evidence that another version of the
                  pattern is available.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ==== Block 09 · Founder, credentials, and logos ==== */}
        <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-line">
                <Image
                  src="/manuj/closeup.jpg"
                  alt="Manuj Aggarwal, creator of AI Merge"
                  width={1400}
                  height={1867}
                  sizes="(min-width: 1024px) 430px, 100vw"
                  className="h-96 w-full object-cover object-top lg:h-136"
                />
              </div>
            </Reveal>

            <div className="min-w-0">
              {/* Retitled and refocused. The spec's own heading was "Why I
                  Created AI Merge", which makes the section about the founder
                  rather than about the reader; the owners flagged it. The
                  section stays (Block 09 exists to connect Manuj's lived
                  experience to the product) but now leads with the coach and
                  consultant relevance, and the backstory is compressed so the
                  factory/Canada detail serves the selling-vs-building pattern
                  instead of standing as a general biography. */}
              <Reveal>
                <ChapterMark>Why AI Merge exists</ChapterMark>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="text-headline mt-5">
                  Why This Work Exists
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <blockquote className="text-emphasis mt-7 text-xl leading-relaxed">
                  &ldquo;I knew how to create transformation. I did not always
                  see the belief deciding when that work could be priced,
                  received, simplified, or carried by someone other than
                  me.&rdquo;
                </blockquote>
              </Reveal>
              {/* v2.1 cut the extended founder narrative to a short relevance
                  statement. Personal history is not this block's persuasive
                  job: the visitor needs one passage proving the creator has
                  stood inside the same commercial moment, then credentials,
                  then out. Per the spec, do NOT reintroduce life history,
                  origin narrative, career chronology, or a personal
                  transformation arc here. */}
              <div className="text-body-lg mt-7 space-y-4 text-muted">
                <Reveal>
                  <p>
                    Across three decades of consulting, advising, and building
                    companies, the same gap kept appearing, in my own work and
                    in the work of the experts around me.
                  </p>
                </Reveal>
                <Reveal delay={40}>
                  <p>
                    Knowing how to solve the problem is one capability. Letting
                    the work be priced, simplified, delegated, and directly
                    offered is a different one.
                  </p>
                </Reveal>
                <Reveal delay={80}>
                  <p>
                    Understanding the commercial behavior did not automatically
                    reveal what the repeated moment had taught me to believe.
                    That gap is what{" "}
                    <span className="font-medium text-fg">AI Merge</span> was
                    built to make visible, then return authority to the person
                    examining it.
                  </p>
                </Reveal>
              </div>
              <Reveal delay={140}>
                <p className="mt-6 font-medium text-fg">Manuj Aggarwal</p>
              </Reveal>

              <Reveal delay={160}>
                <div className="mt-10 rounded-2xl border border-line bg-card p-7">
                  <p className="text-eyebrow text-faint">About the Creator</p>
                  {/* Label above value, with an icon, rather than a bulleted
                      list: these are four discrete facts, and a stat row lets
                      each be read on its own instead of scanned as prose. */}
                  <ul className="mt-5 grid list-none gap-x-6 gap-y-5 sm:grid-cols-2">
                    {CREDENTIALS.map((c, i) => {
                      const Icon = CREDENTIAL_ICONS[i];
                      return (
                        <li key={c.label} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-signal">
                            <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                          </span>
                          <span className="min-w-0">
                            <span className="text-eyebrow block text-faint">
                              {c.label}
                            </span>
                            <span className="mt-1 block text-sm leading-snug text-fg">
                              {c.value}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="mt-5 text-sm leading-relaxed text-faint">
                    AI Merge combines AI-supported pattern recognition with a
                    human-first methodology designed to support insight,
                    self-attunement, practical action, and greater personal
                    agency.
                  </p>
                  {/* TODO(launch): verify current title, patent wording,
                      publication wording, approved "peer-reviewed" wording,
                      methodology wording, and the "three decades" timeframe in
                      the relevance statement above - v2.1 added that last one
                      to the verification register explicitly, so it must be
                      confirmed against the company record before publication. */}
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal delay={100}>
            <div className="mt-16">
              <p className="text-eyebrow text-center text-faint">
                Professional Experience Behind AI Merge
              </p>
              <ul className="mt-8 flex list-none flex-wrap items-center justify-center gap-x-12 gap-y-6">
                {TRUST_LOGOS.map((logo) => (
                  <li
                    key={logo.alt}
                    className="relative h-9 w-24 opacity-60 grayscale sm:h-10 sm:w-28"
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
                Consultants Belief Score, AI Merge, TetraNoodle Technologies, or
                this offer.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ========= Block 10 · Participant proof ========= */}
        <section className="border-t border-line bg-surface">
          <div className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <Reveal>
                <p className="chapter justify-center text-eyebrow">
                  <span className="chapter-dot" aria-hidden />
                  <span>In their words</span>
                </p>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="text-headline mt-5">
                  What People Have Noticed Working Through AI Merge
                </h2>
              </Reveal>
            </div>

            {/* TODO(launch): verify exact wording, name or approved anonymity,
                professional role, program referenced, written consent, and
                display restrictions for each statement below. */}
            <ul className="mt-12 grid list-none gap-5 md:grid-cols-2">
              {TESTIMONIALS.map((t, i) => (
                <Reveal as="li" key={t.name} delay={i * 80}>
                  <figure className="liftable flex h-full flex-col rounded-2xl border border-line bg-card p-8">
                    <blockquote className="text-title flex-1">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-2.5 text-sm">
                      <span className="list-dot shrink-0" aria-hidden />
                      <span className="font-medium text-fg">{t.name}</span>
                      <span className="text-faint">· {t.role}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </ul>

            {/* Video proof reel. These clips are general AI Merge participants,
                NOT coaches and consultants specifically, and they speak to the
                broader programme rather than to the free Belief Score. The
                disclaimer below says exactly that rather than implying they are
                proof of this product for this audience.
                TODO(launch): replace with coach/consultant clips carrying
                written consent for this funnel, per the spec's proof register. */}
            <div className="mt-16">
              <Reveal delay={100}>
                <p className="text-eyebrow text-center text-faint">
                  More in their own words
                </p>
              </Reveal>
              <Reveal immediate>
                <div className="mt-7">
                  <TestimonialReel />
                </div>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-faint">
                Individual experiences vary. These accounts reflect personal
                experiences across the broader AI Merge work rather than the
                free Coaches and Consultants Belief Score, and are not
                necessarily from coaches or consultants. They do not guarantee
                that another participant will receive the same result or
                business outcome.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ==== Block 11 · Existing support and differentiation ==== */}
        <section className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <ChapterMark>Keep what helps</ChapterMark>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="text-headline mt-5">
                This Is Not Another Sales Script, Marketing System, or AI Tool
              </h2>
            </Reveal>
            <div className="text-body-lg mt-9 space-y-4 text-muted">
              <Reveal>
                <p>
                  A better offer may improve conversion. Sales training may
                  improve commercial conversations. A CRM may improve follow-up.
                  A content system may improve visibility. A business coach may
                  improve strategy and accountability. A consultant may improve
                  positioning, pricing, operations, or distribution.
                </p>
              </Reveal>
              <Reveal delay={40}>
                <p>
                  Professional supervision may protect quality and ethics.
                  Financial and legal advice may protect the business. AI tools
                  may improve research, preparation, synthesis, documentation,
                  and delivery. A team may create leverage.
                </p>
              </Reveal>
              <Reveal delay={80}>
                <p className="font-medium text-fg">Keep what helps.</p>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <p className="text-headline mt-9">
                <span className="text-emphasis">
                  What happens inside the moment when you already know the next
                  useful business action?
                </span>
              </p>
            </Reveal>
          </div>

          {/* Comparison: a real two-column table from md up, stacked cards on
              mobile (spec requirement, so nothing scrolls horizontally). */}
          {/* Asymmetric split, not 50/50. The left column is two or three words
              and the right is a full sentence, so equal columns left half the
              table empty and forced the right column to wrap early. A narrow
              label column against a wide one matches the actual content, and
              dropping the card background lets the rules carry the structure -
              a table does not need to sit on a panel to read as a table. */}
          <Reveal delay={160}>
            <div className="mt-12 border-t border-line">
              <div className="hidden border-b border-line py-4 md:grid md:grid-cols-[minmax(0,13rem)_auto_1fr] md:gap-x-6">
                <p className="text-eyebrow text-faint">Existing support</p>
                <span aria-hidden />
                <p className="text-eyebrow text-signal">
                  What the Belief Score examines
                </p>
              </div>
              {/* A chevron sits in the gutter of every row. The table's whole
                  argument is that these are two LAYERS - the tool you already
                  use, and the belief operating underneath it - and the mark
                  makes the crossing visible instead of leaving two columns to
                  imply it. Hidden below md, where the row stacks and the
                  eyebrow already labels the second half. */}
              <ul className="list-none">
                {DIFFERENTIATION.map((row) => (
                  <li
                    key={row.support}
                    className="border-b border-line py-5 md:grid md:grid-cols-[minmax(0,13rem)_auto_1fr] md:items-baseline md:gap-x-6"
                  >
                    <p className="font-medium text-fg">{row.support}</p>
                    <ArrowRight
                      className="hidden h-4 w-4 shrink-0 translate-y-0.5 text-signal/60 md:block"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <p className="mt-1.5 leading-relaxed text-muted md:mt-0">
                      {row.examines}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="mx-auto mt-12 max-w-2xl">
            <Reveal>
              <p className="text-body-lg text-muted">
                The score does not replace these forms of support. It examines
                how a repeated belief may influence whether useful tools are
                applied, resisted, overcomplicated, repeatedly replaced, or used
                to postpone a more exposed action.
              </p>
            </Reveal>
            <Reveal delay={60}>
              <div className="text-title mt-8 space-y-2 border-l-2 border-signal pl-6">
                <p>Keep what helps.</p>
                <p className="text-emphasis">
                  This is an additional layer, not a replacement.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== Block 12 · How it works + essential questions ===== */}
        <section className="border-t border-line bg-surface">
          <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <Reveal>
                <ChapterMark>The process</ChapterMark>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="text-headline mt-5">
                  How the Coaches and Consultants Belief Score Works
                </h2>
              </Reveal>
            </div>

            <ol className="mt-12 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {HOW_STEPS.map((step, i) => {
                const Icon = HOW_STEP_ICONS[i];
                return (
                  <Reveal as="li" key={step.title} delay={i * 60}>
                    <div className="liftable flex h-full flex-col rounded-2xl border border-line bg-card p-7">
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface-2 text-signal">
                          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                        </span>
                        <span className="text-eyebrow text-faint tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="text-title mt-5">{step.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {step.body}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </ol>

            {/* The two ends of the flow, as real captures: where you begin and
                what the guided reflection looks like a few steps in. Same
                window-chrome frame as the result captures above.

                NOTE ON CONTENT: both are from the current live AI Merge
                assessment, so the on-screen copy (and the step counter visible
                in the second) belongs to that product rather than to
                coach-specific wording. Published on instruction and captioned
                as illustrative. TODO(launch): replace with captures of the
                approved Coaches and Consultants flow. */}
            <Reveal delay={90}>
              <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
                <figure>
                  <div className="media-frame overflow-hidden rounded-2xl bg-card">
                    <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-fg/25" aria-hidden />
                      <span className="h-2.5 w-2.5 rounded-full bg-fg/20" aria-hidden />
                      <span className="h-2.5 w-2.5 rounded-full bg-fg/15" aria-hidden />
                      <span className="text-eyebrow ml-2 truncate text-faint">
                        Step one · Getting started
                      </span>
                    </div>
                    <Image
                      src="/graphics/audience.png"
                      alt="The opening screen of the AI Merge reflection, asking who is taking it and which path to follow"
                      width={1880}
                      height={892}
                      sizes="(min-width: 768px) 560px, 100vw"
                      className="block h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-3 text-center text-sm text-faint">
                    Where you begin
                  </figcaption>
                </figure>

                <figure>
                  <div className="media-frame overflow-hidden rounded-2xl bg-card">
                    <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-fg/25" aria-hidden />
                      <span className="h-2.5 w-2.5 rounded-full bg-fg/20" aria-hidden />
                      <span className="h-2.5 w-2.5 rounded-full bg-fg/15" aria-hidden />
                      <span className="text-eyebrow ml-2 truncate text-faint">
                        Working through the reflection
                      </span>
                    </div>
                    <Image
                      src="/graphics/beat.png"
                      alt="A later screen in the AI Merge reflection, showing progress through the questions"
                      width={1879}
                      height={891}
                      sizes="(min-width: 768px) 560px, 100vw"
                      className="block h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-3 text-center text-sm text-faint">
                    Working through it, one prompt at a time
                  </figcaption>
                </figure>
              </div>
            </Reveal>

            {/* Step 1's example patterns: this list is what keeps the page
                coherent for every approved ad angle (ad-to-page continuity). */}
            <Reveal delay={100}>
              <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-line bg-card p-7 sm:p-8">
                <p className="text-eyebrow text-faint">
                  For example, one pattern such as
                </p>
                <ul className="mt-5 flex list-none flex-wrap gap-2.5">
                  {EXAMPLE_PATTERNS.map((p) => (
                    <li key={p}>
                      <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3.5 py-2 text-sm text-muted">
                        <span className="list-dot shrink-0" aria-hidden />
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-faint">
                  Not your entire business. One pattern.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className="text-body-lg mx-auto mt-10 max-w-xl text-center text-muted">
                The result is a hypothesis for reflection. You remain the
                authority on your business and experience.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <CtaBlock location="how_it_works" className="mt-10" />
            </Reveal>

            {/* Essential questions: closed by default, one open at a time
                (native exclusive accordion via the shared name attribute).
                Every categorical disclaimer lives here. */}
            <div className="mx-auto mt-20 max-w-2xl">
              <Reveal>
                <h2 className="text-headline text-center">
                  Essential Questions
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <div className="mt-10">
                  {/* Rendered from lib/faq.ts, which is also what generates the
                      FAQPage JSON-LD above. One array, so the markup an answer
                      engine reads and the copy a visitor sees cannot diverge. */}
                  {ESSENTIAL_FAQS.map((faq) => (
                    <FaqItem key={faq.q} question={faq.q}>
                      {faq.a.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </FaqItem>
                  ))}
                  <FaqItem question="View research, privacy, technology, and professional-boundary details">
                    <h3 className="text-title">Research Foundation</h3>
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
                      This does not mean belief is the sole cause of a
                      commercial or professional outcome. The AI Merge
                      methodology combines established scientific principles
                      with a proprietary interpretive framework. The Coaches and
                      Consultants Belief Score should be treated as a reflective
                      and educational tool unless direct validation research
                      establishes stronger claims.
                    </p>
                    {/* TODO(launch): insert approved public research summary,
                        source register, exact publication wording, approved
                        "peer-reviewed" wording, and the distinction between
                        established research, AI Merge interpretation, and
                        product-specific evidence. */}

                    <h3 className="text-title">
                      How Technology Supports the Result
                    </h3>
                    <p>
                      The system uses the information you provide to organize
                      what happened, what you did next, what the moment may have
                      come to mean, what belief may have formed or become
                      reinforced, how the loop may continue, and what another
                      response could look like.
                    </p>
                    <p>
                      The system does not independently know your full business.
                      It does not access your CRM, client files, financial
                      accounts, private communications, or business systems
                      unless a future product explicitly requests and discloses
                      such access.
                    </p>

                    <h3 className="text-title">Privacy and Data</h3>
                    {/* TODO(launch): verify and disclose what information is
                        collected, why, where it is stored, retention period,
                        whether humans may review it, which vendors process it,
                        whether it is used for model or system improvement,
                        whether it is sold or shared, deletion and access
                        procedures, and marketing-consent behavior. */}
                    <p>
                      Before publication, the published policy discloses what
                      information is collected, why it is collected, where it is
                      stored, the retention period, whether humans may review
                      it, which vendors process it, whether it is used for model
                      or system improvement, whether it is shared, deletion and
                      access procedures, and marketing-consent behavior.
                    </p>

                    <h3 className="text-title">Professional Boundaries</h3>
                    <p>
                      The Coaches and Consultants Belief Score is not business
                      consulting, legal advice, tax advice, financial advice,
                      investment advice, employment advice, professional
                      supervision, medical advice, mental-health treatment,
                      diagnosis, psychotherapy, or crisis support. It is not a
                      guarantee of clients, revenue, pricing, scale, or business
                      outcomes.
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
                <p className="mt-8 text-center text-sm text-faint">
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
        </section>

        {/* ================= Block 13 · Final CTA ================= */}
        <section className="border-t border-line">
          <div className="mx-auto w-full max-w-2xl px-5 py-24 text-center sm:px-8 sm:py-32">
            <Reveal>
              <h2 className="text-display">
                Coaches and consultants: you already know what the pattern
                keeps doing.{" "}
                <span className="text-emphasis">
                  Now see what it may have taught you to believe.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-body-lg mt-8 text-muted">
                Choose one recurring pattern. Describe what happens in your own
                words. Receive your personalized{" "}
                <span className="font-medium text-fg">Pattern-to-Belief Map</span>{" "}
                showing:
              </p>
            </Reveal>
            <Reveal delay={120}>
              <ul className="mx-auto mt-8 grid max-w-xl list-none gap-3 text-left">
                {MAP_FIELDS.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="list-dot mt-2.5 shrink-0" aria-hidden />
                    <span className="text-body-lg text-muted">{item.title}</span>
                  </li>
                ))}
              </ul>
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
      {/* Block 14 lives in SiteFooter. */}
      <SiteFooter />
      <MobileStickyCta />
    </>
  );
}
