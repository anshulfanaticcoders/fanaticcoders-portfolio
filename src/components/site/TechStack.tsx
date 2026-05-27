"use client";

import { motion } from "motion/react";
import {
  Atom,
  Braces,
  Brush,
  Cloud,
  Cpu,
  Database,
  FileCode2,
  Flame,
  Hexagon,
  Newspaper,
  Palette,
  Server,
  Share2,
  Triangle,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { SectionLabel } from "./SectionLabel";

type Tech = { name: string; category: "Frontend" | "Backend" | "CMS & Data" };

const tech: Tech[] = [
  { name: "HTML", category: "Frontend" },
  { name: "CSS", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Vue", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "PHP", category: "Backend" },
  { name: "Laravel", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "REST & GraphQL", category: "Backend" },
  { name: "MySQL", category: "CMS & Data" },
  { name: "PostgreSQL", category: "CMS & Data" },
  { name: "Supabase", category: "CMS & Data" },
  { name: "WordPress", category: "CMS & Data" },
  { name: "Custom Themes", category: "CMS & Data" },
];

const groups: Tech["category"][] = ["Frontend", "Backend", "CMS & Data"];

const ribbonItems: { name: string; icon: LucideIcon }[] = [
  { name: "HTML", icon: FileCode2 },
  { name: "CSS", icon: Brush },
  { name: "JavaScript", icon: Braces },
  { name: "TypeScript", icon: Braces },
  { name: "React", icon: Atom },
  { name: "Vue", icon: Triangle },
  { name: "Next.js", icon: Hexagon },
  { name: "Tailwind CSS", icon: Wind },
  { name: "PHP", icon: Server },
  { name: "Laravel", icon: Flame },
  { name: "Node.js", icon: Cpu },
  { name: "REST & GraphQL", icon: Share2 },
  { name: "MySQL", icon: Database },
  { name: "PostgreSQL", icon: Database },
  { name: "Supabase", icon: Cloud },
  { name: "WordPress", icon: Newspaper },
  { name: "Custom Themes", icon: Palette },
];

export function TechStack() {
  return (
    <section className="relative overflow-hidden border-y border-[var(--color-line)] py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 -z-10 h-[420px] -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(127,227,214,0.08),transparent_70%)]"
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Capabilities</SectionLabel>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.05] tracking-[-0.02em]">
              A stack chosen for{" "}
              <span className="italic text-[var(--color-cyan)]">longevity</span>,
              not novelty.
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-[1.7] text-[var(--color-ink-muted)]">
            Modern frameworks where they help. Mature platforms where they
            earn their keep. We carry both fluencies into every build.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {groups.map((group, gi) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
              className="rounded-2xl border border-[var(--color-line-strong)] bg-[var(--color-canvas-soft)] p-6"
            >
              <div className="flex items-center justify-between">
                <p className="font-display text-[13px] uppercase tracking-[0.32em] text-[var(--color-ink-muted)]">
                  {group}
                </p>
                <span className="font-display text-[11px] text-[var(--color-ink-dim)]">
                  /0{gi + 1}
                </span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {tech
                  .filter((t) => t.category === group)
                  .map((t) => (
                    <li key={t.name}>
                      <span className="group inline-flex cursor-default items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-canvas)] px-3 py-1.5 text-[13px] text-[var(--color-ink)] transition-all duration-300 hover:border-[var(--color-champagne)]/60 hover:bg-[var(--color-champagne)]/[0.06]">
                        <span className="h-1 w-1 rounded-full bg-[var(--color-champagne)]/70 transition-all duration-300 group-hover:bg-[var(--color-champagne)] group-hover:shadow-[0_0_8px_rgba(215,181,109,0.7)]" />
                        {t.name}
                      </span>
                    </li>
                  ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-bleed marquee ribbon */}
      <div className="relative mt-20 w-full overflow-hidden border-y border-[var(--color-line)] py-7">
        <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
          {[...ribbonItems, ...ribbonItems].map((t, i) => {
            const Icon = t.icon;
            return (
              <span
                key={`${t.name}-${i}`}
                className="group inline-flex items-center gap-3 rounded-full px-6 py-2 font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-light tracking-[-0.01em] text-[var(--color-ink-dim)] transition-all duration-300 hover:bg-[var(--color-champagne)]/[0.08] hover:text-[var(--color-champagne)] hover:shadow-[0_0_60px_-8px_rgba(215,181,109,0.55),inset_0_0_0_1px_rgba(215,181,109,0.25)]"
              >
                <Icon
                  size={26}
                  strokeWidth={1.5}
                  className="opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span>{t.name}</span>
                <span
                  aria-hidden
                  className="ml-6 text-[var(--color-champagne)]/30"
                >
                  /
                </span>
              </span>
            );
          })}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--color-canvas)] to-transparent md:w-56" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--color-canvas)] to-transparent md:w-56" />
      </div>
    </section>
  );
}
