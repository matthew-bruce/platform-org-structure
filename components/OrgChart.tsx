'use client'

import { useState } from 'react'
import type { Person, Team, Initiative, Platform, ZoomLevel } from '@/lib/types'
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
      initiative_id: initiativeId,
      container: teamId ? 'team' : 'bench'
    }

    onUpdatePerson(updatedPerson)
    setDraggedPerson(null)
  }

  const head = people.filter(p => p.container === 'head').sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
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
