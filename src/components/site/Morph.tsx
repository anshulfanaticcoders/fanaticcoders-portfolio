"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Cycles through `words` with a blur/slide morph. Words overlap in one grid
 * cell so the element is always as wide as its longest word — no layout shift.
 */
export function Morph({
  words,
  interval = 2600,
  className,
}: {
  words: readonly string[];
  interval?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || words.length < 2) return;
    const spans = Array.from(el.children) as HTMLElement[];
    // Reset to a known state — protects against a hot reload restarting the cycle mid-word.
    gsap.set(spans, { opacity: 0, yPercent: 0, filter: "blur(0px)" });
    gsap.set(spans[0], { opacity: 1 });
    let i = 0;
    const id = window.setInterval(() => {
      const cur = spans[i];
      i = (i + 1) % spans.length;
      const next = spans[i];
      gsap.to(cur, { opacity: 0, yPercent: -35, filter: "blur(12px)", duration: 0.5, ease: "power2.in" });
      gsap.fromTo(
        next,
        { opacity: 0, yPercent: 35, filter: "blur(12px)" },
        { opacity: 1, yPercent: 0, filter: "blur(0px)", duration: 0.6, ease: "power2.out" },
      );
    }, interval);
    return () => {
      window.clearInterval(id);
      gsap.killTweensOf(spans);
      gsap.set(spans, { clearProps: "all" }); // back to CSS: only .is-in visible
    };
  }, [words, interval]);

  return (
    <>
      <span ref={ref} className={`morph ${className ?? ""}`} aria-hidden>
        {words.map((w, i) => (
          <span key={w} className={`morph__w${i === 0 ? " is-in" : ""}`}>
            {w}
          </span>
        ))}
      </span>
      <span className="sr-only">{words.join(", ")}</span>
    </>
  );
}
