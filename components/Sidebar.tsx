'use client'

import { useState, useEffect } from 'react'
import type { Person } from '@/lib/types'

interface SidebarProps {
  collapsed: boolean
  selectedPerson: Person | null
  onUpdate: (person: Person) => void
  onDelete: (id: string) => void
  isAdminMode: boolean
}

export default function Sidebar({ collapsed, selectedPerson, onUpdate, onDelete, isAdminMode }: SidebarProps) {
  const [formData, setFormData] = useState<Partial<Person>>({})

  useEffect(() => {
    if (selectedPerson) {
      setFormData(selectedPerson)
    }
  }, [selectedPerson])

  if (collapsed) return null
  if (!selectedPerson) {
    return (
      <div className="w-[340px] bg-white border-r border-rm-light-grey p-6">
        <div className="bg-white border-2 border-rm-red rounded p-4 text-sm">
          <div className="font-bold text-rm-red mb-2">30-Second Guide</div>
          <div className="space-y-1 text-rm-dark-grey">
            <div><strong className="text-rm-black">Owns Outcomes:</strong> Business domains</div>
            <div><strong className="text-rm-black">Enables Flow:</strong> Orange SME bar</div>
            <div><strong className="text-rm-black">Legacy Lives:</strong> Purple (Ensono)</div>
            <div><strong className="text-rm-black">Strategic Lives:</strong> Blue (Azure)</div>
          </div>
        </div>
        <div className="mt-6 text-center text-rm-dark-grey text-sm">
          Select a person to edit
        </div>
      </div>
    )
  }

  return (
    <div className="w-[340px] bg-white border-r border-rm-light-grey p-6 overflow-y-auto">
      <h2 className="text-sm font-bold text-rm-red uppercase tracking-wide mb-4">Edit Selected</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-rm-dark-grey uppercase tracking-wide mb-2">Name</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 bg-rm-bg-grey border-2 border-rm-light-grey rounded focus:border-rm-red focus:bg-white outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-rm-dark-grey uppercase tracking-wide mb-2">Role/Title</label>
          <input
            type="text"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 bg-rm-bg-grey border-2 border-rm-light-grey rounded focus:border-rm-red focus:bg-white outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-rm-dark-grey uppercase tracking-wide mb-2">Team</label>
          <input
            type="text"
            value={formData.team || ''}
            onChange={(e) => setFormData({ ...formData, team: e.target.value })}
            className="w-full px-3 py-2 bg-rm-bg-grey border-2 border-rm-light-grey rounded focus:border-rm-red focus:bg-white outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-rm-dark-grey uppercase tracking-wide mb-2">Container</label>
          <select
            value={formData.container || ''}
            onChange={(e) => setFormData({ ...formData, container: e.target.value as any })}
            className="w-full px-3 py-2 bg-rm-bg-grey border-2 border-rm-light-grey rounded focus:border-rm-red focus:bg-white outline-none transition"
          >
            <option value="leadership">Leadership</option>
            <option value="sme">Horizontal SME</option>
            <option value="strategic-business">Strategic - Business</option>
            <option value="strategic-technology">Strategic - Technology</option>
            <option value="legacy-business">Legacy - Business</option>
            <option value="legacy-technology">Legacy - Technology</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-rm-dark-grey uppercase tracking-wide mb-2">Supplier</label>
          <select
            value={formData.supplier || ''}
            onChange={(e) => setFormData({ ...formData, supplier: e.target.value as any })}
            className="w-full px-3 py-2 bg-rm-bg-grey border-2 border-rm-light-grey rounded focus:border-rm-red focus:bg-white outline-none transition"
          >
            <option value="rmg">RMG</option>
            <option value="epam">EPAM</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-rm-dark-grey uppercase tracking-wide mb-2">Location</label>
          <select
            value={formData.location || ''}
            onChange={(e) => setFormData({ ...formData, location: e.target.value as any })}
            className="w-full px-3 py-2 bg-rm-bg-grey border-2 border-rm-light-grey rounded focus:border-rm-red focus:bg-white outline-none transition"
          >
            <option value="onshore">Onshore</option>
            <option value="nearshore">Nearshore</option>
            <option value="offshore">Offshore</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-rm-dark-grey uppercase tracking-wide mb-2">Capacity (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={formData.capacity || 100}
            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
            className="w-full px-3 py-2 bg-rm-bg-grey border-2 border-rm-light-grey rounded focus:border-rm-red focus:bg-white outline-none transition"
          />
        </div>

        {isAdminMode && (
          <>
            <div>
              <label className="block text-xs font-semibold text-rm-dark-grey uppercase tracking-wide mb-2">Commercial Rate (£/day)</label>
              <input
                type="number"
                value={formData.commercial_rate || 0}
                onChange={(e) => setFormData({ ...formData, commercial_rate: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-rm-bg-grey border-2 border-rm-light-grey rounded focus:border-rm-red focus:bg-white outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-rm-dark-grey uppercase tracking-wide mb-2">Planview</label>
              <select
                value={formData.planview || ''}
                onChange={(e) => setFormData({ ...formData, planview: e.target.value as any })}
                className="w-full px-3 py-2 bg-rm-bg-grey border-2 border-rm-light-grey rounded focus:border-rm-red focus:bg-white outline-none transition"
              >
                <option value="BAU">BAU</option>
                <option value="F_GOV">F_GOV</option>
                <option value="PR">PR</option>
              </select>
            </div>
          </>
        )}

        <button
          onClick={() => onUpdate(formData as Person)}
          className="w-full bg-rm-red border-2 border-rm-red text-white py-2 rounded font-semibold hover:bg-opacity-90 transition"
        >
          Update
        </button>

        <button
          onClick={() => {
            if (confirm(`Delete ${selectedPerson.name}?`)) {
              onDelete(selectedPerson.id)
            }
          }}
          className="w-full bg-white border-2 border-rm-light-grey text-rm-black py-2 rounded font-semibold hover:border-rm-red hover:text-rm-red transition"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
