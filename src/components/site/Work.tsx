"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { Button } from "./Button";

const cases = [
  {
    label: "Luxury Brand Platform",
    discipline: "Design · Next.js · Supabase",
    summary:
      "A multi-surface marketing and editorial platform for a luxury hospitality group.",
    accent: "champagne" as const,
    // Luxury hotel lobby / hospitality interior
    cover:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&h=750&fit=crop&auto=format&q=80",
  },
  {
    label: "SEO Landing System",
    discipline: "Programmatic SEO · Content Ops",
    summary:
      "Templated landing architecture for a 400-city service business — built to scale rankings, not bloat.",
    accent: "cyan" as const,
    // Analytics dashboard / charts
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=750&fit=crop&auto=format&q=80",
  },
  {
    label: "Custom WordPress Build",
    discipline: "WordPress · ACF · Headless",
    summary:
      "Editorial WordPress with a bespoke block library, headless previews, and Lighthouse 95+.",
    accent: "champagne" as const,
    // Editorial magazine layout / typography
    cover:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=750&fit=crop&auto=format&q=80",
  },
  {
    label: "Admin & CMS Platform",
    discipline: "Next.js · Supabase · RLS",
    summary:
      "Internal CMS for a media team — roles, uploads, audit, and a quiet, fast editing experience.",
    accent: "cyan" as const,
    // Code editor / dashboard UI on screen
    cover:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=750&fit=crop&auto=format&q=80",
  },
];

export function Work() {
  return (
    <section
      id="work"
      className="relative border-t border-[var(--color-line)] py-28 md:py-36"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-7">
            <SectionLabel>Selected Work</SectionLabel>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-light leading-[1.05] tracking-[-0.02em]">
              A small body of work,{" "}
              <span className="italic text-[var(--color-champagne)]">
                finished properly.
              </span>
            </h2>
          </div>
          <p className="col-span-12 max-w-md self-end text-[15px] leading-[1.7] text-[var(--color-ink-muted)] md:col-span-5">
            Detailed case studies are coming as projects unlock for public
            release. Below: the shape of recent engagements.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {cases.map((c, i) => (
            <WorkCard key={c.label} {...c} index={i} />
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-line)] pt-10 sm:flex-row sm:items-center">
          <p className="text-[14px] text-[var(--color-ink-muted)]">
            Full case studies, with metrics and process notes, are being
            prepared.
          </p>
          <Button href="#contact" variant="ghost">
            Request a portfolio review
          </Button>
        </div>
      </div>
    </section>
  );
}

function WorkCard({
  label,
  discipline,
  summary,
  accent,
  cover,
  index,
}: (typeof cases)[number] & { index: number }) {
  const accentColor =
    accent === "cyan" ? "var(--color-cyan)" : "var(--color-champagne)";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-3xl border border-[var(--color-line-strong)] bg-[var(--color-canvas-soft)] transition-all duration-500 hover:border-[var(--color-champagne)]/40 hover:shadow-[0_30px_80px_-40px_rgba(215,181,109,0.35)]"
    >
      {/* visual */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--color-line)]">
        <Image
          src={cover}
          alt={`${label} cover preview`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          unoptimized
        />
        {/* dark gradient for legibility */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,6,0.35)_0%,rgba(5,5,6,0.72)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-hairline opacity-30 mix-blend-overlay"
        />
        <div
          aria-hidden
          className="absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-50 blur-[60px] transition-transform duration-700 group-hover:scale-110"
          style={{
            background: `radial-gradient(closest-side, ${accentColor}40, transparent 70%)`,
          }}
        />
        <div className="absolute inset-0 flex items-end justify-between p-6">
          <span
            className="font-display text-[120px] font-light leading-none tracking-[-0.04em] text-white/[0.18] [text-shadow:0_2px_18px_rgba(0,0,0,0.4)]"
            aria-hidden
          >
            0{index + 1}
          </span>
          <span
            className="rounded-full border bg-black/50 px-3 py-1 text-[11px] uppercase tracking-[0.28em] backdrop-blur"
            style={{
              borderColor: `${accentColor}55`,
              color: accentColor,
            }}
          >
            Case · Preview
          </span>
        </div>
      </div>

      {/* meta */}
      <div className="relative p-7">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-ink-dim)]">
          {discipline}
        </p>
        <div className="mt-3 flex items-start justify-between gap-4">
          <h3 className="font-display text-[24px] font-normal leading-tight tracking-tight text-[var(--color-ink)]">
            {label}
          </h3>
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-[var(--color-ink-dim)] transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-champagne)]"
          />
        </div>
        <p className="mt-3 text-[14px] leading-[1.65] text-[var(--color-ink-muted)]">
          {summary}
        </p>
      </div>
    </motion.article>
  );
}
