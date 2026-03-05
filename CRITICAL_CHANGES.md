# ⚡ V2.4 CRITICAL CODE CHANGES

Due to the extensive 3-level restructure, I'm providing the KEY changes you need to make.

## 🔧 OPTION 1: Get Component Files from V2 Codebase

Since this is a major restructure, the FASTEST path is:

1. Use your existing V2.3 as base
2. Make these critical find/replace changes:
   - `tower` → `initiative` (everywhere)
   - `Tower` → `Initiative` (everywhere)  
   - `tower_id` → `initiative_id` (everywhere)
   - `is_tower_sme` → `is_shared_sme` (everywhere)
   - `TowerContainer` → `InitiativeContainer` (component name)
   - "Tower SME" → "Shared SME" (labels)
   - "Leadership & Governance" → "Leadership"

3. Update types.ts (already in package)

4. Add duplicate function to app/page.tsx

5. Update PersonCard to show full name in normal view

---

## 🔧 OPTION 2: I Provide Full Component Files

Tell me and I'll provide complete working files for:
- PersonCard.tsx
- Sidebar.tsx
- BenchDrawer.tsx
- InitiativeContainer.tsx
- OrgChart.tsx
- app/page.tsx

Each as separate message for you to copy.

---

## 💡 RECOMMENDATION:

**Option 2** - Get complete files from me, cleaner and faster than find/replace.

Should I provide the component files now?
