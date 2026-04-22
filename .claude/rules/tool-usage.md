---
name: tool-usage
description: Rules for how to use Claude Code tools efficiently and correctly — parallelism, right tool selection, and avoiding anti-patterns
---

# Tool Usage Rules

## Parallelism
Run independent tool calls in the same message turn whenever possible:
```
// Good — both reads happen simultaneously
Read(frontend/src/lib/api.ts)
Read(backend/src/auth.ts)

// Bad — sequential when there's no dependency
Read(api.ts) → wait → Read(auth.ts)
```
Use sequential calls only when the second call depends on the first result.

## Right tool for the job

| Task | Use | Never use |
|------|-----|-----------|
| Find files by name/pattern | `Glob` | `Bash(find ...)` |
| Search file contents | `Grep` | `Bash(grep ...)` or `Bash(rg ...)` |
| Read a file | `Read` | `Bash(cat ...)` |
| Edit a file | `Edit` | `Bash(sed ...)` or `Bash(awk ...)` |
| Create a new file | `Write` | `Bash(echo > ...)` or heredoc |
| System commands, builds, git | `Bash` | — |
| Open-ended codebase search | `Agent(Explore)` | Repeated Glob+Grep loops |

## Read before Edit
Always `Read` a file before using `Edit` or `Write` on it. The tool will error if you haven't — but more importantly, editing without reading the current state introduces merge conflicts with concurrent changes.

## Grep patterns
- Use specific patterns, not broad ones: `grep "storeRefreshToken"` not `grep "token"`
- Specify `output_mode: "content"` with `-C 3` context when you need surrounding lines
- Specify `glob` or `type` to narrow scope: `grep "query" --glob "*.ts"` not searching all files

## Bash discipline
- One logical operation per `Bash` call unless operations are a natural pipeline
- Always include `2>&1` when you need stderr in the output
- For commands that may fail expectedly, append `|| true` to avoid aborting the tool
- Prefer `npm run <script>` over direct `node_modules/.bin/<tool>` calls

## Edit precision
- `old_string` must be unique in the file — if it matches multiple locations, add more surrounding context
- Use `replace_all: true` only for true rename-everywhere operations
- Never include line number prefixes in `old_string` — copy the raw file content

## Write vs Edit
- `Edit` for targeted changes to existing files (preferred — shows diff to user)
- `Write` only for: new files, or complete rewrites where Edit would require replacing 80%+ of the file

## Avoiding unnecessary reads
- Don't re-read a file immediately after editing it — the Edit tool tracks state
- Don't read files just to confirm a Write succeeded — Write errors if it fails
- If you already have file content in context from this conversation, use it

## Search strategy
- Start narrow: search for the exact symbol/string first
- Widen only if not found: try partial name, then directory scan
- If after 3 targeted searches you haven't found it, use `Agent(Explore)` with a clear question

## Context window hygiene
- Don't read large files (>200 lines) unless you need the whole thing — use `offset` + `limit`
- Don't run `git diff` on branches with thousands of changes — scope to specific files
- Use `Agent` to isolate large research tasks that would flood the main context
