import { LandPlot, Hotel, formatMB, formatSqwa } from '@/lib/data'

type Props = {
  item: LandPlot | Hotel
  type: 'land' | 'hotel'
  compact?: boolean
  active?: boolean
  onClick?: () => void
}

function isLand(item: LandPlot | Hotel): item is LandPlot {
  return 'site' in item
}

export default function PropertyCard({ item, type, compact = false, active = false, onClick }: Props) {
  const name = isLand(item) ? item.site : item.project
  const isSold = item.status === 'SOLD'

  const badgeColor = isSold
    ? 'bg-red-sold text-white'
    : type === 'hotel'
    ? 'bg-green-property text-white'
    : 'bg-gold text-navy'

  const badgeLabel = isSold ? 'SOLD' : type === 'hotel' ? '🏨 โรงแรม' : '🟫 ที่ดิน'

  if (compact) {
    return (
      <div
        onClick={onClick}
        className={`cursor-pointer p-3 border rounded-lg transition-all ${
          active ? 'border-gold bg-gold/10' : 'border-gray-200 hover:border-gold/50 hover:bg-gold/5'
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className={`font-medium text-sm truncate ${active ? 'text-navy' : 'text-gray-800'}`}>{name}</p>
            <p className="text-xs text-gray-500 mt-0.5">{item.province}</p>
          </div>
          <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${badgeColor}`}>{badgeLabel}</span>
        </div>
        <p className="text-gold font-semibold text-sm mt-1">
          {isLand(item) ? formatMB(item.totalMB) : item.price}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="h-36 relative" style={{ background: 'linear-gradient(135deg, #0B2540 0%, #143354 100%)' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl opacity-20">{type === 'hotel' ? '🏨' : '🌿'}</span>
        </div>
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${badgeColor}`}>{badgeLabel}</span>
          {isLand(item) && item.zoning && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 text-white font-medium">{item.zoning}</span>
          )}
          {!isLand(item) && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 text-white font-medium">{item.type}</span>
          )}
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="text-gold font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>
            {isLand(item) ? formatMB(item.totalMB) : item.price}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 truncate" style={{ fontFamily: 'var(--font-display)' }}>{name}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{item.province}</p>
        <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between text-xs text-gray-400">
          <span>{formatSqwa(item.totalSqwa)}</span>
          {isLand(item) && (
            <span>{item.rai} ไร่ {item.ngan} งาน {item.sqwa} ตร.ว.</span>
          )}
          {!isLand(item) && (
            <span>{(item as Hotel).keys} ห้อง · {(item as Hotel).storeys} ชั้น</span>
          )}
        </div>
        {item.permits && (
          <p className="mt-2 text-xs text-green-property font-medium">✓ {item.permits}</p>
        )}
      </div>
    </div>
  )
}
