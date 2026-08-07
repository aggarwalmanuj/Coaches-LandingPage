// The four scored dimensions the assessment returns.
//
// This file is deliberately NOT a client module. Constants exported from a
// `"use client"` file cross the boundary as client-reference proxies, not as
// their real values, so a server component that imports an array from one gets
// something that looks like an array and has no `.map`. Splitting the data out
// here lets both sides import the genuine values; the interactive rendering
// (ScoreRing, PillarDial) stays in components/visuals/score-visuals.tsx.
//
// Ported from the funnel this page hands off to (scorecard-funnel
// `lib/vertical-display.ts`, the `coaches` vertical). The four subscore KEYS
// are fixed across that whole system - scoring, storage, and the model's JSON
// contract all use them - and verticals only relabel what they mean.
// `lp=coaches-consultants` resolves to the `coaches` vertical server-side, so
// the labels below are the exact words a visitor's own report will carry. Do
// not paraphrase them, or the page promises one thing and the report delivers
// another.

import {
  Fingerprint,
  Gauge,
  Scale,
  Target,
  type LucideIcon,
} from "lucide-react";

export type PillarKey =
  | "directionClarity"
  | "identityAlignment"
  | "decisionReadiness"
  | "energyAlignment";

/** Display order. Fixed: it is the order the report renders them in. */
export const PILLAR_ORDER: readonly PillarKey[] = [
  "directionClarity",
  "identityAlignment",
  "decisionReadiness",
  "energyAlignment",
];

/** One token per dimension. The values live in globals.css; see the long note
 *  there on why this palette is categorical rather than a scale. */
export const PILLAR_COLORS: Record<PillarKey, string> = {
  directionClarity: "var(--pillar-1)",
  identityAlignment: "var(--pillar-2)",
  decisionReadiness: "var(--pillar-3)",
  energyAlignment: "var(--pillar-4)",
};

/** A second, non-colour identity encoding, so the dimensions stay tellable
 *  apart in greyscale, in print, and under colour-vision deficiency. */
export const PILLAR_ICONS: Record<PillarKey, LucideIcon> = {
  directionClarity: Target,
  identityAlignment: Fingerprint,
  decisionReadiness: Scale,
  energyAlignment: Gauge,
};

export const PILLAR_LABELS: Record<
  PillarKey,
  { label: string; pillar: string; plain: string }
> = {
  directionClarity: {
    label: "Pattern Precision",
    pillar: "Pillar I · The Repeated Moment",
    plain: "How exactly you can name the business moment that keeps repeating.",
  },
  identityAlignment: {
    label: "Identity Distance",
    pillar: "Pillar II · Professional Identity",
    plain:
      "How much you see this as something the work does, not who you are as a professional.",
  },
  decisionReadiness: {
    label: "Evidence Readiness",
    pillar: "Pillar III · The Next Evidence",
    plain:
      "How ready you are to let one real commercial action get a real answer.",
  },
  energyAlignment: {
    label: "Cost Realism",
    pillar: "Pillar IV · The Cost",
    plain:
      "How clearly you can see what this loop is costing you in time, pipeline, and energy.",
  },
};

/** Illustrative subscores, declared once so the report preview and the pillar
 *  dials can never disagree on screen. Deliberately uneven and mid-range: a
 *  demo full of 90s reads as a sales mock, and the spread is what makes the
 *  "which one is holding the most back" point without a sentence of copy. */
export const SAMPLE_SUBSCORES: Record<PillarKey, number> = {
  directionClarity: 68,
  identityAlignment: 47,
  decisionReadiness: 61,
  energyAlignment: 54,
};

/** The funnel's own weighting, so the preview's arithmetic is not merely
 *  plausible but correct: 58 really is the overall for the sample above. */
export function overallOf(s: Record<PillarKey, number>): number {
  return Math.round(
    s.directionClarity * 0.35 +
      s.identityAlignment * 0.25 +
      s.decisionReadiness * 0.25 +
      s.energyAlignment * 0.15
  );
}
