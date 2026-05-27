---
name: fanaticcoders-luxury-frontend
description: Use when designing or implementing the FanaticCoders dark luxury frontend, including typography, color, layout, animations, icons, responsive behavior, visual polish, and premium UI quality checks.
---

# FanaticCoders Luxury Frontend

Use this skill for visual direction, frontend components, animations, layout, responsive behavior, and UI polish.

## Design Character
- Dark luxury, sharp, confident, premium, technical.
- Use contrast, spacing, motion, and typography as the primary luxury signals.
- Avoid generic blue/purple SaaS gradients, glassmorphism overload, cartoon illustrations, and decorative noise.
- Make FanaticCoders visible in the first viewport.

## Visual Defaults
- Background: near-black with subtle depth, not flat gray.
- Accent direction: restrained metallic, electric cyan, champagne, or emerald accents. Use one dominant accent and one support accent.
- Typography: strong display face for headings, highly readable sans for body. Do not use cramped letter spacing.
- Icons: lucide-react by default. Use recognizable service icons only when they improve scanning.
- Cards: use only for repeated items, admin panels, and framed content. Avoid cards inside cards.

## Motion Rules
- Use Motion for React for reveals, hover states, layout transitions, and route-level UI motion.
- Use GSAP only for complex scroll timelines, hero choreography, or pinned sequences.
- Keep animation smooth and purposeful. Prefer 180ms to 500ms UI motion; avoid sluggish page choreography.
- Respect reduced-motion preferences.

## Responsive Rules
- Design mobile and desktop together.
- Ensure text never overlaps icons, buttons, or media.
- Keep fixed-format elements stable with aspect ratios, grid tracks, and min/max constraints.
- Test real viewport sizes before finalizing UI work.

## Output
- Name the visual system choices and animation approach.
- Include the browser QA needed before calling the UI done.
