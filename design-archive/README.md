# Design Archive

This folder contains the original HTML prototypes and design system created during the design phase. These files serve as:

1. **Design reference** — pixel-perfect prototypes of every screen and state
2. **AI context** — point Claude or other AI tools at this folder for design fidelity
3. **Component spec** — each `.jsx` file maps to production React components

## How to use with AI tools

When working with Claude Code, Cursor, or other AI coding assistants:

```
# In your CLAUDE.md or system prompt, reference:
Design system tokens: design-archive/colors_and_type.css
App shell layout: design-archive/app-shell.css
Public site prototypes: design-archive/public/
App dashboard prototypes: design-archive/apps/
Component kit: design-archive/kits/

# When asking AI to implement a page:
"Implement the teacher attendance tab exactly as shown in 
design-archive/apps/teacher-tabs.jsx (TeacherAttendanceTab function).
Use the production components from src/components/."
```

## File map

```
design-archive/
├── colors_and_type.css          ← All design tokens (mint green theme)
├── app-shell.css                ← Responsive layout system
├── public/
│   ├── index.html               ← Homepage prototype
│   ├── about.html               ← About page
│   ├── programs.html            ← Programs (tabbed)
│   ├── news.html                ← News (filterable)
│   ├── contact.html             ← Contact form
│   ├── shared.jsx               ← Nav, footer, shared components
│   └── home-sections.jsx        ← Homepage section components
├── apps/
│   ├── shared.jsx               ← App shell, card, chip, btn, stat
│   ├── manager.html + manager-tabs.jsx   ← 6-tab manager dashboard
│   ├── teacher.html + teacher-tabs.jsx   ← 6-tab teacher portal
│   ├── student.html + student-tabs.jsx   ← 5-tab student portal
│   └── parent.html + parent-tabs.jsx     ← 5-tab parent portal
├── kits/                        ← Design canvas previews
├── assets/                      ← Logo SVGs, patterns, photos
└── README.md                    ← This file
```

## Key design decisions
- **Theme:** Mint Garden (green-led light theme)
- **Primary accent:** #2D9269 (mint green)
- **Brass accent:** #B8923A (warm highlights, eyebrows)
- **Typography:** Reem Kufi (display), Tajawal (body), Amiri (Quranic)
- **Direction:** RTL-first, with EN toggle
- **Layout:** Side rail (desktop) → top bar (tablet) → bottom tabs (mobile)
