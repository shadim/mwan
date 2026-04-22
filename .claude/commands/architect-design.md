# Architect Design

Design a new feature or system from scratch. Pass a description of what you want to build, e.g.:
`/architect-design add a notifications system for attendance alerts`

## Process

### 1. Understand the requirement
Restate the requirement in one sentence. Identify:
- Which user roles are affected (manager / teacher / student / parent)
- Whether this is read-heavy, write-heavy, or both
- Whether it needs real-time behaviour (WebSocket/polling) or request-response is fine
- Whether it touches payments or sensitive PII (higher security bar)

### 2. Database design
Propose the schema additions:
- New tables with columns, types, constraints, defaults
- FK relationships with explicit ON DELETE behaviour
- Indexes needed for the expected query patterns
- Migration file name: `database/migrations/00N_<description>.sql`

### 3. Backend API design
For each new endpoint:
```
METHOD /api/<resource>
Auth: public | authenticate | authorize('role1','role2')
Request body: { field: type }
Response: { field: type }
Role behaviour: <how response differs by role>
```

### 4. Frontend design
- Which pages/routes are new vs modified: `frontend/src/app/<route>/`
- Which dashboard(s) are affected and what new tabs/sections are needed
- New components needed vs reusing existing ones from `src/components/`
- i18n: list the new Arabic/English string pairs needed
- Any new CSS token needs or design system gaps

### 5. Contracts & types
Define the TypeScript interfaces for:
- API request/response shapes (camelCase, frontend-facing)
- DB row shapes (snake_case, backend-internal)
- Shared role-typed data

### 6. Implementation order
Recommended sequence:
1. Migration
2. Backend route(s) + role scoping
3. Frontend context/API wiring
4. UI components
5. Integration test plan (from `pr-test-analyzer`)

### 7. Risks & open questions
- What could go wrong with this design?
- What needs a decision from the user before implementation starts?
- Any performance concerns at scale (480+ students)?

$ARGUMENTS
