'use client'

import { useState } from 'react'
import type { Person, Team, Tower, ZoomLevel } from '@/lib/types'
import PersonCard from './PersonCard'

interface TowerContainerProps {
  tower: Tower
  teams: Team[]
  people: Person[]
  zoomLevel: ZoomLevel
  selectedPerson: Person | null
  onSelectPerson: (person: Person) => void
  onPersonDoubleClick: (person: Person) => void
  onDragStart: (person: Person) => void
  onDragEnd: () => void
  onDrop: (teamId: string | null, towerId: string, isTowerSME: boolean) => void
  draggedPerson: Person | null
  isAdminMode: boolean
  onAddTeam: (towerId: string) => void
}

export default function TowerContainer({
  tower,
  teams,
  people,
  zoomLevel,
  selectedPerson,
  onSelectPerson,
  onPersonDoubleClick,
  onDragStart,
  onDragEnd,
  onDrop,
  draggedPerson,
  isAdminMode,
  onAddTeam
}: TowerContainerProps) {
  const [dropTarget, setDropTarget] = useState<string | null>(null)

  const towerTeams = teams.filter(t => t.tower_id === tower.id)
  const towerSMEs = people.filter(p => p.tower_id === tower.id && p.is_tower_sme)

  return (
    <div 
      className="flex-1 border-3 rounded-lg p-4 min-w-0"
      style={{ 
        borderColor: tower.color,
        backgroundColor: `${tower.color}08`
      }}
    >
      {/* Tower Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-rm-light-grey">
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wide" style={{ color: tower.color }}>
            {tower.name}
          </h2>
          <p className="text-xs text-rm-dark-grey font-semibold">
            {tower.platform === 'strategic' ? 'Azure Cloud' : 'Ensono Data Center'}
          </p>
        </div>
        <button
          onClick={() => onAddTeam(tower.id)}
          className="px-3 py-1.5 text-xs font-bold bg-white border-2 border-rm-light-grey rounded hover:border-rm-red hover:text-rm-red transition"
          title="Add Team"
        >
          + Team
        </button>
      </div>

      {/* Horizontal Teams Scroll */}
      <div className="mb-4">
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
          {towerTeams.length === 0 ? (
            <div className="flex-1 text-center py-12 text-rm-dark-grey text-sm bg-white rounded border-2 border-dashed border-rm-light-grey">
              No teams yet. Click "+ Team" to add one.
            </div>
          ) : (
            towerTeams.map(team => {
              const teamMembers = people.filter(p => p.team_id === team.id)
              const isDropTarget = dropTarget === team.id

              return (
                <div
                  key={team.id}
                  className={`flex-shrink-0 bg-white rounded border-2 p-3 transition-all ${
                    isDropTarget ? 'border-rm-red bg-rm-red bg-opacity-5' : 'border-rm-light-grey'
                  }`}
                  style={{ width: zoomLevel === 'compact' ? '160px' : zoomLevel === 'detailed' ? '240px' : '200px' }}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDropTarget(team.id)
                  }}
                  onDragLeave={() => setDropTarget(null)}
                  onDrop={(e) => {
                    e.preventDefault()
                    onDrop(team.id, tower.id, false)
                    setDropTarget(null)
                  }}
                >
                  <div className="font-bold text-xs text-rm-black mb-2 pb-2 border-b border-rm-light-grey">
                    {team.name}
                  </div>
                  <div className="space-y-2">
                    {teamMembers.length === 0 ? (
                      <div className="text-center py-4 text-xs text-rm-dark-grey">
                        Empty team
                      </div>
                    ) : (
                      teamMembers
                        .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
                        .map(person => (
                          <PersonCard
                            key={person.id}
                            person={person}
                            zoomLevel={zoomLevel}
                            isSelected={selectedPerson?.id === person.id}
                            onClick={() => onSelectPerson(person)}
                            onDoubleClick={() => onPersonDoubleClick(person)}
                            onDragStart={(e) => onDragStart(person)}
                            onDragEnd={onDragEnd}
                            isAdminMode={isAdminMode}
                          />
                        ))
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Tower SMEs Bar at Bottom */}
      {towerSMEs.length > 0 && (
        <div 
          className="border-2 rounded p-3 mt-3"
          style={{ 
            borderColor: tower.color,
            backgroundColor: 'white'
          }}
        >
          <div className="text-[10px] font-bold uppercase tracking-wide text-rm-dark-grey mb-2">
            Tower SMEs (Support All Teams)
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {towerSMEs.map(person => (
              <PersonCard
                key={person.id}
                person={person}
                zoomLevel={zoomLevel}
                isSelected={selectedPerson?.id === person.id}
                onClick={() => onSelectPerson(person)}
                onDoubleClick={() => onPersonDoubleClick(person)}
                onDragStart={(e) => onDragStart(person)}
                onDragEnd={onDragEnd}
                isAdminMode={isAdminMode}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
