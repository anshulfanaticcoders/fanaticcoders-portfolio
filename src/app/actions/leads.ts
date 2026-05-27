"use server";

import { leadSchema, SERVICE_INTEREST_OPTIONS } from "@/lib/leads/schema";

export type LeadFormState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<string, string[]>>;
    };

const VALID_INTERESTS = new Set<string>(SERVICE_INTEREST_OPTIONS);

function hasSupabaseConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? ""),
    budget: String(formData.get("budget") ?? ""),
    serviceInterest: formData
      .getAll("serviceInterest")
      .map((v) => String(v))
      .filter((v) => VALID_INTERESTS.has(v)),
    message: String(formData.get("message") ?? ""),
    sourcePage: String(formData.get("sourcePage") ?? ""),
    website: String(formData.get("website") ?? ""),
  };

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // Honeypot tripped — pretend success, do nothing.
  if (parsed.data.website) {
    return { status: "success" };
  }

  if (!hasSupabaseConfig()) {
    return {
      status: "error",
      message:
        "The contact form is not connected yet. Please email hello@fanaticcoders.com and we will reply within two business days.",
    };
  }

  try {
    const { createSupabaseServerClient } = await import(
      "@/lib/supabase/server"
    );
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || null,
      budget: parsed.data.budget || null,
      service_interest: parsed.data.serviceInterest,
      message: parsed.data.message,
      source_page: parsed.data.sourcePage || null,
    });

    if (error) {
      console.error("[leads] insert failed", error);
      return {
        status: "error",
        message:
          "We couldn't send that just now. Please try again, or email hello@fanaticcoders.com.",
      };
    }
  } catch (err) {
    console.error("[leads] unexpected error", err);
    return {
      status: "error",
      message:
        "Something broke on our end. Please email hello@fanaticcoders.com.",
    };
  }

  return { status: "success" };
}
