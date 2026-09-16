"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useReveal } from "@/lib/motion";
import { projects, trailImages } from "@/content/site";

export function Work() {
  const ref = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useReveal(ref, ".work-row");

  // Image trail — fixed pool, round-robin, distance-throttled. Pointer devices only.
  useEffect(() => {
    const intro = introRef.current;
    const trail = trailRef.current;
    if (!intro || !trail || prefersReducedMotion() || window.matchMedia("(hover: none)").matches) return;

    const imgs = Array.from(trail.querySelectorAll("img"));
    let slot = 0;
    let lastX = 0;
    let lastY = 0;
    let primed = false;

    const onMove = (e: PointerEvent) => {
      const box = trail.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      if (!primed) {
        lastX = x;
        lastY = y;
        primed = true;
        return;
      }
      if (Math.hypot(x - lastX, y - lastY) < 60) return;
      lastX = x;
      lastY = y;

      const img = imgs[slot];
      slot = (slot + 1) % imgs.length;
      gsap.killTweensOf(img);
      gsap.fromTo(
        img,
        { x: x - 90, y: y - 112, scale: 0.7, opacity: 0, rotate: gsap.utils.random(-8, 8) },
        {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
          onComplete: () => gsap.to(img, { opacity: 0, scale: 0.9, duration: 0.5, delay: 0.35, ease: "power2.in" }),
        },
      );
    };
    intro.addEventListener("pointermove", onMove);
    return () => {
      intro.removeEventListener("pointermove", onMove);
      gsap.killTweensOf(imgs);
    };
  }, []);

  // Native <dialog>: focus trap, Esc and inertness for free.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIdx === null) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
    if (!prefersReducedMotion()) {
      gsap.from(dialog.querySelectorAll(".detail__inner > *"), {
        opacity: 0,
        y: 18,
        duration: 0.45,
        stagger: 0.05,
        ease: "power3.out",
      });
    }
  }, [openIdx]);

  const project = openIdx === null ? null : projects[openIdx];

  return (
    <section className="section" id="work" aria-labelledby="workHeading" ref={ref}>
      <div className="wrap">
        <div className="work__intro" ref={introRef}>
          <div className="trail" ref={trailRef} aria-hidden>
            {trailImages.map((src, i) => (
              <Image key={i} src={src} alt="" width={180} height={225} loading="lazy" />
            ))}
          </div>
          <p className="eyebrow">02 — Selected work</p>
          <h2 className="section-title" id="workHeading" style={{ marginTop: "1rem" }}>
            Built to run,
            <br />
            not just to demo.
          </h2>
          <p className="lede" style={{ marginTop: "1.5rem" }}>
            Live client sites — each one shipped, hosted and still in production. Open a row for what was
            built, then visit the real thing.
          </p>
        </div>

        <div className="work__list">
          {projects.map((p, i) => (
            <button
              key={p.title}
              type="button"
              className="work-row"
              aria-haspopup="dialog"
              onClick={() => setOpenIdx(i)}
            >
              <span className="work-row__idx">0{i + 1}</span>
              <span className="work-row__main">
                <span className="work-row__title">{p.title}</span>
                <span className="work-row__tag">{p.tag}</span>
              </span>
              <span className="work-row__thumb">
                <Image src={p.image} alt="" width={160} height={100} loading="lazy" />
              </span>
              <span className="work-row__outcome">{p.stack}</span>
              <span className="work-row__arrow">
                <ArrowUpRight size={20} aria-hidden />
              </span>
            </button>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="detail"
        aria-labelledby="detailTitle"
        onClose={() => setOpenIdx(null)}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
      >
        {project && (
          <div className="detail__inner">
            <button type="button" className="detail__close" aria-label="Close project details" onClick={() => dialogRef.current?.close()}>
              <X size={20} aria-hidden />
            </button>
            <h3 id="detailTitle">{project.title}</h3>
            <div className="detail__meta">
              <span className="is-outcome">{project.stack}</span>
              <span>{project.tag}</span>
            </div>
            <Image className="detail__img" src={project.image} alt={project.alt} width={1440} height={900} priority />
            <p>{project.summary}</p>
            <ul>
              {project.points.map(([b, rest]) => (
                <li key={b}>
                  <span>
                    <b>{b}</b> — {rest}
                  </span>
                </li>
              ))}
            </ul>
            <a className="btn-ghost detail__visit" href={project.url} target="_blank" rel="noreferrer">
              Visit {project.title} <ArrowUpRight size={16} aria-hidden />
            </a>
          </div>
        )}
      </dialog>
    </section>
  );
}
