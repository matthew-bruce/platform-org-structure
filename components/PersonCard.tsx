'use client'

import { useState } from 'react'
import type { Person, ZoomLevel } from '@/lib/types'
import { SUPPLIER_CONFIGS } from '@/lib/types'

interface PersonCardProps {
  person: Person
  zoomLevel: ZoomLevel
  isSelected: boolean
  onClick: () => void
  onDoubleClick: () => void
  onDragStart: (e: React.DragEvent) => void
  onDragEnd: () => void
  isAdminMode: boolean
}

export default function PersonCard({
  person,
  zoomLevel,
  isSelected,
  onClick,
  onDoubleClick,
  onDragStart,
  onDragEnd,
  isAdminMode
}: PersonCardProps) {
  const initials = person.name.split(' ').map(n => n[0]).join('')
  const isCompact = zoomLevel === 'compact'
  const isNormal = zoomLevel === 'normal'
  const isDetailed = zoomLevel === 'detailed'
  
  const supplierConfig = SUPPLIER_CONFIGS[person.supplier]

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={`bg-white border-2 rounded cursor-grab active:cursor-grabbing transition-all ${
        isSelected ? 'border-rm-red shadow-lg shadow-rm-red/20' : 'border-rm-light-grey hover:border-rm-red hover:shadow-md'
      } ${isCompact ? 'p-2' : isDetailed ? 'p-3' : 'p-2.5'}`}
    >
      <div className="flex items-start gap-2">
        {!isCompact && (
          <div
            className={`rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
              isDetailed ? 'w-10 h-10 text-sm' : 'w-8 h-8 text-xs'
            }`}
            style={{
              backgroundColor: `${supplierConfig.color}15`,
              color: supplierConfig.color,
              border: `2px solid ${supplierConfig.color}`,
            }}
          >
            {initials}
          </div>
        )}

        <div className="flex-1 min-w-0">
          {!isNormal && (
            <div className={`font-bold text-rm-black truncate ${isCompact ? 'text-xs' : isDetailed ? 'text-sm' : 'text-xs'}`}>
              {person.name}
            </div>
          )}
          <div className={`text-rm-dark-grey truncate ${isCompact ? 'text-[10px]' : isDetailed ? 'text-xs' : 'text-[11px]'}`}>
            {person.title}
          </div>

          {!isCompact && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              <span 
                className={`inline-block px-1.5 py-0.5 rounded text-white font-bold uppercase ${isDetailed ? 'text-[10px]' : 'text-[9px]'}`}
                style={{ backgroundColor: supplierConfig.color }}
              >
                {supplierConfig.abbreviation}
              </span>
              
              {isDetailed && (
                <>
                  <span className={`inline-block px-1.5 py-0.5 rounded font-semibold text-[9px] ${
                    person.location === 'onshore' ? 'bg-rm-blue text-white' : 
                    person.location === 'nearshore' ? 'bg-rm-dark-grey text-white' : 
                    'bg-rm-light-grey text-rm-black'
                  }`}>
                    {person.location.toUpperCase()}
                  </span>
                  <span className="inline-block px-1.5 py-0.5 rounded bg-rm-bg-grey text-rm-dark-grey text-[9px] font-semibold">
                    {person.capacity}%
                  </span>
                  {isAdminMode && (
                    <>
                      <span className="inline-block px-1.5 py-0.5 rounded bg-rm-bg-grey text-rm-dark-grey text-[9px] font-semibold">
                        £{person.commercial_rate}
                      </span>
                      <span className="inline-block px-1.5 py-0.5 rounded bg-rm-bg-grey text-rm-dark-grey text-[9px] font-semibold">
                        {person.planview}
                      </span>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {!isCompact && (
          <div
            className="w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm flex-shrink-0 mt-0.5"
            style={{ backgroundColor: supplierConfig.color }}
          />
        )}
      </div>
    </div>
  )
}
