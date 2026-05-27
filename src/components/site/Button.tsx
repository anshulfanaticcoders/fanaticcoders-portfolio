import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";
type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  icon?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  icon = true,
}: Props) {
  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-5 py-3 text-[13px] font-medium tracking-[0.06em] uppercase transition-all duration-300 focus-visible:outline-none";
  const styles =
    variant === "primary"
      ? "bg-[var(--color-champagne)] text-[#1a1206] shadow-[0_10px_40px_-12px_rgba(215,181,109,0.55)] hover:shadow-[0_18px_60px_-12px_rgba(215,181,109,0.7)] hover:bg-[var(--color-champagne-soft)]"
      : "border border-[var(--color-line-strong)] text-[var(--color-ink)] hover:border-[var(--color-champagne)]/60 hover:bg-white/[0.02]";

  return (
    <Link href={href} className={cn(base, styles, className)}>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          size={15}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </Link>
  );
}
