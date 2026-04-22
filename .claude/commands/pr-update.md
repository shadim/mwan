# Update Pull Request

Address review comments on an open PR and push an update. Pass the PR number, e.g. `/pr-update 3`.

## Steps

1. Run in parallel:
   - `gh pr view $ARGUMENTS` — current state, description
   - `gh api repos/{owner}/{repo}/pulls/$ARGUMENTS/comments --jq '[.[] | {path,line,body}]'` — all inline comments
   - `gh pr checks $ARGUMENTS` — CI status
2. Read each file that has a review comment in full — understand the context before changing anything
3. Triage comments:
   - **Fix now**: bugs, security issues, correctness problems, anything marked CRITICAL or WARNING
   - **Discuss**: architectural disagreements or ambiguous suggestions — surface to user before changing
   - **Decline**: suggestions that conflict with project rules in `.claude/rules/` — explain why
4. For each fix:
   - Make the targeted change
   - Run the self-review checklist from `.claude/rules/self-review.md`
   - Verify `npm run build` still passes (frontend) and `tsc --noEmit` (backend)
5. Stage and commit: `git add <specific files>` then commit with message:
   ```
   fix: address PR #$ARGUMENTS review comments

   - <what was fixed and why>
   ```
6. Push: `git push`
7. Reply to resolved comments: `gh api repos/{owner}/{repo}/pulls/$ARGUMENTS/comments/<id>/replies -f body="Fixed in <commit hash>"`

## What NOT to do
- Do not squash or amend commits without the user asking — preserve review history
- Do not make unrequested changes while "fixing" review comments
- Do not close suggestions as resolved without either implementing or explaining why not

$ARGUMENTS
