# DB Migrate

Create a new database migration. Pass a description, e.g.:
`/db-migrate add notifications table`

## Process

1. Read `database/migrations/` to find the highest existing migration number
2. Read `database/migrations/001_init.sql` to understand existing schema conventions:
   - Column naming: `snake_case`
   - PKs: `UUID DEFAULT gen_random_uuid()`
   - Timestamps: `created_at TIMESTAMPTZ DEFAULT NOW()`
   - Soft delete: `is_active BOOLEAN DEFAULT true`
3. Design the migration:
   - New tables with all constraints, defaults, and indexes
   - FKs with explicit `ON DELETE` behaviour
   - `CHECK` constraints on enum-like columns
   - Index every FK column and every column used in a WHERE clause
4. Create the file: `database/migrations/00N_<slug>.sql`
5. File must start with the header:
   ```sql
   -- Migration: <description>
   -- Date: YYYY-MM-DD
   -- Depends on: <previous migration filename>
   -- Rollback: <DROP TABLE / ALTER TABLE statements, or "additive only">
   ```
6. Test locally:
   ```bash
   docker compose up db -d
   npm run db:migrate
   ```
7. If the migration adds columns used by existing routes, read those routes and check for gaps

## Output
- The migration file content
- A summary of: tables added/modified, indexes created, FK relationships
- Any route files that need updating to use the new columns

$ARGUMENTS
