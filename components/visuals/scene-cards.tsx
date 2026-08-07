// Three small drawn scenes for the recognition block.
//
// The v3.0 manifest specifies IMG-03/04/05 here as photography: a call that
// just ended with the "next step" field blank, a finished proposal being
// reopened, a stack of polished assets beside one unsent email. Those are
// staged shoots that do not exist yet, and the image rules forbid substituting
// stock photography of people.
//
// So these are the same three moments DRAWN, from the artifacts rather than
// the person: a scheduler, a document, an outbox. No faces, nothing to mistake
// for a customer, and no claim that anything depicted is real. Each one shows
// the SAME tell - work that is finished everywhere except the one field that
// would ask for a decision - so the sequence reads left to right without its
// captions, which is what the manifest asked the photographs to do.
//
// Server components: inline SVG plus tokens, no client JS, no image bytes.
// They can be replaced one-for-one by the real captures when they are shot.

import type { ReactNode } from "react";

function Frame({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden
      className="relative mb-6 overflow-hidden rounded-xl border border-line bg-bg/60 p-4"
    >
      {children}
    </div>
  );
}

/** A row of "done" ticks with one empty field at the end. Shared spine of all
 *  three scenes: everything complete except the ask. */
function DoneRows({ rows }: { rows: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full"
            style={{
              background: "color-mix(in srgb, var(--pillar-1) 22%, transparent)",
            }}
          >
            <svg viewBox="0 0 24 24" className="h-2 w-2" fill="none">
              <path
                d="M4 12.5 9.5 18 20 6.5"
                stroke="var(--pillar-1)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            className="h-1.5 rounded-full bg-fg/12"
            style={{ width: `${[82, 64, 74][i % 3]}%` }}
          />
        </div>
      ))}
    </div>
  );
}

/** 01 — the call ended. Agenda complete, "agreed next step" left empty. */
export function SceneCallEnded() {
  return (
    <Frame>
      <p className="mb-3 text-[8.5px] uppercase tracking-[0.2em] text-faint">
        Call notes
      </p>
      <DoneRows rows={3} />
      {/* The empty field is the whole picture: a dashed, unfilled slot where a
          decision would go, in the amber that carries "cost" on this page. */}
      <div
        className="mt-3 flex items-center gap-2 rounded-md border border-dashed px-2.5 py-2"
        style={{
          borderColor: "color-mix(in srgb, var(--pillar-4) 55%, transparent)",
          background: "color-mix(in srgb, var(--pillar-4) 7%, transparent)",
        }}
      >
        <span
          className="text-[8.5px] uppercase tracking-[0.16em]"
          style={{ color: "var(--pillar-4)" }}
        >
          Agreed next step
        </span>
        <span className="ml-auto h-1.5 w-10 rounded-full bg-fg/8" />
      </div>
    </Frame>
  );
}

/** 02 — the proposal reopened, one more resource attached. */
export function SceneOneMorePass() {
  return (
    <Frame>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[8.5px] uppercase tracking-[0.2em] text-faint">
          Proposal · v4
        </p>
        <span
          className="rounded-full px-2 py-0.5 text-[8px] uppercase tracking-[0.14em]"
          style={{
            background: "color-mix(in srgb, var(--pillar-2) 16%, transparent)",
            color: "var(--pillar-2)",
          }}
        >
          Reopened
        </span>
      </div>
      <DoneRows rows={2} />
      {/* Two attachments where one recommendation belongs. */}
      <div className="mt-3 space-y-1.5">
        {["Bonus framework.pdf", "Extra walkthrough.mp4"].map((name) => (
          <div
            key={name}
            className="flex items-center gap-2 rounded-md border border-line bg-card px-2.5 py-1.5"
          >
            <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0" fill="none">
              <path
                d="M21 11.5 12.5 20a5 5 0 0 1-7-7l8.5-8.5a3.5 3.5 0 0 1 5 5L10.5 18a2 2 0 0 1-3-3l8-8"
                stroke="var(--pillar-2)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="truncate text-[10px] text-muted">{name}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/** 03 — everything shipped except the message that asks. */
export function SceneUnsent() {
  return (
    <Frame>
      <p className="mb-3 text-[8.5px] uppercase tracking-[0.2em] text-faint">
        This week
      </p>
      <div className="grid grid-cols-3 gap-1.5">
        {["Post", "Guide", "Webinar", "Newsletter", "Template", "Case note"].map(
          (item) => (
            <span
              key={item}
              className="truncate rounded-md border border-line bg-card px-1.5 py-1 text-center text-[8.5px] text-faint"
            >
              {item}
            </span>
          )
        )}
      </div>
      {/* One draft, still sitting in the outbox. */}
      <div
        className="mt-3 flex items-center gap-2 rounded-md border px-2.5 py-2"
        style={{
          borderColor: "color-mix(in srgb, var(--pillar-3) 45%, transparent)",
          background: "color-mix(in srgb, var(--pillar-3) 8%, transparent)",
        }}
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none">
          <path
            d="M3 11.5 21 3l-8.5 18-2.5-7.5L3 11.5Z"
            stroke="var(--pillar-3)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[10px] text-fg">Follow-up to Dana</span>
        <span
          className="ml-auto shrink-0 text-[8.5px] uppercase tracking-[0.14em]"
          style={{ color: "var(--pillar-3)" }}
        >
          Draft
        </span>
      </div>
    </Frame>
  );
}

export const RECOGNITION_SCENES = [
  SceneCallEnded,
  SceneOneMorePass,
  SceneUnsent,
];
