#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const cwd = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const files = ['AGENTS.md', 'CLAUDE.md']
  .map((name) => path.join(cwd, name))
  .filter((file) => fs.existsSync(file));

const lines = [
  'FanaticCoders context loaded.',
  `- Workspace: ${cwd}.`,
  '- Project: dark luxury web service portfolio plus admin system.',
  '- Preferred stack: Next.js App Router, TypeScript, Supabase, Tailwind, shadcn/ui, Motion, GSAP where justified.',
  '- Load project-local FanaticCoders skills for product, frontend, Next/Supabase, SEO, and QA work.',
  '- Use Ref for official docs, chrome-devtools for browser QA, sequential-thinking for complex plans.',
  files.length ? `- Available root instructions: ${files.map((file) => path.basename(file)).join(', ')}.` : null,
  '- Protect secrets and avoid destructive commands without explicit approval.',
].filter(Boolean);

console.log(lines.join('\n'));
