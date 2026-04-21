---
name: almohajirin-ansar-design
description: Use this skill to generate well-branded interfaces and assets for Almohajirin wel Ansar, an Islamic educational institution (madrasa) in Israel, either for production or throwaway prototypes/mocks. Contains design guidelines, colors, typography, fonts, assets, and UI kit components for Arabic-first (RTL), mobile-responsive interfaces with Islamic geometric motifs.
user-invocable: true
---

Read the `README.md` file within this skill and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc.), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick facts
- Arabic is primary (RTL); English is always secondary
- Dark palette (#0E0E0E) + single gold accent (#E8C76B) + parchment light surface (#FBF7EC)
- Typography: Reem Kufi (display), Tajawal (body), Amiri (Qur'an/sacred), Inter (Latin body)
- No emoji, no crescent moon, no gradients, no glassmorphism
- Motifs: girih patterns, 8-point stars, mihrab arches
- Mobile-first; all five apps (public site + manager + teacher + student + parent) are responsive

## Files
- `README.md` — full guidelines (content, visual, iconography)
- `colors_and_type.css` — all CSS tokens + base typography classes
- `fonts/` — font notes (Google Fonts loaded via CSS @import)
- `assets/` — logo marks, girih patterns, mihrab, 8-point star
- `preview/` — design-system cards
- `ui_kits/` — per-product UI kits: `public/`, `manager/`, `teacher/`, `student/`, `parent/`
