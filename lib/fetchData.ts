import { LandPlot, Hotel, LAND_DATA, HOTEL_DATA } from './data'

// ── primitive helpers ──────────────────────────────────────────────────────
function num(v: unknown): number {
  const n = Number(v)
  return isNaN(n) ? 0 : n
}

function str(v: unknown): string {
  return v == null ? '' : String(v).trim()
}

function bool(v: unknown): boolean {
  if (typeof v === 'boolean') return v
  const s = String(v).toLowerCase().trim()
  return s === 'true' || s === '1' || s === 'yes'
}

// ── header-based column lookup ────────────────────────────────────────────
type HMap = Record<string, number>

function buildHMap(headerRow: unknown[]): HMap {
  const map: HMap = {}
  ;(headerRow as string[]).forEach((h, i) => {
    map[String(h).toLowerCase().trim()] = i
  })
  return map
}

/** Find first header containing ANY keyword; fall back to positional index. */
function col(row: unknown[], hmap: HMap, keywords: string[], pos: number): unknown {
  for (const kw of keywords) {
    for (const [h, i] of Object.entries(hmap)) {
      if (h.includes(kw.toLowerCase())) return row[i]
    }
  }
  return row[pos]
}

// ── row parsers ───────────────────────────────────────────────────────────

export function parseRowsToLand(rows: unknown[][]): LandPlot[] {
  if (!rows || rows.length < 2) return []
  const hmap = buildHMap(rows[0])

  return rows.slice(1).flatMap((row, i): LandPlot[] => {
    const site = str(col(row, hmap, ['site', 'ชื่อ'], 1))
    if (!site) return []

    // Rai-Ngan-Sqwa might be combined "7-2-74" or three separate columns
    const raiRaw = str(col(row, hmap, ['rai'], 5))
    let rai = 0, ngan = 0, sqwa = 0
    if (raiRaw.includes('-')) {
      const [r = 0, n = 0, s = 0] = raiRaw.split('-').map(Number)
      rai = r; ngan = n; sqwa = s
    } else {
      rai  = num(col(row, hmap, ['rai'], 5))
      ngan = num(col(row, hmap, ['ngan'], 6))
      sqwa = num(col(row, hmap, ['sqwa'], 7))
    }

    const latRaw = num(col(row, hmap, ['lat'], 15))
    const lngRaw = num(col(row, hmap, ['lng', 'lon'], 16))

    return [{
      no:           num(col(row, hmap, ['no', '#'], 0)) || i + 1,
      site,
      team:         str(col(row, hmap, ['team'], 2)),
      province:     str(col(row, hmap, ['province', 'จังหวัด'], 3)),
      zoning:       str(col(row, hmap, ['zon'], 4)),
      rai, ngan, sqwa,
      totalSqwa:    num(col(row, hmap, ['total (ตร', 'ตร.วา'], 8)),
      pricePerSqwa: num(col(row, hmap, ['price', 'ราคา'], 9)),
      totalMB:      num(col(row, hmap, ['mb'], 10)),
      status:       str(col(row, hmap, ['status', 'สถานะ'], 11)) === 'SOLD' ? 'SOLD' : 'Remained',
      permits:      str(col(row, hmap, ['permit', 'ใบ'], 12)),
      hasPresentation: bool(col(row, hmap, ['presentation'], 13)),
      hasCanva:     bool(col(row, hmap, ['canva'], 14)),
      lat:          latRaw || undefined,
      lng:          lngRaw || undefined,
    }]
  })
}

export function parseRowsToHotel(rows: unknown[][]): Hotel[] {
  if (!rows || rows.length < 2) return []
  const hmap = buildHMap(rows[0])

  return rows.slice(1).flatMap((row, i): Hotel[] => {
    const project = str(col(row, hmap, ['project', 'hotel', 'ชื่อ'], 1))
    if (!project) return []

    const latRaw = num(col(row, hmap, ['lat'], 16))
    const lngRaw = num(col(row, hmap, ['lng', 'lon'], 17))

    const keysRaw = col(row, hmap, ['key', 'room', 'ห้อง'], 7)
    const keys = typeof keysRaw === 'number' ? keysRaw : (isNaN(Number(keysRaw)) ? String(keysRaw ?? '-') : num(keysRaw))

    return [{
      no:       num(col(row, hmap, ['no', '#'], 0)) || i + 1,
      project,
      team:     str(col(row, hmap, ['team'], 2)),
      province: str(col(row, hmap, ['province', 'จังหวัด'], 3)),
      price:    str(col(row, hmap, ['price', 'ราคา'], 4)),
      towers:   num(col(row, hmap, ['tower'], 5)),
      storeys:  num(col(row, hmap, ['storey', 'floor', 'ชั้น'], 6)),
      keys,
      facilities: str(col(row, hmap, ['facilit', 'สิ่ง'], 8)),
      type:     str(col(row, hmap, ['type', 'ประเภท'], 9)).toUpperCase().includes('LEASE') ? 'LEASEHOLD' : 'FREEHOLD',
      rai:      num(col(row, hmap, ['rai'], 10)),
      ngan:     num(col(row, hmap, ['ngan'], 11)),
      sqwa:     num(col(row, hmap, ['sqwa'], 12)),
      totalSqwa: num(col(row, hmap, ['total (ตร', 'ตร.วา'], 13)),
      permits:  str(col(row, hmap, ['permit', 'ใบ'], 14)),
      status:   str(col(row, hmap, ['status', 'สถานะ'], 15)) === 'SOLD' ? 'SOLD' : 'Remained',
      lat:      latRaw || undefined,
      lng:      lngRaw || undefined,
    }]
  })
}

// ── fetch helpers (client-safe: always relative URL /api/sheets) ──────────

async function fetchSheet(sheetName: string): Promise<unknown[][] | null> {
  try {
    const res = await fetch(`/api/sheets?sheet=${encodeURIComponent(sheetName)}`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    const json = await res.json()
    if (json.error || !Array.isArray(json.rows)) return null
    return json.rows as unknown[][]
  } catch {
    return null
  }
}

export async function fetchLandData(): Promise<LandPlot[]> {
  const rows = await fetchSheet('All land')
  if (!rows) return LAND_DATA
  const parsed = parseRowsToLand(rows)
  return parsed.length > 0 ? parsed : LAND_DATA
}

export async function fetchHotelData(): Promise<Hotel[]> {
  const rows = await fetchSheet('ALL HOTEL')
  if (!rows) return HOTEL_DATA
  const parsed = parseRowsToHotel(rows)
  return parsed.length > 0 ? parsed : HOTEL_DATA
}
