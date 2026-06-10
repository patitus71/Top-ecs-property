import type { LandPlot, Hotel } from './data'
import { formatMB } from './data'

export type MapItem = {
  id: string
  name: string
  lat: number
  lng: number
  price: string
  area: string
  type: 'land' | 'hotel'
  status: 'Remained' | 'SOLD'
  province: string
}

export function landToMapItem(p: LandPlot): MapItem {
  return {
    id: `land-${p.no}`,
    name: p.site,
    lat: p.lat ?? 0,
    lng: p.lng ?? 0,
    price: formatMB(p.totalMB),
    area: p.totalSqwa.toLocaleString() + ' ตร.วา',
    type: 'land',
    status: p.status,
    province: p.province,
  }
}

export function hotelToMapItem(h: Hotel): MapItem {
  return {
    id: `hotel-${h.no}`,
    name: h.project,
    lat: h.lat ?? 0,
    lng: h.lng ?? 0,
    price: h.price,
    area: h.totalSqwa.toLocaleString() + ' ตร.วา',
    type: 'hotel',
    status: h.status,
    province: h.province,
  }
}
