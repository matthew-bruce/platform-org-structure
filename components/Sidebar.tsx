'use client'

import { useState, useEffect } from 'react'
import type { Person, Team, Tower } from '@/lib/types'
import { SUPPLIER_CONFIGS } from '@/lib/types'

interface SidebarProps {
  collapsed: boolean
  selectedPerson: Person | null
  teams: Team[]
  towers: Tower[]
  onUpdate: (person: Person) => void
  onDelete: (id: string) => void
  isAdminMode: boolean
}

export default function Sidebar({ 
  collapsed, 
  selectedPerson, 
  teams,
  towers,
  onUpdate, 
  onDelete, 
  isAdminMode 
}: SidebarProps) {
  const [formData, setFormData] = useState<Partial<Person>>({})

  useEffect(() => {
    if (selectedPerson) {
      setFormData(selectedPerson)
    }
  }, [selectedPerson])

  if (collapsed) return null
  
  if (!selectedPerson) {
    return (
      <div className="w-[340px] bg-white border-r border-rm-light-grey p-6 overflow-y-auto">
        <div className="bg-white border-2 border-rm-red rounded p-4 text-sm">
          <div className="font-bold text-rm-red mb-2">30-Second Guide</div>
          <div className="space-y-1 text-rm-dark-grey text-xs">
            <div><strong className="text-rm-black">Owns Outcomes:</strong> Product teams</div>
            <div><strong className="text-rm-black">Enables Flow:</strong> Leadership & Tower SMEs</div>
            <div><strong className="text-rm-black">Legacy:</strong> Purple towers (Ensono)</div>
            <div><strong className="text-rm-black">Strategic:</strong> Blue towers (Azure)</div>
          </div>
        </div>
        <div className="mt-6 text-center text-rm-dark-grey text-sm">
          Click a person to edit<br/>
          <span className="text-xs">(Double-click to edit in-place)</span>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[340px] bg-white border-r border-rm-light-grey p-6 overflow-y-auto">
      <h2 className="text-sm font-bold text-rm-red uppercase tracking-wide mb-4">Edit Person</h2>
      
      <div className="space-y-3">
        <div>
          <label className="block text-[10px] font-semibold text-rm-dark-grey uppercase tracking-wide mb-1.5">Name</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-rm-bg-grey border-2 border-rm-light-grey rounded focus:border-rm-red focus:bg-white outline-none transition"
          />
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-rm-dark-grey uppercase tracking-wide mb-1.5">Role/Title</label>
          <input
            type="text"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-rm-bg-grey border-2 border-rm-light-grey rounded focus:border-rm-red focus:bg-white outline-none transition"
          />
        </div>

        {formData.container !== 'leadership' && (
          <>
            <div>
              <label className="block text-[10px] font-semibold text-rm-dark-grey uppercase tracking-wide mb-1.5">Team</label>
              <select
                value={formData.team_id || ''}
                onChange={(e) => {
                  const teamId = e.target.value
                  const team = teams.find(t => t.id === teamId)
                  setFormData({ 
                    ...formData, 
                    team_id: teamId || null,
                    tower_id: team?.tower_id || null,
                    container: teamId ? 'team' : 'bench'
                  })
                }}
                className="w-full px-3 py-2 text-sm bg-rm-bg-grey border-2 border-rm-light-grey rounded focus:border-rm-red focus:bg-white outline-none transition"
              >
                <option value="">Bench (Unassigned)</option>
                {towers.map(tower => (
                  <optgroup key={tower.id} label={`${tower.name} (${tower.platform})`}>
                    {teams.filter(t => t.tower_id === tower.id).map(team => (
                      <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isTowerSME"
                checked={formData.is_tower_sme || false}
                onChange={(e) => setFormData({ ...formData, is_tower_sme: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="isTowerSME" className="text-xs text-rm-dark-grey">
                Tower SME (supports all teams in tower)
              </label>
            </div>
          </>
        )}

        <div>
          <label className="block text-[10px] font-semibold text-rm-dark-grey uppercase tracking-wide mb-1.5">Supplier</label>
          <select
            value={formData.supplier || ''}
            onChange={(e) => setFormData({ ...formData, supplier: e.target.value as any })}
            className="w-full px-3 py-2 text-sm bg-rm-bg-grey border-2 border-rm-light-grey rounded focus:border-rm-red focus:bg-white outline-none transition"
          >
            {Object.values(SUPPLIER_CONFIGS).map(supplier => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.abbreviation} - {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-rm-dark-grey uppercase tracking-wide mb-1.5">Location</label>
          <select
            value={formData.location || ''}
            onChange={(e) => setFormData({ ...formData, location: e.target.value as any })}
            className="w-full px-3 py-2 text-sm bg-rm-bg-grey border-2 border-rm-light-grey rounded focus:border-rm-red focus:bg-white outline-none transition"
          >
            <option value="onshore">Onshore</option>
            <option value="nearshore">Nearshore</option>
            <option value="offshore">Offshore</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-rm-dark-grey uppercase tracking-wide mb-1.5">Capacity (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={formData.capacity || 100}
            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 text-sm bg-rm-bg-grey border-2 border-rm-light-grey rounded focus:border-rm-red focus:bg-white outline-none transition"
          />
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-rm-dark-grey uppercase tracking-wide mb-1.5">Planview</label>
          <select
            value={formData.planview || 'PR'}
            onChange={(e) => setFormData({ ...formData, planview: e.target.value as any })}
            className="w-full px-3 py-2 text-sm bg-rm-bg-grey border-2 border-rm-light-grey rounded focus:border-rm-red focus:bg-white outline-none transition"
          >
            <option value="PR">PR</option>
            <option value="F_GOV">F_GOV</option>
            <option value="BAU">BAU</option>
          </select>
        </div>

        {isAdminMode && (
          <div>
            <label className="block text-[10px] font-semibold text-rm-dark-grey uppercase tracking-wide mb-1.5">Commercial Rate (£/day)</label>
            <input
              type="number"
              value={formData.commercial_rate || 0}
              onChange={(e) => setFormData({ ...formData, commercial_rate: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 text-sm bg-rm-bg-grey border-2 border-rm-light-grey rounded focus:border-rm-red focus:bg-white outline-none transition"
            />
          </div>
        )}

        <button
          onClick={() => onUpdate(formData as Person)}
          className="w-full bg-rm-red border-2 border-rm-red text-white py-2.5 rounded font-semibold hover:bg-opacity-90 transition text-sm"
        >
          Update Person
        </button>

        <button
          onClick={() => {
            if (confirm(`Delete ${selectedPerson.name}?`)) {
              onDelete(selectedPerson.id)
            }
          }}
          className="w-full bg-white border-2 border-rm-light-grey text-rm-black py-2.5 rounded font-semibold hover:border-rm-red hover:text-rm-red transition text-sm"
        >
          Delete Person
        </button>
      </div>
    </div>
  )
}
