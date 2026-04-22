---
name: scripts
description: Rules for shell scripts in .claude/hooks/ and any bash scripts added to the project
---

# Script Rules

## Shell conventions
- Always start with `#!/usr/bin/env bash`
- Always include `set -euo pipefail` on the second line — no exceptions
  - `-e`: exit on error
  - `-u`: error on unset variables
  - `-o pipefail`: catch errors in pipelines
- Use `#!/usr/bin/env bash` not `#!/bin/bash` — portable across macOS and Linux

## Variables
- Quote all variable expansions: `"$VAR"` not `$VAR` — prevents word splitting on spaces
- Use `$(command)` not backticks for command substitution
- Declare intent with local variables when inside functions: `local VAR=...`
- Use UPPER_CASE for constants, lower_case for local variables

## Input handling
- Scripts that read JSON from stdin must always handle empty/malformed input gracefully
- Use `python3 -c "import sys,json; ..."` for JSON parsing — never `sed`/`awk` on JSON
- Always provide a default: `VAR=$(... || echo "default")`

## Hook scripts specifically
- Must exit `0` unless signaling a block (hooks with non-zero exit may be treated as errors)
- For `PreToolUse` blocks: output `{"decision":"block","reason":"..."}` to stdout, then `exit 0`
- For `PreToolUse` approvals: output `{"decision":"approve"}` to stdout
- `PostToolUse` and `Stop` hooks: exit `0` always — never block on post-hooks
- macOS notifications via `osascript` must have `2>/dev/null || true` — never fail if Notification Center is unavailable

## Error messages
- Block messages must be user-facing and actionable: say what was blocked AND what to do instead
- Bad: `"Blocked: dangerous command"`
- Good: `"Blocked: direct push to main — open a PR instead with: gh pr create"`

## Portability
- Scripts run on macOS (developer) and may run on Linux (CI) — test both
- Avoid GNU-specific flags (e.g. `grep -P` is not available on macOS without `brew install grep`)
- Use `command -v <tool> &>/dev/null` before calling optional tools like `gh`, `osascript`
- Keep scripts self-contained — no sourcing other scripts unless absolutely necessary

## Logging
- Append structured logs to `$HOME/.claude/logs/` — create the dir if missing: `mkdir -p "$LOG_DIR"`
- Log format: `[YYYY-MM-DD HH:MM:SS] [project/branch] message`
- Never log sensitive values (tokens, passwords, env var values)
