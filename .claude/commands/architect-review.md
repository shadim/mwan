# Architect Review

Review the architecture of an existing feature, module, or the whole codebase. Pass a scope, e.g.:
`/architect-review auth system` or `/architect-review backend API layer`

## Process

### 1. Map what exists
Read the relevant files. Build a mental model of:
- Data flow: how a request enters, what DB calls happen, what is returned
- Auth flow: where tokens are verified, where roles are checked
- State flow (frontend): what is in context vs local state vs URL
- Error flow: where errors are caught, surfaced, or swallowed

### 2. Evaluate against project rules
Check each area against `.claude/rules/`:
- **be.md**: every route authenticated? role-scoped queries? parameterized SQL?
- **fe.md**: role guards on dashboards? no localStorage tokens? correct provider nesting?
- **infra.md**: secrets in env vars? health checks present? non-root Docker user?

### 3. Identify structural problems
Look for:
- **Coupling**: does a frontend component know too much about the DB shape?
- **Duplication**: is the same query or component logic duplicated across routes/pages?
- **Missing abstraction**: repeated patterns (≥3 uses) that should be extracted
- **Wrong layer**: business logic in the route handler instead of a service function?
- **God objects**: one file doing too many unrelated things

### 4. Scalability for this app
Context: ~480 students, 32 teachers, 4 roles, single school.
Flag anything that would break or degrade at 2× users, not hypothetical millions.

### 5. Security posture
Run the security lens from `.claude/rules/security-reviewer.md`:
- Any SQL injection vectors?
- Any role escalation paths?
- Any data that could leak across role boundaries?

### 6. Output

#### Architecture map
A plain-text diagram or bullet hierarchy showing the current structure.

#### Findings
| Area | Problem | Severity | Recommendation |
|------|---------|----------|---------------|
| auth | Refresh token not validated against DB | 🔴 Critical | Add DB lookup in /auth/refresh |
| frontend | ... | ... | ... |

#### Recommended refactors
Ordered by impact/effort ratio — highest impact, lowest effort first.

#### What's working well
Note patterns worth preserving and replicating.

$ARGUMENTS
