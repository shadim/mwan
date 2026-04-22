---
name: self-review
description: Checklist Claude must run through mentally before reporting a task as complete. Applies to every non-trivial code change.
---

# Self-Review Checklist

Run through this before saying "done" on any code change. If any item fails, fix it first.

## Correctness
- [ ] Does the code do what the task asked for — exactly, not approximately?
- [ ] Are there edge cases that aren't handled? (empty arrays, null/undefined, zero values, past dates)
- [ ] If I changed SQL: did I check `rows.length` before accessing `rows[0]`?
- [ ] If I changed a calculation: did I trace through with a concrete example to verify the output?

## Security
- [ ] No user-supplied value is used in a SQL string without parameterization
- [ ] No secret, token, or credential appears in any log, response body, or comment
- [ ] Every new API route has `authenticate` middleware (unless explicitly public)
- [ ] Role checks are on `req.user.role`, not on anything from `req.body`

## TypeScript
- [ ] No new `any` without a `// justified:` comment
- [ ] No new non-null assertion `!` that could throw at runtime
- [ ] Run `tsc --noEmit` (or `npm run build`) — zero new errors introduced

## Frontend specifics
- [ ] Did I add a `useEffect` without a dependency array? (infinite loop risk)
- [ ] Is every dashboard layout wrapped with the role guard (`useAuth` + redirect)?
- [ ] Did I use `var(--token)` instead of hardcoded colors/sizes?
- [ ] Does the UI work in RTL (Arabic) — no `margin-left`/`right` for directional spacing?

## Backend specifics
- [ ] Is every `try/catch` block logging the error and returning a proper status code?
- [ ] Does a new route that writes data use `transaction()` if multiple tables are touched?
- [ ] Did I add a new column to a query SELECT without adding it to the TypeScript response type?

## Scope discipline
- [ ] Did I change anything not asked for? If yes, revert it or ask first
- [ ] Did I add any abstraction used in only one place? Remove it
- [ ] Did I add any comments that just restate the code? Remove them
- [ ] Did I add `console.log` debug statements? Remove them

## Build & lint
- [ ] `npm run build` passes with zero new errors or warnings (frontend)
- [ ] `tsc --noEmit` passes (backend)
- [ ] No new `:global()` in CSS Module files
- [ ] No new `.env` values without a matching entry in `.env.example`

## Final check
- [ ] Re-read the original task. Does my implementation match it precisely?
- [ ] Is there anything the user would see and find surprising or unasked-for?
