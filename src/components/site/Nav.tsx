"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, Send, X } from "lucide-react";
import { site } from "@/content/site";

const LINKS = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "process", label: "Process" },
];
const PANEL_LINKS = [...LINKS, { id: "contact", label: "Contact" }];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [pastHero, setPastHero] = useState(false);
  const [indicator, setIndicator] = useState({ x: 0, w: 0, on: false });
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Active section → indicator
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Sticky mini-CTA once the hero is behind us
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(([en]) => setPastHero(!en.isIntersecting), {
      rootMargin: "-60% 0px 0px 0px",
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  const measure = useCallback(() => {
    const link = active ? linkRefs.current[active] : null;
    if (!link || !link.offsetParent) return setIndicator((s) => ({ ...s, on: false }));
    setIndicator({ x: link.offsetLeft, w: link.offsetWidth, on: true });
  }, [active]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Escape / outside click close the panel
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <header>
      <nav
        ref={navRef}
        className={`nav${open ? " is-open" : ""}${pastHero ? " is-past-hero" : ""}`}
        aria-label="Primary"
      >
        <div className="nav__panel" id="navPanel" aria-hidden={!open}>
          {PANEL_LINKS.map((l, i) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              {l.label} <span>0{i + 1}</span>
            </a>
          ))}
        </div>

        <div className="pill">
          <button
            type="button"
            className="pill__toggle"
            aria-expanded={open}
            aria-controls="navPanel"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="pill__links">
            <span
              className="pill__indicator"
              aria-hidden
              style={{
                width: indicator.w,
                transform: `translate(${indicator.x}px,-50%)`,
                opacity: indicator.on ? 1 : 0,
              }}
            />
            {LINKS.map((l) => (
              <a
                key={l.id}
                ref={(el) => {
                  linkRefs.current[l.id] = el;
                }}
                className="pill__link"
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            className="pill__cta"
            href={site.ctaHref}
            tabIndex={pastHero ? 0 : -1}
            aria-hidden={!pastHero}
          >
            <Send size={16} strokeWidth={2} aria-hidden />
            {site.ctaLabel}
          </a>
        </div>
      </nav>
    </header>
  );
}
