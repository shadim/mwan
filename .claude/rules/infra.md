---
name: infrastructure
description: Rules for Docker, docker-compose, Railway config, environment variables, and deployment scripts
---

# Infrastructure Rules

## Environment variables
- **Never** hardcode secrets in any file tracked by git — use `process.env.VAR_NAME`
- Every env var used in code must have a placeholder entry in the relevant `.env.example`
- `.env` files are in `.gitignore` — if a `.env` appears in `git status`, stop and fix before committing
- JWT secrets must be ≥ 32 characters — document this minimum in `.env.example` comments
- `NODE_ENV` must be `production` in all Railway/production environments

## docker-compose.yml
- All secrets come from environment variables or a `.env` file — no hardcoded passwords in compose
- `depends_on` must use `condition: service_healthy` not bare service name for DB dependencies
- Volumes for persistent data (Postgres) must be named volumes, not anonymous (`pgdata:` not `- /data`)
- Never expose the DB port (5432) in production — only the app ports (3000, 4000)
- Health checks required on the `db` service

## Dockerfiles
- Always use multi-stage builds: `deps` → `builder` → `runner`
- Final stage must run as non-root: add `RUN addgroup -S app && adduser -S app -G app` + `USER app`
- Pin base images to minor versions (`node:20-alpine`) — never `latest`
- `.dockerignore` must exclude: `node_modules`, `.env`, `dist/`, `.next/`, `*.log`
- `EXPOSE` the correct port; set `ENV PORT=` and `ENV HOSTNAME=0.0.0.0` for Next.js

## railway.toml
- `healthcheckPath` must point to a real, implemented endpoint
  - Backend: `/api/health` (returns `{ status: 'ok' }`)
  - Frontend: `/` (200 on the public page)
- `restartPolicyType = "on_failure"` required on all services
- `builder = "dockerfile"` — always use the Dockerfile, not nixpacks auto-detect

## CORS
- `FRONTEND_URL` env var controls the allowed origin — never `'*'` in production
- `credentials: true` is already set in `backend/src/index.ts` — do not remove it
- When adding a new deployment URL, update `FRONTEND_URL` in Railway before testing OAuth

## Migrations
- Run migrations as a one-time Railway job or via the backend shell, not at app startup
- Migration files are append-only — never edit an existing `00X_*.sql` file that has been applied
- New migrations go in `database/migrations/` with the next sequence number
- Test migrations locally with `npm run db:migrate` against a fresh Docker DB before committing

## Secrets rotation
- When rotating `JWT_SECRET`, all existing sessions are immediately invalidated — schedule during low-traffic
- When rotating `DATABASE_URL`, update Railway env var before redeploying
