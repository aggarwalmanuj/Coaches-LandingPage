// Canonical FAQ copy.
//
// Why this is data and not JSX: the essential answers would otherwise exist
// TWICE, once as JSX in app/page.tsx and once as strings in the FAQPage
// JSON-LD, with nothing keeping them in sync. Google treats FAQ markup that
// diverges from visible page content as spam, and an answer engine that quotes
// a sentence a reader cannot find on the page learns to distrust the domain.
// Rendering the accordion AND generating the markup from this one array makes
// divergence structurally impossible.
//
// Writing rules for every entry here, tuned for answer engines:
// - The first paragraph must stand alone as a complete answer. It is what gets
//   lifted into an AI Overview, a featured snippet, or a voice result, with no
//   surrounding context to lean on.
// - Lead with the verdict ("No.", "Yes.") where the question is a yes/no.
// - Name entities explicitly instead of using pronouns ("the score", not "it")
//   so a quoted fragment stays unambiguous.
//
// Copy constraints from COACH-CONSULTANT-Landing-Page.md that apply here:
// belief is never the sole cause; AI is never the authority; no guaranteed
// business outcome; no published question count or completion time.

export type Faq = {
  q: string;
  /** Paragraphs. The first must be a self-contained direct answer. */
  a: string[];
};

export type FaqGroup = {
  heading: string;
  /** Short lede under the group heading on /faq. */
  intro: string;
  faqs: Faq[];
};

/** Flatten to the {question, answer} shape the FAQPage JSON-LD builder wants. */
export const toFaqEntries = (faqs: Faq[]) =>
  faqs.map((f) => ({ question: f.q, answer: f.a.join(" ") }));

/**
 * The six questions rendered in the homepage "Essential Questions" accordion.
 * These are the categorical disclaimers, so their wording is deliberately
 * conservative and is repeated verbatim on /faq: an assistant that finds two
 * different answers to "is this a business assessment" on one domain has to
 * pick one, and may pick the looser one.
 */
export const ESSENTIAL_FAQS: Faq[] = [
  {
    q: "Does the Coaches and Consultants Belief Score claim belief causes business results?",
    a: [
      "No. Commercial outcomes are influenced by many practical factors, including demand, offer quality, positioning, pricing, proof, distribution, timing, competition, purchasing capacity, sales skill, client fit, delivery quality, systems, capital, health, relationships, and broader economic conditions.",
      "The Coaches and Consultants Belief Score examines whether one repeated business moment may also contain a belief layer. The score does not claim belief is the sole cause.",
    ],
  },
  {
    q: "Is this a business assessment, personality test, or professional evaluation?",
    a: [
      "No. The Coaches and Consultants Belief Score does not evaluate your methodology, competence, ethics, pricing, business maturity, or professional suitability.",
      "The score focuses on one recurring pattern you choose to describe. It is a reflective and educational tool.",
    ],
  },
  {
    q: "Is technology deciding what is true about me or my business?",
    a: [
      "No. Technology helps organize the information you choose to provide. It may suggest a possible relationship between the repeated moment, your response, the consequence, the meaning, and a possible belief.",
      "The result is a hypothesis. You decide what fits.",
    ],
  },
  {
    q: "What if the result feels inaccurate?",
    a: [
      "Keep what feels useful, and correct, refine, question, or reject what does not.",
      "The result is not a final statement about your business, professional value, or identity.",
    ],
  },
  {
    q: "What happens with the information I provide?",
    a: [
      "Your answers are used to generate your personalized Coaches and Consultants Belief Score.",
      "Selected team members may review limited information for quality assurance, safety, support, or system improvement according to the published Privacy Policy.",
    ],
  },
  {
    q: "Is the complete Coaches and Consultants Belief Score really free?",
    a: [
      "Yes. You receive the complete free result before any optional paid offer is presented, and no credit card is required.",
      "Afterward, you may be offered an optional next step designed to help you work with the result more deliberately. The paid step is optional.",
    ],
  },
];

/**
 * Questions that exist only on /faq. These are the "what IS this" and
 * comparison questions an answer engine needs in order to describe the product
 * accurately, and which the doorway page answers in prose rather than in the
 * accordion.
 */
export const FAQ_GROUPS: FaqGroup[] = [
  {
    heading: "What the score is",
    intro:
      "The product, in plain terms: what it examines, what you receive, and who it is for.",
    faqs: [
      {
        q: "What is the Coaches and Consultants Belief Score?",
        a: [
          "The Coaches and Consultants Belief Score is a free, personalized reflection that names the belief which may be shaping one repeated commercial moment in a coaching or consulting business, built from the participant's own description of what keeps happening.",
          "The score is delivered as a Pattern-to-Belief Map with five fields: the repeated moment, a possible belief, the reinforcing loop, the moment to watch, and the next evidence.",
          "The score is reflective and educational. It is not a business assessment, a personality test, or a professional evaluation, and it requires no credit card.",
        ],
      },
      {
        q: "What is a “belief” in this context?",
        a: [
          "A belief here is a possible conclusion that a repeated business experience may have taught someone to hold, such as “helping preserves trust, selling risks damaging it.” It is inferred from a described pattern of behavior, not diagnosed and not measured.",
          "The Coaches and Consultants Belief Score treats a belief as a hypothesis to examine, not as an established fact about the person or the business.",
        ],
      },
      {
        q: "What is the Pattern-to-Belief Map?",
        a: [
          "The Pattern-to-Belief Map is the public mechanism behind the Coaches and Consultants Belief Score. It breaks one recurring business situation into five connected stages: the repeated moment, a possible belief, the reinforcing loop, the moment to watch, and the next evidence.",
          "The map deliberately covers one pattern rather than the whole business, because a single specific moment is what can actually be observed and tested.",
        ],
      },
      {
        q: "Who is the Coaches and Consultants Belief Score for?",
        a: [
          "The score is for coaches and consultants who already deliver real client results but keep meeting the same commercial friction: building instead of selling, softening the recommendation, overcustomizing delivery, avoiding follow-up, underpricing, overdelivering, struggling to delegate, or remaining indispensable to every result.",
          "The score does not require a particular niche, certification, business stage, or delivery model.",
        ],
      },
      {
        q: "What do I actually receive?",
        a: [
          "You receive a personalized Pattern-to-Belief Map naming the repeated moment, a possible belief, the reinforcing loop, the moment to watch, and the next evidence.",
          "The complete result is delivered free, before any optional paid step is presented.",
        ],
      },
    ],
  },
  {
    heading: "How it compares",
    intro:
      "Where the score sits alongside the business support a coach or consultant may already be using.",
    faqs: [
      {
        q: "How is this different from sales training or a sales script?",
        a: [
          "Sales training teaches what to say and how to run a commercial conversation. The Coaches and Consultants Belief Score examines why a direct recommendation may feel less human than continued helping, in the specific moment where the recommendation is available and something else happens instead.",
          "The score is an additional layer, not a replacement. Keep the sales training that helps.",
        ],
      },
      {
        q: "How is this different from business coaching or consulting?",
        a: [
          "A business coach improves strategy and accountability, and a consultant improves positioning, pricing, operations, or distribution. The Coaches and Consultants Belief Score examines the possible belief active inside one repeated business moment.",
          "The score is not business consulting and does not replace it. It examines how a repeated belief may influence whether useful advice is applied, resisted, overcomplicated, repeatedly replaced, or used to postpone a more exposed action.",
        ],
      },
      {
        q: "How is this different from a CRM, a content system, or an AI tool?",
        a: [
          "A CRM improves follow-up, a content system improves visibility, and AI tools improve research, preparation, synthesis, and delivery. Each answers a real question. The Coaches and Consultants Belief Score asks a different one: why the message may remain unsent even when the task is visible, or why experimentation may replace one measured implementation.",
          "Keep the tools that help. The score examines the layer underneath whether they get used.",
        ],
      },
      {
        q: "Is this therapy, coaching, or mental-health support?",
        a: [
          "No. The Coaches and Consultants Belief Score is not psychotherapy, mental-health treatment, diagnosis, counselling, professional supervision, or crisis support.",
          "The score is a reflective and educational tool about one repeated commercial moment in a business. Use personal judgment and seek qualified support when you need it.",
        ],
      },
    ],
  },
  {
    heading: "Using the result",
    intro: "What to do with the map once you have it, and what it cannot tell you.",
    faqs: [
      {
        q: "How long does the reflection take, and how many questions are there?",
        a: [
          "The reflection is short and guided, and you answer in your own words. This site does not publish a question count or a completion time, because neither has been measured and verified.",
          "You do not need business jargon, and there is no perfect wording. Messy answers are allowed.",
        ],
      },
      {
        q: "Do I need to describe my whole business?",
        a: [
          "No. Choose one pattern that matters now, not your entire business.",
          "The Coaches and Consultants Belief Score is built around a single recurring situation, because one specific moment is what can be observed, tested, and acted on.",
        ],
      },
      {
        q: "Will the score guarantee more clients or revenue?",
        a: [
          "No. The Coaches and Consultants Belief Score guarantees no client, revenue, pricing, scale, or other business outcome, and it makes no prediction about your results.",
          "The score offers a hypothesis about one repeated moment. Any change in outcome depends on decisions and actions you take, inside market conditions the score does not control.",
        ],
      },
      {
        q: "Is my result a diagnosis of a problem with me?",
        a: [
          "No. The result is not a verdict about your worth, your ability, your methodology, or your professional identity, and it does not diagnose anything.",
          "The result is a starting point for reflection. You remain the authority on your business and your experience.",
        ],
      },
    ],
  },
];

/** Every question rendered on /faq, in page order. Used for that page's
 *  FAQPage JSON-LD so the markup and the visible copy stay identical. */
export const ALL_FAQ_PAGE_FAQS: Faq[] = [
  ...FAQ_GROUPS.flatMap((g) => g.faqs),
  ...ESSENTIAL_FAQS,
];
