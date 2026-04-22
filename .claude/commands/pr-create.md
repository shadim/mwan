# Create Pull Request

Create a well-structured PR for the current branch against `main`.

## Steps

1. Run these in parallel:
   - `git status` — check for unstaged or untracked files
   - `git log main..HEAD --oneline` — list all commits in this branch
   - `git diff main...HEAD --stat` — summarise changed files
2. Read the key changed files to understand the full scope
3. Check for anything that should NOT be committed:
   - `.env` files with real values
   - `console.log` debug statements
   - `tsconfig.tsbuildinfo` or `.next/` build artifacts
   - `.claude/` directory contents
4. If the branch is not pushed, push it: `git push -u origin <branch>`
5. Generate a PR title (≤70 chars) and body using the format below
6. Create with: `gh pr create --title "..." --body "$(cat <<'EOF' ... EOF)"`

## PR Body Format

```
## Summary
- <what changed and why — user-facing impact first>
- <key technical decisions>

## Changes
- `frontend/` — <what changed>
- `backend/` — <what changed>
- `database/` — <migrations, if any>
- `infra` — <docker/railway changes, if any>

## Test Plan
- [ ] <role>: <exact steps to verify the golden path>
- [ ] Edge case: <what to check>
- [ ] Regression: <existing feature to spot-check>

## Notes
<breaking changes, env vars to add in Railway, migration steps>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

## Project context
- Stack: Next.js 14 frontend, Express backend, PostgreSQL
- Protected branch: `main` — all changes go through PRs
- Always check that `npm run build` passes before creating the PR

$ARGUMENTS
