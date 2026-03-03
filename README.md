# Royal Mail - Technology Platform Engineering Org Chart

A Next.js 14 application for managing and visualizing the Royal Mail Technology Platform Engineering organizational structure.

## Features

- ✅ Interactive org chart with 3 zoom levels (Compact/Normal/Detailed)
- ✅ Drag & drop people between teams
- ✅ Admin mode to protect sensitive data (Commercial Rate, Planview)
- ✅ Real-time database persistence with Supabase
- ✅ Royal Mail branded styling
- ✅ Export org data to JSON
- ✅ 60+ team members pre-seeded

## Quick Start (15 minutes to deploy)

### Step 1: Create Supabase Project (3 minutes)

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" → Sign in with GitHub
3. Click "New Project"
4. Fill in:
   - Name: `royal-mail-org`
   - Database Password: (generate a strong one - save it!)
   - Region: Choose closest to you
5. Click "Create new project" (takes ~2 minutes)

### Step 2: Set Up Database (2 minutes)

1. In your Supabase project, click "SQL Editor" in left sidebar
2. Click "New Query"
3. Copy the ENTIRE contents of `sql/schema.sql` from this project
4. Paste into the SQL editor
5. Click "Run" (bottom right)
6. You should see "Success. No rows returned" - that's correct!

### Step 3: Get API Keys (1 minute)

1. In Supabase, click "Settings" (gear icon) → "API"
2. Copy these two values:
   - **Project URL** (looks like: `https://xxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)
3. Keep them handy!

### Step 4: Set Up Project Locally (5 minutes)

```bash
# Clone or download this project
cd royal-mail-org

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Edit .env.local and add your Supabase credentials:
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-key-here

# Run locally
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) - you should see the org chart!

### Step 5: Deploy to Vercel (5 minutes)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/royal-mail-org.git
git push -u origin main
```

2. Go to [https://vercel.com](https://vercel.com)
3. Click "Add New" → "Project"
4. Import your GitHub repo
5. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase key
6. Click "Deploy"

Done! You'll get a live URL like `https://royal-mail-org.vercel.app`

## Usage

### Admin Mode
- Click "🔒 Admin Mode" in header
- Enter password: `admin`
- Now you can see/edit Commercial Rate and Planview fields

### Adding People
- Click "+ Add Person" button
- Edit details in sidebar
- Drag cards between teams

### Zoom Levels
- **Compact**: Team names only (small screens)
- **Normal**: Team names + titles + supplier badges (default)
- **Detailed**: Full info including location, capacity, rates

## Project Structure

```
royal-mail-org/
├── app/
│   ├── page.tsx              # Main page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── OrgChart.tsx          # Main org chart component
│   ├── PersonCard.tsx        # Individual person cards
│   ├── Sidebar.tsx           # Edit sidebar
│   └── AdminMode.tsx         # Admin mode toggle
├── lib/
│   ├── supabase.ts           # Database client
│   └── types.ts              # TypeScript types
├── sql/
│   └── schema.sql            # Database schema + seed data
└── package.json              # Dependencies
```

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS (Royal Mail brand colors)
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (free tier)

## Database Schema

**Table: people**
- `id`: UUID (primary key)
- `name`: Text
- `title`: Text (role/job title)
- `container`: Enum (leadership, sme, strategic-business, etc.)
- `supplier`: Enum (rmg, epam)
- `location`: Enum (onshore, nearshore, offshore)
- `capacity`: Integer (0-100%)
- `commercial_rate`: Integer (£/day) - admin only
- `planview`: Enum (BAU, F_GOV, PR) - admin only
- `team`: Text (team name)
- `color`: Text (hex color)
- `created_at`, `updated_at`: Timestamps

## Troubleshooting

**"Invalid API key"**
- Check your `.env.local` file has correct Supabase URL and key
- Restart dev server: `npm run dev`

**"No data showing"**
- Check SQL schema ran successfully in Supabase
- Look in Supabase → "Table Editor" → "people" - should see 60+ rows

**"Can't edit/add people"**
- Check browser console for errors
- Verify Supabase RLS policies allow operations (schema.sql sets this up)

## Future Enhancements

- Azure AD authentication
- Export to Mermaid diagrams
- Import from Excel/CSV
- Team cost calculations
- Org chart history/versions
- Mobile responsive improvements

## Support

Created for Royal Mail Group Technology Platform Engineering.

Password for admin mode: `admin` (change in `components/AdminMode.tsx`)
