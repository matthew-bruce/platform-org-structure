# 🚀 DEPLOY V2 - COMPLETE INSTRUCTIONS

## ✅ YOU HAVE EVERYTHING!

All components are built. Follow these steps to deploy.

---

## 📋 STEP-BY-STEP DEPLOYMENT

### 1. UPDATE DATABASE (5 min) - DO THIS FIRST!

1. Open Supabase → SQL Editor
2. Create New Query
3. Copy **ENTIRE** contents of `sql/schema.sql`
4. Run it
5. **Verify:** Go to Table Editor, you should see:
   - `suppliers` table (7 rows)
   - `towers` table (4 rows)
   - `teams` table (~10 rows)
   - `people` table (~20+ rows with Matthew Bruce, etc.)

⚠️ **This drops your old tables!** Existing data will be lost.

---

### 2. UPDATE FILES IN GITHUB (15 min)

Replace/create these files in your `platform-org-structure` repo:

**Core Files (REPLACE):**
- `sql/schema.sql` ✅ (already done in Step 1)
- `lib/types.ts` ✅ NEW
- `lib/supabase.ts` (no changes, keep existing)

**Components (REPLACE ALL):**
- `components/PersonCard.tsx` ✅ NEW
- `components/Sidebar.tsx` ✅ NEW
- `components/OrgChart.tsx` ✅ NEW
- `components/AdminMode.tsx` ✅ NEW

**New Components (CREATE):**
- `components/BenchDrawer.tsx` ✅ NEW FILE
- `components/TowerContainer.tsx` ✅ NEW FILE

**App Files (REPLACE):**
- `app/page.tsx` ✅ NEW
- `app/layout.tsx` ✅ NEW
- `app/globals.css` ✅ NEW

**Config (keep existing unless you want to update):**
- `package.json`
- `tsconfig.json`
- `tailwind.config.ts`
- `next.config.js`
- `postcss.config.js`

---

### 3. DEPLOY TO VERCEL (Auto - 2 min)

After you push to GitHub:
1. Vercel will auto-detect changes
2. Auto-deploy (~90 seconds)
3. Visit your URL

---

## 🎯 WHAT YOU'LL SEE

After deployment, you should see:

✅ **Leadership & Governance** (orange bar at top)
- Matthew Bruce (Head of Web)
- Selen Hamilton, Mike James, Ajmal Malik, Justin Fox, Anjusmita Choudhury, Grant Bramley

✅ **Strategic Platform** (blue towers)
- Business tower with 4 product teams (Customer Experience, Logistics, Enterprise, Digital Innovation)
- Technology tower with 3 platform teams (Core Web, Cloud Infrastructure, Data Platform)
- Teams displayed **horizontally** (scroll sideways)
- Tower SMEs at bottom of Technology tower

✅ **Legacy Platform** (purple towers)
- Business tower with Legacy Business Apps
- Technology tower with Mainframe Services, Legacy Integration

✅ **Bench Drawer** (bottom of screen)
- Click to expand/collapse
- Shows unassigned people
- Drag people from bench to teams

✅ **New Features**
- 7 supplier pills (RMG=red, CAP=blue, TCS=purple, EPAM=cyan, NH=navy, HT=yellow, Other=grey)
- Team dropdown (not free text)
- Planview dropdown (PR, F_GOV, BAU)
- Double-click person to quick-edit name
- Click "+ Team" button to add teams to towers
- Horizontal team scroll within towers

---

## 🐛 TROUBLESHOOTING

**"Cannot read property of undefined"**
→ Make sure you ran the SQL schema first!

**"Empty org chart"**
→ Check Supabase Table Editor - do you see data in `people` table?

**"Supplier dropdown empty"**
→ Check `suppliers` table has 7 rows

**"Teams not showing"**
→ Check `teams` table has data and `tower_id` matches a row in `towers` table

**"Vercel build fails"**
→ Check all imports in files match exact filenames (case-sensitive!)

---

## 📞 NEXT STEPS

After it's deployed:

1. Test drag-and-drop between teams
2. Test bench drawer
3. Test admin mode (password: `admin`)
4. Add real people to teams
5. Adjust tower names/colors as needed

Come back and tell me what you need next!

---

## 🎉 YOU'RE READY!

All files are in the package. Copy them to GitHub and deploy!
