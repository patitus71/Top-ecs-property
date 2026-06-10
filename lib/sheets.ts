const WEB_APP_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL

export async function readSheet(sheetName: 'All land' | 'ALL HOTEL') {
  if (!WEB_APP_URL) return null
  try {
    const res = await fetch(`${WEB_APP_URL}?sheet=${encodeURIComponent(sheetName)}`, { cache: 'no-store' })
    const data = await res.json()
    return data.rows as unknown[][]
  } catch {
    return null
  }
}

export async function updateRow(sheet: string, rowIndex: number, values: unknown[]) {
  if (!WEB_APP_URL) return
  await fetch(WEB_APP_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'updateRow', sheet, row: rowIndex, values }),
  })
}

export async function appendRow(sheet: string, values: unknown[]) {
  if (!WEB_APP_URL) return
  await fetch(WEB_APP_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'appendRow', sheet, values }),
  })
}

export async function deleteRow(sheet: string, rowIndex: number) {
  if (!WEB_APP_URL) return
  await fetch(WEB_APP_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'deleteRow', sheet, row: rowIndex }),
  })
}
