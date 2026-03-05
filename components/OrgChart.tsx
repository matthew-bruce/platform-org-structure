'use client'

import { useState } from 'react'
import type { Person, Team, Platform, Initiative, ZoomLevel } from '@/lib/types'
import PersonCard from './PersonCard'

interface OrgChartProps {
  people: Person[]
  teams: Team[]
  initiatives: Initiative[]
  platforms: Platform[]
  zoomLevel: ZoomLevel
  selectedPerson: Person | null
  onSelectPerson: (person: Person | null) => void
  onUpdatePerson: (person: Person) => void
  onPersonDoubleClick: (person: Person) => void
  isAdminMode: boolean
  onAddTeam: (initiativeId: string) => void
}

export default function OrgChart({
  people,
  teams,
  initiatives,
  platforms,
  zoomLevel,
  selectedPerson,
  onSelectPerson,
  onUpdatePerson,
  onPersonDoubleClick,
  isAdminMode,
  onAddTeam
}: OrgChartProps) {
  const [draggedPerson, setDraggedPerson] = useState<Person | null>(null)
  const [dropZone, setDropZone] = useState<{ type: 'team' | 'bench' | 'leadership', id?: string } | null>(null)

  const handleDragStart = (person: Person) => {
    // Prevent dragging Head of Web
    if (person.container === 'head') {
      return
    }
    setDraggedPerson(person)
  }

  const handleDragEnd = () => {
    setDraggedPerson(null)
    setDropZone(null)
  }

  // Move person to team
  const moveToTeam = (teamId: string) => {
    if (!draggedPerson) return

    const team = teams.find(t => t.id === teamId)
    if (!team) return

    const teamMembers = people.filter(p => p.team_id === teamId)
    
    onUpdatePerson({
      ...draggedPerson,
      team_id: teamId,
      initiative_id: team.initiative_id,
      container: 'team',
      is_shared_sme: false,
      sort_order: teamMembers.length
    })
  }

  // Move person to bench
  const moveToBench = () => {
    if (!draggedPerson) return

    onUpdatePerson({
      ...draggedPerson,
      team_id: null,
      initiative_id: null,
      container: 'bench',
      is_shared_sme: false,
      sort_order: 0
    })
  }

  // Move person to leadership
  const moveToLeadership = () => {
    if (!draggedPerson) return

    const leadershipMembers = people.filter(p => p.container === 'leadership')
    
    onUpdatePerson({
      ...draggedPerson,
      team_id: null,
      initiative_id: null,
      container: 'leadership',
      is_shared_sme: false,
      sort_order: leadershipMembers.length
    })
  }

  const head = people.filter(p => p.container === 'head')
  const leadership = people.filter(p => p.container === 'leadership').sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))

  return (
    <div className="flex-1 overflow-auto bg-rm-bg-grey p-6">
      <div className="flex flex-col gap-6 min-w-full">
        
        {/* Head of Web - NOT DRAGGABLE */}
        {head.length > 0 && (
          <div className="flex justify-center mx-2 mb-4">
            <div className="bg-white border-3 border-rm-red rounded-lg p-5 shadow-lg">
              {head.map(person => (
                <div key={person.id}>
                  <PersonCard
                    person={person}
                    zoomLevel={zoomLevel}
                    isSelected={selectedPerson?.id === person.id}
                    onClick={() => onSelectPerson(person)}
                    onDoubleClick={() => onPersonDoubleClick(person)}
                    onDragStart={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onDragEnd={() => {}}
                    isAdminMode={isAdminMode}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leadership - DROP ZONE */}
        {leadership.length > 0 && (
          <div 
            className={`border-3 rounded-lg p-5 mx-2 transition-all ${
              dropZone?.type === 'leadership' 
                ? 'border-rm-red bg-rm-red bg-opacity-10 shadow-xl' 
                : 'border-rm-orange bg-rm-orange bg-opacity-5'
            }`}
            onDragOver={(e) => {
              e.preventDefault()
              setDropZone({ type: 'leadership' })
            }}
            onDragLeave={() => setDropZone(null)}
            onDrop={(e) => {
              e.preventDefault()
              moveToLeadership()
              handleDragEnd()
            }}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-rm-light-grey">
              <div>
                <h2 className="text-lg font-bold text-rm-orange uppercase tracking-wide">Leadership</h2>
                <p className="text-xs text-rm-dark-grey font-semibold">Strategic Direction & Standards</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 bg-white p-4 rounded border-2 border-rm-light-grey">
              {leadership.map(person => (
                <PersonCard
                  key={person.id}
                  person={person}
                  zoomLevel={zoomLevel}
                  isSelected={selectedPerson?.id === person.id}
                  onClick={() => onSelectPerson(person)}
                  onDoubleClick={() => onPersonDoubleClick(person)}
                  onDragStart={(e) => handleDragStart(person)}
                  onDragEnd={handleDragEnd}
                  isAdminMode={isAdminMode}
                />
              ))}
            </div>
          </div>
        )}

        {/* Platforms */}
        {platforms.map(platform => {
          co
