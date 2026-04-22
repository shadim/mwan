#!/usr/bin/env bash
# session-start.sh — Notification hook (session start trigger)
# Prints a project status snapshot at the start of each Claude Code session:
# current branch, uncommitted changes, last commit, and any open PRs.

set -euo pipefail

REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || echo ".")
cd "$REPO_ROOT"

PROJECT=$(basename "$REPO_ROOT")
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
LAST_COMMIT=$(git log -1 --format="%h %s" 2>/dev/null || echo "none")
DIRTY=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')

echo "╭─────────────────────────────────────────────╮"
echo "│  Claude Code — Session Start                │"
echo "├─────────────────────────────────────────────┤"
printf "│  Project : %-33s│\n" "$PROJECT"
printf "│  Branch  : %-33s│\n" "$BRANCH"
printf "│  Commit  : %-33s│\n" "$(echo "$LAST_COMMIT" | cut -c1-33)"
printf "│  Dirty   : %-33s│\n" "$DIRTY file(s) changed"
echo "├─────────────────────────────────────────────┤"

# ── Open PRs ──────────────────────────────────────────────────────────────────
if command -v gh &>/dev/null; then
  PRS=$(gh pr list --json number,title,author --limit 5 2>/dev/null \
    | python3 -c "
import sys,json
prs=json.load(sys.stdin)
for p in prs:
    title=p['title'][:28]
    print(f\"  #{p['number']:<4} {title}\")
" 2>/dev/null || echo "  (gh not authenticated)")
  echo "│  Open PRs:                                  │"
  while IFS= read -r line; do
    printf "│  %-43s│\n" "$line"
  done <<< "$PRS"
else
  printf "│  %-43s│\n" "gh CLI not found — skipping PR list"
fi

echo "╰─────────────────────────────────────────────╯"

# ── Warn if on main with uncommitted changes ──────────────────────────────────
if [ "$BRANCH" = "main" ] || [ "$BRANCH" = "master" ]; then
  if [ "$DIRTY" -gt 0 ]; then
    echo ""
    echo "⚠  WARNING: You have $DIRTY uncommitted change(s) on '$BRANCH'."
    echo "   Consider creating a feature branch before making changes."
  fi
fi

exit 0
