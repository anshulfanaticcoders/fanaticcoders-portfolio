#!/usr/bin/env node

const fs = require('fs');

function readStdin() {
  try {
    return fs.readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

function collectStrings(value, out = []) {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => collectStrings(item, out));
  return out;
}

function inputText() {
  const raw = readStdin();
  if (!raw.trim()) return '';
  try {
    return collectStrings(JSON.parse(raw)).join('\n');
  } catch {
    return raw;
  }
}

const text = inputText().toLowerCase();
const skills = [];
const tools = [];
const checks = [];
const assignment = [];

function add(list, ...items) {
  items.forEach((item) => {
    if (item && !list.includes(item)) list.push(item);
  });
}

const isReadOnly = /\b(read|inspect|explain|show|find|list|search|where|what)\b/.test(text) && !/\b(add|build|fix|edit|update|implement|create|remove|delete|scaffold)\b/.test(text);
const isCreative = /\b(brand|copy|content|strategy|positioning|service|homepage|landing|portfolio|about|team|case study|testimonial)\b/.test(text);
const isUi = /\b(ui|frontend|design|style|layout|component|page|animation|motion|gsap|tailwind|shadcn|luxury|dark|responsive|icons|fonts)\b/.test(text);
const isNext = /\b(next|nextjs|next\.js|react|app router|server action|route handler|typescript)\b/.test(text);
const isSupabase = /\b(supabase|postgres|postgresql|rls|auth|storage|bucket|policy|database|schema|migration)\b/.test(text);
const isSeo = /\b(seo|metadata|sitemap|robots|schema|json-ld|canonical|open graph|og image|search)\b/.test(text);
const isAdmin = /\b(admin|dashboard|crud|team member|role|expertise|upload|media|cms|manage)\b/.test(text);
const isApi = /\b(api|endpoint|contract|server action|route handler|webhook)\b/.test(text);
const isBug = /\b(bug|fix|error|issue|broken|not working|fail|crash|exception)\b/.test(text);
const isReview = /\b(review|audit|qa|quality|check|polish|lighthouse|accessibility|performance)\b/.test(text);
const isCurrentDocs = /\b(latest|docs|documentation|current|upgrade|version)\b/.test(text) || isNext || isSupabase;

if (!isReadOnly) add(skills, 'prompt-engineering-patterns', 'karpathy-guidelines');
if (!isReadOnly && (isCreative || isUi || isAdmin)) add(skills, 'brainstorming');
if (isCreative) add(skills, 'fanaticcoders-product-strategy');
if (isUi) add(skills, 'fanaticcoders-luxury-frontend', 'frontend-design-new-enhanced');
if (isNext || isSupabase || isAdmin) add(skills, 'fanaticcoders-next-supabase');
if (isSupabase) add(skills, 'supabase-postgres-best-practices');
if (isSeo) add(skills, 'fanaticcoders-seo-content');
if (isApi) add(skills, 'api-design-principles');
if (isBug || isAdmin || isApi || isSupabase) add(skills, 'error-handling-patterns');
if (isReview) add(skills, 'fanaticcoders-quality-release', 'e2e-testing-patterns');

if (isCurrentDocs) add(tools, 'Ref for official docs before relying on memory');
if (isUi || isReview) add(tools, 'chrome-devtools/browser checks after UI exists');
if (isSupabase) add(tools, 'Supabase MCP after env placeholders are configured');
if (isAdmin || isSupabase || isApi) add(tools, 'sequential-thinking for auth/data/security risk breakdown');

if (isUi) add(checks, 'responsive browser pass', 'animation smoothness pass');
if (isNext) add(checks, 'npm run build', 'npm run lint/typecheck when scripts exist');
if (isSupabase) add(checks, 'RLS policy review', 'storage upload/delete path review');
if (isSeo) add(checks, 'metadata/sitemap/schema verification');

if (isUi && !isSupabase && !isApi) {
  add(assignment, 'Claude leads visual/frontend work');
  add(assignment, 'Codex reviews behavior and verification when needed');
} else if (isSupabase || isApi || isAdmin) {
  add(assignment, 'Codex leads architecture, data, security, and tests');
  if (isUi) add(assignment, 'Claude leads UI polish');
}

const output = [
  'FanaticCoders task router:',
  skills.length ? `- Load skills: ${skills.join(', ')}.` : '- Read-only task: inspect local files first; load domain skills if depth is needed.',
  assignment.length ? `- Agent assignment: ${assignment.join('; ')}.` : '- Agent assignment: current agent can proceed.',
  tools.length ? `- Useful MCP/tools: ${tools.join('; ')}.` : null,
  checks.length ? `- Verification target: ${checks.join('; ')}.` : null,
  '- Keep secrets out of files and do not run destructive commands without explicit approval.',
].filter(Boolean);

console.log(output.join('\n'));
