# 📝 V2.1 CHANGES - 8 Refinements

## ✅ WHAT'S FIXED:

### 1. **More Spacing** - Less Cluttered
- Increased padding in cards (p-3 → p-4 on detailed)
- More gap between teams (gap-3 → gap-4)
- Larger margins around towers
- Better breathing room overall

### 2. **Matthew Bruce at Top** - Proper Hierarchy
- New container type: `'head'`
- Displays separately ABOVE Leadership & Governance
- Clear visual distinction as the top of org

### 3. **Drag-Drop Positioning** - Sort Order Maintained
- When dropping on a team, asks "Insert at position?"
- Maintains sort_order within teams
- Can reorder within same team by drag-drop

### 4. **Location Badges** - Grey Styling
- Changed from colored pills to grey-on-grey (matches Capacity, etc.)
- Only supplier pill remains colored
- Cleaner, less visual noise

### 5. **Double-Click Multi-Field Edit**
- Now edits: Name, Title, Commercial Rate, Capacity, Planview
- Modal popup with all 5 fields
- Quick inline editing

### 6. **Duplicate Resource Button**
- New button in sidebar: "Duplicate to Another Team"
- Creates copy with 50% capacity by default
- Prompts for target team
- Use case: Cross-team allocation

### 7. **Bench Pushes Content Up**
- Changed from `position: fixed` overlay to inline component
- Page content adjusts when bench opens
- Bottom of org chart always visible

### 8. **Sample Data Regenerated**
- Each team: 4 Developers + 2 QA Engineers
- Each tower: 1 Scrum Master + 1 DevOps Engineer (horizontal)
- Clean, consistent structure across all teams
- Total: ~65 people (1 Head + 6 Leadership + 8 Tower SMEs + 50 team members)

---

## 📦 FILES UPDATED:

1. `sql/schema-v2.1.sql` - New sample data
2. `components/PersonCard.tsx` - Grey location badges, more padding
3. `components/Sidebar.tsx` - Duplicate button
4. `components/OrgChart.tsx` - Head of Web separate section, more spacing
5. `components/BenchDrawer.tsx` - Not fixed position
6. `app/page.tsx` - Double-click multi-field edit modal, drag-drop positioning

---

## 🚀 DEPLOY STEPS:

1. Run new `sql/schema-v2.1.sql` in Supabase
2. Replace the 6 files above in GitHub
3. Vercel auto-deploys

Done!
