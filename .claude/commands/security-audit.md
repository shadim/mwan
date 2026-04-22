# Security Audit

Run a focused security audit on a specific area or the whole backend. Pass scope, e.g.:
`/security-audit auth routes` or `/security-audit all`

## Process

1. Determine scope from `$ARGUMENTS`:
   - `all` → audit every file in `backend/src/routes/` + `backend/src/auth.ts` + `frontend/src/lib/`
   - specific area → read only the relevant files

2. For each file in scope, check:

### SQL injection
Search for any query built with string concatenation:
```
Grep: query\(`|query\(" — then inspect for + or template literals with user input
```
Every query must use `$1`, `$2` params.

### Authentication gaps
- Routes missing `router.use(authenticate)` or per-route `authenticate`
- Routes that are intentionally public must have `// PUBLIC` comment

### Authorization gaps
- GET endpoints: is the SQL WHERE clause scoped to `req.user.role`?
- Write endpoints: does `authorize(...)` restrict to correct roles?
- No route reads `role` or `userId` from `req.body`

### Token security
- Refresh token read from `req.cookies.refreshToken` (not body)
- Refresh token validated against DB (`validateRefreshToken`)
- `storeRefreshToken` uses SHA-256 hash (not bcrypt)
- Access token is 15m, refresh token cookie is HttpOnly + Secure in production

### Frontend secrets
- No tokens in `localStorage` or `sessionStorage`
- `api()` wrapper used — not raw fetch with manual token handling
- No `dangerouslySetInnerHTML` with user-controlled content

3. Output:

| Severity | File:line | Vulnerability | Exploit scenario | Fix |
|----------|-----------|--------------|-----------------|-----|
| 🔴 CRITICAL | ... | SQL injection | ... | Use `$1` param |
| 🟡 HIGH | ... | Missing auth | ... | Add `authenticate` |
| 🟠 MEDIUM | ... | ... | ... | ... |

4. If CRITICAL issues are found, do not just report — fix them immediately and show the diff.

$ARGUMENTS
