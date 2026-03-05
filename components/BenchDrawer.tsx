'use client'

import type { Person, ZoomLevel } from '@/lib/types'
import PersonCard from './PersonCard'

interface BenchDrawerProps {
  people: Person[]
  isOpen: boolean
  onToggle: () => void
  zoomLevel: ZoomLevel
  selectedPerson: Person | null
  onSelectPerson: (person: Person) => void
  onPersonDoubleClick: (person: Person) => void
  onDragStart: (person: Person) => void
  onDragEnd: () => void
  isAdminMode: boolean
}

export default function BenchDrawer({
  people,
  isOpen,
  onToggle,
  zoomLevel,
  selectedPerson,
  onSelectPerson,
  onPersonDoubleClick,
  onDragStart,
  onDragEnd,
  isAdminMode
}: BenchDrawerProps) {
  const benchPeople = people.filter(p => p.container === 'bench' || (!p.team_id && p.container !== 'leadership' && p.container !== 'head'))
  const count = benchPeople.length

  return (
    <div className="w-full bg-white border-t-2 border-rm-light-grey shadow-lg">
      {/* Header */}
      <div 
        onClick={onToggle}
        className="flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-rm-bg-grey transition"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏖️</span>
          <div>
            <h3 className="font-bold text-rm-black text-sm">Bench</h3>
            <p className="text-xs text-rm-dark-grey">
              {count === 0 ? 'Empty' : `${count} unassigned ${count === 1 ? 'person' : 'people'}`}
            </p>
          </div>
        </div>
        <button className="text-rm-dark-grey hover:text-rm-red transition text-xl font-bold">
          {isOpen ? '▼' : '▲'}
        </button>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="px-6 py-4 max-h-64 overflow-y-auto border-t border-rm-light-grey bg-rm-bg-grey">
          {count === 0 ? (
            <div className="text-center py-8 text-rm-dark-grey text-sm">
              No people on the bench. All resources are assigned!
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {benchPeople.map(person => (
                <PersonCard
                  key={person.id}
                  person={person}
                  zoomLevel={zoomLevel}
                  isSelected={selectedPerson?.id === person.id}
                  onClick={() => onSelectPerson(person)}
                  onDoubleClick={() => onPersonDoubleClick(person)}
                  onDragStart={(e) => {
                    onDragStart(person)
                  }}
                  onDragEnd={onDragEnd}
                  isAdminMode={isAdminMode}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
