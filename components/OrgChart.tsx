'use client'

import { useState } from 'react'
import type { Person, Team, Tower, ZoomLevel } from '@/lib/types'
import PersonCard from './PersonCard'
import TowerContainer from './TowerContainer'

interface OrgChartProps {
  people: Person[]
  teams: Team[]
  towers: Tower[]
  zoomLevel: ZoomLevel
  selectedPerson: Person | null
  onSelectPerson: (person: Person | null) => void
  onUpdatePerson: (person: Person) => void
  onPersonDoubleClick: (person: Person) => void
  isAdminMode: boolean
  onAddTeam: (towerId: string) => void
}

export default function OrgChart({
  people,
  teams,
  towers,
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

  const handleDrop = (teamId: string | null, towerId: string, isTowerSME: boolean) => {
    if (!draggedPerson) return

    const updatedPerson = {
      ...draggedPerson,
      team_id: teamId,
      tower_id: isTowerSME ? towerId : (teamId ? teams.find(t => t.id === teamId)?.tower_id || null : null),
      is_tower_sme: isTowerSME,
      container: teamId ? 'team' : (isTowerSME ? 'tower_sme' : 'bench')
    }

    onUpdatePerson(updatedPerson)
    setDraggedPerson(null)
  }

  const leadership = people.filter(p => p.container === 'leadership').sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
  const strategicTowers = towers.filter(t => t.platform === 'strategic').sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
  const legacyTowers = towers.filter(t => t.platform === 'legacy').sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))

  return (
    <div className="flex-1 overflow-auto bg-rm-bg-grey p-6">
      <div className="flex flex-col gap-6 min-w-full">
        {/* Leadership & Governance */}
        <div className="border-3 border-rm-orange rounded-lg p-5 bg-rm-orange bg-opacity-5 mx-2">
          <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-rm-light-grey">
            <div>
              <h2 className="text-lg font-bold text-rm-orange uppercase tracking-wide">Leadership & Governance</h2>
              <p className="text-xs text-rm-dark-grey font-semibold">Strategic Direction & Standards</p>
            </div>
          </div>
          <div className={`grid gap-3 bg-white p-4 rounded border-2 border-rm-light-grey ${
            zoomLevel === 'compact' ? 'grid-cols-4' : zoomLevel === 'detailed' ? 'grid-cols-3' : 'grid-cols-4'
          }`}>
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

        {/* Strategic Platform Section */}
        {strategicTowers.length > 0 && (
          <div className="mx-2">
            <h3 className="text-xl font-bold text-rm-blue mb-3 uppercase tracking-wide">Strategic Platform</h3>
            <div className="flex gap-4">
              {strategicTowers.map(tower => (
                <TowerContainer
                  key={tower.id}
                  tower={tower}
                  teams={teams}
                  people={people}
                  zoomLevel={zoomLevel}
                  selectedPerson={selectedPerson}
                  onSelectPerson={onSelectPerson}
                  onPersonDoubleClick={onPersonDoubleClick}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDrop={handleDrop}
                  draggedPerson={draggedPerson}
                  isAdminMode={isAdminMode}
                  onAddTeam={onAddTeam}
                />
              ))}
            </div>
          </div>
        )}

        {/* Legacy Platform Section */}
        {legacyTowers.length > 0 && (
          <div className="mx-2">
            <h3 className="text-xl font-bold text-rm-magenta mb-3 uppercase tracking-wide">Legacy Platform</h3>
            <div className="flex gap-4">
              {legacyTowers.map(tower => (
                <TowerContainer
                  key={tower.id}
                  tower={tower}
                  teams={teams}
                  people={people}
                  zoomLevel={zoomLevel}
                  selectedPerson={selectedPerson}
                  onSelectPerson={onSelectPerson}
                  onPersonDoubleClick={onPersonDoubleClick}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDrop={handleDrop}
                  draggedPerson={draggedPerson}
                  isAdminMode={isAdminMode}
                  onAddTeam={onAddTeam}
                />
              ))}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="fixed bottom-24 right-8 bg-white border-2 border-rm-light-grey rounded p-3 shadow-lg min-w-[180px] text-xs">
          <h3 className="text-[10px] font-bold uppercase tracking-wide mb-2 text-rm-black">Platforms</h3>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-rm-magenta rounded border border-rm-light-grey"></div>
              <span>Legacy (Ensono)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-rm-blue rounded border border-rm-light-grey"></div>
              <span>Strategic (Azure)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
