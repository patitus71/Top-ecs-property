import { NextRequest, NextResponse } from 'next/server'

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL

export async function GET(req: NextRequest) {
  if (!APPS_SCRIPT_URL) {
    return NextResponse.json({ error: 'APPS_SCRIPT_URL not configured' }, { status: 503 })
  }
  const sheet = req.nextUrl.searchParams.get('sheet') ?? 'All land'
  try {
    const res = await fetch(
      `${APPS_SCRIPT_URL}?sheet=${encodeURIComponent(sheet)}`,
      { cache: 'no-store', redirect: 'follow' }
    )
    const text = await res.text()
    // Google redirects to a login page when the Web App access is not set to "Anyone"
    if (!text.trimStart().startsWith('{')) {
      return NextResponse.json(
        { error: 'Apps Script returned HTML — redeploy with Who has access: Anyone (not "Anyone with Google account")' },
        { status: 502 }
      )
    }
    return NextResponse.json(JSON.parse(text))
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!APPS_SCRIPT_URL) {
    return NextResponse.json({ error: 'APPS_SCRIPT_URL not configured' }, { status: 503 })
  }
  try {
    const body = await req.json()
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      redirect: 'follow',
    })
    const text = await res.text()
    if (!text.trimStart().startsWith('{')) {
      return NextResponse.json(
        { error: 'Apps Script returned HTML — check deployment access settings' },
        { status: 502 }
      )
    }
    return NextResponse.json(JSON.parse(text))
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
