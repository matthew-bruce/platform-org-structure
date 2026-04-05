# 🚀 Quick Start Guide - Royal Mail Org Chart

## For Continuing in New Chat

**Copy this into your first message:**

```
I'm continuing work on the Royal Mail Org Chart app. Here's the context:

**Current Status:**
- Version: V2.4
- Deploys successfully to Vercel
- Database: Supabase with 3-level structure (Platforms > Initiatives > Teams)
- Main issue: Drag-drop needs fixing

**What I Need Help With:**
[State your specific issue or goal here]

**Files I'm Working On:**
[List the files you're editing]

**Error Messages (if any):**
[Paste any errors from Vercel or browser console]

Please review the project docs I have for full context.
```

---

## Architecture Overview (Quick Reference)

### Database Structure
```
suppliers (7 suppliers with colors)
  ↓
platforms (L3: Strategic, Legacy)
  ↓
initiatives (L2: 5 initiatives)
  ↓
teams (L1: Cygnus, Cosmos, Nebula, Helios, Janus, Orion)
  ↓
people (60+ resources)
```

### Special Containers
- **head:** Matthew Bruce (top, not draggable)
- **leadership:** 6 people (orange box)
- **shared_sme:** Support roles per initiative
- **bench:** Unassigned resources
- **team:** Regular team members

---

## Key Files (Quick Reference)

### Core Application
- `app/page.tsx` - Main app, state management, API calls
- `components/OrgChart.tsx` - Rendering, drag-drop logic
- `lib/types.ts` - TypeScript types

### Components
- `PersonCard.tsx` - Individual person card
- `Sidebar.tsx` - Edit panel (left side)
- `BenchDrawer.tsx` - Bench at bottom
- `AdminMode.tsx` - Admin toggle

### Database
- `sql/schema-v2.4-FIXED.sql` - Latest schema

---

## Common Commands

### GitHub Workflow
```bash
# Make changes in GitHub web editor
# Commit to main branch
# Vercel auto-deploys in ~90 seconds
# Check: https://vercel.com/dashboard
```

### Testing Checklist
- [ ] Builds without errors
- [ ] No TypeScript errors
- [ ] Drag-drop works
- [ ] All people render
- [ ] Mobile responsive

---

## Critical Context for AI

### What Works
✅ Database schema
✅ Basic CRUD operations
✅ Add/edit/delete people
✅ Duplicate person
✅ 3 zoom levels
✅ Supplier pills with colors
✅ Admin mode

### What's Broken
❌ Drag-drop to/from bench
❌ Reordering within teams
❌ Inconsistent visual feedback
❌ Team management (edit/delete)

### What Matthew Wants
1. **Silky smooth drag-drop** - Top priority
2. Move people anywhere with mouse
3. Clear visual feedback (red borders, etc.)
4. Bench drawer that doesn't overlay content
5. Team management features

---

## File Locations

**GitHub Repo:** matthew-bruce/platform-org-structure
**Live URL:** [Vercel deployment URL]
**Database:** Supabase dashboard

**Key Directories:**
```
/app          - Next.js app files
/components   - React components
/lib          - Types, utilities
/sql          - Database schemas
```

---

## Debugging Tips

### Build Fails
1. Check Vercel logs
2. Look for TypeScript errors
3. Check imports/exports
4. Verify all files copied completely

### Drag-Drop Issues
1. Check state management in OrgChart.tsx
2. Verify event handlers
3. Test drop zones individually
4. Check browser console for errors

### Data Not Loading
1. Check Supabase connection
2. Verify RLS policies
3. Check table names (initiatives not towers)
4. Verify foreign key relationships

---

## When Stuck

### Provide This Info
1. What you're trying to do
2. What's happening instead
3. Error messages (Vercel, console)
4. Which file you're editing
5. What you've tried

### Common Issues
- **"Module not found"** → Check import paths
- **"Type error"** → Check types.ts exports
- **"Build failed"** → Check syntax, brackets
- **"Drag not working"** → Check event handlers

---

## Success Metrics

**V2.4 Complete When:**
- Drag-drop works everywhere
- Visual feedback is clear
- No console errors
- Works on mobile
- All 60+ people render

---

## Next Session Priorities

1. **Fix drag-drop** (highest priority)
2. Implement team management
3. Polish UI/UX
4. Add search/filter
5. Mobile optimization

---

## Important Constraints

- No local dev environment
- Deploy directly to production
- Use GitHub web editor only
- Vercel auto-builds on push
- Can't run npm locally

---

## Brand Colors (For Reference)

```javascript
'rm-red': '#DA202A'      // Primary
'rm-blue': '#0079D2'     // Strategic
'rm-magenta': '#991E5A'  // Legacy
'rm-orange': '#F36C39'   // Leadership
```

**Suppliers:**
- RMG: #DA202A, CAP: #0070AD, TCS: #4D2C91
- EPAM: #00A3E0, NH: #003B5C, HT: #FFD700, Other: #6C6C6C

---

**Ready to continue? Start a new chat with the context template above!**
