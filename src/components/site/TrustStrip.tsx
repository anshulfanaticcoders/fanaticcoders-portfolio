"use client";

import { motion } from "motion/react";
import {
  Palette,
  Code2,
  Search,
  Database,
  LayoutDashboard,
  Wrench,
} from "lucide-react";

const items = [
  { icon: Palette, label: "Design Systems" },
  { icon: Code2, label: "Frontend Engineering" },
  { icon: Database, label: "Backend & Data" },
  { icon: Search, label: "SEO Growth" },
  { icon: LayoutDashboard, label: "Admin Systems" },
  { icon: Wrench, label: "Custom Builds" },
];

export function TrustStrip() {
  return (
    <section className="relative border-y border-[var(--color-line)] bg-[linear-gradient(180deg,#070608_0%,#0a0a0d_100%)]">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-3 md:grid-cols-6">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group flex items-center gap-3 text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--color-line)] bg-white/[0.02] transition-all duration-300 group-hover:border-[var(--color-champagne)]/50 group-hover:bg-[var(--color-champagne)]/[0.04]">
                  <Icon
                    size={15}
                    className="text-[var(--color-ink-muted)] transition-colors group-hover:text-[var(--color-champagne)]"
                  />
                </span>
                <span className="text-[13px] tracking-wide">{item.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
