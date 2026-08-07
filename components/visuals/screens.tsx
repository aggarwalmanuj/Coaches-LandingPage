"use client";

// The four assessment screens, RENDERED rather than screenshotted.
//
// WHY THIS EXISTS - do not swap these back for captures without reading this.
//
// The repo previously shipped four real PNGs in public/graphics/. Every one of
// them was a capture of the WRONG VERTICAL:
//
//   · reportsummary.png / reportpdf.png - the main B2C funnel. They render
//     "Clarity Readiness Index" and the B2C pillar names (Direction Clarity /
//     Identity Alignment / Decision Readiness / Energy Alignment). The coaches
//     vertical scores the same four keys under DIFFERENT names (Pattern
//     Precision / Identity Distance / Evidence Readiness / Cost Realism), so
//     putting those captures on this page meant showing a visitor two
//     contradictory sets of pillar names. Their body copy is consumer wellness
//     ("i am stressed", "laziness"), they show a red 18/100 badged "DEEP STUCK
//     · COLLAPSED", and one carries a visible typo ("regualarly").
//   · beat.png - renders "REFLECTION 5 · 5" plus a five-dot progress bar,
//     which publishes a question count the spec forbids until it is measured,
//     and its copy is from the consumer funnel too.
//   · audience.png - offers an "Individual / Team & Organization" path choice.
//     The `team` audience was retired from the funnel in July 2026.
//
// So these are stylised, on-palette, coach-accurate screens instead. They
// assert nothing the page does not already claim in approved copy: a name and
// email, an open text answer, the four pillars under their real coaches
// labels, and the five Pattern-to-Belief Map fields. No question count, no
// duration, no invented result prose - the personalized writing is shown as
// redaction bars for the same reason it is in the report preview.
//
// Every caller must caption the stage as illustrative.
//
// TODO(launch): replace with real captures of the approved COACHES flow
// (vertical=coaches), then delete this file.

import { ReportPreviewCard } from "@/components/visuals/report-preview";
import { PILLAR_COLORS, PILLAR_ORDER, PILLAR_LABELS } from "@/lib/pillars";

/** Shared page frame so all four screens read as one product. */
function Screen({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col bg-bg px-5 py-5 sm:px-8 sm:py-7">
      <p className="text-[9px] uppercase tracking-[0.24em] text-faint">
        {eyebrow}
      </p>
      <div className="mt-4 min-h-0 flex-1">{children}</div>
    </div>
  );
}

/** Step 1: where you start. Name, email, and the one pattern. */
export function ScreenEntry() {
  return (
    <Screen eyebrow="I · The arrival">
      <p className="font-serif text-[22px] leading-tight text-fg sm:text-[28px]">
        Tell us about the{" "}
        <span className="text-emphasis">one pattern</span> you want to look at.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          { label: "First name", placeholder: "As you would like to be addressed" },
          { label: "Email", placeholder: "name@email.com" },
        ].map((f) => (
          <div key={f.label}>
            <p className="text-[8.5px] uppercase tracking-[0.2em] text-faint">
              {f.label}
            </p>
            <div className="mt-1.5 rounded-md border border-line bg-card px-3 py-2.5">
              <p className="truncate text-[12px] text-faint">{f.placeholder}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-md border border-line bg-card px-3 py-2.5">
        <p className="text-[8.5px] uppercase tracking-[0.2em] text-faint">
          The recurring commercial moment
        </p>
        <p className="mt-1 text-[12.5px] text-muted">
          e.g. softening the recommendation, overcustomizing delivery,
          underpricing
        </p>
      </div>
    </Screen>
  );
}

/** Step 2: the guided reflection. Deliberately shows NO counter. */
export function ScreenReflection() {
  return (
    <Screen eyebrow="II · In your own words">
      <p className="font-serif text-[19px] leading-snug text-fg sm:text-[23px]">
        Think of one moment that keeps repeating in your practice. What happens,
        and what do you tend to do next?
      </p>
      <p className="mt-2.5 text-[12px] leading-relaxed text-faint">
        Not a one-word label. Tell it the way you would say it out loud. There
        is no perfect wording, and messy answers are fine.
      </p>
      <div className="relative mt-4 rounded-lg border border-line-strong bg-card px-4 py-3.5">
        {/* Same rule as the report card: a product example carries its own
            label. This answer is written, not a real participant's. */}
        <span className="absolute right-3 top-2.5 rounded-full border border-line px-2 py-0.5 text-[8px] uppercase tracking-[0.14em] text-faint">
          Illustrative
        </span>
        <p className="text-[13px] leading-[1.7] text-muted">
          &ldquo;The conversation goes well, but when it&rsquo;s time to
          actually recommend the offer, I start explaining more and adding
          things instead of just naming the next step.&rdquo;
          {/* A caret, so the field reads as mid-typing rather than as a quote
              someone else wrote. */}
          <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-signal" />
        </p>
      </div>
    </Screen>
  );
}

/** Step 3: the result. The real preview component, so this screen and the
 *  "what you receive" section are literally the same artifact. */
export function ScreenScore() {
  return (
    <Screen eyebrow="III · Your score">
      <div className="mx-auto max-w-md">
        {/* animate={false}: inside a crossfading stage the ring would replay
            its 0-to-value sweep every time the slide came back around, which
            reads as the number being recalculated. */}
        <ReportPreviewCard animate={false} />
      </div>
    </Screen>
  );
}

/** Step 4: what you do with it. The five Map fields, and the point that the
 *  reader is the one deciding. */
export function ScreenDecide() {
  return (
    <Screen eyebrow="IV · Yours to keep">
      <p className="font-serif text-[19px] leading-snug text-fg sm:text-[23px]">
        Keep what fits. Question, refine, or reject what does not.
      </p>
      <ul className="mt-4 grid list-none gap-1.5">
        {[
          "The repeated moment",
          "A possible belief",
          "The reinforcing loop",
          "The moment to watch",
          "The next evidence",
        ].map((field, i) => (
          <li
            key={field}
            className="flex items-center gap-3 rounded-md border border-line bg-card px-3 py-2"
          >
            {/* The four pillar colours run out at five rows, so the last field
                takes the accent. Colour here is ornament on an already-labelled
                row, not an encoding, so the repeat carries no false meaning. */}
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{
                background:
                  i < PILLAR_ORDER.length
                    ? PILLAR_COLORS[PILLAR_ORDER[i]]
                    : "var(--signal)",
              }}
            />
            <span className="text-[12.5px] text-fg">{field}</span>
            <span className="ml-auto text-[9px] uppercase tracking-[0.16em] text-faint">
              in your words
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3.5 text-[11.5px] leading-relaxed text-faint">
        A hypothesis for reflection. You stay the authority on your own
        practice.
      </p>
    </Screen>
  );
}

/** Small helper the walkthrough uses for its pillar legend chips. */
export const PILLAR_CHIPS = PILLAR_ORDER.map((k) => ({
  key: k,
  label: PILLAR_LABELS[k].label,
  color: PILLAR_COLORS[k],
}));
