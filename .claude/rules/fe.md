---
name: frontend
description: Rules for all frontend work in frontend/ — Next.js 14, TypeScript, CSS Modules, RTL-first Arabic/EN i18n
---

# Frontend Rules

## Stack
- Next.js 14 App Router, TypeScript strict mode
- CSS Modules for component styles, `src/styles/globals.css` for global/shared styles
- `src/styles/tokens.css` is the single source of truth for all design tokens — never hardcode colors, spacing, or font sizes
- `@react-oauth/google` for Google OAuth — `GoogleOAuthProvider` is already in `providers.tsx`

## File & folder conventions
- Pages: `src/app/<route>/page.tsx`
- Layouts: `src/app/<route>/layout.tsx`
- Components: `src/components/<name>.tsx` + `<name>.module.css`
- Shared lib: `src/lib/` (contexts, API client, utilities)
- Never create a component file without a co-located CSS module unless it has zero styles

## TypeScript
- No `any` except at verified API boundaries — always add a `// justified: <reason>` comment
- Prefer `interface` over `type` for object shapes
- Role union type is `'manager' | 'teacher' | 'student' | 'parent'` — never use `string` for role
- Always type `useRef<HTMLElement | null>(null)` — never use bare `useRef(null)`

## Component rules
- All components are `'use client'` unless they have zero interactivity and no hooks
- `useAuth()` + `useRouter().replace('/login')` in every dashboard layout — no exceptions
- `useI18n()` for all user-visible strings — never hardcode Arabic or English text directly in JSX
- Never nest `I18nProvider` — it is only in `app/providers.tsx`

## Styling
- Never use inline `style={{}}` for values that exist as CSS tokens — use `var(--token-name)`
- Never use `:global()` in `.module.css` files — global classes go in `globals.css`
- RTL-first: use `margin-inline-start/end` not `margin-left/right` for directional spacing
- Mint Garden theme classes: `pub-eyebrow`, `pub-title`, `pub-section` live in `globals.css`

## API calls
- Always use `api()`, `apiGet()`, `apiPost()` etc. from `src/lib/api.ts` — never raw `fetch` in components
- All fetch calls use `credentials: 'include'` (already handled by the `api` wrapper)
- Access token lives in memory only — never write it to localStorage or sessionStorage

## Forms & validation
- Validate required fields before calling the API
- Show error state from `catch (err: any) → err.message` in the component
- Disable submit button while `loading` state is true

## Performance
- No `useEffect` that runs on every render — always specify a dependency array
- Images via `<img>` tag must have `style={{ width: '100%', height: 'auto' }}` or use Next.js `<Image>`
