# Debug

Diagnose and fix a bug. Describe the symptom, e.g.:
`/debug attendance page shows blank for teacher role`

## Process

### 1. Reproduce mentally
From the description, identify:
- Which route / page is affected: frontend URL and/or API endpoint
- Which user role triggers the bug
- What the expected vs actual behaviour is

### 2. Trace the data flow
Follow the request from browser to DB and back:
```
Browser → Next.js page → api() call → Express route → SQL query → DB
                                                               ↓
Browser ← React state ← JSON response ← Express response ← result.rows
```
Read each file in this chain for the affected feature.

### 3. Form hypotheses (≤3)
State the most likely root causes ranked by probability. For each:
- What would cause this symptom?
- What evidence would confirm it?

### 4. Investigate
- Check the most likely hypothesis first
- Use `Grep` to find the specific function/query
- Look for: role-scoping gaps, unchecked `rows[0]`, silent catch blocks, wrong env var, type mismatch

### 5. Fix
- Make the minimal change that fixes the root cause
- Do not fix adjacent issues unless they are directly related
- Run `npm run build` to confirm no TypeScript errors introduced

### 6. Verify
Describe the exact steps to confirm the fix works:
- Which user role to log in as
- What action to take
- What the correct response should be

### 7. Root cause summary
One sentence: what was broken and why.

$ARGUMENTS
