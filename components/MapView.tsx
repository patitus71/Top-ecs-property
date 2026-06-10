'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { MapItem } from '@/lib/mapUtils'

// Fix Leaflet default icon path issue with webpack
delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function createColorIcon(color: string) {
  return L.divIcon({
    className: '',
    html: `<div style="width:12px;height:12px;background:${color};border:2px solid white;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,.5)"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  })
}

const goldIcon = createColorIcon('#C9A84C')
const greenIcon = createColorIcon('#2D6A4F')
const redIcon = createColorIcon('#8B2020')

type FlyToProps = { lat: number; lng: number }
function FlyTo({ lat, lng }: FlyToProps) {
  const map = useMap()
  useEffect(() => { map.flyTo([lat, lng], 14, { duration: 1 }) }, [lat, lng, map])
  return null
}

type Props = {
  items: MapItem[]
  flyTo?: { lat: number; lng: number; key?: number } | null
  activeId?: string | null
  onMarkerClick?: (id: string) => void
  dark?: boolean
}

export default function MapView({ items, flyTo, activeId, onMarkerClick, dark = false }: Props) {
  const validItems = items.filter(i => i.lat && i.lng)

  const center: [number, number] = validItems.length
    ? [
        validItems.reduce((s, i) => s + i.lat, 0) / validItems.length,
        validItems.reduce((s, i) => s + i.lng, 0) / validItems.length,
      ]
    : [13.736717, 100.523186]

  return (
    <MapContainer
      center={center}
      zoom={6}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url={
          dark
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        }
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {flyTo && <FlyTo key={flyTo.key ?? 0} lat={flyTo.lat} lng={flyTo.lng} />}
      {validItems.map(item => {
        const icon = item.status === 'SOLD' ? redIcon : item.type === 'hotel' ? greenIcon : goldIcon
        return (
          <Marker
            key={item.id}
            position={[item.lat, item.lng]}
            icon={icon}
            eventHandlers={{ click: () => onMarkerClick?.(item.id) }}
          >
            <Popup>
              <div style={{ minWidth: 180 }} className="text-sm">
                <p className="font-semibold text-base" style={{ color: '#0B2540' }}>{item.name}</p>
                <p className="font-bold mt-1" style={{ color: '#C9A84C' }}>{item.price}</p>
                <p className="text-gray-500 text-xs mt-1">{item.province} · {item.area}</p>
                <div className="flex gap-2 mt-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >📍 Google Maps</a>
                  <a
                    href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${item.lat},${item.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >🚶 Street View</a>
                </div>
              </div>
            </Popup>
          </Marker>
        )
      })}
      {/* suppress unused activeId warning */}
      {activeId && null}
    </MapContainer>
  )
}
