export type Supplier = 'rmg' | 'cap' | 'tcs' | 'epam' | 'nh' | 'ht' | 'other'
export type Location = 'onshore' | 'nearshore' | 'offshore'
export type Planview = 'BAU' | 'F_GOV' | 'PR'
export type Platform = 'strategic' | 'legacy'
export type ZoomLevel = 'compact' | 'normal' | 'detailed'

export interface SupplierConfig {
  id: Supplier
  name: string
  abbreviation: string
  color: string
  logo_url?: string
  sort_order: number
}

export interface Tower {
  id: string
  name: string
  platform: Platform
  color: string
  sort_order: number
  created_at?: string
  updated_at?: string
}

export interface Team {
  id: string
  name: string
  tower_id: string
  supplier: Supplier
  sort_order: number
  created_at?: string
  updated_at?: string
}

export interface Person {
  id: string
  name: string
  title: string
  container: string
  supplier: Supplier
  location: Location
  capacity: number
  commercial_rate: number
  planview: Planview
  team_id?: string | null
  tower_id?: string | null
  is_tower_sme: boolean
  sort_order: number
  color: string
  created_at?: string
  updated_at?: string
}

export interface TeamWithMembers extends Team {
  members: Person[]
}

export interface TowerWithTeams extends Tower {
  teams: TeamWithMembers[]
  smes: Person[]
}

export const SUPPLIER_CONFIGS: Record<Supplier, SupplierConfig> = {
  rmg: { id: 'rmg', name: 'Royal Mail Group', abbreviation: 'RMG', color: '#DA202A', sort_order: 1 },
  cap: { id: 'cap', name: 'Capgemini', abbreviation: 'CAP', color: '#0070AD', sort_order: 2 },
  tcs: { id: 'tcs', name: 'Tata Consultancy Services', abbreviation: 'TCS', color: '#4D2C91', sort_order: 3 },
  epam: { id: 'epam', name: 'EPAM Systems', abbreviation: 'EPAM', color: '#00A3E0', sort_order: 4 },
  nh: { id: 'nh', name: 'North Highland', abbreviation: 'NH', color: '#003B5C', sort_order: 5 },
  ht: { id: 'ht', name: 'Happy Team', abbreviation: 'HT', color: '#FFD700', sort_order: 6 },
  other: { id: 'other', name: 'Other', abbreviation: 'Other', color: '#6C6C6C', sort_order: 7 },
}
