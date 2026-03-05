'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Person, Team, Platform, Initiative, ZoomLevel } from '@/lib/types'
import OrgChart from '@/components/OrgChart'
import Sidebar from '@/components/Sidebar'
import AdminMode from '@/components/AdminMode'
import BenchDrawer from '@/components/BenchDrawer'

export default function Home() {
  const [people, setPeople] = useState<Person[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [initiatives, setInitiatives] = useState<Initiative[]>([])
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>('normal')
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [benchOpen, setBenchOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllData()
  }, [])

  async function fetchAllData() {
    setLoading(true)
    await Promise.all([
      fetchPeople(),
      fetchTeams(),
      fetchInitiatives(),
      fetchPlatforms()
    ])
    setLoading(false)
  }

  async function fetchPeople() {
    const { data, error } = await supabase
      .from('people')
      .select('*')
      .order('sort_order', { ascending: true })
    
    if (error) {
      console.error('Error fetching people:', error)
    } else {
      setPeople(data || [])
    }
  }

  async function fetchTeams() {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('sort_order', { ascending: true })
    
    if (error) {
      console.error('Error fetching teams:', error)
    } else {
      setTeams(data || [])
    }
  }

  async function fetchInitiatives() {
    const { data, error } = await supabase
      .from('initiatives')
      .select('*')
      .order('sort_order', { ascending: true })
    
    if (error) {
      console.error('Error fetching initiatives:', error)
    } else {
      setInitiatives(data || [])
    }
  }

  async function fetchPlatforms() {
    const { data, error } = await supabase
      .from('platforms')
      .select('*')
      .order('sort_order', { ascending: true })
    
    if (error) {
      console.error('Error fetching platforms:', error)
    } else {
      setPlatforms(data || [])
    }
  }

  async function updatePerson(person: Person) {
    const { error } = await supabase
      .from('people')
      .update({
        name: person.name,
        title: person.title,
        container: person.container,
        supplier: person.supplier,
        location: person.location,
        capacity: person.capacity,
        commercial_rate: person.commercial_rate,
        planview: person.planview,
        team_id: person.team_id,
        initiative_id: person.initiative_id,
        is_shared_sme: person.is_shared_sme,
        sort_order: person.sort_order,
        color: person.color,
        updated_at: new Date().toISOString()
      })
      .eq('id', person.id)

    if (error) {
      console.error(
