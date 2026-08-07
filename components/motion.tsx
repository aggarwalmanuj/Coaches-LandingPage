"use client";

// Editorial motion primitives.
//
// Design rule for everything in this file: motion is PACING, not decoration.
// Each primitive animates opacity/transform only (so it stays on the
// compositor), runs once, and degrades to "content is simply visible" when JS
// never arrives or the visitor prefers reduced motion.
//
// The type entrances (WordReveal / LetterReveal) are deliberately pure CSS
// with `animation-fill-mode: both`: they compose on first paint rather than
// waiting for hydration, so the fold is never blank on a slow phone. Only the
// pointer-driven effects below need a listener, and each one bails out on
// touch devices where there is no cursor to follow.

import {
  Fragment,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

/* --------------------------------------------------------------------------
   WordReveal, headline type that composes itself word by word.

   Splits on whitespace and stamps `--i` per word so the stagger is expressed
   once in CSS rather than as N inline delays. Segments (rather than a raw
   string) let a caller mark an italic emphasis clause or a hard line break
   without injecting HTML.
-------------------------------------------------------------------------- */

export type Segment =
  | { kind: "text"; text: string }
  | { kind: "italic"; text: string }
  | { kind: "br" };

export function WordReveal({
  segments,
  baseDelay = 0,
  /** ms between words. Longer headlines want a tighter step. */
  step = 90,
  className = "",
}: {
  segments: readonly Segment[];
  baseDelay?: number;
  step?: number;
  className?: string;
}) {
  // A single running index across every segment: the stagger has to continue
  // through an italic clause, not restart at it.
  let i = 0;
  return (
    <span className={className}>
      {segments.map((seg, segIdx) => {
        if (seg.kind === "br") {
          return <br key={`br-${segIdx}`} aria-hidden />;
        }
        const words = seg.text.split(/\s+/).filter(Boolean);
        return (
          <span
            key={`seg-${segIdx}`}
            className={seg.kind === "italic" ? "text-emphasis" : ""}
          >
            {words.map((word, wIdx) => {
              const idx = i++;
              // The separating space MUST be a sibling text node, never a
              // character inside the span. `.word-rise` is `inline-block`,
              // which establishes a block container, and CSS strips trailing
              // whitespace at the end of one - so a space kept inside the span
              // silently disappears and the headline renders as
              // "Coachesandconsultants:". As a sibling it is ordinary inline
              // whitespace between two boxes and both renders and wraps
              // correctly. `{" "}` (an expression, not source formatting) is
              // what survives JSX whitespace trimming.
              const needsSpace =
                wIdx < words.length - 1 || segIdx < segments.length - 1;
              return (
                <Fragment key={`w-${segIdx}-${wIdx}`}>
                  <span
                    className="word-rise"
                    style={
                      {
                        "--i": idx,
                        animationDelay: `calc(${idx} * ${step}ms + ${baseDelay}ms)`,
                      } as CSSProperties
                    }
                  >
                    {word}
                  </span>
                  {needsSpace ? " " : null}
                </Fragment>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

/* --------------------------------------------------------------------------
   LetterReveal, for the short tracked-uppercase chapter marks only.

   Never use this on body copy: one span per character is fine for a 20-char
   eyebrow and ruinous for a paragraph, and screen readers announce a
   letter-split string unpredictably at length.
-------------------------------------------------------------------------- */

export function LetterReveal({
  text,
  baseDelay = 0,
  className = "",
}: {
  text: string;
  baseDelay?: number;
  className?: string;
}) {
  return (
    <span className={className}>
      {Array.from(text).map((ch, idx) => (
        <span
          key={idx}
          className="letter-settle"
          style={
            {
              "--i": idx,
              animationDelay: `calc(${idx} * 28ms + ${baseDelay}ms)`,
            } as CSSProperties
          }
        >
          {/* Non-breaking space so the stagger cannot re-wrap mid-animation. */}
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

/* --------------------------------------------------------------------------
   MagneticButton, a small pull toward the cursor.

   Capped at ±10px: past that the button stops feeling responsive and starts
   feeling like it is dodging the click. Disabled entirely on touch, where
   there is no hover state and the transform would only fight the tap.
-------------------------------------------------------------------------- */

export function MagneticButton({
  children,
  strength = 0.18,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      el.style.setProperty(
        "--mx",
        String(Math.max(-10, Math.min(10, dx * strength)))
      );
      el.style.setProperty(
        "--my",
        String(Math.max(-10, Math.min(10, dy * strength)))
      );
    };
    const onLeave = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`magnetic ${className}`}>
      {children}
    </div>
  );
}

/* --------------------------------------------------------------------------
   CursorHalo, feeds pointer position to the `.cursor-halo` gradient.

   Sets percentages rather than pixels so the CSS stays resolution-independent
   and the element can resize without a re-measure.
-------------------------------------------------------------------------- */

export function CursorHalo({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty(
        "--cx",
        String(((e.clientX - rect.left) / rect.width) * 100)
      );
      el.style.setProperty(
        "--cy",
        String(((e.clientY - rect.top) / rect.height) * 100)
      );
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} className={`cursor-halo ${className}`}>
      {children}
    </div>
  );
}

/* --------------------------------------------------------------------------
   ParallaxImage, scroll-linked drift.

   Reads layout inside a rAF callback and writes a transform, so the scroll
   handler itself does no layout work. `amount` is the full peak-to-peak
   travel in px; keep it under ~30 or the image visibly slides out of its
   own frame at the extremes.
-------------------------------------------------------------------------- */

export function ParallaxImage({
  children,
  amount = 20,
  className = "",
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        // 0 = element just below the viewport, 1 = just above it.
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const clamped = Math.max(0, Math.min(1, progress));
        const offset = (clamped - 0.5) * amount * 2;
        el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [amount]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
