"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/content/site";
import { PrimaryCta } from "./Buttons";

const INTERVAL = 5000;

function Highlighted({ text, highlight }: { text: string; highlight: string }) {
  const i = text.indexOf(highlight);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <b>{highlight}</b>
      {text.slice(i + highlight.length)}
    </>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const timer = useRef<number | null>(null);
  const n = testimonials.length;

  const go = useCallback((step: number) => setActive((a) => (a + step + n) % n), [n]);

  const stop = useCallback(() => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
  }, []);
  const restart = useCallback(() => {
    stop();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = window.setInterval(() => go(1), INTERVAL);
  }, [go, stop]);

  useEffect(() => {
    restart();
    const onVis = () => (document.hidden ? stop() : restart());
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [restart, stop]);

  return (
    <section className="section" id="testimonials" aria-labelledby="tHeading">
      <div className="wrap">
        <p className="eyebrow">05 — Clients</p>
        <h2 className="section-title section-title--sm" id="tHeading" style={{ marginTop: "1rem" }}>
          What working with me is like.
        </h2>

        <div
          className="tstack"
          aria-live="polite"
          onPointerEnter={stop}
          onPointerLeave={restart}
          onFocus={stop}
          onBlur={restart}
        >
          {testimonials.map((t, i) => {
            const d = (i - active + n) % n;
            return (
              <article
                key={t.name}
                className="tcard"
                data-active={d === 0}
                data-visible={d > 0 && d < 3}
                inert={d !== 0}
                style={{ "--d": d, zIndex: n - d } as React.CSSProperties}
              >
                <Quote className="tquote" size={28} strokeWidth={1.5} aria-hidden />
                <blockquote>
                  “<Highlighted text={t.quote} highlight={t.highlight} />”
                </blockquote>
                <div className="tcard__who">
                  <span className="tcard__avatar" aria-hidden>
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="tcard__name">{t.name}</p>
                    <p className="tcard__role">{t.role}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="tcontrols">
          <button type="button" className="icon-btn" aria-label="Previous testimonial" onClick={() => { go(-1); restart(); }}>
            <ChevronLeft size={20} aria-hidden />
          </button>
          <button type="button" className="icon-btn" aria-label="Next testimonial" onClick={() => { go(1); restart(); }}>
            <ChevronRight size={20} aria-hidden />
          </button>
          <p className="tcount">
            {active + 1} / {n}
          </p>
        </div>

        {/* CRO: primary CTA immediately after social proof */}
        <div className="after-proof">
          <PrimaryCta />
          <p>Free 20-minute call. If I&apos;m not the right fit, I&apos;ll tell you who is.</p>
        </div>
      </div>
    </section>
  );
}
