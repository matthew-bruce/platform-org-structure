# 🔧 TODO - Royal Mail Org Chart V2.4

## 🚨 CRITICAL - Fix Immediately

### 1. Drag-Drop System ⚠️ HIGH PRIORITY
**Status:** Partially working, needs complete rebuild
**Issues:**
- Visual feedback (red borders, scale) not consistent
- Cannot reliably drag to/from bench
- Reordering within teams broken
- Drop zones not highlighting properly

**Requirements:**
- ✅ Drag people between teams
- ⚠️ Drag people to/from bench (BROKEN)
- ❌ Reorder people within same team (NOT WORKING)
- ✅ Drag to leadership container
- ✅ Head of Web cannot be dragged
- ⚠️ Visual feedback needs improvement

**Files to Fix:**
- `components/OrgChart.tsx` - Main drag-drop logic
- `components/BenchDrawer.tsx` - Bench drop zone
- `app/page.tsx` - State management for drops

**Testing Checklist:**
- [ ] Drag person from Team A to Team B
- [ ] Drag person from Team A to Bench
- [ ] Drag person from Bench to Team A
- [ ] Reorder person within Team A (drag above/below another person)
- [ ] Drag person to Leadership
- [ ] Verify Head of Web cannot be dragged
- [ ] Check all drop zones show red border on hover
- [ ] Check "Drop here" text appears
- [ ] Verify scale animation on teams

---

## 🛠️ IMPORTANT - Implement Soon

### 2. Team Management
**Status:** Not implemented
**Current:** Can only add teams
**Needed:**
- [ ] Edit team name
- [ ] Delete team (move all people to bench with warning)
- [ ] Move team between initiatives
- [ ] Reorder teams within initiative

**Implementation:**
- Add team selection state
- Create team edit modal/sidebar
- Add delete confirmation dialog
- Implement drag-drop for teams

### 3. Bench Drawer Positioning
**Status:** Fixed position removed, may need adjustment
**Current Issue:** May overlay content at bottom
**Needed:**
- [ ] Verify bench pushes content up (not overlays)
- [ ] Add padding to org chart when bench is open
- [ ] Test on different screen sizes

### 4. PersonCard Double-Click Multi-Field Edit
**Status:** Only name editable
**Needed:** Edit all fields in modal on double-click
- [ ] Name
- [ ] Title
- [ ] Commercial Rate (admin only)
- [ ] Capacity
- [ ] Planview

**Implementation:**
- Create modal component
- Populate with person data
- Save all fields on submit

---

## 📋 ENHANCEMENTS - Nice to Have

### 5. Shared SME Styling
**Status:** Working but could match teams better
**Enhancement:**
- Style shared SMEs same as regular teams
- Currently in separate section at bottom

### 6. Search/Filter
**Status:** Not implemented
**Enhancement:**
- Search people by name
- Filter by supplier
- Filter by location
- Filter by team

### 7. Bulk Operations
**Status:** Not implemented
**Enhancement:**
- Select multiple people
- Bulk move to team
- Bulk move to bench
- Bulk edit supplier

### 8. History/Undo
**Status:** Not implemented
**Enhancement:**
- Track changes
- Undo last action
- View history

### 9. Export Improvements
**Status:** Basic JSON export works
**Enhancement:**
- Export to CSV
- Export to Excel
- Export org chart as image
- Print-friendly view

### 10. Mobile Optimization
**Status:** Responsive but could be better
**Enhancement:**
- Better touch drag-drop
- Simplified mobile view
- Swipe gestures

---

## 🐛 BUGS - Known Issues

### Current Bugs
1. **Drag-drop visual feedback inconsistent**
   - Red borders sometimes don't show
   - Scale animation flickers
   - Drop zones not clear

2. **PersonCard in compact view**
   - Initials circle too small on mobile
   - Text truncation aggressive

3. **Sidebar scrolling**
   - Long team lists overflow without scroll

4. **Leadership container**
   - Cannot drag people OUT of leadership
   - Should support drag-to-bench

---

## 📊 TESTING NEEDED

### Manual Test Scenarios
- [ ] Add new person
- [ ] Edit person in sidebar
- [ ] Delete person
- [ ] Duplicate person (check capacity split)
- [ ] Drag person between teams
- [ ] Drag person to bench
- [ ] Drag person from bench
- [ ] Add new team
- [ ] Switch between zoom levels
- [ ] Test on mobile device
- [ ] Test on tablet
- [ ] Test admin mode
- [ ] Export data
- [ ] Refresh page (state persistence)

### Browser Compatibility
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Safari
- [ ] Mobile Chrome

---

## 🚀 DEPLOYMENT CHECKLIST

Before each deployment:
- [ ] All TypeScript errors resolved
- [ ] Build succeeds locally (if testing)
- [ ] No console errors in browser
- [ ] All drag-drop scenarios tested
- [ ] Mobile responsive verified
- [ ] Admin mode tested
- [ ] Export function works
- [ ] Supabase connection working

After deployment:
- [ ] Check Vercel build logs
- [ ] Test on live URL
- [ ] Verify data loads correctly
- [ ] Test drag-drop on production
- [ ] Check mobile responsiveness

---

## 💡 FUTURE FEATURES

### Phase 2
- [ ] Real authentication (replace "admin" password)
- [ ] Role-based permissions
- [ ] User profiles
- [ ] Activity log
- [ ] Email notifications on changes

### Phase 3
- [ ] Capacity planning dashboard
- [ ] Resource utilization charts
- [ ] Cost tracking
- [ ] Forecast modeling
- [ ] Integration with HR systems

### Phase 4
- [ ] AI-powered resource recommendations
- [ ] Automated capacity alerts
- [ ] Team performance metrics
- [ ] Custom reporting builder

---

## 📝 NOTES

### Development Workflow
1. Edit in GitHub web editor
2. Commit to main
3. Vercel auto-deploys
4. Test on live URL
5. Iterate

### Common Issues
- **Build fails:** Check TypeScript errors, missing imports
- **Drag-drop broken:** Check event handlers, state management
- **Data not loading:** Check Supabase connection, RLS policies
- **Styling issues:** Check Tailwind classes, custom CSS

### Getting Help
When asking for help, provide:
1. What you're trying to do
2. What's happening instead
3. Error messages (if any)
4. Which file you're editing
5. Browser console errors
