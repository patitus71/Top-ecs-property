'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import PropertyCard from '@/components/PropertyCard'
import SearchBar from '@/components/SearchBar'
import FilterBar from '@/components/FilterBar'
import { LAND_DATA, HOTEL_DATA } from '@/lib/data'
import { landToMapItem, hotelToMapItem, type MapItem } from '@/lib/mapUtils'

const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-gray-100" />,
})

type TypeFilter = 'all' | 'land' | 'hotel'
type StatusFilter = 'all' | 'Remained' | 'SOLD'

export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center text-gray-400">กำลังโหลด...</div>}>
      <ListingsInner />
    </Suspense>
  )
}

function ListingsInner() {
  const params = useSearchParams()
  const [search, setSearch] = useState(params.get('q') ?? '')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [provinceFilter, setProvinceFilter] = useState(params.get('province') ?? '')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [flyTo, setFlyTo] = useState<{ lat: number; lng: number; key: number } | null>(null)

  useEffect(() => {
    setSearch(params.get('q') ?? '')
    setProvinceFilter(params.get('province') ?? '')
  }, [params])

  const provinces = useMemo(() => {
    const set = new Set([...LAND_DATA.map(l => l.province), ...HOTEL_DATA.map(h => h.province)])
    return Array.from(set).sort()
  }, [])

  type ListItem = { id: string; type: 'land' | 'hotel'; item: typeof LAND_DATA[0] | typeof HOTEL_DATA[0] }

  const filtered = useMemo((): ListItem[] => {
    const q = search.toLowerCase()
    const lands: ListItem[] = LAND_DATA
      .filter(l =>
        (typeFilter === 'all' || typeFilter === 'land') &&
        (statusFilter === 'all' || l.status === statusFilter) &&
        (!provinceFilter || l.province === provinceFilter) &&
        (!q || l.site.toLowerCase().includes(q) || l.province.toLowerCase().includes(q) || l.team.toLowerCase().includes(q))
      )
      .map(l => ({ id: `land-${l.no}`, type: 'land', item: l }))

    const hotels: ListItem[] = HOTEL_DATA
      .filter(h =>
        (typeFilter === 'all' || typeFilter === 'hotel') &&
        (statusFilter === 'all' || h.status === statusFilter) &&
        (!provinceFilter || h.province === provinceFilter) &&
        (!q || h.project.toLowerCase().includes(q) || h.province.toLowerCase().includes(q) || h.team.toLowerCase().includes(q))
      )
      .map(h => ({ id: `hotel-${h.no}`, type: 'hotel', item: h }))

    return [...lands, ...hotels]
  }, [search, typeFilter, provinceFilter, statusFilter])

  const mapItems: MapItem[] = useMemo(() =>
    filtered
      .filter(f => f.item.lat && f.item.lng)
      .map(f => f.type === 'land' ? landToMapItem(f.item as typeof LAND_DATA[0]) : hotelToMapItem(f.item as typeof HOTEL_DATA[0])),
    [filtered]
  )

  const handleMarkerClick = (id: string) => {
    setActiveId(id)
    const item = filtered.find(f => f.id === id)
    if (item?.item.lat && item?.item.lng) {
      setFlyTo(prev => ({ lat: item.item.lat!, lng: item.item.lng!, key: (prev?.key ?? 0) + 1 }))
    }
    // Scroll card into view
    setTimeout(() => {
      document.getElementById(`card-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 100)
  }

  const handleCardClick = (entry: ListItem) => {
    setActiveId(entry.id)
    if (entry.item.lat && entry.item.lng) {
      setFlyTo(prev => ({ lat: entry.item.lat!, lng: entry.item.lng!, key: (prev?.key ?? 0) + 1 }))
    }
  }

  return (
    <div className="flex flex-col h-screen pt-16">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center z-10 shadow-sm">
        <div className="w-full sm:w-64">
          <SearchBar value={search} onChange={setSearch} placeholder="ค้นหาชื่อ จังหวัด ทีม..." />
        </div>
        <FilterBar
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          provinceFilter={provinceFilter}
          onProvinceChange={setProvinceFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          provinces={provinces}
        />
        <span className="text-xs text-gray-400 sm:ml-auto whitespace-nowrap">
          แสดง {filtered.length} / {LAND_DATA.length + HOTEL_DATA.length} รายการ
        </span>
      </div>

      {/* Split view */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-full sm:w-80 lg:w-96 flex-shrink-0 overflow-y-auto border-r border-gray-100 bg-white p-3 space-y-2">
          {filtered.map(entry => (
            <div key={entry.id} id={`card-${entry.id}`}>
              <PropertyCard
                item={entry.item}
                type={entry.type}
                compact
                active={activeId === entry.id}
                onClick={() => handleCardClick(entry)}
              />
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-2xl mb-2">🔍</p>
              <p>ไม่พบทรัพย์สินที่ตรงกัน</p>
            </div>
          )}
        </div>

        {/* Map */}
        <div className="hidden sm:block flex-1">
          <MapView
            items={mapItems}
            flyTo={flyTo}
            activeId={activeId}
            onMarkerClick={handleMarkerClick}
          />
        </div>
      </div>
    </div>
  )
}
