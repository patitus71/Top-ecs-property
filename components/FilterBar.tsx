'use client'

type Props = {
  typeFilter: 'all' | 'land' | 'hotel'
  onTypeChange: (v: 'all' | 'land' | 'hotel') => void
  provinceFilter: string
  onProvinceChange: (v: string) => void
  statusFilter: 'all' | 'Remained' | 'SOLD'
  onStatusChange: (v: 'all' | 'Remained' | 'SOLD') => void
  provinces: string[]
}

export default function FilterBar({
  typeFilter, onTypeChange,
  provinceFilter, onProvinceChange,
  statusFilter, onStatusChange,
  provinces,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <select
        value={typeFilter}
        onChange={e => onTypeChange(e.target.value as 'all' | 'land' | 'hotel')}
        className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none focus:border-gold"
      >
        <option value="all">ทั้งหมด</option>
        <option value="land">ที่ดิน</option>
        <option value="hotel">โรงแรม</option>
      </select>
      <select
        value={provinceFilter}
        onChange={e => onProvinceChange(e.target.value)}
        className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none focus:border-gold"
      >
        <option value="">ทุกจังหวัด</option>
        {provinces.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
      <select
        value={statusFilter}
        onChange={e => onStatusChange(e.target.value as 'all' | 'Remained' | 'SOLD')}
        className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none focus:border-gold"
      >
        <option value="all">ทุกสถานะ</option>
        <option value="Remained">ยังขายอยู่</option>
        <option value="SOLD">SOLD</option>
      </select>
    </div>
  )
}
