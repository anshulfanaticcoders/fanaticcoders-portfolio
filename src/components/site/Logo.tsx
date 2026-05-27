import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="FanaticCoders home"
      className={cn(
        "group inline-flex items-center gap-2.5 font-display text-[15px] tracking-tight",
        className,
      )}
    >
      <span
        aria-hidden
        className="relative grid h-7 w-7 place-items-center rounded-[7px] border border-[var(--color-line-strong)] bg-gradient-to-br from-[#1a1712] to-[#0a0a0d] shadow-[inset_0_0_0_1px_rgba(215,181,109,0.18),0_0_24px_-12px_rgba(215,181,109,0.45)]"
      >
        <span className="font-display text-[13px] font-medium leading-none text-[var(--color-champagne)]">
          F
        </span>
        <span className="absolute -inset-px rounded-[7px] bg-[radial-gradient(closest-side,rgba(215,181,109,0.4),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <span className="flex items-baseline gap-[2px]">
        <span className="font-semibold text-[var(--color-ink)]">Fanatic</span>
        <span className="font-light italic text-[var(--color-champagne)]">
          Coders
        </span>
      </span>
    </Link>
  );
}
