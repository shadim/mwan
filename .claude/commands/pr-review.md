# Review Pull Request

Thoroughly review a PR. Pass the PR number as the argument, e.g. `/pr-review 3`.

## Steps

1. Run in parallel:
   - `gh pr view $ARGUMENTS` — title, description, author, status
   - `gh pr diff $ARGUMENTS` — full diff
   - `gh api repos/{owner}/{repo}/pulls/$ARGUMENTS/comments` — existing review comments
2. For each changed file in the diff, read it in full to understand surrounding context
3. Review through these lenses in order:

### Security lens (highest priority)
- SQL injection: any query built with string concat instead of `$1` params?
- Auth bypass: new routes missing `authenticate` or `authorize` middleware?
- Role leakage: GET endpoints returning data not scoped to `req.user.role`?
- Secrets: any hardcoded tokens, passwords, or `.env` values?
- Refresh token handling: still using `localStorage`? Cookie flags correct?

### Correctness lens
- Logic bugs, off-by-one errors, wrong SQL WHERE clause
- `rows[0]` accessed without checking `rows.length`
- `rowCount` not checked after UPDATE/DELETE where 0 means a bug
- Race conditions in async code

### Frontend lens
- Dashboard layouts missing role guard (`useAuth` + redirect)?
- Duplicate `I18nProvider` nesting?
- `:global()` in `.module.css` files?
- Hardcoded colors/sizes instead of `var(--token)`?
- Missing `credentials: 'include'` on fetch calls?

### Performance lens
- N+1 queries (loop calling `query()` instead of a JOIN)
- `useEffect` without dependency array
- Missing DB indexes on new FK columns or WHERE-clause columns

### Scope lens
- Does the PR do more than described?
- New abstractions used in only one place?
- Commented-out code left behind?

## Output Format

### Overview
One paragraph: what this PR does and whether the approach is sound.

### Findings
| Severity | File:line | Issue | Fix |
|----------|-----------|-------|-----|
| 🔴 Critical | ... | ... | ... |
| 🟡 Warning | ... | ... | ... |
| 🔵 Suggestion | ... | ... | ... |

### Verdict
**APPROVE** / **REQUEST CHANGES** / **NEEDS DISCUSSION**
One sentence explaining the verdict.

$ARGUMENTS
