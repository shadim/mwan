# Almohajirin wel Ansar — Project Context

## Design System
The design system lives in `design-archive/`. When implementing any UI, reference:
- `design-archive/colors_and_type.css` for all color tokens, typography, spacing, shadows
- `design-archive/app-shell.css` for responsive layout patterns
- The prototype HTML files in `design-archive/public/` and `design-archive/apps/` for exact component structure

## Theme: Mint Garden
- Primary: `--accent: #2D9269` (mint green)
- Warm accent: `--accent-warm: #B8923A` (brass)
- Background: `--bg: #E8F5F0` (pale mint)
- Fonts: Reem Kufi (headings), Tajawal (body), Amiri (Quranic text)
- Direction: RTL-first Arabic, with EN toggle

## Architecture
- `frontend/` — Next.js 14 (App Router, TypeScript)
- `backend/` — Express.js API (TypeScript)
- `database/` — PostgreSQL with migrations in `database/migrations/`

## User Roles
4 roles with separate dashboards: manager, teacher, student, parent

## API Routes
All under `/api/`: auth, students, attendance, hifz, payments, donations, messages, schedule
