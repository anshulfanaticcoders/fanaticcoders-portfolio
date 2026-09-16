"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { Check, ChevronDown, LoaderCircle, Send } from "lucide-react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { PROJECT_TYPES } from "@/content/site";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action] = useActionState(submitContact, initial);
  const id = useId();
  const err = (k: string) => (state.status === "error" ? state.fieldErrors?.[k]?.[0] : undefined);

  if (state.status === "success") {
    return (
      <div className="form__success" role="status">
        <span className="check" aria-hidden>
          <Check size={24} strokeWidth={2.5} />
        </span>
        <h3>Thanks for reaching out.</h3>
        <p>Your message is with me. I&apos;ll get back to you within 24 hours to talk through the project.</p>
      </div>
    );
  }

  return (
    <form action={action} className="form" noValidate>
      <input type="hidden" name="website" value="" />

      <Field id={`${id}-name`} label="Name" required error={err("name")}>
        <input id={`${id}-name`} name="name" required autoComplete="name" placeholder="Your name" />
      </Field>

      <Field id={`${id}-email`} label="Email" required error={err("email")}>
        <input id={`${id}-email`} name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
      </Field>

      <Field id={`${id}-type`} label="What do you need?" error={err("projectType")} className="span-2">
        <span className="field__wrap">
          <select id={`${id}-type`} name="projectType" defaultValue="">
            <option value="">Pick one (optional)</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <ChevronDown size={18} aria-hidden />
        </span>
      </Field>

      <Field id={`${id}-message`} label="Project" required error={err("message")} className="span-2">
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={5}
          placeholder="What are you building, what's the deadline, and is there an existing site or app?"
        />
      </Field>

      {state.status === "error" && !state.fieldErrors && (
        <div className="form__alert span-2" role="alert">
          {state.message}
        </div>
      )}

      <div className="form__foot span-2">
        <p>No spam, no newsletter — just a reply from me.</p>
        <Submit />
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`field${error ? " is-invalid" : ""} ${className ?? ""}`}>
      <label htmlFor={id}>
        {label}
        {required && <b aria-hidden>*</b>}
      </label>
      {children}
      {error && (
        <p className="field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? <LoaderCircle size={18} className="animate-spin" aria-hidden /> : <Send size={18} aria-hidden />}
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}
