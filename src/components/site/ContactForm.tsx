"use client";

import {
  useActionState,
  useId,
  useState,
  useSyncExternalStore,
} from "react";
import { useFormStatus } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { submitLead, type LeadFormState } from "@/app/actions/leads";
import {
  BUDGET_OPTIONS,
  SERVICE_INTEREST_OPTIONS,
} from "@/lib/leads/schema";
import { cn } from "@/lib/utils";

const initialState: LeadFormState = { status: "idle" };
const emptySubscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

function useHasHydrated() {
  return useSyncExternalStore(emptySubscribe, clientSnapshot, serverSnapshot);
}

export function ContactForm({ sourcePage = "/" }: { sourcePage?: string }) {
  const [state, formAction] = useActionState(submitLead, initialState);
  const hasHydrated = useHasHydrated();

  if (!hasHydrated) {
    return <ContactFormShell />;
  }

  if (state.status === "success") {
    return <SuccessPanel />;
  }

  return (
    <form
      action={formAction}
      className="relative mx-auto mt-12 grid w-full max-w-3xl grid-cols-1 gap-5 text-left md:grid-cols-2"
      noValidate
    >
      <input
        type="hidden"
        name="sourcePage"
        value={sourcePage}
        suppressHydrationWarning
      />
      <input
        type="hidden"
        name="website"
        value=""
        suppressHydrationWarning
      />

      <Field
        name="name"
        label="Name"
        required
        placeholder="Your name"
        autoComplete="name"
        error={fieldError(state, "name")}
      />
      <Field
        name="email"
        type="email"
        label="Email"
        required
        placeholder="you@company.com"
        autoComplete="email"
        error={fieldError(state, "email")}
      />
      <Field
        name="company"
        label="Company"
        placeholder="Optional"
        autoComplete="organization"
        error={fieldError(state, "company")}
      />
      <SelectField
        name="budget"
        label="Budget"
        options={[...BUDGET_OPTIONS]}
        error={fieldError(state, "budget")}
      />

      <div className="md:col-span-2">
        <FieldGroupLabel>Service interest</FieldGroupLabel>
        <ChipGroup
          name="serviceInterest"
          options={[...SERVICE_INTEREST_OPTIONS]}
        />
        <FieldError error={fieldError(state, "serviceInterest")} />
      </div>

      <div className="md:col-span-2">
        <FieldLabel htmlFor="message" required>
          Project
        </FieldLabel>
        <textarea
          id="message"
          name="message"
          required
          suppressHydrationWarning
          rows={5}
          placeholder="Tell us about the brand, the constraints, the ambition…"
          className={cn(
            "w-full resize-y rounded-2xl border border-[var(--color-line-strong)] bg-[var(--color-canvas)] px-4 py-3 text-[14px] leading-[1.6] text-[var(--color-ink)] placeholder:text-[var(--color-ink-dim)] transition-colors duration-300 focus:border-[var(--color-champagne)]/60 focus:outline-none",
            fieldError(state, "message") && "border-red-500/60",
          )}
        />
        <FieldError error={fieldError(state, "message")} />
      </div>

      {state.status === "error" && !state.fieldErrors && (
        <div className="md:col-span-2 rounded-2xl border border-red-500/30 bg-red-500/[0.06] px-4 py-3 text-[13px] text-red-300">
          {state.message}
        </div>
      )}

      <div className="md:col-span-2 mt-2 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-[12px] text-[var(--color-ink-dim)]">
          We typically respond within two business days.
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}

function ContactFormShell() {
  return (
    <div
      aria-hidden
      className="relative mx-auto mt-12 grid min-h-[560px] w-full max-w-3xl grid-cols-1 gap-5 text-left md:min-h-[420px] md:grid-cols-2"
    />
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative inline-flex items-center gap-2 rounded-full bg-[var(--color-champagne)] px-6 py-3 text-[13px] font-medium uppercase tracking-[0.06em] text-[#1a1206] shadow-[0_10px_40px_-12px_rgba(215,181,109,0.55)] transition-all duration-300 hover:bg-[var(--color-champagne-soft)] hover:shadow-[0_18px_60px_-12px_rgba(215,181,109,0.7)] disabled:cursor-not-allowed disabled:opacity-70"
    >
      <span>{pending ? "Sending" : "Send the brief"}</span>
      {pending ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <ArrowUpRight
          size={14}
          className="transition-transform duration-300 group-hover:-translate-x-0 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </button>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
}) {
  const id = useId();
  return (
    <div suppressHydrationWarning>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        suppressHydrationWarning
        className={cn(
          "w-full rounded-2xl border border-[var(--color-line-strong)] bg-[var(--color-canvas)] px-4 py-3 text-[14px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-dim)] transition-colors duration-300 focus:border-[var(--color-champagne)]/60 focus:outline-none",
          error && "border-red-500/60",
        )}
      />
      <FieldError error={error} />
    </div>
  );
}

function SelectField({
  name,
  label,
  options,
  error,
}: {
  name: string;
  label: string;
  options: string[];
  error?: string;
}) {
  const id = useId();
  return (
    <div suppressHydrationWarning>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <select
          id={id}
          name={name}
          defaultValue=""
          suppressHydrationWarning
          className={cn(
            "w-full appearance-none rounded-2xl border border-[var(--color-line-strong)] bg-[var(--color-canvas)] px-4 py-3 pr-10 text-[14px] text-[var(--color-ink)] transition-colors duration-300 focus:border-[var(--color-champagne)]/60 focus:outline-none",
            error && "border-red-500/60",
          )}
        >
          <option value="">Optional</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-ink-dim)]"
        >
          ▾
        </span>
      </div>
      <FieldError error={error} />
    </div>
  );
}

function ChipGroup({ name, options }: { name: string; options: string[] }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <label
            key={opt}
            className={cn(
              "group inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] transition-all duration-300",
              active
                ? "border-[var(--color-champagne)] bg-[var(--color-champagne)]/[0.08] text-[var(--color-champagne)]"
                : "border-[var(--color-line)] bg-white/[0.02] text-[var(--color-ink-muted)] hover:border-[var(--color-champagne)]/40 hover:text-[var(--color-ink)]",
            )}
          >
            <input
              type="checkbox"
              name={name}
              value={opt}
              checked={active}
              onChange={() => toggle(opt)}
              suppressHydrationWarning
              className="sr-only"
            />
            <span
              aria-hidden
              className={cn(
                "grid h-3.5 w-3.5 place-items-center rounded-full border transition-colors",
                active
                  ? "border-[var(--color-champagne)] bg-[var(--color-champagne)] text-[#1a1206]"
                  : "border-[var(--color-line-strong)]",
              )}
            >
              {active && <Check size={9} strokeWidth={3} />}
            </span>
            {opt}
          </label>
        );
      })}
    </div>
  );
}

function FieldLabel({
  children,
  htmlFor,
  required,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[11px] uppercase tracking-[0.28em] text-[var(--color-ink-dim)]"
    >
      {children}
      {required && (
        <span className="ml-1 text-[var(--color-champagne)]">·</span>
      )}
    </label>
  );
}

function FieldGroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 block text-[11px] uppercase tracking-[0.28em] text-[var(--color-ink-dim)]">
      {children}
    </p>
  );
}

function FieldError({ error }: { error?: string }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-2 text-[12px] text-red-300"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function fieldError(state: LeadFormState, key: string): string | undefined {
  if (state.status !== "error" || !state.fieldErrors) return undefined;
  return state.fieldErrors[key]?.[0];
}

function SuccessPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mx-auto mt-12 max-w-2xl rounded-3xl border border-[var(--color-champagne)]/40 bg-[var(--color-canvas-soft)] p-10 text-center"
    >
      <span
        aria-hidden
        className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-full border border-[var(--color-champagne)]/50 bg-[var(--color-champagne)]/[0.06] text-[var(--color-champagne)]"
      >
        <Check size={18} strokeWidth={1.8} />
      </span>
      <h3 className="font-display text-[26px] font-light tracking-tight text-[var(--color-ink)]">
        Brief received.
      </h3>
      <p className="mx-auto mt-3 max-w-md text-[14px] leading-[1.7] text-[var(--color-ink-muted)]">
        We&apos;ll read it carefully and reply within two business days with a
        view of fit, scope, and timeline.
      </p>
    </motion.div>
  );
}
