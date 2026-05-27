---
name: fanaticcoders-quality-release
description: Use when reviewing, auditing, testing, polishing, or preparing FanaticCoders work for release, including browser QA, accessibility, performance, SEO checks, animation smoothness, admin workflows, and Supabase security verification.
---

# FanaticCoders Quality Release

Use this skill before calling any significant FanaticCoders feature, UI, admin flow, or release-ready change complete.

## Quality Bar
- The site should feel premium, fast, stable, and credible.
- Admin flows should be boring in the best way: predictable, validated, and recoverable.
- Public pages should pass mobile, desktop, accessibility, SEO, and performance checks.

## Frontend Checks
- Verify desktop and mobile viewports.
- Check reduced motion behavior.
- Confirm text does not overlap or overflow.
- Confirm images load with correct aspect ratio and alt text.
- Confirm interactions have hover, focus, loading, error, and empty states.
- Use browser screenshots when UI exists.

## Admin Checks
- Create, edit, publish, unpublish, sort, and delete/archive flows work as designed.
- Upload success and failure states are handled.
- Validation errors are clear and field-specific.
- Unauthorized users cannot access admin routes or mutate data.

## Supabase Checks
- RLS policies match the intended public/admin access.
- Storage policies protect private write paths.
- Service role key is server-only.
- Queries use indexed fields for common filters.

## SEO And Performance Checks
- Metadata, canonical, sitemap, robots, OG, and JSON-LD are correct.
- Core pages have useful titles and descriptions.
- Avoid animation or media that harms loading and responsiveness.
- Run build/lint/type checks where scripts exist.

## Output
- List checks run, checks skipped, and remaining risk.
- Do not mark work done without verification or a clear reason verification could not run.
