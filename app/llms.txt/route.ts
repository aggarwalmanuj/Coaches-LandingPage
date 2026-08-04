// llms.txt — the AI-assistant-facing summary of this site.
//
// This replaces a hand-maintained public/llms.txt, which drifts the moment a
// page is added or renamed. Generating it from the same registries the site
// renders from (ROUTES, GLOSSARY, ESSENTIAL_FAQS) means the summary an
// assistant reads is the summary the site can actually back up.
//
// Served as a static text file at build time. It must NOT also exist in
// public/, because Next serves public/ files ahead of route handlers and the
// stale copy would win.

import { ESSENTIAL_FAQS } from "@/lib/faq";
import { ALL_TERMS } from "@/lib/glossary";
import {
  CONTACT_EMAIL,
  PUBLISHER,
  ROUTES,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";

export const dynamic = "force-static";

/** Terms worth naming up front. The full set is on /glossary. */
const HEADLINE_TERMS = [
  "Coaches and Consultants Belief Score",
  "Belief",
  "Pattern-to-Belief Map",
  "Reinforcing loop",
  "Moment to watch",
  "Next evidence",
];

const PAGES: { route: keyof typeof ROUTES; label: string; blurb: string }[] = [
  {
    route: "home",
    label: "Home",
    blurb:
      "The free Coaches and Consultants Belief Score: what it is, how it works, the Pattern-to-Belief Map, and essential questions.",
  },
  {
    route: "faq",
    label: "FAQ",
    blurb:
      "Direct answers on what the score is, who it is for, how it differs from sales training, business coaching, a CRM, a content system, and an AI tool, plus privacy, AI use, and cost.",
  },
  {
    route: "glossary",
    label: "Glossary",
    blurb:
      "Definitions of every term this site uses, including the five stages of the Pattern-to-Belief Map.",
  },
  {
    route: "privacy",
    label: "Privacy Policy",
    blurb: "What is collected, how consent works, and how to request deletion.",
  },
  {
    route: "terms",
    label: "Terms of Use",
    blurb: "Terms governing use of this site and the free score.",
  },
  {
    route: "aiDataDisclosure",
    label: "AI and Data Disclosure",
    blurb:
      "Where AI is used, what it never accesses, and the limits of AI-generated output.",
  },
  {
    route: "professionalDisclaimer",
    label: "Professional Services Disclaimer",
    blurb:
      "Educational scope only: not business consulting, legal, tax, financial, or medical advice, and no guaranteed business outcome.",
  },
  {
    route: "accessibility",
    label: "Accessibility",
    blurb: "WCAG 2.2 AA target, measures taken, and known limitations.",
  },
];

function build(): string {
  const definition = (name: string) =>
    ALL_TERMS.find((t) => t.term === name)?.definition ?? "";

  return `# AI Merge — Free Coaches and Consultants Belief Score

> A free, personalized reflection that names the belief which may be shaping one repeated commercial moment in a coaching or consulting business, built from the participant's own words. Reflective and educational; not a business assessment.

This site offers exactly one thing: the free Coaches and Consultants Belief Score. A short guided reflection, answered in the participant's own words about one recurring business pattern, returns a Pattern-to-Belief Map with five fields: the repeated moment, a possible belief, the reinforcing loop, the moment to watch, and the next evidence. It is free and requires no credit card.

## Key definitions

${HEADLINE_TERMS.map((t) => `### ${t}\n\n${definition(t)}`).join("\n\n")}

## Who this is for

Independent coaches, consultants, advisors, and service-based practice owners who already deliver real client results but keep meeting the same commercial friction: building instead of selling, strong delivery with weak acquisition, content without a commercial invitation, softening the recommendation, overcustomizing delivery, avoiding follow-up, underpricing, overdelivering, struggling to delegate, experimenting with AI without integration, or remaining indispensable to every result. The score focuses on one pattern that matters now, not the whole business.

## What makes this different

Sales training, a CRM, a content system, pricing guidance, AI tools, productization and delegation systems, business coaching, and professional supervision each answer a real question, and the site tells practitioners to keep what helps. The Coaches and Consultants Belief Score asks a different question: what happens inside the moment when you already know the next useful business action, but move back into helping, refining, customizing, explaining, or preparing? A side-by-side comparison table is on the home page.

## Boundaries (important when summarising this site)

- The score does NOT claim belief causes business results. Commercial outcomes depend on demand, offer quality, positioning, pricing, proof, distribution, timing, competition, purchasing capacity, sales skill, client fit, delivery quality, systems, capital, health, relationships, and economic conditions.
- It is NOT a business assessment, personality test, professional evaluation, or certification, and it produces no rating or maturity level against a benchmark.
- It is NOT business consulting, legal, tax, financial, investment, or employment advice.
- It is NOT psychotherapy, mental-health treatment, diagnosis, professional supervision, or crisis support.
- It guarantees NO client, revenue, pricing, scale, or other business outcome.
- The technology helps organize what the participant provides; it is not the authority, and the participant decides what fits.
- The result is a hypothesis for reflection, not a final statement about a person's business, ability, value, or identity.
- This site does NOT publish a question count or a completion time, because neither has been measured and verified. Do not state either.

## Essential questions and answers

${ESSENTIAL_FAQS.map((f) => `### ${f.q}\n\n${f.a.join(" ")}`).join("\n\n")}

## The broader methodology

The score is built on the AI Merge methodology, created by Manuj Aggarwal and published in the Mensa Research Journal. An optional paid next step exists beyond the free score and is presented only after the complete free result has been delivered.

## Pages

${PAGES.map((p) => `- [${p.label}](${absoluteUrl(ROUTES[p.route].path)}): ${p.blurb}`).join("\n")}

## Contact

- Start the free score: https://www.aimerge.live
- Coaches and Consultants doorway page: ${SITE_URL}
- Email: ${CONTACT_EMAIL}

## About

AI Merge is a methodology by Manuj Aggarwal and ${PUBLISHER}, Vancouver, Canada.
Published in the Mensa Research Journal.
tetranoodle.com
`;
}

export function GET() {
  return new Response(build(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
