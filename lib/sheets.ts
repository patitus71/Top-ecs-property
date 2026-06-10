// All Sheets operations are proxied through /api/sheets to avoid CORS issues.
// The actual Apps Script URL lives in APPS_SCRIPT_URL (server-only env var).

async function sheetsPost(body: unknown): Promise<void> {
  try {
    await fetch('/api/sheets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    // write failures are silent — UI already updated optimistically
  }
}

export async function updateRow(sheet: string, rowIndex: number, values: unknown[]) {
  await sheetsPost({ action: 'updateRow', sheet, row: rowIndex, values })
}

export async function appendRow(sheet: string, values: unknown[]) {
  await sheetsPost({ action: 'appendRow', sheet, values })
}

export async function deleteRow(sheet: string, rowIndex: number) {
  await sheetsPost({ action: 'deleteRow', sheet, row: rowIndex })
}
