"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

type Case = {
  label: string;
  discipline: string;
  summary: string;
  accent: "champagne" | "cyan";
  cover: string;
};

const cases: Case[] = [
  {
    label: "Luxury Brand Platform",
    discipline: "Design · Next.js · Supabase",
    summary:
      "A multi-surface marketing and editorial platform for a luxury hospitality group.",
    accent: "champagne",
    cover:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&h=750&fit=crop&auto=format&q=80",
  },
  {
    label: "SEO Landing System",
    discipline: "Programmatic SEO · Content Ops",
    summary:
      "Templated landing architecture for a 400-city service business — built to scale rankings, not bloat.",
    accent: "cyan",
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=750&fit=crop&auto=format&q=80",
  },
  {
    label: "Custom WordPress Build",
    discipline: "WordPress · ACF · Headless",
    summary:
      "Editorial WordPress with a bespoke block library, headless previews, and Lighthouse 95+.",
    accent: "champagne",
    cover:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=750&fit=crop&auto=format&q=80",
  },
  {
    label: "Admin & CMS Platform",
    discipline: "Next.js · Supabase · RLS",
    summary:
      "Internal CMS for a media team — roles, uploads, audit, and a quiet, fast editing experience.",
    accent: "cyan",
    cover:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=750&fit=crop&auto=format&q=80",
  },
];

export function Work() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
    dragFree: false,
    duration: 28,
  });
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    const onReinit = () => {
      setSnapCount(emblaApi.scrollSnapList().length);
      onSelect();
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onReinit);
    onReinit();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onReinit);
    };
  }, [emblaApi]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

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

        {/* Carousel header */}
        <div className="mt-12 flex items-center justify-between">
          <p className="font-display text-[14px] tracking-[0.3em] text-[var(--color-ink-dim)]">
            <span className="text-[var(--color-champagne)]">
              {String(selected + 1).padStart(2, "0")}
            </span>
            <span className="mx-2 text-[var(--color-line-strong)]">/</span>
            <span>{String(cases.length).padStart(2, "0")}</span>
          </p>
          <div className="flex items-center gap-2">
            <CarouselButton
              onClick={prev}
              disabled={selected === 0}
              label="Previous case"
            >
              <ArrowLeft size={16} />
            </CarouselButton>
            <CarouselButton
              onClick={next}
              disabled={selected >= snapCount - 1}
              label="Next case"
            >
              <ArrowRight size={16} />
            </CarouselButton>
          </div>
        </div>

        {/* Embla viewport */}
        <div className="mt-6 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {cases.map((c, i) => (
              <div
                key={c.label}
                className="min-w-0 shrink-0 basis-[88%] sm:basis-[60%] lg:basis-[47%]"
              >
                <WorkCard {...c} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: snapCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to case ${i + 1}`}
              className={cn(
                "h-[3px] rounded-full transition-all duration-500",
                i === selected
                  ? "w-10 bg-[var(--color-champagne)]"
                  : "w-5 bg-[var(--color-line-strong)] hover:bg-[var(--color-ink-dim)]",
              )}
            />
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

function CarouselButton({
  onClick,
  disabled,
  children,
  label,
}: {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "grid h-11 w-11 place-items-center rounded-full border transition-all duration-300",
        disabled
          ? "cursor-not-allowed border-[var(--color-line)] text-[var(--color-ink-dim)]"
          : "border-[var(--color-line-strong)] text-[var(--color-ink)] hover:border-[var(--color-champagne)]/60 hover:bg-[var(--color-champagne)]/[0.06] hover:text-[var(--color-champagne)]",
      )}
    >
      {children}
    </button>
  );
}

function WorkCard({
  label,
  discipline,
  summary,
  accent,
  cover,
  index,
}: Case & { index: number }) {
  const accentColor =
    accent === "cyan" ? "var(--color-cyan)" : "var(--color-champagne)";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="group relative overflow-hidden rounded-3xl border border-[var(--color-line-strong)] bg-[var(--color-canvas-soft)] transition-all duration-500 hover:border-[var(--color-champagne)]/40 hover:shadow-[0_30px_80px_-40px_rgba(215,181,109,0.35)]"
    >
      {/* visual */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--color-line)]">
        <Image
          src={cover}
          alt={`${label} cover preview`}
          fill
          sizes="(min-width: 1024px) 47vw, (min-width: 640px) 60vw, 88vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          unoptimized
        />
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
            className="font-display text-[120px] font-light leading-none tracking-[-0.04em] text-white/[0.18] transition-[color,text-shadow] duration-[600ms] ease-out [text-shadow:0_2px_18px_rgba(0,0,0,0.4)] group-hover:text-[var(--color-champagne)]/55 group-hover:[text-shadow:0_2px_40px_rgba(215,181,109,0.55)]"
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
