"use client";

import { motion } from "motion/react";
import { Mail } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { ContactForm } from "./ContactForm";

export function CTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-[var(--color-line)] py-28 md:py-36"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[20%] h-[700px] w-[1100px] -translate-x-1/2 glow-champagne blur-[80px] opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-line-strong)] to-transparent" />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <SectionLabel className="justify-center">Contact</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.4rem,5.6vw,4.8rem)] font-light leading-[1.02] tracking-[-0.02em]">
            Let&apos;s build something
            <span className="italic text-[var(--color-champagne)]">
              {" quietly excellent."}
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-[1.7] text-[var(--color-ink-muted)]">
            Tell us about the project — the brand, the constraints, the
            ambition. We respond personally within two business days.
          </p>
          <a
            href="mailto:hello@fanaticcoders.com"
            className="mt-6 inline-flex items-center gap-2 text-[13px] text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-champagne)]"
          >
            <Mail size={14} className="text-[var(--color-champagne)]" />
            <span>or write to hello@fanaticcoders.com</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <ContactForm sourcePage="/" />
        </motion.div>
      </div>
    </section>
  );
}
