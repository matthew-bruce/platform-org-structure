'use client'

import { useState } from 'react'
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
  const [isDropZone, setIsDropZone] = useState(false)
  
  const benchPeople = people.filter(p => p.container === 'bench' || (!p.team_id && p.container !== 'leadership' && p.container !== 'head'))
  const count = benchPeople.length

  return (
    <div 
      className={`w-full bg-white border-t-2 shadow-lg transition-all ${
        isDropZone ? 'border-rm-red bg-rm-red bg-opacity-5' : 'border-rm-light-grey'
      }`}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDropZone(true)
      }}
      onDragLeave={() => setIsDropZone(false)}
      onDrop={(e) => {
        e.preventDefault()
        setIsDropZone(false)
        // Trigger will be handled by parent
      }}
    >
      {/* Header */}
      <div 
        onClick={onToggle}
        className="flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-rm-bg-grey transition"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏖️</span>
          <div>
            <h3 className="font
