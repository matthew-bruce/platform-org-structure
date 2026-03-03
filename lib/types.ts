export type Supplier = 'rmg' | 'epam'
export type Location = 'onshore' | 'nearshore' | 'offshore'
export type Planview = 'BAU' | 'F_GOV' | 'PR'
export type Container = 
  | 'leadership' 
  | 'sme' 
  | 'strategic-business' 
  | 'strategic-technology' 
  | 'legacy-business' 
  | 'legacy-technology'

export type ZoomLevel = 'compact' | 'normal' | 'detailed'

export interface Person {
  id: string
  name: string
  title: string
  container: Container
  supplier: Supplier
  location: Location
  capacity: number
  commercial_rate: number
  planview: Planview
  team?: string
  color: string
  created_at?: string
  updated_at?: string
}

export interface Team {
  name: string
  members: Person[]
}
