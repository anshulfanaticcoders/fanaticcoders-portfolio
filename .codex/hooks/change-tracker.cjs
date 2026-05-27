#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function readInput() {
  try {
    return JSON.parse(fs.readFileSync(0, 'utf8') || '{}');
  } catch {
    return {};
  }
}

const input = readInput();
const filePath = input.tool_input?.file_path || input.tool_input?.path || '';
if (!filePath) process.exit(0);

const projectRoot = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const dir = path.join(projectRoot, '.claude', 'tmp');
fs.mkdirSync(dir, { recursive: true });

const log = path.join(dir, 'changed-files.log');
fs.appendFileSync(log, `${new Date().toISOString()} ${filePath}\n`);

process.exit(0);
