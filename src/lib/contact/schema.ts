import { z } from "zod";
import { PROJECT_TYPES } from "@/content/site";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80, "Name is too long."),
  email: z.email("That email doesn't look right.").trim().max(160),
  projectType: z.enum(PROJECT_TYPES).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more — a sentence or two is enough.")
    .max(2000, "Message is too long."),
  // honeypot — must stay empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
