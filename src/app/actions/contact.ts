"use server";

import { Resend } from "resend";
import { z } from "zod";
import { contactSchema } from "@/lib/contact/schema";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<string, string[]>>;
    };

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    projectType: String(formData.get("projectType") ?? ""),
    message: String(formData.get("message") ?? ""),
    website: String(formData.get("website") ?? ""),
  });

  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  // Honeypot tripped — pretend success, send nothing.
  if (parsed.data.website) return { status: "success" };

  const { name, email, projectType, message } = parsed.data;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Project type: ${projectType || "Not specified"}`,
    "",
    message,
  ].join("\n");

  // A valid submission always succeeds for the visitor. Delivery is best-effort:
  // email via Resend when configured, otherwise the message lands in the server log.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.log(`[contact] new enquiry (email not configured)\n${text}`);
    return { status: "success" };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
    to: [to],
    replyTo: email,
    subject: `New project enquiry — ${name}`,
    text,
  });
  if (error) console.error(`[contact] resend failed, enquiry follows\n${text}`, error);

  return { status: "success" };
}
