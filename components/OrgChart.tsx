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

  const handleDragStart = (person: Person) => {
    setDraggedPerson(person)
  }

  const handleDragEnd = () => {
    setDraggedPerson(null)
  }

  const handleDrop = (teamId: string | null, initiativeId: string) => {
    if (!draggedPerson) return

    const updatedPerson = {
      ...draggedPerson,
      team_id: teamId,
      initiative_id: teamId ? teams.find(t => t.id === teamId)?.initiative_id || null : null,
      container: teamId ? 'team' : 'bench'
    }

    onUpdatePerson(updatedPerson)
    setDraggedPerson(null)
  }

  const head = people.filter(p => p.container === 'head')
  const leadership = people.filter(p => p.container === 'leadership').sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))

  return (
    <div className="flex-1 overflow-auto bg-rm-bg-grey p-6">
      <div className="flex flex-col gap-6 min-w-full">
        
        {/* Head of Web - Matthew Bruce at Top */}
        {head.length > 0 && (
          <div className="flex justify-center mx-2 mb-4">
            <div className="bg-white border-3 border-rm-red rounded-lg p-5 shadow-lg">
              {head.map(person => (
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

        {/* Leadership */}
        {leadership.length > 0 && (
          <div className="border-3 border-rm-orange rounded-lg p-5 bg-rm-orange bg-opacity-5 mx-2">
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
          const platformInitiatives = initiatives.filter(i => i.platform_id === platform.id)
          
          return (
            <div key={platform.id} className="mx-2">
              <h3 className="text-xl font-bold mb-3 uppercase tracking-wide" style={{ color: platform.color }}>
                {platform.name}
              </h3>
              
              <div className="flex gap-4 flex-wrap">
                {platformInitiatives.map(initiative => {
                  const initiativeTeams = teams.filter(t => t.initiative_id === initiative.id)
                  const sharedSMEs = people.filter(p => p.initiative_id === initiative.id && p.is_shared_sme)
                  
                  return (
                    <div 
                      key={initiative.id} 
                      className="flex-1 min-w-[400px] border-3 rounded-lg p-4"
                      style={{ borderColor: platform.color, backgroundColor: `${platform.color}08` }}
                    >
                      <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-rm-light-grey">
                        <h4 className="text-base font-bold" style={{ color: platform.color }}>{initiative.name}</h4>
                        <button
                          onClick={() => onAddTeam(initiative.id)}
                          className="px-2 py-1 text-xs font-bold bg-white border-2 border-rm-light-grey rounded hover:border-rm-red hover:text-rm-red transition"
                        >
                          + Team
                        </button>
                      </div>

                      {/* Teams Horizontal Scroll */}
                      <div className="flex gap-3 overflow-x-auto pb-2 mb-3">
                        {initiativeTeams.map(team => {
                          const teamMembers = people.filter(p => p.team_id === team.id).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
                          
                          return (
                            <div
                              key={team.id}
                              className="flex-shrink-0 bg-white rounded border-2 border-rm-light-grey p-3"
                              style={{ width: zoomLevel === 'compact' ? '180px' : zoomLevel === 'detailed' ? '260px' : '220px' }}
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={(e) => {
                                e.preventDefault()
                                handleDrop(team.id, initiative.id)
                              }}
                            >
                              <div className="font-bold text-xs text-rm-black mb-2 pb-2 border-b border-rm-light-grey">
                                {team.name}
                              </div>
                              <div className="space-y-2">
                                {teamMembers.length === 0 ? (
                                  <div className="text-center py-4 text-xs text-rm-dark-grey">Empty</div>
                                ) : (
                                  teamMembers.map(person => (
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
                                  ))
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Shared SMEs */}
                      {sharedSMEs.length > 0 && (
                        <div className="border-2 rounded p-3 bg-white" style={{ borderColor: platform.color }}>
                          <div className="text-[10px] font-bold uppercase tracking-wide text-rm-dark-grey mb-2">
                            Shared SMEs
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {sharedSMEs.map(person => (
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
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
