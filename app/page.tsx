'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Person, Team, Tower, ZoomLevel } from '@/lib/types'
import OrgChart from '@/components/OrgChart'
import Sidebar from '@/components/Sidebar'
import AdminMode from '@/components/AdminMode'
import BenchDrawer from '@/components/BenchDrawer'

export default function Home() {
  const [people, setPeople] = useState<Person[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [towers, setTowers] = useState<Tower[]>([])
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>('normal')
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [benchOpen, setBenchOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllData()
  }, [])

  async function fetchAllData() {
    setLoading(true)
    await Promise.all([
      fetchPeople(),
      fetchTeams(),
      fetchTowers()
    ])
    setLoading(false)
  }

  async function fetchPeople() {
    const { data, error } = await supabase
      .from('people')
      .select('*')
      .order('sort_order', { ascending: true })
    
    if (error) {
      console.error('Error fetching people:', error)
    } else {
      setPeople(data || [])
    }
  }

  async function fetchTeams() {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('sort_order', { ascending: true })
    
    if (error) {
      console.error('Error fetching teams:', error)
    } else {
      setTeams(data || [])
    }
  }

  async function fetchTowers() {
    const { data, error } = await supabase
      .from('towers')
      .select('*')
      .order('platform', { ascending: false })
      .order('sort_order', { ascending: true })
    
    if (error) {
      console.error('Error fetching towers:', error)
    } else {
      setTowers(data || [])
    }
  }

  async function updatePerson(person: Person) {
    const { error } = await supabase
      .from('people')
      .update({
        name: person.name,
        title: person.title,
        container: person.container,
        supplier: person.supplier,
        location: person.location,
        capacity: person.capacity,
        commercial_rate: person.commercial_rate,
        planview: person.planview,
        team_id: person.team_id,
        tower_id: person.tower_id,
        is_tower_sme: person.is_tower_sme,
        color: person.color,
        updated_at: new Date().toISOString()
      })
      .eq('id', person.id)

    if (error) {
      console.error('Error updating person:', error)
      alert('Failed to update person')
    } else {
      fetchPeople()
    }
  }

  async function deletePerson(id: string) {
    const { error } = await supabase
      .from('people')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting person:', error)
      alert('Failed to delete person')
    } else {
      setSelectedPerson(null)
      fetchPeople()
    }
  }

  async function addPerson(person: Omit<Person, 'id'>) {
    const { error } = await supabase
      .from('people')
      .insert([person])

    if (error) {
      console.error('Error adding person:', error)
      alert('Failed to add person')
    } else {
      fetchPeople()
    }
  }

  async function addTeam(towerId: string) {
    const teamName = prompt('Enter team name:')
    if (!teamName) return

    const { error } = await supabase
      .from('teams')
      .insert([{
        name: teamName,
        tower_id: towerId,
        supplier: 'epam',
        sort_order: teams.filter(t => t.tower_id === towerId).length
      }])

    if (error) {
      console.error('Error adding team:', error)
      alert('Failed to add team')
    } else {
      fetchTeams()
    }
  }

  function handlePersonDoubleClick(person: Person) {
    const newName = prompt('Edit name:', person.name)
    if (newName && newName !== person.name) {
      updatePerson({ ...person, name: newName })
    }
  }

  function exportData() {
    const data = {
      people,
      teams,
      towers,
      exported_at: new Date().toISOString()
    }
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `royal-mail-org-${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rm-bg-grey">
        <div className="text-center">
          <div className="text-rm-red text-2xl font-bold mb-2">Loading...</div>
          <div className="text-rm-dark-grey text-sm">Fetching org chart data</div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b-4 border-rm-red shadow-sm px-6 py-3 flex justify-between items-center z-50">
        <div className="flex items-center gap-4">
          {/* Royal Mail Logo */}
          <svg className="h-14 w-auto" viewBox="0 0 180 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="160" height="40" fill="white" stroke="#DA202A" strokeWidth="2"/>
            <g transform="translate(90, 20)">
              <ellipse cx="0" cy="12" rx="20" ry="3" fill="#FFD700"/>
              <path d="M -16 12 Q -16 4 -12 -2 L -8 -6 Q -6 -3 -4 -2 L -2 -8 L 0 -12 L 2 -8 L 4 -2 Q 6 -3 8 -6 L 12 -2 Q 16 4 16 12 Z" 
                    fill="#FFD700" stroke="#CC9900" strokeWidth="0.5"/>
              <circle cx="-10" cy="4" r="2" fill="#DA202A"/>
              <circle cx="0" cy="0" r="2" fill="#DA202A"/>
              <circle cx="10" cy="4" r="2" fill="#DA202A"/>
              <rect x="-1" y="-18" width="2" height="8" fill="#FFD700"/>
              <rect x="-3" y="-16" width="6" height="2" fill="#FFD700"/>
            </g>
            <rect x="10" y="50" width="160" height="40" fill="#DA202A"/>
            <g transform="translate(90, 75)">
              <text textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" 
                    fill="none" stroke="#FFD700" strokeWidth="4">Royal Mail</text>
              <text textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" 
                    fill="none" stroke="#FFD700" strokeWidth="2.5">Royal Mail</text>
              <text textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" 
                    fill="#DA202A">Royal Mail</text>
            </g>
          </svg>
          <div>
            <h1 className="text-xl font-bold text-rm-black">Technology Platform Engineering</h1>
            <p className="text-xs text-rm-dark-grey font-medium">Organisation Structure & Platform Landscape</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <div className="flex border-2 border-rm-light-grey rounded overflow-hidden">
            <button
              onClick={() => setZoomLevel('compact')}
              className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                zoomLevel === 'compact' ? 'bg-rm-red text-white' : 'bg-white text-rm-dark-grey hover:bg-rm-bg-grey'
              }`}
            >
              Compact
            </button>
            <button
              onClick={() => setZoomLevel('normal')}
              className={`px-3 py-1.5 text-xs font-semibold border-x border-rm-light-grey transition-colors ${
                zoomLevel === 'normal' ? 'bg-rm-red text-white' : 'bg-white text-rm-dark-grey hover:bg-rm-bg-grey'
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setZoomLevel('detailed')}
              className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                zoomLevel === 'detailed' ? 'bg-rm-red text-white' : 'bg-white text-rm-dark-grey hover:bg-rm-bg-grey'
              }`}
            >
              Detailed
            </button>
          </div>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="px-3 py-1.5 border-2 border-rm-light-grey rounded bg-white hover:border-rm-red hover:text-rm-red transition-colors font-semibold text-sm"
          >
            ☰
          </button>

          <AdminMode isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />

          <button
            onClick={exportData}
            className="px-3 py-1.5 border-2 border-rm-light-grey rounded bg-white hover:border-rm-red hover:text-rm-red transition-colors font-semibold text-sm"
          >
            💾 Export
          </button>

          <button
            onClick={() => {
              const name = prompt('Enter name:')
              if (!name) return
              const title = prompt('Enter title:')
              if (!title) return
              
              addPerson({
                name,
                title,
                container: 'bench',
                supplier: 'rmg',
                location: 'onshore',
                capacity: 100,
                commercial_rate: 0,
                planview: 'PR',
                team_id: null,
                tower_id: null,
                is_tower_sme: false,
                sort_order: 0,
                color: '#DA202A'
              })
            }}
            className="px-3 py-1.5 bg-rm-red border-2 border-rm-red rounded text-white hover:bg-opacity-90 transition-colors font-semibold text-sm"
          >
            + Add Person
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          collapsed={sidebarCollapsed}
          selectedPerson={selectedPerson}
          teams={teams}
          towers={towers}
          onUpdate={updatePerson}
          onDelete={deletePerson}
          isAdminMode={isAdminMode}
        />

        <div
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-7 h-14 bg-white border border-rm-light-grey border-l-0 rounded-r flex items-center justify-center cursor-pointer hover:bg-rm-bg-grey transition-all z-40 ${
            sidebarCollapsed ? 'left-0' : 'left-[340px]'
          }`}
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <span className="text-rm-dark-grey text-lg">{sidebarCollapsed ? '›' : '‹'}</span>
        </div>

        <OrgChart
          people={people}
          teams={teams}
          towers={towers}
          zoomLevel={zoomLevel}
          selectedPerson={selectedPerson}
          onSelectPerson={setSelectedPerson}
          onUpdatePerson={updatePerson}
          onPersonDoubleClick={handlePersonDoubleClick}
          isAdminMode={isAdminMode}
          onAddTeam={addTeam}
        />
      </div>

      {/* Bench Drawer */}
      <BenchDrawer
        people={people}
        isOpen={benchOpen}
        onToggle={() => setBenchOpen(!benchOpen)}
        zoomLevel={zoomLevel}
        selectedPerson={selectedPerson}
        onSelectPerson={setSelectedPerson}
        onPersonDoubleClick={handlePersonDoubleClick}
        onDragStart={(person) => {}}
        onDragEnd={() => {}}
        isAdminMode={isAdminMode}
      />
    </div>
  )
}
