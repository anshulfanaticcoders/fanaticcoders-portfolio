"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { BriefcaseBusiness, MapPin, Zap } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/content/site";
import { Morph } from "./Morph";
import { GhostCta, PrimaryCta } from "./Buttons";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const drift = (sel: string, x: number, y: number, dur: number) =>
        gsap.to(sel, { xPercent: x, yPercent: y, scale: 1.15, duration: dur, repeat: -1, yoyo: true, ease: "sine.inOut" });
      drift(".blob--a", 12, 10, 14);
      drift(".blob--b", -14, 8, 18);
      drift(".blob--c", 8, -12, 16);

      gsap.from(".hero__inner > *", { opacity: 0, y: 28, duration: 0.9, ease: "power3.out", stagger: 0.09, delay: 0.1 });
      gsap.from(".hero__figure", { opacity: 0, x: 40, duration: 1.4, ease: "power3.out", delay: 0.4 });
    }, el);

    // light cursor tilt on the avatar (pointer devices only)
    const figure = el.querySelector<HTMLElement>(".hero__figure img");
    let onMove: ((e: PointerEvent) => void) | null = null;
    if (figure && !window.matchMedia("(hover: none)").matches) {
      const xTo = gsap.quickTo(figure, "x", { duration: 0.9, ease: "power3" });
      const yTo = gsap.quickTo(figure, "y", { duration: 0.9, ease: "power3" });
      onMove = (e) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        xTo(nx * 18);
        yTo(ny * 12);
      };
      el.addEventListener("pointermove", onMove);
    }
    return () => {
      ctx.revert();
      if (onMove) el.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section className="hero" id="hero" ref={ref}>
      <div className="aurora" aria-hidden>
        <span className="blob blob--a" />
        <span className="blob blob--b" />
        <span className="blob blob--c" />
      </div>

      <div className="hero__figure" aria-hidden>
        <Image src="/anshul-hero.jpg" alt="" width={1100} height={1604} priority />
      </div>

      <div className="wrap hero__inner">
        <p className="badge">
          <span className="badge__dot" aria-hidden />
          {site.availability} · {site.locationShort}
        </p>

        <h1 className="hero__title">
          <span className="line hero__name">{site.name}</span>
          <span className="line hero__role">
            builds <Morph words={site.heroWords} />
          </span>
        </h1>

        <p className="hero__vp">
          Freelance full stack developer with <strong>{site.experienceYears}+ years</strong> shipping Shopify
          stores, WordPress sites, React and Laravel apps, mobile apps and SaaS products —{" "}
          <strong>one person, start to finish</strong>, no agency layer.
        </p>

        <div className="hero__actions">
          <PrimaryCta />
          <GhostCta href="#work">See the work</GhostCta>
        </div>

        <ul className="hero__meta" aria-label="Quick facts">
          <li>
            <BriefcaseBusiness size={16} aria-hidden /> {site.experienceYears} years experience
          </li>
          <li>
            <MapPin size={16} aria-hidden /> {site.location}
          </li>
          <li>
            <Zap size={16} aria-hidden /> Fixed quotes, weekly demos
          </li>
        </ul>
      </div>
    </section>
  );
}
