import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.32em] text-[var(--color-ink-muted)]",
        className,
      )}
    >
      <span
        aria-hidden
        className="h-px w-6 bg-gradient-to-r from-transparent via-[var(--color-champagne)] to-transparent"
      />
      {children}
    </div>
  );
}
