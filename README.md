# Almohajirin wel Ansar — Design System

> المهاجرين والأنصار · The Emigrants and the Helpers

A design system for **Almohajirin wel Ansar**, an Islamic educational institution (madrasa) based in Israel serving an Arabic-speaking community. The system covers a public donor/registration website and four internal operational apps (Manager, Teacher, Student, Parent) — all mobile-first, RTL-primary, with Islamic visual motifs throughout.

## Sources

- **Repository:** `github.com/shadim/mwan` — empty at the time of authoring (contained only a stub README). This design system was built from scratch based on a written brief.
- **Brief captured from user:**
  - Organization: Islamic educational institution (madrasa / school)
  - Region: Israel · Audience: donors, beneficiaries, students, families, staff
  - Language: Arabic primary, English secondary (RTL)
  - Tone: calm & contemplative, hopeful, modern-youthful, serious-institutional
  - Motifs: geometric Islamic patterns (girih, zellige), Arabic calligraphy, typography-led, community photography
  - Palette: dark black/charcoal + warm gold accent + parchment light surface
  - Surfaces: public site (intro, registration boys, registration girls) + Manager / Teacher (attendance) / Student / Parent apps
  - Features: zakat/donate calculator, campaign progress, events, volunteering, news, classes, Qur'an/hadith reader

## Index

Root files:
- **`README.md`** — this file
- **`colors_and_type.css`** — all CSS tokens (color, type, spacing, radius, shadow, motion) + base typography classes
- **`SKILL.md`** — Claude Code / Agent Skill manifest

Folders:
- **`fonts/`** — font notes (Google Fonts loaded via CSS import; no local TTFs)
- **`assets/`** — logo marks, geometric patterns, mihrab arch, 8-point star
- **`preview/`** — design-system cards shown in the Design System tab
- **`ui_kits/`** — one kit per product surface
  - `public/` — donor/registration website
  - `manager/` — manager operational app
  - `teacher/` — teacher app with attendance
  - `student/` — student app
  - `parent/` — parent app

## Products covered

| Surface | Audience | Status | Entry |
|---|---|---|---|
| Public website | Donors, prospective families | Intro + registration (boys, girls) | `ui_kits/public/index.html` |
| Manager app | School administrator | Minimal dashboard (extendable) | `ui_kits/manager/index.html` |
| Teacher app | Teachers | Attendance management | `ui_kits/teacher/index.html` |
| Student app | Students | Schedule, homework, Qur'an | `ui_kits/student/index.html` |
| Parent app | Parents | Child progress + messaging | `ui_kits/parent/index.html` |

All apps are mobile-responsive and RTL-primary.

---

## CONTENT FUNDAMENTALS

### Voice
Calm, respectful, community-oriented. We write as **"we" (نحن)** on behalf of the madrasa and address readers with formal-but-warm **"you" (أنتم / حضرتكم)**. Never casual to the point of slang; never stiff to the point of bureaucratic.

### Arabic register
- **Modern Standard Arabic (فصحى)** for institutional copy, page titles, forms, legal
- **Classical Arabic (Qur'an, hadith, du'ā)** reserved for quoted sacred text — always rendered in the Amiri serif, centered, with full tashkīl
- No Arabizi, no dialect transliteration. When English appears, it is translated — not code-switched mid-sentence.

### Casing & punctuation
- Arabic has no case. In English headings we use **sentence case**, not Title Case, to feel quieter and more literary.
- English is secondary everywhere; never bolder or larger than the Arabic on the same line.
- Numbers: use **Arabic-Indic digits (٠١٢٣٤٥٦٧٨٩)** in running Arabic copy. Use Western digits for tabular data, currency, ID numbers where scannability matters.
- Dates: Hijri first, Gregorian in parentheses. Example: `١٥ شعبان ١٤٤٧ (١٥ فبراير ٢٠٢٦)`.

### Examples

| Context | ✓ Do | ✗ Don't |
|---|---|---|
| Donate CTA | `ساهم في بناء جيل` (Contribute to building a generation) | `تبرّع الآن!!` (Donate now!!) |
| Registration header | `تسجيل الطلاب للعام الدراسي القادم` | `سجّل بسرعة` (Register fast) |
| Empty state | `لا توجد فعاليات بعد — سنُعلمكم قريباً` | `فاضي! 🤷` |
| Error | `تعذّر حفظ التغييرات — حاولوا مجدداً` | `Error 500: internal` |
| Success | `بارك الله فيكم — تم الحفظ` | `Done ✓` |

### Emoji & symbols
- **No emoji** anywhere — reverent voice does not tolerate them.
- Allowed Unicode symbols: **۞ ﷺ ﷻ ﴾ ﴿** when appropriate to sacred context, and the **8-point star (✸/❋)** as a non-religious ornament.
- Do not use the crescent (☪) — too clichéd and politically loaded in our region. We use geometric patterns instead.

### Inclusive phrasing
- Registration forms: separate flows for boys and girls (required by the institution) — but never disparaging copy. Same tone, same respect.
- Address parents as **"الأهل الكرام"** (honoured family), never "mother/father" alone.

---

## VISUAL FOUNDATIONS

### Color
**Dark by default.** The institutional identity is a deep near-black (`--ink-900` #0E0E0E) with a single warm accent in **gold** (`--gold-400` #E8C76B). A parchment (`--parch-050` #FBF7EC) serves as the light counterpart — used on the public marketing site and for long-form reading. Olive green (`--success` #6B8E4E) and burnt red (`--danger` #B8453A) are the only semantic accents; both feel earthy and quietly Islamic rather than digital-primary.

There is exactly **one accent hue**. Never introduce blue, purple, or any rainbow of categorical colors. Differentiation comes from weight, spacing, and type — not from hue proliferation.

### Type
Arabic is always the dominant voice.
- **Reem Kufi** for display and institutional lockups — geometric, architectural, pairs with girih
- **Tajawal** for body and UI — modern sans with excellent Arabic legibility
- **Amiri** for Qur'anic and hadith passages — classical Naskh serif, set larger with generous line-height
- Latin pairs: **Inter** for body, **Cormorant Garamond** for display

Line-height for Arabic body is **1.8** (looser than Latin norms) because Arabic ascenders and descenders need air.

### Spacing & layout
An **8-point grid** (with a 4px half-step for tight UI). Max content width 1200px; generous `clamp(16px, 4vw, 32px)` gutters. Forms are single-column on mobile, two-column max on desktop. Never more than two columns — density is not an Arabic reading posture.

### Backgrounds
- **Solid black** for app chrome. No gradients.
- **Parchment** for reading surfaces (articles, registration forms, donation pages).
- **Girih pattern overlay** at ~8–15% opacity on hero sections and section dividers — never a full-bleed pattern behind body text.
- **Community photography** allowed only if treated with a warm duotone (black → gold) and grain overlay. Raw vivid photos break the atmosphere.
- No gradients. No glassmorphism. No mesh blobs.

### Animation
**Restrained and contemplative.** Standard transitions use `--ease-standard` over 220ms. Avoid bounces, spring overshoot, and anything that feels toylike. Page transitions are simple cross-fades. Progress indicators (for donation goals) fill smoothly with a ~600ms ease-out. No loop animations, no attention-grabbing pulses.

### Hover / press
- **Hover** on dark surfaces: background lifts from `--ink-700` → `--ink-600` and gains a 1px gold hairline (`--hairline-gold`). No scale.
- **Press:** 97% scale on buttons only; 160ms duration.
- **Focus:** always a 3px gold ring (`--ring-focus`). Never remove outlines without replacing them.
- Gold CTAs darken to `--gold-700` on press.

### Borders & hairlines
Hairlines are 1px and low-contrast on dark (`--ink-500` #2E2E2E). A gold hairline (`inset 0 0 0 1px rgba(232,199,107,.35)`) marks interactive elevation — hover state on cards, selected tabs, the active input field. Never combine gold hairline with a gold fill.

### Shadows
Dark surfaces barely need shadows; the hairline does the elevation work. When needed:
- `--shadow-md` (subtle) for cards that leave the flow
- `--shadow-lg` for modals
- `--shadow-gold` (rare) for the single most important CTA on a page — the donate button, the submit on registration

### Corner radii
- **4px** for small controls (inputs, chips)
- **8px** for buttons and standard cards
- **14px–20px** for hero cards and modals
- **Full pill** (999px) for filter chips and progress bars
- **Mihrab arch** (`--radius-arch`) used sparingly on hero panels and donation cards — the signature shape. Not on every card.

### Transparency & blur
Blur is used **once**: the translucent app header (`backdrop-filter: blur(14px)` over a `rgba(14,14,14,.7)` surface). Elsewhere: solid colors. No frosted cards, no glassmorphism panels.

### Cards
- **Surface:** `--bg-card` (`#1C1C1C`) on dark, `#ffffff` on parchment
- **Border:** 1px `--border` hairline (no border on parchment — white + shadow only)
- **Radius:** 14px default, 8px for list items
- **Padding:** `--space-6` (24px) standard; `--space-8` on hero cards
- **Shadow:** none by default on dark; `--shadow-sm` on parchment
- **Hover:** background `--bg-card-hover`, optional `--hairline-gold`

### Imagery treatment
- Community photography in **warm duotone** (ink-900 → gold-400) with light film grain
- Calligraphy images at full contrast, never duotoned
- Pattern SVGs rendered in gold-400 at ≤15% opacity for backgrounds, 100% for ornamental dividers

### Iconography
See the **ICONOGRAPHY** section below.

### Layout fixtures
- Bottom navigation on mobile apps (Manager/Teacher/Student/Parent), 72px tall
- Top header on web, 72–80px tall
- Floating action button (for "mark all present", "new announcement") in gold, pinned bottom-left in RTL (which is visually bottom-right for RTL readers)

---

## ICONOGRAPHY

### Approach
**Stroke-first, 1.6–2px, rounded caps.** Icons are quiet utility — they never compete with the calligraphy and patterns. One weight throughout the system. No filled duotone icons. No emoji.

### System
We use **Lucide** (lucide.dev) from CDN as the default icon library. Its 1.5–2px stroke, rounded linecaps, and geometric construction pair well with Reem Kufi and girih. Import:

```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>
```

Or individual SVG imports from `unpkg.com/lucide-static/icons/<name>.svg`.

**Why Lucide, not a local font:** no custom icon set exists for the brand yet. Lucide's license and breadth make it safer than Font Awesome; its stroke feels more Islamic-compatible than Material Symbols' chunkier grids.

**Substitution flag:** all icons are placeholder Lucide at this stage. When a custom icon set is commissioned, drop SVGs into `assets/icons/` and swap references.

### Brand-specific SVGs
These live in `assets/` and are the only icons that must stay in the brand's hand:
- `logo-mark.svg` — circular mark (mihrab + star + book)
- `logo-horizontal.svg` — mark + Arabic wordmark + English underline
- `star-8point.svg` — 8-point Islamic star (used as bullet, divider, loader)
- `arch-mihrab.svg` — mihrab arch silhouette (used as card frame)
- `pattern-girih.svg` — tileable girih pattern (used as background)

### Unicode
- **۞** (Qur'an ornament) — used as section divider in long-form articles only
- **ﷺ** — after Prophet Muhammad's name, always
- **﴾ ﴿** — Qur'anic quotation marks around verses
- **✸** — 8-point star glyph fallback when SVG unavailable

### What NOT to use
- ❌ Emoji of any kind
- ❌ Crescent moon (☪) — too political in our region
- ❌ Filled color icons
- ❌ Multiple icon styles mixed on the same screen

---

## Using this system

Every HTML file should import the token sheet:

```html
<link rel="stylesheet" href="/colors_and_type.css">
<body dir="rtl" class="theme-dark">…</body>
```

Swap `theme-dark` (default) for `theme-paper` on marketing/registration/reading surfaces.

---

*Built from a brief, ready to iterate. This is v1 — please mark it up.*
