# Platform Org Structure — Claude Code Instructions

> Read this before touching any code.

---

## What This App Is

A visual organisational structure tool for RMG's Platform & Build function. It allows the team to view, manage, and present the platform org structure in a clean, interactive format — replacing static PowerPoint org charts with a live, maintainable alternative.

**Live URL:** https://platform-org-structure.vercel.app \
**Status:** In Progress — drag/drop is working, approaching PoC completion \
**Stack:** React (Vite), [Supabase / localStorage], Vercel

---

## Golden Rules

### 1. Always write unit tests
Every new component, hook, utility function, or data access function must have a unit test. Use Vitest. Tests live in `__tests__/` adjacent to the file they test. Do not ship untested code.

### 2. CRUD is always a requirement
If a user can **create** something, they can also **edit** and **delete** it. No exceptions. If you build an add form, you also build the edit form and delete confirmation. Always.

### 3. Confirm before destructive actions
Any delete must show a confirmation prompt. No silent deletes.

### 4. Dates in UK format
All user-facing dates in `en-GB` format: `24 Mar 2026`. Never ISO strings in the UI.

### 5. No hardcoded credentials
Secrets go in `.env.local` only. Never in source code.

### 6. Drag and drop is a core interaction
The ability to drag and drop people and teams within the org structure is a primary feature. Do not break it. Test drag/drop behaviour explicitly after any structural changes.

### 7. Keep components focused
Files under 300 lines where possible. If a component is doing too much, split it.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| Drag & Drop | [library in use — e.g. dnd-kit, react-beautiful-dnd] |
| Data | [Supabase / localStorage] |
| Deployment | Vercel (auto-deploys from main branch) |
| Testing | Vitest |

---

## Key Features

- Visual org chart with drag-and-drop repositioning
- Add / edit / remove people and teams
- Presentable in full-screen view
- Exportable or shareable

---

## What Not to Do

- Do not break drag/drop when refactoring layout components
- Do not hard delete records — soft delete only
- Do not hardcode credentials
- Do not build create without edit and delete
- Do not skip tests

---

## Current Focus

Last session: [Date] — [What was done]
Next session: [What needs doing next]

---

*Last updated: 25 March 2026*
