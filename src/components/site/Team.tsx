"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

type Seat = {
  name: string;
  role: string;
  chips: string[];
  photo: string;
  bio: string;
  badge: string;
};

const seats: Seat[] = [
  {
    name: "Mara Halden",
    role: "Design Direction",
    chips: ["Identity", "UI Systems", "Motion"],
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop&auto=format&q=80",
    bio: "Editorial designer who builds systems before screens. Twelve years across luxury hospitality and editorial.",
    badge: "12 yrs · craft",
  },
  {
    name: "Théo Marchetti",
    role: "Frontend Engineering",
    chips: ["Next.js", "React", "Vue"],
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop&auto=format&q=80",
    bio: "Frontend lead obsessed with typography, motion, and shipping interfaces that survive scrutiny.",
    badge: "Type-safe by default",
  },
  {
    name: "Sasha Whelan",
    role: "Backend & Platform",
    chips: ["Supabase", "Laravel", "Postgres"],
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop&auto=format&q=80",
    bio: "Builds data layers, auth and RLS that hold up to audits and edits. Boring on purpose.",
    badge: "Postgres-first",
  },
  {
    name: "Iris Tanaka",
    role: "SEO & Growth",
    chips: ["Tech SEO", "Schema", "Content"],
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&auto=format&q=80",
    bio: "Technical SEO with editorial sensibility. Programs landing systems that compound, not bloat.",
    badge: "Compounds quarterly",
  },
  {
    name: "Nadia Olsson",
    role: "Motion & Interaction",
    chips: ["GSAP", "Motion", "Three.js"],
    photo:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=800&fit=crop&auto=format&q=80",
    bio: "Motion designer who choreographs interface gestures with restraint. Believes a still page can still feel alive.",
    badge: "60fps or it didn't happen",
  },
  {
    name: "Jonas Ekberg",
    role: "Editorial & Copy",
    chips: ["Brand voice", "UX copy", "Naming"],
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&auto=format&q=80",
    bio: "Writes the lines that hold a site together. Ex-Monocle, now writing for studios that hate filler.",
    badge: "Strunk & White, daily",
  },
];

export function Team() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
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
    <section id="team" className="relative py-28 md:py-36">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 -z-10 h-[480px] w-[1000px] -translate-x-1/2 glow-champagne opacity-40 blur-[80px]"
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-7">
            <SectionLabel>The Team</SectionLabel>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-light leading-[1.05] tracking-[-0.02em]">
              Senior practitioners,{" "}
              <span className="italic text-[var(--color-champagne)]">
                no handoffs.
              </span>
            </h2>
          </div>
          <p className="col-span-12 max-w-md self-end text-[15px] leading-[1.7] text-[var(--color-ink-muted)] md:col-span-5">
            FanaticCoders is a deliberate, senior-only team. The people you
            meet are the people who design, write, and ship the work.
          </p>
        </div>

        {/* Carousel header */}
        <div className="mt-12 flex items-center justify-between">
          <p className="font-display text-[14px] tracking-[0.3em] text-[var(--color-ink-dim)]">
            <span className="text-[var(--color-champagne)]">
              {String(selected + 1).padStart(2, "0")}
            </span>
            <span className="mx-2 text-[var(--color-line-strong)]">/</span>
            <span>{String(seats.length).padStart(2, "0")}</span>
          </p>
          <div className="flex items-center gap-2">
            <CarouselButton
              onClick={prev}
              disabled={selected === 0}
              label="Previous"
            >
              <ArrowLeft size={16} />
            </CarouselButton>
            <CarouselButton
              onClick={next}
              disabled={selected >= snapCount - 1}
              label="Next"
            >
              <ArrowRight size={16} />
            </CarouselButton>
          </div>
        </div>

        {/* Embla viewport */}
        <div className="relative mt-6 overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {seats.map((s, i) => (
              <div
                key={s.name}
                className="min-w-0 shrink-0 basis-full px-3 sm:basis-1/2 lg:basis-1/3"
              >
                <TeamSeat {...s} index={i} />
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
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-[3px] rounded-full transition-all duration-500",
                i === selected
                  ? "w-10 bg-[var(--color-champagne)]"
                  : "w-5 bg-[var(--color-line-strong)] hover:bg-[var(--color-ink-dim)]",
              )}
            />
          ))}
        </div>

        <div className="mt-12 flex items-center gap-3">
          <Button href="#contact" variant="ghost">
            Meet the team
          </Button>
          <p className="text-[12px] uppercase tracking-[0.28em] text-[var(--color-ink-dim)]">
            Full profiles publishing soon
          </p>
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

function TeamSeat({
  name,
  role,
  chips,
  photo,
  bio,
  badge,
  index,
}: Seat & { index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="shiny-border group relative aspect-[3/4] overflow-hidden rounded-3xl transition-shadow duration-500 hover:shadow-[0_40px_80px_-40px_rgba(215,181,109,0.45)]"
    >
      {/* Portrait */}
      <Image
        src={photo}
        alt={`${name}, ${role}`}
        fill
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
        className="team-portrait object-cover"
        unoptimized
      />

      {/* Gradient overlay */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,6,0.08)_0%,rgba(5,5,6,0.45)_55%,rgba(5,5,6,0.95)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-hairline opacity-20 mix-blend-overlay"
      />

      {/* Top meta */}
      <div className="absolute inset-x-5 top-5 flex items-start justify-between">
        <span className="text-[10px] uppercase tracking-[0.32em] text-white/70">
          Seat 0{index + 1}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-champagne)]/40 bg-black/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-[var(--color-champagne)] backdrop-blur">
          <Sparkles size={10} strokeWidth={1.8} />
          {badge}
        </span>
      </div>

      {/* Bottom meta */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-champagne)]">
          {role}
        </p>
        <h3 className="mt-1.5 font-display text-[26px] font-light leading-tight tracking-tight text-white">
          {name}
        </h3>

        {/* Hover reveal */}
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <div className="mt-4 h-px w-12 bg-[var(--color-champagne)]/40 transition-all duration-500 group-hover:w-20" />
            <p className="mt-3 text-[13px] leading-[1.6] text-white/85">
              {bio}
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {chips.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-0.5 text-[11px] tracking-wide text-white/80"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
