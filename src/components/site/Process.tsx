"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { process } from "@/content/site";

/** Splits text into word spans so GSAP can stagger them. */
function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(/\s+/).map((w, i) => (
        <span key={i}>
          <span className="word">{w}</span>{" "}
        </span>
      ))}
    </>
  );
}

export function Process() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const mm = gsap.matchMedia();
    mm.add(
      { wide: "(min-width: 820px)", reduce: "(prefers-reduced-motion: reduce)" },
      (ctx) => {
        const { wide, reduce } = ctx.conditions as { wide: boolean; reduce: boolean };
        if (reduce) return;
        const panels = gsap.utils.toArray<HTMLElement>(".process__panel", track);

        if (wide) {
          const distance = () => track.scrollWidth - window.innerWidth;
          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: pin,
              pin: true,
              start: "center center",
              scrub: 1,
              end: () => `+=${Math.round(distance() * 0.6)}`, // shorter scroll per panel, still scrubbed
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
          panels.forEach((panel) => {
            gsap.from(panel.querySelectorAll(".word"), {
              opacity: 0,
              yPercent: 110,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.03,
              scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 70%" },
            });
            // background drifts slower than the panel and settles from a soft zoom
            gsap.fromTo(
              panel.querySelector(".process__bg"),
              { xPercent: -10, scale: 1.18 },
              {
                xPercent: 10,
                scale: 1,
                ease: "none",
                scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
              },
            );
          });
        } else {
          panels.forEach((panel) => {
            gsap.from(panel.querySelectorAll(".word"), {
              opacity: 0,
              yPercent: 60,
              duration: 0.5,
              ease: "power3.out",
              stagger: 0.02,
              scrollTrigger: { trigger: panel, start: "top 75%" },
            });
            gsap.fromTo(
              panel.querySelector(".process__bg"),
              { yPercent: -8, scale: 1.12 },
              { yPercent: 8, scale: 1, ease: "none", scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true } },
            );
          });
        }
      },
    );
    return () => mm.revert();
  }, []);

  return (
    <section className="process" id="process" aria-labelledby="processHeading">
      <h2 className="sr-only" id="processHeading">
        How working together goes
      </h2>
      <div className="process__pin" ref={pinRef}>
        <div className="process__track" ref={trackRef}>
          {process.map((p) => (
            <article className="process__panel" key={p.step}>
              <div className="process__bg" aria-hidden>
                <Image src={p.image} alt={p.imageAlt} fill sizes="100vw" loading="eager" />
              </div>
              <div className="process__panel-inner">
                <p className="process__step" aria-hidden>
                  {p.step}
                </p>
                <div>
                  <p className="eyebrow">{p.when}</p>
                  <h3 style={{ marginTop: "1rem" }}>
                    <Words text={p.title} />
                  </h3>
                  <p className="lede">
                    <Words text={p.lede} />
                  </p>
                  <ul className="process__deliver">
                    {p.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
