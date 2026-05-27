# FanaticCoders Portfolio Agent Instructions

This workspace is for the FanaticCoders company portfolio and admin system. The first priority is project guidance, local skills, hooks, and MCP configuration. Application code will be added later.

## Project Identity
- Company: FanaticCoders.
- Offering: premium web design, development, SEO, HTML, CSS, JavaScript, React, Vue, Next.js, PHP, Laravel, MySQL, Supabase, WordPress, and custom theme development.
- Product goal: a dark luxury portfolio that sells the team, services, work quality, and technical capability.
- Admin goal: manage team members, roles, expertise, bios, photos, services, projects, testimonials, and SEO content.

## Preferred Future Stack
- App: Next.js App Router with TypeScript.
- Data/auth/storage: Supabase Postgres, Auth, Storage, and Row Level Security.
- Styling: Tailwind CSS with shadcn/ui patterns where useful.
- Animation: Motion for React for most UI motion; GSAP for complex scroll timelines or hero sequences.
- Icons: lucide-react unless a branded service icon is required.
- Forms: React Hook Form plus Zod when validation is needed.
- Testing: Playwright for user flows; Vitest or React Testing Library for focused component/business logic.

## Mandatory Context Before Significant Work
- Read `AGENTS.md` first.
- Read `CLAUDE.md` for the full workflow and task routing rules.
- Use project-local skills before creating major designs, architecture, admin flows, data models, or frontend implementation.
- Use official documentation through Ref MCP before relying on memory for Next.js, Supabase, animation, or deployment behavior.

## Skill Routing
- Product/service/content direction: `fanaticcoders-product-strategy`.
- Luxury dark UI, animation, icons, fonts, responsive polish: `fanaticcoders-luxury-frontend`.
- Next.js, Supabase, auth, storage, RLS, admin CRUD: `fanaticcoders-next-supabase`.
- SEO pages, metadata, sitemap, schema, content structure: `fanaticcoders-seo-content`.
- Release checks, browser QA, performance, accessibility: `fanaticcoders-quality-release`.
- General feature planning: `brainstorming`.
- Surgical implementation judgment: `karpathy-guidelines`.
- API/data contract design: `api-design-principles`.
- Error and fallback behavior: `error-handling-patterns`.
- Supabase/Postgres schema and query design: `supabase-postgres-best-practices`.

## Safety Rules
- Do not edit `.env`, private keys, service account JSON, or secret files unless the user explicitly asks.
- Do not hard-code API keys, Supabase tokens, MCP keys, passwords, or auth secrets in tracked config.
- Do not run destructive commands without explicit approval.
- Do not commit, push, initialize git, install packages, or scaffold the Next.js app unless the user asks.
- Keep changes scoped to the requested setup or feature.

## Design Direction
- Dark luxury, sharp, premium, technically confident.
- Avoid generic SaaS hero sections, soft pastel themes, and one-note purple/blue gradients.
- Prioritize smooth motion, high-quality typography, precise spacing, strong contrast, and credible service proof.
- Keep the first screen useful and brand-forward, not a plain marketing placeholder.

## Verification Expectations
- Config work: parse JSON/TOML where possible.
- Skill work: validate YAML frontmatter and skill folder names.
- Frontend work later: run build/type checks and use browser verification.
- Supabase work later: verify RLS assumptions, storage policies, migrations, and seed data paths before shipping.
