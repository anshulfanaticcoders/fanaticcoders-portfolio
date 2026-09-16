"use client";

import { useRef } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/content/site";
import { useReveal } from "@/lib/motion";
import { Morph } from "./Morph";
import { ContactForm } from "./ContactForm";
import { socialIcon } from "./SocialIcons";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, ".wrap > *", { y: 24, stagger: 0.1 });

  return (
    <section className="section contact" id="contact" aria-labelledby="contactHeading" ref={ref}>
      <div className="wrap">
        <p className="eyebrow">06 — Contact</p>
        <h2 id="contactHeading" style={{ marginTop: "1.5rem" }}>
          Let&apos;s build
          <br />
          something <Morph words={site.contactWords} interval={2900} />
        </h2>
        <p className="contact__lede">
          Tell me what you need and when. You&apos;ll get a reply within 24 hours with a fixed quote, a timeline,
          or an honest &ldquo;not the right fit&rdquo;.
        </p>

        <div className="contact__card">
          <ContactForm />
        </div>

        <div className="contact__after">
          {site.email && (
            <p className="promise">
              <Mail size={16} aria-hidden />
              Prefer email? <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          )}
          <div className="socials">
            {site.socials.map((s) => {
              const Icon = socialIcon[s.kind];
              return (
                <a key={s.label} className="flip" href={s.href} aria-label={s.label} target="_blank" rel="noreferrer">
                  <span className="flip__inner">
                    <span className="flip__face">
                      <Icon />
                    </span>
                    <span className="flip__face flip__face--back">
                      <ArrowUpRight size={22} strokeWidth={1.75} aria-hidden />
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
