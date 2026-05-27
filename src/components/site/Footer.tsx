import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

const cols = [
  {
    title: "Services",
    links: [
      { href: "#services", label: "Design Systems" },
      { href: "#services", label: "Frontend Development" },
      { href: "#services", label: "Full-Stack Engineering" },
      { href: "#services", label: "SEO Growth" },
      { href: "#services", label: "WordPress" },
      { href: "#services", label: "Admin & CMS" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "#work", label: "Work" },
      { href: "#team", label: "Team" },
      { href: "#process", label: "Process" },
      { href: "#contact", label: "Contact" },
    ],
  },
];

const socials = [
  { label: "X / Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Dribbble", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-line)] bg-[var(--color-canvas-soft)]">
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-20">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-[14px] leading-[1.7] text-[var(--color-ink-muted)]">
              A senior web studio for premium brands. Design, development, and
              SEO — held to an editorial standard.
            </p>
            <ul className="mt-6 flex flex-wrap items-center gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] px-3 py-1.5 text-[12px] text-[var(--color-ink-muted)] transition-all duration-300 hover:border-[var(--color-champagne)]/60 hover:text-[var(--color-champagne)]"
                  >
                    {s.label}
                    <ArrowUpRight
                      size={12}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="col-span-6 md:col-span-3">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-ink-dim)]">
                {c.title}
              </p>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[14px] text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-12 md:col-span-1" />
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-[var(--color-line)] pt-6 text-[12px] text-[var(--color-ink-dim)] sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} FanaticCoders. Crafted with restraint.
          </p>
          <p className="font-display tracking-[0.3em] uppercase">
            <span className="text-[var(--color-champagne)]">·</span> Available
            for select engagements
          </p>
        </div>
      </div>
    </footer>
  );
}
