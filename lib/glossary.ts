// Canonical definitions for every term this site uses.
//
// Why this exists: the site invents vocabulary (Belief Score, Pattern-to-Belief
// Map, reinforcing loop, moment to watch, next evidence). An answer engine
// asked "what is a Pattern-to-Belief Map" will otherwise paraphrase marketing
// copy from whichever page it happened to crawl. One authoritative definition
// per term, rendered as a real <dl>/<dfn> on /glossary and emitted as
// DefinedTerm JSON-LD from the same array, makes the site the source.
//
// Definition writing rules:
// - Start with the term's category ("a possible conclusion...", "the public
//   mechanism..."), so a lifted fragment is self-contained.
// - Keep the spec's hedging intact: possible, may, hypothesis. These
//   definitions are the most quotable text on the site, so an overclaim here
//   propagates further than one in body copy.

export type Term = {
  term: string;
  definition: string;
  /** Other terms in this glossary worth reading next. */
  related?: string[];
};

export type GlossaryGroup = {
  heading: string;
  intro: string;
  terms: Term[];
};

export const GLOSSARY: GlossaryGroup[] = [
  {
    heading: "The AI Merge vocabulary",
    intro:
      "The core terms behind the free score and the methodology it is built on.",
    terms: [
      {
        term: "Coaches and Consultants Belief Score",
        definition:
          "A free, personalized reflection that names the belief which may be shaping one repeated commercial moment in a coaching or consulting business, built from the participant's own description of what keeps happening. It is delivered as a Pattern-to-Belief Map and is reflective and educational rather than a business assessment, personality test, or professional evaluation.",
        related: ["Pattern-to-Belief Map", "Belief"],
      },
      {
        term: "Belief",
        definition:
          "A possible conclusion that a repeated business experience may have taught someone to hold, such as “helping preserves trust, selling risks damaging it.” In the AI Merge methodology a belief is inferred from a described pattern of behavior and treated as a hypothesis to examine, never as an established fact about the person or a diagnosed trait.",
        related: ["Repeated moment", "Reinforcing loop"],
      },
      {
        term: "Pattern-to-Belief Map",
        definition:
          "The public mechanism behind the Coaches and Consultants Belief Score. It breaks one recurring business situation into five connected stages: the repeated moment, a possible belief, the reinforcing loop, the moment to watch, and the next evidence. It maps one pattern rather than the whole business.",
        related: [
          "Repeated moment",
          "Belief",
          "Reinforcing loop",
          "Moment to watch",
          "Next evidence",
        ],
      },
      {
        term: "AI Merge",
        definition:
          "The methodology behind the Coaches and Consultants Belief Score, created by Manuj Aggarwal and published in the Mensa Research Journal. It combines AI-supported pattern recognition with a human-first approach in which the technology helps organize a described pattern and the participant retains authority over what the pattern means.",
        related: ["Coaches and Consultants Belief Score"],
      },
    ],
  },
  {
    heading: "The five stages of the Pattern-to-Belief Map",
    intro:
      "Each stage of the map, in the order the free result presents them.",
    terms: [
      {
        term: "Repeated moment",
        definition:
          "Stage one of the Pattern-to-Belief Map: the specific business situation that keeps recurring, stated concretely rather than generally. “When a prospect is ready for a clear recommendation, I add more value instead of naming the next step” is a repeated moment; “I need more clients” is not.",
        related: ["Pattern-to-Belief Map", "Moment to watch"],
      },
      {
        term: "Reinforcing loop",
        definition:
          "Stage three of the Pattern-to-Belief Map: the sequence by which a response to the repeated moment produces a consequence that appears to confirm the belief, making the same response more likely next time. A softened recommendation leads to a delayed decision, a quieter pipeline, and more pressure, which makes selling feel heavier and the softening feel justified.",
        related: ["Belief", "Repeated moment"],
      },
      {
        term: "Moment to watch",
        definition:
          "Stage four of the Pattern-to-Belief Map: the earliest observable point where the familiar pattern begins, chosen deliberately narrow. Not every sales conversation and not the whole business, but a single early signal such as the urge to add more before stating the recommendation.",
        related: ["Repeated moment", "Next evidence"],
      },
      {
        term: "Next evidence",
        definition:
          "Stage five of the Pattern-to-Belief Map: one small, observable action that would suggest another response is available, such as ending one qualified conversation with a clear recommendation, a decision point, and an agreed follow-up date. It is a test the participant can actually run, not a prescribed outcome.",
        related: ["Moment to watch", "Pattern-to-Belief Map"],
      },
    ],
  },
  {
    heading: "Terms from the coaching and consulting context",
    intro:
      "Business vocabulary used across this site, defined as this site uses it.",
    terms: [
      {
        term: "Overcustomization",
        definition:
          "Adding bespoke elements to an offer or a delivery beyond what the client outcome requires. On this site it is treated as one of the observable behaviors a repeated commercial moment may produce, not as a flaw in the practitioner's judgment.",
        related: ["Productization"],
      },
      {
        term: "Productization",
        definition:
          "Defining a repeatable component of a coaching or consulting engagement so it can be delivered consistently without removing the judgment the work genuinely requires. The Belief Score examines why repeatability may feel like a loss of nuance or identity, rather than prescribing that a practice be productized.",
        related: ["Overcustomization"],
      },
      {
        term: "Commercial invitation",
        definition:
          "The point in a conversation or a piece of content where a direct next step is named and a decision is requested. This site's dominant pattern concerns what happens when a commercial invitation is available and additional value is created instead.",
        related: ["Repeated moment"],
      },
      {
        term: "Reflective tool",
        definition:
          "A tool intended to support a person's own thinking rather than to measure, diagnose, certify, or advise. The Coaches and Consultants Belief Score is a reflective tool: it produces a hypothesis for the participant to accept, refine, question, or reject, and it is not business consulting, legal, tax, financial, or medical advice.",
        related: ["Coaches and Consultants Belief Score"],
      },
    ],
  },
];

/** Flat list, for the DefinedTermSet JSON-LD and llms.txt lookups. */
export const ALL_TERMS: Term[] = GLOSSARY.flatMap((g) => g.terms);
