"use client";

import { useEffect, type RefObject } from "react";
import { gsap, prefersReducedMotion } from "./gsap";

/**
 * Staggered scroll reveal for every `selector` match inside `scope`.
 * One helper reused by every section so the "enter" feel is identical everywhere.
 */
export function useReveal(
  scope: RefObject<HTMLElement | null>,
  selector: string,
  options: { y?: number; stagger?: number; start?: string } = {},
) {
  const { y = 40, stagger = 0.08, start = "top 80%" } = options;
  useEffect(() => {
    const el = scope.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(selector, {
        opacity: 0,
        y,
        duration: 0.7,
        ease: "power3.out",
        stagger,
        scrollTrigger: { trigger: el, start },
      });
    }, el);
    return () => ctx.revert();
  }, [scope, selector, y, stagger, start]);
}
