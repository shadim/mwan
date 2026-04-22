---
name: backend
description: Rules for all backend work in backend/ — Express.js, TypeScript, PostgreSQL, JWT auth
---

# Backend Rules

## Stack
- Express.js with TypeScript, compiled to `dist/` via `tsc`
- PostgreSQL via `pg` pool — all queries through `query()` or `transaction()` from `src/db.ts`
- JWT access tokens (15m) + HttpOnly cookie refresh tokens (7d)
- Zod for request body validation at API boundaries

## Route file conventions
- One file per domain in `src/routes/<domain>.ts`
- Every router must call `router.use(authenticate)` at the top unless the route is intentionally public
- Public routes (like `POST /auth/login`) must be explicitly documented with `// PUBLIC — no auth required`
- Export a single `Router` as default

## Authentication & authorization
- `authenticate` middleware: validates Bearer token, attaches `req.user` (`userId`, `role`, `email`)
- `authorize(...roles)` middleware: checks `req.user.role` against allowed roles
- Never trust `role` or `userId` from `req.body` — always use `req.user!.role` / `req.user!.userId`
- Refresh token flow: read from `req.cookies.refreshToken`, validate against DB hash, rotate on use

## SQL rules
- **Always** use parameterized queries: `query('SELECT ... WHERE id = $1', [id])` — never string concatenation
- Check `result.rows.length === 0` before accessing `result.rows[0]` — return 404, not a crash
- Check `result.rowCount` after UPDATE/DELETE where 0 rows means a bug
- Use `transaction()` helper for multi-step writes — never leave partial state on error
- Column naming in DB is snake_case (`name_ar`, `user_id`) — camelCase in API responses (`nameAr`, `userId`)

## Role-scoped queries
- Every GET endpoint that returns user data must scope results to the caller's role
- Manager: unrestricted
- Teacher: only students/sections they are assigned to
- Parent: only their linked children
- Student: only their own data
- Default `else` branch in role switches: return `403 { error: 'Access denied' }`

## Error handling
- Wrap every route handler body in `try/catch`
- `catch (err)` must either `console.error(err)` + return `500`, or re-throw
- Never swallow errors silently: no empty `catch {}` blocks
- Validation errors: `400` with `{ error: '<field> required' }`
- Auth errors: `401`; permission errors: `403`; not found: `404`; server errors: `500`

## Response shape
- Success: `res.json(data)` — data is the resource or `{ saved: N, records: [...] }` for batches
- Errors: `res.status(N).json({ error: 'Human-readable message' })`
- Never expose stack traces or internal error messages in production responses

## Cookies
- Refresh token cookie options: `httpOnly: true`, `secure: NODE_ENV === 'production'`, `sameSite: 'strict'`
- Always `res.clearCookie('refreshToken', { path: '/' })` on logout
- Access tokens are returned in the JSON body only — never in a cookie
