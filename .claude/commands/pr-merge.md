# Merge Pull Request

Prepare and merge a PR after it's been approved. Pass the PR number, e.g. `/pr-merge 3`.

## Steps

1. Run in parallel:
   - `gh pr view $ARGUMENTS` — verify it's approved and all checks pass
   - `gh pr checks $ARGUMENTS` — confirm CI is green
   - `git log main..HEAD --oneline` — review the commit list one last time
2. Pre-merge checklist:
   - [ ] At least one approval (not just CI passing)
   - [ ] No unresolved review comments
   - [ ] `npm run build` passes on the branch
   - [ ] No `.env` files or secrets in the diff
   - [ ] Migration files (if any) have been reviewed
3. If the branch has merge conflicts: `git fetch origin && git rebase origin/main`, resolve, push
4. Merge with squash if the branch has noisy/WIP commits; merge commit if commits are clean and meaningful:
   ```
   gh pr merge $ARGUMENTS --squash --delete-branch
   # or
   gh pr merge $ARGUMENTS --merge --delete-branch
   ```
5. Confirm: `gh pr view $ARGUMENTS` should show state: MERGED
6. If there are post-merge tasks (run migrations, update Railway env vars, notify team), list them

## Post-merge reminders
- If new env vars were added: update Railway dashboard before the next deploy
- If DB migrations were added: run `npm run db:migrate` against production DB
- If public-facing routes changed: smoke test `/public` and `/login` after deploy

$ARGUMENTS
