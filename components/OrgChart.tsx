'use client'

import { useState } from 'react'
import type { Person, ZoomLevel, Container } from '@/lib/types'
import PersonCard from './PersonCard'

interface OrgChartProps {
  people: Person[]
  zoomLevel: ZoomLevel
  selectedPerson: Person | null
  onSelectPerson: (person: Person | null) => void
  onUpdatePerson: (person: Person) => void
  isAdminMode: boolean
}

export default function OrgChart({
  people,
  zoomLevel,
  selectedPerson,
  onSelectPerson,
  onUpdatePerson,
  isAdminMode
}: OrgChartProps) {
  const [draggedPerson, setDraggedPerson] = useState<Person | null>(null)
  const [dropTarget, setDropTarget] = useState<Container | null>(null)

  const groupByContainer = (container: Container) => people.filter(p => p.container === container)
  const groupByTeam = (container: Container) => {
    const containerPeople = groupByContainer(container)
    const teams: Record<string, Person[]> = {}
    containerPeople.forEach(person => {
      const teamName = person.team || 'Ungrouped'
      if (!teams[teamName]) teams[teamName] = []
      teams[teamName].push(person)
    })
    return teams
  }

  const handleDragStart = (person: Person) => (e: React.DragEvent) => {
    setDraggedPerson(person)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnd = () => {
    setDraggedPerson(null)
    setDropTarget(null)
  }

  const handleDragOver = (container: Container) => (e: React.DragEvent) => {
    e.preventDefault()
    setDropTarget(container)
  }

  const handleDragLeave = () => {
    setDropTarget(null)
  }

  const handleDrop = (container: Container) => (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedPerson && draggedPerson.container !== container) {
      const updatedPerson = { ...draggedPerson, container }
      onUpdatePerson(updatedPerson)
    }
    setDraggedPerson(null)
    setDropTarget(null)
  }

  const leadership = groupByContainer('leadership')
  const smes = groupByContainer('sme')
  const strategicBusinessTeams = groupByTeam('strategic-business')
  const strategicTechTeams = groupByTeam('strategic-technology')
  const legacyBusinessTeams = groupByTeam('legacy-business')
  const legacyTechTeams = groupByTeam('legacy-technology')

  return (
    <div className="flex-1 overflow-auto bg-rm-bg-grey p-8">
      <div className="flex flex-col gap-8 min-w-full">
        {/* Leadership */}
        <div className="flex justify-center p-4">
          {leadership.map(person => (
            <PersonCard
              key={person.id}
              person={person}
              zoomLevel={zoomLevel}
              isSelected={selectedPerson?.id === person.id}
              onClick={() => onSelectPerson(person)}
              onDragStart={handleDragStart(person)}
              onDragEnd={handleDragEnd}
              isAdminMode={isAdminMode}
            />
          ))}
        </div>

        {/* SME Horizontal Bar */}
        <div className="border-3 border-rm-orange rounded-lg p-6 mx-4 bg-opacity-5 bg-rm-orange">
          <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-rm-light-grey">
            <div>
              <h2 className="text-lg font-bold text-rm-orange uppercase tracking-wide">Horizontal SMEs</h2>
              <p className="text-sm text-rm-dark-grey font-semibold">Enables Flow & Standards</p>
            </div>
          </div>
          <div
            className={`grid gap-4 bg-white p-4 rounded border-2 border-rm-light-grey ${
              dropTarget === 'sme' ? 'bg-rm-red bg-opacity-10 border-rm-red border-dashed' : ''
            }`}
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}
            onDragOver={handleDragOver('sme')}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop('sme')}
          >
            {smes.map(person => (
              <PersonCard
                key={person.id}
                person={person}
                zoomLevel={zoomLevel}
                isSelected={selectedPerson?.id === person.id}
                onClick={() => onSelectPerson(person)}
                onDragStart={handleDragStart(person)}
                onDragEnd={handleDragEnd}
                isAdminMode={isAdminMode}
              />
            ))}
          </div>
        </div>

        {/* Platform Containers */}
        <div className="flex gap-8 px-4">
          {/* Strategic Platform */}
          <div className="flex-1 border-3 border-rm-blue rounded-lg p-6 bg-rm-blue bg-opacity-5">
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-rm-light-grey">
              <div>
                <h2 className="text-xl font-bold text-rm-blue uppercase tracking-wide">Strategic Platform</h2>
                <p className="text-sm text-rm-dark-grey font-semibold">Azure Cloud</p>
              </div>
            </div>

            <div className="flex gap-6">
              {/* Business Domain */}
              <div className="flex-1 bg-white border-2 border-rm-light-grey rounded p-4">
                <h3 className="text-sm font-bold text-rm-dark-grey uppercase tracking-wide mb-4 pb-2 border-b border-rm-light-grey">
                  Business (Owns Outcomes)
                </h3>
                <div
                  className={`space-y-4 ${
                    dropTarget === 'strategic-business' ? 'bg-rm-red bg-opacity-10 border-2 border-rm-red border-dashed rounded p-2' : ''
                  }`}
                  onDragOver={handleDragOver('strategic-business')}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop('strategic-business')}
                >
                  {Object.entries(strategicBusinessTeams).map(([teamName, members]) => (
                    <div key={teamName} className="bg-rm-bg-grey border border-rm-light-grey rounded p-3">
                      <div className="font-bold text-sm text-rm-black mb-3 pb-2 border-b border-rm-light-grey">{teamName}</div>
                      <div className="space-y-2">
                        {members.map(person => (
                          <PersonCard
                            key={person.id}
                            person={person}
                            zoomLevel={zoomLevel}
                            isSelected={selectedPerson?.id === person.id}
                            onClick={() => onSelectPerson(person)}
                            onDragStart={handleDragStart(person)}
                            onDragEnd={handleDragEnd}
                            isAdminMode={isAdminMode}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Domain */}
              <div className="flex-1 bg-white border-2 border-rm-light-grey rounded p-4">
                <h3 className="text-sm font-bold text-rm-dark-grey uppercase tracking-wide mb-4 pb-2 border-b border-rm-light-grey">
                  Technology (Platform)
                </h3>
                <div
                  className={`space-y-4 ${
                    dropTarget === 'strategic-technology' ? 'bg-rm-red bg-opacity-10 border-2 border-rm-red border-dashed rounded p-2' : ''
                  }`}
                  onDragOver={handleDragOver('strategic-technology')}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop('strategic-technology')}
                >
                  {Object.entries(strategicTechTeams).map(([teamName, members]) => (
                    <div key={teamName} className="bg-rm-bg-grey border border-rm-light-grey rounded p-3">
                      <div className="font-bold text-sm text-rm-black mb-3 pb-2 border-b border-rm-light-grey">{teamName}</div>
                      <div className="space-y-2">
                        {members.map(person => (
                          <PersonCard
                            key={person.id}
                            person={person}
                            zoomLevel={zoomLevel}
                            isSelected={selectedPerson?.id === person.id}
                            onClick={() => onSelectPerson(person)}
                            onDragStart={handleDragStart(person)}
                            onDragEnd={handleDragEnd}
                            isAdminMode={isAdminMode}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Legacy Platform */}
          <div className="flex-1 border-3 border-rm-magenta rounded-lg p-6 bg-rm-magenta bg-opacity-5">
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-rm-light-grey">
              <div>
                <h2 className="text-xl font-bold text-rm-magenta uppercase tracking-wide">Legacy Platform</h2>
                <p className="text-sm text-rm-dark-grey font-semibold">Ensono Data Center</p>
              </div>
            </div>

            <div className="flex gap-6">
              {/* Business Domain */}
              <div className="flex-1 bg-white border-2 border-rm-light-grey rounded p-4">
                <h3 className="text-sm font-bold text-rm-dark-grey uppercase tracking-wide mb-4 pb-2 border-b border-rm-light-grey">
                  Business
                </h3>
                <div
                  className={`space-y-4 ${
                    dropTarget === 'legacy-business' ? 'bg-rm-red bg-opacity-10 border-2 border-rm-red border-dashed rounded p-2' : ''
                  }`}
                  onDragOver={handleDragOver('legacy-business')}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop('legacy-business')}
                >
                  {Object.entries(legacyBusinessTeams).map(([teamName, members]) => (
                    <div key={teamName} className="bg-rm-bg-grey border border-rm-light-grey rounded p-3">
                      <div className="font-bold text-sm text-rm-black mb-3 pb-2 border-b border-rm-light-grey">{teamName}</div>
                      <div className="space-y-2">
                        {members.map(person => (
                          <PersonCard
                            key={person.id}
                            person={person}
                            zoomLevel={zoomLevel}
                            isSelected={selectedPerson?.id === person.id}
                            onClick={() => onSelectPerson(person)}
                            onDragStart={handleDragStart(person)}
                            onDragEnd={handleDragEnd}
                            isAdminMode={isAdminMode}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Domain */}
              <div className="flex-1 bg-white border-2 border-rm-light-grey rounded p-4">
                <h3 className="text-sm font-bold text-rm-dark-grey uppercase tracking-wide mb-4 pb-2 border-b border-rm-light-grey">
                  Technology (Platform)
                </h3>
                <div
                  className={`space-y-4 ${
                    dropTarget === 'legacy-technology' ? 'bg-rm-red bg-opacity-10 border-2 border-rm-red border-dashed rounded p-2' : ''
                  }`}
                  onDragOver={handleDragOver('legacy-technology')}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop('legacy-technology')}
                >
                  {Object.entries(legacyTechTeams).map(([teamName, members]) => (
                    <div key={teamName} className="bg-rm-bg-grey border border-rm-light-grey rounded p-3">
                      <div className="font-bold text-sm text-rm-black mb-3 pb-2 border-b border-rm-light-grey">{teamName}</div>
                      <div className="space-y-2">
                        {members.map(person => (
                          <PersonCard
                            key={person.id}
                            person={person}
                            zoomLevel={zoomLevel}
                            isSelected={selectedPerson?.id === person.id}
                            onClick={() => onSelectPerson(person)}
                            onDragStart={handleDragStart(person)}
                            onDragEnd={handleDragEnd}
                            isAdminMode={isAdminMode}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="fixed bottom-8 right-8 bg-white border-2 border-rm-light-grey rounded p-4 shadow-lg min-w-[200px]">
        <h3 className="text-xs font-bold uppercase tracking-wide mb-3 text-rm-black">Platforms</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-rm-magenta rounded border border-rm-light-grey"></div>
            <span>Legacy (Ensono)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-rm-blue rounded border border-rm-light-grey"></div>
            <span>Strategic (Azure)</span>
          </div>
        </div>
        <div className="h-px bg-rm-light-grey my-3"></div>
        <h3 className="text-xs font-bold uppercase tracking-wide mb-3 text-rm-black">Suppliers</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-rm-red rounded-full border border-rm-light-grey"></div>
            <span>RMG</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-rm-orange rounded-full border border-rm-light-grey"></div>
            <span>EPAM</span>
          </div>
        </div>
      </div>
    </div>
  )
}
