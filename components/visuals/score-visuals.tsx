"use client";

// The assessment's visual language: the animated score ring and the
// per-dimension dial. Ported from the funnel this page hands off to
// (scorecard-funnel `components/challenge/score-visuals.tsx`).
//
// Why port rather than invent: a visitor who takes the assessment sees an
// animated ring, four coloured dimension dials, and a 0-100 number. If the
// landing page shows a different shape, the report arrives feeling like a
// different product.
//
// The DATA (order, colours, icons, labels, sample values) lives in
// lib/pillars.ts rather than here, because constants exported from a
// "use client" module reach a server component as client-reference proxies
// instead of real values.

import { useEffect, useState } from "react";
import {
  PILLAR_COLORS,
  PILLAR_ICONS,
  PILLAR_LABELS,
  type PillarKey,
} from "@/lib/pillars";

/**
 * SVG donut ring, animated from 0 to `value` on mount.
 *
 * Centre content is passed as children and wears TEXT tokens, never the
 * series colour: the ring carries the hue, the number stays ink. That is what
 * stops four dials on one screen turning into four competing labels.
 */
export function ScoreRing({
  value,
  size = 120,
  stroke = 7,
  color,
  trackOpacity = 0.45,
  animate = true,
  children,
}: {
  value: number;
  size?: number;
  stroke?: number;
  color: string;
  trackOpacity?: number;
  animate?: boolean;
  children?: React.ReactNode;
}) {
  const v = Math.max(0, Math.min(100, value));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  // Paint the arc at 0 on the very first frame, then let CSS transition it to
  // the real value: a pure stroke-dashoffset animation, with no JS ticker
  // driving numbers frame by frame.
  //
  // The mounted flag is a single boolean rather than a mirrored copy of
  // `value`. Storing the value in state and syncing it in an effect meant
  // setState ran synchronously in the effect body on every value change, which
  // is a cascading render (and what the lint rule flags). Deriving `shown`
  // instead means a changed `value` animates from wherever the arc currently
  // is, for free.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Inside rAF, not in the effect body: the browser has to paint the 0 state
    // once before the transition has anything to move away from.
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);
  const shown = animate && !mounted ? 0 : v;

  return (
    <div
      className="relative inline-flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${v} out of 100`}
    >
      <svg
        className="absolute inset-0 -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--border)"
          strokeWidth={stroke}
          opacity={trackOpacity}
        />
        {/* Deliberately NO drop-shadow glow on the arc: at low values a
            blurred rounded cap reads as a floating blob rather than a dial. A
            crisp arc on a clearly visible track stays legible at any value,
            because the track is what carries the dial's shape. */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - shown / 100)}
          style={{
            transition: "stroke-dashoffset 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </svg>
      <div className="relative flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}

/**
 * One dimension as a dial card: coloured ring + score, over-line, label, and
 * the plain-language reading beneath. Always direct-labelled, so colour is
 * never the only thing telling two dials apart.
 */
export function PillarDial({
  dimension,
  value,
  animate = true,
}: {
  dimension: PillarKey;
  value: number;
  animate?: boolean;
}) {
  const color = PILLAR_COLORS[dimension];
  const Icon = PILLAR_ICONS[dimension];
  const { label, pillar, plain } = PILLAR_LABELS[dimension];

  return (
    <div
      className="liftable flex h-full flex-col gap-4 rounded-2xl border bg-card p-6"
      style={{ borderColor: `color-mix(in srgb, ${color} 28%, var(--border))` }}
    >
      <div className="flex w-full items-center gap-4">
        <ScoreRing
          value={value}
          size={68}
          stroke={5}
          color={color}
          animate={animate}
        >
          <span className="font-serif text-[19px] leading-none tabular-nums text-fg">
            {value}
          </span>
        </ScoreRing>
        <div className="min-w-0">
          {/* The over-line wears a TEXT token; only the icon carries the hue.
              This is the funnel's own rule ("text wears text tokens, never the
              series color") and it is what lets us use its exact
              DIMENSION_COLORS: the moment a series colour becomes 9px type,
              it has to be lifted for contrast, and the palette drifts away
              from the product it is supposed to match. The ring beside this
              already says which dimension it is. */}
          <p className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] text-faint">
            <Icon
              className="h-3 w-3 shrink-0"
              strokeWidth={2}
              aria-hidden
              style={{ color }}
            />
            {pillar}
          </p>
          <p className="mt-1 font-serif text-[17px] leading-snug text-fg">
            {label}
          </p>
        </div>
      </div>
      <p className="text-[14px] leading-[1.7] text-muted">{plain}</p>
    </div>
  );
}
