-- Royal Mail Org Chart V2.1 - Refined Schema with Better Sample Data

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
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Enterprise Solutions', '11111111-1111-1111-1111-111111111111', 'cap', 3),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Digital Innovation', '11111111-1111-1111-1111-111111111111', 'tcs', 4),

-- Strategic Technology teams
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Core Web Platform', '22222222-2222-2222-2222-222222222222', 'epam', 1),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Cloud Infrastructure', '22222222-2222-2222-2222-222222222222', 'epam', 2),
('10101010-1010-1010-1010-101010101010', 'Data Platform', '22222222-2222-2222-2222-222222222222', 'cap', 3),

-- Legacy Business teams
('20202020-2020-2020-2020-202020202020', 'Legacy Business Apps', '33333333-3333-3333-3333-333333333333', 'epam', 1),

-- Legacy Technology teams
('30303030-3030-3030-3030-303030303030', 'Mainframe Services', '44444444-4444-4444-4444-444444444444', 'epam', 1),
('40404040-4040-4040-4040-404040404040', 'Legacy Integration', '44444444-4444-4444-4444-444444444444', 'cap', 2);

-- HEAD OF WEB (separate from Leadership & Governance)
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, tower_id, is_tower_sme, sort_order, color) VALUES
('Matthew Bruce', 'Head of Web', 'head', 'rmg', 'onshore', 100, 850, 'BAU', NULL, NULL, FALSE, 1, '#DA202A');

-- LEADERSHIP & GOVERNANCE
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, tower_id, is_tower_sme, sort_order, color) VALUES
('Selen Hamilton', 'Demand Coordinator', 'leadership', 'rmg', 'onshore', 100, 700, 'F_GOV', NULL, NULL, FALSE, 1, '#DA202A'),
('Mike James', 'Platform Delivery Lead', 'leadership', 'rmg', 'onshore', 100, 750, 'F_GOV', NULL, NULL, FALSE, 2, '#DA202A'),
('Ajmal Malik', 'Solution Architect Lead', 'leadership', 'rmg', 'onshore', 100, 750, 'F_GOV', NULL, NULL, FALSE, 3, '#DA202A'),
('Justin Fox', 'Software Engineering Lead', 'leadership', 'rmg', 'onshore', 100, 700, 'F_GOV', NULL, NULL, FALSE, 4, '#DA202A'),
('Anjusmita Choudhury', 'Quality Engineering Lead', 'leadership', 'rmg', 'onshore', 100, 680, 'F_GOV', NULL, NULL, FALSE, 5, '#DA202A'),
('Grant Bramley', 'Agile Coach', 'leadership', 'nh', 'onshore', 100, 720, 'F_GOV', NULL, NULL, FALSE, 6, '#003B5C');

-- STRATEGIC BUSINESS TOWER SMEs
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, tower_id, is_tower_sme, sort_order, color) VALUES
('Emma Richardson', 'Scrum Master', 'tower_sme', 'epam', 'nearshore', 100, 550, 'BAU', NULL, '11111111-1111-1111-1111-111111111111', TRUE, 1, '#00A3E0'),
('Oliver Harris', 'DevOps Engineer', 'tower_sme', 'epam', 'nearshore', 100, 580, 'BAU', NULL, '11111111-1111-1111-1111-111111111111', TRUE, 2, '#00A3E0');

-- STRATEGIC TECHNOLOGY TOWER SMEs
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, tower_id, is_tower_sme, sort_order, color) VALUES
('Sophie Turner', 'Scrum Master', 'tower_sme', 'cap', 'onshore', 100, 580, 'BAU', NULL, '22222222-2222-2222-2222-222222222222', TRUE, 1, '#0070AD'),
('James Mitchell', 'DevOps Engineer', 'tower_sme', 'cap', 'onshore', 100, 600, 'BAU', NULL, '22222222-2222-2222-2222-222222222222', TRUE, 2, '#0070AD');

-- LEGACY BUSINESS TOWER SMEs
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, tower_id, is_tower_sme, sort_order, color) VALUES
('Charlotte Evans', 'Scrum Master', 'tower_sme', 'epam', 'nearshore', 100, 550, 'BAU', NULL, '33333333-3333-3333-3333-333333333333', TRUE, 1, '#00A3E0'),
('William Parker', 'DevOps Engineer', 'tower_sme', 'epam', 'nearshore', 100, 580, 'BAU', NULL, '33333333-3333-3333-3333-333333333333', TRUE, 2, '#00A3E0');

-- LEGACY TECHNOLOGY TOWER SMEs
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, tower_id, is_tower_sme, sort_order, color) VALUES
('Amelia Brooks', 'Scrum Master', 'tower_sme', 'cap', 'nearshore', 100, 550, 'BAU', NULL, '44444444-4444-4444-4444-444444444444', TRUE, 1, '#0070AD'),
('Harry Wilson', 'DevOps Engineer', 'tower_sme', 'cap', 'nearshore', 100, 580, 'BAU', NULL, '44444444-4444-4444-4444-444444444444', TRUE, 2, '#0070AD');

-- CUSTOMER EXPERIENCE TEAM (4 Devs + 2 QAs)
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, tower_id, is_tower_sme, sort_order, color) VALUES
('Sarah Johnson', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'PR', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', FALSE, 1, '#00A3E0'),
('David Miller', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'PR', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', FALSE, 2, '#00A3E0'),
('Rebecca Taylor', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'PR', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', FALSE, 3, '#00A3E0'),
('Daniel Wilson', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'PR', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', FALSE, 4, '#00A3E0'),
('Laura Martinez', 'QA Engineer', 'team', 'epam', 'nearshore', 100, 450, 'PR', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', FALSE, 5, '#00A3E0'),
('Michael Garcia', 'QA Engineer', 'team', 'epam', 'offshore', 100, 350, 'PR', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', FALSE, 6, '#00A3E0');

-- LOGISTICS & DELIVERY TEAM (4 Devs + 2 QAs)
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, tower_id, is_tower_sme, sort_order, color) VALUES
('Emma Robinson', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'PR', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', FALSE, 1, '#00A3E0'),
('Christopher Lee', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'PR', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', FALSE, 2, '#00A3E0'),
('Jessica White', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'PR', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', FALSE, 3, '#00A3E0'),
('George Harris', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'PR', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', FALSE, 4, '#00A3E0'),
('Victoria Clark', 'QA Engineer', 'team', 'epam', 'nearshore', 100, 450, 'PR', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', FALSE, 5, '#00A3E0'),
('Andrew Lewis', 'QA Engineer', 'team', 'epam', 'offshore', 100, 350, 'PR', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', FALSE, 6, '#00A3E0');

-- ENTERPRISE SOLUTIONS TEAM (4 Devs + 2 QAs)
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, tower_id, is_tower_sme, sort_order, color) VALUES
('Hannah Walker', 'Developer', 'team', 'cap', 'offshore', 100, 400, 'F_GOV', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', FALSE, 1, '#0070AD'),
('Benjamin Hall', 'Developer', 'team', 'cap', 'offshore', 100, 400, 'F_GOV', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', FALSE, 2, '#0070AD'),
('Olivia Allen', 'Developer', 'team', 'cap', 'offshore', 100, 400, 'F_GOV', 'cccccccc-cccc-cccc-cccc-cccccccccc', '11111111-1111-1111-1111-111111111111', FALSE, 3, '#0070AD'),
('Jack Young', 'Developer', 'team', 'cap', 'offshore', 100, 400, 'F_GOV', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', FALSE, 4, '#0070AD'),
('Amelia King', 'QA Engineer', 'team', 'cap', 'nearshore', 100, 450, 'F_GOV', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', FALSE, 5, '#0070AD'),
('Harry Wright', 'QA Engineer', 'team', 'cap', 'offshore', 100, 350, 'F_GOV', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', FALSE, 6, '#0070AD');

-- DIGITAL INNOVATION TEAM (4 Devs + 2 QAs)
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, tower_id, is_tower_sme, sort_order, color) VALUES
('Grace Scott', 'Developer', 'team', 'tcs', 'offshore', 100, 400, 'PR', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', FALSE, 1, '#4D2C91'),
('William Green', 'Developer', 'team', 'tcs', 'offshore', 100, 400, 'PR', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', FALSE, 2, '#4D2C91'),
('Lucy Adams', 'Developer', 'team', 'tcs', 'offshore', 100, 400, 'PR', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', FALSE, 3, '#4D2C91'),
('Samuel Baker', 'Developer', 'team', 'tcs', 'offshore', 100, 400, 'PR', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', FALSE, 4, '#4D2C91'),
('Ella Nelson', 'QA Engineer', 'team', 'tcs', 'nearshore', 100, 450, 'PR', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', FALSE, 5, '#4D2C91'),
('Noah Carter', 'QA Engineer', 'team', 'tcs', 'offshore', 100, 350, 'PR', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', FALSE, 6, '#4D2C91');

-- Continue similar pattern for remaining teams (Core Web, Cloud, Data, Legacy Business, Mainframe, Legacy Integration)
-- I'll add placeholders for brevity but same structure: 4 Devs + 2 QAs each

-- CORE WEB PLATFORM (4 Devs + 2 QAs)
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, tower_id, is_tower_sme, sort_order, color) VALUES
('Sophia Mitchell', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'BAU', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '22222222-2222-2222-2222-222222222222', FALSE, 1, '#00A3E0'),
('Alexander Roberts', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'BAU', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '22222222-2222-2222-2222-222222222222', FALSE, 2, '#00A3E0'),
('Isabella Turner', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'BAU', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '22222222-2222-2222-2222-222222222222', FALSE, 3, '#00A3E0'),
('Ethan Phillips', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'BAU', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '22222222-2222-2222-2222-222222222222', FALSE, 4, '#00A3E0'),
('Mia Campbell', 'QA Engineer', 'team', 'epam', 'nearshore', 100, 450, 'BAU', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '22222222-2222-2222-2222-222222222222', FALSE, 5, '#00A3E0'),
('Jacob Parker', 'QA Engineer', 'team', 'epam', 'offshore', 100, 350, 'BAU', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '22222222-2222-2222-2222-222222222222', FALSE, 6, '#00A3E0');

-- Add similar for remaining 4 teams (Cloud Infrastructure, Data Platform, Legacy Business Apps, Mainframe Services, Legacy Integration)
-- Total will be ~54 people (1 Head + 6 Leadership + 8 Tower SMEs + 39 team members across 6.5 teams shown)

-- CLOUD INFRASTRUCTURE (4 Devs + 2 QAs)
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, tower_id, is_tower_sme, sort_order, color) VALUES
('Poppy Evans', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'BAU', 'ffffffff-ffff-ffff-ffff-ffffffffffff', '22222222-2222-2222-2222-222222222222', FALSE, 1, '#00A3E0'),
('Joshua Edwards', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'BAU', 'ffffffff-ffff-ffff-ffff-ffffffffffff', '22222222-2222-2222-2222-222222222222', FALSE, 2, '#00A3E0'),
('Ava Collins', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'BAU', 'ffffffff-ffff-ffff-ffff-ffffffffffff', '22222222-2222-2222-2222-222222222222', FALSE, 3, '#00A3E0'),
('Lucas Stewart', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'BAU', 'ffffffff-ffff-ffff-ffff-ffffffffffff', '22222222-2222-2222-2222-222222222222', FALSE, 4, '#00A3E0'),
('Lily Morris', 'QA Engineer', 'team', 'epam', 'nearshore', 100, 450, 'BAU', 'ffffffff-ffff-ffff-ffff-ffffffffffff', '22222222-2222-2222-2222-222222222222', FALSE, 5, '#00A3E0'),
('Henry Rogers', 'QA Engineer', 'team', 'epam', 'offshore', 100, 350, 'BAU', 'ffffffff-ffff-ffff-ffff-ffffffffffff', '22222222-2222-2222-2222-222222222222', FALSE, 6, '#00A3E0');

-- DATA PLATFORM (4 Devs + 2 QAs)
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, tower_id, is_tower_sme, sort_order, color) VALUES
('Freya Reed', 'Developer', 'team', 'cap', 'offshore', 100, 400, 'BAU', '10101010-1010-1010-1010-101010101010', '22222222-2222-2222-2222-222222222222', FALSE, 1, '#0070AD'),
('Oscar Cook', 'Developer', 'team', 'cap', 'offshore', 100, 400, 'BAU', '10101010-1010-1010-1010-101010101010', '22222222-2222-2222-2222-222222222222', FALSE, 2, '#0070AD'),
('Ruby Morgan', 'Developer', 'team', 'cap', 'offshore', 100, 400, 'BAU', '10101010-1010-1010-1010-101010101010', '22222222-2222-2222-2222-222222222222', FALSE, 3, '#0070AD'),
('Charlie Bell', 'Developer', 'team', 'cap', 'offshore', 100, 400, 'BAU', '10101010-1010-1010-1010-101010101010', '22222222-2222-2222-2222-222222222222', FALSE, 4, '#0070AD'),
('Alfie Murphy', 'QA Engineer', 'team', 'cap', 'nearshore', 100, 450, 'BAU', '10101010-1010-1010-1010-101010101010', '22222222-2222-2222-2222-222222222222', FALSE, 5, '#0070AD'),
('Evie Bailey', 'QA Engineer', 'team', 'cap', 'offshore', 100, 350, 'BAU', '10101010-1010-1010-1010-101010101010', '22222222-2222-2222-2222-222222222222', FALSE, 6, '#0070AD');

-- LEGACY BUSINESS APPS (4 Devs + 2 QAs)
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, tower_id, is_tower_sme, sort_order, color) VALUES
('Arthur Richardson', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'BAU', '20202020-2020-2020-2020-202020202020', '33333333-3333-3333-3333-333333333333', FALSE, 1, '#00A3E0'),
('Isla Cox', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'BAU', '20202020-2020-2020-2020-202020202020', '33333333-3333-3333-3333-333333333333', FALSE, 2, '#00A3E0'),
('Leo Howard', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'BAU', '20202020-2020-2020-2020-202020202020', '33333333-3333-3333-3333-333333333333', FALSE, 3, '#00A3E0'),
('Ivy Ward', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'BAU', '20202020-2020-2020-2020-202020202020', '33333333-3333-3333-3333-333333333333', FALSE, 4, '#00A3E0'),
('Archie Torres', 'QA Engineer', 'team', 'epam', 'nearshore', 100, 450, 'BAU', '20202020-2020-2020-2020-202020202020', '33333333-3333-3333-3333-333333333333', FALSE, 5, '#00A3E0'),
('Rosie Peterson', 'QA Engineer', 'team', 'epam', 'offshore', 100, 350, 'BAU', '20202020-2020-2020-2020-202020202020', '33333333-3333-3333-3333-333333333333', FALSE, 6, '#00A3E0');

-- MAINFRAME SERVICES (4 Devs + 2 QAs)
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, tower_id, is_tower_sme, sort_order, color) VALUES
('Theo Gray', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'BAU', '30303030-3030-3030-3030-303030303030', '44444444-4444-4444-4444-444444444444', FALSE, 1, '#00A3E0'),
('Daisy Ramirez', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'BAU', '30303030-3030-3030-3030-303030303030', '44444444-4444-4444-4444-444444444444', FALSE, 2, '#00A3E0'),
('Harrison James', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'BAU', '30303030-3030-3030-3030-303030303030', '44444444-4444-4444-4444-444444444444', FALSE, 3, '#00A3E0'),
('Willow Watson', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'BAU', '30303030-3030-3030-3030-303030303030', '44444444-4444-4444-4444-444444444444', FALSE, 4, '#00A3E0'),
('Sebastian Brooks', 'QA Engineer', 'team', 'epam', 'nearshore', 100, 450, 'BAU', '30303030-3030-3030-3030-303030303030', '44444444-4444-4444-4444-444444444444', FALSE, 5, '#00A3E0'),
('Phoebe Kelly', 'QA Engineer', 'team', 'epam', 'offshore', 100, 350, 'BAU', '30303030-3030-3030-3030-303030303030', '44444444-4444-4444-4444-444444444444', FALSE, 6, '#00A3E0');

-- LEGACY INTEGRATION (4 Devs + 2 QAs)
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, tower_id, is_tower_sme, sort_order, color) VALUES
('Max Sanders', 'Developer', 'team', 'cap', 'offshore', 100, 400, 'BAU', '40404040-4040-4040-4040-404040404040', '44444444-4444-4444-4444-444444444444', FALSE, 1, '#0070AD'),
('Scarlett Price', 'Developer', 'team', 'cap', 'offshore', 100, 400, 'BAU', '40404040-4040-4040-4040-404040404040', '44444444-4444-4444-4444-444444444444', FALSE, 2, '#0070AD'),
('Joseph Bennett', 'Developer', 'team', 'cap', 'offshore', 100, 400, 'BAU', '40404040-4040-4040-4040-404040404040', '44444444-4444-4444-4444-444444444444', FALSE, 3, '#0070AD'),
('Florence Wood', 'Developer', 'team', 'cap', 'offshore', 100, 400, 'BAU', '40404040-4040-4040-4040-404040404040', '44444444-4444-4444-4444-444444444444', FALSE, 4, '#0070AD'),
('Edward Barnes', 'QA Engineer', 'team', 'cap', 'nearshore', 100, 450, 'BAU', '40404040-4040-4040-4040-404040404040', '44444444-4444-4444-4444-444444444444', FALSE, 5, '#0070AD'),
('Matilda Ross', 'QA Engineer', 'team', 'cap', 'offshore', 100, 350, 'BAU', '40404040-4040-4040-4040-404040404040', '44444444-4444-4444-4444-444444444444', FALSE, 6, '#0070AD');
