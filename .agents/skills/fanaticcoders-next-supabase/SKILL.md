---
name: fanaticcoders-next-supabase
description: Use when designing or implementing FanaticCoders Next.js and Supabase architecture, admin CRUD, auth, storage uploads, RLS policies, server actions, route handlers, database schema, or deployment decisions.
---

# FanaticCoders Next Supabase

Use this skill for app architecture, Supabase data modeling, auth, admin CRUD, storage, and security.

## Stack Defaults
- Next.js App Router with TypeScript.
- Supabase Postgres for content and leads.
- Supabase Auth for admin users.
- Supabase Storage for team photos, project images, and OG images.
- RLS policies as the primary data boundary.

## Architecture Rules
- Keep public reads fast and cache-friendly.
- Keep admin mutations authenticated and validated.
- Use server-side Supabase clients for trusted reads and writes.
- Do not expose service role keys in browser code.
- Validate mutations with Zod or equivalent before writing to Supabase.
- Store image metadata in tables and binary assets in Storage.

## Admin Scope
- Team members: create, edit, upload photo, manage expertise tags, sort, publish/unpublish.
- Services: create, edit, sort, publish/unpublish, SEO metadata.
- Projects and testimonials: same pattern when added.
- Leads: capture from public form; admin can review and mark status later.

## Supabase Rules
- Model publish state explicitly.
- Add `created_at` and `updated_at` to managed content tables.
- Prefer lowercase snake_case database identifiers.
- Add indexes for slugs, publish state, sort order, and foreign keys.
- Write RLS policies before relying on admin UI permissions.

## Output
- Describe data flow from public page/admin form to Supabase.
- State required tables, policies, storage buckets, and validation points.
