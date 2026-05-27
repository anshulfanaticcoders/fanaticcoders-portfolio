#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectRoot = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const log = path.join(projectRoot, '.claude', 'tmp', 'changed-files.log');
if (!fs.existsSync(log)) process.exit(0);

const content = fs.readFileSync(log, 'utf8').trim();
if (!content) process.exit(0);

const recent = content.split(/\r?\n/).slice(-8).map((line) => line.replace(/^\S+\s+/, ''));
const unique = [...new Set(recent)];

process.stderr.write([
  'Verification reminder: files changed this session.',
  `Recent files: ${unique.join(', ')}`,
  'Before final response, run or mention relevant checks from AGENTS.md/CLAUDE.md.',
  'Keep secrets out of configs and verify MCP placeholders before use.',
].join('\n'));

process.exit(0);
