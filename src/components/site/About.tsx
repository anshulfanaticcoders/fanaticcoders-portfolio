"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useReveal } from "@/lib/motion";
import { site, techStack } from "@/content/site";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  useReveal(ref, ".about__copy > *", { y: 24, stagger: 0.07 });

  useEffect(() => {
    const wrap = portraitRef.current;
    if (!wrap || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "img",
        { yPercent: -7 },
        { yPercent: 7, ease: "none", scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true } },
      );
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="about" aria-labelledby="aboutHeading" ref={ref}>
      <div className="wrap">
        <div className="about__grid">
          <div className="portrait" ref={portraitRef}>
            <Image src={site.portrait} alt={site.portraitAlt} width={800} height={1000} loading="lazy" />
            <span className="portrait__tag">
              <MapPin size={14} aria-hidden /> {site.locationShort}
            </span>
          </div>

          <div className="about__copy">
            <p className="eyebrow">03 — About</p>
            <h2 className="section-title section-title--sm" id="aboutHeading" style={{ marginTop: "1rem" }}>
              You talk to the person who writes the code.
            </h2>
            <p className="about__bio" style={{ marginTop: "1.5rem" }}>
              I&apos;m {site.firstName}, a freelance full stack developer working from {site.locationShort}.{" "}
              <strong>{site.experienceYears} years</strong> of building for restaurants, rental companies,
              e-commerce brands and SaaS founders — as the designer, developer and the one who answers when
              something needs fixing. <strong>No handoffs, no account managers</strong>, just a fixed scope, a
              weekly demo and a launch date that holds.
            </p>

            <dl className="about__facts">
              <div>
                <dt>{site.experienceYears}+</dt>
                <dd>years freelancing</dd>
              </div>
              <div>
                <dt>{techStack.length}</dt>
                <dd>technologies in daily use</dd>
              </div>
              <div>
                <dt>1</dt>
                <dd>point of contact</dd>
              </div>
            </dl>

            <div className="stack">
              <p className="eyebrow">Stack I work in</p>
              <div className="stack-row" aria-hidden>
                {techStack.map((t, i) => (
                  <span key={t.name} className="stack-chip" style={{ "--i": i } as React.CSSProperties} title={t.name}>
                    {t.mark}
                  </span>
                ))}
              </div>
              <p className="stack-names">{techStack.map((t) => t.name).join(" · ")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
