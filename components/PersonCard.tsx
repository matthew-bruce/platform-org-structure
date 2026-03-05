'use client'

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
      } ${isCompact ? 'p-2' : isDetailed ? 'p-4' : 'p-3'}`}
    >
      <div className="flex items-start gap-3">
        {!isCompact && (
          <div
            className={`rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
              isDetailed ? 'w-11 h-11 text-base' : 'w-9 h-9 text-sm'
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

        {isCompact && (
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-xs"
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
          {/* COMPACT: Just title */}
          {isCompact && (
            <div className="text-rm-dark-grey truncate text-[10px]">
              {person.title}
            </div>
          )}

          {/* NORMAL: Full name, title, capacity */}
          {isNormal && (
            <>
              <div className="font-bold text-rm-black truncate text-sm">
                {person.name}
              </div>
              <div className="text-rm-dark-grey truncate text-xs">
                {person.title}
              </div>
              <div className="text-rm-dark-grey text-[10px] mt-1">
                {person.capacity}% capacity
              </div>
            </>
          )}

          {/* DETAILED: Everything */}
          {isDetailed && (
            <>
              <div className="font-bold text-rm-black truncate text-base">
                {person.name}
              </div>
              <div className="text-rm-dark-grey truncate text-xs">
                {person.title}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {/* Supplier pill - colored */}
                <span 
                  className="inline-block px-2 py-0.5 rounded text-white font-bold uppercase text-[10px]"
                  style={{ backgroundColor: supplierConfig.color }}
                >
                  {supplierConfig.abbreviation}
                </span>
                
                {/* Location - grey styling */}
                <span className="inline-block px-2 py-0.5 rounded bg-rm-bg-grey text-rm-dark-grey text-[9px] font-semibold uppercase">
                  {person.location}
                </span>
                
                <span className="inline-block px-2 py-0.5 rounded bg-rm-bg-grey text-rm-dark-grey text-[9px] font-semibold">
                  {person.capacity}%
                </span>
                
                {isAdminMode && (
                  <>
                    <span className="inline-block px-2 py-0.5 rounded bg-rm-bg-grey text-rm-dark-grey text-[9px] font-semibold">
                      £{person.commercial_rate}
                    </span>
                    <span className="inline-block px-2 py-0.5 rounded bg-rm-bg-grey text-rm-dark-grey text-[9px] font-semibold">
                      {person.planview}
                    </span>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {!isCompact && (
          <div
            className="w-3 h-3 rounded-full border-2 border-white shadow-sm flex-shrink-0 mt-0.5"
            style={{ backgroundColor: supplierConfig.color }}
          />
        )}
      </div>
    </div>
  )
}
