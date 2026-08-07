"use client";

// The walkthrough: "see the whole thing before you begin", built from real
// captures of the assessment this page hands off to.
//
// Why it exists: the single biggest reason ad traffic bounces off a free
// assessment is that the ask has no visible shape. A visitor cannot tell what
// they will be asked to do or what they will get back, so "free" reads as
// "unknown cost". Showing every screen turns an unknown commitment into a
// known one.
//
// Motion intent: a story-style auto-advance carries a passive visitor through
// all four steps without a click, because the important thing is that they
// SEE the arc. It is fully pausable (WCAG 2.2.2), pauses on hover and focus so
// it never yanks the slide out from under someone reading, and starts paused
// under prefers-reduced-motion or on touch (where the hover/focus guards never
// fire, so autoplay would fight the reader with no way to stop it).
//
// The crossfade and the step reveal are opacity/transform only, so the whole
// thing stays on the compositor.
//
// THE SCREENS ARE REAL CAPTURES OF THE COACHES FUNNEL.
//
// They were taken from the live assessment at `vertical=coaches` - the exact
// vertical `lp=coaches-consultants` resolves to - so what a visitor is shown
// here is what they will actually see. That matters more than it sounds: the
// four pillar names (Pattern Precision / Identity Distance / Evidence
// Readiness / Cost Realism), their four colours, and the 59/100 sample score
// all match this page's own report preview because both come from the same
// source.
//
// This replaced an earlier set of captures from the main B2C funnel, which
// rendered a different product ("Clarity Readiness Index") with a different
// set of pillar names - two contradictory vocabularies on one page.
//
// Re-capturing: `scripts/` has no capture script here, because the funnel is a
// separate repo. Run that app locally, seed localStorage["ufa-challenge"] with
// a completed coaches session, and screenshot /challenge/audience?vertical=
// coaches, /challenge/coaches/beat-1, /challenge/coaches/processing and
// /challenge/coaches/summary. Seeding is what keeps it read-only: completing
// the funnel for real writes a lead row to the production database and spends
// LLM and speech credits.

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { MagneticButton } from "@/components/motion";
import { ScorecardCta } from "@/components/scorecard-cta";

type Step = {
  n: string;
  title: string;
  meta: string;
  /** Real capture of this step, taken at desktop width. */
  img: string;
  /** The same step captured AT phone width. Not a crop of the desktop shot -
   *  a separate capture, so the UI text stays readable at phone size. */
  imgMobile: string;
  /** Announced to assistive tech when this step is the active one. */
  alt: string;
  /** What happens on this screen. */
  what: string;
  /** Why it is there - the reassurance that answers the private objection. */
  why: string;
};

const STEPS: ReadonlyArray<Step> = [
  {
    n: "01",
    title: "Name one pattern",
    meta: "First screen",
    img: "/graphics/coaches/coach-01-entry.jpg",
    imgMobile: "/graphics/coaches/coach-01-entry-mobile.jpg",
    alt: "The first screen of the Coaches and Consultants Belief Score: your name and email, the four pillars named, and one recurring business pattern to work from.",
    what: "Your details, and the one recurring commercial moment you want to examine.",
    why: "Not your whole business. One pattern, so the result is specific enough to act on.",
  },
  {
    n: "02",
    title: "Answer in your own words",
    meta: "Guided reflection",
    img: "/graphics/coaches/coach-02-reflection.jpg",
    imgMobile: "/graphics/coaches/coach-02-reflection-mobile.jpg",
    alt: "A reflection screen reading your answer back to you: “What you described is not a discipline problem. It is a pattern with a shape.”",
    what: "You type in plain language, and each answer is read back to you before the next one.",
    why: "No business jargon, no right answer. Messy answers are genuinely fine.",
  },
  {
    n: "03",
    title: "Your score is built",
    meta: "From your words",
    img: "/graphics/coaches/coach-03-processing.jpg",
    imgMobile: "/graphics/coaches/coach-03-processing-mobile.jpg",
    alt: "The assessment assembling the result: the four pillars scoring one by one while the written plan is drafted alongside them.",
    what: "The four pillars are scored from what you wrote, and the written plan is drafted alongside them.",
    why: "Built from your answers, not selected from a set of pre-written profiles.",
  },
  {
    n: "04",
    title: "Receive it, and decide what fits",
    meta: "Yours to keep",
    img: "/graphics/coaches/coach-04-summary.jpg",
    imgMobile: "/graphics/coaches/coach-04-summary-mobile.jpg",
    alt: "The result screen: a Coaches and Consultants Belief Score of 59 out of 100 with the four pillars listed beneath it.",
    what: "Your score out of 100, the four scored pillars, and the possible belief underneath the pattern.",
    why: "Keep what fits. Question, refine, or reject what does not. You stay the authority on your own practice.",
  },
];

const ADVANCE_MS = 6500;

export function Walkthrough() {
  const [active, setActive] = useState(0);
  const [userPlaying, setUserPlaying] = useState(false);
  const [interacting, setInteracting] = useState(false);

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Decide autoplay AFTER mount rather than at init, so SSR output stays
  // deterministic and the OS setting is honoured. Touch devices start paused:
  // the pause-on-hover/focus guards below never fire there, so autoplay would
  // yank the slide every 6.5s while someone was still reading it.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverless = window.matchMedia("(hover: none)");
    const decide = () => setUserPlaying(!reduced.matches && !hoverless.matches);
    decide();
    reduced.addEventListener("change", decide);
    return () => reduced.removeEventListener("change", decide);
  }, []);

  const running = userPlaying && !interacting;

  // Depending on `active` restarts the timer whenever the step changes,
  // including on manual selection, so every step gets its full dwell time.
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % STEPS.length),
      ADVANCE_MS
    );
    return () => window.clearTimeout(id);
  }, [running, active]);

  // Auto-advance must NOT steal focus; keyboard and click selection should.
  const select = useCallback((index: number, focus = false) => {
    setActive(index);
    if (focus) tabRefs.current[index]?.focus();
  }, []);

  const onTabKeyDown = (e: React.KeyboardEvent) => {
    const last = STEPS.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight")
      next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft")
      next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      select(next, true);
    }
  };

  const current = STEPS[active];

  return (
    <div
      className="grid gap-10 lg:grid-cols-12 lg:gap-14"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={() => setInteracting(false)}
    >
      {/* Stage: browser-framed screen with story segments. */}
      <div className="lg:col-span-7">
        <div className="wt-frame relative overflow-hidden rounded-xl border border-line bg-card">
          <div className="flex items-center gap-3 border-b border-line px-4 py-3">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#e0635e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#d9a13b]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#4fa763]" />
            </span>
            <span
              className="ml-1 hidden truncate rounded-full bg-bg/60 px-3 py-1 text-[11px] tracking-wide text-faint sm:inline-block"
              aria-hidden
            >
              aimerge.live / your-belief-score
            </span>
            {/* Progress segments: a PURE INDICATOR, not a control.

                They used to be <button>s, which made them 24x4px tap targets -
                far under the 44px floor - duplicating choices the labelled
                tablist on the right already offers. A second, tinier, unlabelled
                copy of the same four options is worse than none: it fails the
                target-size rule and gives a keyboard user two ways to do one
                thing. Spans show progress; the tablist does the choosing. */}
            <div className="ml-auto flex items-center gap-1.5" aria-hidden>
              {STEPS.map((s, i) => (
                <span
                  key={s.n}
                  className="relative h-1 w-6 overflow-hidden rounded-full bg-fg/15 sm:w-8"
                >
                  <span
                    className={`wt-seg-bar absolute inset-0 rounded-full bg-signal ${
                      i < active ? "wt-seg-done" : ""
                    } ${i === active && running ? "wt-seg-fill" : ""} ${
                      i === active && !running ? "wt-seg-now" : ""
                    }`}
                    style={
                      i === active && running
                        ? { animationDuration: `${ADVANCE_MS}ms` }
                        : undefined
                    }
                  />
                </span>
              ))}
            </div>
          </div>

          {/* One tabpanel; all slides stacked and crossfaded. The stage holds
              a fixed aspect ratio (see .wt-stage) so swapping between captures
              of different native sizes never reflows the page. */}
          <div
            id="wt-panel"
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`wt-tab-${active}`}
            className="wt-stage relative w-full"
          >
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                aria-hidden={i !== active ? "true" : "false"}
                // Grid-cell stacking rather than `absolute inset-0`: every
                // slide occupies the same cell (see .wt-stage), so the stage
                // takes the height of the captures instead of a hard-coded
                // ratio that could crop them.
                className={`transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  i === active ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                {/* ART DIRECTION, not a resize.
                
                    <picture> rather than next/image because next/image cannot
                    swap the SOURCE FILE at a breakpoint, and that is exactly
                    what is needed: the desktop capture is 1280px of UI, and
                    rendering it in a 350px phone column put its text at 2-3px -
                    visible noise that communicates nothing. The phone loads a
                    capture taken at phone width instead.

                    <picture> also guarantees ONE fetch. Two next/image
                    elements toggled with `hidden` would leave both in the DOM,
                    and a display:none <img> is still fetched by every engine
                    that matters - the phone would pay for the desktop file it
                    never shows. Explicit width/height on the <img> reserves the
                    box so a late-loading slide cannot shift the page. */}
                <picture>
                  <source
                    media="(min-width: 640px)"
                    srcSet={s.img}
                    width={1920}
                    height={1350}
                  />
                  <img
                    src={s.imgMobile}
                    // Only the visible slide carries its description; the three
                    // hidden ones would otherwise all be announced at once.
                    alt={i === active ? s.alt : ""}
                    width={800}
                    height={1520}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="block h-auto w-full"
                  />
                </picture>
              </div>
            ))}
            <span aria-hidden className="wt-vignette absolute inset-0" />
          </div>
        </div>

        {/* Caption + transport. The pause control is required: WCAG 2.2.2
            gives any auto-updating content over five seconds a mechanism to
            stop it. */}
        <div className="mt-5 flex items-center justify-between gap-4">
          <p
            key={current.n}
            className="wt-caption flex items-center gap-3 text-[13px] leading-snug text-faint"
          >
            <span className="text-emphasis text-base">{current.n}</span>
            <span>{current.meta}</span>
          </p>
          <button
            type="button"
            onClick={() => setUserPlaying((p) => !p)}
            aria-pressed={userPlaying ? "true" : "false"}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 py-2 text-[12px] uppercase tracking-[0.18em] text-faint transition-colors duration-300 hover:border-line-strong hover:text-fg"
          >
            {userPlaying ? (
              <Pause className="h-3 w-3" strokeWidth={2} aria-hidden />
            ) : (
              <Play className="h-3 w-3" strokeWidth={2} aria-hidden />
            )}
            {userPlaying ? "Pause" : "Play"}
            <span className="sr-only"> the walkthrough</span>
          </button>
        </div>
      </div>

      {/* Step list: a vertical tablist. The active step expands to reveal the
          "why", which is where the objection-handling copy lives. */}
      <div className="lg:col-span-5">
        <div
          role="tablist"
          aria-label="The assessment, step by step"
          aria-orientation="vertical"
          className="flex flex-col"
        >
          {STEPS.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.n}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`wt-tab-${i}`}
                aria-selected={on ? "true" : "false"}
                aria-controls="wt-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={onTabKeyDown}
                className="flex w-full items-start gap-4 border-t border-line py-5 text-left last:border-b sm:gap-5"
              >
                <span
                  className={`text-emphasis mt-0.5 text-2xl tabular-nums transition-colors duration-500 sm:text-3xl ${
                    on ? "!text-fg" : ""
                  }`}
                >
                  {s.n}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span
                      className={`text-title transition-colors duration-500 ${
                        on ? "" : "opacity-70"
                      }`}
                    >
                      {s.title}
                    </span>
                    <span className="shrink-0 text-[11px] uppercase tracking-[0.16em] text-faint">
                      {s.meta}
                    </span>
                  </span>
                  {/* Expanding detail. The grid-rows 0fr -> 1fr trick animates
                      height without measuring anything in JS, and only
                      opacity/transform actually paint. */}
                  <span
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      on ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <span className="overflow-hidden">
                      <span className="block text-[14.5px] leading-[1.65] text-muted">
                        {s.what}
                      </span>
                      <span className="mt-2 flex gap-2.5 text-[14.5px] leading-[1.65] text-faint">
                        <span
                          aria-hidden
                          className="mt-2 h-px w-4 shrink-0 bg-signal/70"
                        />
                        <span>{s.why}</span>
                      </span>
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-9">
          <MagneticButton className="w-full sm:w-auto">
            <span className="cta-halo w-full sm:w-auto">
              <ScorecardCta
                variant="signal"
                size="lg"
                location="how_it_works"
                className="w-full min-h-11 justify-center sm:w-auto"
              >
                Get My Free Belief Score
              </ScorecardCta>
            </span>
          </MagneticButton>
          <p className="mt-4 text-[13px] leading-relaxed text-faint">
            Short guided reflection · Your result appears immediately · No
            credit card
          </p>
        </div>
      </div>
    </div>
  );
}
