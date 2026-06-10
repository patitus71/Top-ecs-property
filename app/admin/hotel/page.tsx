'use client'

import { useState, useMemo } from 'react'
import AdminTable from '@/components/admin/AdminTable'
import EditModal from '@/components/admin/EditModal'
import StatsBar from '@/components/admin/StatsBar'
import { HOTEL_DATA, type Hotel } from '@/lib/data'
import { updateRow, appendRow, deleteRow } from '@/lib/sheets'

const HOTEL_FIELDS = [
  { key: 'project', label: 'ชื่อโรงแรม' },
  { key: 'team', label: 'ทีม' },
  { key: 'province', label: 'จังหวัด' },
  { key: 'price', label: 'ราคา (เช่น 1,400 MB)' },
  { key: 'towers', label: 'จำนวนตึก', type: 'number' as const },
  { key: 'storeys', label: 'จำนวนชั้น', type: 'number' as const },
  { key: 'keys', label: 'จำนวนห้อง' },
  { key: 'facilities', label: 'สิ่งอำนวยความสะดวก' },
  { key: 'type', label: 'ประเภท', type: 'select' as const, options: ['FREEHOLD', 'LEASEHOLD'] },
  { key: 'rai', label: 'ไร่', type: 'number' as const },
  { key: 'ngan', label: 'งาน', type: 'number' as const },
  { key: 'sqwa', label: 'ตร.วา', type: 'number' as const },
  { key: 'totalSqwa', label: 'รวม ตร.วา', type: 'number' as const },
  { key: 'permits', label: 'ใบอนุญาต' },
  { key: 'status', label: 'สถานะ', type: 'select' as const, options: ['Remained', 'SOLD'] },
  { key: 'lat', label: 'Latitude', type: 'number' as const },
  { key: 'lng', label: 'Longitude', type: 'number' as const },
]

export default function AdminHotelPage() {
  const [data, setData] = useState<Hotel[]>(HOTEL_DATA)
  const [search, setSearch] = useState('')
  const [provinceFilter, setProvinceFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [editTarget, setEditTarget] = useState<Hotel | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const provinces = useMemo(() => Array.from(new Set(data.map(h => h.province))).sort(), [data])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return data.filter(h =>
      (!provinceFilter || h.province === provinceFilter) &&
      (!statusFilter || h.status === statusFilter) &&
      (!q || h.project.toLowerCase().includes(q) || h.province.toLowerCase().includes(q))
    )
  }, [data, search, provinceFilter, statusFilter])

  const handleSave = async (updated: Record<string, unknown>) => {
    const hotel = updated as unknown as Hotel
    if (isAdding) {
      const newHotel = { ...hotel, no: Math.max(...data.map(h => h.no)) + 1 }
      setData(d => [...d, newHotel])
      await appendRow('ALL HOTEL', Object.values(newHotel))
    } else {
      setData(d => d.map(h => h.no === hotel.no ? hotel : h))
      await updateRow('ALL HOTEL', hotel.no + 1, Object.values(hotel))
    }
    setEditTarget(null)
    setIsAdding(false)
  }

  const handleDelete = async (row: Hotel) => {
    if (!confirm(`ยืนยันลบ "${row.project}"?`)) return
    setData(d => d.filter(h => h.no !== row.no))
    await deleteRow('ALL HOTEL', row.no + 1)
  }

  const columns = [
    { key: 'no' as const, label: 'No', className: 'w-10' },
    { key: 'project' as const, label: 'ชื่อโรงแรม', className: 'min-w-[180px]' },
    { key: 'province' as const, label: 'จังหวัด' },
    { key: 'price' as const, label: 'ราคา', className: 'text-gold font-semibold' },
    { key: 'type' as const, label: 'ประเภท', render: (v: unknown) => (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${v === 'LEASEHOLD' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{String(v)}</span>
    )},
    { key: 'storeys' as const, label: 'ชั้น' },
    { key: 'keys' as const, label: 'ห้อง' },
    {
      key: 'status' as const, label: 'สถานะ',
      render: (v: unknown) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${v === 'SOLD' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {String(v)}
        </span>
      ),
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0B2540', fontFamily: 'var(--font-display)' }}>จัดการโรงแรม</h1>
          <p className="text-gray-400 text-sm">ALL HOTEL — {data.length} โรงแรม</p>
        </div>
        <button
          onClick={() => { setIsAdding(true); setEditTarget({} as Hotel) }}
          className="px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#C9A84C', color: '#0B2540' }}
        >+ เพิ่มโรงแรม</button>
      </div>

      <StatsBar stats={[
        { label: 'ทั้งหมด', value: data.length },
        { label: 'ยังขายอยู่', value: data.filter(h => h.status === 'Remained').length, color: 'text-green-property' },
        { label: 'SOLD', value: data.filter(h => h.status === 'SOLD').length, color: 'text-red-sold' },
      ]} />

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="ค้นหา..."
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold"
        />
        <select value={provinceFilter} onChange={e => setProvinceFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
          <option value="">ทุกจังหวัด</option>
          {provinces.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
          <option value="">ทุกสถานะ</option>
          <option value="Remained">Remained</option>
          <option value="SOLD">SOLD</option>
        </select>
      </div>

      <AdminTable
        columns={columns}
        data={filtered}
        onEdit={row => { setIsAdding(false); setEditTarget(row) }}
        onDelete={handleDelete}
        rowKey="no"
      />

      <EditModal
        isOpen={!!editTarget}
        title={isAdding ? 'เพิ่มโรงแรมใหม่' : `แก้ไข: ${editTarget?.project ?? ''}`}
        fields={HOTEL_FIELDS}
        initialData={(editTarget ?? {}) as Record<string, unknown>}
        onSave={handleSave}
        onClose={() => { setEditTarget(null); setIsAdding(false) }}
      />
    </div>
  )
}
