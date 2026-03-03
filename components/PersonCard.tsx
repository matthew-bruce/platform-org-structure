'use client'

import type { Person, ZoomLevel } from '@/lib/types'

interface PersonCardProps {
  person: Person
  zoomLevel: ZoomLevel
  isSelected: boolean
  onClick: () => void
  onDragStart: (e: React.DragEvent) => void
  onDragEnd: () => void
  isAdminMode: boolean
}

export default function PersonCard({
  person,
  zoomLevel,
  isSelected,
  onClick,
  onDragStart,
  onDragEnd,
  isAdminMode
}: PersonCardProps) {
  const initials = person.name.split(' ').map(n => n[0]).join('')
  const isCompact = zoomLevel === 'compact'
  const isNormal = zoomLevel === 'normal'
  const isDetailed = zoomLevel === 'detailed'

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
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
              backgroundColor: `${person.color}20`,
              color: person.color,
              border: `2px solid ${person.color}`,
            }}
          >
            {initials}
          </div>
        )}

        <div className="flex-1 min-w-0">
          {!isNormal && (
            <div className={`font-bold text-rm-black ${isCompact ? 'text-xs' : isDetailed ? 'text-base' : 'text-sm'}`}>
              {person.name}
            </div>
          )}
          <div className={`text-rm-dark-grey ${isCompact ? 'text-xs' : isDetailed ? 'text-sm' : 'text-xs'}`}>
            {person.title}
          </div>

          {!isCompact && (
            <div className="flex flex-wrap gap-1 mt-2">
              <span className={`inline-block px-2 py-0.5 rounded text-white font-bold uppercase ${isDetailed ? 'text-xs' : 'text-[10px]'} ${
                person.supplier === 'rmg' ? 'bg-rm-red' : 'bg-rm-orange'
              }`}>
                {person.supplier.toUpperCase()}
              </span>
              <span className={`inline-block px-2 py-0.5 rounded text-white font-bold uppercase ${isDetailed ? 'text-xs' : 'text-[10px]'} ${
                person.location === 'onshore' ? 'bg-rm-blue' : person.location === 'nearshore' ? 'bg-rm-dark-grey' : 'bg-rm-light-grey text-rm-black'
              }`}>
                {person.location}
              </span>
              {isDetailed && (
                <>
                  <span className="inline-block px-2 py-0.5 rounded bg-rm-bg-grey text-rm-dark-grey text-xs font-semibold">
                    {person.capacity}%
                  </span>
                  {isAdminMode && (
                    <>
                      <span className="inline-block px-2 py-0.5 rounded bg-rm-bg-grey text-rm-dark-grey text-xs font-semibold">
                        £{person.commercial_rate}/day
                      </span>
                      <span className="inline-block px-2 py-0.5 rounded bg-rm-bg-grey text-rm-dark-grey text-xs font-semibold">
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
            className="w-3 h-3 rounded-full border-2 border-white shadow-sm flex-shrink-0"
            style={{ backgroundColor: person.supplier === 'rmg' ? '#DA202A' : '#D24713' }}
          />
        )}
      </div>
    </div>
  )
}
