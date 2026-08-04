// Unified funnel-event helper. Every doc-specified analytics event
// (landing_page_view, scroll_depth_*, vsl_*, cta_click) flows through here so
// PostHog and the Meta Pixel always see the same event names and payloads.
// Both sinks are consent-gated upstream and no-op safely when absent.

import posthog from "posthog-js";
import { trackCustom } from "./fbpixel";
import { LP_SLUG } from "./scorecard";

/**
 * CTA placements the doc requires distinct tracking for. These are the exact
 * CTA TRACKING LOCATIONS listed in COACH-CONSULTANT-Landing-Page.md:
 * hero, recognition, score_definition, sample_result, how_it_works, final,
 * mobile_sticky. `header` and `what_you_get` are additional placements this
 * build ships (the sticky header CTA and the Block 02 early-proof strip).
 */
export type CtaLocation =
  | "header"
  | "hero"
  | "what_you_get"
  | "recognition"
  // Block 06, the Pattern-to-Belief Map (the named public mechanism).
  | "score_definition"
  // Block 07, the illustrative example result.
  | "sample_result"
  | "how_it_works"
  | "final"
  | "mobile_sticky"
  // Answer-engine pages. Tracked separately so organic/AI-referred traffic
  // that lands on /faq or /glossary can be told apart from doorway traffic in
  // the funnel report.
  | "faq_page"
  | "glossary_page"
  | "not_found";

export function trackEvent(
  name: string,
  props?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  const payload = { lp: LP_SLUG, ...props };
  try {
    // __loaded is false until posthog.init runs (i.e. before consent).
    if (posthog.__loaded) posthog.capture(name, payload);
  } catch {
    // Analytics must never break the page.
  }
  trackCustom(name, payload);
}
