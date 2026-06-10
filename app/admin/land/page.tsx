'use client'

import { useState, useMemo, useEffect } from 'react'
import AdminTable from '@/components/admin/AdminTable'
import EditModal from '@/components/admin/EditModal'
import StatsBar from '@/components/admin/StatsBar'
import { LAND_DATA, type LandPlot, formatMB } from '@/lib/data'
import { fetchLandData } from '@/lib/fetchData'
import { updateRow, appendRow, deleteRow } from '@/lib/sheets'

const LAND_FIELDS = [
  { key: 'site', label: 'ชื่อทรัพย์' },
  { key: 'team', label: 'ทีม' },
  { key: 'province', label: 'จังหวัด' },
  { key: 'zoning', label: 'Zoning' },
  { key: 'rai', label: 'ไร่', type: 'number' as const },
  { key: 'ngan', label: 'งาน', type: 'number' as const },
  { key: 'sqwa', label: 'ตร.วา', type: 'number' as const },
  { key: 'totalSqwa', label: 'รวม ตร.วา', type: 'number' as const },
  { key: 'pricePerSqwa', label: 'ราคา/ตร.วา', type: 'number' as const },
  { key: 'totalMB', label: 'รวม (MB)', type: 'number' as const },
  { key: 'status', label: 'สถานะ', type: 'select' as const, options: ['Remained', 'SOLD'] },
  { key: 'permits', label: 'ใบอนุญาต' },
  { key: 'hasPresentation', label: 'Presentation', type: 'boolean' as const },
  { key: 'hasCanva', label: 'Canva', type: 'boolean' as const },
  { key: 'lat', label: 'Latitude', type: 'number' as const },
  { key: 'lng', label: 'Longitude', type: 'number' as const },
]

export default function AdminLandPage() {
  const [data, setData] = useState<LandPlot[]>(LAND_DATA)

  useEffect(() => { fetchLandData().then(setData) }, [])
  const [search, setSearch] = useState('')
  const [provinceFilter, setProvinceFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [editTarget, setEditTarget] = useState<LandPlot | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const provinces = useMemo(() => Array.from(new Set(data.map(l => l.province))).sort(), [data])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return data.filter(l =>
      (!provinceFilter || l.province === provinceFilter) &&
      (!statusFilter || l.status === statusFilter) &&
      (!q || l.site.toLowerCase().includes(q) || l.province.toLowerCase().includes(q) || l.team.toLowerCase().includes(q))
    )
  }, [data, search, provinceFilter, statusFilter])

  const remained = data.filter(l => l.status === 'Remained').length
  const sold = data.filter(l => l.status === 'SOLD').length
  const totalMB = data.reduce((s, l) => s + l.totalMB, 0)

  const handleSave = async (updated: Record<string, unknown>) => {
    const plot = updated as unknown as LandPlot
    if (isAdding) {
      const newPlot = { ...plot, no: Math.max(...data.map(l => l.no)) + 1 }
      setData(d => [...d, newPlot])
      await appendRow('All land', Object.values(newPlot))
    } else {
      setData(d => d.map(l => l.no === plot.no ? plot : l))
      await updateRow('All land', plot.no + 1, Object.values(plot))
    }
    setEditTarget(null)
    setIsAdding(false)
  }

  const handleDelete = async (row: LandPlot) => {
    if (!confirm(`ยืนยันลบ "${row.site}"?`)) return
    setData(d => d.filter(l => l.no !== row.no))
    await deleteRow('All land', row.no + 1)
  }

  const columns = [
    { key: 'no' as const, label: 'No', className: 'w-10' },
    { key: 'site' as const, label: 'ชื่อทรัพย์', className: 'min-w-[160px]' },
    { key: 'team' as const, label: 'ทีม', className: 'min-w-[140px]' },
    { key: 'province' as const, label: 'จังหวัด' },
    { key: 'zoning' as const, label: 'Zoning' },
    { key: 'totalSqwa' as const, label: 'ตร.วา', render: (v: unknown) => Number(v).toLocaleString() },
    { key: 'totalMB' as const, label: 'รวม (MB)', render: (v: unknown) => formatMB(Number(v)) },
    {
      key: 'status' as const, label: 'สถานะ',
      render: (v: unknown) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${v === 'SOLD' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {String(v)}
        </span>
      ),
    },
    { key: 'permits' as const, label: 'ใบอนุญาต', className: 'max-w-[160px] truncate' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0B2540', fontFamily: 'var(--font-display)' }}>จัดการที่ดิน</h1>
          <p className="text-gray-400 text-sm">All land — {data.length} แปลง</p>
        </div>
        <button
          onClick={() => { setIsAdding(true); setEditTarget({} as LandPlot) }}
          className="px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#C9A84C', color: '#0B2540' }}
        >+ เพิ่มแปลง</button>
      </div>

      <StatsBar stats={[
        { label: 'ทั้งหมด', value: data.length },
        { label: 'ยังขายอยู่', value: remained, color: 'text-green-property' },
        { label: 'SOLD', value: sold, color: 'text-red-sold' },
        { label: 'รวม (MB)', value: formatMB(totalMB), color: 'text-gold' },
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
        title={isAdding ? 'เพิ่มแปลงใหม่' : `แก้ไข: ${editTarget?.site ?? ''}`}
        fields={LAND_FIELDS}
        initialData={(editTarget ?? {}) as Record<string, unknown>}
        onSave={handleSave}
        onClose={() => { setEditTarget(null); setIsAdding(false) }}
      />
    </div>
  )
}
