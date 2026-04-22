---
name: documentation
description: Rules for comments, inline docs, migration notes, and README updates across the codebase
---

# Documentation Rules

## The core principle
Comment the **why**, not the **what**. If the code is readable, the comment is redundant.

```ts
// BAD — states the obvious
// increment streak by 1
streak += 1;

// GOOD — explains non-obvious business rule
// Hijri calendar day starts at Maghrib, so streaks reset at that boundary
streak += 1;
```

## When a comment IS required
- SQL queries with non-obvious WHERE logic or JOIN chains
- Security decisions that look wrong but are intentional (e.g. `// safe: value is enum-checked by Zod before this point`)
- Role-scoping logic — always add `// role: manager/teacher/parent/student` above the branch
- Any `// TODO:` must include: what, why it's deferred, and a ticket/issue reference if one exists
- Magic numbers: `const STREAK_EXPIRY_DAYS = 1; // Quran streak resets if no activity for >1 day`

## What to NEVER comment
- Commented-out code — delete it; git history preserves it
- `// returns the user` above `return user`
- Auto-generated boilerplate comments (e.g. `// constructor`)
- Date/author stamps (`// added by X on Y`) — git blame is authoritative

## Route file headers
Every route file must have a one-line comment block at the top:
```ts
// Routes: POST /api/auth/login, POST /api/auth/google, POST /api/auth/refresh,
//         POST /api/auth/logout, GET /api/auth/me
// Auth: login + google are PUBLIC; all others require authenticate middleware
```

## SQL migration files
Each migration file must start with:
```sql
-- Migration: <short description>
-- Date: YYYY-MM-DD
-- Depends on: <previous migration file>
-- Rollback: <SQL or "no rollback — additive only">
```

## CSS token usage
When overriding a token for a specific context, document why:
```css
/* Overriding --accent for campaign section: brass feels more urgent than mint */
background: var(--accent-warm);
```

## CLAUDE.md
Update `CLAUDE.md` when:
- A new API route group is added (add to the "API Routes" section)
- A new user role is created
- The folder structure changes significantly
Do NOT update CLAUDE.md for routine bug fixes or feature additions within existing patterns.
