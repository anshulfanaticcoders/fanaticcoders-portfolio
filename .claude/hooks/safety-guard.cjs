#!/usr/bin/env node

const fs = require('fs');

function readInput() {
  try {
    return JSON.parse(fs.readFileSync(0, 'utf8') || '{}');
  } catch {
    return {};
  }
}

function deny(event, reason) {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: event || 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: reason,
    },
  }));
}

const input = readInput();
const event = input.hook_event_name || 'PreToolUse';
const tool = input.tool_name || '';
const toolInput = input.tool_input || {};
const command = String(toolInput.command || '');
const filePath = String(toolInput.file_path || toolInput.path || '');
const normalizedPath = filePath.replace(/\\/g, '/').toLowerCase();

if (/^(Edit|MultiEdit|Write)$/.test(tool)) {
  if (/(^|\/)\.env(\.|$|\/)/i.test(normalizedPath) || normalizedPath.endsWith('/.env')) {
    deny(event, 'Blocked edit to .env or env-like secret file. Use .env.example or ask for explicit approval.');
    process.exit(0);
  }
  if (/(\.pem|\.key|id_rsa|id_ed25519|service-account.*\.json)$/i.test(normalizedPath)) {
    deny(event, 'Blocked edit to credential/private-key file. Ask before changing secrets.');
    process.exit(0);
  }
  if (/(node_modules|\.next|dist|build)\//i.test(normalizedPath)) {
    deny(event, 'Blocked direct edit inside generated dependency/build output.');
    process.exit(0);
  }
}

if (tool === 'Bash') {
  const blocked = [
    { re: /\brm\s+-rf\b/i, reason: 'Blocked rm -rf. Destructive deletion requires explicit approval.' },
    { re: /\bRemove-Item\b.*\s-Recurse\b/i, reason: 'Blocked recursive Remove-Item. Destructive deletion requires explicit approval.' },
    { re: /\bgit\s+reset\s+--hard\b/i, reason: 'Blocked git reset --hard. It can discard user work.' },
    { re: /\bgit\s+checkout\s+--\b/i, reason: 'Blocked git checkout --. It can overwrite user changes.' },
    { re: /\bgit\s+clean\b/i, reason: 'Blocked git clean. It can delete untracked files.' },
    { re: /\bgit\s+push\b.*\s--force\b/i, reason: 'Blocked force push. Ask first.' },
    { re: /\bgit\s+branch\s+-D\b/i, reason: 'Blocked force branch delete. Ask first.' },
    { re: /\bnpm\s+uninstall\b|\bpnpm\s+remove\b|\byarn\s+remove\b/i, reason: 'Blocked package removal. Ask first.' },
    { re: /\bsupabase\s+db\s+reset\b/i, reason: 'Blocked Supabase database reset. Ask first.' },
  ];

  const hit = blocked.find((item) => item.re.test(command));
  if (hit) {
    deny(event, hit.reason);
    process.exit(0);
  }
}

process.exit(0);
