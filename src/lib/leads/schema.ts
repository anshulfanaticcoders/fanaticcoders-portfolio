import { z } from "zod";

export const BUDGET_OPTIONS = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $60k",
  "$60k+",
  "Not sure yet",
] as const;

export const SERVICE_INTEREST_OPTIONS = [
  "New site build",
  "Redesign",
  "Admin / CMS",
  "SEO program",
  "WordPress",
  "Laravel platform",
] as const;

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("That email doesn't look right.")
    .max(160),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  budget: z.enum(BUDGET_OPTIONS).optional().or(z.literal("")),
  serviceInterest: z
    .array(z.enum(SERVICE_INTEREST_OPTIONS))
    .max(SERVICE_INTEREST_OPTIONS.length)
    .default([]),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a bit more — at least a couple of sentences.")
    .max(2000, "Message is too long."),
  sourcePage: z.string().trim().max(200).optional().or(z.literal("")),
  // honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;
