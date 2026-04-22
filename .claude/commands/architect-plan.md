# Architect Plan

Turn a design (from `/architect-design`) or a user request into a concrete, ordered implementation plan with file-level tasks. Pass the feature name, e.g.:
`/architect-plan notifications system`

## Process

### 1. Confirm scope
Restate what will and will NOT be built in this plan. If the request is ambiguous, ask before planning.

### 2. Break into phases
Each phase should be independently shippable (passes build, doesn't break existing features).

```
Phase 1 — Foundation (DB + bare API)
Phase 2 — Backend logic (role scoping, business rules)
Phase 3 — Frontend wiring (context, API calls)
Phase 4 — UI (components, pages, i18n strings)
Phase 5 — Polish & tests (edge cases, error states)
```

### 3. Task list per phase
For each task:
```
[ ] Task name
    File: <exact file path to create or modify>
    What: <one sentence — what changes and why>
    Depends on: <task ID this must come after, if any>
    Risk: low | medium | high
```

### 4. Migration plan (if schema changes)
- New migration file: `database/migrations/00N_<name>.sql`
- Rollback strategy
- Whether existing data needs backfilling

### 5. Environment changes
List any new env vars needed:
```
# .env.example additions
NEW_VAR=<description of what value goes here>
```

### 6. Definition of done
What does "this feature is complete" look like? List:
- Specific user actions that work end-to-end
- Role-specific behaviours that are correct
- Error states that are handled gracefully

### 7. Estimated complexity
- Lines of code rough order-of-magnitude: ~50 / ~200 / ~500+
- Number of files to create vs modify
- Any third-party packages needed?

$ARGUMENTS
