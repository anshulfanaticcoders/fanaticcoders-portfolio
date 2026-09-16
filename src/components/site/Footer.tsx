"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/content/site";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const footer = ref.current;
    const dot = dotRef.current;
    if (!footer || !dot || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer__name",
        { xPercent: 4, yPercent: 12 },
        { xPercent: -4, yPercent: -6, ease: "none", scrollTrigger: { trigger: footer, start: "top bottom", end: "bottom bottom", scrub: true } },
      );
    }, footer);

    const xTo = gsap.quickTo(dot, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.6, ease: "power3" });
    let box: DOMRect | null = null;
    const measure = () => (box = footer.getBoundingClientRect());
    const enter = () => {
      measure();
      gsap.to(dot, { opacity: 0.9, duration: 0.3 });
    };
    const leave = () => gsap.to(dot, { opacity: 0, duration: 0.3 });
    const move = (e: PointerEvent) => {
      if (box) {
        xTo(e.clientX - box.left - 7);
        yTo(e.clientY - box.top - 7);
      }
    };
    footer.addEventListener("pointerenter", enter);
    footer.addEventListener("pointerleave", leave);
    footer.addEventListener("pointermove", move);
    window.addEventListener("resize", measure);
    return () => {
      ctx.revert();
      footer.removeEventListener("pointerenter", enter);
      footer.removeEventListener("pointerleave", leave);
      footer.removeEventListener("pointermove", move);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <footer className="footer" ref={ref}>
      <span className="footer__dot" ref={dotRef} aria-hidden />
      <div className="wrap">
        <div className="footer__meta">
          <p>
            © {new Date().getFullYear()} {site.name} — {site.role}, {site.locationShort}.
          </p>
          <p>
            {site.email && (
              <>
                <a href={`mailto:${site.email}`}>{site.email}</a> ·{" "}
              </>
            )}
            <a href={site.ctaHref}>{site.ctaLabel}</a>
          </p>
        </div>
        <p className="footer__name" aria-hidden>
          {site.name.toUpperCase()}
        </p>
      </div>
    </footer>
  );
}
