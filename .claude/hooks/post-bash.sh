#!/usr/bin/env bash
# post-bash.sh — PostToolUse/Bash
# Logs every command with its exit code and duration. Emits a desktop
# notification (macOS) when a long-running command finishes or fails.
# Receives JSON on stdin: { "tool_name": "Bash", "tool_input": {...}, "tool_response": {...} }

set -euo pipefail

LOG_DIR="$HOME/.claude/logs"
LOG_FILE="$LOG_DIR/bash-history.log"
mkdir -p "$LOG_DIR"

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('command','')[:200])" 2>/dev/null || echo "unknown")
EXIT_CODE=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); r=d.get('tool_response',{}); print(r.get('exit_code', r.get('exitCode', 0)))" 2>/dev/null || echo "0")

TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
PROJECT=$(basename "$(git rev-parse --show-toplevel 2>/dev/null || echo 'unknown')")
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'unknown')

# ── Append to log ─────────────────────────────────────────────────────────────
printf '[%s] [%s/%s] exit=%s cmd=%s\n' \
  "$TIMESTAMP" "$PROJECT" "$BRANCH" "$EXIT_CODE" "$COMMAND" >> "$LOG_FILE"

# ── macOS notification on failure ─────────────────────────────────────────────
if [ "$EXIT_CODE" != "0" ] && [ "$EXIT_CODE" != "" ]; then
  SHORT_CMD=$(echo "$COMMAND" | head -c 60)
  osascript -e "display notification \"exit $EXIT_CODE: $SHORT_CMD\" with title \"Claude Code — Command Failed\" sound name \"Basso\"" 2>/dev/null || true
fi

# ── macOS notification for long builds (npm run build, tsc, etc.) ─────────────
if echo "$COMMAND" | grep -qE '(npm run build|tsc|docker build|docker compose up)'; then
  osascript -e "display notification \"$(echo "$COMMAND" | head -c 50)\" with title \"Claude Code — Build Complete\"" 2>/dev/null || true
fi

exit 0
