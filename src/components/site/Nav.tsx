"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#team", label: "Team" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "flex w-full max-w-6xl items-center justify-between gap-6 rounded-full border px-4 py-2.5 transition-all duration-500",
          scrolled
            ? "border-[var(--color-line-strong)] bg-[rgba(8,8,11,0.78)] backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]"
            : "border-[var(--color-line)] bg-[rgba(8,8,11,0.4)] backdrop-blur-md",
        )}
      >
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative rounded-full px-3.5 py-2 text-[13px] font-medium text-[var(--color-ink-muted)] transition-colors duration-300 hover:text-[var(--color-ink)]"
            >
              <span className="relative z-10">{l.label}</span>
              <span className="absolute inset-0 -z-0 rounded-full bg-white/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <Button href="#contact" className="py-2 text-[12px]">
              Start a Project
            </Button>
          </div>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-line-strong)] text-[var(--color-ink)] md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-4 top-20 rounded-3xl border border-[var(--color-line-strong)] bg-[rgba(8,8,11,0.95)] p-3 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-[15px] text-[var(--color-ink)] hover:bg-white/[0.04]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="px-2 pt-2">
                <Button href="#contact" className="w-full justify-center">
                  Start a Project
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
