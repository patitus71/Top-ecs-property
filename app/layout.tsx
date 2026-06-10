import type { Metadata } from 'next'
import { Playfair_Display, Sarabun } from 'next/font/google'
import './globals.css'
import PublicShell from '@/components/PublicShell'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const sarabun = Sarabun({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ECS Property Group — ที่ดินและโรงแรมพรีเมียมทั่วไทย',
  description: 'ทรัพย์สินคัดสรรกว่า 50 แปลง ครอบคลุมกรุงเทพฯ EEC และจุดหมายท่องเที่ยวชั้นนำทั่วประเทศ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${playfair.variable} ${sarabun.variable}`}>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-body)' }}>
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  )
}
