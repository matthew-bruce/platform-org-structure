# Royal Mail Technology Platform Engineering - Org Chart Application

## 🎯 Purpose

Interactive organizational chart for Royal Mail Group Technology Platform Engineering team to visualize team structure, resource allocation, and platform landscape.

## 📊 Current Status: V2.4 (In Progress)

**Last Successful Build:** V2.4 with 3-level structure
**Deployment:** Vercel (auto-deploy from GitHub main branch)
**Database:** Supabase PostgreSQL
**Framework:** Next.js 14, TypeScript, Tailwind CSS

---

## 🏗️ Architecture

### 3-Level Organizational Structure

**L3 - Platforms (Highest)**
- Strategic Platform (Azure Cloud) - Blue
- Legacy Platform (Ensono Data Center) - Purple

**L2 - Initiatives (Middle)**
- Technology Transformation
- Strategic Demand
- Care & Maintenance
- Legacy Demand
- Ensono Exit

**L1 - Teams (Lowest)**
- Cygnus, Cosmos, Nebula, Helios, Janus, Orion
- Each team has 4 Developers + 2 QA Engineers

### Special Containers

**Head of Web**
- Matthew Bruce (top of hierarchy, not draggable)
- Separate from all other structures

**Leadership**
- 6 people: Selen Hamilton, Mike James, Ajmal Malik, Justin Fox, Anjusmita Choudhury, Grant Bramley
- Orange container below Head of Web

**Shared SMEs**
- Support multiple teams within an initiative
- Scrum Masters + DevOps Engineers
- Displayed at bottom of each initiative

**Bench**
- Unassigned resources
- Collapsible drawer at bottom
- Drag/drop to/from teams

---

## 🎨 Key Features

### ✅ Working Features
1. **3 Zoom Levels:** Compact, Normal, Detailed
2. **Supplier Pills:** 7 suppliers with brand colors (RMG, CAP, TCS, EPAM, NH, HT, Other)
3. **Admin Mode:** Password-protected (password: "admin")
4. **Export Data:** Download JSON snapshot
5. **Add/Edit/Delete People:** Full CRUD operations
6. **Duplicate Resource:** Split capacity 50/50 in same team
7. **Team Dropdown:** Select teams from list (not free text)
8. **Planview Options:** PR (default), F_GOV, BAU
9. **Visual Hierarchy:** Color-coded platforms and initiatives

### 🚧 In Progress / Issues
1. **Drag-Drop:** Partially working
   - ✅ Move between teams
   - ✅ Visual feedback (red borders, scale effects)
   - ⚠️ To/from bench needs fixing
   - ⚠️ Reordering within teams needs work
   - ❌ Visual feedback not consistent
2. **Bench Drawer:** Fixed positioning removed but may need adjustment
3. **Team Management:** Add teams works, edit/delete not implemented

---

## 💾 Database Schema

### Tables

**suppliers**
- 7 suppliers with colors and abbreviations

**platforms**
- Strategic / Legacy with colors

**initiatives**
- Links to platform_id
- Contains teams

**teams**
- Links to initiative_id
- Has supplier assignment

**people**
- Links to team_id and initiative_id
- Fields: name, title, container, supplier, location, capacity, commercial_rate, planview
- is_shared_sme flag for horizontal SMEs
- sort_order for positioning

---

## 🎨 Design System

### Colors (Tailwind Extensions)

```javascript
colors: {
  'rm-red': '#DA202A',        // Primary brand
  'rm-blue': '#0079D2',       // Strategic
  'rm-magenta': '#991E5A',    // Legacy
  'rm-orange': '#F36C39',     // Leadership
  'rm-dark-grey': '#6C6C6C',
  'rm-light-grey': '#DCDCDE',
  'rm-bg-grey': '#F5F5F5',
  'rm-black': '#1A1A1A'
}
```

### Supplier Colors

- RMG: #DA202A (red)
- CAP: #0070AD (royal blue)
- TCS: #4D2C91 (purple)
- EPAM: #00A3E0 (cyan)
- NH: #003B5C (navy)
- HT: #FFD700 (yellow)
- Other: #6C6C6C (grey)

---

## 🔧 Tech Stack

**Frontend:**
- Next.js 14.2.18
- React 18
- TypeScript
- Tailwind CSS

**Backend:**
- Supabase (PostgreSQL)
- Row Level Security enabled

**Deployment:**
- Vercel (auto-deploy on push to main)
- GitHub: matthew-bruce/platform-org-structure

**Development:**
- No local environment (admin restrictions)
- Edit via GitHub web editor or github.dev
- Deploy directly to production

---

## 📁 File Structure

```
platform-org-structure/
├── app/
│   ├── page.tsx                 # Main app component
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── PersonCard.tsx           # Individual person card
│   ├── Sidebar.tsx              # Edit panel (left)
│   ├── OrgChart.tsx             # Main org chart display
│   ├── BenchDrawer.tsx          # Bench at bottom
│   ├── AdminMode.tsx            # Admin toggle
│   └── InitiativeContainer.tsx  # (future - not created yet)
├── lib/
│   ├── types.ts                 # TypeScript definitions
│   └── supabase.ts              # Supabase client
├── sql/
│   └── schema-v2.4-FIXED.sql   # Latest DB schema
└── [config files]
```

---

## 🚀 Deployment Process

1. Edit files in GitHub web editor
2. Commit to main branch
3. Vercel auto-builds and deploys (~90 seconds)
4. Check build logs at Vercel dashboard
5. Test on live URL

**No local development required** - entire workflow is cloud-based.

---

## 🎯 User Goals

**Primary Users:** Royal Mail Technology Platform Engineering team
**Use Cases:**
1. Visualize team structure and reporting lines
2. Track resource allocation across initiatives
3. Identify bench capacity
4. Plan resource movements
5. Export data for reporting

**Admin Users:**
- Can see commercial rates
- Can manage all resources
- Password: "admin"

---

## 📊 Data Integrity Rules

1. **Head of Web** cannot be moved or deleted
2. **Leadership** is separate container, not part of L1/L2/L3
3. **Bench** is for unassigned resources only
4. **Shared SMEs** support entire initiative (not individual teams)
5. **Duplicate** creates copy in same team, splits capacity 50/50
6. **Planview** defaults to PR for new people
7. **Capacity** is percentage (0-100)
8. **Sort order** maintains visual positioning

---

## 🔐 Access & Security

**Public Access:** View-only (no auth required)
**Admin Access:** Password-protected ("admin")
**Database:** Supabase RLS policies allow all operations (public app)

**Future Enhancement:** Proper authentication with role-based access control

---

## 📈 Success Metrics

1. ✅ Deploys without errors
2. ✅ All 60+ people visible
3. ✅ Drag-drop works smoothly
4. ✅ Mobile responsive
5. ⚠️ Visual feedback clear and consistent
6. ❌ Team management fully functional

---

## 🎨 Brand Guidelines

**Royal Mail Logo:** SVG with crown, red/gold colors
**Typography:** System fonts (Arial, sans-serif)
**Spacing:** Generous padding for readability
**Mobile:** Responsive grid, horizontal scroll for teams

**Never:**
- Use Comic Sans or unprofessional fonts
- Mix brand colors incorrectly
- Make UI cluttered or overwhelming
