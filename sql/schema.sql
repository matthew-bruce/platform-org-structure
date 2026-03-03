-- Royal Mail Org Chart Database Schema

-- Create people table
CREATE TABLE people (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  container TEXT NOT NULL CHECK (container IN ('leadership', 'sme', 'strategic-business', 'strategic-technology', 'legacy-business', 'legacy-technology')),
  supplier TEXT NOT NULL CHECK (supplier IN ('rmg', 'epam')),
  location TEXT NOT NULL CHECK (location IN ('onshore', 'nearshore', 'offshore')),
  capacity INTEGER NOT NULL DEFAULT 100 CHECK (capacity >= 0 AND capacity <= 100),
  commercial_rate INTEGER NOT NULL DEFAULT 0,
  planview TEXT NOT NULL CHECK (planview IN ('BAU', 'F_GOV', 'PR')),
  team TEXT,
  color TEXT NOT NULL DEFAULT '#DA202A',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on container for faster queries
CREATE INDEX idx_people_container ON people(container);
CREATE INDEX idx_people_team ON people(team);

-- Enable Row Level Security (optional - for future auth)
ALTER TABLE people ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for now (you can restrict later)
CREATE POLICY "Allow all operations" ON people FOR ALL USING (true);

-- Seed data
INSERT INTO people (name, title, container, supplier, location, capacity, commercial_rate, planview, team, color) VALUES
-- Leadership
('Matthew Bruce', 'Head of Web', 'leadership', 'rmg', 'onshore', 100, 850, 'BAU', NULL, '#DA202A'),

-- Horizontal SMEs
('Oliver Thompson', 'Lead Solution Architect', 'sme', 'rmg', 'onshore', 100, 750, 'BAU', NULL, '#D24713'),
('James Mitchell', 'Lead Software Engineer', 'sme', 'rmg', 'onshore', 100, 700, 'BAU', NULL, '#D24713'),
('Sophie Williams', 'Security Architect', 'sme', 'rmg', 'onshore', 100, 720, 'F_GOV', NULL, '#D24713'),
('Emily Davies', 'Data Architect', 'sme', 'rmg', 'onshore', 100, 730, 'BAU', NULL, '#D24713'),
('Thomas Anderson', 'DevOps Architect', 'sme', 'rmg', 'onshore', 100, 710, 'BAU', NULL, '#D24713'),
('Charlotte Brown', 'QA Lead', 'sme', 'rmg', 'onshore', 100, 650, 'BAU', NULL, '#D24713'),

-- Customer Experience Team
('Sarah Johnson', 'Product Owner', 'strategic-business', 'epam', 'onshore', 100, 650, 'PR', 'Customer Experience', '#0079D2'),
('David Miller', 'Delivery Owner', 'strategic-business', 'epam', 'nearshore', 100, 550, 'PR', 'Customer Experience', '#0079D2'),
('Rebecca Taylor', 'Solution Architect', 'strategic-business', 'epam', 'nearshore', 100, 600, 'PR', 'Customer Experience', '#0079D2'),
('Daniel Wilson', 'Developer', 'strategic-business', 'epam', 'offshore', 100, 400, 'PR', 'Customer Experience', '#0079D2'),
('Laura Martinez', 'Developer', 'strategic-business', 'epam', 'offshore', 100, 400, 'PR', 'Customer Experience', '#0079D2'),
('Michael Garcia', 'Developer', 'strategic-business', 'epam', 'offshore', 80, 400, 'PR', 'Customer Experience', '#0079D2'),
('Emma Robinson', 'Developer', 'strategic-business', 'epam', 'offshore', 100, 400, 'PR', 'Customer Experience', '#0079D2'),
('Jessica White', 'QA Engineer', 'strategic-business', 'epam', 'nearshore', 100, 450, 'PR', 'Customer Experience', '#0079D2'),
('Christopher Lee', 'QA Engineer', 'strategic-business', 'epam', 'offshore', 100, 350, 'PR', 'Customer Experience', '#0079D2'),
('George Harris', 'DevOps', 'strategic-business', 'epam', 'nearshore', 50, 500, 'PR', 'Customer Experience', '#0079D2'),

-- Logistics & Delivery Team
('Victoria Clark', 'Product Owner', 'strategic-business', 'epam', 'onshore', 100, 650, 'PR', 'Logistics & Delivery', '#0079D2'),
('Andrew Lewis', 'Delivery Owner', 'strategic-business', 'epam', 'nearshore', 100, 550, 'PR', 'Logistics & Delivery', '#0079D2'),
('Hannah Walker', 'Solution Architect', 'strategic-business', 'epam', 'nearshore', 100, 600, 'PR', 'Logistics & Delivery', '#0079D2'),
('Benjamin Hall', 'Developer', 'strategic-business', 'epam', 'offshore', 100, 400, 'PR', 'Logistics & Delivery', '#0079D2'),
('Olivia Allen', 'Developer', 'strategic-business', 'epam', 'offshore', 100, 400, 'PR', 'Logistics & Delivery', '#0079D2'),
('Jack Young', 'Developer', 'strategic-business', 'epam', 'offshore', 100, 400, 'PR', 'Logistics & Delivery', '#0079D2'),
('Amelia King', 'Developer', 'strategic-business', 'epam', 'offshore', 100, 400, 'PR', 'Logistics & Delivery', '#0079D2'),
('Harry Wright', 'QA Engineer', 'strategic-business', 'epam', 'nearshore', 100, 450, 'PR', 'Logistics & Delivery', '#0079D2'),
('Grace Scott', 'QA Engineer', 'strategic-business', 'epam', 'offshore', 100, 350, 'PR', 'Logistics & Delivery', '#0079D2'),
('William Green', 'DevOps', 'strategic-business', 'epam', 'nearshore', 50, 500, 'PR', 'Logistics & Delivery', '#0079D2'),

-- Enterprise Solutions Team  
('Lucy Adams', 'Product Owner', 'strategic-business', 'epam', 'onshore', 100, 650, 'F_GOV', 'Enterprise Solutions', '#0079D2'),
('Samuel Baker', 'Delivery Owner', 'strategic-business', 'epam', 'nearshore', 100, 550, 'F_GOV', 'Enterprise Solutions', '#0079D2'),
('Ella Nelson', 'Solution Architect', 'strategic-business', 'epam', 'nearshore', 100, 600, 'F_GOV', 'Enterprise Solutions', '#0079D2'),
('Noah Carter', 'Developer', 'strategic-business', 'epam', 'offshore', 100, 400, 'F_GOV', 'Enterprise Solutions', '#0079D2'),
('Sophia Mitchell', 'Developer', 'strategic-business', 'epam', 'offshore', 100, 400, 'F_GOV', 'Enterprise Solutions', '#0079D2'),
('Alexander Roberts', 'Developer', 'strategic-business', 'epam', 'offshore', 100, 400, 'F_GOV', 'Enterprise Solutions', '#0079D2'),
('Isabella Turner', 'Developer', 'strategic-business', 'epam', 'offshore', 100, 400, 'F_GOV', 'Enterprise Solutions', '#0079D2'),
('Ethan Phillips', 'QA Engineer', 'strategic-business', 'epam', 'nearshore', 100, 450, 'F_GOV', 'Enterprise Solutions', '#0079D2'),
('Mia Campbell', 'QA Engineer', 'strategic-business', 'epam', 'offshore', 100, 350, 'F_GOV', 'Enterprise Solutions', '#0079D2'),
('Jacob Parker', 'DevOps', 'strategic-business', 'epam', 'nearshore', 50, 500, 'F_GOV', 'Enterprise Solutions', '#0079D2'),

-- Digital Innovation Team
('Poppy Evans', 'Product Owner', 'strategic-business', 'epam', 'onshore', 100, 650, 'PR', 'Digital Innovation', '#0079D2'),
('Joshua Edwards', 'Delivery Owner', 'strategic-business', 'epam', 'nearshore', 100, 550, 'PR', 'Digital Innovation', '#0079D2'),
('Ava Collins', 'Solution Architect', 'strategic-business', 'epam', 'nearshore', 100, 600, 'PR', 'Digital Innovation', '#0079D2'),
('Lucas Stewart', 'Developer', 'strategic-business', 'epam', 'offshore', 100, 400, 'PR', 'Digital Innovation', '#0079D2'),
('Lily Morris', 'Developer', 'strategic-business', 'epam', 'offshore', 100, 400, 'PR', 'Digital Innovation', '#0079D2'),
('Henry Rogers', 'Developer', 'strategic-business', 'epam', 'offshore', 100, 400, 'PR', 'Digital Innovation', '#0079D2'),
('Freya Reed', 'Developer', 'strategic-business', 'epam', 'offshore', 100, 400, 'PR', 'Digital Innovation', '#0079D2'),
('Oscar Cook', 'QA Engineer', 'strategic-business', 'epam', 'nearshore', 100, 450, 'PR', 'Digital Innovation', '#0079D2'),
('Ruby Morgan', 'QA Engineer', 'strategic-business', 'epam', 'offshore', 100, 350, 'PR', 'Digital Innovation', '#0079D2'),
('Charlie Bell', 'DevOps', 'strategic-business', 'epam', 'nearshore', 50, 500, 'PR', 'Digital Innovation', '#0079D2'),

-- Core Web Platform Team
('Alfie Murphy', 'Platform Team Lead', 'strategic-technology', 'epam', 'nearshore', 100, 650, 'BAU', 'Core Web Platform', '#0079D2'),
('Evie Bailey', 'Senior Platform Engineer', 'strategic-technology', 'epam', 'nearshore', 100, 550, 'BAU', 'Core Web Platform', '#0079D2'),
('Arthur Richardson', 'Platform Engineer', 'strategic-technology', 'epam', 'offshore', 100, 450, 'BAU', 'Core Web Platform', '#0079D2'),
('Isla Cox', 'Platform Engineer', 'strategic-technology', 'epam', 'offshore', 100, 450, 'BAU', 'Core Web Platform', '#0079D2'),

-- Cloud Infrastructure Team
('Leo Howard', 'Platform Team Lead', 'strategic-technology', 'epam', 'nearshore', 100, 650, 'BAU', 'Cloud Infrastructure', '#0079D2'),
('Ivy Ward', 'Senior Cloud Engineer', 'strategic-technology', 'epam', 'nearshore', 100, 550, 'BAU', 'Cloud Infrastructure', '#0079D2'),
('Archie Torres', 'Cloud Engineer', 'strategic-technology', 'epam', 'offshore', 100, 450, 'BAU', 'Cloud Infrastructure', '#0079D2'),
('Rosie Peterson', 'DevOps Engineer', 'strategic-technology', 'epam', 'offshore', 100, 450, 'BAU', 'Cloud Infrastructure', '#0079D2'),

-- Data Platform Team
('Theo Gray', 'Data Platform Lead', 'strategic-technology', 'epam', 'nearshore', 100, 650, 'BAU', 'Data Platform', '#0079D2'),
('Daisy Ramirez', 'Senior Data Engineer', 'strategic-technology', 'epam', 'nearshore', 100, 550, 'BAU', 'Data Platform', '#0079D2'),
('Harrison James', 'Data Engineer', 'strategic-technology', 'epam', 'offshore', 100, 450, 'BAU', 'Data Platform', '#0079D2'),
('Willow Watson', 'Data Engineer', 'strategic-technology', 'epam', 'offshore', 100, 450, 'BAU', 'Data Platform', '#0079D2'),

-- Legacy Business Apps
('Sebastian Brooks', 'Legacy Business Lead', 'legacy-business', 'epam', 'onshore', 100, 600, 'BAU', 'Legacy Business Apps', '#991E5A'),
('Phoebe Kelly', 'Business Analyst', 'legacy-business', 'epam', 'nearshore', 100, 500, 'BAU', 'Legacy Business Apps', '#991E5A'),
('Max Sanders', 'Developer', 'legacy-business', 'epam', 'offshore', 100, 400, 'BAU', 'Legacy Business Apps', '#991E5A'),

-- Mainframe Services
('Scarlett Price', 'Mainframe Lead', 'legacy-technology', 'epam', 'nearshore', 100, 700, 'BAU', 'Mainframe Services', '#991E5A'),
('Joseph Bennett', 'Mainframe Engineer', 'legacy-technology', 'epam', 'nearshore', 100, 550, 'BAU', 'Mainframe Services', '#991E5A'),
('Florence Wood', 'Mainframe Engineer', 'legacy-technology', 'epam', 'offshore', 100, 450, 'BAU', 'Mainframe Services', '#991E5A'),

-- Legacy Integration
('Edward Barnes', 'Integration Lead', 'legacy-technology', 'epam', 'nearshore', 100, 650, 'BAU', 'Legacy Integration', '#991E5A'),
('Matilda Ross', 'Integration Engineer', 'legacy-technology', 'epam', 'nearshore', 100, 550, 'BAU', 'Legacy Integration', '#991E5A'),
('Frederick Henderson', 'Integration Engineer', 'legacy-technology', 'epam', 'offshore', 100, 450, 'BAU', 'Legacy Integration', '#991E5A');
