'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Person, ZoomLevel } from '@/lib/types'
import OrgChart from '@/components/OrgChart'
import Sidebar from '@/components/Sidebar'
import AdminMode from '@/components/AdminMode'

export default function Home() {
  const [people, setPeople] = useState<Person[]>([])
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>('normal')
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fetch people from Supabase
  useEffect(() => {
    fetchPeople()
  }, [])

  async function fetchPeople() {
    setLoading(true)
    const { data, error } = await supabase
      .from('people')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (error) {
      console.error('Error fetching people:', error)
    } else {
      setPeople(data || [])
    }
    setLoading(false)
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
        team: person.team,
        color: person.color,
        updated_at: new Date().toISOString()
      })
      .eq('id', person.id)

    if (error) {
      console.error('Error updating person:', error)
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
    } else {
      fetchPeople()
    }
  }

  function exportData() {
    const dataStr = JSON.stringify(people, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'royal-mail-org-chart.json'
    link.click()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-rm-red text-xl font-bold">Loading org chart...</div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b-4 border-rm-red shadow-sm px-8 py-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-6">
          {/* Royal Mail Logo SVG */}
          <svg className="h-16 w-auto" viewBox="0 0 180 100" xmlns="http://www.w3.org/2000/svg">
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
            <h1 className="text-2xl font-bold text-rm-black">Technology Platform Engineering</h1>
            <p className="text-sm text-rm-dark-grey font-medium">Organisation Structure & Platform Landscape</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Zoom Controls */}
          <div className="flex border-2 border-rm-light-grey rounded overflow-hidden">
            <button
              onClick={() => setZoomLevel('compact')}
              className={`px-4 py-2 text-sm font-semibold transition-colors ${
                zoomLevel === 'compact' ? 'bg-rm-red text-white' : 'bg-white text-rm-dark-grey hover:bg-rm-bg-grey'
              }`}
            >
              Compact
            </button>
            <button
              onClick={() => setZoomLevel('normal')}
              className={`px-4 py-2 text-sm font-semibold border-x border-rm-light-grey transition-colors ${
                zoomLevel === 'normal' ? 'bg-rm-red text-white' : 'bg-white text-rm-dark-grey hover:bg-rm-bg-grey'
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setZoomLevel('detailed')}
              className={`px-4 py-2 text-sm font-semibold transition-colors ${
                zoomLevel === 'detailed' ? 'bg-rm-red text-white' : 'bg-white text-rm-dark-grey hover:bg-rm-bg-grey'
              }`}
            >
              Detailed
            </button>
          </div>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="px-4 py-2 border-2 border-rm-light-grey rounded bg-white hover:border-rm-red hover:text-rm-red transition-colors font-semibold"
          >
            ☰
          </button>

          <AdminMode isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />

          <button
            onClick={exportData}
            className="px-4 py-2 border-2 border-rm-light-grey rounded bg-white hover:border-rm-red hover:text-rm-red transition-colors font-semibold"
          >
            💾 Export
          </button>

          <button
            onClick={() => {
              const newPerson = {
                name: 'New Person',
                title: 'Role Title',
                container: 'strategic-business' as const,
                supplier: 'rmg' as const,
                location: 'onshore' as const,
                capacity: 100,
                commercial_rate: 0,
                planview: 'BAU' as const,
                team: 'Customer Experience',
                color: '#0079D2'
              }
              addPerson(newPerson)
            }}
            className="px-4 py-2 bg-rm-red border-2 border-rm-red rounded text-white hover:bg-opacity-90 transition-colors font-semibold"
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
          onUpdate={updatePerson}
          onDelete={deletePerson}
          isAdminMode={isAdminMode}
        />

        <div
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-8 h-16 bg-white border border-rm-light-grey border-l-0 rounded-r flex items-center justify-center cursor-pointer hover:bg-rm-bg-grey transition-all z-40 ${
            sidebarCollapsed ? 'left-0' : 'left-[340px]'
          }`}
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <span className="text-rm-dark-grey text-xl">{sidebarCollapsed ? '›' : '‹'}</span>
        </div>

        <OrgChart
          people={people}
          zoomLevel={zoomLevel}
          selectedPerson={selectedPerson}
          onSelectPerson={setSelectedPerson}
          onUpdatePerson={updatePerson}
          isAdminMode={isAdminMode}
        />
      </div>
    </div>
  )
}
