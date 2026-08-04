"use client";

// Scroll-triggered entrance. Motion intent: orchestrate section entrances so
// content arrives in reading order instead of all at once. Falls back to
// fully-visible content when IntersectionObserver is unavailable and under
// prefers-reduced-motion (handled in CSS).

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger offset in ms, for sibling reveals (30-60ms steps). */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
  /**
   * Skip the scroll-triggered entrance and show the content straight away.
   * Use for media that must be visible the moment the page loads (e.g. the
   * hero VSL and the testimonial video reel) so a video never sits hidden
   * behind an un-triggered fade.
   */
  immediate?: boolean;
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Immediate content is already visible via the `is-visible` class below;
    // nothing to observe.
    if (immediate) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  const Tag = as;
  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      // `is-visible` from first paint when immediate: no opacity:0 flash, and
      // the content is present even before hydration / if JS never runs.
      className={`reveal ${immediate ? "is-visible" : ""} ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
