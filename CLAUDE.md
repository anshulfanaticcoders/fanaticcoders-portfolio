# FanaticCoders Claude Workflow

This file guides Claude Code and other local agents working in this portfolio workspace.

## Core Rule
Understand the task, load the right project-local skills, make the smallest useful change, and verify it. This repo is starting as a guidance/tooling workspace; do not scaffold app code until the user asks.

## Work Phases
1. Understand the request and inspect existing files.
2. Load the project-local skill that matches the task.
3. For creative or product work, use `brainstorming` before implementation.
4. For code/config edits, use `karpathy-guidelines` to keep work surgical.
5. Use Ref MCP for current official docs when behavior may have changed.
6. Verify with the smallest relevant checks.

## Agent Assignment
- Claude should lead visual direction, design systems, copy tone, animation feel, and UX polish.
- Codex should lead architecture, database contracts, security, RLS, admin behavior, tests, and review.
- For full-stack work, split UI and data/security responsibilities clearly.

## FanaticCoders Product Defaults
- Brand: FanaticCoders.
- Mood: dark luxury, polished, high-end, smooth, credible.
- Audience: clients evaluating a web service team for design, development, SEO, WordPress, Laravel, and modern frontend work.
- Core objects: services, team members, expertise, projects, testimonials, leads, SEO pages, media uploads.
- Admin users: internal team members who manage portfolio content and public-facing proof.

## Technology Defaults
- Prefer Next.js App Router, TypeScript, Supabase, Tailwind, shadcn/ui, lucide-react, Motion for React, GSAP only where it earns its weight.
- Prefer Supabase Storage for team photos and project media.
- Prefer Supabase RLS policies over app-only authorization.
- Prefer server actions or route handlers based on the data mutation surface and security needs.

## Frontend Quality Bar
- Use premium typography, restrained color, crisp hierarchy, strong spacing, and motion that feels intentional.
- Icons should be real icon components where available, not custom decorative SVGs.
- Do not ship overlapping text, unstable layouts, generic stock-like sections, or animation that hurts performance.
- Verify desktop and mobile behavior before calling UI work done.

## MCP Usage
- `Ref`: official docs for Next.js, Supabase, Motion, GSAP, Vercel, and other libraries.
- `chrome-devtools`: local browser verification after frontend work exists.
- `sequential-thinking`: complex architecture, migration, and release planning.
- `supabase`: project database/auth/storage context once credentials are configured.

## Safety
- Do not expose secrets.
- Do not edit `.env` or credential files.
- Do not run destructive commands without explicit user approval.
- Do not create commits unless asked.
- Do not initialize git unless asked.
