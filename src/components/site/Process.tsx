"use client";

import { motion } from "motion/react";
import { Compass, PenTool, Hammer, LineChart } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

const steps = [
  {
    icon: Compass,
    title: "Discover",
    copy: "We map the business, audience, and constraints before sketching pixels. The brief becomes a thesis.",
    deliverables: ["Audit", "Strategy", "Roadmap"],
  },
  {
    icon: PenTool,
    title: "Design",
    copy: "We move from raw ideas into typography, motion, and systems — refined in shared, reviewable surfaces.",
    deliverables: ["Identity", "UI System", "Prototypes"],
  },
  {
    icon: Hammer,
    title: "Develop",
    copy: "Engineering with type-safety, accessibility, and craft. Built to be edited, not feared.",
    deliverables: ["Frontend", "Backend", "CMS"],
  },
  {
    icon: LineChart,
    title: "Optimize",
    copy: "We instrument, tune, and grow what we shipped — speed, search, conversion, content.",
    deliverables: ["SEO", "Analytics", "Iterate"],
  },
];

export function Process() {
  return (
    <section id="process" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <SectionLabel>Process</SectionLabel>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-light leading-[1.05] tracking-[-0.02em]">
              A delivery rhythm built for
              <span className="italic text-[var(--color-champagne)]">
                {" serious work."}
              </span>
            </h2>
          </div>
          <p className="col-span-12 max-w-lg self-end text-[15px] leading-[1.7] text-[var(--color-ink-muted)] md:col-span-6 md:col-start-7">
            Four phases, transparent at every step. You see the strategy, the
            files, the metrics, and the trade-offs — not a black box.
          </p>
        </div>

        <ol className="relative mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[64px] hidden h-px bg-gradient-to-r from-transparent via-[var(--color-line-strong)] to-transparent lg:block"
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative"
              >
                <div className="relative z-10 mb-6 flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-[var(--color-line-strong)] bg-[var(--color-canvas)] text-[var(--color-champagne)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.6),0_0_30px_-12px_rgba(215,181,109,0.4)]">
                    <Icon size={17} strokeWidth={1.6} />
                  </span>
                  <span className="font-display text-[14px] text-[var(--color-ink-dim)]">
                    Phase 0{i + 1}
                  </span>
                </div>

                <h3 className="font-display text-[22px] font-normal tracking-tight text-[var(--color-ink)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.65] text-[var(--color-ink-muted)]">
                  {step.copy}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {step.deliverables.map((d) => (
                    <li
                      key={d}
                      className="rounded-full border border-[var(--color-line)] px-2.5 py-1 text-[11px] tracking-wide text-[var(--color-ink-muted)]"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
