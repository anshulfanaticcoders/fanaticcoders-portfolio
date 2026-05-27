"use client";

import { motion } from "motion/react";
import {
  Layers,
  Code2,
  Boxes,
  TrendingUp,
  Globe,
  LayoutDashboard,
  ArrowUpRight,
} from "lucide-react";
import { SectionLabel } from "./SectionLabel";

const services = [
  {
    icon: Layers,
    title: "Design Systems",
    copy: "Editorial-grade design languages with tokens, components, and motion principles that scale across surfaces.",
    stack: ["Figma", "Tokens", "Motion"],
  },
  {
    icon: Code2,
    title: "Frontend Development",
    copy: "Polished interfaces built with Next.js, React, and Vue — typed, accessible, and finished to the last hairline.",
    stack: ["Next.js", "React", "Vue", "TypeScript"],
  },
  {
    icon: Boxes,
    title: "Full-Stack Engineering",
    copy: "End-to-end product platforms with Supabase, Laravel, and Postgres — auth, data, RLS, and real workflows.",
    stack: ["Supabase", "Laravel", "Postgres"],
  },
  {
    icon: TrendingUp,
    title: "SEO Growth",
    copy: "Technical SEO, content systems, structured data and editorial briefs that compound over months — not gimmicks.",
    stack: ["Tech SEO", "Schema", "Content"],
  },
  {
    icon: Globe,
    title: "WordPress & Custom Themes",
    copy: "Bespoke WordPress builds and headless setups for editorial teams who want performance without the templated feel.",
    stack: ["WordPress", "PHP", "ACF"],
  },
  {
    icon: LayoutDashboard,
    title: "Admin & CMS Platforms",
    copy: "Quiet, fast admin surfaces — content modeling, roles, uploads, and audit so the team actually enjoys using it.",
    stack: ["Next.js", "Supabase", "RLS"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-28 md:py-36">
      <div aria-hidden className="absolute inset-0 -z-10 bg-hairline opacity-30" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <SectionLabel>Services</SectionLabel>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-light leading-[1.05] tracking-[-0.02em]">
              Six disciplines,
              <span className="italic text-[var(--color-champagne)]">
                {" one studio."}
              </span>
            </h2>
          </div>
          <p className="col-span-12 max-w-xl self-end text-[15px] leading-[1.7] text-[var(--color-ink-muted)] md:col-span-6 md:col-start-7">
            We don&apos;t broker work. Every engagement is shaped, designed,
            built and tuned by the same small team — which is why the seams
            stay clean from kickoff through launch.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-[var(--color-line-strong)] bg-[var(--color-line)] md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  copy,
  stack,
  index,
}: (typeof services)[number] & { index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className="group relative flex min-h-[320px] flex-col justify-between bg-[var(--color-canvas-soft)] p-7 transition-colors duration-500 hover:bg-[var(--color-canvas-raised)]"
    >
      {/* hover halo */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_var(--mx,50%)_var(--my,0%),rgba(215,181,109,0.06),transparent_40%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-champagne)]/0 to-transparent transition-all duration-700 group-hover:via-[var(--color-champagne)]/60"
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-canvas)] text-[var(--color-champagne)] transition-transform duration-500 group-hover:-translate-y-0.5">
            <Icon size={18} strokeWidth={1.5} />
          </span>
          <span className="font-display text-[12px] tracking-[0.3em] text-[var(--color-ink-dim)]">
            0{index + 1}
          </span>
        </div>

        <h3 className="mt-7 font-display text-[22px] font-normal leading-tight tracking-tight text-[var(--color-ink)]">
          {title}
        </h3>
        <p className="mt-3 text-[14px] leading-[1.65] text-[var(--color-ink-muted)]">
          {copy}
        </p>
      </div>

      <div className="relative mt-8 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {stack.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--color-line)] px-2.5 py-1 text-[11px] tracking-wide text-[var(--color-ink-muted)]"
            >
              {t}
            </span>
          ))}
        </div>
        <ArrowUpRight
          size={16}
          className="text-[var(--color-ink-dim)] transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-champagne)]"
        />
      </div>
    </motion.article>
  );
}
