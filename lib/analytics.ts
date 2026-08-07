// Unified funnel-event helper. Every doc-specified analytics event
// (landing_page_view, scroll_depth_*, vsl_*, cta_click) flows through here so
// PostHog and the Meta Pixel always see the same event names and payloads.
// Both sinks are consent-gated upstream and no-op safely when absent.

import posthog from "posthog-js";
import { trackCustom } from "./fbpixel";
import { LP_SLUG } from "./scorecard";

/**
 * CTA placements we track separately.
 *
 * This list tracks the PAGE, not the spec's original block numbering. The v3.0
 * rebuild collapsed thirteen sections into six, so `score_definition` and
 * `sample_result` (the old Block 06 spine and Block 07 example result) are
 * gone, and the Block 02 CTA is named `early_proof` per v3.0 Fix 02.
 *
 * Keep this union tight: a location that no longer exists on the page still
 * type-checks forever and quietly becomes a dead series in the funnel report.
 */
export type CtaLocation =
  | "header"
  | "hero"
  // v3.0 Fix 02: the CTA at the end of "what you get". The live page showed
  // the sample map and then asked for nothing for another 795 words.
  | "early_proof"
  | "recognition"
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
