'use client'

import Link from 'next/link'
import { LAND_DATA, HOTEL_DATA, formatMB } from '@/lib/data'

export default function DashboardPage() {
  const totalLand = LAND_DATA.length
  const remainedLand = LAND_DATA.filter(l => l.status === 'Remained').length
  const soldLand = LAND_DATA.filter(l => l.status === 'SOLD').length
  const totalHotels = HOTEL_DATA.length
  const totalMB = LAND_DATA.reduce((s, l) => s + l.totalMB, 0)

  const stats = [
    { label: 'ที่ดินทั้งหมด', value: totalLand, icon: '🌿', color: '#0B2540' },
    { label: 'โรงแรมทั้งหมด', value: totalHotels, icon: '🏨', color: '#2D6A4F' },
    { label: 'มูลค่ารวม (ที่ดิน)', value: formatMB(totalMB), icon: '💰', color: '#C9A84C' },
    { label: 'ขายแล้ว', value: soldLand, icon: '✅', color: '#8B2020' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1" style={{ color: '#0B2540', fontFamily: 'var(--font-display)' }}>แดชบอร์ด</h1>
      <p className="text-gray-400 text-sm mb-8">ภาพรวมระบบจัดการทรัพย์สิน ECS Property</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
            <div className="text-3xl mb-3">{s.icon}</div>
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/land"
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 hover:shadow-md hover:border-gold/30 transition-all group"
        >
          <div className="text-4xl mb-3">🌿</div>
          <h3 className="font-bold text-lg group-hover:text-gold transition-colors" style={{ color: '#0B2540' }}>จัดการที่ดิน</h3>
          <p className="text-gray-400 text-sm mt-1">{remainedLand} แปลงที่เหลือ · {soldLand} แปลงที่ขายแล้ว</p>
          <p className="text-xs text-gold font-medium mt-3">ไปที่หน้าจัดการ →</p>
        </Link>
        <Link
          href="/admin/hotel"
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 hover:shadow-md hover:border-gold/30 transition-all group"
        >
          <div className="text-4xl mb-3">🏨</div>
          <h3 className="font-bold text-lg group-hover:text-gold transition-colors" style={{ color: '#0B2540' }}>จัดการโรงแรม</h3>
          <p className="text-gray-400 text-sm mt-1">{HOTEL_DATA.filter(h => h.status === 'Remained').length} โรงแรมที่เหลือ</p>
          <p className="text-xs text-gold font-medium mt-3">ไปที่หน้าจัดการ →</p>
        </Link>
      </div>
    </div>
  )
}
