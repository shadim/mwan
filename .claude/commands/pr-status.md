# PR Status

Show a dashboard of all open PRs — their CI status, review state, and what's blocking them.

## Steps

1. Run: `gh pr list --json number,title,author,reviewDecision,statusCheckRollup,headRefName,updatedAt`
2. For each open PR, summarise:
   - PR number + title
   - Branch name
   - CI: ✅ passing / ❌ failing / ⏳ pending
   - Reviews: approved / changes requested / awaiting review
   - Last updated
   - **Blocking reason** (if any): failing check name, unresolved comments, missing approval
3. If there are no open PRs, check for recently merged ones: `gh pr list --state merged --limit 5`

## Output Format

```
Open PRs — <repo>
─────────────────────────────────────────────────
#3  feat: add payments route        [main ← feat/payments]
    CI: ✅  Reviews: 1 approved  Updated: 2h ago
    Status: READY TO MERGE

#2  fix: attendance role filter     [main ← fix/attendance]
    CI: ❌  Reviews: awaiting     Updated: 1d ago
    Blocking: tsc error in routes/attendance.ts
─────────────────────────────────────────────────
```

If there are failing checks, read the relevant file and suggest a fix.

$ARGUMENTS
