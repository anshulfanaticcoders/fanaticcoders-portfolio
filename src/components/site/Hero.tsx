"use client";

import { motion } from "motion/react";
import { ArrowDown, Sparkle } from "lucide-react";
import { Button } from "./Button";
import { HeroRobot } from "./HeroRobot";

const ease = [0.22, 1, 0.36, 1] as const;

function EngineerI() {
  return (
    <span className="relative inline-block">
      {/* dotless i (U+0131) */}
      ı
      <motion.span
        aria-hidden
        initial={{ opacity: 0, y: -38, scale: 0.45 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: 1.75,
          opacity: { duration: 0.3, delay: 1.75 },
          scale: { duration: 0.5, delay: 1.75, ease },
          y: {
            type: "spring",
            stiffness: 320,
            damping: 16,
            mass: 0.7,
            delay: 1.75,
          },
        }}
        className="pointer-events-none absolute left-1/2 top-[0.1em] block h-[0.14em] w-[0.14em] -translate-x-1/2 rounded-full bg-[var(--color-champagne)] shadow-[0_0_12px_rgba(215,181,109,0.6)]"
      />
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 md:pt-36">
      {/* Atmosphere */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-hairline opacity-60" />
        <div className="absolute left-1/2 top-[-10%] h-[640px] w-[640px] -translate-x-1/2 rounded-full glow-champagne blur-[40px]" />
        <div className="absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full glow-cyan blur-[60px]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[var(--color-canvas)]" />
      </div>

      {/* Robot — ambient background, right side */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[4%] top-1/2 -z-[1] hidden w-[640px] -translate-y-1/2 opacity-[0.55] md:block lg:w-[720px] xl:w-[760px]"
      >
        <HeroRobot ambient />
      </div>
      {/* mobile robot — behind text */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-30%] top-32 -z-[1] w-[420px] opacity-30 md:hidden"
      >
        <HeroRobot ambient />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-12 gap-x-8 gap-y-10 px-6 pb-24 md:pb-28">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="col-span-12 flex items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] bg-[rgba(8,8,11,0.6)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--color-ink-muted)] backdrop-blur">
            <span className="relative grid h-1.5 w-1.5 place-items-center">
              <span className="absolute inset-0 rounded-full bg-[var(--color-champagne)]" />
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-champagne)] opacity-60" />
            </span>
            Accepting select Q3 engagements
          </span>
        </motion.div>

        {/* Content */}
        <div className="col-span-12 flex flex-col">
          <h1 className="font-display text-[clamp(2.6rem,7vw,6rem)] font-light leading-[1.02] tracking-[-0.02em] text-[var(--color-ink)] [text-shadow:0_1px_30px_rgba(0,0,0,0.45)]">
            {[
              "We engineer",
              "premium web systems",
              "for brands that obsess",
              "over the details.",
            ].map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.2 + i * 0.08 }}
                className="block"
              >
                {i === 0 ? (
                  <>
                    We eng
                    <EngineerI />
                    neer
                  </>
                ) : i === 1 ? (
                  <span className="italic text-[var(--color-champagne)]">
                    {line}
                  </span>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.55 }}
            className="mt-8 max-w-2xl text-[17px] leading-[1.7] text-[var(--color-ink-muted)]"
          >
            A small, senior team building design, development and SEO that
            holds up to scrutiny — Next.js, Supabase, Laravel, WordPress, React
            and Vue, shipped with editorial polish.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button href="#contact">Start a Project</Button>
            <Button href="#services" variant="ghost">
              Explore Services
            </Button>
          </motion.div>

          {/* stack ribbon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.95 }}
            className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.28em] text-[var(--color-ink-dim)]"
          >
            <span>Stack</span>
            <span aria-hidden className="h-px w-6 bg-[var(--color-line-strong)]" />
            <span>Next.js</span>
            <span className="text-[var(--color-champagne)]/60">·</span>
            <span>Supabase</span>
            <span className="text-[var(--color-champagne)]/60">·</span>
            <span>Laravel</span>
            <span className="text-[var(--color-champagne)]/60">·</span>
            <span>WordPress</span>
            <span className="text-[var(--color-champagne)]/60">·</span>
            <span>React / Vue</span>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="col-span-12 mt-8 flex items-center justify-between border-t border-[var(--color-line)] pt-6 text-[11px] uppercase tracking-[0.3em] text-[var(--color-ink-dim)]"
        >
          <span className="inline-flex items-center gap-2">
            <Sparkle size={12} className="text-[var(--color-champagne)]" />
            Est. craft over volume
          </span>
          <span className="inline-flex items-center gap-2">
            Scroll <ArrowDown size={12} />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
