import Image from "next/image";
import Link from "next/link";
// NOTE: `react-dom` is imported again for ReactDOM.preload when the approved
// VSL poster lands - see the TODO(launch) in Home() below.
import { FaqItem } from "@/components/faq-item";
import { LandingAnalytics } from "@/components/landing-analytics";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { Reveal } from "@/components/reveal";
import { ScorecardCta } from "@/components/scorecard-cta";
import { SectionViewTracker } from "@/components/section-view-tracker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
// `videoNode` is deliberately not imported: there is no approved Coaches and
// Consultants VSL yet, so the hero renders a placeholder and the page must not
// claim a VideoObject. Re-import it alongside the approved cut.
import {
  PageStructuredData,
  howToNode,
  publicationNode,
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
  "the repeated moment",
  "a possible belief",
  "the reinforcing loop",
  "the moment to watch",
  "the next evidence",
];

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
    lead: "The conversation went well. The prospect has shown interest. The next step is available.",
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
  "You let one offer remain stable long enough to receive market evidence.",
  "You distinguish client value from unlimited access to you.",
  "You define one repeatable delivery component without removing judgment.",
  "You use AI for one measured workflow instead of endless experimentation.",
  "You delegate with clear standards and allow the task to remain with its owner.",
];

/* Block 09: compact credential list. TODO(launch): verify exact approved
   wording for title, patents, and publication. */
const CREDENTIALS = [
  "Founder and CIO, TetraNoodle Technologies",
  "Creator of AI Merge",
  "AI innovator, entrepreneur, and technology leader",
  "Holder of four patents",
  "Published in the Mensa Research Journal",
];

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
const HOW_STEPS = [
  {
    title: "Choose One Pattern",
    body: "Focus on one business situation that matters now, not your entire business. One pattern.",
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

function ChapterMark({ children }: { children: React.ReactNode }) {
  return (
    <p className="chapter text-eyebrow">
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
  // LCP preload for the hero VSL poster is disabled while no approved Coaches
  // and Consultants cut exists: the hero renders a text placeholder, so there
  // is no poster image to fetch. The old preload pointed at a file that has
  // since been quarantined (it was the B2B healthcare poster), which meant
  // every page load fired a request that 404'd.
  //
  // TODO(launch): restore alongside the approved cut, preloading its poster:
  //   ReactDOM.preload(VSL_POSTER, { as: "image", fetchPriority: "high" });
  // Use ReactDOM.preload rather than a literal <link rel="preload">: React
  // hoists a rendered <link> into <head> but ALSO emits its own hint for it,
  // shipping the same preload twice. It is NOT `priority` on a next/image,
  // because a <video> poster never passes through the next/image pipeline.

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
        // `videoNode` is intentionally absent: no approved Coaches and
        // Consultants cut exists yet, so the hero renders a placeholder card
        // rather than a <video>, and a VideoObject would assert media the page
        // does not contain. Re-add it with the approved cut. See
        // components/structured-data.tsx.
        extraNodes={[howToNode, publicationNode]}
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
              <h1 id="hero-headline" className="text-display mt-8">
                You know how to create value.{" "}
                <span className="text-emphasis">
                  But what belief is shaping whether that value becomes visible,
                  sellable, and scalable?
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
        <section className="border-y border-line bg-surface">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
            <SectionViewTracker event="whatyouget_view" />
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
              <div>
                <Reveal>
                  <ChapterMark>What you receive</ChapterMark>
                </Reveal>
                <Reveal delay={60}>
                  <h2 className="text-headline mt-5">
                    A Personalized Reflection Built from the Business Pattern
                    You Describe
                  </h2>
                </Reveal>
                <Reveal delay={100}>
                  <p id="what-you-receive" className="text-body-lg mt-6 text-muted">
                    Your Pattern-to-Belief Map may show: the repeated moment, a
                    possible belief, the reinforcing loop, the moment to watch,
                    and the next evidence.
                  </p>
                </Reveal>
                <ul className="mt-6 grid list-none gap-3.5">
                  {MAP_FIELDS.map((field, i) => (
                    <Reveal as="li" key={field} delay={120 + i * 40}>
                      <div className="flex items-start gap-3">
                        <span className="list-dot mt-2.5 shrink-0" aria-hidden />
                        <p className="text-muted">{field}</p>
                      </div>
                    </Reveal>
                  ))}
                </ul>
                <Reveal delay={200}>
                  <p className="mt-8 text-sm leading-relaxed text-faint">
                    Built from participant language rather than a generic
                    business profile · Created by Manuj Aggarwal · Based on the
                    published AI Merge methodology
                  </p>
                </Reveal>
              </div>

              {/* On-brand result card, an honest in-page product mock (labeled
                  illustrative). TODO(launch): replace with the approved
                  Coaches and Consultants result interface. */}
              <Reveal delay={140}>
                <figure className="vsl-frame relative overflow-hidden rounded-2xl bg-card">
                  <div className="flex items-center justify-between border-b border-line px-6 py-4">
                    <span className="text-eyebrow text-faint">
                      Pattern-to-Belief Map
                    </span>
                    <span className="cred-chip !py-1.5 !text-xs">
                      Illustrative
                    </span>
                  </div>
                  <div className="space-y-5 px-6 py-6">
                    <div>
                      <p className="text-eyebrow text-signal">
                        The Repeated Moment
                      </p>
                      <p className="mt-1.5 text-fg">
                        When a prospect is ready for a clear recommendation,
                        more value is added instead of naming the next step.
                      </p>
                    </div>
                    <div className="hairline" />
                    <div>
                      <p className="text-eyebrow text-signal">
                        A Possible Belief
                      </p>
                      <p className="mt-1.5 text-muted">
                        &ldquo;Helping preserves trust. Selling risks damaging
                        it.&rdquo;
                      </p>
                    </div>
                    <div className="hairline" />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-line bg-surface-2 px-4 py-3">
                        <p className="text-eyebrow text-faint">
                          Moment to watch
                        </p>
                        <p className="mt-1 text-sm text-muted">
                          The urge to add more before stating the
                          recommendation.
                        </p>
                      </div>
                      <div className="rounded-xl border border-line bg-surface-2 px-4 py-3">
                        <p className="text-eyebrow text-faint">Next evidence</p>
                        <p className="mt-1 text-sm text-muted">
                          One conversation ended with a clear recommendation and
                          decision point.
                        </p>
                      </div>
                    </div>
                  </div>
                </figure>
              </Reveal>
            </div>

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
            Direct, respectful, practical, non-defensive. */}
        <section className="mx-auto w-full max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <ChapterMark>Before you scroll past</ChapterMark>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="text-headline mt-5">
                You May Already Be Thinking:
              </h2>
            </Reveal>
            <div className="text-body-lg mt-8 space-y-5 text-muted">
              <Reveal>
                <blockquote className="border-l-2 border-line pl-5 text-fg">
                  &ldquo;My problem is not belief. I need better positioning,
                  stronger acquisition, clearer pricing, or more qualified
                  leads.&rdquo;
                </blockquote>
              </Reveal>
              <Reveal delay={100}>
                <p>That may be true.</p>
              </Reveal>
              <Reveal delay={120}>
                <p>The Coaches and Consultants Belief Score does not replace:</p>
              </Reveal>
            </div>
          </div>

          {/* Set as running text, not pills. This list is a CONCESSION - the
              things the score explicitly does not replace - and a row of
              bordered chips with accent dots reads as a feature list, which
              inverts the meaning. Comma-separated prose keeps it secondary and
              lets the narrower question that follows carry the weight. */}
          <Reveal delay={140}>
            <p className="text-body-lg mx-auto mt-5 max-w-2xl text-muted">
              {NOT_A_REPLACEMENT_FOR.join(", ")}.
            </p>
          </Reveal>

          <div className="mx-auto max-w-2xl">
            <Reveal delay={160}>
              <p className="text-body-lg mt-10 text-muted">
                It asks one narrower question:
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-headline mt-5">
                <span className="text-emphasis">
                  What happens in the moment when you already know the next
                  useful business action, but move back into helping, refining,
                  customizing, explaining, or preparing?
                </span>
              </p>
            </Reveal>
            <div className="text-body-lg mt-9 space-y-3 text-muted">
              <Reveal delay={220}>
                <p>You do not have to accept another label.</p>
              </Reveal>
              <Reveal delay={240}>
                <p>
                  You do not have to treat every commercial problem as an
                  internal problem.
                </p>
              </Reveal>
              <Reveal delay={260}>
                <p className="font-medium text-fg">
                  You only have to decide whether the repeated moment is worth
                  examining.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ Block 04 · Recognition and revelation ============
            ONE dominant pattern: creating more value when the business needs a
            direct invitation. */}
        <section className="border-t border-line bg-surface">
          <div className="mx-auto w-full max-w-5xl px-5 py-24 sm:px-8 sm:py-36">
            <div className="mx-auto max-w-2xl text-center">
              <Reveal>
                <p className="chapter justify-center text-eyebrow">
                  <span className="chapter-dot" aria-hidden />
                  <span>Sound familiar</span>
                </p>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="text-headline mt-5">The Work Is Valuable</h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="text-body-lg mt-6 text-muted">
                  Watch one familiar moment turn back into more value, the same
                  way it does every time.
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
                <p className="text-body-lg text-muted">
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
            <Reveal delay={130}>
              <div className="mx-auto mt-14 max-w-3xl">
                <p className="text-eyebrow text-faint">Then the loop closes</p>
                <p className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-2">
                  {RECOGNITION_LOOP.map((step, i) => (
                    <span key={step} className="inline-flex items-center gap-2.5">
                      <span className="text-fg">{step}</span>
                      {i < RECOGNITION_LOOP.length - 1 && (
                        <span aria-hidden className="text-signal/70">
                          &rarr;
                        </span>
                      )}
                    </span>
                  ))}
                  {/* The loop returning to its start, stated as part of the
                      chain rather than as a footnote under it. */}
                  <span aria-hidden className="text-signal/70">
                    &#8618;
                  </span>
                  <span className="text-faint">back to the beginning</span>
                </p>
                <p className="mt-5 text-sm text-faint">
                  And because action finally arrives under pressure, pressure
                  receives the credit. Again.
                </p>
              </div>
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
                  Patterns That Look Separate Can Now Be Examined Together
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
                  <p>Not to tell you what your business needs.</p>
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
        <section className="border-t border-line bg-surface">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <Reveal>
                <ChapterMark>The mechanism</ChapterMark>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="text-headline mt-5">
                  Your Belief Score Creates a Pattern-to-Belief Map
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="text-body-lg mt-6 text-muted">
                  The score does not give you another business archetype,
                  marketing personality, or readiness label. It focuses on one
                  pattern that matters now, broken into five connected stages.
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
            <ol className="mx-auto mt-14 max-w-3xl list-none">
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

            <Reveal delay={120}>
              <CtaBlock
                location="score_definition"
                microcopy="Short guided reflection · Personalized result · No credit card"
                className="mt-14"
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
                <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
                  <span className="text-eyebrow text-faint">
                    Guided reflection
                  </span>
                  <span className="ml-auto text-xs text-faint">
                    Answer in your own words
                  </span>
                </div>
                <div className="px-6 py-7 sm:px-8 sm:py-9">
                  <p className="text-title">
                    Think of one moment that keeps repeating in your business.
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

            {/* Illustrative result panel, shaped like the live result. */}
            <Reveal delay={100}>
              <div className="relative rounded-2xl border border-line bg-card p-7 sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-title">
                    Example Coaches and Consultants Belief Score Result
                  </h3>
                  <span className="cred-chip shrink-0">
                    Illustrative example
                  </span>
                </div>
                <dl className="mt-8 space-y-6 border-t border-line pt-7">
                  {EXAMPLE_RESULT.map((row) => (
                    <div
                      key={row.label}
                      className="border-t border-line pt-5 first:border-t-0 first:pt-0"
                    >
                      <dt className="text-eyebrow text-signal">{row.label}</dt>
                      <dd className="map-stage-body mt-2 leading-relaxed text-muted">
                        {row.body}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>

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
                  The Goal Is Not to Become More Aggressive
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
              <Reveal>
                <ChapterMark>The person behind it</ChapterMark>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="text-headline mt-5">Why I Created AI Merge</h2>
              </Reveal>
              <Reveal delay={100}>
                <blockquote className="text-emphasis mt-7 text-xl leading-relaxed">
                  &ldquo;I knew how to create value. I did not always see the
                  belief deciding when that value could be sold, received,
                  simplified, or carried by someone other than me.&rdquo;
                </blockquote>
              </Reveal>
              <div className="text-body-lg mt-7 space-y-4 text-muted">
                <Reveal>
                  <p>
                    I began working in a factory in India when I was fifteen. I
                    later rebuilt my life in Canada and built a career across
                    technology, entrepreneurship, artificial intelligence,
                    consulting, and innovation. I learned how to solve difficult
                    problems without being handed a map.
                  </p>
                </Reveal>
                <Reveal delay={40}>
                  <p>
                    That self-made identity created real capability. It also
                    reinforced a familiar response. When pressure increased:
                    build more, learn more, carry more, improve more, create
                    more value.
                  </p>
                </Reveal>
                <Reveal delay={80}>
                  <p>
                    That response produced real results. It did not always
                    reveal what happened when the next level required something
                    different: selling instead of refining, receiving instead of
                    overproving, delegating instead of carrying, simplifying
                    without abandoning depth, allowing a client or market to
                    make a decision.
                  </p>
                </Reveal>
                <Reveal delay={120}>
                  <p>
                    Understanding the visible behavior did not automatically
                    reveal what the repeated moment had taught me to believe.
                    That gap became part of the reason I created{" "}
                    <span className="font-medium text-fg">AI Merge</span>. The
                    goal is not to ask technology to tell people who they are.
                    It is to help make one important pattern visible, then
                    return authority to the person examining it.
                  </p>
                </Reveal>
              </div>
              <Reveal delay={140}>
                <p className="mt-6 font-medium text-fg">Manuj Aggarwal</p>
              </Reveal>

              <Reveal delay={160}>
                <div className="mt-10 rounded-2xl border border-line bg-card p-7">
                  <p className="text-eyebrow text-faint">About the Creator</p>
                  <ul className="mt-4 grid list-none gap-2.5 sm:grid-cols-2">
                    {CREDENTIALS.map((c) => (
                      <li
                        key={c}
                        className="flex items-start gap-2.5 text-sm text-muted"
                      >
                        <span className="list-dot mt-1.5 shrink-0" aria-hidden />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm leading-relaxed text-faint">
                    AI Merge combines AI-supported pattern recognition with a
                    human-first methodology designed to support insight,
                    self-attunement, practical action, and greater personal
                    agency.
                  </p>
                  {/* TODO(launch): verify current title, patent wording,
                      publication wording, approved "peer-reviewed" wording, and
                      methodology wording. */}
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
                  What Participants Have Noticed Through AI Merge
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
                  More from AI Merge participants
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
              <div className="hidden gap-8 border-b border-line py-4 md:grid md:grid-cols-[minmax(0,14rem)_1fr]">
                <p className="text-eyebrow text-faint">Existing support</p>
                <p className="text-eyebrow text-faint">
                  What the Belief Score examines
                </p>
              </div>
              <ul className="list-none">
                {DIFFERENTIATION.map((row) => (
                  <li
                    key={row.support}
                    className="border-b border-line py-5 md:grid md:grid-cols-[minmax(0,14rem)_1fr] md:gap-8"
                  >
                    <p className="font-medium text-fg">{row.support}</p>
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
              {HOW_STEPS.map((step, i) => (
                <Reveal as="li" key={step.title} delay={i * 60}>
                  <div className="liftable h-full rounded-2xl border border-line bg-card p-7">
                    <span className="text-eyebrow text-signal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-title mt-3">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>

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
                You already know what the business pattern keeps doing.{" "}
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
                  <li key={item} className="flex items-start gap-3">
                    <span className="list-dot mt-2.5 shrink-0" aria-hidden />
                    <span className="text-body-lg text-muted">{item}</span>
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
