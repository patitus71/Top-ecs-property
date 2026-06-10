'use client'

import { useState, useMemo, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import PropertyCard from '@/components/PropertyCard'
import { LAND_DATA, HOTEL_DATA, type LandPlot, type Hotel } from '@/lib/data'
import { fetchLandData, fetchHotelData } from '@/lib/fetchData'
import { landToMapItem, hotelToMapItem } from '@/lib/mapUtils'

const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse" style={{ backgroundColor: '#143354' }} />,
})

const AREAS = [
  { name: 'กรุงเทพฯ', province: 'Bangkok', zone: 'BKK' },
  { name: 'ชลบุรี/EEC', province: 'Chonburi', zone: 'EEC' },
  { name: 'ภูเก็ต', province: 'Phuket', zone: 'ใต้' },
  { name: 'นนทบุรี', province: 'Nonthaburi', zone: 'BKK' },
  { name: 'สมุทรปราการ', province: 'Samut Prakan', zone: 'BKK' },
  { name: 'ปทุมธานี', province: 'Pathumthani', zone: 'BKK' },
  { name: 'ระยอง', province: 'Rayong', zone: 'EEC' },
  { name: 'หัวหิน', province: 'Prachuap Khiri Khan', zone: 'ใต้' },
  { name: 'ขอนแก่น', province: 'Khonkean', zone: 'เหนือ' },
  { name: 'เชียงใหม่', province: 'Chiang Mai', zone: 'เหนือ' },
]

const ZONE_COLORS: Record<string, string> = {
  BKK: 'bg-blue-100 text-blue-700',
  EEC: 'bg-green-100 text-green-700',
  ใต้: 'bg-orange-100 text-orange-700',
  เหนือ: 'bg-purple-100 text-purple-700',
}

type TabFilter = 'all' | 'land' | 'hotel'

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<TabFilter>('all')
  // initialise with static data so the page renders instantly
  const [landData, setLandData] = useState<LandPlot[]>(LAND_DATA)
  const [hotelData, setHotelData] = useState<Hotel[]>(HOTEL_DATA)

  // replace with live Sheets data once loaded
  useEffect(() => {
    fetchLandData().then(setLandData)
    fetchHotelData().then(setHotelData)
  }, [])

  const areasWithCount = AREAS.map(a => ({
    ...a,
    count:
      landData.filter(l => l.province === a.province).length +
      hotelData.filter(h => h.province === a.province).length,
  }))

  const featured = useMemo(() => {
    const lands = landData.filter(l => l.status === 'Remained').slice(0, 8)
    const hotels = hotelData.filter(h => h.status === 'Remained').slice(0, 4)
    type Entry = { item: LandPlot | Hotel; type: 'land' | 'hotel' }
    let combined: Entry[] = []
    if (tab === 'all') {
      combined = [...lands.map(i => ({ item: i, type: 'land' as const })), ...hotels.map(i => ({ item: i, type: 'hotel' as const }))]
    } else if (tab === 'land') {
      combined = lands.map(i => ({ item: i, type: 'land' as const }))
    } else {
      combined = hotels.map(i => ({ item: i, type: 'hotel' as const }))
    }
    return combined.slice(0, 8)
  }, [tab, landData, hotelData])

  const allMapItems = useMemo(() => [
    ...landData.filter(l => l.lat && l.lng).map(landToMapItem),
    ...hotelData.filter(h => h.lat && h.lng).map(hotelToMapItem),
  ], [landData, hotelData])

  return (
    <div>
      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0B2540 0%, #0d2e4d 60%, #0B2540 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="blob-1 absolute top-1/4 -left-20 w-80 h-80 rounded-full opacity-10" style={{ background: '#C9A84C', filter: 'blur(60px)' }} />
        <div className="blob-2 absolute bottom-1/4 -right-20 w-96 h-96 rounded-full opacity-10" style={{ background: '#143354', filter: 'blur(80px)' }} />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <p className="text-gold font-medium tracking-widest text-sm uppercase mb-4">ECS Property Group</p>
          <h1
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            ที่ดินและโรงแรม<br />
            <span style={{ color: '#C9A84C' }}>พรีเมียมทั่วไทย</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            ทรัพย์สินคัดสรรกว่า 50 แปลง ครอบคลุม กรุงเทพฯ EEC และจุดหมายท่องเที่ยวชั้นนำทั่วประเทศ
          </p>

          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {[
              { num: String(landData.length), label: 'แปลงที่ดิน' },
              { num: String(hotelData.length), label: 'โรงแรม' },
              { num: '15+', label: 'จังหวัดทั่วไทย' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold" style={{ color: '#C9A84C', fontFamily: 'var(--font-display)' }}>{s.num}</p>
                <p className="text-white/60 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="max-w-lg mx-auto">
            <SearchBar
              value={search}
              onChange={setSearch}
              dark
              onSearch={() => {
                if (search) window.location.href = `/listings?q=${encodeURIComponent(search)}`
              }}
            />
          </div>
          <Link href="/listings" className="inline-block mt-6 text-white/50 text-sm hover:text-gold transition-colors">
            ดูทั้งหมด ↓
          </Link>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-20 px-4" style={{ backgroundColor: '#FAF8F4' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold" style={{ color: '#0B2540', fontFamily: 'var(--font-display)' }}>ทรัพย์สินแนะนำ</h2>
              <p className="text-gray-500 mt-1">คัดสรรเฉพาะทรัพย์พรีเมียมจากทั่วประเทศ</p>
            </div>
            <div className="flex gap-2">
              {([['all', 'ทั้งหมด'], ['land', '🟫 ที่ดิน'], ['hotel', '🏨 โรงแรม']] as [TabFilter, string][]).map(([v, label]) => (
                <button
                  key={v}
                  onClick={() => setTab(v)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    tab === v
                      ? 'text-white shadow'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                  style={tab === v ? { backgroundColor: '#0B2540' } : {}}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featured.map(({ item, type }) => (
              <PropertyCard key={`${type}-${item.no}`} item={item} type={type} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-medium text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#0B2540' }}
            >
              ดูทั้งหมด →
            </Link>
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2" style={{ color: '#0B2540', fontFamily: 'var(--font-display)' }}>ทำเลยอดนิยม</h2>
          <p className="text-gray-500 mb-8">ทรัพย์สินครอบคลุมทั่วประเทศไทย</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {areasWithCount.map(a => (
              <Link
                key={a.name}
                href={`/listings?province=${encodeURIComponent(a.province)}`}
                className="group p-4 border border-gray-100 rounded-xl hover:border-gold hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ZONE_COLORS[a.zone]}`}>{a.zone}</span>
                </div>
                <p className="font-semibold text-sm" style={{ color: '#0B2540' }}>{a.name}</p>
                <p className="text-xs text-gray-400 mt-1">{a.count} ทรัพย์</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MAP PREVIEW */}
      <section className="py-20 px-4" style={{ backgroundColor: '#0B2540' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>แผนที่ทรัพย์สิน</h2>
          <p className="text-white/60 mb-8">ทรัพย์สินทุกแปลงพร้อมตำแหน่ง GPS บนแผนที่</p>
          <div className="rounded-2xl overflow-hidden" style={{ height: 480 }}>
            <MapView items={allMapItems} dark />
          </div>
          <div className="flex gap-6 mt-5 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: '#C9A84C' }} /> ที่ดิน
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: '#2D6A4F' }} /> โรงแรม
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: '#8B2020' }} /> SOLD
            </div>
          </div>
        </div>
      </section>

      {/* WHY ECS */}
      <section className="py-20 px-4" style={{ backgroundColor: '#FAF8F4' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#0B2540', fontFamily: 'var(--font-display)' }}>
            ทำไมต้อง ECS Property
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏆', title: 'คุณภาพ', desc: 'คัดสรรเฉพาะทรัพย์ศักยภาพสูง ทุกแปลงผ่านการตรวจสอบอย่างละเอียด' },
              { icon: '📍', title: 'ทำเล', desc: 'ครอบคลุมทำเลยุทธศาสตร์ทั่วไทย ทั้ง CBD กรุงเทพฯ EEC และรีสอร์ท' },
              { icon: '⚡', title: 'อัปเดตเรียลไทม์', desc: 'ข้อมูลราคาและสถานะอัปเดตจาก Google Sheets แบบเรียลไทม์' },
              { icon: '👥', title: 'ทีมงาน', desc: 'ทีมผู้เชี่ยวชาญอสังหาริมทรัพย์ประสบการณ์กว่า 10 ปี' },
            ].map(c => (
              <div key={c.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{c.icon}</div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0B2540' }}>{c.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #0B2540, #143354)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            พร้อมลงทุนแล้วหรือยัง?
          </h2>
          <p className="text-white/60 mb-8">ทีมงานของเราพร้อมให้คำปรึกษาและข้อมูลเชิงลึกสำหรับทุกทรัพย์</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:02-XXX-XXXX" className="px-8 py-3 font-bold rounded-full hover:opacity-90 transition-opacity" style={{ backgroundColor: '#C9A84C', color: '#0B2540' }}>
              โทรหาเรา
            </a>
            <a
              href="https://line.me/ti/p/@ecsproperty"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
            >
              ติดต่อผ่าน LINE
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
