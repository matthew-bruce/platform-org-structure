# 🚀 V2 UPDATE - DEPLOYMENT INSTRUCTIONS

## ⚠️ CRITICAL: This is a BREAKING CHANGE

This update completely rebuilds the database schema. You'll lose existing data.

---

## 📋 DEPLOYMENT STEPS

### Step 1: Update Database Schema (5 min)

1. Go to Supabase → SQL Editor
2. Create NEW query
3. Copy **ENTIRE** contents of `sql/schema.sql`
4. Run it (this drops old tables and creates new ones)
5. Verify in Table Editor: you should see `suppliers`, `towers`, `teams`, `people`

### Step 2: Update Code Files in GitHub

Replace these files in your GitHub repo (in order):

**Core Files (Must Update):**
1. `/sql/schema.sql` ← Already done in Step 1
2. `/lib/types.ts` ← NEW types
3. `/app/page.tsx` ← Main page logic updated
4. `/components/PersonCard.tsx` ← New supplier pills
5. `/components/Sidebar.tsx` ← Team dropdown, Planview dropdown

**New Features (Not in v1):**
These files don't exist yet - you need to CREATE them:
6. `/components/BenchDrawer.tsx` ← NEW FILE
7. `/components/TowerSMEBar.tsx` ← NEW FILE  
8. `/components/OrgChartV2.tsx` ← NEW FILE (horizontal layout)

**Then update:**
9. `/app/page.tsx` to import new components

---

## ⚡ QUICK START

I'm providing you with TWO options:

### Option A: Partial files only (schema + critical fixes)
- Get the database working
- Fix supplier pills
- Add Planview dropdown
- Keep existing layout (vertical teams)

### Option B: Full V2 (everything)
- New horizontal layout
- Bench drawer
- Tower SMEs
- All features

**Which do you want?** Tell me and I'll generate the appropriate files.

---

## 🎯 AFTER DEPLOYMENT

1. Visit your Vercel URL
2. You should see:
   - Matthew Bruce as Head of Web
   - 6 people in Leadership & Governance  
   - 7 supplier options (RMG, CAP, TCS, EPAM, NH, HT, Other)
   - Teams with real data

3. Test:
   - Click admin mode (password: admin)
   - Edit someone
   - Change their supplier → see pill color change
   - Change Planview → see it update

---

## 🐛 If Something Breaks

1. Check browser console for errors
2. Check Supabase logs
3. Verify all tables exist
4. Make sure env vars still set in Vercel

Let me know what breaks and I'll fix it!
