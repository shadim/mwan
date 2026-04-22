#!/usr/bin/env bash
# stop-guard.sh — Stop hook
# Runs when Claude finishes a session. Summarises what changed:
# lists modified/created files, reminds about uncommitted work,
# and fires a macOS notification.

set -euo pipefail

REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || echo ".")
cd "$REPO_ROOT"

BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
STAGED=$(git diff --cached --name-only 2>/dev/null | wc -l | tr -d ' ')
UNSTAGED=$(git diff --name-only 2>/dev/null | wc -l | tr -d ' ')
UNTRACKED=$(git ls-files --others --exclude-standard 2>/dev/null | wc -l | tr -d ' ')

TOTAL=$(( STAGED + UNSTAGED + UNTRACKED ))

echo "╭─────────────────────────────────────────────╮"
echo "│  Claude Code — Session End                  │"
echo "├─────────────────────────────────────────────┤"
printf "│  Branch   : %-32s│\n" "$BRANCH"
printf "│  Staged   : %-32s│\n" "$STAGED file(s)"
printf "│  Unstaged : %-32s│\n" "$UNSTAGED file(s)"
printf "│  Untracked: %-32s│\n" "$UNTRACKED file(s)"
echo "╰─────────────────────────────────────────────╯"

# ── List changed files ────────────────────────────────────────────────────────
if [ "$TOTAL" -gt 0 ]; then
  echo ""
  echo "Changed files:"
  git status --short 2>/dev/null | head -20
  if [ "$TOTAL" -gt 20 ]; then
    echo "  ... and $(( TOTAL - 20 )) more"
  fi
fi

# ── Remind about uncommitted work ─────────────────────────────────────────────
if [ "$TOTAL" -gt 0 ]; then
  echo ""
  echo "ℹ  You have $TOTAL uncommitted change(s) on '$BRANCH'."
  echo "   Run: git add <files> && git commit -m '...' when ready."
fi

# ── macOS notification ────────────────────────────────────────────────────────
MSG="Branch: $BRANCH | $TOTAL file(s) changed"
osascript -e "display notification \"$MSG\" with title \"Claude Code — Done\"" 2>/dev/null || true

exit 0
