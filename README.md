# Almohajirin wel Ansar — Full-Stack Application

## Architecture
```
almohajirin/
├── frontend/          Next.js 14 (App Router, TypeScript)
├── backend/           Express.js API (TypeScript)
├── database/          PostgreSQL migrations & seeds
├── design-archive/    Original design prototypes (for AI context)
├── docker-compose.yml
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- Docker (optional)

### Option A: Docker (recommended)
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
docker-compose up -d
```
App runs at `http://localhost:3000`, API at `http://localhost:4000`

### Option B: Manual
```bash
# 1. Database
createdb almohajirin
cd database && psql almohajirin < migrations/001_init.sql

# 2. Backend
cd backend
cp .env.example .env   # edit DB credentials
npm install
npm run dev             # http://localhost:4000

# 3. Frontend
cd frontend
cp .env.example .env.local
npm install
npm run dev             # http://localhost:3000
```

## Default Users (after seeding)
| Role    | Email                    | Password   |
|---------|--------------------------|------------|
| Manager | manager@almohajirin.edu  | admin123   |
| Teacher | teacher@almohajirin.edu  | teacher123 |
| Parent  | parent@almohajirin.edu   | parent123  |
| Student | student@almohajirin.edu  | student123 |

## Design Archive
The `design-archive/` folder contains the original HTML prototypes and design system.
When working with AI tools, point them at this folder for full design context:
- `colors_and_type.css` — all design tokens
- `app-shell.css` — responsive layout system
- `public/` — public site prototypes
- `apps/` — dashboard prototypes
- `kits/` — component kit previews

## Tech Stack
- **Frontend:** Next.js 14, TypeScript, CSS Modules + design tokens
- **Backend:** Express.js, TypeScript, Prisma ORM
- **Database:** PostgreSQL 15
- **Auth:** JWT (access + refresh tokens) + Google OAuth 2.0
- **i18n:** next-intl (Arabic RTL + English LTR)
