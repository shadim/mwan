# Manager · Teacher · Student · Parent apps

Four mobile-first operational apps for Almohajirin wel Ansar, each with bottom navigation and RTL layout. All share `app-shell.css` (which imports the root `colors_and_type.css`) for common primitives: top bar, bottom nav, cards, row items, hero card, chips, attendance rows, FAB.

## Manager
`manager/index.html` — home (KPIs, alerts, activity) · students · campaigns · settings. Minimal v1; designed to extend.

## Teacher
`teacher/index.html` — today's classes, **attendance** (three-state toggle per student: present / late / absent), profile. The attendance screen is the primary surface.

## Student
`student/index.html` — Qur'anic verse of the day, today's schedule, homework, weekly schedule, Qur'an memorization progress, profile.

## Parent
`parent/index.html` — child switcher (multi-child), live status, messages (teachers + admin), fees/donations, settings.

## Shared conventions
- Width caps at 420px; on desktop sits in a rounded bordered "phone" frame
- Top bar: greeting + user name + avatar
- Bottom nav: 3–4 items, icon + label, active = gold
- Honoured address everywhere (الأهل الكرام, الأستاذة, حضرتكم)
- No emoji; icons are Lucide-style stroked SVG inline
