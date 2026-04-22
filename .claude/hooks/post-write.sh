#!/usr/bin/env bash
# post-write.sh — PostToolUse/Write + PostToolUse/Edit
# After any file write or edit, runs targeted checks based on file type:
#   • TypeScript files → tsc --noEmit (frontend or backend)
#   • CSS module files → build check
#   • SQL migrations → syntax hint
#   • .env files → warns if real secrets detected
# Receives JSON on stdin: { "tool_name": "Write|Edit", "tool_input": { "file_path": "..." } }

set -euo pipefail

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('file_path',''))" 2>/dev/null || echo "")

[ -z "$FILE_PATH" ] && exit 0

REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || echo ".")
REL_PATH="${FILE_PATH#$REPO_ROOT/}"

# ── TypeScript files ──────────────────────────────────────────────────────────
if [[ "$FILE_PATH" == *.ts || "$FILE_PATH" == *.tsx ]]; then
  if [[ "$FILE_PATH" == */frontend/* ]]; then
    cd "$REPO_ROOT/frontend"
    if [ -f "node_modules/.bin/tsc" ]; then
      OUTPUT=$(node_modules/.bin/tsc --noEmit 2>&1) && STATUS=0 || STATUS=$?
      if [ $STATUS -ne 0 ]; then
        # Print first 20 lines of errors as a hint
        echo "$OUTPUT" | head -20
        osascript -e "display notification \"TypeScript errors in $REL_PATH\" with title \"Claude Code — Type Error\" sound name \"Funk\"" 2>/dev/null || true
      fi
    fi
  elif [[ "$FILE_PATH" == */backend/* ]]; then
    cd "$REPO_ROOT/backend"
    if [ -f "node_modules/.bin/tsc" ]; then
      node_modules/.bin/tsc --noEmit 2>&1 | head -20 || true
    fi
  fi
fi

# ── CSS module files ──────────────────────────────────────────────────────────
if [[ "$FILE_PATH" == *.module.css ]]; then
  # Check for :global() selectors which fail in Next.js CSS Modules
  if grep -qE ':global\(' "$FILE_PATH" 2>/dev/null; then
    echo "⚠ WARNING: $REL_PATH contains :global() — not allowed in CSS Modules. Move global styles to globals.css"
  fi
fi

# ── .env files ────────────────────────────────────────────────────────────────
if [[ "$(basename "$FILE_PATH")" == ".env" ]]; then
  # Warn if file contains what looks like a real secret (not a placeholder)
  if grep -vE '^\s*#|^\s*$|=your-|=change-me|=placeholder|=<|=example' "$FILE_PATH" | grep -qE '=.{20,}'; then
    echo "⚠ WARNING: $REL_PATH may contain real secrets — ensure it is in .gitignore and never committed"
  fi
fi

# ── SQL migration files ───────────────────────────────────────────────────────
if [[ "$FILE_PATH" == */migrations/*.sql ]]; then
  # Remind about rollback
  if ! grep -qiE 'rollback|down migration|-- revert' "$FILE_PATH" 2>/dev/null; then
    echo "ℹ NOTE: $REL_PATH has no rollback/revert comment — consider documenting how to undo this migration"
  fi
fi

exit 0
