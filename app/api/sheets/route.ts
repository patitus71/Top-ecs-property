import { NextRequest, NextResponse } from 'next/server'

const WEB_APP_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL

export async function GET(req: NextRequest) {
  if (!WEB_APP_URL) return NextResponse.json({ error: 'Apps Script URL not configured' }, { status: 503 })
  const sheet = req.nextUrl.searchParams.get('sheet') ?? 'All land'
  try {
    const res = await fetch(`${WEB_APP_URL}?sheet=${encodeURIComponent(sheet)}`, { cache: 'no-store' })
    const data = await res.json()
    return NextResponse.json(data)
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!WEB_APP_URL) return NextResponse.json({ error: 'Apps Script URL not configured' }, { status: 503 })
  try {
    const body = await req.json()
    const res = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return NextResponse.json(data)
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
