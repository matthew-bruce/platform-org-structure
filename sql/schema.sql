-- Royal Mail Org Chart V2 - Enhanced Schema

-- Drop existing tables
DROP TABLE IF EXISTS people CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS towers CASCADE;
DROP TABLE IF EXISTS suppliers CASCADE;

-- Create suppliers table
CREATE TABLE suppliers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  abbreviation TEXT NOT NULL,
  color TEXT NOT NULL,
  logo_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create towers table (L2 containers)
CREATE TABLE towers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('strategic', 'legacy')),
  color TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create teams table (L1 teams)
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tower_id UUID REFERENCES towers(id) ON DELETE CASCADE,
  supplier TEXT REFERENCES suppliers(id),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create people table
CREATE TABLE people (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  container TEXT NOT NULL DEFAULT 'bench',
  supplier TEXT NOT NULL REFERENCES suppliers(id),
  location TEXT NOT NULL CHECK (location IN ('onshore', 'nearshore', 'offshore')),
  capacity INTEGER NOT NULL DEFAULT 100 CHECK (capacity >= 0 AND capacity <= 100),
  commercial_rate INTEGER NOT NULL DEFAULT 0,
  planview TEXT NOT NULL CHECK (planview IN ('BAU', 'F_GOV', 'PR')) DEFAULT 'PR',
  team_id UUID REFERENCES teams(id) ON DELETE SET NULL,
  tower_id UUID REFERENCES towers(id) ON DELETE SET NULL,
  is_tower_sme BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  color TEXT NOT NULL DEFAULT '#DA202A',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indices
CREATE INDEX idx_people_container ON people(container);
CREATE INDEX idx_people_team_id ON people(team_id);
CREATE INDEX idx_people_tower_id ON people(tower_id);
CREATE INDEX idx_teams_tower_id ON teams(tower_id);

-- Enable RLS
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE towers ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE people ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow all operations" ON suppliers FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON towers FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON teams FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON people FOR ALL USING (true);

-- Seed suppliers
INSERT INTO suppliers (id, name, abbreviation, color, sort_order) VALUES
('rmg', 'Royal Mail Group', 'RMG', '#DA202A', 1),
('cap', 'Capgemini', 'CAP', '#0070AD', 2),
('tcs', 'Tata Consultancy Services', 'TCS', '#4D2C91', 3),
('epam', 'EPAM Systems', 'EPAM', '#00A3E0', 4),
('nh', 'North Highland', 'NH', '#003B5C', 5),
('ht', 'Happy Team', 'HT', '#FFD700', 6),
('other', 'Other', 'Other', '#6C6C6C', 7);

-- Seed towers (L2 containers)
INSERT INTO towers (id, name, platform, color, sort_order) VALUES
('11111111-1111-1111-1111-111111111111', 'Business', 'strategic', '#0079D2', 1),
('22222222-2222-2222-2222-222222222222', 'Technology', 'strategic', '#0095D9', 2),
('33333333-3333-3333-3333-333333333333', 'Business', 'legacy', '#991E5A', 1),
('44444444-4444-4444-4444-444444444444', 'Technology', 'legacy', '#B8206A', 2);

-- Seed teams (L1 teams)
INSERT INTO teams (id, name, tower_id, supplier, sort_order) VALUES
-- Strategic Business teams
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Customer Experience', '11111111-1111-1111-1111-111111111111', 'epam', 1),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Logistics & Delivery', '11111111-1111-1111-1111-111111111111', 'epam', 2),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Enterprise Solutions', '11111111-1111-1111-1111-111111111111', 'epam', 3),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Digital Innovation', '11111111-1111-1111-1111-111111111111', 'epam', 4),

-- Strategic Technology teams
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Core Web Platform', '22222222-2222-2222-2222-222222222222', 'epam', 1),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Cloud Infrastructure', '22222222-2222-2222-2222-222222222222', 'epam', 2),
('10101010-1010-1010-1010-101010101010', 'Data Platform', '22222222-2222-2222-2222-222222222222', 'epam', 3),

-- Legacy Business teams
('20202020-2020-2020-2020-202020202020', 'Legacy Business Apps', '33333333-3333-3333-3333-333333333333', 'epam', 1),

-- Legacy Technology teams
('30303030-3030-3030-3030-303030303030', 'Mainframe Services', '44444444-4444-4444-4444-444444444444', 'epam', 1),
('40404040-4040-4040-4040-404040404040', 'Legacy Integration', '44444444-4444-4444-4444-444444444444', 'epam', 2);

-- Seed people - Leadership & Governance (container='leadership')
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, tower_id, is_tower_sme, sort_order, color) VALUES
('Matthew Bruce', 'Head of Web', 'leadership', 'rmg', 'onshore', 100, 850, 'BAU', NULL, NULL, FALSE, 1, '#DA202A'),
('Selen Hamilton', 'Demand Coordinator', 'leadership', 'rmg', 'onshore', 100, 700, 'F_GOV', NULL, NULL, FALSE, 2, '#DA202A'),
('Mike James', 'Platform Delivery Lead', 'leadership', 'rmg', 'onshore', 100, 750, 'F_GOV', NULL, NULL, FALSE, 3, '#DA202A'),
('Ajmal Malik', 'Solution Architect Lead', 'leadership', 'rmg', 'onshore', 100, 750, 'F_GOV', NULL, NULL, FALSE, 4, '#DA202A'),
('Justin Fox', 'Software Engineering Lead', 'leadership', 'rmg', 'onshore', 100, 700, 'F_GOV', NULL, NULL, FALSE, 5, '#DA202A'),
('Anjusmita Choudhury', 'Quality Engineering Lead', 'leadership', 'rmg', 'onshore', 100, 680, 'F_GOV', NULL, NULL, FALSE, 6, '#DA202A'),
('Grant Bramley', 'Agile Coach', 'leadership', 'nh', 'onshore', 100, 720, 'F_GOV', NULL, NULL, FALSE, 7, '#003B5C');

-- Seed people - Customer Experience Team
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, tower_id, is_tower_sme, sort_order, color) VALUES
('Sarah Johnson', 'Product Owner', 'team', 'epam', 'onshore', 100, 650, 'PR', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', FALSE, 1, '#00A3E0'),
('David Miller', 'Delivery Owner', 'team', 'epam', 'nearshore', 100, 550, 'PR', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', FALSE, 2, '#00A3E0'),
('Rebecca Taylor', 'Solution Architect', 'team', 'epam', 'nearshore', 100, 600, 'PR', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', FALSE, 3, '#00A3E0'),
('Daniel Wilson', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'PR', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', FALSE, 4, '#00A3E0'),
('Laura Martinez', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'PR', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', FALSE, 5, '#00A3E0'),
('Michael Garcia', 'Developer', 'team', 'epam', 'offshore', 80, 400, 'PR', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', FALSE, 6, '#00A3E0'),
('Emma Robinson', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'PR', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', FALSE, 7, '#00A3E0'),
('Jessica White', 'QA Engineer', 'team', 'epam', 'nearshore', 100, 450, 'PR', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', FALSE, 8, '#00A3E0'),
('Christopher Lee', 'QA Engineer', 'team', 'epam', 'offshore', 100, 350, 'PR', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', FALSE, 9, '#00A3E0'),
('George Harris', 'DevOps', 'team', 'epam', 'nearshore', 50, 500, 'PR', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', FALSE, 10, '#00A3E0');

-- Add a few more people to other teams (shortened for brevity - you can add more)
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, tower_id, is_tower_sme, sort_order, color) VALUES
('Victoria Clark', 'Product Owner', 'team', 'epam', 'onshore', 100, 650, 'PR', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', FALSE, 1, '#00A3E0'),
('Andrew Lewis', 'Delivery Owner', 'team', 'epam', 'nearshore', 100, 550, 'PR', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', FALSE, 2, '#00A3E0'),
('Hannah Walker', 'Solution Architect', 'team', 'epam', 'nearshore', 100, 600, 'PR', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', FALSE, 3, '#00A3E0');

-- Example of tower SME (horizontal within a tower)
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, tower_id, is_tower_sme, sort_order, color) VALUES
('Alfie Murphy', 'Platform Solution Architect', 'tower_sme', 'epam', 'nearshore', 100, 650, 'BAU', NULL, '22222222-2222-2222-2222-222222222222', TRUE, 1, '#00A3E0'),
('Evie Bailey', 'Platform Scrum Master', 'tower_sme', 'cap', 'onshore', 100, 580, 'BAU', NULL, '22222222-2222-2222-2222-222222222222', TRUE, 2, '#0070AD');
