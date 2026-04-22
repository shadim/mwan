#!/usr/bin/env bash
# pre-bash-guard.sh — PreToolUse/Bash
# Blocks destructive shell commands before they execute.
# Receives JSON on stdin: { "tool_name": "Bash", "tool_input": { "command": "..." } }

set -euo pipefail

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('command',''))")

block() {
  echo '{"decision":"block","reason":"'"$1"'"}'
  exit 0
}

# ── Destructive filesystem ────────────────────────────────────────────────────
if echo "$COMMAND" | grep -qE 'rm\s+-rf\s+(/|~|\$HOME|\.\./)'; then
  block "Blocked: 'rm -rf' targeting root, home, or parent directory"
fi

if echo "$COMMAND" | grep -qE '\|\s*xargs\s+rm'; then
  block "Blocked: piped xargs rm — too risky without confirmation"
fi

# ── Dangerous git operations ──────────────────────────────────────────────────
if echo "$COMMAND" | grep -qE 'git\s+push\s+.*--force(?!-with-lease)'; then
  block "Blocked: 'git push --force' — use --force-with-lease or ask the user"
fi

if echo "$COMMAND" | grep -qE 'git\s+reset\s+--hard'; then
  block "Blocked: 'git reset --hard' discards local changes — confirm with user first"
fi

if echo "$COMMAND" | grep -qE 'git\s+clean\s+.*-f'; then
  block "Blocked: 'git clean -f' deletes untracked files — confirm with user first"
fi

if echo "$COMMAND" | grep -qE 'git\s+push\s+.*\s+(main|master)\b'; then
  block "Blocked: direct push to main/master — open a PR instead"
fi

# ── Database nukes ────────────────────────────────────────────────────────────
if echo "$COMMAND" | grep -qiE 'DROP\s+(DATABASE|TABLE|SCHEMA)\s'; then
  block "Blocked: DROP DATABASE/TABLE/SCHEMA — requires explicit user confirmation"
fi

if echo "$COMMAND" | grep -qiE 'TRUNCATE\s+'; then
  block "Blocked: TRUNCATE — requires explicit user confirmation"
fi

# ── Secrets leaking ───────────────────────────────────────────────────────────
if echo "$COMMAND" | grep -qE 'cat\s+.*\.env\b'; then
  block "Blocked: printing .env file — may expose secrets to logs"
fi

# ── Allow everything else ─────────────────────────────────────────────────────
echo '{"decision":"approve"}'
