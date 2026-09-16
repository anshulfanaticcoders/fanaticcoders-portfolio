import { ArrowUpRight, Send } from "lucide-react";
import { site } from "@/content/site";

/** The one primary CTA — identical label, icon and target everywhere it appears. */
export function PrimaryCta({ className }: { className?: string }) {
  return (
    <a className={`btn-primary ${className ?? ""}`} href={site.ctaHref}>
      <Send size={18} strokeWidth={2} aria-hidden />
      {site.ctaLabel}
    </a>
  );
}

export function GhostCta({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a className="btn-ghost" href={href}>
      {children}
      <ArrowUpRight size={16} strokeWidth={2} aria-hidden />
    </a>
  );
}
