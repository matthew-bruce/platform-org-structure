# 🚀 Royal Mail Org Chart - Major Update Guide

## ⚠️ IMPORTANT: Backup First!
Before making these changes, create a new branch in GitHub:
1. Go to your repo
2. Click "main" dropdown
3. Type "v2-update" and create branch
4. Make all changes on this branch
5. Test on Vercel preview URL
6. Merge to main when ready

---

## 📋 Files to Update (in order)

### 1. `sql/schema.sql` - NEW DATABASE SCHEMA

**ACTION: REPLACE ENTIRE FILE**

This adds towers, teams table, supplier configs, and updated people structure.

**CRITICAL**: After updating this file, you need to run the new SQL in Supabase:
1. Supabase → SQL Editor → New Query
2. First run: `DROP TABLE IF EXISTS people CASCADE;`
3. Then paste and run the new schema below

---

### 2. `lib/types.ts` - UPDATED TYPES

**ACTION: REPLACE ENTIRE FILE**

New types for towers, teams, suppliers, and bench.

---

### 3. `lib/supabase.ts` - NO CHANGES

Keep as-is.

---

### 4. `components/PersonCard.tsx` - UPDATED CARD

**ACTION: REPLACE ENTIRE FILE**

- Double-click to edit in-place
- New supplier pills (7 suppliers with colors)
- Cleaner compact mode

---

### 5. `components/Sidebar.tsx` - UPDATED SIDEBAR

**ACTION: REPLACE ENTIRE FILE**

- Team dropdown (not free text)
- Planview dropdown with PR default
- All 7 suppliers
- Tower selection

---

### 6. `components/AdminMode.tsx` - NO CHANGES

Keep as-is.

---

### 7. `components/OrgChart.tsx` - COMPLETE REBUILD

**ACTION: REPLACE ENTIRE FILE**

This is the biggest change:
- Horizontal L1 team layout
- L2 towers with color themes
- Horizontal SMEs at bottom of towers
- Bench drawer at bottom
- Improved drag-drop
- Quick "+" buttons

---

### 8. `app/page.tsx` - UPDATED MAIN PAGE

**ACTION: REPLACE ENTIRE FILE**

- Fetches towers, teams, suppliers
- Manages bench drawer state
- Admin mode for managing teams/towers/suppliers

---

### 9. `app/globals.css` - MINOR UPDATES

**ACTION: ADD TO BOTTOM OF FILE**

Additional styles for horizontal layout and bench drawer.

---

### 10. NEW FILE: `components/BenchDrawer.tsx`

**ACTION: CREATE NEW FILE**

Drawer component for unassigned resources.

---

### 11. NEW FILE: `components/AdminPanel.tsx`

**ACTION: CREATE NEW FILE**

Admin panel for managing teams, towers, and suppliers.

---

## 🎯 Implementation Strategy

Given the size of these changes, here's the safest approach:

### Option A: I Provide Full Files (RECOMMENDED)
I'll create each file in full, you copy-paste into GitHub one by one.

### Option B: Step-by-Step Patches
I show you exactly what to change in each file (slower but more controlled).

### Option C: New Complete Project
I generate a fresh complete v2 project as a new tar.gz.

---

## 🤔 Which Do You Prefer?

Let me know and I'll proceed! Given your timeline ("do this tonight"), I recommend **Option A** - I'll give you complete files to replace, starting with the most critical ones.

Sound good?
