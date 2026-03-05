-- Royal Mail Org Chart V2.4 - 3-Level Structure (FIXED)

-- Drop existing tables
DROP TABLE IF EXISTS people CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS initiatives CASCADE;
DROP TABLE IF EXISTS platforms CASCADE;
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

-- Create platforms table (L3 - highest level)
CREATE TABLE platforms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('strategic', 'legacy')),
  color TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create initiatives table (L2 - middle level)
CREATE TABLE initiatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  platform_id UUID REFERENCES platforms(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create teams table (L1 - lowest level)
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  initiative_id UUID REFERENCES initiatives(id) ON DELETE CASCADE,
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
  initiative_id UUID REFERENCES initiatives(id) ON DELETE SET NULL,
  is_shared_sme BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  color TEXT NOT NULL DEFAULT '#DA202A',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indices
CREATE INDEX idx_people_container ON people(container);
CREATE INDEX idx_people_team_id ON people(team_id);
CREATE INDEX idx_people_initiative_id ON people(initiative_id);
CREATE INDEX idx_teams_initiative_id ON teams(initiative_id);
CREATE INDEX idx_initiatives_platform_id ON initiatives(platform_id);

-- Enable RLS
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE initiatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE people ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow all operations" ON suppliers FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON platforms FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON initiatives FOR ALL USING (true);
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

-- Seed platforms (L3)
INSERT INTO platforms (id, name, type, color, sort_order) VALUES
('11111111-1111-1111-1111-111111111111', 'Strategic Platform', 'strategic', '#0079D2', 1),
('22222222-2222-2222-2222-222222222222', 'Legacy Platform', 'legacy', '#991E5A', 2);

-- Seed initiatives (L2)
INSERT INTO initiatives (id, name, platform_id, sort_order) VALUES
-- Strategic initiatives
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Technology Transformation', '11111111-1111-1111-1111-111111111111', 1),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Strategic Demand', '11111111-1111-1111-1111-111111111111', 2),
-- Legacy initiatives
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Care & Maintenance', '22222222-2222-2222-2222-222222222222', 1),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Legacy Demand', '22222222-2222-2222-2222-222222222222', 2),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Ensono Exit', '22222222-2222-2222-2222-222222222222', 3);

-- Seed teams (L1) - FIXED: Added supplier column for all rows
INSERT INTO teams (id, name, initiative_id, supplier, sort_order) VALUES
-- Technology Transformation teams
('10101010-1010-1010-1010-101010101010', 'Cygnus', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'epam', 1),
('20202020-2020-2020-2020-202020202020', 'Cosmos', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'epam', 2),
-- Strategic Demand teams
('30303030-3030-3030-3030-303030303030', 'Nebula', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'cap', 1),
('40404040-4040-4040-4040-404040404040', 'Helios', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'tcs', 2),
-- Care & Maintenance teams
('50505050-5050-5050-5050-505050505050', 'Janus', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'epam', 1),
-- Legacy Demand / Ensono Exit
('60606060-6060-6060-6060-606060606060', 'Orion', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'cap', 1);

-- HEAD OF WEB (separate at top)
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, initiative_id, is_shared_sme, sort_order, color) VALUES
('Matthew Bruce', 'Head of Web', 'head', 'rmg', 'onshore', 100, 850, 'BAU', NULL, NULL, FALSE, 1, '#DA202A');

-- LEADERSHIP (renamed from Leadership & Governance)
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, initiative_id, is_shared_sme, sort_order, color) VALUES
('Selen Hamilton', 'Demand Coordinator', 'leadership', 'rmg', 'onshore', 100, 700, 'F_GOV', NULL, NULL, FALSE, 1, '#DA202A'),
('Mike James', 'Platform Delivery Lead', 'leadership', 'rmg', 'onshore', 100, 750, 'F_GOV', NULL, NULL, FALSE, 2, '#DA202A'),
('Ajmal Malik', 'Solution Architect Lead', 'leadership', 'rmg', 'onshore', 100, 750, 'F_GOV', NULL, NULL, FALSE, 3, '#DA202A'),
('Justin Fox', 'Software Engineering Lead', 'leadership', 'rmg', 'onshore', 100, 700, 'F_GOV', NULL, NULL, FALSE, 4, '#DA202A'),
('Anjusmita Choudhury', 'Quality Engineering Lead', 'leadership', 'rmg', 'onshore', 100, 680, 'F_GOV', NULL, NULL, FALSE, 5, '#DA202A'),
('Grant Bramley', 'Agile Coach', 'leadership', 'nh', 'onshore', 100, 720, 'F_GOV', NULL, NULL, FALSE, 6, '#003B5C');

-- SHARED SMEs - Technology Transformation
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, initiative_id, is_shared_sme, sort_order, color) VALUES
('Emma Richardson', 'Scrum Master', 'shared_sme', 'epam', 'nearshore', 100, 550, 'BAU', NULL, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', TRUE, 1, '#00A3E0'),
('Oliver Harris', 'DevOps Engineer', 'shared_sme', 'epam', 'nearshore', 100, 580, 'BAU', NULL, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', TRUE, 2, '#00A3E0');

-- SHARED SMEs - Strategic Demand
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, initiative_id, is_shared_sme, sort_order, color) VALUES
('Sophie Turner', 'Scrum Master', 'shared_sme', 'cap', 'onshore', 100, 580, 'BAU', NULL, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', TRUE, 1, '#0070AD'),
('James Mitchell', 'DevOps Engineer', 'shared_sme', 'cap', 'onshore', 100, 600, 'BAU', NULL, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', TRUE, 2, '#0070AD');

-- TEAM CYGNUS (4 Devs + 2 QAs)
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, initiative_id, is_shared_sme, sort_order, color) VALUES
('Sarah Johnson', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'PR', '10101010-1010-1010-1010-101010101010', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', FALSE, 1, '#00A3E0'),
('David Miller', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'PR', '10101010-1010-1010-1010-101010101010', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', FALSE, 2, '#00A3E0'),
('Rebecca Taylor', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'PR', '10101010-1010-1010-1010-101010101010', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', FALSE, 3, '#00A3E0'),
('Daniel Wilson', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'PR', '10101010-1010-1010-1010-101010101010', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', FALSE, 4, '#00A3E0'),
('Laura Martinez', 'QA Engineer', 'team', 'epam', 'nearshore', 100, 450, 'PR', '10101010-1010-1010-1010-101010101010', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', FALSE, 5, '#00A3E0'),
('Michael Garcia', 'QA Engineer', 'team', 'epam', 'offshore', 100, 350, 'PR', '10101010-1010-1010-1010-101010101010', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', FALSE, 6, '#00A3E0');

-- TEAM COSMOS (4 Devs + 2 QAs)
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, initiative_id, is_shared_sme, sort_order, color) VALUES
('Emma Robinson', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'PR', '20202020-2020-2020-2020-202020202020', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', FALSE, 1, '#00A3E0'),
('Christopher Lee', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'PR', '20202020-2020-2020-2020-202020202020', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', FALSE, 2, '#00A3E0'),
('Jessica White', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'PR', '20202020-2020-2020-2020-202020202020', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', FALSE, 3, '#00A3E0'),
('George Harris', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'PR', '20202020-2020-2020-2020-202020202020', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', FALSE, 4, '#00A3E0'),
('Victoria Clark', 'QA Engineer', 'team', 'epam', 'nearshore', 100, 450, 'PR', '20202020-2020-2020-2020-202020202020', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', FALSE, 5, '#00A3E0'),
('Andrew Lewis', 'QA Engineer', 'team', 'epam', 'offshore', 100, 350, 'PR', '20202020-2020-2020-2020-202020202020', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', FALSE, 6, '#00A3E0');

-- TEAM NEBULA (4 Devs + 2 QAs)
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, initiative_id, is_shared_sme, sort_order, color) VALUES
('Hannah Walker', 'Developer', 'team', 'cap', 'offshore', 100, 400, 'F_GOV', '30303030-3030-3030-3030-303030303030', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', FALSE, 1, '#0070AD'),
('Benjamin Hall', 'Developer', 'team', 'cap', 'offshore', 100, 400, 'F_GOV', '30303030-3030-3030-3030-303030303030', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', FALSE, 2, '#0070AD'),
('Olivia Allen', 'Developer', 'team', 'cap', 'offshore', 100, 400, 'F_GOV', '30303030-3030-3030-3030-303030303030', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', FALSE, 3, '#0070AD'),
('Jack Young', 'Developer', 'team', 'cap', 'offshore', 100, 400, 'F_GOV', '30303030-3030-3030-3030-303030303030', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', FALSE, 4, '#0070AD'),
('Amelia King', 'QA Engineer', 'team', 'cap', 'nearshore', 100, 450, 'F_GOV', '30303030-3030-3030-3030-303030303030', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', FALSE, 5, '#0070AD'),
('Harry Wright', 'QA Engineer', 'team', 'cap', 'offshore', 100, 350, 'F_GOV', '30303030-3030-3030-3030-303030303030', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', FALSE, 6, '#0070AD');

-- TEAM HELIOS (4 Devs + 2 QAs)
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, initiative_id, is_shared_sme, sort_order, color) VALUES
('Grace Scott', 'Developer', 'team', 'tcs', 'offshore', 100, 400, 'PR', '40404040-4040-4040-4040-404040404040', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', FALSE, 1, '#4D2C91'),
('William Green', 'Developer', 'team', 'tcs', 'offshore', 100, 400, 'PR', '40404040-4040-4040-4040-404040404040', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', FALSE, 2, '#4D2C91'),
('Lucy Adams', 'Developer', 'team', 'tcs', 'offshore', 100, 400, 'PR', '40404040-4040-4040-4040-404040404040', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', FALSE, 3, '#4D2C91'),
('Samuel Baker', 'Developer', 'team', 'tcs', 'offshore', 100, 400, 'PR', '40404040-4040-4040-4040-404040404040', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', FALSE, 4, '#4D2C91'),
('Ella Nelson', 'QA Engineer', 'team', 'tcs', 'nearshore', 100, 450, 'PR', '40404040-4040-4040-4040-404040404040', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', FALSE, 5, '#4D2C91'),
('Noah Carter', 'QA Engineer', 'team', 'tcs', 'offshore', 100, 350, 'PR', '40404040-4040-4040-4040-404040404040', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', FALSE, 6, '#4D2C91');

-- TEAM JANUS (4 Devs + 2 QAs)
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, initiative_id, is_shared_sme, sort_order, color) VALUES
('Sophia Mitchell', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'BAU', '50505050-5050-5050-5050-505050505050', 'cccccccc-cccc-cccc-cccc-cccccccccccc', FALSE, 1, '#00A3E0'),
('Alexander Roberts', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'BAU', '50505050-5050-5050-5050-505050505050', 'cccccccc-cccc-cccc-cccc-cccccccccccc', FALSE, 2, '#00A3E0'),
('Isabella Turner', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'BAU', '50505050-5050-5050-5050-505050505050', 'cccccccc-cccc-cccc-cccc-cccccccccccc', FALSE, 3, '#00A3E0'),
('Ethan Phillips', 'Developer', 'team', 'epam', 'offshore', 100, 400, 'BAU', '50505050-5050-5050-5050-505050505050', 'cccccccc-cccc-cccc-cccc-cccccccccccc', FALSE, 4, '#00A3E0'),
('Mia Campbell', 'QA Engineer', 'team', 'epam', 'nearshore', 100, 450, 'BAU', '50505050-5050-5050-5050-505050505050', 'cccccccc-cccc-cccc-cccc-cccccccccccc', FALSE, 5, '#00A3E0'),
('Jacob Parker', 'QA Engineer', 'team', 'epam', 'offshore', 100, 350, 'BAU', '50505050-5050-5050-5050-505050505050', 'cccccccc-cccc-cccc-cccc-cccccccccccc', FALSE, 6, '#00A3E0');

-- TEAM ORION (4 Devs + 2 QAs)
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team_id, initiative_id, is_shared_sme, sort_order, color) VALUES
('Poppy Evans', 'Developer', 'team', 'cap', 'offshore', 100, 400, 'BAU', '60606060-6060-6060-6060-606060606060', 'dddddddd-dddd-dddd-dddd-dddddddddddd', FALSE, 1, '#0070AD'),
('Joshua Edwards', 'Developer', 'team', 'cap', 'offshore', 100, 400, 'BAU', '60606060-6060-6060-6060-606060606060', 'dddddddd-dddd-dddd-dddd-dddddddddddd', FALSE, 2, '#0070AD'),
('Ava Collins', 'Developer', 'team', 'cap', 'offshore', 100, 400, 'BAU', '60606060-6060-6060-6060-606060606060', 'dddddddd-dddd-dddd-dddd-dddddddddddd', FALSE, 3, '#0070AD'),
('Lucas Stewart', 'Developer', 'team', 'cap', 'offshore', 100, 400, 'BAU', '60606060-6060-6060-6060-606060606060', 'dddddddd-dddd-dddd-dddd-dddddddddddd', FALSE, 4, '#0070AD'),
('Lily Morris', 'QA Engineer', 'team', 'cap', 'nearshore', 100, 450, 'BAU', '60606060-6060-6060-6060-606060606060', 'dddddddd-dddd-dddd-dddd-dddddddddddd', FALSE, 5, '#0070AD'),
('Henry Rogers', 'QA Engineer', 'team', 'cap', 'offshore', 100, 350, 'BAU', '60606060-6060-6060-6060-606060606060', 'dddddddd-dddd-dddd-dddd-dddddddddddd', FALSE, 6, '#0070AD');
