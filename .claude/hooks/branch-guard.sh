#!/usr/bin/env bash
# branch-guard.sh — PreToolUse/Bash
# Prevents Claude from committing directly to main/master or creating commits
# with --no-verify. Also warns if working on a detached HEAD.
# Receives JSON on stdin: { "tool_name": "Bash", "tool_input": { "command": "..." } }

set -euo pipefail

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('command',''))")

block() {
  echo '{"decision":"block","reason":"'"$1"'"}'
  exit 0
}

# ── Block commits with --no-verify ────────────────────────────────────────────
if echo "$COMMAND" | grep -qE 'git\s+commit.*--no-verify'; then
  block "Blocked: git commit --no-verify skips hooks — never bypass hooks without explicit user request"
fi

# ── Block direct push to protected branches ───────────────────────────────────
if echo "$COMMAND" | grep -qE 'git\s+push(\s+\S+)?\s+(main|master|release|production)\b'; then
  block "Blocked: direct push to protected branch '$(echo "$COMMAND" | grep -oE '(main|master|release|production)')' — open a PR instead"
fi

# ── Block checkout of main/master for direct editing ─────────────────────────
# (allow checkout for reading, only block if combined with write intent)
# This is a soft check — actual write protection is on push

# ── Warn on detached HEAD commits ─────────────────────────────────────────────
if echo "$COMMAND" | grep -qE 'git\s+commit'; then
  BRANCH=$(git -C "$(git rev-parse --show-toplevel 2>/dev/null || echo '.')" rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
  if [ "$BRANCH" = "HEAD" ]; then
    block "Blocked: you are in detached HEAD state — checkout a branch before committing"
  fi
  if [ "$BRANCH" = "main" ] || [ "$BRANCH" = "master" ]; then
    block "Blocked: direct commit to '$BRANCH' — create a feature branch first"
  fi
fi

echo '{"decision":"approve"}'
